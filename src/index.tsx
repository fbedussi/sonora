import './index.css'
import './i18n'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import StyledEngineProvider from '@mui/material/StyledEngineProvider'

import App from './App'
import reportWebVitals from './reportWebVitals'
import { configureStore } from './store'
import { CircularProgress, ThemeProvider } from './styleguide'
import theme from './styleguide/theme'

const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst >
        <ThemeProvider theme={theme}>
          <Suspense fallback={<CircularProgress />}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
