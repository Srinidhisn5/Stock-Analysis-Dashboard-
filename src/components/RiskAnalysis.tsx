import React from 'react';
import { Shield, AlertTriangle, Activity, TrendingUp } from 'lucide-react';
import { Stock } from '../types/Portfolio';

interface RiskAnalysisProps {
  stocks: Stock[];
}

const RiskAnalysis: React.FC<RiskAnalysisProps> = ({ stocks }) => {
  const avgBeta = stocks.reduce((sum, stock) => sum + stock.beta, 0) / stocks.length;
  const avgSharpe = stocks.reduce((sum, stock) => sum + stock.sharpeRatio, 0) / stocks.length;
  
  const highRiskStocks = stocks.filter(stock => stock.beta > 1.2).length;
  const lowRiskStocks = stocks.filter(stock => stock.beta < 0.8).length;
  const mediumRiskStocks = stocks.length - highRiskStocks - lowRiskStocks;

  const getRiskLevel = (beta: number) => {
    if (beta > 1.2) return { level: 'High', color: 'red' };
    if (beta < 0.8) return { level: 'Low', color: 'green' };
    return { level: 'Medium', color: 'yellow' };
  };

  const getPerformanceLevel = (sharpe: number) => {
    if (sharpe > 0.8) return { level: 'Excellent', color: 'green' };
    if (sharpe > 0.6) return { level: 'Good', color: 'blue' };
    if (sharpe > 0.4) return { level: 'Average', color: 'yellow' };
    return { level: 'Poor', color: 'red' };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Shield className="w-5 h-5 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Risk Analysis</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-700">Portfolio Beta</h3>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-900">{avgBeta.toFixed(2)}</p>
          <p className="text-xs text-blue-600 mt-1">
            {avgBeta > 1 ? 'More volatile than market' : 'Less volatile than market'}
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-green-700">Sharpe Ratio</h3>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-900">{avgSharpe.toFixed(2)}</p>
          <p className="text-xs text-green-600 mt-1">
            {getPerformanceLevel(avgSharpe).level} risk-adjusted returns
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Risk Distribution</h3>
            <AlertTriangle className="w-4 h-4 text-gray-600" />
          </div>
          <div className="text-sm text-gray-600">
            <div className="flex justify-between mb-1">
              <span>Low Risk:</span>
              <span className="font-medium">{lowRiskStocks}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Medium Risk:</span>
              <span className="font-medium">{mediumRiskStocks}</span>
            </div>
            <div className="flex justify-between">
              <span>High Risk:</span>
              <span className="font-medium">{highRiskStocks}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Stock Risk Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stocks.slice(0, 9).map((stock) => {
            const risk = getRiskLevel(stock.beta);
            // const performance = getPerformanceLevel(stock.sharpeRatio);
            
            return (
              <div key={stock.ticker} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{stock.ticker}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    risk.color === 'red' ? 'bg-red-100 text-red-700' :
                    risk.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {risk.level}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Beta:</span>
                    <span className="font-medium text-gray-900 ml-1">{stock.beta.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Sharpe:</span>
                    <span className="font-medium text-gray-900 ml-1">{stock.sharpeRatio.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;