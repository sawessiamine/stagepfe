import { useState } from 'react';
import * as React from 'react' ;
import axios from "axios" ;



export default function UploadCV ({email}) {
  const [file, Setfile] = useState(null) ;

  const send_file_backend = (()=> {
    
    const data = new FormData();
    data.append('file', file);
    //data.append('fileName', "thename");

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    console.log(file) ;
    console.log(data) ;
    console.log("\n") ;
    console.log("\n") ;


    axios.post("http://127.0.0.1:5000/save_file",data ,config)
    .then((response) => {
      console.log(response.data) ;
    })
    .catch((error) => {
      console.log(error) ;
    })
    //sessionStorage.setItem("login_status", false);
    sessionStorage.setItem('token', JSON.stringify('false'));
    sessionStorage.setItem('fb_token', JSON.stringify('false'));

    console.log("login_status") ;
    console.log(sessionStorage.getItem("token")) ;
    return 0 ;

  })

    return (
        <div className="UploadCV">
          <form >
              <label>Upload Your CV </label>
              <input type="file" name ="test"  onChange={(e)=> {Setfile(e.target.files[0])}} /> 
              <button type="button"  onClick={(e) =>{
                 e.preventDefault() ;
                 send_file_backend() ;
                 }}>
                SEND
              </button>
        </form>
                                      

        </div>
      );
}