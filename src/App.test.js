import { render, screen } from '@testing-library/react';
import App from './App';
import React from "react"
import { renderWithProviders } from "./utils/setupRedux"

it('renders without crashing', () => {
  renderWithProviders(<App />);
});
