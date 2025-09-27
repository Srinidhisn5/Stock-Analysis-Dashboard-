import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '../types/Portfolio';
import { formatCurrency, formatPercentage } from '../utils/portfolioUtils';

interface TopMoversProps {
  stocks: Stock[];
}

const TopMovers: React.FC<TopMoversProps> = ({ stocks }) => {
  const topGainers = [...stocks]
    .filter(stock => stock.profitLoss > 0)
    .sort((a, b) => b.gainLossPercent - a.gainLossPercent)
    .slice(0, 5);

  const topLosers = [...stocks]
    .filter(stock => stock.profitLoss < 0)
    .sort((a, b) => a.gainLossPercent - b.gainLossPercent)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Gainers */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Top Gainers</h2>
        </div>
        <div className="space-y-4">
          {topGainers.map((stock, index) => (
            <div key={stock.ticker} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center">
                <div className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{stock.ticker}</p>
                  <p className="text-sm text-gray-600 truncate" style={{ maxWidth: '150px' }}>
                    {stock.company}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">{formatPercentage(stock.gainLossPercent)}</p>
                <p className="text-sm text-green-600">{formatCurrency(stock.profitLoss)}</p>
              </div>
            </div>
          ))}
          {topGainers.length === 0 && (
            <p className="text-gray-500 text-center py-4">No gainers found</p>
          )}
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Top Losers</h2>
        </div>
        <div className="space-y-4">
          {topLosers.map((stock, index) => (
            <div key={stock.ticker} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center">
                <div className="bg-red-100 text-red-700 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{stock.ticker}</p>
                  <p className="text-sm text-gray-600 truncate" style={{ maxWidth: '150px' }}>
                    {stock.company}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-red-600">{formatPercentage(stock.gainLossPercent)}</p>
                <p className="text-sm text-red-600">{formatCurrency(stock.profitLoss)}</p>
              </div>
            </div>
          ))}
          {topLosers.length === 0 && (
            <p className="text-gray-500 text-center py-4">No losers found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopMovers;