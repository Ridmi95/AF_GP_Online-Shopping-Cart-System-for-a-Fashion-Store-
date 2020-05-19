import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

export default class Navbar extends Component {

  constructor(props) {

    super(props);
    this.logout = this.logout.bind(this);
    this.showProfile = this.showProfile.bind(this);

  }


  logout() {

    localStorage.setItem('manager_token', null);

    localStorage.setItem('username', null);
    localStorage.setItem('id', null);
    localStorage.setItem('email', null);

    const token = localStorage.getItem('manager_token');

    console.log("Logout method called : Token is : ", token);




  }

  showProfile(){
    Swal.fire({
      title: '<strong>Profile Details</strong>',
      icon: 'info',
      html:
        '<b>User ID :</b> '+ localStorage.getItem("id") +'<br/>'+
        '<b>Username :</b> '+ localStorage.getItem("username") +'<br/>'+
        '<b>Email :</b> '+ localStorage.getItem("email") +'<br/>'+'',
        
      showCloseButton: true,
      
      focusConfirm: false,
      confirmButtonText:
        '<i class="fas fa-check-circle"></i> OK',
     
      
    })
  }

  render() {

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a
          className="navbar-brand"
          href="#"
        > <h2>Store Manager          | {localStorage.getItem("username")}   </h2></a>
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
              ><h4 style={{paddingLeft:"50px"}}><i className="zmdi zmdi-balance"> </i> Dashboard    </h4> <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item active">
              <Link
                className="nav-link"
                to="/product-List"
              ><h4 style={{color:"#0277BD", paddingLeft:"50px"}}>   <i class="zmdi zmdi-shopping-basket"></i> Products     </h4> <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/manager/purchases"
              ><h4 style={{paddingLeft:"50px"}}>  <i className="zmdi zmdi-shopping-cart" /> Purchases   </h4></Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
              />
            </li>

            <li  style={{paddingLeft:"10%"}} className="nav-item dropdown">


              <a
                aria-expanded="false"
                aria-haspopup="true"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                id="navbarDropdownMenuLink"
              >
                <text style={{ fontSize: '16px', color:"#F9A825" }}> <i className="zmdi zmdi-settings" /><b> Settings</b> </text>
              </a>

              <div
                aria-labelledby="navbarDropdownMenuLink"
                className="dropdown-menu"
              >

              <Link
                  className="nav-link"
                  onClick={this.showProfile}  >
                <a a style={{ color: "#2196F3" }}
                  className="dropdown-item"
                  
                ><i className="fas fa-user-circle" /> Profile</a></Link>
                <Link
                  className="nav-link"
                  onClick={this.logout} to="/manager-Sign-In/" >
                  
                    <a style={{ color: "#F44336" }}
                      className="dropdown-item"
                      href="#"
                    >
                      <i className="fas fa-sign-out-alt" /> Log Out</a>
                    
                    </Link>

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
