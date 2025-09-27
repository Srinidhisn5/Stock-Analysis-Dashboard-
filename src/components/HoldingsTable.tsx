import { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '../types/Portfolio';
import { formatCurrency, formatPercentage, formatNumber } from '../utils/portfolioUtils';

interface HoldingsTableProps {
  stocks: Stock[];
}

type SortField = 'ticker' | 'company' | 'sector' | 'currentValue' | 'profitLoss' | 'gainLossPercent' | 'beta' | 'sharpeRatio';
type SortDirection = 'asc' | 'desc';

const HoldingsTable: React.FC<HoldingsTableProps> = ({ stocks }) => {
  const [sortField, setSortField] = useState<SortField>('currentValue');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedStocks = [...stocks].sort((a, b) => {
    let aValue: string | number = a[sortField];
    let bValue: string | number = b[sortField];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortDirection === 'asc' ? 
      <ArrowUp className="w-4 h-4 text-blue-600" /> : 
      <ArrowDown className="w-4 h-4 text-blue-600" />;
  };

  const getPerformanceIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-900">Holdings Detail</h2>
        <p className="text-sm text-gray-600 mt-2 font-medium">Complete portfolio breakdown with performance metrics</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('ticker')}
              >
                <div className="flex items-center space-x-2">
                  <span>Ticker</span>
                  <SortIcon field="ticker" />
                </div>
              </th>
              <th 
                className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('company')}
              >
                <div className="flex items-center space-x-2">
                  <span>Company</span>
                  <SortIcon field="company" />
                </div>
              </th>
              <th 
                className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('sector')}
              >
                <div className="flex items-center space-x-2">
                  <span>Sector</span>
                  <SortIcon field="sector" />
                </div>
              </th>
              <th className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Buy Price
              </th>
              <th className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Current Price
              </th>
              <th 
                className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('currentValue')}
              >
                <div className="flex items-center justify-end space-x-2">
                  <span>Current Value</span>
                  <SortIcon field="currentValue" />
                </div>
              </th>
              <th 
                className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('gainLossPercent')}
              >
                <div className="flex items-center justify-end space-x-2">
                  <span>Return %</span>
                  <SortIcon field="gainLossPercent" />
                </div>
              </th>
              <th 
                className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('profitLoss')}
              >
                <div className="flex items-center justify-end space-x-2">
                  <span>P&L (₹)</span>
                  <SortIcon field="profitLoss" />
                </div>
              </th>
              <th 
                className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('beta')}
              >
                <div className="flex items-center justify-end space-x-2">
                  <span>Beta</span>
                  <SortIcon field="beta" />
                </div>
              </th>
              <th 
                className="px-8 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('sharpeRatio')}
              >
                <div className="flex items-center justify-end space-x-2">
                  <span>Sharpe</span>
                  <SortIcon field="sharpeRatio" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStocks.map((stock, index) => (
              <tr key={stock.ticker} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                <td className="px-8 py-6 whitespace-nowrap">
                  <div className="font-bold text-gray-900 text-lg">{stock.ticker}</div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm text-gray-900 max-w-[250px] truncate font-medium" title={stock.company}>
                    {stock.company}
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                    {stock.sector}
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right text-sm text-gray-900 font-medium">
                  {formatNumber(stock.quantity)}
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right text-sm text-gray-900 font-medium">
                  ₹{formatNumber(stock.buyPrice)}
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right text-sm text-gray-900 font-medium">
                  ₹{formatNumber(stock.currentPrice)}
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                  {formatCurrency(stock.currentValue)}
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right text-sm">
                  <div className={`flex items-center justify-end space-x-2 ${stock.gainLossPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {getPerformanceIcon(stock.gainLossPercent)}
                    <span className="font-bold">
                      {formatPercentage(stock.gainLossPercent)}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right text-sm">
                  <div className={`flex items-center justify-end space-x-2 ${stock.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {getPerformanceIcon(stock.profitLoss)}
                    <span className="font-bold">
                      {formatCurrency(stock.profitLoss)}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right text-sm text-gray-900">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    stock.beta > 1.2 ? 'bg-red-100 text-red-800' :
                    stock.beta > 0.8 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {stock.beta.toFixed(2)}
                  </span>
                </td>
                <td className="px-8 py-6 whitespace-nowrap text-right text-sm text-gray-900">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    stock.sharpeRatio > 0.8 ? 'bg-green-100 text-green-800' :
                    stock.sharpeRatio > 0.5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {stock.sharpeRatio.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div className="text-center">
            <div className="font-bold text-gray-900 text-xl">{stocks.length}</div>
            <div className="text-gray-600 font-medium">Total Holdings</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-green-600 text-xl">
              {stocks.filter(s => s.gainLossPercent > 0).length}
            </div>
            <div className="text-gray-600 font-medium">Gainers</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-red-600 text-xl">
              {stocks.filter(s => s.gainLossPercent < 0).length}
            </div>
            <div className="text-gray-600 font-medium">Losers</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-600 text-xl">
              {formatPercentage(stocks.reduce((sum, s) => sum + s.portfolioWeight, 0))}
            </div>
            <div className="text-gray-600 font-medium">Total Weight</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingsTable;