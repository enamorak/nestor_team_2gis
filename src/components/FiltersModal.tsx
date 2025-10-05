import { useState, useEffect } from "react";
import { X, Utensils, Pill, ShoppingCart, Car, Dumbbell, Baby, GraduationCap, Trees, ParkingCircle, Fuel, Check, RotateCcw } from "lucide-react";
import { Slider } from "./ui/slider";

interface FiltersModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  onApplyFilters: (filters: Filters) => void;
}

export interface Filters {
  priceRange: [number, number];
  areaRange: [number, number];
  rooms: number[];
  userType: 'parents' | 'drivers' | 'athletes' | null;
  infrastructure: string[];
}

export function FiltersModal({ isOpen, onClose, filters, onApplyFilters }: FiltersModalProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  // Update local filters when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
      // Check if there are saved preferences
      const hasSavedPreferences = filters.userType !== null || 
                                   filters.rooms.length > 0 || 
                                   filters.infrastructure.length > 0;
      if (hasSavedPreferences) {
        setShowSavedMessage(true);
        setTimeout(() => setShowSavedMessage(false), 3000);
      }
    }
  }, [isOpen, filters]);

  if (!isOpen) return null;

  const userTypes = [
    { id: 'parents', label: 'Родители', icon: Baby },
    { id: 'drivers', label: 'Автолюбители', icon: Car },
    { id: 'athletes', label: 'Спортсмены', icon: Dumbbell },
  ];

  const infrastructureOptions = {
    parents: [
      { id: 'food', label: 'Поесть', icon: Utensils },
      { id: 'pharmacy', label: 'Аптеки', icon: Pill },
      { id: 'groceries', label: 'Продукты', icon: ShoppingCart },
      { id: 'school', label: 'Школы', icon: GraduationCap },
      { id: 'kindergarten', label: 'Детсады', icon: Baby },
      { id: 'park', label: 'Парки', icon: Trees },
    ],
    drivers: [
      { id: 'carwash', label: 'Автомойки', icon: Car },
      { id: 'parking', label: 'Парковки', icon: ParkingCircle },
      { id: 'gas', label: 'АЗС', icon: Fuel },
      { id: 'groceries', label: 'Продукты', icon: ShoppingCart },
      { id: 'food', label: 'Поесть', icon: Utensils },
    ],
    athletes: [
      { id: 'gym', label: 'Спортзалы', icon: Dumbbell },
      { id: 'park', label: 'Парки', icon: Trees },
      { id: 'food', label: 'Поесть', icon: Utensils },
      { id: 'pharmacy', label: 'Аптеки', icon: Pill },
      { id: 'groceries', label: 'Продукты', icon: ShoppingCart },
    ],
  };

  const currentInfrastructure = localFilters.userType 
    ? infrastructureOptions[localFilters.userType]
    : [];

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const defaultFilters: Filters = {
      priceRange: [0, 300],
      areaRange: [30, 400],
      rooms: [],
      userType: null,
      infrastructure: [],
    };
    setLocalFilters(defaultFilters);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-h-[90vh] rounded-t-3xl overflow-y-auto shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b px-6 py-5 flex items-center justify-between z-10" style={{ borderColor: '#f0f0f0' }}>
          <div className="flex items-center gap-3">
            <h2 className="text-xl" style={{ color: '#262626', fontWeight: 600 }}>
              Фильтры
            </h2>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ backgroundColor: '#f5f5f5' }}
            >
              <RotateCcw className="w-3.5 h-3.5" style={{ color: '#929292' }} />
              <span className="text-xs" style={{ color: '#929292', fontWeight: 500 }}>Сбросить</span>
            </button>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95" 
            style={{ backgroundColor: '#f5f5f5' }}
          >
            <X className="w-5 h-5" style={{ color: '#262626' }} />
          </button>
        </div>

        <div className="p-6 pb-24">
          {/* Saved Preferences Message */}
          {showSavedMessage && (
            <div 
              className="mb-6 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in duration-300"
              style={{ background: 'linear-gradient(135deg, #30ad0015 0%, #25c00015 100%)', border: '2px solid #30ad0040' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}>
                <Check className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm" style={{ color: '#30ad00', fontWeight: 600 }}>
                  Ваши предпочтения загружены
                </p>
                <p className="text-xs" style={{ color: '#929292' }}>
                  Все настройки сохранены автоматически
                </p>
              </div>
            </div>
          )}

          {/* User Type */}
          <div className="mb-8">
            <h3 className="mb-4" style={{ color: '#262626', fontWeight: 600 }}>
              Тип пользователя
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {userTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = localFilters.userType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      setLocalFilters({
                        ...localFilters,
                        userType: type.id as any,
                        infrastructure: [],
                      });
                    }}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      borderColor: isSelected ? '#30ad00' : '#f0f0f0',
                      background: isSelected ? 'linear-gradient(135deg, #30ad0020 0%, #25c00020 100%)' : 'white',
                      boxShadow: isSelected ? '0 4px 12px rgba(48, 173, 0, 0.15)' : 'none',
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
                      style={{ backgroundColor: isSelected ? '#30ad00' : '#f5f5f5' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: isSelected ? 'white' : '#929292' }} />
                    </div>
                    <span className="text-xs text-center" style={{ color: isSelected ? '#30ad00' : '#262626', fontWeight: isSelected ? 600 : 400 }}>
                      {type.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Infrastructure */}
          {localFilters.userType && (
            <div className="mb-8">
              <h3 className="mb-4" style={{ color: '#262626', fontWeight: 600 }}>
                Инфраструктура
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {currentInfrastructure.map((infra) => {
                  const Icon = infra.icon;
                  const isSelected = localFilters.infrastructure.includes(infra.id);
                  return (
                    <button
                      key={infra.id}
                      onClick={() => {
                        setLocalFilters({
                          ...localFilters,
                          infrastructure: isSelected
                            ? localFilters.infrastructure.filter(i => i !== infra.id)
                            : [...localFilters.infrastructure, infra.id],
                        });
                      }}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{
                        borderColor: isSelected ? '#30ad00' : '#f0f0f0',
                        background: isSelected ? 'linear-gradient(135deg, #30ad0020 0%, #25c00020 100%)' : 'white',
                        boxShadow: isSelected ? '0 4px 12px rgba(48, 173, 0, 0.15)' : 'none',
                      }}
                    >
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                        style={{ backgroundColor: isSelected ? '#30ad00' : '#f5f5f5' }}
                      >
                        <Icon className="w-5 h-5" style={{ color: isSelected ? 'white' : '#929292' }} />
                      </div>
                      <span className="text-xs text-center" style={{ color: isSelected ? '#30ad00' : '#262626', fontWeight: isSelected ? 600 : 400 }}>
                        {infra.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="mb-3" style={{ color: '#262626', fontWeight: 600 }}>
              Цена
            </h3>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border" style={{ borderColor: '#f0f0f0' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: '#30ad0015' }}>
                  <span className="text-sm" style={{ color: '#30ad00', fontWeight: 600 }}>
                    {localFilters.priceRange[0]} млн ₽
                  </span>
                </div>
                <span className="text-sm" style={{ color: '#929292' }}>—</span>
                <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: '#30ad0015' }}>
                  <span className="text-sm" style={{ color: '#30ad00', fontWeight: 600 }}>
                    {localFilters.priceRange[1]} млн ₽
                  </span>
                </div>
              </div>
              <Slider
                min={0}
                max={300}
                step={5}
                value={localFilters.priceRange}
                onValueChange={(value) => {
                  setLocalFilters({ ...localFilters, priceRange: value as [number, number] });
                }}
              />
            </div>
          </div>

          {/* Area Range */}
          <div className="mb-8">
            <h3 className="mb-3" style={{ color: '#262626', fontWeight: 600 }}>
              Площадь
            </h3>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border" style={{ borderColor: '#f0f0f0' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: '#30ad0015' }}>
                  <span className="text-sm" style={{ color: '#30ad00', fontWeight: 600 }}>
                    {localFilters.areaRange[0]} м²
                  </span>
                </div>
                <span className="text-sm" style={{ color: '#929292' }}>—</span>
                <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: '#30ad0015' }}>
                  <span className="text-sm" style={{ color: '#30ad00', fontWeight: 600 }}>
                    {localFilters.areaRange[1]} м²
                  </span>
                </div>
              </div>
              <Slider
                min={30}
                max={400}
                step={10}
                value={localFilters.areaRange}
                onValueChange={(value) => {
                  setLocalFilters({ ...localFilters, areaRange: value as [number, number] });
                }}
              />
            </div>
          </div>

          {/* Rooms */}
          <div className="mb-8">
            <h3 className="mb-4" style={{ color: '#262626', fontWeight: 600 }}>
              Количество комнат
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((room) => {
                const isSelected = localFilters.rooms.includes(room);
                return (
                  <button
                    key={room}
                    onClick={() => {
                      setLocalFilters({
                        ...localFilters,
                        rooms: isSelected
                          ? localFilters.rooms.filter(r => r !== room)
                          : [...localFilters.rooms, room],
                      });
                    }}
                    className="aspect-square py-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{
                      borderColor: isSelected ? '#30ad00' : '#f0f0f0',
                      background: isSelected ? 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' : 'white',
                      color: isSelected ? 'white' : '#262626',
                      fontWeight: isSelected ? 600 : 400,
                      boxShadow: isSelected ? '0 4px 12px rgba(48, 173, 0, 0.2)' : 'none',
                    }}
                  >
                    {room}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="w-full py-5 rounded-2xl text-white transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}
          >
            <span style={{ fontWeight: 600 }}>Применить фильтры</span>
          </button>
        </div>
      </div>
    </div>
  );
}
