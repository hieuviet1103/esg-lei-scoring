import { useState } from 'react';
import { Search } from 'lucide-react';

const fieldTypes = [
  { 
    category: 'Basic',
    fields: [
      { type: 'text', label: 'Text Input', icon: '📝', description: 'Single line text' },
      { type: 'textarea', label: 'Text Area', icon: '📄', description: 'Multi-line text' },
      { type: 'number', label: 'Number', icon: '🔢', description: 'Numeric input' },
      { type: 'date', label: 'Date', icon: '📅', description: 'Date picker' },
    ]
  },
  {
    category: 'Selection',
    fields: [
      { type: 'select', label: 'Select', icon: '📋', description: 'Dropdown select' },
      { type: 'multiselect', label: 'Multi Select', icon: '☑️', description: 'Multiple choice' },
      { type: 'radio', label: 'Radio', icon: '🔘', description: 'Radio buttons' },
      { type: 'checkbox', label: 'Checkbox', icon: '☑', description: 'Checkbox' },
    ]
  },
  {
    category: 'Advanced',
    fields: [
      { type: 'slider', label: 'Slider', icon: '🎚️', description: 'Range slider' },
      { type: 'checklist', label: 'Checklist', icon: '✓', description: 'Scoring checklist' },
      { type: 'table', label: 'Table', icon: '📊', description: 'Data table' },
      { type: 'file', label: 'File Upload', icon: '📎', description: 'File attachment' },
    ]
  }
];

export default function FieldPalette() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Basic', 'Selection', 'Advanced']);

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter(c => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  const filteredFieldTypes = fieldTypes.map(category => ({
    ...category,
    fields: category.fields.filter(field =>
      field.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      field.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.fields.length > 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-20">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Field Types</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search fields..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="p-2 max-h-[calc(100vh-280px)] overflow-y-auto">
        {filteredFieldTypes.map((category) => (
          <div key={category.category} className="mb-2">
            <button
              onClick={() => toggleCategory(category.category)}
              className="w-full px-3 py-2 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded flex items-center justify-between"
            >
              <span>{category.category}</span>
              <span className="text-xs text-gray-500">{category.fields.length}</span>
            </button>

            {expandedCategories.includes(category.category) && (
              <div className="space-y-1 mt-1">
                {category.fields.map((field) => (
                  <div
                    key={field.type}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('fieldType', field.type);
                    }}
                    className="group px-3 py-2 rounded cursor-move hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all"
                    title={`Drag to add ${field.label}`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{field.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {field.label}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {field.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {filteredFieldTypes.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No fields found</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-600">
          <p className="font-semibold mb-1">💡 Tips:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-500">
            <li>Drag fields vào section</li>
            <li>Click để chỉnh sửa</li>
            <li>Drag to reorder</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

