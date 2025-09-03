# Groww Finance Dashboard

A modern, real-time finance dashboard built with Next.js and TypeScript. Track financial data with customizable widgets, real-time updates, and a beautiful dark theme interface.

![Finance Dashboard](https://img.shields.io/badge/Next.js-14.2.16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **Real-time Data**: Live updates from financial APIs with configurable refresh intervals
- **Customizable Widgets**: Create, edit, and delete widgets for different data sources
- **Multiple Display Modes**: 
  - Card view for key-value pairs
  - Table view for structured data
  - Chart view for data visualization
- **Modern UI**: Dark theme with emerald accents and smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **API Integration**: Connect to any REST API endpoint
- **Data Persistence**: Widgets are saved locally and persist across sessions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/optimus-prime-01/Groww.git
cd Groww
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: SWR
- **Charts**: Recharts
- **Icons**: Lucide React

## 📱 Usage

### Adding a Widget

1. Click the "Add Widget" button
2. Enter a name for your widget
3. Provide an API URL (e.g., `https://api.coinbase.com/v2/exchange-rates?currency=BTC`)
4. Click "Test" to verify the API connection
5. Select the data fields you want to display
6. Choose a display mode (Card/Table/Chart)
7. Set the refresh interval
8. Click "Add Widget"

### Widget Management

- **Refresh**: Click the refresh icon to manually update data
- **Edit**: Click the settings icon to modify widget configuration
- **Delete**: Click the trash icon to remove a widget

## 🌐 API Examples

The dashboard works with any REST API that returns JSON data. Here are some popular financial APIs:

- **Coinbase**: `https://api.coinbase.com/v2/exchange-rates?currency=BTC`
- **Alpha Vantage**: `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=YOUR_API_KEY`
- **Yahoo Finance**: `https://query1.finance.yahoo.com/v8/finance/chart/AAPL`


## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── widgets/          # Widget-specific components
│   └── widgets-view.tsx  # Main dashboard view
├── lib/                  # Utility functions
├── store/                # Zustand state management
└── public/               # Static assets
```



**Made with ❤️ by Optimus Prime**
