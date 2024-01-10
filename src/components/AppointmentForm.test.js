import React from 'react';
import { render, screen } from '@testing-library/react';
import AppointmentForm from './AppointmentForm';

test('renders AppointmentForm', () => {
    render(<AppointmentForm />);
    const appointmentFormElement = screen.getByTestId('appointment-form');
    expect(appointmentFormElement).toBeInTheDocument();
});
