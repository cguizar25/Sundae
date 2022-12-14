import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm.jsx';

//checkbox is unchecked by default
test('Initial conditions', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const button = screen.getByRole('button', { name: /confirm order/i });

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

//checkbox enables buuton
test('checkbox enables button', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const button = screen.getByRole('button', { name: /confirm order/i });

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

})

//unchecking disables button
test('unchecking disables button', () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const button = screen.getByRole('button', { name: /confirm order/i });

  fireEvent.click(checkbox);
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
})
