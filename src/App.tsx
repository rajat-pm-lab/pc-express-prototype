import { useStore } from './store';
import TopBar from './components/layout/TopBar';
import BottomNav from './components/layout/BottomNav';
import DemoControls from './components/layout/DemoControls';
import SearchPage from './pages/SearchPage';
import CheckoutPage from './pages/CheckoutPage';
import MealPlanPage from './pages/MealPlanPage';

export default function App() {
  const { activeTab } = useStore();

  return (
    <div className="min-h-screen bg-bg">
      <TopBar />
      {activeTab === 'search' && <SearchPage />}
      {activeTab === 'meals' && <MealPlanPage />}
      {activeTab === 'checkout' && <CheckoutPage />}
      <BottomNav />
      <DemoControls />
    </div>
  );
}
