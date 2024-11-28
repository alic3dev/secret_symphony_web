import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import { RootPage } from '@/components/pages/RootPage'
import { DashboardPage } from '@/components/pages/DashboardPage'

import './global.scss'

const rootElement: HTMLElement | null = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<p>ASJDFIKLJ</p>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  )
} else {
  alert(
    'A critical error has occured that prevents the page from being rendered',
  )
}
