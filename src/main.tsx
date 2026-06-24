import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthContextProvider from './context/AuthContext.tsx'
import FilterContextProvider from './context/FiltersContext.tsx'
import { RoomsProvider } from './context/RoomsContext.tsx'
import BookingProvider from './context/BookingContext.tsx'
import { FavoritesProvider } from './context/FavoritesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <FilterContextProvider>
      <RoomsProvider>
        <BookingProvider>
          <FavoritesProvider>
             <App />
          </FavoritesProvider>
        </BookingProvider>
      </RoomsProvider>
    </FilterContextProvider>
  </AuthContextProvider>

)
