import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Settings, 
  Database, 
  Shield, 
  Bell, 
  Palette, 
  Users,
  Save,
  RefreshCw
} from 'lucide-react';
import { scoringApi } from '@/lib/api';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  const { data: frameworks } = useQuery({
    queryKey: ['frameworks'],
    queryFn: async () => {
      const response = await scoringApi.getFrameworks();
      return response.data;
    },
  });

  const tabs = [
    { id: 'general', name: 'Tổng quan', icon: Settings },
    { id: 'scoring', name: 'Chấm điểm', icon: Database },
    { id: 'users', name: 'Người dùng', icon: Users },
    { id: 'security', name: 'Bảo mật', icon: Shield },
    { id: 'notifications', name: 'Thông báo', icon: Bell },
    { id: 'appearance', name: 'Giao diện', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h1>
        <p className="text-gray-600 mt-1">
          Quản lý cấu hình và tùy chỉnh hệ thống
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'general' && (
            <>
              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin hệ thống
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Tên hệ thống</label>
                      <input
                        type="text"
                        className="input"
                        defaultValue="VTR Product Evaluation"
                      />
                    </div>
                    <div>
                      <label className="label">Phiên bản</label>
                      <input
                        type="text"
                        className="input"
                        defaultValue="1.0.0"
                        disabled
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Mô tả</label>
                    <textarea
                      className="input"
                      rows={3}
                      defaultValue="Hệ thống đánh giá sản phẩm động với LEI/ESG/KPI"
                    />
                  </div>
                  <div>
                    <label className="label">Ngôn ngữ mặc định</label>
                    <select className="input">
                      <option value="vi">Tiếng Việt</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Cấu hình database
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Database URL</p>
                      <p className="text-sm text-gray-600">postgresql://localhost:5432/dynamic_product</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Connected
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">API Endpoint</p>
                      <p className="text-sm text-gray-600">http://localhost:3000/api</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'scoring' && (
            <>
              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Cấu hình chấm điểm
                </h2>
                {frameworks && frameworks.length > 0 ? (
                  <div className="space-y-4">
                    {frameworks.map((framework: any) => (
                      <div key={framework.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{framework.name}</h3>
                            <p className="text-sm text-gray-600">{framework.code}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            framework.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {framework.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          {framework.description}
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-gray-600">Max Score</p>
                            <p className="font-semibold text-gray-900">{framework.maxScore}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-gray-600">Models</p>
                            <p className="font-semibold text-gray-900">{framework.models?.length || 0}</p>
                          </div>
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-gray-600">Criteria</p>
                            <p className="font-semibold text-gray-900">
                              {framework.models?.reduce((sum: number, m: any) => 
                                sum + (m.criteria?.length || 0), 0) || 0}
                            </p>
                          </div>
                        </div>
                        {framework.models?.[0] && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Pass Threshold:</span>
                              <span className="font-medium text-green-600">
                                ≥ {framework.models[0].passThreshold}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                              <span className="text-gray-600">Warn Threshold:</span>
                              <span className="font-medium text-yellow-600">
                                ≥ {framework.models[0].warnThreshold}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Không có framework nào</p>
                )}
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quản lý người dùng
              </h2>
              <div className="text-center py-8 text-gray-500">
                <Users className="h-16 w-16 mx-auto mb-3 text-gray-400" />
                <p>Tính năng quản lý người dùng</p>
                <p className="text-sm">Đang phát triển...</p>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Bảo mật
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Yêu cầu xác thực</p>
                    <p className="text-sm text-gray-600">Bật authentication cho tất cả requests</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">CORS</p>
                    <p className="text-sm text-gray-600">Cho phép cross-origin requests</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Thông báo
              </h2>
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-16 w-16 mx-auto mb-3 text-gray-400" />
                <p>Tính năng thông báo</p>
                <p className="text-sm">Đang phát triển...</p>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Giao diện
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="label">Theme</label>
                  <select className="input">
                    <option value="light">Light</option>
                    <option value="dark">Dark (Coming soon)</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div>
                  <label className="label">Primary Color</label>
                  <div className="flex items-center space-x-4">
                    <input type="color" defaultValue="#0ea5e9" className="h-10 w-20" />
                    <span className="text-sm text-gray-600">#0ea5e9</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end space-x-3">
            <button className="btn btn-outline flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </button>
            <button className="btn btn-primary flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

