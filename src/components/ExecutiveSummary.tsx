import { TrendingUp, TrendingDown, DollarSign, Shield, BarChart3 } from 'lucide-react';
import { PortfolioSummary } from '../types/Portfolio';
import { formatCurrency, formatPercentage } from '../utils/portfolioUtils';

interface ExecutiveSummaryProps {
  summary: PortfolioSummary;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ summary }) => {
  const isProfit = summary.totalProfit >= 0;
  const isGain = summary.totalGain >= 0;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Executive Portfolio Dashboard</h1>
          <p className="text-xl text-gray-600">Comprehensive Performance & Risk Analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <span className="text-lg font-semibold text-gray-700">Live Data</span>
        </div>
      </div>

      {/* Three Large KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Total Portfolio Value */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
          <div className="flex items-center justify-between mb-6">
            <div className="p-4 bg-blue-500 rounded-xl">
              <DollarSign className="w-10 h-10 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Total Portfolio Value</p>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-4xl font-bold text-blue-900">
              {formatCurrency(summary.currentValue)}
            </h3>
            <p className="text-sm text-blue-700 font-medium">
              {summary.totalStocks} Holdings
            </p>
          </div>
        </div>

        {/* Overall Portfolio Return */}
        <div className={`bg-gradient-to-br ${isGain ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-8 border ${isGain ? 'border-green-200' : 'border-red-200'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className={`p-4 ${isGain ? 'bg-green-500' : 'bg-red-500'} rounded-xl`}>
              {isGain ? 
                <TrendingUp className="w-10 h-10 text-white" /> : 
                <TrendingDown className="w-10 h-10 text-white" />
              }
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${isGain ? 'text-green-600' : 'text-red-600'} uppercase tracking-wide`}>
                Overall Portfolio Return
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className={`text-4xl font-bold ${isGain ? 'text-green-900' : 'text-red-900'}`}>
              {formatPercentage(summary.totalGain)}
            </h3>
            <p className={`text-sm ${isGain ? 'text-green-700' : 'text-red-700'} font-medium`}>
              {isProfit ? '+' : ''}{formatCurrency(summary.totalProfit)} P&L
            </p>
          </div>
        </div>

        {/* Risk-Adjusted Return */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 border border-purple-200">
          <div className="flex items-center justify-between mb-6">
            <div className="p-4 bg-purple-500 rounded-xl">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
                Risk-Adjusted Return
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-4xl font-bold text-purple-900">
              {summary.averageSharpe.toFixed(2)}
            </h3>
            <p className="text-sm text-purple-700 font-medium">
              Average Sharpe Ratio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummary;