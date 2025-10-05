import { Baby, Car, Dumbbell, SlidersHorizontal } from "lucide-react";
import { Filters } from "./FiltersModal";

interface ActiveFiltersIndicatorProps {
  filters: Filters;
  onClick: () => void;
}

export function ActiveFiltersIndicator({ filters, onClick }: ActiveFiltersIndicatorProps) {
  const hasActiveFilters = 
    filters.userType !== null || 
    filters.rooms.length > 0 || 
    filters.infrastructure.length > 0 ||
    filters.priceRange[0] !== 0 || 
    filters.priceRange[1] !== 300 ||
    filters.areaRange[0] !== 30 || 
    filters.areaRange[1] !== 400;

  if (!hasActiveFilters) return null;

  const userTypeIcons = {
    parents: Baby,
    drivers: Car,
    athletes: Dumbbell,
  };

  const UserTypeIcon = filters.userType ? userTypeIcons[filters.userType] : null;

  return (
    <button
      onClick={onClick}
      className="absolute top-20 right-6 z-10 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 backdrop-blur-xl"
      style={{ background: 'linear-gradient(135deg, #30ad00 0%, #25c000 100%)' }}
    >
      {UserTypeIcon && <UserTypeIcon className="w-4 h-4 text-white" />}
      <SlidersHorizontal className="w-4 h-4 text-white" />
      <span className="text-sm text-white" style={{ fontWeight: 600 }}>
        Фильтры активны
      </span>
    </button>
  );
}
