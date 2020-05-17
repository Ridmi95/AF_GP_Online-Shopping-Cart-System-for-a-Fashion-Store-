import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component{

  constructor(props){

    super(props);
    this.logout=this.logout.bind(this);
  
  }


  logout(){

    localStorage.setItem('manager_token',"false");

    const token=localStorage.getItem('manager_token');

    console.log("Logout method called : Token is : " , token );
      
    


  }

  render(){

    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a
          className="navbar-brand"
          href="#"
        > <h2>Store Manager          |   </h2></a>
        <button
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-target="#navbarNavDropdown"
          data-toggle="collapse"
          type="button"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link
                className="nav-link"
                to="/dashboard-manager"
              ><h4><i className="zmdi zmdi-balance"> </i> Dashboard</h4> <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/manager/purchases"
              ><h4><i className="zmdi zmdi-shopping-cart" /> Purchases</h4></Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
              />
            </li>
      
            <li  className="nav-item dropdown">
     
      
              <a
                aria-expanded="false"
                aria-haspopup="true"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                id="navbarDropdownMenuLink"
              >
                <text style={{fontSize:'16px'}}> <i className="zmdi zmdi-settings" /><b> Settings</b> </text>
              </a>
        
              <div
                aria-labelledby="navbarDropdownMenuLink"
                className="dropdown-menu"
              >
                <a
                  className="dropdown-item"
                  href="#"
                ><i className="fas fa-user-circle" /> Profile</a>
               <Link
                className="nav-link"
                onClick={this.logout} to="/manager-Sign-In/" > <span ><a
                  className="dropdown-item"
                  href="#"
                > <i className="fas fa-sign-out-alt" /> Log Out</a></span></Link>
          
                <a
                  className="dropdown-item"
                  href="#"
                >Something else here</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>








    )





  }





} 
