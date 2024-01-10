import React from 'react';
import { render, screen } from '@testing-library/react';
import AppointmentsPage from './AppointmentsPage';

test('renders AppointmentsPage', () => {
    render(<AppointmentsPage />);
    const appointmentFormElement = screen.getByTestId('appointments-page');
    expect(appointmentFormElement).toBeInTheDocument();
});
