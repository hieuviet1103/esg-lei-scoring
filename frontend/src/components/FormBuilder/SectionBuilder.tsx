import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import FieldItem from './FieldItem';

interface SectionBuilderProps {
  section: any;
  sectionIdx: number;
  selected: boolean;
  onSelect: () => void;
  onUpdate: (updates: any) => void;
  onDelete: () => void;
  onAddField: (fieldType: string) => void;
  onUpdateField: (fieldIdx: number, updates: any) => void;
  onDeleteField: (fieldIdx: number) => void;
  onSelectField: (fieldIdx: number) => void;
  selectedField: { sectionIdx: number; fieldIdx: number } | null;
}

export default function SectionBuilder({
  section,
  sectionIdx,
  selected,
  onSelect,
  onUpdate,
  onDelete,
  onAddField,
  onUpdateField,
  onDeleteField,
  onSelectField,
  selectedField
}: SectionBuilderProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [showFieldMenu, setShowFieldMenu] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleFieldDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id) return;

    const fields = section.fields || [];
    const oldIndex = fields.findIndex((f: any) => f.id === active.id);
    const newIndex = fields.findIndex((f: any) => f.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newFields = arrayMove(fields, oldIndex, newIndex);
      onUpdate({ fields: newFields });
    }
  };

  const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: '📝' },
    { type: 'textarea', label: 'Text Area', icon: '📄' },
    { type: 'number', label: 'Number', icon: '🔢' },
    { type: 'select', label: 'Select', icon: '📋' },
    { type: 'multiselect', label: 'Multi Select', icon: '☑️' },
    { type: 'radio', label: 'Radio', icon: '🔘' },
    { type: 'checkbox', label: 'Checkbox', icon: '☑' },
    { type: 'date', label: 'Date', icon: '📅' },
    { type: 'slider', label: 'Slider', icon: '🎚️' },
    { type: 'checklist', label: 'Checklist', icon: '✓' },
    { type: 'table', label: 'Table', icon: '📊' },
    { type: 'text-array', label: 'Text Array (Append)', icon: '📝+' },
    { type: 'kpi', label: 'KPI (Operator + Value)', icon: '🎯' },
    { type: 'file', label: 'File Upload', icon: '📎' }
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border rounded-lg ${
        selected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
      } bg-white`}
    >
      {/* Section Header */}
      <div
        className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
        onClick={onSelect}
      >
        <div className="flex items-center space-x-3 flex-1">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="h-5 w-5 text-gray-400" />
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(!collapsed);
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>

          <div className="flex-1">
            <input
              type="text"
              value={section.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              onClick={(e) => e.stopPropagation()}
              className="font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 -ml-2"
              aria-label="Section title"
              placeholder="Section title..."
            />
            <div className="text-xs text-gray-500">
              {section.fields?.length || 0} fields
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowFieldMenu(!showFieldMenu);
              }}
              className="btn btn-sm btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Field
            </button>

            {showFieldMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowFieldMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-96 overflow-y-auto">
                  {fieldTypes.map((ft) => (
                    <button
                      key={ft.type}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddField(ft.type);
                        setShowFieldMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                      title={`Add ${ft.label} field`}
                      aria-label={`Add ${ft.label} field`}
                    >
                      <span>{ft.icon}</span>
                      <span className="text-sm">{ft.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Xóa section này?')) onDelete();
            }}
            className="text-red-600 hover:text-red-800 p-2"
            title="Xóa section"
            aria-label="Xóa section"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Fields List */}
      {!collapsed && (
        <div className="p-4 space-y-2">
          {section.fields && section.fields.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleFieldDragEnd}
            >
              <SortableContext
                items={section.fields.map((f: any) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                {section.fields.map((field: any, fieldIdx: number) => (
                  <FieldItem
                    key={field.id}
                    field={field}
                    selected={
                      selectedField?.sectionIdx === sectionIdx &&
                      selectedField?.fieldIdx === fieldIdx
                    }
                    onSelect={() => onSelectField(fieldIdx)}
                    onUpdate={(updates) => onUpdateField(fieldIdx, updates)}
                    onDelete={() => onDeleteField(fieldIdx)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          ) : (
            <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-300 rounded-lg">
              <p className="text-sm">Chưa có field nào</p>
              <p className="text-xs mt-1">Click "Add Field" để thêm</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

