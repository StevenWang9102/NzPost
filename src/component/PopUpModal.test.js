
import React from 'react';
import { render } from '@testing-library/react';
import { PopUpModal } from './PopUpModal';

test('MyComponent should contain Type and Height text', () => {
  const { getByText } = render(<PopUpModal/>);
  const typeText = getByText('Type');
  const heightText = getByText('Height');

  expect(typeText).toBeInTheDocument();
  expect(heightText).toBeInTheDocument();
});