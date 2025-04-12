import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useParams } from 'react-router-dom';
import { AttachMoney, CheckCircle, Error as ErrorIcon } from '@mui/icons-material';

// Helper functions for date manipulation
const formatDate = (date: Dayjs | null): string => {
  if (!date) return 'Not selected';
  return date.format('MMM DD, YYYY');
};

const formatTime = (date: Dayjs | null): string => {
  if (!date) return 'Not selected';
  return date.format('hh:mm A');
};

const addDaysToDate = (date: Dayjs, days: number): Dayjs => {
  return date.add(days, 'day');
};

const isDateAfter = (date1: Dayjs | null, date2: Dayjs | null): boolean => {
  if (!date1 || !date2) return false;
  return date1.isAfter(date2);
};

const isDateBefore = (date1: Dayjs | null, date2: Dayjs | null): boolean => {
  if (!date1 || !date2) return false;
  return date1.isBefore(date2);
};

const parseISOString = (dateString: string): Dayjs => {
  return dayjs(dateString);
};

// Mock billboard data - in a real app, this would come from an API
const billboardData = {
  id: '1',
  location: 'Times Square, New York',
  size: '50ft x 20ft',
  pricePerMinute: 10,
  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  availability: 'Available',
  rating: 4.5,
  description: 'Prime location in the heart of Times Square. High visibility and foot traffic.',
  trafficLevel: 'High',
  city: 'New York',
  coordinates: {
    lat: parseISOString('40.7580'),
    lng: parseISOString('-73.9855'),
  },
};

const steps = ['Select Media', 'Preview & Schedule', 'Confirm Booking'];

const BookNow = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [startDate, setStartDate] = useState<Dayjs | null>(addDaysToDate(dayjs(), 1));
  const [endDate, setEndDate] = useState<Dayjs | null>(addDaysToDate(dayjs(), 7));
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs());
  const [totalCost, setTotalCost] = useState<string>('0.00');
  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate total cost based on duration
  useEffect(() => {
    if (startDate && endDate && startTime && endTime) {
      const start = startDate.hour(startTime.hour()).minute(startTime.minute());
      const end = endDate.hour(endTime.hour()).minute(endTime.minute());
      
      const diffInMinutes = end.diff(start, 'minute');
      setTotalCost((diffInMinutes * billboardData.pricePerMinute).toFixed(2));
    }
  }, [startDate, endDate, startTime, endTime, billboardData.pricePerMinute]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      alert('Please upload an image or video file');
      return;
    }

    setMediaType(isImage ? 'image' : 'video');
    setMediaFile(file);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setMediaPreview(previewUrl);
  };

  const handleRemoveMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!mediaFile) {
        setError('Please upload a media file');
        return;
      }
      setError('');
      setActiveStep((prevStep) => prevStep + 1);
    } else if (activeStep === 1) {
      if (!startDate || !endDate || !startTime || !endTime) {
        setError('Please select start and end dates and times');
        return;
      }
      
      const start = startDate.hour(startTime.hour()).minute(startTime.minute());
      const end = endDate.hour(endTime.hour()).minute(endTime.minute());
      
      if (isDateAfter(start, end)) {
        setError('End date and time must be after start date and time');
        return;
      }
      
      setError('');
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setBookingComplete(true);
    }, 2000);
  };

  const handleBackToHome = () => {
    navigate('/billboards');
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Upload Your Media
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Upload an image or video to display on the billboard. Supported formats: JPG, PNG, MP4, MOV.
            </Typography>
            
            <Paper
              variant="outlined"
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed',
                borderColor: 'primary.main',
                borderRadius: 2,
                bgcolor: 'background.default',
                cursor: 'pointer',
                height: 300,
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              {mediaPreview ? (
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                  {mediaType === 'image' ? (
                    <img
                      src={mediaPreview}
                      alt="Preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <video
                      src={mediaPreview}
                      controls
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  )}
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'background.paper',
                      '&:hover': { bgcolor: 'background.paper' },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveMedia();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <CloudUploadIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Drag & Drop or Click to Upload
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mediaType === 'image' ? 'Image' : 'Video'} files only
                  </Typography>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
                style={{ display: 'none' }}
              />
            </Paper>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/billboards')}
              >
                Back to Billboards
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleNext}
                disabled={!mediaFile}
              >
                Next
              </Button>
            </Box>
          </Box>
        );
        
      case 1:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Preview & Schedule
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Billboard Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {billboardData.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {billboardData.size} • {billboardData.trafficLevel} Traffic
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {billboardData.description}
                    </Typography>
                  </CardContent>
                </Card>
                
                <Typography variant="h6" gutterBottom>
                  Schedule Your Ad
                </Typography>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        minDate={addDaysToDate(dayjs(), 1)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <TimePicker
                        label="Start Time"
                        value={startTime}
                        onChange={(newValue) => setStartTime(newValue)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        minDate={startDate || addDaysToDate(dayjs(), 1)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <TimePicker
                        label="End Time"
                        value={endTime}
                        onChange={(newValue) => setEndTime(newValue)}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </LocalizationProvider>
                
                <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Pricing
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${billboardData.pricePerMinute} per minute
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h6" color="primary.main">
                    Total Cost: ${totalCost}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Preview
                </Typography>
                <Paper
                  sx={{
                    p: 0,
                    bgcolor: 'background.default',
                    borderRadius: 2,
                    height: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {/* Base billboard image */}
                  <Box
                    component="img"
                    src="https://placeit-img-1-p.cdn.aws.placeit.net/uploads/stage/stage_image/57969/optimized_product_thumb_2864-el.jpg"
                    alt="Billboard Template"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  />
                  
                  {/* Content overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '15%',
                      left: '50%',
                      width: '68%',
                      height: '26%',
                      overflow: 'hidden',
                      transformStyle: 'preserve-3d',
                      transform: 'translateX(-50%) perspective(1000px) rotateX(5deg) translateY(59%)',
                      backgroundColor: mediaPreview ? 'transparent' : 'rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {mediaPreview ? (
                      mediaType === 'image' ? (
                        <img
                          src={mediaPreview}
                          alt="Billboard Preview"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <video
                          src={mediaPreview}
                          controls
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      )
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          textAlign: 'center',
                          padding: 2,
                        }}
                      >
                        <Typography variant="body1">
                          Upload your content to preview how it will look on the billboard
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Paper>
                
                {/* Optional: Add a note about preview being a simulation */}
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
                  This is a simulated preview. Actual appearance may vary slightly.
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleNext}
                disabled={!startDate || !endDate || !startTime || !endTime}
              >
                Next
              </Button>
            </Box>
          </Box>
        );
        
      case 2:
        return (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Confirm Booking
            </Typography>
            
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Booking Summary
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Billboard Location
                    </Typography>
                    <Typography variant="body1">{billboardData.location}</Typography>
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Size
                    </Typography>
                    <Typography variant="body1">{billboardData.size}</Typography>
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Start Date & Time
                    </Typography>
                    <Typography variant="body1">
                      {startDate && startTime
                        ? formatDate(startDate) + ' at ' + formatTime(startTime)
                        : 'Not selected'}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      End Date & Time
                    </Typography>
                    <Typography variant="body1">
                      {endDate && endTime
                        ? formatDate(endDate) + ' at ' + formatTime(endTime)
                        : 'Not selected'}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Media Type
                    </Typography>
                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                      {mediaType}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ width: '100%' }}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" color="primary.main">
                      Total Cost: ${totalCost}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Confirm Booking'}
              </Button>
            </Box>
          </Box>
        );
        
      default:
        return null;
    }
  };

  if (bookingComplete) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="success.main">
            Booking Confirmed!
          </Typography>
          <Typography variant="body1" paragraph>
            Your billboard booking has been successfully confirmed. You will receive a confirmation email shortly.
          </Typography>
          <Typography variant="body1" paragraph>
            Booking Reference: BB-{Math.floor(Math.random() * 1000000)}
          </Typography>
          <Button
            variant="contained"
            onClick={handleBackToHome}
            sx={{ mt: 2 }}
          >
            Back to Billboards
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Book Billboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {billboardData.location} • {billboardData.size}
        </Typography>
      </Box>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {renderStepContent(activeStep)}
    </Container>
  );
};

export default BookNow; 