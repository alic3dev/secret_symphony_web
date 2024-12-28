import React from 'react'
import ReactDOM from 'react-dom/client'
import * as ReactRouter from 'react-router'

import { RootPage } from '@/components/pages/RootPage'
import { DashboardPage } from '@/components/pages/DashboardPage'

import { transmit } from './utils/wire'

import './global.scss'

const rootElement: HTMLElement | null = document.getElementById('root')

if (rootElement) {
  window.transmit = transmit

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ReactRouter.BrowserRouter>
        <ReactRouter.Routes>
          <ReactRouter.Route path="/" element={<RootPage />} />
          <ReactRouter.Route path="/dashboard" element={<DashboardPage />} />
          <ReactRouter.Route path="*" element={<p>ASJDFIKLJ</p>} />
        </ReactRouter.Routes>
      </ReactRouter.BrowserRouter>
    </React.StrictMode>,
  )
} else {
  alert(
    'A critical error has occured that prevents the page from being rendered',
  )
}
