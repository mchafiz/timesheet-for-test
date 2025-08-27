import React, { useState, useEffect } from 'react';
import { format, differenceInMinutes, startOfDay, parseISO } from 'date-fns';
import { 
  Clock, 
  Play, 
  Pause, 
  Calendar, 
  User, 
  BarChart3,
  Coffee,
  CheckCircle
} from 'lucide-react';
import './App.css';

function App() {
  const [employee, setEmployee] = useState({
    name: 'John Doe',
    id: 'EMP001',
    position: 'Software Developer'
  });
  
  const [timeEntries, setTimeEntries] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const savedEntries = localStorage.getItem('timeEntries');
    if (savedEntries) {
      const parsed = JSON.parse(savedEntries);
      setTimeEntries(parsed);
      
      const activeEntry = parsed.find(entry => !entry.clockOut);
      if (activeEntry) {
        setIsWorking(true);
        setCurrentEntry(activeEntry);
      }
    }

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('timeEntries', JSON.stringify(timeEntries));
  }, [timeEntries]);

  const clockIn = () => {
    const entry = {
      id: Date.now(),
      date: format(new Date(), 'yyyy-MM-dd'),
      clockIn: new Date().toISOString(),
      clockOut: null,
      break: 0,
      notes: ''
    };
    
    setTimeEntries([entry, ...timeEntries]);
    setCurrentEntry(entry);
    setIsWorking(true);
  };

  const clockOut = () => {
    if (currentEntry) {
      const updatedEntry = {
        ...currentEntry,
        clockOut: new Date().toISOString()
      };
      
      setTimeEntries(prev => 
        prev.map(entry => 
          entry.id === currentEntry.id ? updatedEntry : entry
        )
      );
      
      setCurrentEntry(null);
      setIsWorking(false);
    }
  };

  const takeBreak = () => {
    if (currentEntry) {
      const updatedEntry = {
        ...currentEntry,
        break: (currentEntry.break || 0) + 15
      };
      
      setTimeEntries(prev => 
        prev.map(entry => 
          entry.id === currentEntry.id ? updatedEntry : entry
        )
      );
      
      setCurrentEntry(updatedEntry);
    }
  };

  const getCurrentWorkingTime = () => {
    if (!isWorking || !currentEntry) return 0;
    
    const clockInTime = parseISO(currentEntry.clockIn);
    const now = new Date();
    const totalMinutes = differenceInMinutes(now, clockInTime);
    const breakMinutes = currentEntry.break || 0;
    
    return Math.max(0, totalMinutes - breakMinutes);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getTodayTotalHours = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const todayEntries = timeEntries.filter(entry => entry.date === today);
    
    let totalMinutes = 0;
    todayEntries.forEach(entry => {
      if (entry.clockIn && entry.clockOut) {
        const clockIn = parseISO(entry.clockIn);
        const clockOut = parseISO(entry.clockOut);
        const duration = differenceInMinutes(clockOut, clockIn);
        totalMinutes += Math.max(0, duration - (entry.break || 0));
      }
    });
    
    if (isWorking) {
      totalMinutes += getCurrentWorkingTime();
    }
    
    return totalMinutes;
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Clock className="logo-icon" />
            <h1>TimeTracker</h1>
          </div>
          <div className="current-time">
            {format(currentTime, 'HH:mm:ss')}
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="employee-card">
            <div className="employee-info">
              <User className="employee-avatar" />
              <div>
                <h2>{employee.name}</h2>
                <p className="employee-id">ID: {employee.id}</p>
                <p className="employee-position">{employee.position}</p>
              </div>
            </div>
            <div className="employee-stats">
              <div className="stat">
                <Calendar className="stat-icon" />
                <div>
                  <span className="stat-label">Today</span>
                  <span className="stat-value">{format(new Date(), 'MMM dd')}</span>
                </div>
              </div>
              <div className="stat">
                <BarChart3 className="stat-icon" />
                <div>
                  <span className="stat-label">Total Hours</span>
                  <span className="stat-value">{formatDuration(getTodayTotalHours())}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="clock-section">
            <div className="current-status">
              <div className={`status-indicator ${isWorking ? 'working' : 'idle'}`}>
                {isWorking ? <Play className="status-icon" /> : <Pause className="status-icon" />}
                <span>{isWorking ? 'Working' : 'Not Working'}</span>
              </div>
              
              {isWorking && (
                <div className="current-session">
                  <h3>Current Session</h3>
                  <div className="session-time">
                    {formatDuration(getCurrentWorkingTime())}
                  </div>
                  <p className="session-start">
                    Started at {format(parseISO(currentEntry.clockIn), 'HH:mm')}
                  </p>
                </div>
              )}
            </div>

            <div className="action-buttons">
              {!isWorking ? (
                <button className="btn btn-primary btn-clock-in" onClick={clockIn}>
                  <Play className="btn-icon" />
                  Clock In
                </button>
              ) : (
                <div className="working-actions">
                  <button className="btn btn-secondary" onClick={takeBreak}>
                    <Coffee className="btn-icon" />
                    Take Break (15min)
                  </button>
                  <button className="btn btn-danger btn-clock-out" onClick={clockOut}>
                    <CheckCircle className="btn-icon" />
                    Clock Out
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="timesheet-table">
            <h3>Recent Entries</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Clock In</th>
                    <th>Clock Out</th>
                    <th>Break (min)</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {timeEntries.slice(0, 10).map((entry) => {
                    const clockIn = entry.clockIn ? parseISO(entry.clockIn) : null;
                    const clockOut = entry.clockOut ? parseISO(entry.clockOut) : null;
                    const duration = clockIn && clockOut ? 
                      differenceInMinutes(clockOut, clockIn) - (entry.break || 0) : 0;
                    
                    return (
                      <tr key={entry.id}>
                        <td>{format(clockIn || new Date(), 'MMM dd, yyyy')}</td>
                        <td>{clockIn ? format(clockIn, 'HH:mm') : '-'}</td>
                        <td>{clockOut ? format(clockOut, 'HH:mm') : '-'}</td>
                        <td>{entry.break || 0}</td>
                        <td>{clockOut ? formatDuration(duration) : 'In Progress'}</td>
                        <td>
                          <span className={`status ${clockOut ? 'completed' : 'active'}`}>
                            {clockOut ? 'Completed' : 'Active'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {timeEntries.length === 0 && (
                    <tr>
                      <td colSpan="6" className="no-data">
                        No time entries yet. Clock in to start tracking!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
