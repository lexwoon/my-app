import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders highest earning employee', () => {
  render(<App />);
  const linkElement = screen.getByText(/Highest Earning Employee :/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Most Recent Joined Employee', () => {
  render(<App />);
  const linkElement = screen.getByText(/Most Recent Joined Employee :/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders total employee', () => {
  const {container} = render(<App />);
  expect(container.querySelector('[data-testid="total_employee"] path')).toBeInTheDocument();
});


test('renders total employee svg', () => {
  const {container} = render(<App />);
  expect(container.querySelector('svg')).toBeInTheDocument();
});

test('renders employee Table', () => {
  const {container} = render(<App />);
  expect(container.querySelector('table')).toBeInTheDocument();
});

