import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FileText, Eye, Edit, Plus } from 'lucide-react';
import { formsApi } from '@/lib/api';

export default function FormsPage() {
  const { data: forms, isLoading } = useQuery({
    queryKey: ['forms'],
    queryFn: async () => {
      const response = await formsApi.getAll();
      return response.data;
    },
  });

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý biểu mẫu</h1>
          <p className="text-gray-600 mt-1">
            Cấu hình và quản lý các form đánh giá sản phẩm
          </p>
        </div>
        <Link to="/forms/new" className="btn btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Tạo biểu mẫu mới
        </Link>
      </div>

      {/* Forms Grid */}
      {forms && forms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form: any) => {
            const activeVersion = form.versions?.find((v: any) => v.isActive);
            return (
              <div key={form.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-primary-100 rounded-lg mr-3">
                      <FileText className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{form.name}</h3>
                      <p className="text-sm text-gray-500">{form.code}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    form.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {form.status}
                  </span>
                </div>

                {/* Version Info */}
                {activeVersion && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Phiên bản:</span>
                      <span className="font-medium text-gray-900">v{activeVersion.versionNo}</span>
                    </div>
                    {activeVersion.configJson && (
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-600">Số sections:</span>
                        <span className="font-medium text-gray-900">
                          {activeVersion.configJson.schema?.sections?.length || 0}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link 
                    to={`/forms/${form.code}`}
                    className="flex-1 btn btn-outline text-sm flex items-center justify-center"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Xem
                  </Link>
                  <Link 
                    to={`/forms/${form.code}/edit`}
                    className="flex-1 btn btn-outline text-sm flex items-center justify-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Sửa
                  </Link>
                </div>

                {/* Schema Preview */}
                {activeVersion?.configJson && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <details className="text-sm">
                      <summary className="cursor-pointer text-gray-600 hover:text-gray-900">
                        Xem schema JSON
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto max-h-40">
                        {JSON.stringify(activeVersion.configJson, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Chưa có biểu mẫu nào</p>
          <Link to="/forms/new" className="btn btn-primary">
            Tạo biểu mẫu đầu tiên
          </Link>
        </div>
      )}

      {/* Info Section */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2">
          ℹ️ Về biểu mẫu động
        </h3>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong>Form Schema:</strong> Mỗi biểu mẫu được định nghĩa bằng JSON schema với các sections và fields.
          </p>
          <p>
            <strong>Versioning:</strong> Mỗi thay đổi tạo version mới, cho phép theo dõi lịch sử.
          </p>
          <p>
            <strong>Active Version:</strong> Chỉ có 1 version active được dùng cho sản phẩm mới.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-3xl font-bold text-blue-600 mb-1">
            {forms?.length || 0}
          </div>
          <div className="text-sm text-gray-600">Tổng số biểu mẫu</div>
        </div>
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-3xl font-bold text-green-600 mb-1">
            {forms?.filter((f: any) => f.status === 'active').length || 0}
          </div>
          <div className="text-sm text-gray-600">Đang hoạt động</div>
        </div>
        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="text-3xl font-bold text-purple-600 mb-1">
            {forms?.reduce((sum: number, f: any) => sum + (f.versions?.length || 0), 0) || 0}
          </div>
          <div className="text-sm text-gray-600">Tổng số versions</div>
        </div>
      </div>
    </div>
  );
}

