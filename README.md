# Employee Timesheet Application

A modern, responsive timesheet tracking application built with React, Vite, and attractive UI components.

## Features

- **Clock In/Out Functionality**: Employees can easily clock in and out of work
- **Real-time Time Tracking**: Live display of current working session time
- **Break Management**: Track break times with a simple button click (15-minute increments)
- **Today's Summary**: View total hours worked for the current day
- **Timesheet History**: See recent time entries with detailed information
- **Local Storage**: All data is saved locally in the browser
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient backgrounds, glassmorphism effects, and smooth animations

## Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **date-fns**: Date manipulation library
- **Lucide React**: Beautiful icons
- **CSS3**: Modern CSS with gradients, backdrop-filter, and animations
- **Local Storage**: Browser-based data persistence

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd employee-timesheet
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Usage

### Basic Operations

1. **Clock In**: Click the "Clock In" button to start tracking your work time
2. **Take Break**: While working, click "Take Break" to add a 15-minute break to your session
3. **Clock Out**: Click "Clock Out" to end your work session

### Features Overview

- **Live Clock**: Real-time clock display in the header
- **Employee Profile**: Shows employee name, ID, and position
- **Today's Stats**: Displays current date and total hours worked today
- **Current Session**: When working, shows elapsed time and start time
- **Status Indicator**: Visual indicator showing whether you're currently working or idle
- **Recent Entries Table**: Shows the last 10 time entries with complete details

### Data Persistence

All timesheet data is automatically saved to your browser's local storage, so your data persists between sessions on the same device and browser.

## Customization

### Employee Information

To customize the employee information, edit the `employee` state in `src/App.jsx`:

```javascript
const [employee, setEmployee] = useState({
  name: 'Your Name',
  id: 'EMP001',
  position: 'Your Position'
});
```

### Styling

The application uses CSS custom properties and can be easily customized by modifying the colors and styles in `src/App.css`.

### Break Duration

To change the break duration from 15 minutes, modify the `takeBreak` function in `src/App.jsx`:

```javascript
break: (currentEntry.break || 0) + 30 // Change to 30 minutes
```

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

*Note: The glassmorphism effects (backdrop-filter) work best in modern browsers.*

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.
