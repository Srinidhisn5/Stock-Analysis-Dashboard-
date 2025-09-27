import React from 'react';
import { Target, TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '../types/Portfolio';
import { formatPercentage } from '../utils/portfolioUtils';

interface TargetVsActualChartProps {
  stocks: Stock[];
}

const TargetVsActualChart: React.FC<TargetVsActualChartProps> = ({ stocks }) => {
  const TARGET_RETURN = 0.15; // 15% target return
  
  const sortedStocks = [...stocks].sort((a, b) => b.gainLossPercent - a.gainLossPercent);
  
  const exceededTarget = stocks.filter(stock => stock.gainLossPercent > TARGET_RETURN).length;
  const belowTarget = stocks.filter(stock => stock.gainLossPercent <= TARGET_RETURN).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Target className="w-5 h-5 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Target vs Actual Performance</h2>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span className="text-gray-600">Above Target: {exceededTarget}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            <span className="text-gray-600">Below Target: {belowTarget}</span>
          </div>
        </div>
      </div>

      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-700 font-medium">Performance Target</p>
            <p className="text-blue-600 text-sm">Benchmark return expectation</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-900">15.00%</p>
            <p className="text-blue-600 text-sm">Annual Target</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sortedStocks.map((stock) => {
          const actualReturn = stock.gainLossPercent;
          const isAboveTarget = actualReturn > TARGET_RETURN;
          const maxReturn = Math.max(Math.abs(actualReturn), TARGET_RETURN);
          const targetWidth = (TARGET_RETURN / maxReturn) * 100;
          const actualWidth = (Math.abs(actualReturn) / maxReturn) * 100;

          return (
            <div key={stock.ticker} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{stock.ticker}</h4>
                  <p className="text-sm text-gray-600 truncate" style={{ maxWidth: '200px' }}>
                    {stock.company}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center ${isAboveTarget ? 'text-green-600' : 'text-red-600'}`}>
                    {isAboveTarget ? 
                      <TrendingUp className="w-4 h-4 mr-1" /> : 
                      <TrendingDown className="w-4 h-4 mr-1" />
                    }
                    <span className="font-medium">{formatPercentage(actualReturn)}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {isAboveTarget ? '+' : ''}{formatPercentage(actualReturn - TARGET_RETURN)} vs target
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Target (15%)</span>
                  <span className="text-gray-900 font-medium">15.00%</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-400 h-3 rounded-full"
                      style={{ width: `${targetWidth}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Actual</span>
                  <span className={`font-medium ${isAboveTarget ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(actualReturn)}
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${isAboveTarget ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${actualWidth}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TargetVsActualChart;