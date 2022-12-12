import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from './SumaryForm';

//checkbox is unchecked by default
test('Initial conditions', () ={
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' });
  const button = screen.getByRole('button', { name: 'Confirm Order' });

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

//checkbox enables buuton
test('checkbox enables button', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' });
  const button = screen.getByRole('button', { name: 'Confirm Order' });

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

})

//unchecking disables button
test('unchecking disables button', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { name: 'I agree to Terms and Conditions' });
  const button = screen.getByRole('button', { name: 'Confirm Order' });

  fireEvent.click(checkbox);
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
})
