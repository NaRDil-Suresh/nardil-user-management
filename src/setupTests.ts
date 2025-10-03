import '@testing-library/jest-dom';

// Mock window.alert globally
global.alert = jest.fn();

// Mock window.confirm globally
global.confirm = jest.fn(() => true);
