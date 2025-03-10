import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from './components/Header'
import { Home } from './components/Home'
const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Header />
        <Home />
      </main>
    </QueryClientProvider>
  )
}
