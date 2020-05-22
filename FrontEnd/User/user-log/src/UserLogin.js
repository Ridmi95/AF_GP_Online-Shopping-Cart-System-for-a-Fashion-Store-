import React from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';
import {MDBMask,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBView,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBModalFooter,MDBAlert

} from 'mdbreact';
import axios from 'axios';
import './css/ContactFormPage.css';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import swal from 'sweetalert';
import Navbar from "./Navbar";
import UserSignUp from "./UserSignUp";

class UserSignIn extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            collapseID: '',
            user_token:'',
            usernameValidate: false,
            passwordValidate : false
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword= this.onChangePassword.bind(this);
        this.loginValidate = this.loginValidate.bind(this);

    }

    // componentDidMount() {

    // }


    onChangeUsername(event){
        this.setState({
            username: event.target.value,
            [event.target.name]: event.target.value

        })
    }

    onChangePassword(event){
        this.setState({
            password: event.target.value,
            [event.target.name]: event.target.value
        })
    }

    loginValidate(event){
        event.preventDefault();
        const user = {

            username: this.state.username,
            password: this.state.password,
        }
        console.log("login validate called");
        if(this.state.username !== ''){
            this.setState({
                usernameValidate: false
            })
            if(this.state.password !== ''){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully Logged In',
                    showConfirmButton: false,
                    timer: 1500
                })
                console.log("login validated  !!!!");
                axios.get('http://localhost:4000/loginuser/user-log',user)
                    .then(res => {
                            console.log(res)
                            if (res.data.Message === 'Successful') {
                                Swal.fire(
                                    '',
                                    'Login Successful !.',
                                    'success'
                                );
                                this.setState({
                                    username: '',
                                    password:'',
                                    usernameValidate: false,
                                    passwordValidate:false
                                })
                            } else {
                                Swal.fire(
                                    '',
                                    'Login unsuccessful  !',
                                    'error'
                                )
                            }
                        }
                    );

            }else{
                console.log("password field empty");
                this.setState({
                    passwordValidate: true
                })


            }
        }else{
            console.log("username field empty");
            this.setState({
                usernameValidate: true
            })

        }
    }







    toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ''
        }));

    componentWillUnmount() {
        document.querySelector('nav').style.height = 'auto';
    }

    render() {
        const { colapseID } = this.state;
        const navStyle = { marginTop: '65px' };
        const overlay = (
            <div
                id='sidenav-overlay'
                style={{ backgroundColor: 'transparent' }}
                onClick={this.toggleCollapse('navbarCollapse')}
            />
        );
        return (
            <div id='contactformpage'>

                <Router>
                    <div>
                        {/*{collapseID && overlay}*/}
                        <Navbar/>

                    </div>
                </Router>

                <MDBView>
                    <MDBMask overlay='indigo-strong' />
                    <MDBContainer
                        style={{ height: '100%', width: '100%', paddingTop: '10rem' }}
                        className='d-flex justify-content-center align-items-center'
                    >
                        <MDBRow>
                            <div className='white-text text-center text-md-left col-md-6 mt-xl-5 mb-5'>
                                <h1 className='display-4 font-weight-bold'> Sign In</h1>
                                <hr className='hr-light' />
                                <h6 className='mb-4'>
                                    Log in to purchase a wide range of your desired clothes
                                    and accessories on reasonable prices and attractive discounts
                                </h6>
                            </div>
                            <MDBCol md='6' xl='5' className='mb-4'>
                                <MDBCard>
                                    <MDBCardBody>
                                        <form onSubmit={this.loginValidate}>
                                            <p className="h4 text-center py-4">Login</p>
                                            <div className="grey-text">
                                                <MDBInput
                                                    label="Username"
                                                    icon="user"
                                                    group
                                                    type="text"
                                                    validate
                                                    error="wrong"
                                                    success="right"
                                                    onChange={this.onChangeUsername}
                                                    value={this.state.username}
                                                    name="username"
                                                />
                                                {
                                                    this.state.usernameValidate ?
                                                        <MDBAlert color="danger">
                                                            Username Field Empty
                                                        </MDBAlert> : ''

                                                }
                                                <MDBInput
                                                    label="Password"
                                                    icon="lock"
                                                    group
                                                    type="password"
                                                    validate
                                                    name="password"
                                                    onChange={this.onChangePassword} value={this.state.password}
                                                />
                                                {
                                                    this.state.passwordValidate ?
                                                        <MDBAlert color="danger">
                                                            Password Field Empty
                                                        </MDBAlert> : ''
                                                }
                                            </div>
                                            <div className="text-center py-4 mt-3">
                                                <MDBBtn color="cyan" type="submit"  >
                                                    Login
                                                </MDBBtn>
                                            </div>
                                        </form>
                                        <MDBModalFooter className="mx-5 pt-3 mb-1">
                                            <p className="font-small grey-text d-flex justify-content-end">
                                                Not a member?
                                                <a href="/register" className="blue-text ml-1">
                                                    Sign Up
                                                </a>
                                            </p>
                                        </MDBModalFooter>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    </MDBView>
                <Switch>
                    <Route exact path='/register' component={UserSignUp}/>

                </Switch>
            </div>
        );
    }
}

export default UserSignIn;
