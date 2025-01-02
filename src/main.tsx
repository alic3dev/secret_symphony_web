import React from 'react'
import ReactDOM from 'react-dom/client'

import { Router } from '@/components/Router'

import './global.scss'

const rootElement: HTMLElement | null = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>,
  )
} else {
  alert(
    'A critical error has occured that prevents the page from being rendered',
  )
}
