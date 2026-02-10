interface FormFieldProps {
  field: any;
  value: any;
  onChange: (value: any) => void;
  readOnly?: boolean;
}

export default function FormField({ field, value, onChange, readOnly }: FormFieldProps) {
  const { label, type, control, required, placeholder, options, ui } = field;

  const renderControl = () => {
    switch (control) {
      case 'input':
        return (
          <input
            type={type === 'number' ? 'number' : type === 'date' ? 'date' : 'text'}
            className="input"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            disabled={readOnly}
          />
        );

      case 'textarea':
        return (
          <textarea
            className="input min-h-[100px]"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            disabled={readOnly}
            rows={4}
          />
        );

      case 'select':
        return (
          <select
            className="input"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            disabled={readOnly}
          >
            <option value="">-- Chọn --</option>
            {options?.map((opt: any) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {options?.map((opt: any) => (
              <label key={opt.value} className="flex items-center">
                <input
                  type="radio"
                  name={field.id}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={readOnly}
                  className="mr-2"
                />
                {opt.label}
              </label>
            ))}
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-2">
            <input
              type="range"
              min={ui?.min || 0}
              max={ui?.max || 100}
              step={ui?.step || 1}
              value={value || 0}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              disabled={readOnly}
              className="w-full"
            />
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{ui?.min || 0}</span>
              <span className="text-2xl font-bold text-primary-600">{value || 0}</span>
              <span className="text-sm text-gray-600">{ui?.max || 100}</span>
            </div>
          </div>
        );

      case 'checklist':
        return <ChecklistControl field={field} value={value} onChange={onChange} readOnly={readOnly} />;

      case 'table':
        return <TableControl field={field} value={value} onChange={onChange} readOnly={readOnly} />;

      case 'computed':
        return (
          <div className="text-3xl font-bold text-gray-900">
            {value !== undefined && value !== null ? value : '—'}
          </div>
        );

      default:
        return (
          <input
            type="text"
            className="input"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            disabled={readOnly}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <label className="label">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderControl()}
    </div>
  );
}

function ChecklistControl({ field, value, onChange, readOnly }: any) {
  const items = field.ui?.items || [];
  const selectedItems = value || [];

  const handleToggle = (item: any) => {
    const exists = selectedItems.find((i: any) => i.code === item.code);
    if (exists) {
      onChange(selectedItems.filter((i: any) => i.code !== item.code));
    } else {
      onChange([...selectedItems, item]);
    }
  };

  return (
    <div className="space-y-2 border border-gray-200 rounded-lg p-4">
      {items.map((item: any) => {
        const isChecked = selectedItems.some((i: any) => i.code === item.code);
        return (
          <label key={item.code} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(item)}
                disabled={readOnly}
                className="mr-3"
              />
              <span className="text-sm">{item.label}</span>
            </div>
            <span className="text-sm font-medium text-primary-600">{item.points} điểm</span>
          </label>
        );
      })}
      <div className="border-t pt-2 mt-2 flex justify-between items-center">
        <span className="text-sm font-medium">Tổng điểm:</span>
        <span className="text-lg font-bold text-primary-600">
          {selectedItems.reduce((sum: number, i: any) => sum + (i.points || 0), 0)} / {field.ui?.maxPoints || 0}
        </span>
      </div>
    </div>
  );
}

function TableControl({ field, value, onChange, readOnly }: any) {
  const rows = value || [];
  const columns = field.columns || [];

  const addRow = () => {
    const newRow: any = {};
    columns.forEach((col: any) => { newRow[col.key] = ''; });
    onChange([...rows, newRow]);
  };

  const updateRow = (index: number, key: string, val: any) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [key]: val };
    onChange(newRows);
  };

  const deleteRow = (index: number) => {
    onChange(rows.filter((_: any, i: number) => i !== index));
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col: any) => (
                <th key={col.key} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase" style={{ width: col.width }}>
                  {col.label}
                </th>
              ))}
              {!readOnly && <th className="px-4 py-3 w-20"></th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row: any, idx: number) => (
              <tr key={idx}>
                {columns.map((col: any) => (
                  <td key={col.key} className="px-4 py-2">
                    <input
                      type={col.type === 'number' ? 'number' : 'text'}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                      value={row[col.key] || ''}
                      onChange={(e) => updateRow(idx, col.key, e.target.value)}
                      disabled={readOnly}
                    />
                  </td>
                ))}
                {!readOnly && (
                  <td className="px-4 py-2">
                    <button onClick={() => deleteRow(idx)} className="text-red-600 hover:text-red-800 text-sm">
                      Xóa
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!readOnly && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <button onClick={addRow} className="btn btn-outline text-sm">
            + Thêm dòng
          </button>
        </div>
      )}
    </div>
  );
}

