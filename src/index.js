import { Web3ReactProvider } from '@web3-react/core'
import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom'
import React from 'react'

import { getLibrary } from './lib/web3'
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
