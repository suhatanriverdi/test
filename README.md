## Author: Süha Tanrıverdi

# Oil Drilling Dashboard - Frontend

A modern, responsive oil drilling dashboard built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### 📊 **Drilling Data Visualization**

- **Real-time drilling data analysis** with interactive charts
- **4 different chart types**: Line charts, Bar charts, Scatter plots
- **Complete data table** with all drilling parameters
- **Statistics cards** showing key metrics
- **File upload functionality** for Excel data

### 🎛️ **Interactive Dashboard Layout**

- **Collapsible sidebar** with well selection
- **Three main tabs**: Drilling Monitoring, Offset Wells Map, Bits Summary
- **Zoom controls** (0.25x to 3x zoom levels)
- **Filter and Upload buttons** for data management
- **Responsive design** that works on all devices

### 🤖 **Drill AI Chatbot**

- **WhatsApp-style interface** with real-time messaging
- **Attachment support** for file sharing
- **Clear history functionality**
- **Professional oil & gas industry responses**
- **Session management** for persistent conversations

### 📈 **Sample Data Integration**

The dashboard includes sample drilling data with the following parameters:

- **DEPTH**: Well depth in feet
- **%SH**: Shale percentage
- **%SS**: Sandstone percentage
- **%LS**: Limestone percentage
- **%DOL**: Dolomite percentage
- **%ANH**: Anhydrite percentage
- **%Coal**: Coal percentage
- **%Salt**: Salt percentage
- **DT**: Sonic Travel Time (μs/ft)
- **GR**: Gamma Ray (API)

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Recharts** - Data visualization library
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls
- **React Dropzone** - File upload functionality
- **Vite** - Fast build tool and dev server

## 📦 Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## 🎯 Usage Guide

### **Well Selection**

- Click on any well in the left sidebar to view its details
- Use the collapse button to minimize the sidebar for more screen space
- Search wells using the search bar in the expanded sidebar

### **Drilling Monitoring Tab**

- View real-time drilling data with interactive charts
- Upload new Excel files with drilling data
- Analyze formation characteristics (shale, sandstone, etc.)
- Monitor gamma ray and sonic travel time trends

### **Offset Wells Map Tab**

- View geographic distribution of nearby wells
- Analyze spatial relationships between wells
- Monitor production zones and geological formations

### **Bits Summary Tab**

- Track drill bit performance metrics
- View bit run history and wear analysis
- Get optimization recommendations

### **Drill AI Chatbot**

- Click "Click to start conversation" to begin
- Ask questions about drilling operations, equipment, or data analysis
- Use the attachment button to share files
- Clear conversation history with the trash button

### **Zoom Controls**

- Use zoom in/out buttons to adjust view scale
- Current zoom level is displayed (1.00x, 1.25x, etc.)
- Zoom range: 0.25x to 3.00x

## 📊 Chart Types

1. **Gamma Ray vs Depth** - Line chart showing gamma ray readings
2. **Sonic Travel Time vs Depth** - Line chart showing sonic measurements
3. **Shale vs Sandstone Distribution** - Bar chart comparing formation types
4. **GR vs DT Cross Plot** - Scatter plot for correlation analysis

## 🎨 Design Features

- **Professional oil & gas industry aesthetic**
- **Dark/Light theme support** with DaisyUI
- **Responsive layout** for desktop, tablet, and mobile
- **Smooth animations** and transitions
- **Intuitive navigation** with clear visual hierarchy

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=Oil Drilling Dashboard
VITE_APP_VERSION=1.0.0
```

### API Integration

The frontend is designed to work with the NestJS backend API:

- Wells management endpoints
- File upload processing
- Chatbot AI integration
- Real-time data updates

## 📱 Responsive Design

The dashboard is fully responsive and works on:

- **Desktop** (1920x1080 and larger)
- **Laptop** (1366x768 and larger)
- **Tablet** (768x1024 and larger)
- **Mobile** (375x667 and larger)

## 🚀 Performance

- **Fast loading** with Vite build tool
- **Optimized bundle** with tree shaking
- **Lazy loading** for better performance
- **Efficient re-renders** with React optimization

## 🎯 Future Enhancements

- **Real-time data streaming** from drilling sensors
- **Advanced 3D visualization** of wellbores
- **Machine learning integration** for predictive analytics
- **Mobile app** for field operations
- **Multi-language support** for international teams

## 📄 License

This project is part of the Senior Frontend Engineer 24-hour Coding Homework for Energent.ai.

---

**Built with ❤️ for the oil & gas industry**
