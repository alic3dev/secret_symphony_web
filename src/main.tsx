import React from 'react'
import ReactDOM from 'react-dom/client'

import '@/global.scss'

import { Router } from '@/components/Router'

import { ca } from '@/utils/ca'

const rootElement: HTMLElement | null = document.getElementById('root')
const DISPLAY_CA: boolean = true

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>,
  )

  if (DISPLAY_CA) {
    console.log(ca)
  }
} else {
  alert(
    'A critical error has occured that prevents the page from being rendered',
  )
}
