# 🌾 FieldWise - Smart Crop Planning Assistant

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**FieldWise** is a modern, production-ready web application that helps farmers make informed crop planning decisions based on real-time weather data, soil conditions, and agricultural best practices. Built with Next.js 16, TypeScript, and OpenWeatherMap API.

## ✨ Features

### 🌍 Multi-Language Support
- **English** - Full interface
- **हिंदी (Hindi)** - सभी सुविधाएं
- **मराठी (Marathi)** - सर्व वैशिष्ट्ये

### 🌤️ Real-Time Weather Integration
- Live weather data from OpenWeatherMap API
- Current temperature, humidity, and conditions
- 5-day weather forecast
- Automatic weather updates on location change

### 📍 Smart Location Detection
- GPS-based auto-location with reverse geocoding
- Manual location entry support
- Real city name detection from coordinates

### 🌱 Crop Recommendations
- Soil-type based crop suggestions
- High-yield crop identification
- Detailed growing information
- Action schedules (sowing, irrigation, harvest)

### 🎨 Modern UI/UX
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Loading states and error handling
- Bottom navigation for easy access
- Splash screen with branding

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- OpenWeatherMap API key ([Get one free](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/fieldwise-app.git
cd fieldwise-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
fieldwise-app/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Main page with state management
│   ├── components/
│   │   ├── ActionScheduler.tsx  # Crop action timeline
│   │   ├── BottomNav.tsx        # Navigation bar
│   │   ├── CropRecommender.tsx  # Crop suggestions
│   │   ├── FarmSetup.tsx        # Location & soil input
│   │   ├── Header.tsx           # Language selector
│   │   ├── SplashScreen.tsx     # App intro screen
│   │   └── WeatherDashboard.tsx # Weather display
│   ├── data/
│   │   ├── mockData.ts          # Crop database
│   │   └── translations.ts      # Multi-language strings
│   ├── services/
│   │   └── weatherService.ts    # OpenWeatherMap API
│   └── lib/
│       └── utils.ts             # Utility functions
├── .env.local                   # Environment variables (not committed)
├── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Yes |

### Supported Soil Types
- Loamy (Default)
- Clay
- Sandy
- Black

## 🌐 API Integration

### OpenWeatherMap Endpoints

**Current Weather**
```
GET https://api.openweathermap.org/data/2.5/weather
Parameters: q (city), appid (API key), units=metric
```

**5-Day Forecast**
```
GET https://api.openweathermap.org/data/2.5/forecast
Parameters: q (city), appid (API key), units=metric
```

**Reverse Geocoding**
```
GET https://api.openweathermap.org/geo/1.0/reverse
Parameters: lat, lon, appid (API key)
```

## 📱 Usage

### 1. Farm Setup
1. Enter your location manually or click the 📍 button to auto-detect
2. Select your soil type from the dropdown
3. Click **"Enter & Continue"** to proceed

### 2. Weather Dashboard
- View current temperature, humidity, and conditions
- Check 4-day weather forecast
- Data updates automatically when location changes

### 3. Crop Recommendations
- Get soil-specific crop suggestions
- View high-yield options
- Click on crops to see detailed action schedules

### 4. Language Switching
- Click the 🌐 globe icon in the header
- Select your preferred language
- All text updates instantly

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [OpenWeatherMap](https://openweathermap.org/)

## 🎯 Roadmap

- [ ] Historical weather data analysis
- [ ] Crop price predictions
- [ ] Pest and disease alerts
- [ ] Community forum
- [ ] Mobile app (React Native)
- [ ] AI-powered crop suggestions

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Vercel](https://vercel.com/) for Next.js framework

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for farmers worldwide** 🌾
