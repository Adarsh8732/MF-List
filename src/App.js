import react,{useContext} from 'react'
import './App.css';
import List from './component/List';
import { AuthProvider,AuthContext } from './context/AuthProvider';
import {Routes,Route,BrowserRouter as Router,Link } from 'react-router-dom';
import {Navigate,Outlet} from 'react-router';
import Profile from './component/Profile';
import Login from './component/Login';
import Signup from './component/Signup';
import SingleMF from './component/SingleMF';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
           <Route path='/signup' element={<Signup/>}></Route>
           <Route path='/profile' element={<PrivateRoute/>}>
             <Route path="/profile/:id" element={<Profile/>} />
           </Route>
           <Route path='/' exact element={<PrivateRoute/>}>
              <Route path="/:id" element={<SingleMF/>}/>
              <Route path="/" exact element={<List/>} />
           </Route> 
          {/* <Route path="/" element={<List/>}></Route> */}
          </Routes>
         </Router>
     </AuthProvider>

    // <List></List>
  );
}

function PrivateRoute(){
  let {currentUser} = useContext(AuthContext);
  console.log(currentUser+"->")
  console.log("in private route");
  if(currentUser!=null){
    return(
      <Outlet></Outlet>
      )
  }
  else
    return(
    <Navigate to="/login"></Navigate>
  )
        // return(
        //   <>
        //   currentUser!=null?
        //   <Outlet/>
        // </>
        // )
}
export default App;

