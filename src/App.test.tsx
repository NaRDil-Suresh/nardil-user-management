import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock Supabase
// @ts-ignore
jest.mock('@supabase/supabase-js');

describe('App Component', () => {
  test('renders NaRDil header', () => {
    render(<App />);
    const headerElement = screen.getByText('NaRDil');
    expect(headerElement).toBeInTheDocument();
  });

  test('shows popup when header is clicked', () => {
    render(<App />);
    const header = screen.getByText('NaRDil');
    fireEvent.click(header);
    
    expect(screen.getByText('Hi All')).toBeInTheDocument();
    expect(screen.getByText('Okay')).toBeInTheDocument();
  });

  test('renders user management form', () => {
    render(<App />);
    
    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.getByText('Add New User')).toBeInTheDocument();
    expect(screen.getByLabelText('User Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Mail ID:')).toBeInTheDocument();
    expect(screen.getByLabelText('User Code:')).toBeInTheDocument();
    expect(screen.getByText('Add User')).toBeInTheDocument();
  });

  test('renders users table', () => {
    render(<App />);
    
    expect(screen.getByText('Users List')).toBeInTheDocument();
    expect(screen.getByText('User Name')).toBeInTheDocument();
    expect(screen.getByText('Mail ID')).toBeInTheDocument();
    expect(screen.getByText('User Code')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('Additional Info')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('form inputs work correctly', () => {
    render(<App />);
    
    const userNameInput = screen.getByLabelText('User Name:');
    const mailIdInput = screen.getByLabelText('Mail ID:');
    const userCodeInput = screen.getByLabelText('User Code:');
    const userPhnumberInput = screen.getByLabelText('Phone Number:');
    const userAddcolInput = screen.getByLabelText('Additional Column:');
    
    fireEvent.change(userNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(mailIdInput, { target: { value: 'john@example.com' } });
    fireEvent.change(userCodeInput, { target: { value: 'JD001' } });
    fireEvent.change(userPhnumberInput, { target: { value: '+1234567890' } });
    fireEvent.change(userAddcolInput, { target: { value: 'Additional Info' } });
    
    expect(userNameInput).toHaveValue('John Doe');
    expect(mailIdInput).toHaveValue('john@example.com');
    expect(userCodeInput).toHaveValue('JD001');
    expect(userPhnumberInput).toHaveValue('+1234567890');
    expect(userAddcolInput).toHaveValue('Additional Info');
  });
});
