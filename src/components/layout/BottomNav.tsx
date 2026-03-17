import { useStore } from '../../store';

const tabs = [
  { id: 'search' as const, icon: '🔍', label: 'Search' },
  { id: 'meals' as const, icon: '🍽️', label: 'Meals' },
  { id: 'checkout' as const, icon: '🛒', label: 'Cart' },
] as const;

export default function BottomNav() {
  const { activeTab, setActiveTab, cart } = useStore();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] md:max-w-[768px] bg-white border-t border-border z-50">
      <div className="flex">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
              }}
              className={`flex-1 flex flex-col items-center py-2 text-xs transition-colors ${
                isActive ? 'text-loblaws' : 'text-body'
              }`}
            >
              <span className="text-lg relative">
                {tab.icon}
                {tab.id === 'checkout' && cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-loblaws text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.reduce((s, c) => s + c.quantity, 0)}
                  </span>
                )}
              </span>
              <span className={`mt-0.5 font-medium ${isActive ? 'text-loblaws' : ''}`}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
