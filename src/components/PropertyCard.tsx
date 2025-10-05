import { useState, useRef } from "react";
import { Heart, X, MapPin, Home, Ruler, Maximize, Sparkles } from "lucide-react";

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

interface PropertyCardProps {
  property: Property;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  style?: any;
}

export function PropertyCard({ property, onSwipeLeft, onSwipeRight, style }: PropertyCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const offset = {
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    };
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 100) {
      // Animate out before calling the callback
      const finalOffset = dragOffset.x > 0 ? 500 : -500;
      setDragOffset({ x: finalOffset, y: dragOffset.y });
      
      setTimeout(() => {
        if (dragOffset.x > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
        setDragOffset({ x: 0, y: 0 });
      }, 200);
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const rotation = isDragging ? (dragOffset.x / 20) : 0;
  const opacity = isDragging ? Math.max(0, 1 - Math.abs(dragOffset.x) / 300) : 1;

  return (
    <div
      ref={cardRef}
      onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={handleDragEnd}
      className="absolute inset-4 bg-white rounded-3xl overflow-hidden shadow-2xl select-none"
      style={{
        ...style,
        transform: `translateX(${dragOffset.x}px) rotate(${rotation}deg) scale(${style?.scale || 1})`,
        opacity: isDragging ? opacity : (style?.opacity || 1),
        transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: style?.zIndex || 1,
      }}
    >
      <div className="relative h-full flex flex-col">
        {/* Image */}
        <div className="relative h-[60%] overflow-hidden">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover"
            draggable="false"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <MapPin className="w-4 h-4" style={{ color: '#30ad00' }} />
            <span className="text-sm" style={{ color: '#262626', fontWeight: 600 }}>{property.distance}</span>
          </div>
          
          {/* Swipe Indicators */}
          {isDragging && (
            <>
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-200"
                style={{ 
                  opacity: dragOffset.x > 50 ? 1 : 0,
                  background: 'radial-gradient(circle, rgba(48, 173, 0, 0.3) 0%, transparent 70%)'
                }}
              >
                <div className="bg-white rounded-full p-6 shadow-2xl scale-110 animate-pulse" style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}>
                  <Heart className="w-16 h-16 text-white" />
                </div>
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center transition-all duration-200"
                style={{ 
                  opacity: dragOffset.x < -50 ? 1 : 0,
                  background: 'radial-gradient(circle, rgba(254, 80, 0, 0.3) 0%, transparent 70%)'
                }}
              >
                <div className="bg-white rounded-full p-6 shadow-2xl scale-110 animate-pulse" style={{ background: 'linear-gradient(135deg, #fe5000 0%, #ff6b35 100%)' }}>
                  <X className="w-16 h-16 text-white" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
          <div>
            <h2 className="text-2xl mb-2" style={{ color: '#262626', fontWeight: 600 }}>
              {property.name}
            </h2>
            <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}>
              <p className="text-xl text-white" style={{ fontWeight: 600 }}>
                {property.price}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#30ad0015' }}>
                  <Home className="w-4 h-4" style={{ color: '#30ad00' }} />
                </div>
                <span className="text-sm" style={{ color: '#262626', fontWeight: 500 }}>
                  {property.rooms} комн.
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#30ad0015' }}>
                  <Ruler className="w-4 h-4" style={{ color: '#30ad00' }} />
                </div>
                <span className="text-sm" style={{ color: '#262626', fontWeight: 500 }}>
                  {property.area} м²
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#30ad0015' }}>
                  <Maximize className="w-4 h-4" style={{ color: '#30ad00' }} />
                </div>
                <span className="text-sm" style={{ color: '#262626', fontWeight: 500 }}>
                  {property.floor} эт.
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#30ad0015' }}>
                  <MapPin className="w-4 h-4" style={{ color: '#30ad00' }} />
                </div>
                <span className="text-sm" style={{ color: '#262626', fontWeight: 500 }}>
                  {property.district}
                </span>
              </div>
            </div>

            {/* AR Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                alert('🎉 Запуск AR-просмотра ЖК...\n\nСкоро вы сможете посетить квартиру в дополненной реальности!');
              }}
              onTouchStart={(e) => e.stopPropagation()}
              className="relative w-full mt-4 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 overflow-hidden group"
              style={{ 
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
              <span className="text-white relative z-10" style={{ fontWeight: 600 }}>
                Сходить на свидание в AR
              </span>
              <div className="absolute top-1 right-2 px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(255,255,255,0.25)', color: 'white', fontWeight: 500 }}>
                NEW
              </div>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSwipeLeft();
              }}
              onTouchStart={(e) => e.stopPropagation()}
              className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 border-2"
              style={{ borderColor: '#fe5000' }}
            >
              <X className="w-8 h-8" style={{ color: '#fe5000' }} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSwipeRight();
              }}
              onTouchStart={(e) => e.stopPropagation()}
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}
            >
              <Heart className="w-10 h-10 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
