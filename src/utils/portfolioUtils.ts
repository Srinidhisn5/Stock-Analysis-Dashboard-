import { Stock, PortfolioSummary, SectorData } from '../types/Portfolio';

export const parseCSVData = (csvData: string): Stock[] => {
  const lines = csvData.trim().split('\n');
  
  const stocks = lines.slice(1) // Remove header
    .filter(line => {
      const trimmed = line.trim();
      // Filter out empty lines and summary rows
      return trimmed && 
             !trimmed.startsWith(',,,,') && 
             !trimmed.includes('Total Cost') &&
             !trimmed.includes('Total Value') &&
             !trimmed.includes('Total Gain') &&
             !trimmed.includes('Total Profit');
    })
    .map(line => {
      const values = line.split(',');
      return {
        ticker: values[0] || '',
        company: values[1] || '',
        sector: values[2] || '',
        buyPrice: parseFloat(values[3]) || 0,
        quantity: parseInt(values[4]) || 0,
        currentPrice: parseFloat(values[5]) || 0,
        totalCost: parseFloat(values[6]) || 0,
        currentValue: parseFloat(values[7]) || 0,
        gainLossPercent: parseFloat(values[8]) || 0,
        portfolioWeight: 0, // Will be calculated below
        beta: parseFloat(values[10]) || 0,
        sharpeRatio: parseFloat(values[11]) || 0,
        profitLoss: parseFloat(values[12]) || 0,
        sixMonthPrice: parseFloat(values[13]) || 0,
      } as Stock;
    });

  // Calculate correct portfolio weights
  const totalValue = stocks.reduce((sum, stock) => sum + stock.currentValue, 0);
  stocks.forEach(stock => {
    stock.portfolioWeight = totalValue > 0 ? stock.currentValue / totalValue : 0;
  });

  return stocks;
};

export const calculatePortfolioSummary = (stocks: Stock[]): PortfolioSummary => {
  const totalCost = stocks.reduce((sum, stock) => sum + stock.totalCost, 0);
  const currentValue = stocks.reduce((sum, stock) => sum + stock.currentValue, 0);
  const totalProfit = stocks.reduce((sum, stock) => sum + stock.profitLoss, 0);
  const averageSharpe = stocks.length > 0 ? 
    stocks.reduce((sum, stock) => sum + stock.sharpeRatio, 0) / stocks.length : 0;
  
  return {
    totalCost,
    currentValue,
    totalGain: (currentValue - totalCost) / totalCost,
    totalProfit,
    totalStocks: stocks.length,
    averageSharpe,
  };
};

export const groupBySector = (stocks: Stock[]): SectorData[] => {
  const sectorMap = new Map<string, SectorData>();
  
  stocks.forEach(stock => {
    const existing = sectorMap.get(stock.sector);
    if (existing) {
      existing.totalValue += stock.currentValue;
      existing.totalCost += stock.totalCost;
      existing.profitLoss += stock.profitLoss;
      existing.stockCount += 1;
    } else {
      sectorMap.set(stock.sector, {
        sector: stock.sector,
        totalValue: stock.currentValue,
        totalCost: stock.totalCost,
        profitLoss: stock.profitLoss,
        gainLossPercent: 0,
        stockCount: 1,
      });
    }
  });
  
  // Calculate gain/loss percentage for each sector
  sectorMap.forEach(sector => {
    sector.gainLossPercent = (sector.totalValue - sector.totalCost) / sector.totalCost;
  });
  
  return Array.from(sectorMap.values()).sort((a, b) => b.totalValue - a.totalValue);
};

export const formatCurrency = (value: number): string => {
  if (Math.abs(value) >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)}Cr`;
  } else if (Math.abs(value) >= 100000) {
    return `₹${(value / 100000).toFixed(2)}L`;
  } else {
    return `₹${value.toLocaleString('en-IN')}`;
  }
};

export const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(2)}%`;
};

export const formatNumber = (value: number): string => {
  return value.toLocaleString('en-IN');
};