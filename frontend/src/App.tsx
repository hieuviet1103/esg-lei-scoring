import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import ProductViewPage from './pages/ProductViewPage';
import FormsPage from './pages/FormsPage';
import FormViewPage from './pages/FormViewPage';
import FormBuilderPage from './pages/FormBuilderPage';
import LeadershipDashboard from './pages/LeadershipDashboard';
import LeadershipReviewPage from './pages/LeadershipReviewPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/new" element={<ProductEditPage />} />
        <Route path="/products/:code" element={<ProductViewPage />} />
        <Route path="/products/:code/edit" element={<ProductEditPage />} />
        <Route path="/forms" element={<FormsPage />} />
        <Route path="/forms/new" element={<FormBuilderPage />} />
        <Route path="/forms/:code" element={<FormViewPage />} />
        <Route path="/forms/:code/edit" element={<FormBuilderPage />} />
        <Route path="/leadership" element={<LeadershipDashboard />} />
        <Route path="/leadership/review/:code" element={<LeadershipReviewPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;

