import { User, Heart, Eye, Settings, LogOut, ChevronRight, Baby, Car, Dumbbell } from "lucide-react";

interface ProfileViewProps {
  userType?: 'parents' | 'drivers' | 'athletes' | null;
  favoritesCount?: number;
}

export function ProfileView({ userType, favoritesCount = 0 }: ProfileViewProps = {}) {
  const stats = [
    { label: 'Просмотрено', value: 127, icon: Eye },
    { label: 'Избранное', value: favoritesCount, icon: Heart },
  ];

  const menuItems = [
    { label: 'Настройки', icon: Settings },
    { label: 'Выйти', icon: LogOut },
  ];

  const userTypeLabels = {
    parents: { label: 'Родители', icon: Baby, color: '#30ad00' },
    drivers: { label: 'Автолюбители', icon: Car, color: '#3b82f6' },
    athletes: { label: 'Спортсмены', icon: Dumbbell, color: '#f59e0b' },
  };

  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="p-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center mb-4 shadow-xl" style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}>
            <User className="w-14 h-14 text-white" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#30ad00' }} />
            </div>
          </div>
          <h2 className="text-2xl mb-1" style={{ color: '#262626', fontWeight: 600 }}>
            Пользователь
          </h2>
          <div className="px-4 py-1.5 rounded-full" style={{ backgroundColor: '#f5f5f5' }}>
            <p className="text-sm" style={{ color: '#929292' }}>user@example.com</p>
          </div>
          
          {/* User Type Badge */}
          {userType && userTypeLabels[userType] && (
            <div className="mt-3 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg" style={{ background: `linear-gradient(135deg, ${userTypeLabels[userType].color}20 0%, ${userTypeLabels[userType].color}10 100%)` }}>
              {(() => {
                const TypeIcon = userTypeLabels[userType].icon;
                return <TypeIcon className="w-4 h-4" style={{ color: userTypeLabels[userType].color }} />;
              })()}
              <span className="text-sm" style={{ color: userTypeLabels[userType].color, fontWeight: 600 }}>
                {userTypeLabels[userType].label}
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-3xl p-5 text-center border shadow-lg transition-all duration-200 hover:scale-105"
                style={{ borderColor: '#f0f0f0' }}
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm" 
                  style={{ background: 'linear-gradient(135deg, #30ad0020 0%, #25c00020 100%)' }}
                >
                  <Icon className="w-7 h-7" style={{ color: '#30ad00' }} />
                </div>
                <div className="text-3xl mb-1" style={{ color: '#30ad00', fontWeight: 600 }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: '#929292', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="w-full bg-white rounded-2xl p-5 flex items-center justify-between border shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-95"
                style={{ borderColor: '#f0f0f0' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#f5f5f5' }}>
                    <Icon className="w-5 h-5" style={{ color: '#30ad00' }} />
                  </div>
                  <span style={{ color: '#262626', fontWeight: 500 }}>{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5" style={{ color: '#929292' }} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
