import { Suspense } from 'react'
import { CircularProgress } from '../src/styleguide'

import '../src/i18n'
import '../src/index.css'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <Suspense fallback={<CircularProgress />}>
      <Story />
    </Suspense>
  ),
];
