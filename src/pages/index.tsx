import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { fetchCapsules, Capsule } from './api/capsules';
import { motion } from 'framer-motion';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function Home() {
  const [capsules, setCapsules] = useState<Capsule[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCapsules();
      setCapsules(data);
    };

    fetchData();
  }, []);

  const titleVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div>
      <motion.div initial="hidden" animate="visible" variants={titleVariant}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'primary.main',
            marginTop: '1rem',
            marginBottom: '2rem',
          }}
        >
          SpaceX Rockets
        </Typography>
      </motion.div>
      <Grid container spacing={4} sx={{ padding: '0 1rem' }}>
        {capsules.map((capsule, index) => (
          <Grid item key={capsule.name} xs={12} sm={6} md={4}>
            <motion.div
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariant}
              custom={index}
            >
              <Box sx={{ height: '450px', overflow: 'hidden' }}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={capsule.flickr_images[0]}
                    alt={capsule.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {capsule.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ height: '100%', overflowY: 'auto' }}
                    >
                      Description: {capsule.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <Container maxWidth="md">
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: (theme) => theme.palette.divider,
            padding: '1rem 0',
            marginTop: '3rem',
            color: 'rgb(var(--foreground-rgb))',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            href="https://www.buymeacoffee.com/grantstarkman"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ marginBottom: '1rem' }}
          >
            Buy me a coffee
          </Button>
          <Typography variant="body2" align="center">
            We are not affiliated, associated, authorized, endorsed by, or in
            any way officially connected with Space Exploration Technologies
            Corp (SpaceX), or any of its subsidiaries or its affiliates. The
            names SpaceX as well as related names, marks, emblems and images are
            registered trademarks of their respective owners.
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
