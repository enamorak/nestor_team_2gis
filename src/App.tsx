import { useState, useEffect } from "react";
import { PropertyCard } from "./components/PropertyCard";
import { BottomNavigation } from "./components/BottomNavigation";
import { FiltersModal, Filters } from "./components/FiltersModal";
import { FavoritesView } from "./components/FavoritesView";
import { MapView } from "./components/MapView";
import { ProfileView } from "./components/ProfileView";
import { ActiveFiltersIndicator } from "./components/ActiveFiltersIndicator";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

// Helper functions for localStorage
const STORAGE_KEYS = {
  FILTERS: 'tinder-realestate-filters',
  FAVORITES: 'tinder-realestate-favorites',
  CURRENT_INDEX: 'tinder-realestate-index'
};

const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

interface Property {
  id: number;
  name: string;
  image: string;
  distance: string;
  price: string;
  rooms: number;
  area: number;
  floor: string;
  district: string;
}

const mockProperties: Property[] = [
  {
    id: 1,
    name: "ЖК Северный",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTk0OTg5NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "2.3 км",
    price: "12.5 млн ₽",
    rooms: 2,
    area: 65,
    floor: "5/15",
    district: "Северный",
  },
  {
    id: 2,
    name: "ЖК Солнечный",
    image: "https://images.unsplash.com/photo-1758448500872-0d31e905a9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGNvbXBsZXh8ZW58MXx8fHwxNzU5NTkyNTIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "1.8 км",
    price: "18.9 млн ₽",
    rooms: 3,
    area: 85,
    floor: "10/20",
    district: "Центральный",
  },
  {
    id: 3,
    name: "ЖК Парковый",
    image: "https://images.unsplash.com/photo-1439148087823-ab7bb96cb4fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTk1OTU2ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "3.5 км",
    price: "9.8 млн ₽",
    rooms: 1,
    area: 42,
    floor: "3/9",
    district: "Западный",
  },
  {
    id: 4,
    name: "ЖК Riverside",
    image: "https://images.unsplash.com/photo-1545874588-d14ff94cd8d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzU5NTk1NjgyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "4.2 км",
    price: "25.3 млн ₽",
    rooms: 4,
    area: 120,
    floor: "12/18",
    district: "Набережный",
  },
  {
    id: 5,
    name: "ЖК Зеленый квартал",
    image: "https://images.unsplash.com/photo-1759535654772-d787d8cefbe8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBob3VzaW5nJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzU5NTkyNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "5.1 км",
    price: "15.7 млн ₽",
    rooms: 3,
    area: 78,
    floor: "7/12",
    district: "Южный",
  },
  {
    id: 6,
    name: "ЖК Премиум",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NTk0OTg5NzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "2.9 км",
    price: "32.0 млн ₽",
    rooms: 5,
    area: 145,
    floor: "15/25",
    district: "Центральный",
  },
  {
    id: 7,
    name: "ЖК Восточный",
    image: "https://images.unsplash.com/photo-1758448500872-0d31e905a9e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNpZGVudGlhbCUyMGNvbXBsZXh8ZW58MXx8fHwxNzU5NTkyNTIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "6.4 km",
    price: "11.2 млн ₽",
    rooms: 2,
    area: 58,
    floor: "4/10",
    district: "Восточный",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [currentIndex, setCurrentIndex] = useState(() => 
    loadFromStorage(STORAGE_KEYS.CURRENT_INDEX, 0)
  );
  const [favorites, setFavorites] = useState<Property[]>(() => 
    loadFromStorage(STORAGE_KEYS.FAVORITES, [])
  );
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>(() => 
    loadFromStorage(STORAGE_KEYS.FILTERS, {
      priceRange: [0, 300],
      areaRange: [30, 400],
      rooms: [],
      userType: null,
      infrastructure: [],
    })
  );

  // Save filters to localStorage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.FILTERS, filters);
  }, [filters]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  // Save current index to localStorage whenever it changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CURRENT_INDEX, currentIndex);
  }, [currentIndex]);

  // Show welcome tip for new users
  useEffect(() => {
    const hasSeenTip = localStorage.getItem('tinder-realestate-seen-tip');
    if (!hasSeenTip && filters.userType === null) {
      setTimeout(() => {
        toast.info('Совет', {
          description: 'Настройте фильтры для персонализированного поиска',
          duration: 5000,
        });
        localStorage.setItem('tinder-realestate-seen-tip', 'true');
      }, 2000);
    }
  }, []);

  const currentProperty = mockProperties[currentIndex];

  const handleSwipeLeft = () => {
    if (currentIndex < mockProperties.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleSwipeRight = () => {
    if (currentProperty && !favorites.find(f => f.id === currentProperty.id)) {
      setFavorites([...favorites, currentProperty]);
      toast.success('Добавлено в избранное', {
        description: currentProperty.name,
        duration: 2000,
      });
    }
    handleSwipeLeft();
  };

  const handleRemoveFavorite = (id: number) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'filters') {
      setShowFilters(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleApplyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
    toast.success('Предпочтения сохранены', {
      description: 'Ваши фильтры применены и сохранены автоматически',
      duration: 3000,
    });
  };

  return (
    <div className="h-screen w-full max-w-md mx-auto relative" style={{ background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)' }}>
      {/* Main Content */}
      <div className="h-full pb-16">
        {activeTab === "home" && (
          <div className="relative h-full">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 p-6 pb-12" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)' }}>
              <h1 className="text-2xl text-white drop-shadow-lg" style={{ fontWeight: 600 }}>
                Недвижимость
              </h1>
              <div className="inline-block mt-2 px-3 py-1 rounded-full backdrop-blur-md bg-white/20">
                <p className="text-sm text-white" style={{ fontWeight: 500 }}>
                  {mockProperties.length - currentIndex} объектов осталось
                </p>
              </div>
            </div>

            {/* Active Filters Indicator */}
            <ActiveFiltersIndicator 
              filters={filters} 
              onClick={() => setShowFilters(true)}
            />

            {/* Cards Stack */}
            <div className="relative h-full">
              {mockProperties.slice(currentIndex, currentIndex + 3).map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  style={{
                    zIndex: 3 - index,
                    scale: 1 - index * 0.05,
                    opacity: 1 - index * 0.3,
                  }}
                />
              ))}
            </div>

            {/* Empty State */}
            {currentIndex >= mockProperties.length && (
              <div className="absolute inset-0 flex items-center justify-center px-6">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-3xl shadow-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}>
                    <span className="text-6xl">🏠</span>
                  </div>
                  <h3 className="text-2xl mb-3" style={{ color: '#262626', fontWeight: 600 }}>
                    Все просмотрено!
                  </h3>
                  <p className="mb-8 max-w-xs mx-auto" style={{ color: '#929292' }}>
                    Вы просмотрели все объекты. Проверьте избранное или измените фильтры.
                  </p>
                  <button
                    onClick={() => setCurrentIndex(0)}
                    className="px-10 py-4 rounded-2xl text-white shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)', fontWeight: 600 }}
                  >
                    Начать сначала
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "favorites" && (
          <FavoritesView favorites={favorites} onRemoveFavorite={handleRemoveFavorite} />
        )}

        {activeTab === "map" && <MapView properties={mockProperties} />}

        {activeTab === "profile" && (
          <ProfileView 
            userType={filters.userType} 
            favoritesCount={favorites.length}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Filters Modal */}
      <FiltersModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
      />

      {/* Toast Notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'white',
            border: '2px solid #30ad00',
            borderRadius: '16px',
            padding: '16px',
          },
        }}
      />
    </div>
  );
}
