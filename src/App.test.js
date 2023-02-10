import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it("Renders app without crashing", function () {
  render(<App />);
});