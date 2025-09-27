import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  sectors: string[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedSector,
  setSelectedSector,
  sectors
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search stocks by ticker or company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-white"
          >
            <option value="">All Sectors</option>
            {sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;