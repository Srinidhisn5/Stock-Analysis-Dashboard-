import { PieChart } from 'lucide-react';
import { SectorData } from '../types/Portfolio';
import { formatCurrency, formatPercentage } from '../utils/portfolioUtils';

interface SectorAllocationProps {
  sectors: SectorData[];
}

const SectorAllocation: React.FC<SectorAllocationProps> = ({ sectors }) => {
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1',
    '#14B8A6', '#F43F5E', '#A855F7', '#0EA5E9', '#22C55E'
  ];

  const totalValue = sectors.reduce((sum, sector) => sum + sector.totalValue, 0);

  const getSectorColor = (index: number) => colors[index % colors.length];

  const getSectorAngle = (value: number) => (value / totalValue) * 360;

  let currentAngle = 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <PieChart className="w-7 h-7 text-indigo-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Sector Allocation</h2>
        </div>
        <div className="text-sm text-gray-500 font-medium">
          {formatCurrency(totalValue)} Total
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart Visualization */}
        <div className="flex items-center justify-center">
          <div className="relative w-80 h-80">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {sectors.map((sector, index) => {
                const angle = getSectorAngle(sector.totalValue);
                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;
                
                const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                
                const largeArcFlag = angle > 180 ? 1 : 0;
                const pathData = [
                  `M 50 50`,
                  `L ${x1} ${y1}`,
                  `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  'Z'
                ].join(' ');

                currentAngle += angle;

                return (
                  <path
                    key={sector.sector}
                    d={pathData}
                    fill={getSectorColor(index)}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                );
              })}
            </svg>
            
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {formatPercentage(1)}
                </div>
                <div className="text-sm text-gray-600 font-medium">Total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend and Details */}
        <div className="space-y-4">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {sectors.map((sector, index) => {
              const percentage = (sector.totalValue / totalValue) * 100;
              const isPositive = sector.gainLossPercent >= 0;
              
              return (
                <div key={sector.sector} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: getSectorColor(index) }}
                    ></div>
                    <div>
                      <div className="font-semibold text-gray-900">{sector.sector}</div>
                      <div className="text-sm text-gray-600">
                        {sector.stockCount} stock{sector.stockCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-bold text-gray-900 text-lg">
                      {formatCurrency(sector.totalValue)}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {percentage.toFixed(1)}%
                    </div>
                    <div className={`text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}{formatPercentage(sector.gainLossPercent)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {sectors.length}
            </div>
            <div className="text-sm text-gray-600 font-medium">Sectors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {sectors.filter(s => s.gainLossPercent > 0).length}
            </div>
            <div className="text-sm text-gray-600 font-medium">Profitable</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {sectors.reduce((sum, s) => sum + s.stockCount, 0)}
            </div>
            <div className="text-sm text-gray-600 font-medium">Total Stocks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {formatPercentage(sectors.reduce((sum, s) => sum + s.gainLossPercent * s.totalValue, 0) / totalValue)}
            </div>
            <div className="text-sm text-gray-600 font-medium">Weighted Return</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorAllocation;