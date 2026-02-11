import { useState, useEffect } from 'react';
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
  const [selectedFormCode, setSelectedFormCode] = useState<string>('');

  // Get all available forms
  const { data: formsData } = useQuery({
    queryKey: ['forms'],
    queryFn: async () => {
      const response = await formsApi.getAll();
      return response.data;
    },
  });

  const { isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', code],
    queryFn: async () => {
      if (!code) return null;
      const response = await productsApi.getByCode(code);
      
      // Set form data from latest version
      if (response.data.versions && response.data.versions[0]) {
        const latestVersion = response.data.versions[0];
        
        if (latestVersion.dataJson) {
          setFormData(latestVersion.dataJson);
        }
        
        // Get form code from formVersion relation
        if (latestVersion.formVersion?.form?.code) {
          setSelectedFormCode(latestVersion.formVersion.form.code);
        }
      }
      
      return response.data;
    },
    enabled: !!code,
  });

  // Set default form if creating new product
  useEffect(() => {
    if (!code && formsData && formsData.length > 0 && !selectedFormCode) {
      setSelectedFormCode(formsData[0].code);
    }
  }, [code, formsData, selectedFormCode]);

  const { data: formSchema, isLoading: isLoadingSchema } = useQuery({
    queryKey: ['form-schema', selectedFormCode],
    queryFn: async () => {
      if (!selectedFormCode) return null;
      const response = await formsApi.getSchema(selectedFormCode);
      return response.data;
    },
    enabled: !!selectedFormCode,
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
          formCode: selectedFormCode,
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
    if (!selectedFormCode) {
      alert('Vui lòng chọn form nhập liệu');
      return;
    }
    
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
          <button 
            onClick={() => navigate('/products')} 
            className="text-gray-600 hover:text-gray-900"
            aria-label="Quay lại danh sách sản phẩm"
            title="Quay lại danh sách sản phẩm"
          >
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
          <button onClick={handleSave} disabled={isSaving || !selectedFormCode} className="btn btn-primary flex items-center">
            <Save className="h-5 w-5 mr-2" />
            {isSaving ? 'Đang lưu...' : 'Lưu sản phẩm'}
          </button>
        </div>
      </div>

      {/* Form Selection */}
      {!code && (
        <div className="card">
          <div className="space-y-4">
            <div>
              <label htmlFor="form-selector" className="block text-sm font-medium text-gray-700 mb-2">
                Chọn Form Nhập Liệu <span className="text-red-500">*</span>
              </label>
              <select
                id="form-selector"
                value={selectedFormCode}
                onChange={(e) => {
                  setSelectedFormCode(e.target.value);
                  setFormData({}); // Reset form data when changing form
                }}
                className="input w-full"
                disabled={!!code}
                aria-label="Chọn form nhập liệu"
              >
                <option value="">-- Chọn form --</option>
                {formsData?.map((form: any) => (
                  <option key={form.code} value={form.code}>
                    {form.name} ({form.code})
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Chọn form để xác định cấu trúc dữ liệu cho sản phẩm này
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Display current form for existing products */}
      {code && selectedFormCode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
          <div className="flex items-center">
            <span className="text-sm font-medium text-blue-900">Form hiện tại:</span>
            <span className="text-sm text-blue-700 ml-2 font-mono">{selectedFormCode}</span>
          </div>
        </div>
      )}

      {/* Form Renderer */}
      {selectedFormCode && (
        <>
          {isLoadingSchema ? (
            <div className="card text-center py-12">
              <p className="text-gray-500">Đang tải form...</p>
            </div>
          ) : formSchema ? (
            <DynamicFormRenderer
              key={selectedFormCode}
              schema={formSchema}
              initialData={formData}
              onChange={setFormData}
            />
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-500">Không tìm thấy form</p>
            </div>
          )}
        </>
      )}

      {!selectedFormCode && (
        <div className="card text-center py-12">
          <p className="text-gray-500">Vui lòng chọn form để bắt đầu nhập liệu</p>
        </div>
      )}
    </div>
  );
}

