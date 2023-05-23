import * as React from 'react' ;
import "./SignUp.css" ;


export default function SignUp() {



    return (
            <div className="main">  	
                <input type="checkbox" id="chk" aria-hidden="true" />

                    <div className="signup">
                        <form>
                            <label for="chk" aria-hidden="true">Sign up</label>
                            <input type="text" name="txt" placeholder="Nom" />
                            <input type="text" name="txt" placeholder="Prenom" />
                            <input type="email" name="email" placeholder="Email"  />
                            <input type="password" name="pswd" placeholder="Password" />
                            <input type="password" name="pswd" placeholder="Confirm Password" />
                            <button>Sign up</button>
                        </form>
                    </div>

                    <div className="login">
                        <form>
                            <label for="chk" aria-hidden="true">Login</label>
                            <input type="email" name="email" placeholder="Email" required="" />
                            <input type="password" name="pswd" placeholder="Password" required=""  />
                            <button>Login</button>
                        </form>
                    </div>
            </div>

    ) ;

}