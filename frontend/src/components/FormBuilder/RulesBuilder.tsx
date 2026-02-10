import { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

interface RulesBuilderProps {
  rules: any;
  sections: any[];
  onUpdateRules: (rules: any) => void;
}

export default function RulesBuilder({ rules, sections, onUpdateRules }: RulesBuilderProps) {
  const [expandedValidation, setExpandedValidation] = useState(true);
  const [expandedComputed, setExpandedComputed] = useState(true);

  const allFields = sections.flatMap((section, sIdx) =>
    (section.fields || []).map((field: any, fIdx: number) => ({
      ...field,
      sectionIdx: sIdx,
      fieldIdx: fIdx,
      fullPath: `${section.id}.${field.id}`
    }))
  );

  const addValidationRule = () => {
    const newRule = {
      id: `val_${Date.now()}`,
      field: '',
      condition: 'required',
      message: 'This field is required'
    };
    onUpdateRules({
      ...rules,
      validation: [...(rules.validation || []), newRule]
    });
  };

  const updateValidationRule = (idx: number, updates: any) => {
    const newValidation = [...(rules.validation || [])];
    newValidation[idx] = { ...newValidation[idx], ...updates };
    onUpdateRules({ ...rules, validation: newValidation });
  };

  const deleteValidationRule = (idx: number) => {
    const newValidation = (rules.validation || []).filter((_: any, i: number) => i !== idx);
    onUpdateRules({ ...rules, validation: newValidation });
  };

  const addComputedRule = () => {
    const newRule = {
      id: `comp_${Date.now()}`,
      target: '',
      expression: '',
      dependencies: []
    };
    onUpdateRules({
      ...rules,
      computed: [...(rules.computed || []), newRule]
    });
  };

  const updateComputedRule = (idx: number, updates: any) => {
    const newComputed = [...(rules.computed || [])];
    newComputed[idx] = { ...newComputed[idx], ...updates };
    onUpdateRules({ ...rules, computed: newComputed });
  };

  const deleteComputedRule = (idx: number) => {
    const newComputed = (rules.computed || []).filter((_: any, i: number) => i !== idx);
    onUpdateRules({ ...rules, computed: newComputed });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Business Rules</h3>

      {/* Validation Rules */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => setExpandedValidation(!expandedValidation)}
          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
        >
          <div className="flex items-center space-x-2">
            {expandedValidation ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            <span className="font-medium text-gray-900">Validation Rules</span>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
              {(rules.validation || []).length}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addValidationRule();
            }}
            className="btn btn-sm btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Rule
          </button>
        </button>

        {expandedValidation && (
          <div className="p-4 space-y-4">
            {(rules.validation || []).map((rule: any, idx: number) => (
              <div key={rule.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Field
                    </label>
                    <select
                      value={rule.field}
                      onChange={(e) => updateValidationRule(idx, { field: e.target.value })}
                      className="input"
                    >
                      <option value="">Select field...</option>
                      {allFields.map((field) => (
                        <option key={field.id} value={field.dataPath}>
                          {field.label} ({field.dataPath})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Condition
                    </label>
                    <select
                      value={rule.condition}
                      onChange={(e) => updateValidationRule(idx, { condition: e.target.value })}
                      className="input"
                    >
                      <option value="required">Required</option>
                      <option value="min">Min Value</option>
                      <option value="max">Max Value</option>
                      <option value="pattern">Pattern</option>
                      <option value="custom">Custom Expression</option>
                    </select>
                  </div>

                  {['min', 'max', 'pattern'].includes(rule.condition) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Value
                      </label>
                      <input
                        type="text"
                        value={rule.value || ''}
                        onChange={(e) => updateValidationRule(idx, { value: e.target.value })}
                        className="input"
                      />
                    </div>
                  )}

                  {rule.condition === 'custom' && (
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expression
                      </label>
                      <input
                        type="text"
                        value={rule.expression || ''}
                        onChange={(e) => updateValidationRule(idx, { expression: e.target.value })}
                        className="input font-mono text-sm"
                        placeholder="e.g., value > 0 && value < 100"
                      />
                    </div>
                  )}

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Error Message
                    </label>
                    <input
                      type="text"
                      value={rule.message}
                      onChange={(e) => updateValidationRule(idx, { message: e.target.value })}
                      className="input"
                    />
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => deleteValidationRule(idx)}
                    className="text-red-600 hover:text-red-800 text-sm flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {(rules.validation || []).length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No validation rules yet</p>
                <button onClick={addValidationRule} className="btn btn-sm btn-secondary mt-2">
                  Add First Rule
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Computed Rules */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => setExpandedComputed(!expandedComputed)}
          className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
        >
          <div className="flex items-center space-x-2">
            {expandedComputed ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            <span className="font-medium text-gray-900">Computed Fields</span>
            <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
              {(rules.computed || []).length}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addComputedRule();
            }}
            className="btn btn-sm btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Rule
          </button>
        </button>

        {expandedComputed && (
          <div className="p-4 space-y-4">
            {(rules.computed || []).map((rule: any, idx: number) => (
              <div key={rule.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Field
                    </label>
                    <select
                      value={rule.target}
                      onChange={(e) => updateComputedRule(idx, { target: e.target.value })}
                      className="input"
                    >
                      <option value="">Select target field...</option>
                      {allFields.map((field) => (
                        <option key={field.id} value={field.dataPath}>
                          {field.label} ({field.dataPath})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expression
                    </label>
                    <input
                      type="text"
                      value={rule.expression}
                      onChange={(e) => updateComputedRule(idx, { expression: e.target.value })}
                      className="input font-mono text-sm"
                      placeholder="e.g., field1 + field2 * 0.5"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Use field dataPath in your expression (e.g., section1.field1 + section1.field2)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dependencies (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={(rule.dependencies || []).join(', ')}
                      onChange={(e) => updateComputedRule(idx, { 
                        dependencies: e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean)
                      })}
                      className="input font-mono text-sm"
                      placeholder="section1.field1, section1.field2"
                    />
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => deleteComputedRule(idx)}
                    className="text-red-600 hover:text-red-800 text-sm flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {(rules.computed || []).length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No computed fields yet</p>
                <button onClick={addComputedRule} className="btn btn-sm btn-secondary mt-2">
                  Add First Rule
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Validation rules are checked on form submission</li>
          <li>Computed fields update automatically when dependencies change</li>
          <li>Use dataPath in expressions (e.g., section1.field1 + section2.field2)</li>
          <li>Custom validation can use any JavaScript expression</li>
        </ul>
      </div>
    </div>
  );
}

