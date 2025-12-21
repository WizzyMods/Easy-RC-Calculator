# Easy RC Calculator

A comprehensive, modern, and easy-to-use calculator suite designed for Radio Control (RC) hobbyists. Built with React and Vite, this application provides a collection of essential and advanced tools to help optimize your RC vehicle's performance.

## 🚀 Features

- **Comprehensive Toolset**: Over 20 specialized calculators for electronics, motors, transmission, chassis, and physics.
- **Real-Time Calculations**: Instant results as you type.
- **Unit Conversion**: Seamless user-preference switching between Metric and Imperial units throughout the app.
- **Modern UI**: A sleek, responsive interface featuring glassmorphism design and smooth animations powered by Framer Motion.
- **Search & Navigation**: Quickly find the tool you need with an integrated search bar.
- **Multi-Language Support**: Fully localized interface (English & Turkish).

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: CSS Modules & Global Styles (Glassmorphism aesthetic)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Linting**: ESLint

## 🧮 Available Calculators

### Essential Tools
- **Watt Calculator**: Calculate power (Watts) from voltage and current.
- **RPM Calculator**: Estimate motor RPM based on KV and voltage.
- **Gear Ratio**: Calculate the final drive ratio from spur and pinion gears.
- **FDR (Final Drive Ratio)**: Complex calculation including internal ratio and tire diameter.
- **Rollout**: Determine the distance traveled per motor revolution.
- **Charge Time**: Estimate battery charging time based on capacity and charge current.
- **Scale Speed**: Convert actual RC speed to scale speed (e.g., 1/10 scale).
- **Battery Energy**: Calculate battery energy in Watt-hours (Wh).
- **Current Draw**: Estimate current draw from power and voltage.
- **Motor KV**: Calculate Motor KV from measured RPM and voltage.

### Advanced Tools
- **Speed Calculator**: Estimate theoretical top speed based on gearing and motor specs.
- **Run Time**: Calculate estimated run time based on battery capacity and average draw.
- **CG Balance**: Determine the center of gravity percentage.
- **Corner Weight**: Analyze chassis balance using corner weights.
- **Turning Radius**: Calculate turning radius based on wheelbase and steering angle.
- **Motor Efficiency**: Determine efficiency from input vs. output power.
- **ESC Thermal Load**: Estimate heat generation in the speed controller.
- **Drag Force**: Calculate aerodynamic drag force at speed.
- **Weight Transfer**: Estimate weight transfer during acceleration.
- **Torque**: Calculate motor torque.

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/easy-rc-calculator.git
   cd easy-rc-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📄 License

This project is licensed under the Apache-2.0 License - see the [LICENSE](LICENSE) file for details.
