import "./signIn.css" ; 

import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from "axios" ;
import { stat } from "fs";

export default function FbSignIn({email}) {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');
  const [Fb_data, SetFb_data] = useState('');
  
  const responseFacebook = (response) => {
    console.log(response , "responseFacebook");
    if ("data" in response) {
        setData(response);
        setPicture(response.picture.data.url);
        if (response.accessToken) {
          setLogin(true);
        } else {
          setLogin(false);
        }      
    }

  }


  const getlikes_ofuser = ((target_pageid)=> {
    var status = false
    window.FB.api(
      '/me/likes',
      'GET',
      {},
      function(response) {
        console.log("getlikes_ofuser" , response) ;
        for (var page in response.data ) {
          var page_id = page.id
          if (target_pageid == page_id) {
            status = true ;
          }
        }
      }
    );
  
    return status
  
  })  
  const get_user_data = (()=> {
    var status = false ;
    try {
    window.FB.api(
        '/me/',
        'GET',
        {},
        function(response) {
          console.log("get_user_data" ,response)
          var name =  ((  response.data ).name ).split(" ") ; 
          return [name[0] , name[1]] ; 
    
    
    
        }
      );
          
    }
    catch {
      status = false ;
    }
 
    return status
  })
  const connectWifi = ( ()=>{
    
    const url = "http://127.0.0.1:4000/wifi_connect" ; 
    axios.get (url)
    .then((response) => {
      console.log(response.data) ;
    }).catch ((error )=> {
      console.log(error) ;

    }) 
    

    
    return 0 ;
    
    
  })

  const connectWifiafterLike = ( (pageid , page_url) => {
    
    var status = false ;
    //var isUserLikes = getlikes_ofuser(pageid)
    //if (isUserLikes && Fb_data ) {
    if (true) {
      connectWifi();
      console.log("get_user_data") ;
      get_user_data();
      user_fb_data() ;
      status = true ;
      sessionStorage.setItem('fb_token', JSON.stringify('true'));

      window.location.replace("https://localhost:3000/UploadCV");
 
    }
    else {
      window.location.replace(page_url);
    }
  
    return status 
  })
  const user_fb_data = (() => {
    axios.post ("http://127.0.0.1:5000/fb_user" ,{
      "email" :email ,
      "uid" : "07777"
    })
    .then((response) => {
      SetFb_data(response.data["status"]) ;
    }).catch ((error )=> {
      console.log(error) ;

    }) 
  })
  const GotouploadCv = (()=> {
    const page_id = "" ;
    const page_url = "" ;

    connectWifiafterLike(page_id,page_url ) ;


    return 0 ;
  })
  return (
    <div className="container">
      <div style={{ width: '600px' }}>
        <div>
          {!login &&
          <div className="fbLogin" > 
              <FacebookLogin
                appId="6101814969864837"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={responseFacebook}
                icon="fa-facebook" />                      
             </div>

          }

        </div>
        {login &&
          <button onClick ={(e) => {
            e.preventDefault() ;
            GotouploadCv();
            e.preventDefault() ;
                      }} > Continue </button>
        }
      </div>
  </div>

        


  );
}