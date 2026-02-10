import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Eye,
  Code,
  Settings as SettingsIcon
} from 'lucide-react';
import { formsApi } from '@/lib/api';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SectionBuilder from '@/components/FormBuilder/SectionBuilder';
import FieldPalette from '@/components/FormBuilder/FieldPalette';
import PropertiesPanel from '@/components/FormBuilder/PropertiesPanel';
import RulesBuilder from '@/components/FormBuilder/RulesBuilder';

export default function FormBuilderPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [mode, setMode] = useState<'builder' | 'json' | 'preview'>('builder');
  const [formData, setFormData] = useState<any>({
    meta: {
      code: code || 'NEW_FORM',
      name: 'New Form',
      layout: '3-column',
      version: '1.0.0'
    },
    sections: []
  });
  const [rules, setRules] = useState<any>({
    validation: [],
    computed: []
  });
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [selectedField, setSelectedField] = useState<{ sectionIdx: number; fieldIdx: number } | null>(null);
  const [jsonView, setJsonView] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useQuery({
    queryKey: ['form', code],
    queryFn: async () => {
      if (!code) return null;
      const response = await formsApi.getByCode(code);
      const activeVersion = response.data.versions?.find((v: any) => v.isActive);
      if (activeVersion?.configJson) {
        setFormData(activeVersion.configJson.schema || formData);
        setRules(activeVersion.configJson.rules || rules);
      }
      return response.data;
    },
    enabled: !!code,
  });

  useEffect(() => {
    setJsonView(JSON.stringify({ schema: formData, rules }, null, 2));
  }, [formData, rules]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const configJson = { schema: formData, rules };
      if (code) {
        return await formsApi.update(code, { configJson });
      }
      return await formsApi.create({
        code: formData.meta.code,
        name: formData.meta.name,
        configJson
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      alert('Đã lưu form thành công!');
      navigate('/forms');
    },
  });

  const handleAddSection = () => {
    const newSection = {
      id: `sec_${Date.now()}`,
      title: `Section ${formData.sections.length + 1}`,
      icon: 'file-text',
      order: (formData.sections.length + 1) * 10,
      fields: []
    };
    setFormData({ ...formData, sections: [...formData.sections, newSection] });
  };

  const handleDeleteSection = (index: number) => {
    const newSections = formData.sections.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, sections: newSections });
    if (selectedSection === index) setSelectedSection(null);
  };

  const handleUpdateSection = (index: number, updates: any) => {
    const newSections = [...formData.sections];
    newSections[index] = { ...newSections[index], ...updates };
    setFormData({ ...formData, sections: newSections });
  };

  const handleAddField = (sectionIdx: number, fieldType: string) => {
    const newField = {
      id: `field_${Date.now()}`,
      label: 'New Field',
      type: fieldType === 'number' || fieldType === 'slider' ? 'number' : 'text',
      control: fieldType,
      required: false,
      dataPath: `section_${sectionIdx}.field_${Date.now()}`,
      ...(fieldType === 'select' && { options: [{ value: '', label: 'Option 1' }] }),
      ...(fieldType === 'slider' && { ui: { min: 0, max: 100, step: 1 } }),
      ...(fieldType === 'checklist' && { ui: { maxPoints: 100, items: [] } }),
      ...(fieldType === 'table' && { columns: [] })
    };
    
    const newSections = [...formData.sections];
    newSections[sectionIdx].fields.push(newField);
    setFormData({ ...formData, sections: newSections });
  };

  const handleUpdateField = (sectionIdx: number, fieldIdx: number, updates: any) => {
    const newSections = [...formData.sections];
    newSections[sectionIdx].fields[fieldIdx] = { 
      ...newSections[sectionIdx].fields[fieldIdx], 
      ...updates 
    };
    setFormData({ ...formData, sections: newSections });
  };

  const handleDeleteField = (sectionIdx: number, fieldIdx: number) => {
    const newSections = [...formData.sections];
    newSections[sectionIdx].fields.splice(fieldIdx, 1);
    setFormData({ ...formData, sections: newSections });
    if (selectedField?.sectionIdx === sectionIdx && selectedField?.fieldIdx === fieldIdx) {
      setSelectedField(null);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = formData.sections.findIndex((s: any) => s.id === active.id);
      const newIndex = formData.sections.findIndex((s: any) => s.id === over.id);
      const newSections = arrayMove(formData.sections, oldIndex, newIndex);
      setFormData({ ...formData, sections: newSections });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/forms')} 
                className="text-gray-600 hover:text-gray-900"
                title="Quay lại danh sách form"
                aria-label="Quay lại danh sách form"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {code ? 'Chỉnh sửa Form' : 'Tạo Form Mới'}
                </h1>
                <p className="text-sm text-gray-600">{formData.meta.name}</p>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setMode('builder')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    mode === 'builder'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <SettingsIcon className="h-4 w-4 inline mr-1" />
                  Builder
                </button>
                <button
                  onClick={() => setMode('json')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    mode === 'json'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Code className="h-4 w-4 inline mr-1" />
                  JSON
                </button>
                <button
                  onClick={() => setMode('preview')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    mode === 'preview'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Eye className="h-4 w-4 inline mr-1" />
                  Preview
                </button>
              </div>

              <button
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
                className="btn btn-primary flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {saveMutation.isPending ? 'Đang lưu...' : 'Lưu Form'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {mode === 'builder' && (
          <div className="grid grid-cols-12 gap-6">
            {/* Left: Field Palette */}
            <div className="col-span-2">
              <FieldPalette />
            </div>

            {/* Center: Form Builder */}
            <div className="col-span-7">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Form Structure</h2>
                  <button onClick={handleAddSection} className="btn btn-primary btn-sm flex items-center">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Section
                  </button>
                </div>

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={formData.sections.map((s: any) => s.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4">
                      {formData.sections.map((section: any, sectionIdx: number) => (
                        <SectionBuilder
                          key={section.id}
                          section={section}
                          sectionIdx={sectionIdx}
                          selected={selectedSection === sectionIdx}
                          onSelect={() => setSelectedSection(sectionIdx)}
                          onUpdate={(updates) => handleUpdateSection(sectionIdx, updates)}
                          onDelete={() => handleDeleteSection(sectionIdx)}
                          onAddField={(fieldType) => handleAddField(sectionIdx, fieldType)}
                          onUpdateField={(fieldIdx, updates) => handleUpdateField(sectionIdx, fieldIdx, updates)}
                          onDeleteField={(fieldIdx) => handleDeleteField(sectionIdx, fieldIdx)}
                          onSelectField={(fieldIdx) => setSelectedField({ sectionIdx, fieldIdx })}
                          selectedField={selectedField}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>

                {formData.sections.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <p className="mb-4">Chưa có section nào</p>
                    <button onClick={handleAddSection} className="btn btn-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm Section Đầu Tiên
                    </button>
                  </div>
                )}

                {/* Rules Builder */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <RulesBuilder
                    rules={rules}
                    sections={formData.sections}
                    onUpdateRules={setRules}
                  />
                </div>
              </div>
            </div>

            {/* Right: Properties Panel */}
            <div className="col-span-3">
              <PropertiesPanel
                formData={formData}
                selectedSection={selectedSection}
                selectedField={selectedField}
                onUpdateMeta={(meta) => setFormData({ ...formData, meta: { ...formData.meta, ...meta } })}
                onUpdateSection={(updates) => selectedSection !== null && handleUpdateSection(selectedSection, updates)}
                onUpdateField={(updates) => 
                  selectedField && handleUpdateField(selectedField.sectionIdx, selectedField.fieldIdx, updates)
                }
              />
            </div>
          </div>
        )}

        {mode === 'json' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">JSON Editor</h2>
            <textarea
              value={jsonView}
              onChange={(e) => {
                setJsonView(e.target.value);
                try {
                  const parsed = JSON.parse(e.target.value);
                  setFormData(parsed.schema);
                  setRules(parsed.rules);
                } catch (e) {
                  // Invalid JSON, don't update
                }
              }}
              className="w-full h-[calc(100vh-250px)] font-mono text-sm p-4 border border-gray-300 rounded-lg"
              aria-label="JSON Schema Editor"
              placeholder="Enter JSON schema..."
            />
          </div>
        )}

        {mode === 'preview' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Form Preview</h2>
            <div className="space-y-6">
              {formData.sections.map((section: any) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
                  <div className="space-y-4">
                    {section.fields.map((field: any) => (
                      <div key={field.id}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="text-sm text-gray-500">
                          Type: {field.control} | DataPath: {field.dataPath}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

