import React from 'react';
import { PieChart } from 'lucide-react';
import { SectorData } from '../types/Portfolio';
import { formatCurrency, formatPercentage } from '../utils/portfolioUtils';

interface SectorAnalysisProps {
  sectors: SectorData[];
}

const SectorAnalysis: React.FC<SectorAnalysisProps> = ({ sectors }) => {
  const totalValue = sectors.reduce((sum, sector) => sum + sector.totalValue, 0);

  const getRandomColor = (index: number) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 
      'bg-red-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500',
      'bg-orange-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-violet-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <PieChart className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Sector Analysis</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sector Distribution */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Portfolio Allocation</h3>
          <div className="space-y-3">
            {sectors.map((sector, index) => {
              const percentage = (sector.totalValue / totalValue) * 100;
              return (
                <div key={sector.sector} className="flex items-center">
                  <div className={`w-4 h-4 rounded ${getRandomColor(index)} mr-3`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{sector.sector}</span>
                      <span className="text-sm text-gray-500">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getRandomColor(index)}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sector Performance */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sector Performance</h3>
          <div className="space-y-4">
            {sectors.slice(0, 8).map((sector) => (
              <div key={sector.sector} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{sector.sector}</p>
                  <p className="text-xs text-gray-500">{sector.stockCount} stocks</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm">{formatCurrency(sector.totalValue)}</p>
                  <p className={`text-xs ${
                    sector.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatCurrency(sector.profitLoss)} ({formatPercentage(sector.gainLossPercent)})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorAnalysis;