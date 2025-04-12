import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BillboardList from './pages/BillboardList';
import Contact from './pages/Contact';
import BookNow from './pages/BookNow';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2D3748', // Deep charcoal/black
    },
    secondary: {
      main: '#805AD5', // Elegant purple
    },
    success: {
      main: '#2F855A', // Forest green
    },
    background: {
      default: '#F7FAFC',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/billboards" element={<BillboardList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book/:id" element={<BookNow />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
