import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
function Login() {
    let url = process.env.DB_api_key+"/api/login" ;
    console.log(url);
    const navigate = useNavigate();
    const token = document.cookie;
    if(token != ''){
            fetch(`${url}/cookieVerification`,{
                method:'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({token:token})
            })
            .then(res=>res.json())
            .then(res=>{
                if(res.password == true){
                    navigate('/login');
                }else{
                    navigate('/')
                }      
            })
    }
    
        
    async function login(){
        document.cookie = '';
        const user = document.getElementById('user').value;
        const password = document.getElementById('new-password').value;
        const data = {
            username:user,
            password:password
        }
        

        fetch(`${url}/data`,{
            method:'POST',
            headers:{
                "content-type": "application/json"
            },
            body : JSON.stringify(data)
        })
        .then(res => res.json())
        .then((res)=>{
            if(res.username == true){
                const username_error = document.querySelector('.Username_error')
                username_error.innerHTML='<p>Username and email is not found</p>'
            }else if(res.password == true){
                const email_error = document.querySelector('.email_error')
                email_error.innerHTML='<p>password not match</p>'
            }
            else{
                document.cookie = res.jwt;
               navigate('/');
            }
        })
    }

    return (
        <>
            <div className="wrapper">
                <div className="form-box-register">
                    <h2>Login</h2>
                    <div className="input-box username">
                        <span className="icon"><ion-icon name="person"></ion-icon></span>
                        <input type="text" name="user" id="user" required />
                        <label>Username / email</label>
                        <div className="Username_error"></div>
                    </div>
                    <div className="input-box">
                        <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                        <input type="password" name="password" id="new-password" required />
                        <label>Password</label>
                        <div className="email_error"></div>
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" required />
                            Remember me
                        </label>
                    </div>
                    <button className="btn" onClick={login} >Login</button>
                    <div className="login-register">
                        <p>I don't have an account. <Link to={'/signup'}><a  className="login-link">Register</a></Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
