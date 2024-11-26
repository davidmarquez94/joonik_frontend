import React, { useEffect, useState } from 'react';
import { fetchLocations } from './api';
import { Card, CardContent, CardMedia, Grid, Typography, Box } from '@mui/material';

interface Location {
  id: number;
  image: string;
  name: string;
  code: string;
  created_at: string;
}

const App: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getLocations = async () => {
    try {
      const result = await fetchLocations();
      setLocations(result);
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  const formatDate = (dateString: string) => {
    console.log("Fecha recibida:", dateString); // Ver qué valor tiene la fecha
    if (!dateString) {
      return "Fecha inválida";  // Devolver un mensaje si no hay fecha
    }

    // Asegurarse de que la fecha tiene el formato adecuado
    let cleanDateString = dateString;
    if (dateString.includes('.') && !dateString.includes('Z')) {
      // Si tiene microsegundos pero no tiene Z al final, agregarlo
      cleanDateString = dateString.split('.')[0] + 'Z';
    }

    const date = new Date(cleanDateString);

    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }) + ' ' + date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Listado de Países
      </Typography>

      {locations.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">No hay sedes disponibles.</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {locations.map((location) => (
            <Grid item xs={12} sm={6} md={4} key={location.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={location.image}
                  alt={location.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {location.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Código: {location.code}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Fecha de Creación: {formatDate(location.created_at)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default App;
