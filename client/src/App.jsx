import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './page/Home'
import ImageUpload from './page/ImageUpload'
import Error from './page/Error'
import Login from './page/Login'
import AdminPrivateRoute from './page/auth/PrivateRoute'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          {/* <Route exact path='/image/upload' element={<ImageUpload/>}/> */}
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/*' element={<Error/>}/>
          <Route path='/image/upload' element={
            <AdminPrivateRoute>
              <ImageUpload />
            </AdminPrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App