import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('handles errors for scoops and toppings routes', async () =>{
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
      res(ctx.status9)
    ),
    rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
      res(ctx.status9)
    )
  );

  render(<OrderEntry />);

  await waitFor(async() => {
    const alerts = screen.findAllByRole('alert');
    expect(alerts).toHaveLength(2);
  })


})
