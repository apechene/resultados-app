import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import TableroLoterias from './components/TableroLoterias.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TableroLoterias />
 
  </StrictMode>,
)
