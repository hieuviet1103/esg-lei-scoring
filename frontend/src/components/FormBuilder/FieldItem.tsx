import { GripVertical, Trash2, Eye, EyeOff } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface FieldItemProps {
  field: any;
  selected: boolean;
  onSelect: () => void;
  onUpdate: (updates: any) => void;
  onDelete: () => void;
}

const fieldIcons: Record<string, string> = {
  text: '📝',
  textarea: '📄',
  number: '🔢',
  select: '📋',
  multiselect: '☑️',
  radio: '🔘',
  checkbox: '☑',
  date: '📅',
  slider: '🎚️',
  checklist: '✓',
  table: '📊',
  'text-array': '📝+',
  kpi: '🎯',
  computed: '🔄',
  file: '📎'
};

export default function FieldItem({
  field,
  selected,
  onSelect,
  onUpdate,
  onDelete
}: FieldItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onSelect}
      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
        selected
          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
          : 'border-gray-200 bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center space-x-3 flex-1">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>

        <span className="text-lg">{fieldIcons[field.control] || '📝'}</span>

        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={field.label}
              onChange={(e) => onUpdate({ label: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              className="font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 -ml-1"
              aria-label="Field label"
              placeholder="Field label..."
            />
            {field.required && (
              <span className="text-red-500 text-sm font-bold">*</span>
            )}
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span className="bg-gray-100 px-2 py-0.5 rounded">{field.control}</span>
            <span>•</span>
            <span className="font-mono">{field.dataPath}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpdate({ hidden: !field.hidden });
          }}
          className={`p-1 rounded ${
            field.hidden ? 'text-gray-400' : 'text-gray-600'
          } hover:bg-gray-100`}
          title={field.hidden ? 'Hidden' : 'Visible'}
          aria-label={field.hidden ? 'Show field' : 'Hide field'}
        >
          {field.hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm('Xóa field này?')) onDelete();
          }}
          className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
          title="Delete field"
          aria-label="Delete field"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

