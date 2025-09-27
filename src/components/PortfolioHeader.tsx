import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { PortfolioSummary } from '../types/Portfolio';
import { formatCurrency, formatPercentage } from '../utils/portfolioUtils';

interface PortfolioHeaderProps {
  summary: PortfolioSummary;
}

const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ summary }) => {
  const isProfit = summary.totalProfit >= 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Dashboard</h1>
          <p className="text-gray-600">Track your investments and analyze performance</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <div className={`flex items-center px-3 py-2 rounded-full ${
            isProfit ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {isProfit ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            <span className="text-sm font-medium">
              {formatPercentage(summary.totalGain)}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Investment</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(summary.totalCost)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Current Value</p>
              <p className="text-2xl font-bold text-purple-900">{formatCurrency(summary.currentValue)}</p>
            </div>
            <PieChart className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className={`rounded-lg p-4 border ${
          isProfit ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                Total P&L
              </p>
              <p className={`text-2xl font-bold ${isProfit ? 'text-green-900' : 'text-red-900'}`}>
                {formatCurrency(summary.totalProfit)}
              </p>
            </div>
            {isProfit ? 
              <TrendingUp className="w-8 h-8 text-green-600" /> : 
              <TrendingDown className="w-8 h-8 text-red-600" />
            }
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Stocks</p>
              <p className="text-2xl font-bold text-gray-900">{summary.totalStocks}</p>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-bold text-sm">{summary.totalStocks}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioHeader;