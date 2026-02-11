import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, FileText, Settings, BarChart3, Menu, ChevronLeft } from 'lucide-react';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Đọc trạng thái từ localStorage
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  // Lưu trạng thái vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const navigation = [
    { name: 'Trang chủ', href: '/', icon: Home },
    { name: 'Sản phẩm', href: '/products', icon: Package },
    { name: 'Lãnh đạo', href: '/leadership', icon: BarChart3 },
    { name: 'Biểu mẫu', href: '/forms', icon: FileText },
    { name: 'Cài đặt', href: '/settings', icon: Settings },
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-3"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">
                VTR Product Evaluation
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin User</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside 
          className={clsx(
            'bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col',
            sidebarCollapsed ? 'w-16' : 'w-64'
          )}
        >
          <nav className="px-3 py-4 space-y-1 flex-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className={clsx('h-5 w-5 flex-shrink-0', sidebarCollapsed ? '' : 'mr-3')} />
                  <span 
                    className={clsx(
                      'whitespace-nowrap transition-all duration-300',
                      sidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                    )}
                  >
                    {item.name}
                  </span>
                  
                  {/* Tooltip khi sidebar collapsed */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Toggle button at bottom of sidebar */}
          <div className="px-3 py-4 border-t border-gray-200">
            <button
              onClick={toggleSidebar}
              className={clsx(
                'flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors',
                sidebarCollapsed ? 'justify-center' : 'justify-start'
              )}
              aria-label={sidebarCollapsed ? 'Mở sidebar' : 'Thu gọn sidebar'}
            >
              <ChevronLeft 
                className={clsx(
                  'h-5 w-5 flex-shrink-0 transition-transform duration-300',
                  sidebarCollapsed ? 'rotate-180' : ''
                )} 
              />
              <span 
                className={clsx(
                  'ml-2 whitespace-nowrap transition-all duration-300',
                  sidebarCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
                )}
              >
                Thu gọn
              </span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

