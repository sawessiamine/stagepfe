import * as React from 'react' ;
import "./SignUp.css" ;
import { useState } from 'react';
import axios from "axios" ;

export default function SignUp({email ,Setemail}) {
    const [signup_bool , Setsignup_bool] = useState(false) ;
    const [nom , Setnom] = useState("") ;
    const [prenom , Setprenom] = useState("") ;
    const [password , Setpassword] = useState("") ;
    const [conf_password , Setconf_password] = useState("") ;
    const [region , Setregion] = useState("") ;
    const [phone , Setphone] = useState("") ;
    const [phoneCode , SetphoneCode] = useState("") ;
    
    const [login_email , Setlogin_email] = useState("") ;
    const [login_password , Setlogin_password] = useState("") ;
    
    const [Error , setError] = useState("") ;
    const [SignError , setSignError] = useState("") ;
    const [random_val , Setrandom_val] = useState("") ;
    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    const Singup = (()=> {
        // check if the email in the database and the phone just true or false values
        axios.post('http://localhost:5000/get_email_phone_bool', {
            "email" :email ,
            "phone" : phone            
        })
        .then((response) => {
            console.log(response.data);
            var res_data = response.data ;

            var database_email = res_data["email"] ;
            var database_phone = res_data["phone"] ;

            if (password != conf_password ) {
                setSignError("password is not compatible") ;
            }
            else if ( (database_email == false)  ) {
                setSignError("email already exist in the database") ;
            }
            //else if  (database_phone == false   ){
            //    setSignError("phone already exist in the database") ;
            //}
            else if (nom.length ==0 || prenom.length ==0 || email.length ==0 || password.length ==0 || 
                region.length ==0 || phone.length ==0 ){
                setSignError("all fields are required") ;
  
            }
            else {
                if (signup_bool == false) {
                    Setsignup_bool(true) ;
                    var just_random_val = getRandomInt(99999999)
                    Setrandom_val(just_random_val ) ;
                    send_sms(just_random_val , phone) ;
                }
                console.log(random_val);                
            }
        }, (error) => {
            console.log(error);
        });



    })
    const Confirm_code = (()=> {
        var database_phone_code = random_val ;
        console.log(phoneCode , "phoneCode") ;
        console.log(random_val , "random_val") ;
        if (database_phone_code == phoneCode) {
            // insert all details in the database
            axios.post('http://localhost:5000/insert_signup', {
                "email" :email ,
                "phone" : phone ,
                "nom" : nom ,
                "prenom" : prenom ,
                "region" : region  ,
                "password" :password          
            })
            .then((response) => {
                console.log(response.data);
  
            }, (error) => {
                console.log(error);
            });
        }
        return 0 ;
    })
    const Login = (()=> {
        // select password by email from database

        axios.post('http://localhost:5000/database_password', {"email" :login_email , "password" :login_password})
        .then((response) => {
            console.log(response.data);
            var database_password = response.data["database_password"] ;
            if (database_password ) {
                sessionStorage.setItem('token', JSON.stringify('true'));

                window.location.replace('https://localhost:3000/FbSignIn');
            }
            else {
                setError("email or password is incorrect")
            }
        }, (error) => {
            console.log(error);
        });



        return 0 ;
    })
    const send_sms = ( async (random, phone)=>{
        var url = "https://mystudents.tunisiesms.tn/api/sms" ; 
        var bodyParameters =  {
        'type': '55',
        'sender': "TunSMS Test",
        'sms':[{'mobile':phone,'sms':random.toString()}]}

        var token = "12e!JhHfn8UKIKCmZb2qVcSFpI=vCL6jomk8V2pICKeVgsIGUM70!bHqvIl9futUheeDiTXwpCSW5moc9xeAax1WGohxjbSRG6g!cE55"
        var config = {
            headers: { Authorization: `Bearer ${token}` }
        } ;	
            
        
        const result = await  axios.post( 
        url ,
        bodyParameters,
        config
        )

        console.log(result.data)
        return result ; 

    })
    return (
            <div className="main">  	
                <input type="checkbox" id="chk" aria-hidden="true" />

                    <div className="signup">
                        <form>
                        {(SignError != "") && <div className='error_msg'> {SignError} </div> }

                        <label for="chk" aria-hidden="true">Sign up</label>
                            <input type="text" name="txt" placeholder="Nom" onChange={(e)=> {Setnom(e.target.value)}} />
                            <input type="text" name="txt" placeholder="Prenom"  onChange={(e)=> {Setprenom(e.target.value)}} />
                            <input type="text" name="email" placeholder="Email" onChange={(e)=> {Setemail(e.target.value)} }/>
                            <input type="password" name="pswd" placeholder="Password"  onChange={(e)=> {Setpassword(e.target.value)}}/>
                            <input type="password" name="pswd" placeholder="Confirm Password"  onChange={(e)=> {Setconf_password(e.target.value)}}/>
                            <input type="text" name="Region" placeholder="Region" onChange={(e)=> {Setregion(e.target.value)} } />
                            <input type="text" name="Phone" placeholder="Phone"  onChange={(e)=> {Setphone(e.target.value)}} />
                            <button onClick = {(e)=>{
                                e.preventDefault() ;
                                Singup();
                                }}  >Sign up</button>
                            {
                                (signup_bool) && (
                                <div>
                                    <input type="text" name="Phone" placeholder="Phone Code"  onChange={(e)=> {SetphoneCode(e.target.value)}}  />
                                    <button onClick = {(e)=>{
                                        Confirm_code();
                                        e.preventDefault() ;
                                    }}  >Confirm Code</button> 
                                </div>                                   )
                            }


                            
                        </form>
                    </div>

                    <div className="login">
                        <form>
                            {(Error != "") && <div className='error_msg'> {Error} </div> }

                            <label for="chk" aria-hidden="true">Login</label>
                            <input type="text" name="email" placeholder="Email"       onChange={(e)=> {Setlogin_email(e.target.value)}} />
                            <input type="password" name="pswd" placeholder="Password"  onChange={(e)=> {Setlogin_password(e.target.value)}}  />
                            
                            <button onClick = {(e)=>{
                                e.preventDefault() ;
                                Login();
                                e.preventDefault() ;

                                }}  >Login</button>
                        </form>
                    </div>
            </div>

    ) ;

}