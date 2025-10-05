import { MapPin, Navigation } from "lucide-react";

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

interface MapViewProps {
  properties: Property[];
}

export function MapView({ properties }: MapViewProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Map Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b px-6 py-5 shadow-sm" style={{ borderColor: '#f0f0f0' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl" style={{ color: '#262626', fontWeight: 600 }}>
            Карта объектов
          </h2>
          <button 
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95" 
            style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}
          >
            <Navigation className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="flex-1 relative bg-gray-100 overflow-hidden">
        {/* This would be replaced with an actual map integration like Leaflet or Mapbox */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8" style={{ color: '#30ad00' }} />
            </div>
            <h3 className="text-xl mb-2" style={{ color: '#262626', fontWeight: 600 }}>
              Интеграция карты
            </h3>
            <p style={{ color: '#929292' }}>
              Здесь будет отображаться карта с объектами недвижимости
            </p>
          </div>
        </div>

        {/* Example pins */}
        <div className="absolute top-1/4 left-1/3 animate-pulse">
          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl" style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}>
            <MapPin className="w-7 h-7 text-white fill-white" />
          </div>
          <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: '#30ad0040' }} />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-pulse" style={{ animationDelay: '0.3s' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl" style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}>
            <MapPin className="w-7 h-7 text-white fill-white" />
          </div>
          <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: '#30ad0040', animationDelay: '0.3s' }} />
        </div>
        <div className="absolute bottom-1/3 left-1/2 animate-pulse" style={{ animationDelay: '0.6s' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl" style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}>
            <MapPin className="w-7 h-7 text-white fill-white" />
          </div>
          <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: '#30ad0040', animationDelay: '0.6s' }} />
        </div>
      </div>

      {/* Bottom Card Carousel */}
      <div className="absolute bottom-20 left-0 right-0 px-4 pb-4">
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {properties.slice(0, 5).map((property) => (
            <div
              key={property.id}
              className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl min-w-[280px] snap-start border transition-all duration-200 hover:scale-105"
              style={{ borderColor: '#f0f0f0' }}
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="mb-1" style={{ color: '#262626', fontWeight: 600 }}>
                  {property.name}
                </h3>
                <div className="inline-block px-3 py-1 rounded-full mb-2" style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}>
                  <p className="text-sm text-white" style={{ fontWeight: 600 }}>
                    {property.price}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 rounded-lg w-fit" style={{ backgroundColor: '#f5f5f5' }}>
                  <MapPin className="w-3 h-3" style={{ color: '#30ad00' }} />
                  <span className="text-xs" style={{ color: '#262626', fontWeight: 500 }}>{property.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
