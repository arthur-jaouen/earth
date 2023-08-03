import 'dayjs/locale/en';
import 'dayjs/locale/es';
import 'dayjs/locale/fr';

import { createRoot } from 'react-dom/client';
import { App } from './app/app';

const root = document.getElementById('root');

if (!root) {
  throw Error('Unable to find root element');
}

createRoot(root).render(<App />);
