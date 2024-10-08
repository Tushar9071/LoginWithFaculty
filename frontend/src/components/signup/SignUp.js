import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function SignUp() {
    const navigate = useNavigate();
    async function register(){ 
        var serverdata = {
            "username": false,
            "email": false
          };
        // event.preventDefault();
        const user = document.getElementById('user').value;
        const email = document.getElementById('new-email').value;
        const password = document.getElementById('new-password').value;
        const data = {
            username:user,
            email:email,
            password:password
        }

        let url = "http://localhost:3090/api/signup" ;

        fetch(`${url}/data`,{
            method:'POST',
            headers:{
                "content-type": "application/json"
            },
            body : JSON.stringify(data)
        })
        .then(res => res.json())
        .then((res) =>{
            if(res.username == true){
                const username_error = document.querySelector('.Username_error')
                username_error.innerHTML='<p>Username already teken</p>'
            }if(res.email == true){
                const username_error = document.querySelector('.email_error')
                username_error.innerHTML='<p>email already teken</p>'
            }
            if(res.username == false && res.email == false){
               navigate('/');
            }
        }
            
        )
    }
  return (
    <>

    <div class="wrapper">
        <div class="form-box-register">
            <h2>Registration</h2>
                <div class="input-box username">
                    <span class="icon"><ion-icon name="person"></ion-icon></span>
                    <input type="text" name="user" id="user" oninput="Username_check()" required/>  
                    <label >Username</label>
                    <div class="Username_error"></div>
                </div>
                <div class="input-box">
                    <span class="icon"><ion-icon name="mail"></ion-icon></span>
                    <input type="email" name="email" id="new-email" oninput="email_check()" required/>
                    <label>Email</label>
                    <div class="email_error"></div>
                </div>
                <div class="input-box">
                    <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                    <input type="password" name="password" id="new-password" oninput="password_check()" required/>
                    <label>Password</label>
                </div>
                <div class="remember-forgot">
                    <label>
                        <input type="checkbox" required/>
                        I agree to the terms & conditions
                    </label>
                </div>
                <button class="btn" type="submit" onClick={register}>register</button>
                <div class="login-register">
                    <p>Already have an account
                        <Link to={'/login'}>
                        <a class="login-link">Login</a>
                        
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default SignUp