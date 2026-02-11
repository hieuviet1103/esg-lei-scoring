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
      id: `c_${Date.now()}`,
      type: 'sum',
      sources: [],
      targetPath: ''
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

  const addSource = (ruleIdx: number) => {
    const rule = rules.computed[ruleIdx];
    if (rule.type === 'sum') {
      const newSources = [...(rule.sources || []), ''];
      updateComputedRule(ruleIdx, { sources: newSources });
    } else if (rule.type === 'sumChecklistPoints') {
      const newSources = [...(rule.sources || []), { path: '', pillar: '', maxPoints: 0 }];
      updateComputedRule(ruleIdx, { sources: newSources });
    }
  };

  const updateSource = (ruleIdx: number, sourceIdx: number, value: any) => {
    const rule = rules.computed[ruleIdx];
    const newSources = [...(rule.sources || [])];
    newSources[sourceIdx] = value;
    updateComputedRule(ruleIdx, { sources: newSources });
  };

  const deleteSource = (ruleIdx: number, sourceIdx: number) => {
    const rule = rules.computed[ruleIdx];
    const newSources = (rule.sources || []).filter((_: any, i: number) => i !== sourceIdx);
    updateComputedRule(ruleIdx, { sources: newSources });
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
                  {/* Rule Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Computation Type
                    </label>
                    <select
                      value={rule.type || 'sum'}
                      onChange={(e) => {
                        const newType = e.target.value;
                        const updates: any = { type: newType };
                        // Reset sources based on type
                        if (newType === 'sum') {
                          updates.sources = [];
                        } else if (newType === 'sumChecklistPoints') {
                          updates.sources = [];
                        }
                        updateComputedRule(idx, updates);
                      }}
                      className="input"
                    >
                      <option value="sum">Sum (Add multiple field values)</option>
                      <option value="sumChecklistPoints">Sum Checklist Points</option>
                    </select>
                  </div>

                  {/* Target Path */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Field (Result)
                    </label>
                    <input
                      type="text"
                      value={rule.targetPath || ''}
                      onChange={(e) => updateComputedRule(idx, { targetPath: e.target.value })}
                      className="input font-mono text-sm"
                      placeholder="e.g., lei.total or esg.total"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Path where the computed result will be stored
                    </p>
                  </div>

                  {/* Sources */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Source Fields
                      </label>
                      <button
                        onClick={() => addSource(idx)}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Source
                      </button>
                    </div>

                    {rule.type === 'sum' && (
                      <div className="space-y-2">
                        {(rule.sources || []).map((source: string, sIdx: number) => (
                          <div key={sIdx} className="flex space-x-2">
                            <input
                              type="text"
                              value={source}
                              onChange={(e) => updateSource(idx, sIdx, e.target.value)}
                              className="input flex-1 font-mono text-sm"
                              placeholder="e.g., lei.criteria.human_interaction.score"
                            />
                            <button
                              onClick={() => deleteSource(idx, sIdx)}
                              className="text-red-600 hover:text-red-800 px-2"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        {(rule.sources || []).length === 0 && (
                          <p className="text-sm text-gray-400 text-center py-2">
                            No sources yet. Click "Add Source" to add field paths.
                          </p>
                        )}
                      </div>
                    )}

                    {rule.type === 'sumChecklistPoints' && (
                      <div className="space-y-3">
                        {(rule.sources || []).map((source: any, sIdx: number) => (
                          <div key={sIdx} className="border border-gray-200 rounded p-3 bg-gray-50 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">Source {sIdx + 1}</span>
                              <button
                                onClick={() => deleteSource(idx, sIdx)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                            <input
                              type="text"
                              value={source.path || ''}
                              onChange={(e) => updateSource(idx, sIdx, { ...source, path: e.target.value })}
                              className="input w-full font-mono text-sm"
                              placeholder="Path (e.g., esg.pillars.E.items)"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={source.pillar || ''}
                                onChange={(e) => updateSource(idx, sIdx, { ...source, pillar: e.target.value })}
                                className="input text-sm"
                                placeholder="Pillar (e.g., E, S, G)"
                              />
                              <input
                                type="number"
                                value={source.maxPoints || 0}
                                onChange={(e) => updateSource(idx, sIdx, { ...source, maxPoints: parseInt(e.target.value) || 0 })}
                                className="input text-sm"
                                placeholder="Max Points"
                              />
                            </div>
                          </div>
                        ))}
                        {(rule.sources || []).length === 0 && (
                          <p className="text-sm text-gray-400 text-center py-2">
                            No sources yet. Click "Add Source" to add checklist paths.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Rule Preview */}
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="text-xs font-medium text-blue-900 mb-1">Rule Preview:</p>
                    <pre className="text-xs text-blue-700 font-mono whitespace-pre-wrap">
                      {JSON.stringify(rule, null, 2)}
                    </pre>
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => deleteComputedRule(idx)}
                    className="text-red-600 hover:text-red-800 text-sm flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete Rule
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
        <h4 className="font-medium text-blue-900 mb-2">💡 Computed Rules Guide</h4>
        <div className="text-sm text-blue-700 space-y-3">
          <div>
            <p className="font-medium">✅ Sum Type:</p>
            <p className="text-xs ml-4">Adds values from multiple fields (e.g., sum all criteria scores)</p>
            <p className="text-xs ml-4 font-mono">Example: lei.total = sum of all criteria scores</p>
          </div>
          <div>
            <p className="font-medium">✅ Sum Checklist Points:</p>
            <p className="text-xs ml-4">Sums points from checklist items (e.g., ESG pillars E+S+G)</p>
            <p className="text-xs ml-4 font-mono">Example: esg.total = sum(E.items) + sum(S.items) + sum(G.items)</p>
          </div>
          <div className="border-t border-blue-300 pt-2">
            <p className="font-medium text-xs">📝 Usage:</p>
            <ul className="text-xs list-disc list-inside ml-2 space-y-1">
              <li>Target path is where result is stored</li>
              <li>Sources are fields to compute from</li>
              <li>Computed fields auto-update on change</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

