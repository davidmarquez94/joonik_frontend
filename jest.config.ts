import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom', // Simula el DOM
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Usa ts-jest para transformar TypeScript
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock para archivos de estilo
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Configuración adicional
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // Extensiones reconocidas
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignorar pruebas en estos directorios
  preset: 'ts-jest', 
};

export default config;
