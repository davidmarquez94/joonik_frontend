import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { fetchLocations } from './api';

// Mock de la función fetchLocations
jest.mock('./api', () => ({
  fetchLocations: jest.fn(),
}));

describe('App Component', () => {
  test('muestra un mensaje de error si la llamada a la API falla', async () => {
    // Simula un error en la llamada a la API
    (fetchLocations as jest.Mock).mockRejectedValueOnce(new Error('Error de red'));

    render(<App />);

    // Espera a que el mensaje de error sea mostrado
    await waitFor(() => screen.getByText(/Error: Error de red/i));

    // Verifica que el mensaje de error esté en el documento
    expect(screen.getByText(/Error: Error de red/i)).toBeInTheDocument();
  });

  test('muestra un mensaje si no hay ubicaciones disponibles', async () => {
    // Simula una llamada a la API que devuelve una lista vacía de ubicaciones
    (fetchLocations as jest.Mock).mockResolvedValueOnce([]);

    render(<App />);

    // Espera que se muestre el mensaje de "No hay sedes disponibles"
    await waitFor(() => screen.getByText(/No hay sedes disponibles/i));

    // Verifica que el mensaje esté en el documento
    expect(screen.getByText(/No hay sedes disponibles/i)).toBeInTheDocument();
  });

  test('muestra las ubicaciones correctamente después de recibir los datos de la API', async () => {
    // Simula una llamada a la API que devuelve un conjunto de ubicaciones
    const mockLocations = [
      {
        id: 1,
        image: 'https://example.com/image1.jpg',
        name: 'Colombia',
        code: 'CO',
        created_at: '2024-11-25T12:00:00Z',
      },
      {
        id: 2,
        image: 'https://example.com/image2.jpg',
        name: 'Mexico',
        code: 'MX',
        created_at: '2024-11-24T12:00:00Z',
      },
    ];
    (fetchLocations as jest.Mock).mockResolvedValueOnce(mockLocations);

    render(<App />);

    // Espera a que las ubicaciones se rendericen
    await waitFor(() => screen.getByText(/Colombia/i));

    // Verifica que las ubicaciones se muestran en el documento
    expect(screen.getByText(/Colombia/i)).toBeInTheDocument();
    expect(screen.getByText(/Mexico/i)).toBeInTheDocument();

    // Verifica que la imagen se carga correctamente
    expect(screen.getByAltText(/Colombia/i)).toHaveAttribute('src', 'https://example.com/image1.jpg');
    expect(screen.getByAltText(/Mexico/i)).toHaveAttribute('src', 'https://example.com/image2.jpg');
  });
});
