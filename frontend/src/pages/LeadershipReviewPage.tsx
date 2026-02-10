import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { productsApi, scoringApi, workflowApi } from '@/lib/api';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Download,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useState } from 'react';
import ScoreDisplay from '@/components/ScoreDisplay';

export default function LeadershipReviewPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', code],
    queryFn: async () => {
      const response = await productsApi.getByCode(code!);
      return response.data;
    },
  });

  const { data: workflow } = useQuery({
    queryKey: ['workflow', code],
    queryFn: async () => {
      const response = await workflowApi.get(code!);
      return response.data;
    },
    enabled: !!code,
  });

  const approveMutation = useMutation({
    mutationFn: async (data: { decision: string; comment: string }) => {
      return await workflowApi.addAction(code!, {
        actionType: 'APPROVE',
        actor: 'LEADER',
        comment: data.comment,
        metadata: { decision: data.decision }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow', code] });
      queryClient.invalidateQueries({ queryKey: ['product', code] });
      alert('Đã ghi nhận quyết định!');
      navigate('/leadership');
    },
  });

  const handleApprove = () => {
    if (confirm('Xác nhận PHÊ DUYỆT sản phẩm này?')) {
      approveMutation.mutate({ decision: 'APPROVED', comment });
    }
  };

  const handleReject = () => {
    if (!comment.trim()) {
      alert('Vui lòng nhập lý do từ chối');
      setShowCommentBox(true);
      return;
    }
    if (confirm('Xác nhận TỪ CHỐI sản phẩm này?')) {
      approveMutation.mutate({ decision: 'REJECTED', comment });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Không tìm thấy sản phẩm</p>
      </div>
    );
  }

  const latestVersion = product.versions?.[0];
  const scores = latestVersion?.scores || [];
  const leiScore = scores.find((s: any) => s.framework.code === 'LEI');
  const esgScore = scores.find((s: any) => s.framework.code === 'ESG');
  const kpiScore = scores.find((s: any) => s.framework.code === 'KPI');

  const overallStatus = scores.length > 0
    ? scores.every((s: any) => s.status === 'PASS')
      ? 'PASS'
      : scores.some((s: any) => s.status === 'FAIL')
      ? 'FAIL'
      : 'WARN'
    : 'PENDING';

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'PASS':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: CheckCircle,
          label: 'Đạt Chuẩn'
        };
      case 'FAIL':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: XCircle,
          label: 'Không Đạt'
        };
      case 'WARN':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          icon: AlertCircle,
          label: 'Cảnh Báo'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          icon: AlertCircle,
          label: 'Chờ Đánh Giá'
        };
    }
  };

  const statusConfig = getStatusConfig(overallStatus);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/leadership')}
            className="text-gray-600 hover:text-gray-900"
            aria-label="Quay lại"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-600 mt-1">Mã sản phẩm: {product.code}</p>
          </div>
        </div>
        <button className="btn btn-outline flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </button>
      </div>

      {/* Overall Status Card */}
      <div className={`card ${statusConfig.bg} ${statusConfig.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-4 bg-white rounded-lg shadow`}>
              <StatusIcon className={`h-12 w-12 ${statusConfig.text}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{statusConfig.label}</h2>
              <p className="text-gray-600 mt-1">Tổng quan đánh giá sản phẩm</p>
            </div>
          </div>
          {scores.length > 0 && (
            <div className="text-right">
              <div className="text-sm text-gray-600">Điểm trung bình</div>
              <div className="text-4xl font-bold text-gray-900 mt-1">
                {Math.round(scores.reduce((sum: number, s: any) => sum + s.totalScore, 0) / scores.length)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Scores */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* LEI Score */}
            {leiScore && (
              <div className="card">
                <div className="text-sm font-medium text-gray-600 mb-2">LEI Score</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold text-gray-900">
                      {leiScore.totalScore}
                    </div>
                    <div className="text-sm text-gray-500">out of 100</div>
                  </div>
                  {leiScore.totalScore >= 80 ? (
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  ) : (
                    <TrendingDown className="h-8 w-8 text-red-500" />
                  )}
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        leiScore.totalScore >= 80
                          ? 'bg-green-500'
                          : leiScore.totalScore >= 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${leiScore.totalScore}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ESG Score */}
            {esgScore && (
              <div className="card">
                <div className="text-sm font-medium text-gray-600 mb-2">ESG Score</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold text-gray-900">
                      {esgScore.totalScore}
                    </div>
                    <div className="text-sm text-gray-500">out of 100</div>
                  </div>
                  {esgScore.totalScore >= 70 ? (
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  ) : (
                    <TrendingDown className="h-8 w-8 text-red-500" />
                  )}
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        esgScore.totalScore >= 70
                          ? 'bg-green-500'
                          : esgScore.totalScore >= 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${esgScore.totalScore}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* KPI Score */}
            {kpiScore && (
              <div className="card">
                <div className="text-sm font-medium text-gray-600 mb-2">KPI Score</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold text-gray-900">
                      {kpiScore.totalScore}
                    </div>
                    <div className="text-sm text-gray-500">out of 100</div>
                  </div>
                  {kpiScore.totalScore >= 60 ? (
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  ) : (
                    <TrendingDown className="h-8 w-8 text-red-500" />
                  )}
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        kpiScore.totalScore >= 60
                          ? 'bg-green-500'
                          : kpiScore.totalScore >= 40
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${kpiScore.totalScore}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Detailed Scores */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Chi Tiết Điểm Số</h3>
            <ScoreDisplay productCode={product.code} />
          </div>

          {/* Product Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông Tin Sản Phẩm</h3>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-600">Tên Sản Phẩm</dt>
                <dd className="mt-1 text-sm text-gray-900">{product.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">Mã Sản Phẩm</dt>
                <dd className="mt-1 text-sm text-gray-900">{product.code}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">Business Unit</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {latestVersion?.fieldValues?.find((fv: any) => fv.field.dataPath === 'identity.business_unit')?.value || '-'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">Product Owner</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {latestVersion?.fieldValues?.find((fv: any) => fv.field.dataPath === 'identity.product_owner')?.value || '-'}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="space-y-6">
          {/* Decision Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quyết Định</h3>
            <div className="space-y-3">
              <button
                onClick={handleApprove}
                disabled={approveMutation.isPending}
                className="w-full btn bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
              >
                <ThumbsUp className="h-5 w-5 mr-2" />
                Phê Duyệt
              </button>
              <button
                onClick={handleReject}
                disabled={approveMutation.isPending}
                className="w-full btn bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
              >
                <ThumbsDown className="h-5 w-5 mr-2" />
                Từ Chối
              </button>
              <button
                onClick={() => setShowCommentBox(!showCommentBox)}
                className="w-full btn btn-outline flex items-center justify-center"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Thêm Nhận Xét
              </button>
            </div>

            {showCommentBox && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nhận xét / Lý do
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="input"
                  placeholder="Nhập nhận xét hoặc lý do..."
                />
              </div>
            )}
          </div>

          {/* Workflow History */}
          {workflow && workflow.actions && workflow.actions.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lịch Sử Duyệt</h3>
              <div className="space-y-3">
                {workflow.actions.map((action: any, index: number) => (
                  <div key={index} className="border-l-2 border-gray-300 pl-4">
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 mt-1">
                        {action.actionType === 'APPROVE' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : action.actionType === 'REJECT' ? (
                          <XCircle className="h-5 w-5 text-red-500" />
                        ) : (
                          <MessageSquare className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {action.actor}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{action.comment}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(action.createdAt).toLocaleString('vi-VN')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="card bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Thống Kê Nhanh</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tổng tiêu chí:</span>
                <span className="font-medium text-gray-900">
                  {scores.reduce((sum: number, s: any) => sum + (s.details?.length || 0), 0)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Đạt chuẩn:</span>
                <span className="font-medium text-green-600">
                  {scores.reduce((sum: number, s: any) => 
                    sum + (s.details?.filter((d: any) => d.status === 'PASS').length || 0), 0
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Không đạt:</span>
                <span className="font-medium text-red-600">
                  {scores.reduce((sum: number, s: any) => 
                    sum + (s.details?.filter((d: any) => d.status === 'FAIL').length || 0), 0
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

