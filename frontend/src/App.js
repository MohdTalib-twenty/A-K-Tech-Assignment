import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import VerifyOTP from './VerifyOTP';
function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/verifyOTP' element={<VerifyOTP/>}/>
      </Routes>
   </BrowserRouter>
  );
}

export default App;
