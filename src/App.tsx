import { useState, useMemo } from 'react';
import { parseCSVData, calculatePortfolioSummary, groupBySector } from './utils/portfolioUtils';
import ExecutiveSummary from './components/ExecutiveSummary';
import SectorFilter from './components/SectorFilter';
import RiskReturnScatter from './components/RiskReturnScatter';
import SectorAllocation from './components/SectorAllocation';
import HistoricalComparison from './components/HistoricalComparison';
import HoldingsTable from './components/HoldingsTable';

// Clean CSV data from the uploaded file
const csvData = `Ticker,Company,Sector,Buy Price (₹),Quantity,Current Price (₹),Total Cost (₹),Current Value (₹),Gain/Loss %,Portfolio Weight %,Simulated Beta,Simulated Sharpe,Profit / Loss (₹),6-Month Price (₹)
RELIANCE,Reliance Ind.,Energy / Conglomerate,1200,150,1379,180000,206850,0.1491666667,0.1491666667,0.85,0.75,26850,1080
HDFCBANK,HDFC Bank,Financials,1500,100,944.25,150000,94425,-0.3705,-0.3705,1.05,0.82,-55575,1350
TCS,Tata Consultancy Svc,IT Services,3000,50,2905.4,150000,145270,-0.03153333333,-0.03153333333,1.15,0.9,-4730,2700
ICICIBANK,ICICI Bank,Financials,900,200,1362.5,180000,272500,0.5138888889,0.5138888889,1.1,0.7,92500,810
INFY,Infosys Ltd.,IT Services,1500,80,1452.2,120000,116176,-0.03186666667,-0.03186666667,1.2,0.88,-3824,1350
BHARTIARTL,Bharti Airtel,Telecom,800,150,1915.4,120000,287310,1.39425,1.39425,0.95,0.78,167310,720
ITC,ITC Ltd.,FMCG / Staples,350,400,405,140000,162000,0.1571428571,0.1571428571,0.45,0.72,22000,315
HINDUNILVR,HUL,FMCG / Staples,2100,60,2512,126000,150720,0.1961904762,0.1961904762,0.55,0.65,24720,1890
LT,Larsen & Toubro,Construction,3200,30,3743,96000,112290,0.1696875,0.1696875,1.3,0.78,16290,2880
M&M,M&M Ltd.,Auto,1500,70,3400,105000,238000,1.266666667,1.266666667,1.4,0.85,133000,1350
MARUTI,Maruti Suzuki,Auto,10000,15,16307,150000,244605,0.6307,0.6307,0.9,0.7,94605,9000
AXISBANK,Axis Bank,Financials,950,150,1154,142500,173100,0.2147368421,0.2147368421,1.1,0.68,30600,855
BAJFINANCE,Bajaj Finance,Financials,6500,25,985,162500,24625,-0.8484615385,-0.8484615385,1.35,0.92,-137875,5850
SBIN,SBI,Financials,700,220,857,154000,188540,0.2242857143,0.2242857143,0.8,0.75,34540,630
TITAN,Titan Company,Consumer Durables,3000,40,3333,120000,133320,0.111,0.111,1.25,0.8,13320,2700
ASIANPAINT,Asian Paints,Consumer Durables,2800,45,2342,126000,105390,-0.1635714286,-0.1635714286,0.9,0.6,-20610,2520
SUNPHARMA,Sun Pharma,Healthcare,1550,70,1585,108500,110950,0.02258064516,0.02258064516,0.75,0.68,2450,1395
APOLLOHOSP,Apollo Hospitals,Healthcare,5000,20,7513,100000,150260,0.5026,0.5026,1.1,0.85,50260,4500
NTPC,NTPC Ltd.,Power / Utilities,300,300,338.2,90000,101460,0.1273333333,0.1273333333,0.35,0.77,11460,270
POWERGRID,Power Grid Corp,Power / Utilities,240,350,282.35,84000,98822.5,0.1764583333,0.1764583333,0.4,0.73,14822.5,216
ADANIENT,Adani Ent.,Conglomerate,2200,50,2535.6,110000,126780,0.1525454545,0.1525454545,1.45,0.8,16780,1980
ADANIPORTS,Adani Ports,Industrials,800,100,1391.4,80000,139140,0.73925,0.73925,1.3,0.82,59140,720
WIPRO,Wipro Ltd.,IT Services,450,150,236.5,67500,35475,-0.4744444444,-0.4744444444,0.98,0.79,-32025,405
TECHM,Tech Mahindra,IT Services,1400,60,1407,84000,84420,0.005,0.005,1.12,0.85,420,1260
JSWSTEEL,JSW Steel,Metals & Mining,800,120,1128.5,96000,135420,0.410625,0.410625,1.25,0.6,39420,720
HINDALCO,Hindalco Ind.,Metals & Mining,550,180,742.5,99000,133650,0.35,0.35,1.05,0.55,34650,495
GRASIM,Grasim Ind.,Construction Mat.,1800,40,2745,72000,109800,0.525,0.525,0.95,0.65,37800,1620
ULTRACEMCO,UltraTech Cement,Construction Mat.,9000,15,12090,135000,181350,0.3433333333,0.3433333333,1.05,0.7,46350,8100
EICHERMOT,Eicher Motors,Auto,4000,25,7035,100000,175875,0.75875,0.75875,1.3,0.88,75875,3600
COALINDIA,Coal India,"Oil, Gas & Cons.",350,250,389.1,87500,97275,0.1117142857,0.1117142857,0.6,0.58,9775,315`;

function App() {
  const [selectedSector, setSelectedSector] = useState('');

  // Parse and process data
  const stocks = useMemo(() => parseCSVData(csvData), []);
  const summary = useMemo(() => calculatePortfolioSummary(stocks), [stocks]);
  const sectors = useMemo(() => groupBySector(stocks), [stocks]);
  const uniqueSectors = useMemo(() => [...new Set(stocks.map(s => s.sector))].sort(), [stocks]);

  // Filter stocks based on selected sector
  const filteredStocks = useMemo(() => {
    return selectedSector === '' 
      ? stocks 
      : stocks.filter(stock => stock.sector === selectedSector);
  }, [stocks, selectedSector]);

  // Filter sectors based on selected sector
  const filteredSectors = useMemo(() => {
    return selectedSector === '' 
      ? sectors 
      : sectors.filter(sector => sector.sector === selectedSector);
  }, [sectors, selectedSector]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Executive Summary KPI Scorecards */}
        <ExecutiveSummary summary={summary} />
        
        {/* Strategic Filter */}
        <SectorFilter
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          sectors={uniqueSectors}
        />

        {/* Core Risk Allocation Visuals - 2 Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <RiskReturnScatter stocks={filteredStocks} />
          <SectorAllocation sectors={filteredSectors} />
        </div>

        {/* Historical Comparison - Full Width */}
        <div className="mb-8">
          <HistoricalComparison stocks={filteredStocks} />
        </div>

        {/* Holdings Table - Full Width */}
        <HoldingsTable stocks={filteredStocks} />
      </div>
    </div>
  );
}

export default App;