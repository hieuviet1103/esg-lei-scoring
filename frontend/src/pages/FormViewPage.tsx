import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, FileText, Code, Eye } from 'lucide-react';
import { formsApi } from '@/lib/api';

export default function FormViewPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  const { data: form, isLoading } = useQuery({
    queryKey: ['form', code],
    queryFn: async () => {
      const response = await formsApi.getByCode(code!);
      return response.data;
    },
    enabled: !!code,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 mb-4">Không tìm thấy form</p>
        <button onClick={() => navigate('/forms')} className="btn btn-primary">
          Quay lại danh sách
        </button>
      </div>
    );
  }

  const activeVersion = form.versions?.find((v: any) => v.isActive) || form.versions?.[0];

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
            <h1 className="text-2xl font-bold text-gray-900">{form.name}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-gray-600">
                Code: <span className="font-medium">{form.code}</span>
              </span>
              <span className="text-sm text-gray-600">•</span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  form.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {form.status}
              </span>
            </div>
          </div>
        </div>
        <Link to={`/forms/${code}/edit`} className="btn btn-primary flex items-center">
          <Edit className="h-5 w-5 mr-2" />
          Chỉnh sửa
        </Link>
      </div>

      {/* Versions */}
      {form.versions && form.versions.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Phiên bản
          </h2>
          <div className="space-y-2">
            {form.versions.map((version: any) => (
              <div
                key={version.id}
                className={`flex justify-between items-center p-3 border rounded-lg ${
                  version.isActive ? 'border-primary-300 bg-primary-50' : 'border-gray-200'
                }`}
              >
                <div>
                  <span className="font-medium text-gray-900">Version {version.versionNo}</span>
                  {version.isActive && (
                    <span className="ml-2 px-2 py-1 text-xs bg-primary-600 text-white rounded-full">
                      Active
                    </span>
                  )}
                  <p className="text-sm text-gray-600 mt-1">
                    Created: {new Date(version.createdAt).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form Structure */}
      {activeVersion?.configJson && (
        <>
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Cấu trúc Form
            </h2>
            {activeVersion.configJson.schema?.sections && (
              <div className="space-y-4">
                {activeVersion.configJson.schema.sections.map((section: any, idx: number) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">{section.icon || '📄'}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900">{section.title}</h3>
                          <p className="text-sm text-gray-600">
                            {section.fields?.length || 0} fields
                          </p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        Order: {section.order}
                      </span>
                    </div>

                    {/* Fields */}
                    {section.fields && section.fields.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm font-medium text-gray-700">Fields:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {section.fields.map((field: any) => (
                            <div
                              key={field.id}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                            >
                              <div>
                                <span className="font-medium text-gray-900">{field.label}</span>
                                {field.required && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                                <p className="text-xs text-gray-600">
                                  {field.control} ({field.type})
                                </p>
                              </div>
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                {field.id}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rules */}
          {activeVersion.configJson.rules && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Rules & Validation
              </h2>
              
              {/* Validation Rules */}
              {activeVersion.configJson.rules.validation && (
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Validation Rules</h3>
                  <div className="space-y-2">
                    {activeVersion.configJson.rules.validation.map((rule: any, idx: number) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded border-l-4 border-red-400">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-medium text-sm text-gray-900">
                              {rule.type}
                            </span>
                            <p className="text-sm text-gray-600 mt-1">{rule.message}</p>
                          </div>
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                            {rule.id}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Computed Rules */}
              {activeVersion.configJson.rules.computed && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Computed Fields</h3>
                  <div className="space-y-2">
                    {activeVersion.configJson.rules.computed.map((rule: any, idx: number) => (
                      <div key={idx} className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-medium text-sm text-gray-900">
                              {rule.type}
                            </span>
                            <p className="text-sm text-gray-600 mt-1">
                              Target: <code className="bg-white px-1 rounded">{rule.targetPath}</code>
                            </p>
                          </div>
                          <span className="text-xs bg-blue-200 px-2 py-1 rounded">
                            {rule.id}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* JSON Schema */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Code className="h-5 w-5 mr-2" />
              JSON Schema (Full)
            </h2>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              {JSON.stringify(activeVersion.configJson, null, 2)}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}

