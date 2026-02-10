import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { productsApi, scoringApi } from '@/lib/api';
import { 
  TrendingUp, 
  TrendingDown,
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BarChart3,
  Filter,
  Download
} from 'lucide-react';
import { useState } from 'react';

export default function LeadershipDashboard() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFramework, setFilterFramework] = useState<string>('all');

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await productsApi.getAll();
      return response.data;
    },
  });

  const { data: frameworks } = useQuery({
    queryKey: ['frameworks'],
    queryFn: async () => {
      const response = await scoringApi.getFrameworks();
      return response.data;
    },
  });

  // Calculate statistics
  const stats = products ? {
    total: products.length,
    passed: products.filter((p: any) => 
      p.versions?.[0]?.scores?.some((s: any) => s.status === 'PASS')
    ).length,
    failed: products.filter((p: any) => 
      p.versions?.[0]?.scores?.some((s: any) => s.status === 'FAIL')
    ).length,
    pending: products.filter((p: any) => 
      !p.versions?.[0]?.scores || p.versions[0].scores.length === 0
    ).length,
  } : { total: 0, passed: 0, failed: 0, pending: 0 };

  // Filter products
  const filteredProducts = products?.filter((product: any) => {
    const latestVersion = product.versions?.[0];
    const scores = latestVersion?.scores || [];
    
    // Filter by status
    if (filterStatus !== 'all') {
      if (filterStatus === 'pending' && scores.length > 0) return false;
      if (filterStatus === 'passed' && !scores.some((s: any) => s.status === 'PASS')) return false;
      if (filterStatus === 'failed' && !scores.some((s: any) => s.status === 'FAIL')) return false;
      if (filterStatus === 'warning' && !scores.some((s: any) => s.status === 'WARN')) return false;
    }

    // Filter by framework
    if (filterFramework !== 'all') {
      if (!scores.some((s: any) => s.framework.code === filterFramework)) return false;
    }

    return true;
  }) || [];

  if (productsLoading) {
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
          <h1 className="text-3xl font-bold text-gray-900">Leadership Dashboard</h1>
          <p className="text-gray-600 mt-1">Tổng quan đánh giá sản phẩm</p>
        </div>
        <button className="btn btn-outline flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Tổng Sản Phẩm</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-500 rounded-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Đạt Chuẩn</p>
              <p className="text-3xl font-bold text-green-900 mt-2">{stats.passed}</p>
              <p className="text-xs text-green-600 mt-1">
                {stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) : 0}% tổng số
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Không Đạt</p>
              <p className="text-3xl font-bold text-red-900 mt-2">{stats.failed}</p>
              <p className="text-xs text-red-600 mt-1">
                {stats.total > 0 ? Math.round((stats.failed / stats.total) * 100) : 0}% tổng số
              </p>
            </div>
            <div className="p-3 bg-red-500 rounded-lg">
              <XCircle className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Chờ Đánh Giá</p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">{stats.pending}</p>
              <p className="text-xs text-yellow-600 mt-1">Cần xem xét</p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-lg">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <div className="flex-1 flex items-center space-x-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">Trạng thái:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-sm"
              >
                <option value="all">Tất cả</option>
                <option value="pending">Chờ đánh giá</option>
                <option value="passed">Đạt chuẩn</option>
                <option value="warning">Cảnh báo</option>
                <option value="failed">Không đạt</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">Framework:</label>
              <select
                value={filterFramework}
                onChange={(e) => setFilterFramework(e.target.value)}
                className="input-sm"
              >
                <option value="all">Tất cả</option>
                {frameworks?.map((fw: any) => (
                  <option key={fw.id} value={fw.code}>{fw.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Hiển thị: <span className="font-semibold">{filteredProducts.length}</span> sản phẩm
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản Phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LEI Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ESG Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng Thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product: any) => {
                const latestVersion = product.versions?.[0];
                const scores = latestVersion?.scores || [];
                const leiScore = scores.find((s: any) => s.framework.code === 'LEI');
                const esgScore = scores.find((s: any) => s.framework.code === 'ESG');

                const getStatusBadge = (status: string) => {
                  switch (status) {
                    case 'PASS':
                      return (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Đạt
                        </span>
                      );
                    case 'FAIL':
                      return (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle className="h-3 w-3 mr-1" />
                          Không đạt
                        </span>
                      );
                    case 'WARN':
                      return (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Cảnh báo
                        </span>
                      );
                    default:
                      return (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Chờ đánh giá
                        </span>
                      );
                  }
                };

                const overallStatus = scores.length > 0
                  ? scores.every((s: any) => s.status === 'PASS')
                    ? 'PASS'
                    : scores.some((s: any) => s.status === 'FAIL')
                    ? 'FAIL'
                    : 'WARN'
                  : 'PENDING';

                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">{product.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {latestVersion?.fieldValues?.find((fv: any) => fv.field.dataPath === 'identity.business_unit')?.value || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {leiScore ? (
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-gray-900">
                            {leiScore.totalScore}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">/100</span>
                          {leiScore.totalScore >= 80 ? (
                            <TrendingUp className="h-4 w-4 text-green-500 ml-2" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500 ml-2" />
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {esgScore ? (
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-gray-900">
                            {esgScore.totalScore}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">/100</span>
                          {esgScore.totalScore >= 70 ? (
                            <TrendingUp className="h-4 w-4 text-green-500 ml-2" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500 ml-2" />
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(overallStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/leadership/review/${product.code}`}
                        className="text-primary-600 hover:text-primary-900 font-medium"
                      >
                        Xem chi tiết →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Không có sản phẩm nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

