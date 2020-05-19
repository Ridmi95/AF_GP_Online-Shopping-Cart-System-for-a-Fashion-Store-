import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from "./manager.navbar.components";
import Title from "./manager.title.components";
import styleManager from "./css/manager-add-style.css";
import swal from 'sweetalert';
import Swal from 'sweetalert2';

export default class addproducts extends Component{

constructor(props){

    super(props);

    this.onChangeCategoryName=this.onChangeCategoryName.bind(this)
    this.onChangeColor=this.onChangeColor.bind(this)
    this.onChangeDiscount=this.onChangeDiscount.bind(this)
    this.onChangeDiscription=this.onChangeDiscription.bind(this)
    this.onChangePrice=this.onChangePrice.bind(this)
    this.onChangeProductCode=this.onChangeProductCode.bind(this)
    this.onChangeProductName=this.onChangeProductName.bind(this)
    this.onChangeQuantity=this.onChangeQuantity.bind(this)
    this.onChangeSize=this.onChangeSize.bind(this)

    this.validateUser=this.validateUser.bind(this)
    

    this.state = {

        productCode:'',
        categoryName:'',
        productName:'',
        price:null,
        color:'',
        size:'',
        quantity:null,
        discount:null,
        description:'',
        rating:[],
        comment:[],
        categories:[]

    }
}


componentDidMount(){

    this.validateUser();


    
    const token = localStorage.getItem('manager_token');

    axios.get('http://localhost:4000/category/getall',{
        headers:
        {
            manager_token :token

        }
    }).then(res =>{

        if(res.data.length>0){
            this.setState({

                categories: res.data.map(category=> category.category_name),


            })


        }


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

onChangeProductCode(e){

    this.setState({

        productCode:e.target.value


    });

}

onChangeCategoryName(e){

    this.setState({

        categoryName:e.target.value


    });

}

onChangeProductName(e){

    this.setState({

        productName:e.target.value


    });

}


onChangePrice(e){

    this.setState({

        price:e.target.value


    });

}

onChangeColor(e){

    this.setState({

        color:e.target.value


    });

}
onChangeSize(e){

    this.setState({

        size:e.target.value


    });

}
onChangeQuantity(e){

    this.setState({

        quantity:e.target.value


    });

}
onChangeDiscount(e){

    this.setState({

        discount:e.target.value


    });

}
onChangeDiscription(e){

    this.setState({

        description:e.target.value


    });

}

onSubmit=(e)=>{

    e.preventDefault();

    const product ={

        productCode: this.state.productCode,
        categoryName:this.state.categoryName,
        productName:this.state.productName,
        price:this.state.price,
        color:this.state.color,
        size:this.state.size,
        quantity:this.state.quantity,
        discount:this.state.discount,
        description:this.state.description,
        rating:this.state.rating,
        comment:this.state.comment,
       



    }
    const token = localStorage.getItem('manager_token');

    axios.post('http://localhost:4000/product/add',product,{
        headers:
        {
            manager_token :token

        }
    }).then((res)=>{

        if(res.data.warn){

            
            swal({
                title: "Failed",
                text: res.data.warn,
                icon: "error",
                // buttons: true,
                dangerMode: true,
              })

        }else{

        swal({
            title: "Successful",
            text: "Product Added Successfully!",
            icon: "success",
            button: "Continue",
          });
        }

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


            // 
            axios.get('http://localhost:4000/login/manager-token-validate', {
    
      headers:
    {    
      // Authorization : ` bearer $(token) ` 
      
      manager_token :token

    } }
    ).then((res)=> {
          swal({
                title: "Failed",
                text: "Information format is Unsupported",
                icon: "error",
                // buttons: true,
                dangerMode: true,
              })

        

 
        }
    
    
       
       ).catch((err)=>{

       

          
          
               
            Swal.fire({
              position: 'bottom-end',
              icon: 'error',
              title: 'Session Has Expired',
              html:
              '<h4>Last Session Details</h4><br/><b>User ID :</b> '+ localStorage.getItem("id") +'<br/>'+
              'Please Log In again and come back to this page to Continue. <br/><a class="btn btn-success" href="http://localhost:3000/manager-Sign-In/" target="_blank">Log In Here</a>',
              showConfirmButton: false,
              timer: 10000,
              backdrop: `
              rgba(255,0,0,0.4)`
              })
  
          
      
          
    });


            // 

            // swal({
            //     title: "Failed",
            //     text: "Information format is Unsupported",
            //     icon: "error",
            //     // buttons: true,
            //     dangerMode: true,
            //   })

            
            
            // console.log("the token value is :" , token);
                
            // Swal.fire({
            //   position: 'bottom-end',
            //   icon: 'error',
            //   title: 'Session Has Expired',
            //   html:
            //   '<h4>Last Session Details</h4><br/><b>User ID :</b> '+ localStorage.getItem("id") +'<br/>'+
            //   'Please Log In again and come back to this page to Continue. <br/><a class="btn btn-success" href="http://localhost:3000/manager-Sign-In/" target="_blank">Log In Here</a>',
            //   showConfirmButton: false,
            //   timer: 10000})
  
              
            
            
        }
        
    
    });

   

    console.log("Product is: ",product.productCode);
    console.log("Product is: ",product.categoryName);
    console.log("Product is: ",product.productName);
    console.log("Product is: ",product.color);
    console.log("Product is: ",product.price);
    console.log("Product is: ",product.quantity);
    console.log("Product is: ",product.discount);
    console.log("Product is: ",product.description);
    console.log("Product is: ",product.rating);
    console.log("Product is: ",product.comment);
    console.log("Product is cat: ",product.categories);

    

}




    render(){

        
        return(

            
        
            <div className="manager">
                <header>

                <link rel="stylesheet" href="./css/manager-add-style.css"/>

                </header>
                <Title/>
                <Navbar />

                <div style={{padding:"20px"}}>
        <h6 style={{color:"#78909C"}}><i class="fas fa-info-circle"></i>  Store Manager Portal / Products / Add Product</h6>
        </div>
            

            <div class="main">
            
               

        
        <section class="signup">
            <div class="container">
                <div class="signup-content">
                    <div class="signup-form">
                        <h2 class="form-title">Add Product</h2>
                        <form  class="register-form" onSubmit={this.onSubmit}>
{/* product code */}
                        <div class="form-group">
                                <label for="code"><i class="zmdi zmdi-tag-more"></i></label>
                                <input type="text" onChange={this.onChangeProductCode} value={this.state.productCode} required name="code" id="productCode" placeholder="Product Code"/>
                            </div>
{/* product name */}
                            <div class="form-group">
                                <label for="name"><i class="zmdi zmdi-info-outline"></i></label>
                                <input type="text" name="name" id="productName" placeholder="Product Name" onChange={this.onChangeProductName} value={this.state.productName} required/>
                            </div>

{/* category */}
                            <div class="form-group">
                            <i class="zmdi zmdi-info-outline"></i>  Category
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <label class="input-group-text" for="categoryName"></label>
                                    </div>
                                    <select ref="ctegoryInput" class="custom-select" id="categoryName"
                                    value={this.state.categoryName}
                                    onChange={this.onChangeCategoryName}
                                    
                                    >
                                         <option value="">Choose a Category</option>
                                        
                                        
                                        
                                
                                        {
                                            this.state.categories.map(category=>{return              <option value={category}>{category}</option>;

                                            })


                                             

                                        }
                                        
                                    </select>
                                </div>
                            </div>
{/* price */}
                            <div class="form-group">
                                <label for="price"><i class="zmdi zmdi-info-outline"></i></label>
                                <input type="text" name="name" id="price" placeholder="Product Price" onChange={this.onChangePrice} value={this.state.price} required/>
                            </div>
{/* color */}
                            <div class="form-group">
                                <label for="color"><i class="zmdi zmdi-info-outline"></i></label>
                                <input type="text" name="name" id="color" placeholder="Product Color" onChange={this.onChangeColor} value={this.state.color} required/>
                            </div>
 {/* size */}
                            <div class="form-group">
                                <label for="size"><i class="zmdi zmdi-info-outline"></i></label>
                                <input type="text" name="size" id="productName" placeholder="Product Size" onChange={this.onChangeSize} value={this.state.size} required/>
                            </div>
{/* quantity */}
                            <div class="form-group">
                                <label for="quantity"><i class="zmdi zmdi-info-outline"></i></label>
                                <input type="text" name="name" id="quantity" placeholder="Product Quantity" onChange={this.onChangeQuantity} value={this.state.quantity} required/>
                            </div>

                            {/* discount */}
                            <div class="form-group">
                                <label for="discount"><i class="zmdi zmdi-info-outline"></i></label>
                                <input type="text" name="name" id="discount" placeholder="Product Discount Percentage" onChange={this.onChangeDiscount} value={this.state.discount}/>
                            </div>

                            {/* discription */}
                            <div class="form-group">
                                <label for="discription"><i class="zmdi zmdi-info-outline"></i></label>
                                <input type="text" name="name" id="discription" placeholder="Product Discription" onChange={this.onChangeDiscription} value={this.state.description} required/> 
                            </div>
                            
                           
                           
                            <div class="form-group form-button">
                                <input type="submit" name="signup" id="signup" class="form-submit" value="Add"/>

                                
                            </div>
                            
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure>
                            <img src="images/signup-image.jpg" alt="sing up image"/>
                            
                                
                            </figure>
                            <Link to="/dashboard-manager"><button class="btn btn-outline-danger">Cancel</button></Link>
                       
                    </div>
                    
                </div>
                
            </div>
            </section>
            </div>
            </div>
        



        )





    }





} 