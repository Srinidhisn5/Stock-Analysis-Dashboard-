import React from 'react';
import { TrendingUp, TrendingDown, Activity, Shield } from 'lucide-react';
import { Stock } from '../types/Portfolio';
import { formatCurrency, formatPercentage } from '../utils/portfolioUtils';

interface StockCardProps {
  stock: Stock;
}

const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const isProfit = stock.profitLoss >= 0;
  const riskLevel = stock.beta > 1.2 ? 'high' : stock.beta < 0.8 ? 'low' : 'medium';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{stock.ticker}</h3>
          <p className="text-sm text-gray-600 truncate" title={stock.company}>{stock.company}</p>
          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs mt-2">
            {stock.sector}
          </span>
        </div>
        <div className={`flex items-center px-2 py-1 rounded-full ${
          isProfit ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {isProfit ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          <span className="text-xs font-medium">
            {formatPercentage(stock.gainLossPercent)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500">Buy Price</p>
          <p className="text-sm font-medium text-gray-900">₹{stock.buyPrice.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Current Price</p>
          <p className="text-sm font-medium text-gray-900">₹{stock.currentPrice.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Quantity</p>
          <p className="text-sm font-medium text-gray-900">{stock.quantity}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Current Value</p>
          <p className="text-sm font-medium text-gray-900">{formatCurrency(stock.currentValue)}</p>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
            P&L: {formatCurrency(stock.profitLoss)}
          </span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Activity className="w-3 h-3 text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">β {stock.beta.toFixed(2)}</span>
            </div>
            <div className="flex items-center">
              <Shield className={`w-3 h-3 mr-1 ${
                riskLevel === 'low' ? 'text-green-500' : 
                riskLevel === 'medium' ? 'text-yellow-500' : 'text-red-500'
              }`} />
              <span className="text-xs text-gray-500">SR {stock.sharpeRatio.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${isProfit ? 'bg-green-500' : 'bg-red-500'}`}
            style={{ width: `${Math.min(Math.abs(stock.gainLossPercent) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StockCard;