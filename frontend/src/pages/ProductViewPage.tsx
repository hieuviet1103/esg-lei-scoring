import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Calculator } from 'lucide-react';
import { productsApi, scoringApi } from '@/lib/api';
import DynamicFormRenderer from '@/components/DynamicFormRenderer';
import ScoreDisplay from '@/components/ScoreDisplay';
import { getStatusBadgeColor, formatDate } from '@/lib/utils';

export default function ProductViewPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isCalculating, setIsCalculating] = useState(false);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', code],
    queryFn: async () => {
      const response = await productsApi.getByCode(code!);
      return response.data;
    },
    enabled: !!code,
  });

  const calculateMutation = useMutation({
    mutationFn: async () => {
      return await scoringApi.calculate(code!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', code] });
    },
  });

  const handleCalculateScores = async () => {
    setIsCalculating(true);
    try {
      await calculateMutation.mutateAsync();
      alert('Đã tính điểm thành công!');
    } catch (error) {
      console.error('Error calculating scores:', error);
      alert('Có lỗi xảy ra khi tính điểm');
    } finally {
      setIsCalculating(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="text-gray-500">Đang tải...</div></div>;
  }

  if (!product) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 mb-4">Không tìm thấy sản phẩm</p>
        <button onClick={() => navigate('/products')} className="btn btn-primary">Quay lại danh sách</button>
      </div>
    );
  }

  const latestVersion = product.versions[0];
  const formSchema = latestVersion?.formVersion;
  const scores = latestVersion?.scores || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-4">
          <button onClick={() => navigate('/products')} className="text-gray-600 hover:text-gray-900 mt-1">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.productName}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-sm text-gray-600">Mã: <span className="font-medium">{product.productCode}</span></span>
              <span className="text-sm text-gray-600">•</span>
              <span className="text-sm text-gray-600">Đơn vị: <span className="font-medium">{product.ownerBu}</span></span>
              <span className="text-sm text-gray-600">•</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(latestVersion?.status)}`}>
                {latestVersion?.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Tạo lúc: {formatDate(product.createdAt)}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button onClick={handleCalculateScores} disabled={isCalculating} className="btn btn-outline flex items-center">
            <Calculator className="h-5 w-5 mr-2" />
            {isCalculating ? 'Đang tính...' : 'Tính điểm'}
          </button>
          <Link to={`/products/${code}/edit`} className="btn btn-primary flex items-center">
            <Edit className="h-5 w-5 mr-2" />
            Chỉnh sửa
          </Link>
        </div>
      </div>

      {scores.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scores.map((score: any) => (
            <ScoreDisplay key={score.id} score={score} />
          ))}
        </div>
      )}

      {latestVersion?.dataJson && formSchema && (
        <DynamicFormRenderer
          schema={{
            schema: formSchema.configJson?.schema,
            rules: formSchema.configJson?.rules,
          }}
          initialData={latestVersion.dataJson}
          readOnly={true}
        />
      )}
    </div>
  );
}

