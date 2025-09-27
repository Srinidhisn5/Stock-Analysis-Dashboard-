import { Activity } from 'lucide-react';
import { Stock } from '../types/Portfolio';
import { formatPercentage } from '../utils/portfolioUtils';

interface RiskReturnScatterProps {
  stocks: Stock[];
}

const RiskReturnScatter: React.FC<RiskReturnScatterProps> = ({ stocks }) => {
  const maxBeta = Math.max(...stocks.map(s => s.beta));
  const minBeta = Math.min(...stocks.map(s => s.beta));
  const maxReturn = Math.max(...stocks.map(s => Math.abs(s.gainLossPercent)));
  const minReturn = Math.min(...stocks.map(s => s.gainLossPercent));

  const getDotSize = (weight: number) => {
    const minSize = 12;
    const maxSize = 32;
    const maxWeight = Math.max(...stocks.map(s => s.portfolioWeight));
    return minSize + (weight * (maxSize - minSize) / maxWeight);
  };

  const getDotColor = (returnValue: number) => {
    if (returnValue > 0.1) return 'bg-green-500';
    if (returnValue > 0) return 'bg-green-400';
    if (returnValue > -0.1) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Activity className="w-7 h-7 text-indigo-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Risk vs Return Analysis</h2>
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Dot size = Portfolio Weight
        </div>
      </div>

      <div className="space-y-6">
        {/* Chart Area */}
        <div className="relative bg-gray-50 rounded-xl p-8 min-h-[500px]">
          <div className="absolute inset-8">
            {/* Y-axis (Returns) */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-400"></div>
            <div className="absolute -left-16 top-1/2 text-sm text-gray-600 transform -rotate-90 origin-center whitespace-nowrap font-medium">
              Returns (%)
            </div>
            
            {/* X-axis (Risk/Beta) */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-400"></div>
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 whitespace-nowrap font-medium">
              Systematic Risk (Beta)
            </div>

            {/* Grid lines */}
            <div className="absolute inset-0">
              {/* Horizontal grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <div
                  key={ratio}
                  className="absolute left-0 right-0 h-px bg-gray-200"
                  style={{ top: `${ratio * 100}%` }}
                ></div>
              ))}
              {/* Vertical grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                <div
                  key={ratio}
                  className="absolute top-0 bottom-0 w-px bg-gray-200"
                  style={{ left: `${ratio * 100}%` }}
                ></div>
              ))}
            </div>

            {/* Data points */}
            {stocks.map((stock) => {
              const x = ((stock.beta - minBeta) / (maxBeta - minBeta)) * 100;
              const y = 100 - ((stock.gainLossPercent - minReturn) / (maxReturn - minReturn)) * 100;
              const size = getDotSize(stock.portfolioWeight);
              
              return (
                <div
                  key={stock.ticker}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div
                    className={`w-${Math.round(size/4)} h-${Math.round(size/4)} rounded-full ${getDotColor(stock.gainLossPercent)} shadow-lg transition-all duration-200 hover:scale-110`}
                    title={`${stock.ticker}: ${formatPercentage(stock.gainLossPercent)} return, ${stock.beta.toFixed(2)} beta`}
                  ></div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    <div className="font-semibold">{stock.ticker}</div>
                    <div>Return: {formatPercentage(stock.gainLossPercent)}</div>
                    <div>Beta: {stock.beta.toFixed(2)}</div>
                    <div>Weight: {formatPercentage(stock.portfolioWeight)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="font-medium">High Returns (&gt;10%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            <span className="font-medium">Moderate Returns (0-10%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="font-medium">Negative Returns (&lt;0%)</span>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stocks.filter(s => s.gainLossPercent > 0.1).length}
            </div>
            <div className="text-sm text-gray-600 font-medium">High Performers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stocks.filter(s => s.beta > 1).length}
            </div>
            <div className="text-sm text-gray-600 font-medium">High Risk</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stocks.filter(s => s.sharpeRatio > 0.8).length}
            </div>
            <div className="text-sm text-gray-600 font-medium">High Sharpe</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskReturnScatter;