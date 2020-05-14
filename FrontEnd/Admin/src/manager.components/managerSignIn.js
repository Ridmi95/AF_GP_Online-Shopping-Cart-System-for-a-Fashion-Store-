import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from "./manager.navbar.components";
import Title from "./manager.title.components";
import styleManager from "./css/manager-add-style.css"

export default class managerSignIn extends Component{

constructor(props){

  super(props);
    
}


componentDidMount(){
   

        
}

onChangeProductCode(e){

   

}



onSubmit=(e)=>{


    

}




    render(){

        
        return(

            
        
            <div className="manager">
                <header>

                <link rel="stylesheet" href="./css/manager-add-style.css"/>

                </header>
                {/* <Title/>
                <Navbar /> */}
            

            <div class="main">

            <section class="sign-in">
            <div class="container">
                <div class="signin-content">
                    <div class="signin-image">
                        <figure><img src="images/signin-image.jpg" alt="sing up image"/></figure>
                        {/* <a href="#" class="signup-image-link">Create an account</a> */}
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Sign In</h2><br/>
                        <form method="POST" class="register-form" id="login-form">
                            <div class="form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="your_name" id="your_name" placeholder="Your Name"/>
                            </div>
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="your_pass" id="your_pass" placeholder="Password"/>
                            </div>
                            <div class="form-group">
                                <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                {/* <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label> */}
                            </div>
                            <div class="form-group form-button">
                                <input type="submit" name="signin" id="signin" class="form-submit" value="Log in"/>
                            </div>
                        </form>
                        <div class="social-login">
                            {/* <span class="social-label">Or login with</span>
                            <ul class="socials">
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
            
               

        
            </div>
            </div>
        



        )





    }





} 