
const API_BASE_URL = import.meta.env.VITE_API_JOONIK_BACKEND as string;
const API_KEY = import.meta.env.VITE_JOONIK_X_API_KEY as string;

interface ApiResponse {
  success: boolean;
  data: any[]; 
}

export const fetchLocations = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': `${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result: ApiResponse = await response.json();

    // Verifica si la respuesta fue exitosa
    if (result.success) {
      return result.data; // Devuelve la lista de sedes
    } else {
      throw new Error('La solicitud no fue exitosa');
    }
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};
