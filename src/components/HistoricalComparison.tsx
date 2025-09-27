import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '../types/Portfolio';
import { formatCurrency, formatPercentage } from '../utils/portfolioUtils';

interface HistoricalComparisonProps {
  stocks: Stock[];
}

const HistoricalComparison: React.FC<HistoricalComparisonProps> = ({ stocks }) => {
  const sortedStocks = [...stocks]
    .sort((a, b) => b.currentValue - a.currentValue)
    .slice(0, 15); // Top 15 by value
  
  const maxPrice = Math.max(...sortedStocks.map(s => Math.max(s.currentPrice, s.sixMonthPrice)));

  const getBarHeight = (price: number) => (price / maxPrice) * 100;
  const getPriceChange = (stock: Stock) => stock.currentPrice - stock.sixMonthPrice;
  const getPriceChangePercent = (stock: Stock) => (getPriceChange(stock) / stock.sixMonthPrice) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <BarChart3 className="w-7 h-7 text-indigo-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Historical Price Comparison</h2>
        </div>
        <div className="text-sm text-gray-500 font-medium">
          Current vs 6-Month Price (Top 15 by Value)
        </div>
      </div>

      <div className="space-y-8">
        {/* Chart Area */}
        <div className="bg-gray-50 rounded-xl p-8 min-h-[600px]">
          <div className="space-y-8">
            {sortedStocks.map((stock) => {
              const currentHeight = getBarHeight(stock.currentPrice);
              const sixMonthHeight = getBarHeight(stock.sixMonthPrice);
              const priceChange = getPriceChange(stock);
              const priceChangePercent = getPriceChangePercent(stock);
              const isPositive = priceChange >= 0;

              return (
                <div key={stock.ticker} className="space-y-4">
                  {/* Stock Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="font-bold text-gray-900 text-lg min-w-[100px]">{stock.ticker}</div>
                      <div className="text-sm text-gray-600 truncate max-w-[300px] font-medium">
                        {stock.company}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center space-x-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? 
                          <TrendingUp className="w-5 h-5" /> : 
                          <TrendingDown className="w-5 h-5" />
                        }
                        <span className="font-bold text-lg">
                          {isPositive ? '+' : ''}{priceChangePercent.toFixed(1)}%
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        {isPositive ? '+' : ''}₹{priceChange.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="space-y-4">
                    {/* 6-Month Price Bar */}
                    <div className="flex items-center space-x-6">
                      <div className="w-24 text-sm text-gray-600 font-semibold">6M Ago</div>
                      <div className="flex-1 relative">
                        <div className="w-full bg-gray-200 rounded-full h-6">
                          <div 
                            className="bg-gray-400 h-6 rounded-full transition-all duration-500"
                            style={{ width: `${sixMonthHeight}%` }}
                          ></div>
                        </div>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-700 font-bold whitespace-nowrap">
                          ₹{stock.sixMonthPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Current Price Bar */}
                    <div className="flex items-center space-x-6">
                      <div className="w-24 text-sm text-gray-600 font-semibold">Current</div>
                      <div className="flex-1 relative">
                        <div className="w-full bg-gray-200 rounded-full h-6">
                          <div 
                            className={`h-6 rounded-full transition-all duration-500 ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${currentHeight}%` }}
                          ></div>
                        </div>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-700 font-bold whitespace-nowrap">
                          ₹{stock.currentPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {sortedStocks.filter(s => getPriceChange(s) > 0).length}
            </div>
            <div className="text-sm text-gray-600 font-medium">Gainers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {sortedStocks.filter(s => getPriceChange(s) < 0).length}
            </div>
            <div className="text-sm text-gray-600 font-medium">Losers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatPercentage(
                sortedStocks.reduce((sum, s) => sum + getPriceChangePercent(s), 0) / sortedStocks.length
              )}
            </div>
            <div className="text-sm text-gray-600 font-medium">Avg Change</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {formatCurrency(
                sortedStocks.reduce((sum, s) => sum + getPriceChange(s), 0)
              )}
            </div>
            <div className="text-sm text-gray-600 font-medium">Total Change</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-gray-400 rounded"></div>
            <span className="font-semibold">6-Month Price</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-green-500 rounded"></div>
            <span className="font-semibold">Current Price (Gain)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-red-500 rounded"></div>
            <span className="font-semibold">Current Price (Loss)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalComparison;