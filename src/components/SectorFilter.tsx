import { Filter, X } from 'lucide-react';

interface SectorFilterProps {
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  sectors: string[];
}

const SectorFilter: React.FC<SectorFilterProps> = ({ 
  selectedSector, 
  setSelectedSector, 
  sectors 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Filter className="w-6 h-6 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Strategic Sector Filter</h2>
        </div>
        {selectedSector && (
          <button
            onClick={() => setSelectedSector('')}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear Filter</span>
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedSector('')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            selectedSector === ''
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Sectors ({sectors.length})
        </button>
        
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => setSelectedSector(sector)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedSector === sector
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {sector}
          </button>
        ))}
      </div>
      
      {selectedSector && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-700 font-medium">
            <span className="font-semibold">Filtered by:</span> {selectedSector}
          </p>
        </div>
      )}
    </div>
  );
};

export default SectorFilter;