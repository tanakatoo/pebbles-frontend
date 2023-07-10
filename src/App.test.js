import { render, screen } from '@testing-library/react';
import Home from './views/Home';
import React from "react"
import { renderWithProviders } from "./utils/setupRedux"

it('renders without crashing', () => {
  renderWithProviders(<Home />);
});
