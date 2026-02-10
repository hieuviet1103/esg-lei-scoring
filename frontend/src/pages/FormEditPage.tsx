import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Code } from 'lucide-react';
import { formsApi } from '@/lib/api';

export default function FormEditPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [jsonSchema, setJsonSchema] = useState('');
  const [jsonError, setJsonError] = useState('');

  const { data: form, isLoading } = useQuery({
    queryKey: ['form', code],
    queryFn: async () => {
      if (!code) return null;
      const response = await formsApi.getByCode(code);
      const activeVersion = response.data.versions?.find((v: any) => v.isActive) || response.data.versions?.[0];
      if (activeVersion?.configJson) {
        setJsonSchema(JSON.stringify(activeVersion.configJson, null, 2));
      }
      return response.data;
    },
    enabled: !!code,
  });

  const saveMutation = useMutation({
    mutationFn: async (configJson: any) => {
      if (code) {
        return await formsApi.update(code, { configJson });
      } else {
        return await formsApi.create({
          code: 'NEW_FORM',
          name: 'New Form',
          configJson,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms'] });
      queryClient.invalidateQueries({ queryKey: ['form', code] });
      navigate(`/forms/${code}`);
    },
  });

  const handleSave = async () => {
    try {
      const parsed = JSON.parse(jsonSchema);
      setJsonError('');
      await saveMutation.mutateAsync(parsed);
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        setJsonError(`JSON Syntax Error: ${error.message}`);
      } else {
        setJsonError(`Error: ${error.message}`);
      }
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonSchema);
      setJsonSchema(JSON.stringify(parsed, null, 2));
      setJsonError('');
    } catch (error: any) {
      setJsonError(`JSON Syntax Error: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-4">
          <button
            onClick={() => navigate('/forms')}
            className="text-gray-600 hover:text-gray-900 mt-1"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {code ? `Chỉnh sửa form: ${form?.name}` : 'Tạo form mới'}
            </h1>
            {code && (
              <p className="text-gray-600 mt-1">
                Code: <span className="font-medium">{code}</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => navigate('/forms')} className="btn btn-outline">
            Hủy
          </button>
          <button onClick={handleFormat} className="btn btn-secondary flex items-center">
            <Code className="h-5 w-5 mr-2" />
            Format JSON
          </button>
          <button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="btn btn-primary flex items-center"
          >
            <Save className="h-5 w-5 mr-2" />
            {saveMutation.isPending ? 'Đang lưu...' : 'Lưu form'}
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2">
          ℹ️ Hướng dẫn chỉnh sửa Form Schema
        </h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p>• Chỉnh sửa JSON schema bên dưới để thay đổi cấu trúc form</p>
          <p>• Schema bao gồm: <code className="bg-white px-1 rounded">schema</code> (sections + fields) và <code className="bg-white px-1 rounded">rules</code> (validation + computed)</p>
          <p>• Click "Format JSON" để format lại code</p>
          <p>• Khi lưu sẽ tạo version mới cho form</p>
        </div>
      </div>

      {/* Error Display */}
      {jsonError && (
        <div className="card bg-red-50 border-red-200">
          <h3 className="font-semibold text-red-900 mb-2">❌ Lỗi JSON</h3>
          <pre className="text-sm text-red-700 whitespace-pre-wrap">{jsonError}</pre>
        </div>
      )}

      {/* JSON Editor */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Code className="h-5 w-5 mr-2" />
            JSON Schema Editor
          </h2>
          <div className="text-sm text-gray-600">
            {jsonSchema.split('\n').length} lines
          </div>
        </div>
        <textarea
          value={jsonSchema}
          onChange={(e) => setJsonSchema(e.target.value)}
          className="w-full font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows={30}
          spellCheck={false}
          placeholder={`{
  "schema": {
    "meta": {
      "code": "FORM_CODE",
      "name": "Form Name"
    },
    "sections": [
      {
        "id": "section_1",
        "title": "Section Title",
        "fields": []
      }
    ]
  },
  "rules": {
    "validation": [],
    "computed": []
  }
}`}
        />
      </div>

      {/* Schema Reference */}
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-3">📚 Tham khảo Schema</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium text-gray-900">Field Types:</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              text, number, date, bool, select, json
            </code>
          </div>
          <div>
            <p className="font-medium text-gray-900">Control Types:</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              input, textarea, select, radio, checkbox, slider, checklist, table, repeater, computed
            </code>
          </div>
          <div>
            <p className="font-medium text-gray-900">Validation Types:</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              required, minRows, maxLength, pattern
            </code>
          </div>
          <div>
            <p className="font-medium text-gray-900">Computed Types:</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
              sum, sumChecklistPoints, formula
            </code>
          </div>
        </div>
      </div>

      {/* Preview (Optional) */}
      <div className="card bg-gray-50">
        <h3 className="font-semibold text-gray-900 mb-2">🔍 Preview</h3>
        <p className="text-sm text-gray-600">
          Form preview sẽ được hiển thị sau khi lưu. Bạn có thể test bằng cách tạo sản phẩm mới.
        </p>
      </div>
    </div>
  );
}

