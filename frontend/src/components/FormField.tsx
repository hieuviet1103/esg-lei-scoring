import { useState } from 'react';

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

      case 'text-array':
        return <TextArrayControl field={field} value={value} onChange={onChange} readOnly={readOnly} />;

      case 'kpi':
        return <KpiControl field={field} value={value} onChange={onChange} readOnly={readOnly} />;

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
                    {col.type === 'select' ? (
                      <select
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        value={row[col.key] || ''}
                        onChange={(e) => updateRow(idx, col.key, e.target.value)}
                        disabled={readOnly}
                      >
                        <option value="">-- Chọn --</option>
                        {(col.options || []).map((opt: string) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : col.type === 'checkbox' ? (
                      <input
                        type="checkbox"
                        checked={row[col.key] || false}
                        onChange={(e) => updateRow(idx, col.key, e.target.checked)}
                        disabled={readOnly}
                        className="rounded border-gray-300"
                      />
                    ) : col.type === 'date' ? (
                      <input
                        type="date"
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        value={row[col.key] || ''}
                        onChange={(e) => updateRow(idx, col.key, e.target.value)}
                        disabled={readOnly}
                      />
                    ) : (
                      <input
                        type={col.type === 'number' ? 'number' : 'text'}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        value={row[col.key] || ''}
                        onChange={(e) => updateRow(idx, col.key, e.target.value)}
                        disabled={readOnly}
                      />
                    )}
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

function TextArrayControl({ field, value, onChange, readOnly }: any) {
  const items = value || [];
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim()) {
      onChange([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_: any, i: number) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="space-y-3">
      {/* Input area */}
      {!readOnly && (
        <div className="flex space-x-2">
          <input
            type="text"
            className="input flex-1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={field.ui?.placeholder || 'Nhập text và nhấn Enter'}
          />
          <button
            onClick={addItem}
            className="btn btn-primary whitespace-nowrap"
            type="button"
          >
            + Thêm
          </button>
        </div>
      )}

      {/* List of items */}
      {items.length > 0 && (
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
          {items.map((item: string, idx: number) => (
            <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50">
              <span className="text-gray-900">{item}</span>
              {!readOnly && (
                <button
                  onClick={() => removeItem(idx)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium ml-4"
                  type="button"
                >
                  Xóa
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-4 text-gray-400 text-sm border border-dashed border-gray-300 rounded-lg">
          Chưa có item nào
        </div>
      )}
    </div>
  );
}

function KpiControl({ field, value, onChange, readOnly }: any) {
  const allowMultiple = field.ui?.allowMultiple || false;
  const valueType = field.ui?.valueType || 'number';
  
  // Nếu allowMultiple = false, value là object { operator, value }
  // Nếu allowMultiple = true, value là array of { operator, value }
  const kpiItems = allowMultiple ? (value || []) : (value ? [value] : [{ operator: '>', value: '' }]);
  
  const operators = [
    { value: '>', label: '> Lớn hơn' },
    { value: '>=', label: '>= Lớn hơn hoặc bằng' },
    { value: '<', label: '< Nhỏ hơn' },
    { value: '<=', label: '<= Nhỏ hơn hoặc bằng' },
    { value: '=', label: '= Bằng' },
    { value: '!=', label: '!= Khác' },
  ];

  const updateKpi = (index: number, key: 'operator' | 'value', val: any) => {
    const newItems = [...kpiItems];
    newItems[index] = { ...newItems[index], [key]: val };
    
    if (allowMultiple) {
      onChange(newItems);
    } else {
      onChange(newItems[0]);
    }
  };

  const addKpi = () => {
    if (allowMultiple) {
      onChange([...kpiItems, { operator: '>', value: '' }]);
    }
  };

  const removeKpi = (index: number) => {
    if (allowMultiple) {
      const newItems = kpiItems.filter((_: any, i: number) => i !== index);
      onChange(newItems.length > 0 ? newItems : null);
    }
  };

  const formatValue = (val: any) => {
    if (!val) return val;
    switch (valueType) {
      case 'percentage':
        return `${val}%`;
      case 'currency':
        return `${Number(val).toLocaleString('vi-VN')} VND`;
      default:
        return val;
    }
  };

  return (
    <div className="space-y-3">
      {kpiItems.map((item: any, idx: number) => (
        <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center space-x-3">
            {/* Operator Select */}
            <select
              value={item.operator || '>'}
              onChange={(e) => updateKpi(idx, 'operator', e.target.value)}
              disabled={readOnly}
              className="input flex-shrink-0 w-48"
            >
              {operators.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>

            {/* Value Input */}
            <div className="flex-1 relative">
              <input
                type={valueType === 'number' || valueType === 'percentage' || valueType === 'currency' ? 'number' : 'text'}
                value={item.value || ''}
                onChange={(e) => updateKpi(idx, 'value', e.target.value)}
                disabled={readOnly}
                className="input w-full"
                placeholder={
                  valueType === 'percentage' ? 'Nhập %' :
                  valueType === 'currency' ? 'Nhập số tiền' :
                  'Nhập giá trị'
                }
              />
              {valueType === 'percentage' && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
              )}
              {valueType === 'currency' && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">VND</span>
              )}
            </div>

            {/* Remove button for multiple */}
            {allowMultiple && !readOnly && (
              <button
                onClick={() => removeKpi(idx)}
                className="text-red-600 hover:text-red-800 p-2"
                type="button"
              >
                ×
              </button>
            )}
          </div>

          {/* Display formatted */}
          {item.value && (
            <div className="mt-2 text-sm text-gray-600 bg-white px-3 py-2 rounded border border-gray-200">
              <span className="font-medium">KPI:</span>{' '}
              <span className="font-mono text-primary-600">
                {item.operator} {formatValue(item.value)}
              </span>
            </div>
          )}
        </div>
      ))}

      {/* Add button for multiple */}
      {allowMultiple && !readOnly && (
        <button
          onClick={addKpi}
          className="btn btn-outline w-full text-sm"
          type="button"
        >
          + Thêm điều kiện KPI
        </button>
      )}

      {kpiItems.length === 0 && (
        <div className="text-center py-4 text-gray-400 text-sm border border-dashed border-gray-300 rounded-lg">
          Chưa có KPI nào
        </div>
      )}
    </div>
  );
}

