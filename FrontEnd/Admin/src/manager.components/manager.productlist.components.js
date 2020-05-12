import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from "./manager.navbar.components";
import Title from "./manager.title.components";

export default class productList extends Component{

    render(){

        return(


            <div>
                <Title/>
                <Navbar/>
            <h>This is list</h>

            <Link to="/add-product" className="nav-link"><button className="btn btn-primary"><i class="zmdi zmdi-plus-square">  Add Products</i> <span class="sr-only">(current)</span></button></Link>
            </div>




        )





    }





} 