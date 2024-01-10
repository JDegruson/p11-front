import React from 'react';
import { render, screen } from '@testing-library/react';
import FindHospitalButton from './FindHospitalButton';

test('renders FindHospitalButton', () => {
    render(<FindHospitalButton />);
    const appointmentFormElement = screen.getByTestId('findhospitalbutton');
    expect(appointmentFormElement).toBeInTheDocument();
});
