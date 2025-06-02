import './App.css'
import Home from './component/page/HomePage';
import { LoginPage } from './component/page/login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './component/page/register';
function App() {


  return (
    <>
      <div>

        <BrowserRouter>
          <Routes>

            <Route path='user/login' element={<LoginPage />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='user/register' element={<RegisterForm />}></Route>
          </Routes>

        </BrowserRouter>


      </div>
    </>
  )
}

export default App
