import './App.css';
import SignUp from './components/SignUp.js';
import FbSignIn from './components/FbSignIn.js' ;
import { useState } from 'react';
import UploadCV from './components/UploadCV.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [email , Setemail] = useState("test@test.com") ;
  var login_status = sessionStorage.getItem("token") == '"true"';
  var other_login = sessionStorage.getItem("token") == '"false"' ;
  var face_book_status =  sessionStorage.getItem("fb_token") == '"true"' ;
  console.log("login_status2") ;
  console.log(login_status, other_login , sessionStorage.getItem("token")) ;
  //login_status = false ;
  // <SignUp email={email}  Setemail={Setemail}/>
  //      <FbSignIn email={email}/>

  return (
    <div className="App">
   
      {(login_status) &&  (
              <BrowserRouter>
              <Routes>
              <Route path="/FbSignIn" element={<FbSignIn email={email}/>} />
              </Routes>
            </BrowserRouter>
      ) 
      }
      
    { (!login_status) && (

        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<SignUp email={email}  Setemail={Setemail}/>} />
          </Routes>
        </BrowserRouter>
      ) 
      
  }
  {(face_book_status) &&  (
              <BrowserRouter>
              <Routes>
              <Route path="/UploadCV" element={ <UploadCV email={email}/>} />
              </Routes>
            </BrowserRouter>
      ) 
      }

     

    </div>
  );
}

export default App;
