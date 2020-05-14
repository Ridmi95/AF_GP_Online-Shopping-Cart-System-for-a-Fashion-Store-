import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component{

    render(){

        return(
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#"> <h2>Store Manager          |   </h2></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <Link to="/dashboard-manager" className="nav-link"><h4><i class="zmdi zmdi-balance"> </i> Dashboard</h4> <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
      <Link to="/manager/purchases" className="nav-link"><h4><i class="zmdi zmdi-shopping-cart"></i> Purchases</h4></Link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#"></a>
      </li>
      
      <li  class="nav-item dropdown">
     
      
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <text style={{fontSize:'16px'}}> <i class="zmdi zmdi-settings"></i><b> Settings</b> </text>
        </a>
        
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" >
          <a class="dropdown-item" href="#">Log Out</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
</nav>








        )





    }





} 