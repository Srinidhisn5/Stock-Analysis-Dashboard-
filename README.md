# Nifty Portfolio Performance Dashboard

A comprehensive React-based dashboard for analyzing portfolio performance with advanced analytics and visualizations.

## Features

- **Portfolio Overview**: Complete portfolio summary with total value, gains, and performance metrics
- **Sector Analysis**: Visual breakdown of portfolio by sector with performance indicators
- **Risk Analysis**: Risk-return scatter plot and risk metrics analysis
- **Target vs Actual Performance**: Attribution analysis comparing actual returns against 15% target
- **Historical Comparison**: 6-month price movement analysis
- **Top Movers**: Best and worst performing stocks
- **Holdings Table**: Detailed sortable table with all portfolio holdings
- **Search & Filter**: Advanced filtering by ticker, company name, and sector

## Technology Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **CSV Data Processing** for portfolio data

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

This project is configured for easy deployment to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration and deploy

The `vercel.json` file is included for optimal deployment configuration.

## Data Structure

The dashboard uses CSV data with the following columns:
- Ticker, Company, Sector
- Buy Price, Quantity, Current Price
- Total Cost, Current Value
- Gain/Loss %, Portfolio Weight %
- Beta, Sharpe Ratio
- Profit/Loss, 6-Month Price

## Performance Features

- **Responsive Design**: Optimized for desktop and mobile viewing
- **Real-time Calculations**: Dynamic portfolio weight calculations
- **Interactive Charts**: Hover effects and detailed tooltips
- **Sortable Tables**: Multi-column sorting with visual indicators
- **Search & Filter**: Real-time filtering with instant results

## License

This project is for portfolio analysis and educational purposes.
