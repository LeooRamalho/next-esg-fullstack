import { BrowserRouter } from 'react-router-dom'
import Routes from './routes';
import Header from './components/Header';

const App = () => (
  <BrowserRouter>
    <Header />
    <Routes />
  </BrowserRouter>
)

export default App;