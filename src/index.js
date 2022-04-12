// ** React Imports
import { Suspense, lazy, useState } from 'react'
import ReactDOM from 'react-dom'

// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from './redux/storeConfig/store'

// ** Intl, CASL & ThemeColors Context
import ability from './configs/acl/ability'
import { ToastContainer } from 'react-toastify'
import { AbilityContext, DashboardContext } from './utility/context/Can'
import { ThemeContext } from './utility/context/ThemeColors'
import { IntlProviderWrapper } from './utility/context/Internationalization'

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner'

// ** Ripple Button
import './@core/components/ripple-button'

// ** Fake Database
import './@fake-db'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss'

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'
// ** Lazy load app
const LazyApp = lazy(() => import('./App'))
ReactDOM.render(

  <Provider store={ store }>
    <Suspense fallback={ <Spinner /> }>
      <AbilityContext.Provider value={ ability }>
        <ThemeContext>
          <IntlProviderWrapper>
            <LazyApp />
            <ToastContainer newestOnTop />
          </IntlProviderWrapper>
        </ThemeContext>
      </AbilityContext.Provider>
    </Suspense>
  </Provider>,
  document.getElementById('root')
)
