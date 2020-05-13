import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./manager.navbar.components";
import Title from "./manager.title.components";
import axios from 'axios';


const ProductRow = props => (



    <tr>

        <td>{props.product._id}</td>
        <td>{props.product.productCode}</td>
        <td>{props.product.productName}</td>
        <td>{props.product.quantity}</td>
        <td>{props.product.size}</td>
        <td>
            <Link to={"/edit-product/" + props.product._id}>Edit</Link> | <a href="#" onClick={() => {
                props.deleteProduct(props.product._id)
            }
            }>delete</a>
        </td>



    </tr>
);



export default class productList extends Component {

    constructor(props) {

        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);



        this.onChangeSearch = this.onChangeSearch.bind(this);

        this.state = {

            products: [],
            search: null

        };



    }

    componentDidMount() {
        axios.get('http://localhost:4000/product').then(res => {
            this.setState({

                products: res.data
            })
        }).catch(err => {
            console.log(err);


        })

    }

    deleteProduct(id) {

        axios.delete('http://localhost:4000/product/delete' + id).then(res => console.log(res.data));

        this.setState({

            products: this.state.products.filter(e => e._id !== id)
        })

    }

    productList() {

        return this.state.products.map(productCurrent => {

            return <ProductRow product={productCurrent}
                deleteProduct={this.deleteProduct} key={productCurrent._id} />;

        })
    }

    onChangeSearch(e) {

        this.setState({

            search: e.target.value


        });

    }

    render() {



        return (


            <div>
                <Title />
                <Navbar />





                <div style={{ float: 'right' }}>
                    <Link to="/add-product" className="nav-link"><button className="btn btn-primary"><i class="zmdi zmdi-plus-square">  Add Products</i> <span class="sr-only">(current)</span></button></Link>
                </div>

                <div class="row" style={{ float: 'left', margin: "10px" }}>



                    <div class="form-group">
                        <label for="name"><i class="zmdi zmdi-search"></i></label>
                        <input type="text" name="name" id="productName" placeholder="Search Items" onChange={this.onChangeSearch} value={this.state.search} required />
                    </div>


                    {/* <div class="col-md" style={{width:'22%'}}>
            
                <input placeholder='Search Products...' class='js-search' type="text" /></div> */}

                    {/* <div class="col-md" > */}

                    {/* <Link to="/add-product" className="nav-link"><button className="btn btn-primary" ><i class="zmdi zmdi-plus-square">  Add Products</i> </button></Link></div> */}


                </div>









                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Product ID</th>
                                <th scope="col">Product Code</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Size</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.productList()}
                        </tbody>
                    </table>
                </div>




            </div>

        )





    }





} 