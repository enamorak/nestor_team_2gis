import { Heart, MapPin, Home, Ruler } from "lucide-react";

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

interface FavoritesViewProps {
  favorites: Property[];
  onRemoveFavorite: (id: number) => void;
}

export function FavoritesView({ favorites, onRemoveFavorite }: FavoritesViewProps) {
  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6">
        <div className="w-32 h-32 rounded-3xl flex items-center justify-center mb-6 shadow-xl" style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)' }}>
          <Heart className="w-16 h-16" style={{ color: '#929292' }} />
        </div>
        <h3 className="text-2xl mb-3" style={{ color: '#262626', fontWeight: 600 }}>
          Нет избранных
        </h3>
        <p className="text-center max-w-xs" style={{ color: '#929292' }}>
          Понравившиеся объекты будут отображаться здесь
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md" style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}>
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <h2 className="text-2xl" style={{ color: '#262626', fontWeight: 600 }}>
            Избранное ({favorites.length})
          </h2>
        </div>
        
        <div className="space-y-4">
          {favorites.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
              style={{ borderColor: '#f0f0f0' }}
            >
              <div className="flex gap-4">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="flex-1 py-3 pr-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="mb-1" style={{ color: '#262626', fontWeight: 600 }}>
                        {property.name}
                      </h3>
                      <div className="inline-block px-3 py-1 rounded-full mb-2" style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}>
                        <p className="text-sm text-white" style={{ fontWeight: 600 }}>
                          {property.price}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveFavorite(property.id)}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}
                    >
                      <Heart className="w-5 h-5 fill-current text-white" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs flex-wrap">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ backgroundColor: '#f5f5f5' }}>
                      <Home className="w-3 h-3" style={{ color: '#30ad00' }} />
                      <span style={{ color: '#262626', fontWeight: 500 }}>{property.rooms} комн.</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ backgroundColor: '#f5f5f5' }}>
                      <Ruler className="w-3 h-3" style={{ color: '#30ad00' }} />
                      <span style={{ color: '#262626', fontWeight: 500 }}>{property.area} м²</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ backgroundColor: '#f5f5f5' }}>
                      <MapPin className="w-3 h-3" style={{ color: '#30ad00' }} />
                      <span style={{ color: '#262626', fontWeight: 500 }}>{property.distance}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
