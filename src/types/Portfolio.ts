export interface Stock {
  ticker: string;
  company: string;
  sector: string;
  buyPrice: number;
  quantity: number;
  currentPrice: number;
  totalCost: number;
  currentValue: number;
  gainLossPercent: number;
  portfolioWeight: number;
  beta: number;
  sharpeRatio: number;
  profitLoss: number;
  sixMonthPrice: number;
}

export interface PortfolioSummary {
  totalCost: number;
  currentValue: number;
  totalGain: number;
  totalProfit: number;
  totalStocks: number;
  averageSharpe: number;
}

export interface SectorData {
  sector: string;
  totalValue: number;
  totalCost: number;
  profitLoss: number;
  gainLossPercent: number;
  stockCount: number;
}