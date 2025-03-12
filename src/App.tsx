import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header'
import { Home } from './components/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <Header />
      <Home />
    </QueryClientProvider>
  )
}
