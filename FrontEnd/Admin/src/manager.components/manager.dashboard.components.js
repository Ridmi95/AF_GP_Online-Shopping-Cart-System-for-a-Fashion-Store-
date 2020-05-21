import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './manager.navbar.components';
import Title from './manager.title.components';
import axios from 'axios';
import swal from 'sweetalert';
import { Grid } from '@material-ui/core';
import Swal from 'sweetalert2'
import {Line} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';



function getAvgRating(ratings) {
  const total = ratings.reduce((acc, c) => acc + c, 0);
  if(total){

    const output =parseFloat(total / ratings.length).toFixed(2);


    return output;

  }else
    return 0;
    
}

function searchItems(item){

  return function(e){
    return e.productCode.toLowerCase().includes(item.toLowerCase()) 
        ||e.productName.toLowerCase().includes(item.toLowerCase())||
        
        e.size.toLowerCase().includes(item.toLowerCase()) ||
         !item;
  }
        
}




const ProductRow = props => (

 



  <tr>

    {/* <td>{props.product._id}</td> */}
    <td>{props.product.productCode}</td>
    <td>{props.product.productName}</td>
    <td>{props.product.quantity}</td>
    <td>{props.product.size}</td>
    <td>{getAvgRating(props.product.rating)}</td>
    {/* <td>
      <Link to={'/edit-product/' + props.product._id}>Edit</Link> | <a
        href="#"
        onClick={() => {
          props.deleteProduct(props.product._id) ; console.log('Deleted ID: ',props.product._id)
        }
        }
      >delete</a>
    </td> */}



  </tr>
);



export default class productList extends Component {

  

  constructor(props) {

    super(props);

    this.deleteProduct = this.deleteProduct.bind(this);
    this.validateUser = this.validateUser.bind(this);

    
    

    

    



    this.onChangeSearch = this.onChangeSearch.bind(this);

    this.state = {

      recentproducts: [],
      search: '',
      orders:[],
      totproductList:[],
      Chartdata:{
        labels : ['1','2','3','4','5'],
        datasets:[{
          label:"medium",
          backgroundColor:"rgba(255,0,255,0.75)",
        data:[4,5,1,10,32,2,12]
        }]
      }
      
            

    };



  }

   

  componentDidMount() {

    this.validateUser();

   

    const token = localStorage.getItem('manager_token');

    // recent list

    axios.get('http://localhost:4000/product/recent',{
      headers:
      {
          manager_token :token

      }
  }).then(res => {
      this.setState({

        recentproducts: res.data.data
                
      })
    }).catch(err => {
      console.log(err);


    })

// total List

    axios.get('http://localhost:4000/product/all',{
      headers:
      {
          manager_token :token

      }
  }).then(res => {
      this.setState({

        totproductList: res.data.data
                
      })
    }).catch(err => {
      console.log(err);


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

    axios.delete('http://localhost:4000/product/delete/' + id).then(res => console.log(res.data));

    this.setState({

      recentproducts: this.state.recentproducts.filter(e => e._id !== id),
            
    })

  }



  productList() {

    return this.state.recentproducts.filter(searchItems(this.state.search)).map(productCurrent => {

      return <ProductRow
        deleteProduct={this.deleteProduct}
        key={productCurrent._id}
        product={productCurrent}
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

        


        </header>
        <div style={{padding:"20px"}}>
        <h6 style={{color:"#78909C"}}><i class="fas fa-info-circle"></i>  Store Manager Portal / Dashboard</h6>
        </div>
        <div clss="Managercard">
          <div className="managerStat">
            <div
              className="container "
              style={{padding:'15px'}}
            >
              <div className="row">
                <div className="col-md-3">
                  <div className="card-counter primary">
                    <i className="fas fa-tshirt" />
                    <span className="count-numbers">{this.state.totproductList.length}</span>
                    <span className="count-name">Total Products</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card-counter danger">
                    <i className="fas fa-dollar-sign" />
                    <span className="count-numbers">599</span>
                    <span className="count-name">Purchases</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card-counter success">
                    <i className="fa fa-database" />
                    <span className="count-numbers">6875</span>
                    <span className="count-name">Data</span>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card-counter info">
                    <i className="fa fa-users" />
                    <span className="count-numbers">35</span>
                    <span className="count-name">Users</span>
                  </div>
                </div>
              </div>
            </div>



          </div>
        </div>





        {/* <div >
          <Link
            className="nav-link"
            to="/add-product"
          ><button className="btn btn-primary"><i className="zmdi zmdi-plus-square">  Add Products</i> <span className="sr-only">(current)</span></button></Link>
        </div> */}

        <div
          className="row"
          
        >

          <h4>

            <div className="form-group" style={{padding:"20px"}}>
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




        <div style={{padding:"40px"}}>
         

         <Grid
        container
        spacing={10}
      >
        <Grid
          item
          lg={6}
          sm={6}
          xl={6}
          xs={12}
        > 

<div style={{position:"relative"}} >

  <h3>Sample Chart</h3>

  <Line
  
  options={{
    
    responsive:true
  }}
  data={

      this.state.Chartdata

  }
  
  
  
  
  
  
  />



</div>
           </Grid>




           <Grid
          item
          lg={6}
          sm={6}
          xl={6}
          xs={12}
        > 

<div style={{position:"relative"}} >

  <h3>Sample Chart</h3>

  <Line

  options={{
    responsive:true
  }}
  data={

      this.state.Chartdata

  }
  
  
  
  
  
  
  />



</div>
           </Grid>
          
          
          </Grid> 

          <Grid
        container
        spacing={10}
      >
        <Grid
          item
          lg={6}
          sm={6}
          xl={6}
          xs={12}
        > 



<div style={{position:"relative"}} >

  <h3>Pie Chart</h3>
  <canvas id="myChart"></canvas>
  
  
  
  
  />

  

 </div>




</Grid></Grid>

         

          </div>





        <div style={{padding:"40px"}}>
          <center>

        <Grid
        container
        spacing={10}
      >
        <Grid
          item
          lg={6}
          sm={6}
          xl={6}
          xs={12}
        >
 <div className="container" >
 
 <h1>Latest Products</h1>
   <table className="table" style={{color:"#546E7A"}}>
    
     <thead style={{color:"#3F51B5"}}>
       <tr>
        
         <th scope="col">Product Code</th>
         <th scope="col">Product Name</th>
         <th scope="col">Quantity</th>
         <th scope="col">Size</th>
         <th scope="col">Rating</th>
         
       </tr>
     </thead>
     <tbody>
       {this.productList()}
     </tbody>
   </table>
   </div>
       

</Grid>  

<Grid
          item
          lg={6}
          sm={6}
          xl={6}
          xs={12}
        >
 
 <div className="container" style={{backgroundColor:"#00ACC1" , color:"#FAFAFA"}}>
 
        <h1>Product Summary</h1>
          <table className="table" style={{color:"#FAFAFA"}}>
           
            <thead>
              <tr>
               
                <th scope="col">Product Code</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Size</th>
                <th scope="col">Rating</th>
                
              </tr>
            </thead>
            <tbody>
              {this.productList()}
            </tbody>
          </table>
          </div>
       

</Grid> 
</Grid> 


<Grid
        container
        spacing={10}
      >
        <Grid
          item
          
          lg={6}
          sm={6}
          xl={6}
          xs={12}
        >
 <div className="container" style={{backgroundColor:"#FF7043" , color:"#FBE9E7"}}>
 
 <h1>Product Summary</h1>
   <table className="table" style={{color:"#FBE9E7"}}>
    
     <thead>
       <tr>
        
         <th scope="col">Product Code</th>
         <th scope="col">Product Name</th>
         <th scope="col">Quantity</th>
         <th scope="col">Size</th>
         <th scope="col">Rating</th>
         
       </tr>
     </thead>
     <tbody>
       {this.productList()}
     </tbody>
   </table>
   </div>
      
</Grid>  

<Grid
         item
         lg={6}
         sm={6}
         xl={6}
         xs={12}
        >
 <div className="container" style={{backgroundColor:"#263238" , color:"#CDDC39"}}>
 
        <h1>Product Summary</h1>
          <table className="table" style={{color:"#E6EE9C"}}>
           
            <thead>
              <tr>
               
                <th scope="col">Product Code</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Size</th>
                <th scope="col">Rating</th>
                
              </tr>
            </thead>
            <tbody>
              {this.productList()}
            </tbody>
          </table>
          </div>
  

</Grid> 
</Grid>





</center>




</div>


</div>
    )





  }





} 
