import React from 'react';
import { render, screen } from '@testing-library/react';
import AddressForm from './AddressForm';

test('renders AddressForm', () => {
    render(<AddressForm />);
    const appointmentFormElement = screen.getByTestId('address-form');
    expect(appointmentFormElement).toBeInTheDocument();
});
