import { Settings, FileText, Database } from 'lucide-react';
import { useState } from 'react';

interface PropertiesPanelProps {
  formData: any;
  selectedSection: number | null;
  selectedField: { sectionIdx: number; fieldIdx: number } | null;
  onUpdateMeta: (meta: any) => void;
  onUpdateSection: (updates: any) => void;
  onUpdateField: (updates: any) => void;
}

export default function PropertiesPanel({
  formData,
  selectedSection,
  selectedField,
  onUpdateMeta,
  onUpdateSection,
  onUpdateField
}: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'validation' | 'ui'>('general');

  const field = selectedField 
    ? formData.sections[selectedField.sectionIdx]?.fields[selectedField.fieldIdx]
    : null;

  const section = selectedSection !== null 
    ? formData.sections[selectedSection]
    : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2 mb-3">
          <Settings className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Properties</h3>
        </div>

        {(field || section) && (
          <div className="flex space-x-1 bg-gray-100 rounded p-1">
            <button
              onClick={() => setActiveTab('general')}
              className={`flex-1 px-3 py-1 text-xs rounded transition-colors ${
                activeTab === 'general'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              General
            </button>
            {field && (
              <>
                <button
                  onClick={() => setActiveTab('validation')}
                  className={`flex-1 px-3 py-1 text-xs rounded transition-colors ${
                    activeTab === 'validation'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Validation
                </button>
                <button
                  onClick={() => setActiveTab('ui')}
                  className={`flex-1 px-3 py-1 text-xs rounded transition-colors ${
                    activeTab === 'ui'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  UI
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        {!field && !section && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Code
              </label>
              <input
                type="text"
                value={formData.meta.code}
                onChange={(e) => onUpdateMeta({ code: e.target.value })}
                className="input"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Name
              </label>
              <input
                type="text"
                value={formData.meta.name}
                onChange={(e) => onUpdateMeta({ name: e.target.value })}
                className="input"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Version
              </label>
              <input
                type="text"
                value={formData.meta.version}
                onChange={(e) => onUpdateMeta({ version: e.target.value })}
                className="input"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Layout
              </label>
              <select
                value={formData.meta.layout}
                onChange={(e) => onUpdateMeta({ layout: e.target.value })}
                className="input"
              >
                <option value="1-column">1 Column</option>
                <option value="2-column">2 Columns</option>
                <option value="3-column">3 Columns</option>
              </select>
            </div>

            <div className="text-sm text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="font-medium text-blue-900 mb-1">💡 Quick Start</p>
              <p className="text-blue-700">Select a section or field to edit its properties</p>
            </div>
          </div>
        )}

        {section && !field && activeTab === 'general' && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => onUpdateSection({ title: e.target.value })}
                className="input"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section ID
              </label>
              <input
                type="text"
                value={section.id}
                onChange={(e) => onUpdateSection({ id: e.target.value })}
                className="input font-mono text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <input
                type="text"
                value={section.icon || ''}
                onChange={(e) => onUpdateSection({ icon: e.target.value })}
                className="input"
                placeholder="e.g., file-text, database"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order
              </label>
              <input
                type="number"
                value={section.order || 0}
                onChange={(e) => onUpdateSection({ order: parseInt(e.target.value) })}
                className="input"
              />
            </div>
          </div>
        )}

        {field && activeTab === 'general' && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field Label
              </label>
              <input
                type="text"
                value={field.label}
                onChange={(e) => onUpdateField({ label: e.target.value })}
                className="input"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field ID
              </label>
              <input
                type="text"
                value={field.id}
                onChange={(e) => onUpdateField({ id: e.target.value })}
                className="input font-mono text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data Path
              </label>
              <input
                type="text"
                value={field.dataPath}
                onChange={(e) => onUpdateField({ dataPath: e.target.value })}
                className="input font-mono text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Control Type
              </label>
              <select
                value={field.control}
                onChange={(e) => onUpdateField({ control: e.target.value })}
                className="input"
              >
                <option value="text">Text</option>
                <option value="textarea">Text Area</option>
                <option value="number">Number</option>
                <option value="select">Select</option>
                <option value="multiselect">Multi Select</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
                <option value="date">Date</option>
                <option value="slider">Slider</option>
                <option value="checklist">Checklist</option>
                <option value="table">Table</option>
                <option value="file">File</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={field.required || false}
                  onChange={(e) => onUpdateField({ required: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Required</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={field.readonly || false}
                  onChange={(e) => onUpdateField({ readonly: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Read Only</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={field.hidden || false}
                  onChange={(e) => onUpdateField({ hidden: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Hidden</span>
              </label>
            </div>

            {/* Options for select/radio/checkbox */}
            {['select', 'multiselect', 'radio'].includes(field.control) && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options
                </label>
                {(field.options || []).map((opt: any, idx: number) => (
                  <div key={idx} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={opt.value}
                      onChange={(e) => {
                        const newOptions = [...(field.options || [])];
                        newOptions[idx] = { ...opt, value: e.target.value };
                        onUpdateField({ options: newOptions });
                      }}
                      placeholder="Value"
                      className="input flex-1 text-sm"
                    />
                    <input
                      type="text"
                      value={opt.label}
                      onChange={(e) => {
                        const newOptions = [...(field.options || [])];
                        newOptions[idx] = { ...opt, label: e.target.value };
                        onUpdateField({ options: newOptions });
                      }}
                      placeholder="Label"
                      className="input flex-1 text-sm"
                    />
                    <button
                      onClick={() => {
                        const newOptions = (field.options || []).filter((_: any, i: number) => i !== idx);
                        onUpdateField({ options: newOptions });
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newOptions = [...(field.options || []), { value: '', label: '' }];
                    onUpdateField({ options: newOptions });
                  }}
                  className="btn btn-sm btn-secondary w-full"
                >
                  + Add Option
                </button>
              </div>
            )}
          </div>
        )}

        {field && activeTab === 'validation' && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Value
              </label>
              <input
                type="number"
                value={field.validation?.min || ''}
                onChange={(e) => onUpdateField({ 
                  validation: { ...field.validation, min: e.target.value ? parseFloat(e.target.value) : undefined }
                })}
                className="input"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Value
              </label>
              <input
                type="number"
                value={field.validation?.max || ''}
                onChange={(e) => onUpdateField({ 
                  validation: { ...field.validation, max: e.target.value ? parseFloat(e.target.value) : undefined }
                })}
                className="input"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pattern (Regex)
              </label>
              <input
                type="text"
                value={field.validation?.pattern || ''}
                onChange={(e) => onUpdateField({ 
                  validation: { ...field.validation, pattern: e.target.value }
                })}
                className="input font-mono text-sm"
                placeholder="^[A-Z0-9]+$"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Error Message
              </label>
              <textarea
                value={field.validation?.message || ''}
                onChange={(e) => onUpdateField({ 
                  validation: { ...field.validation, message: e.target.value }
                })}
                className="input"
                rows={2}
              />
            </div>
          </div>
        )}

        {field && activeTab === 'ui' && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Placeholder
              </label>
              <input
                type="text"
                value={field.placeholder || ''}
                onChange={(e) => onUpdateField({ placeholder: e.target.value })}
                className="input"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Help Text
              </label>
              <textarea
                value={field.helpText || ''}
                onChange={(e) => onUpdateField({ helpText: e.target.value })}
                className="input"
                rows={2}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CSS Classes
              </label>
              <input
                type="text"
                value={field.className || ''}
                onChange={(e) => onUpdateField({ className: e.target.value })}
                className="input"
                placeholder="col-span-2"
              />
            </div>

            {field.control === 'slider' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min
                  </label>
                  <input
                    type="number"
                    value={field.ui?.min || 0}
                    onChange={(e) => onUpdateField({ 
                      ui: { ...field.ui, min: parseInt(e.target.value) }
                    })}
                    className="input"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max
                  </label>
                  <input
                    type="number"
                    value={field.ui?.max || 100}
                    onChange={(e) => onUpdateField({ 
                      ui: { ...field.ui, max: parseInt(e.target.value) }
                    })}
                    className="input"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Step
                  </label>
                  <input
                    type="number"
                    value={field.ui?.step || 1}
                    onChange={(e) => onUpdateField({ 
                      ui: { ...field.ui, step: parseInt(e.target.value) }
                    })}
                    className="input"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

