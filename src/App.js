import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StockPage from './pages/StockPage';
import NoPage from './pages/NoPage';
import WatchListContextProvider from './context/WatchListContextProvider';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <WatchListContextProvider>
            <HomePage />
            </WatchListContextProvider>
        } />
        <Route path='/detail/:symbol' element={<StockPage />} />
        <Route path='*' element={<NoPage/>}></Route>
      </Routes>
       </BrowserRouter>
  );
}

export default App;
