import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { VideoHome } from './components/video-home';
import { AdminLogin } from './components/admin-login';
import { UserLogin } from './components/user-login';
import { AdminDashboard } from './components/admin-dashboard';
import { AddVideos } from './components/admin-add-videos';
import { EditVideo } from './components/admin-edit-video';
import { VideoDelete } from './components/admin-delete-video';
import { AddCategory } from './components/add-category';
import { EditCategory } from './components/edit-category';
import { CategoryDelete } from './components/delete-category';
import { RegisterUser } from './components/user-register';
import { UserDashboard } from './components/user-dashboard';
import { ResetPassword } from './components/user-pass-reset';
import { About } from './components/about';
import { Contact } from './components/contact';
import { Support } from './components/support';
import { Avatar } from '@mui/material';
import { UserProtectedRoute } from './components/user-protected';
import { AdminProtectedRoute } from './components/admin-protected';

function App() {
  return (
    <div className="body-background">
      <div className='bg-shade'>
        <div style={{backgroundColor:'rgba(0,0,0,0.5)',boxShadow:'5px 5px 5px black'}} className='p-2'><span className='d-flex'><span><Avatar alt="Technology Video Logo" src="/techno-logo-3.png" style={{ width: 80, height: 70 }}/></span><span className='h1 text-light'>Technology Video Library</span></span></div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<VideoHome/>} />
            <Route path='admin-login' element={<AdminLogin/>} />
            <Route path='user-login' element={<UserLogin/>}/>
            <Route element={<AdminProtectedRoute/>}>
              <Route path='admin-dash' element={<AdminDashboard/>}/>
            </Route>
            <Route path='add-video' element={<AddVideos/>}/>
            <Route path='edit-video/:id' element={<EditVideo/>}/>
            <Route path='delete-video/:id' element={<VideoDelete/>}/>
            <Route path='add-category' element={<AddCategory/>}/>
            <Route path='edit-category/:id' element={<EditCategory/>}/>
            <Route path='delete-category/:id' element={<CategoryDelete/>}/>
            <Route path='user-register' element={<RegisterUser/>}/>
            <Route element={<UserProtectedRoute/>}>
              <Route path='user-dash' element={<UserDashboard/>}/>
            </Route>
            <Route path='edit-user-pass' element={<ResetPassword/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='contact' element={<Contact/>}/>
            <Route path='support' element={<Support/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
