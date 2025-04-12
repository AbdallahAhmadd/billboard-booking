import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
  Paper,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Grid } from '../components/CustomGrid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      title: 'Flexible Booking',
      description: 'Book billboard space for as little as 15 minutes to reach your target audience.',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      icon: <AccessTimeIcon fontSize="large" />,
    },
    {
      title: 'Prime Locations',
      description: 'Access premium digital billboard locations across major Egyptian cities.',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80',
      icon: <LocationOnIcon fontSize="large" />,
    },
    {
      title: 'Cost-Effective',
      description: 'Affordable advertising solutions for businesses of all sizes.',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      icon: <AttachMoneyIcon fontSize="large" />,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
          mb: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            opacity: 0.1,
            backgroundImage: 'url(https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant={isMobile ? "h3" : "h2"} 
                component="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                Digital Billboard Advertising Made Simple
              </Typography>
              <Typography 
                variant="h5" 
                paragraph
                sx={{ 
                  mb: 4,
                  opacity: 0.9,
                }}
              >
                Reach millions of viewers across Egypt with our innovative digital billboard network.
                Book your space today and make your brand visible!
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/billboards')}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
                  }}
                >
                  View Available Billboards
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/contact')}
                  sx={{ 
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                sx={{
                  position: 'relative',
                  height: '400px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Digital Billboard"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          textAlign="center" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            mb: 1,
          }}
        >
          Why Choose Our Digital Billboards?
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          textAlign="center" 
          sx={{ mb: 6 }}
        >
          Affordable, flexible, and effective advertising solutions
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={feature.image}
                  alt={feature.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      color: 'primary.main',
                    }}
                  >
                    {feature.icon}
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      sx={{ ml: 1, fontWeight: 600 }}
                    >
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={6} md={3}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  borderRadius: 2,
                  bgcolor: 'transparent',
                }}
              >
                <Typography variant="h3" color="primary" fontWeight="bold">
                  50+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Billboard Locations
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  borderRadius: 2,
                  bgcolor: 'transparent',
                }}
              >
                <Typography variant="h3" color="primary" fontWeight="bold">
                  1M+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Daily Viewers
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  borderRadius: 2,
                  bgcolor: 'transparent',
                }}
              >
                <Typography variant="h3" color="primary" fontWeight="bold">
                  15min
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Minimum Booking
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} md={3}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  borderRadius: 2,
                  bgcolor: 'transparent',
                }}
              >
                <Typography variant="h3" color="primary" fontWeight="bold">
                  24/7
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Customer Support
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 