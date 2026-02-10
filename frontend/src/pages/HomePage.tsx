import { Link } from 'react-router-dom';
import { Package, FileText, TrendingUp, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const stats = [
    { name: 'Sản phẩm đang triển khai', value: '12', icon: Package, color: 'text-blue-600' },
    { name: 'Đang đánh giá', value: '5', icon: FileText, color: 'text-yellow-600' },
    { name: 'LEI trung bình', value: '82/100', icon: TrendingUp, color: 'text-green-600' },
    { name: 'ESG trung bình', value: '78/100', icon: CheckCircle, color: 'text-green-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Hệ thống đánh giá sản phẩm động
        </h1>
        <p className="mt-2 text-gray-600">
          Quản lý và đánh giá sản phẩm theo tiêu chuẩn LEI/ESG/KPI - VTR Group
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className={`rounded-lg p-3 ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Thao tác nhanh
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/products/new"
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <Package className="h-8 w-8 text-gray-400 mr-4" />
            <div>
              <h3 className="font-medium text-gray-900">Tạo sản phẩm mới</h3>
              <p className="text-sm text-gray-600">Đánh giá sản phẩm mới theo form chuẩn</p>
            </div>
          </Link>
          <Link
            to="/products"
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <FileText className="h-8 w-8 text-gray-400 mr-4" />
            <div>
              <h3 className="font-medium text-gray-900">Xem danh sách sản phẩm</h3>
              <p className="text-sm text-gray-600">Quản lý tất cả sản phẩm hiện có</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Tính năng chính
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">📋 Form động</h3>
            <p className="text-sm text-gray-600">
              Cấu hình form đánh giá linh hoạt theo JSON schema, không cần code
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">🎯 Chấm điểm tự động</h3>
            <p className="text-sm text-gray-600">
              Tính toán LEI, ESG, KPI theo rules engine với threshold cấu hình được
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">📊 Quản lý phiên bản</h3>
            <p className="text-sm text-gray-600">
              Lưu trữ nhiều phiên bản sản phẩm, theo dõi lịch sử thay đổi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

