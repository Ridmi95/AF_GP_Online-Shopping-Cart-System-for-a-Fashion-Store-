import React, {Component} from 'react';
import {Bar , Line , Pie} from 'react-chartjs-2';
import axios from 'axios';

var LabelArray = [];
var DataArray =[];

class Chart extends Component{

    constructor(props){
        super(props);


        this.getAllActiveCategories = this.getAllActiveCategories.bind(this);
        this.getProductsCountByCategory = this.getProductsCountByCategory.bind(this);

        this.state={
            
            categoryArray:[],
            productArray:[],
              productCount:[],
              labels:[],
              data:[],
              Chartdata: {
                labels: ['1', '2', '1', '3', '2', '3', '4', '5'],
                datasets: [{
                  label: "medium",
                  backgroundColor: "rgba(255,0,255,0.75)",
                  data: [4, 5, 1, 10, 32, 2, 12]
                }]
              }
        }
    }

   async getAllActiveCategories() {

        const token = localStorage.getItem('manager_token');
    
      await  axios.get('http://localhost:4000/category/getall', {
          headers:
          {
            manager_token: token
    
          }
        }).then(res => {
          this.setState({
    
            categoryArray: res.data


    
          })

          for (let index = 0; index < this.state.categoryArray.length; index++) {
              
            this.state.labels.push(this.state.categoryArray[index].category_name);
            LabelArray[index]=(this.state.categoryArray[index].category_name).toString();
              
          
         

        }
        console.log("labels are :" ,this.state.labels);

        this.getProductsCountByCategory();
          
          
        }).catch(err => {
          console.log(err);
    
    
        })
    
      }

      getProductsCountByCategory(){


        for (let index = 0; index < this.state.labels.length; index++) {

            let key = this.state.labels[index];

           const token = localStorage.getItem('manager_token');
        axios.get('http://localhost:4000/product/ByCategory/' + key, {
            headers:
            {
                manager_token: token

            }
        }).then(res => {

            this.setState({
    
                productArray: res.data.data
    
    
        
              })

              console.log("Product array of "+key+" is ", this.state.productArray);

              console.log("index is: " , index);
              
              this.state.data.push(this.state.productArray.length);
              DataArray[index]=this.state.productArray.length;

            
            
            

            

            
        }).catch(err => {
            console.log(err);


        })
            
        }

        
        
          
      }
      componentDidMount() {
        this.getAllActiveCategories();
        console.log("Data Array VAr: ", DataArray);
        console.log("Label Array VAr len: ", LabelArray.length);
        console.log("Label Array VAr : ", LabelArray);
        

        this.setState({
    
            Chartdata:{
                labels: LabelArray,
                datasets: [{
                  label: "Categories",
                  backgroundColor:[ "#FFCA28","#FFAB91",'#C62828','#4DD0E1','#81C784','#BDBDBD','#7E57C2','#A5D6A7','#AD1457','#FFAB91','#EF5350','#D84315','#81D4FA','#BCAAA4','#81D4FA','#FFE082','#A5D6A7','#E1BEE7','#FFE0B2','#EF6C00','#EF9A9A','#FFF176','#FFCA28','#263238','#4A148C','#6A1B9A','#01579B','#B71C1C','#4A148C','#D84315','#EF5350','','#283593','#E65100','#42A5F5','#F57F17','#4DD0E1','#37474F','#01579B',],
                  data: DataArray
                }]
              }


    
          })

        
       
        
        

      }

    render(){

        return(
            <div className="chart" >

                <Bar


                
                data ={this.state.Chartdata}
                   
                // width={}
                // height={}
                options={{legend:{position:"bottom"}}}
                
                
                />


            </div>
        )
    }



}
export default Chart;