import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const seerver = setupServer(...handlers);
