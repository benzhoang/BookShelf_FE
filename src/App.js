import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import Layout from './Layout/Layout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Layout Component={HomePage} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
