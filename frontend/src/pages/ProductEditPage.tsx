import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { productsApi, formsApi } from '@/lib/api';
import DynamicFormRenderer from '@/components/DynamicFormRenderer';

export default function ProductEditPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  const { data: formSchema } = useQuery({
    queryKey: ['form-schema', 'PRODUCT_EVAL'],
    queryFn: async () => {
      const response = await formsApi.getSchema('PRODUCT_EVAL');
      return response.data;
    },
  });

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', code],
    queryFn: async () => {
      if (!code) return null;
      const response = await productsApi.getByCode(code);
      if (response.data.versions[0]?.dataJson) {
        setFormData(response.data.versions[0].dataJson);
      }
      return response.data;
    },
    enabled: !!code,
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (code) {
        return await productsApi.update(code, {
          dataJson: data,
          createdBy: 'admin',
        });
      } else {
        return await productsApi.create({
          productCode: data.identity?.product_code || `PROD-${Date.now()}`,
          productName: data.identity?.name || 'Untitled Product',
          ownerBu: data.identity?.owner_bu || 'Default BU',
          formCode: 'PRODUCT_EVAL',
          dataJson: data,
          createdBy: 'admin',
        });
      }
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      const newCode = code || response.data.productCode;
      navigate(`/products/${newCode}`);
    },
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveMutation.mutateAsync(formData);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Có lỗi xảy ra khi lưu sản phẩm');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingProduct) {
    return <div className="flex items-center justify-center h-64"><div className="text-gray-500">Đang tải...</div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('/products')} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {code ? 'Chỉnh sửa sản phẩm' : 'Tạo sản phẩm mới'}
            </h1>
            {code && <p className="text-gray-600 mt-1">Mã sản phẩm: <span className="font-medium">{code}</span></p>}
          </div>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => navigate('/products')} className="btn btn-outline">Hủy</button>
          <button onClick={handleSave} disabled={isSaving} className="btn btn-primary flex items-center">
            <Save className="h-5 w-5 mr-2" />
            {isSaving ? 'Đang lưu...' : 'Lưu sản phẩm'}
          </button>
        </div>
      </div>

      {formSchema ? (
        <DynamicFormRenderer
          schema={formSchema}
          initialData={formData}
          onChange={setFormData}
        />
      ) : (
        <div className="card text-center py-12">
          <p className="text-gray-500">Đang tải form...</p>
        </div>
      )}
    </div>
  );
}

