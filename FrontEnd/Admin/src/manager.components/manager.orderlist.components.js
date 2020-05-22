import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './manager.navbar.components';
import Title from './manager.title.components';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2'



function getAvgRating(ratings) {
  const total = ratings.reduce((acc, c) => acc + c, 0);
  if(total){

    const output =parseFloat(total / ratings.length).toFixed(2);


    return output;

  }else
    return 0;
    
}


function getTotProducts(items) {

  var total=0;
  
  for (let index = 0; index < items.length; index++) {
    total = total + items[index].quantity;
    
  }

  




  if(total){



    return total;

  }else
    return 0;
    
}


function getTotRevenue(items) {

  var total=0;
  
  for (let index = 0; index < items.length; index++) {
    total = total + items[index].totalPrice;
    
  }

  




  if(total){



    return total;

  }else
    return 0;
    
}

function searchItems(item){

  return function(e){
    return e.orderId.toLowerCase().includes(item.toLowerCase()) 
        ||e.orderDate.toLowerCase().includes(item.toLowerCase())||
        e.paymentMethod.toLowerCase().includes(item.toLowerCase())||
        
        e.userId.toLowerCase().includes(item.toLowerCase()) ||
         !item;
  }
        
}

const ProductRow = props => (



  <tr>

    <td>{props.order.orderId}</td>
    <td>{props.order.userId}</td>
   
    
    <td>{props.order.orderDate.substring(0,10)}</td>
    <td>{props.order.paymentMethod}</td>
    <td>{(props.order.totalPrice)}</td>
    



  </tr>
);



export default class orderList extends Component {

  constructor(props) {

    super(props);

    this.deleteProduct = this.deleteProduct.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.getAllOrders = this.getAllOrders.bind(this);
    

    

    



    this.onChangeSearch = this.onChangeSearch.bind(this);

    this.state = {

      products: [],
      search: '',
      orders:[],
      
            

    };



  }

  getAllOrders(){
    const token = localStorage.getItem('manager_token');
    axios.get('http://localhost:4000/order/',{
      headers:
      {
          manager_token :token

      }
  }).then(res => {
      this.setState({

        orders: res.data.data
                
      })
    }).catch(err => {
      console.log(err);


    })
   }

   

  componentDidMount() {

    this.validateUser();
    this.getAllOrders();

   

    const token = localStorage.getItem('manager_token');

    axios.get('http://localhost:4000/product/all',{
      headers:
      {
          manager_token :token

      }
  }).then(res => {
      this.setState({

        products: res.data.data
                
      })
    }).catch(err => {
      console.log("Error Occured",err);


    })

  }

  validateUser(){

    
    const token = localStorage.getItem('manager_token');
    axios.get('http://localhost:4000/login/manager-token-validate', {
    
      headers:
    {    
      // Authorization : ` bearer $(token) ` 
      
      manager_token :token

    } }
    ).then((res)=> {
      

        console.log("Validation Response: " , res.data);

 
        }
    
    
       
       ).catch((err)=>{

        if(token==="null"){

          console.log("Token is null Box called");
          
          swal({
            title: "Unauthorized Access",
            text: "You have to Log-In First!",
            icon: "error",
            button: "ok",
          });
         
          this.props.history.push('/manager-Sign-In/');
        }
           
      else{

          
          
          console.log("the token value is :" , token);
              
          Swal.fire({
            position: 'bottom-end',
            icon: 'error',
            title: 'Session Has Expired',
            html:
            '<h4>Last Session Details</h4><br/><b>User ID :</b> '+ localStorage.getItem("id") +'<br/>'+
            '<b>User Name :</b> '+ localStorage.getItem("username") +'<br/><br/>',
            showConfirmButton: false,
            timer: 4000})

            this.props.history.push('/manager-Sign-In/');
          
          
      }
          
    });

    

    

    

      
      
    

  }

  deleteProduct(id) {

    swal({
      title: "Are you sure?",
      text: "Once you deleted this product, you will not be able to recover this Product details and all the details will be deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((stat) => {
      if (stat) {


        // 

        const token = localStorage.getItem('manager_token');
    axios.delete('http://localhost:4000/product/delete/' + id,
    {
      headers:
      {
          manager_token :token

      }
  }).then(
    (res) =>

    {
    
    this.setState({

      products: this.state.products.filter(e => e._id !== id),
      
    
    }
    
    );
    swal("File Deleted Permenently!", {
      icon: "success",
    });

    
            
    }).catch((err)=>{

      if(token=="null"){
        swal({
          title: "Unauthorized Access",
          text: "You have to Log-In First!",
          icon: "error",
          button: "ok",
        });
       
        this.props.history.push('/manager-Sign-In/');

      }else{

      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Session Has Expired',
        showConfirmButton: false,
        timer: 3000
      })

      this.props.history.push('/manager-Sign-In/');
    }


    })


        // 

        // swal("File Deleted Permenently!", {
        //   icon: "success",
        // });
      } else {
        swal("Product Deletion Terminated!");
      }
    });

  //   const token = localStorage.getItem('manager_token');
  //   axios.delete('http://localhost:4000/product/delete/' + id,
  //   {
  //     headers:
  //     {
  //         manager_token :token

  //     }
  // }).then(res => console.log(res.data));

  //   this.setState({

  //     products: this.state.products.filter(e => e._id !== id),
            
  //   })

  }



  OderList() {

    return this.state.orders.filter(searchItems(this.state.search)).map(orderCurrent => {

      return <ProductRow
        deleteProduct={this.deleteProduct}
        key={orderCurrent._id}
        order={orderCurrent}
             />;

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
        <header>

        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" rel="stylesheet"/>

        </header>

        <div style={{padding:"20px"}}>
        <h6 style={{color:"#78909C"}}><i class="fas fa-info-circle"></i>  Store Manager Portal / Products</h6>
        </div>

        <div clss="Managercard" id="tab-cards">
          <div className="managerStat">
            <div
              className="container "
              style={{padding:'25px'}}
            >
              <div className="row">
                <div className="col-md-3">
                  <div className="card-counter primary">
                    <i className="fas fa-tshirt" />
                    <span className="count-numbers">{this.state.products.length}</span>
                    <span className="count-name"> Products Types</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div  className="card-counter danger">
                    <i className="fas fa-dollar-sign" />
                    <span className="count-numbers" style={{fontSize:"20px"}}>Rs. {getTotRevenue(this.state.orders)}</span>
                    <span className="count-name"> Total Revenue</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card-counter success">
                  <i class="fas fa-store"/>
    <span className="count-numbers">{getTotProducts(this.state.products)}</span>
                    <span className="count-name"> Total Products</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card-counter info">
                    <i className="fa fa-users" />
                    <span className="count-numbers">35</span>
                    <span className="count-name"> Users</span>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>




        
        
<br/><br/>
        <div
          className="row"
          
        >

          <h4>

            <div className="form-group" style={{marginLeft:"20px"}}>
              <label htmlFor="name"><i
                className="zmdi zmdi-search"
                style={{paddingRight:'20px', paddingLeft:'10px'}}
              >  </i> </label>
              <input
                id="productName"
                name="name"
                onChange={this.onChangeSearch}
                placeholder="Search Items"
                required
                type="text"
                value={this.state.search}
              />
            </div></h4>


          {/* <div class="col-md" style={{width:'22%'}}>
            
                <input placeholder='Search Products...' class='js-search' type="text" /></div> */}

          {/* <div class="col-md" > */}

          {/* <Link to="/add-product" className="nav-link"><button className="btn btn-primary" ><i class="zmdi zmdi-plus-square">  Add Products</i> </button></Link></div> */}


        </div>









        <div style={{marginLeft:'30px'}} id="tab1">
  
   
        
        <h1 style={{fontFamily:"'DM Serif Display"}}>Purchase Details</h1>
          <table className="table" >
           
            <thead style={{color:"#3949AB"}}>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">User ID</th>
                <th scope="col">Purchase Date</th>
                <th scope="col">Payment Method</th>
                <th scope="col">Total Price</th>
                
                

 
              </tr>
            </thead>
            <tbody>
              {this.OderList()}
            </tbody>
          </table>
        </div><div id="tab2"></div><div id="tab3"></div><div id="tab4"></div><div id="profile"></div><div id="avoid1"></div><div id="avoid2"></div>


      



        </div>
        



       
    


       



        




    )





  }





} 
