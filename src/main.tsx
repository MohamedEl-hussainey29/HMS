import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthContextProvider from './context/AuthContext.tsx'
import FilterContextProvider from './context/FiltersContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <FilterContextProvider>
      <App />
    </FilterContextProvider>
  </AuthContextProvider>

)
