import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/cadastro' element={<Cadastro />} />
      <Route path='/home' element={<Home />} />
    </Routes>


    </>
  )
}

export default App
