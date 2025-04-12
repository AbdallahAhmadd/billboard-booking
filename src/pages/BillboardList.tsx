import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Paper,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Rating,
  Divider,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Link as RouterLink } from 'react-router-dom';

// Import local images
import image1 from '../image.png';
import image2 from '../image copy.png';
import image3 from '../image copy 2.png';
import image4 from '../image copy 3.png';
import image5 from '../image copy 4.png';
import image6 from '../image copy 5.png';
import image7 from '../image copy 6.png';

interface Billboard {
  id: number;
  location: string;
  size: string;
  pricePerMinute: number;
  image: string;
  availability: string;
  rating: number;
  description: string;
  trafficLevel: string;
  city: string;
}

const billboards: Billboard[] = [
  {
    id: 1,
    location: 'Cairo - Downtown',
    size: '10m x 5m',
    pricePerMinute: 50,
    image: image1,
    availability: 'High',
    rating: 4.8,
    description: 'Premium digital billboard in the heart of downtown Cairo, offering maximum visibility to commuters and pedestrians.',
    trafficLevel: 'Very High',
    city: 'Cairo',
  },
  {
    id: 2,
    location: 'Alexandria - Corniche',
    size: '8m x 4m',
    pricePerMinute: 40,
    image: image2,
    availability: 'Medium',
    rating: 4.5,
    description: 'Stunning waterfront billboard with panoramic views of the Mediterranean Sea, perfect for luxury brands.',
    trafficLevel: 'High',
    city: 'Alexandria',
  },
  {
    id: 3,
    location: 'Giza - Pyramids Road',
    size: '12m x 6m',
    pricePerMinute: 60,
    image: image3,
    availability: 'Low',
    rating: 4.9,
    description: 'Iconic billboard location near the Pyramids, offering unparalleled visibility to tourists and locals alike.',
    trafficLevel: 'High',
    city: 'Giza',
  },
  {
    id: 4,
    location: 'New Cairo',
    size: '9m x 4.5m',
    pricePerMinute: 45,
    image: image4,
    availability: 'High',
    rating: 4.7,
    description: 'Modern digital billboard in the upscale New Cairo district, targeting affluent consumers and business professionals.',
    trafficLevel: 'Medium',
    city: 'Cairo',
  },
  {
    id: 5,
    location: 'Maadi - Road 9',
    size: '7m x 3.5m',
    pricePerMinute: 35,
    image: image5,
    availability: 'High',
    rating: 4.3,
    description: 'Charming billboard in the expatriate-friendly Maadi district, ideal for international brands and services.',
    trafficLevel: 'Medium',
    city: 'Cairo',
  },
  {
    id: 6,
    location: 'Heliopolis ',
    size: '11m x 5.5m',
    pricePerMinute: 55,
    image: image6,
    availability: 'Medium',
    rating: 4.6,
    description: 'Strategic billboard location on one of Heliopolis\'s main thoroughfares, offering excellent visibility to commuters.',
    trafficLevel: 'High',
    city: 'Cairo',
  },
  {
    id: 7,
    location: '6th of October City',
    size: '10m x 5m',
    pricePerMinute: 48,
    image: image7,
    availability: 'High',
    rating: 4.4,
    description: 'Modern billboard in the rapidly growing 6th of October City, perfect for reaching new urban developments.',
    trafficLevel: 'Medium',
    city: 'Giza',
  },
];

// Create a professional theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2D3748', // Deep charcoal
      light: '#4A5568',
      dark: '#1A202C',
    },
    secondary: {
      main: '#805AD5', // Elegant purple
      light: '#9F7AEA',
      dark: '#6B46C1',
    },
    success: {
      main: '#38A169', // Forest green
      light: '#48BB78',
      dark: '#2F855A',
    },
    warning: {
      main: '#D69E2E', // Warm amber
      light: '#ECC94B',
      dark: '#B7791F',
    },
    error: {
      main: '#E53E3E', // Deep red
      light: '#FC8181',
      dark: '#C53030',
    },
    info: {
      main: '#4299E1', // Sky blue
      light: '#63B3ED',
      dark: '#3182CE',
    },
    background: {
      default: '#F7FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A202C',
      secondary: '#4A5568',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h5: {
      fontWeight: 600,
      letterSpacing: '-0.25px',
    },
    h6: {
      fontWeight: 500,
      letterSpacing: '-0.25px',
    },
    body1: {
      fontWeight: 400,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontWeight: 400,
      letterSpacing: '0.00938em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.5px',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

const BillboardList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const cities = ['All', ...Array.from(new Set(billboards.map(billboard => billboard.city)))];

  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'high':
        return 'success';
      case 'medium':
        return 'warning';
      case 'low':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTrafficLevelColor = (trafficLevel: string) => {
    switch (trafficLevel.toLowerCase()) {
      case 'very high':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredBillboards = billboards.filter(billboard => {
    const matchesSearch = billboard.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         billboard.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || billboard.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          textAlign="center"
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            color: 'primary.main',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              backgroundColor: 'secondary.main',
              borderRadius: '2px',
            }
          }}
        >
          <Box component="span" sx={{ color: 'primary.main' }}>Bill A</Box>
          <Box component="span" sx={{ color: 'secondary.main' }}>Board</Box>
          <Box component="span" sx={{ color: 'success.main', ml: 0.5 }}>$</Box>
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          textAlign="center" 
          sx={{ mb: 6, mt: 4 }}
        >
          Book your advertising space in prime locations across Egypt
        </Typography>
        
        {/* Search and Filter Section */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 5, 
            borderRadius: 2,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'rgba(0,0,0,0.06)',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                placeholder="Search by location or description"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                  sx: { 
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'rgba(0,0,0,0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.light',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    }
                  }
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FilterListIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body1" sx={{ mr: 2, color: 'text.secondary', fontWeight: 500 }}>
                  Filter by city:
                </Typography>
                <Tabs 
                  value={selectedCity} 
                  onChange={(e, newValue) => setSelectedCity(newValue)}
                  variant={isMobile ? "scrollable" : "standard"}
                  scrollButtons="auto"
                  sx={{ 
                    '& .MuiTab-root': { 
                      minWidth: 'auto',
                      px: 2,
                      py: 1,
                      color: 'text.secondary',
                      fontWeight: 500,
                      '&.Mui-selected': {
                        color: 'primary.main',
                        fontWeight: 600,
                      },
                    },
                    '& .MuiTabs-indicator': {
                      backgroundColor: 'primary.main',
                      height: 3,
                      borderRadius: 1.5,
                    },
                  }}
                >
                  {cities.map((city) => (
                    <Tab key={city} label={city} value={city} />
                  ))}
                </Tabs>
              </Box>
            </Box>
          </Box>
        </Paper>
        
        {/* Billboard Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
          {filteredBillboards.map((billboard) => (
            <Card 
              key={billboard.id}
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={billboard.image}
                alt={billboard.location}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                    {billboard.location}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StarIcon sx={{ color: 'warning.main', fontSize: 20, mr: 0.5 }} />
                    <Typography variant="body2" fontWeight="bold">
                      {billboard.rating}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={`Availability: ${billboard.availability}`}
                    color={getAvailabilityColor(billboard.availability)}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                  <Chip
                    label={`Traffic: ${billboard.trafficLevel}`}
                    color={getTrafficLevelColor(billboard.trafficLevel)}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  {billboard.description}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      {billboard.size}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AttachMoneyIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
                    <Typography variant="body2" fontWeight="bold" color="success.main">
                      ${billboard.pricePerMinute}/minute
                    </Typography>
                  </Box>
                </Box>
                
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={RouterLink}
                  to={`/book/${billboard.id}`}
                  sx={{ 
                    mt: 1,
                    py: 1.2,
                    borderRadius: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                  }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default BillboardList; 