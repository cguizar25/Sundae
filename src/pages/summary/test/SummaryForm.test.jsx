import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
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
test('checkbox enables button', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const button = screen.getByRole('button', { name: /confirm order/i });

  await user.click(checkbox);
  expect(button).toBeEnabled();

})

//unchecking disables button
test('unchecking disables button', async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const button = screen.getByRole('button', { name: /confirm order/i });

  await user.click(checkbox);
  await user.click(checkbox);
  expect(button).toBeDisabled();
})

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm/>);

  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actuall be delivered/i);
  expect(popover).toBeInTheDocument();

  await user.unhover(termsAndConditions);
  expect(popover).no.toBeInTheDocument();
})
