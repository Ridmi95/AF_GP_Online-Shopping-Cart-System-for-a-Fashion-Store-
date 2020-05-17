import React, {Component} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Navbar from "./manager.navbar.components";
import Title from "./manager.title.components";
import styleManager from "./css/manager-add-style.css"


export default class managerSignIn extends Component{

    

constructor(props){

  super(props);

  

  

  this.onChangeUsername=this.onChangeUsername.bind(this);
  this.onChangePassoword=this.onChangePassoword.bind(this);
  this.onSubmit=this.onSubmit.bind(this);

  this.state = {

    username:'',
    password:'',
    manager_token:''
   

}
    
}


componentDidMount(){
   

        
}

onChangeUsername(e){
    this.setState({

        username:e.target.value


    });

   

}

onChangePassoword(e){
    this.setState({

        password:e.target.value


    });
   

}



onSubmit=(e)=>{

    e.preventDefault();

    const manager ={

        username: this.state.username,
        password:this.state.password,
        
       



    }

   const response = axios.post('http://localhost:4000/login/manager-login',manager).then(
       (res)=> {

        const token = res.data.token;
       localStorage.setItem('manager_token',token )
       

       if(token){
        this.props.history.push('/dashboard-manager/');

    }

       
    //    alert('Successfuly Loged In')

        }
    
    
       
       ).catch(err=>alert('Error Occured. Please Try Again'));

   






   
   
   



    

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
                        <figure><img src="http://localhost:3000/images/signin-image.jpg" alt="sing up image"/></figure>
                        {/* <a href="#" class="signup-image-link">Create an account</a> */}
                    </div>

                    <div class="signin-form">
                        <h2 class="form-title">Sign In</h2><br/>
                        <form onSubmit={this.onSubmit} class="register-form" id="login-form">
                            <div class="form-group">
                                <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" name="your_name" id="your_name" placeholder="Your Name"
                                onChange={this.onChangeUsername} value={this.state.username}
                                />
                            </div>
                            <div class="form-group">
                                <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                <input type="password" name="your_pass" id="your_pass" placeholder="Password"
                                onChange={this.onChangePassoword} value={this.state.password}/>
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