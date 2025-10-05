import { Home, Heart, Map, SlidersHorizontal, User } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'favorites', icon: Heart, label: 'Избранное' },
    { id: 'map', icon: Map, label: 'Карта' },
    { id: 'filters', icon: SlidersHorizontal, label: 'Фильтры' },
    { id: 'profile', icon: User, label: 'Профиль' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t z-50 shadow-2xl" style={{ borderColor: '#f0f0f0' }}>
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200"
            >
              {isActive && (
                <div 
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full transition-all duration-200"
                  style={{ background: 'linear-gradient(90deg, #30ad00 0%, #25c000 100%)' }}
                />
              )}
              <div 
                className={`flex items-center justify-center w-10 h-10 rounded-2xl transition-all duration-200 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
                style={{ 
                  backgroundColor: isActive ? '#30ad0015' : 'transparent'
                }}
              >
                <Icon
                  className="w-6 h-6 transition-all duration-200"
                  style={{ 
                    color: isActive ? '#30ad00' : '#929292',
                    strokeWidth: isActive ? 2.5 : 2
                  }}
                />
              </div>
              <span
                className="text-xs transition-all duration-200"
                style={{ 
                  color: isActive ? '#30ad00' : '#929292',
                  fontWeight: isActive ? 600 : 400
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
