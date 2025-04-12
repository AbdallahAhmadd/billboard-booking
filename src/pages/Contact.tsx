import React from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material';
import { Grid } from '../components/CustomGrid';

const Contact = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        Contact Us
      </Typography>
      <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
        Have questions about our digital billboard advertising? We're here to help!
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Get in Touch
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                required
                type="email"
              />
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                margin="normal"
                type="tel"
              />
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                margin="normal"
                required
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ mt: 3 }}
              >
                Send Message
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Address:</strong><br />
              123 Digital Street<br />
              Cairo, Egypt
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Email:</strong><br />
              info@egyptdigitalbillboards.com
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Phone:</strong><br />
              +20 123 456 7890
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Business Hours:</strong><br />
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact; 