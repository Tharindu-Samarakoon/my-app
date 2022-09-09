import React, { Component} from 'react'
import axios from 'axios'
import { Link,useParams } from 'react-router-dom';

export default class AddLab_c extends Component {

    constructor(props){
        super(props);
        this.state={
            name:"",
            id:"",
            phone:"",
            age:"",
            gender:"",
            date:"",
            labTest:"",
            labNo:"",
            technologist:"",
            status:"",
            nameError:"",
            idError:"",
            phoneError:"",
            ageError:"",
            dateError:"",
            labTestError:"",
            labNoError:"",
            technologistError:"",
            statusError:""

        }
    }

    // handle input changes
    handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }


    // validate input fields
    validate = () =>{

        let nameError="";
        let idError="";
        let phoneError="";
        let ageError="";
        let dateError="";
        let labTestError="";
        let labNoError="";
        let technologistError="";
        let statusError="";

  
        if(!this.state.name){
          nameError = 'Please Fill the name field'
        }

        if(!this.state.id){
            idError = 'Please Fill the id field '
          }

        var phone= /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(!this.state.phone.match(phone)){
            phoneError='Phone Number is Required and Fill Correct Number Format';
        }

        if(!this.state.age){
            ageError = 'Please Fill the age field'
          }

        if(!this.state.date){
            dateError = 'Please Fill the date field '
          }

        if(!this.state.labTest){
            labTestError = 'Please Fill the test field '
          }
        
        if(!this.state.labNo){
            labNoError = 'Please Fill the lab no field'
        }

        if(!this.state.technologist){
            technologistError = 'Please fill the technologist field'
        }

        if(!this.state.status){
            statusError = 'Please select the status'
        }

        if(nameError||idError||phoneError||ageError|| dateError||labTestError||labNoError||technologistError||statusError){
            this.setState({nameError,idError,phoneError,ageError,dateError,labTestError,labNoError,technologistError,statusError});
            return false;
          }
          

        return true;

        };


    // add form data into database 
    onSubmit = (e) =>{
        e.preventDefault();

        const isValid = this.validate();

        const{name,id,phone,age,gender,date,labTest,labNo,technologist,status} = this.state;

        const data = {
            name:name,
            id:id,
            phone:phone,
            age:age,
            gender:gender,
            date:date,
            labTest:labTest,
            labNo:labNo,
            technologist:technologist,
            status:status
            

        }

        if(isValid){
            console.log(data)

        axios.post("http://localhost:8070/save",data).then((res)=>{

            alert("Successfully Inserted The Lab Test");
            
            if(res.data.success){
                this.setState(
                    {
                        name:"",
                        id:"",
                        phone:"",
                        age:"",
                        gender:"",
                        date:"",
                        labTest:"",
                        labNo:"",
                        technologist:"",
                        status:"",
                        nameError:"",
                        idError:"",
                        phoneError:"",
                        ageError:"",
                        dateError:"",
                        labTestError:"",
                        labNoError:"",
                        technologistError:"",
                        statusError:""

                    }
                )
                }
        })

    }   

    }

    // disable the previous dates in calender 
    datelimit = () =>{
       var todayDate = new Date();
       var month = todayDate.getMonth() + 1;
       var year = todayDate.getUTCFullYear();
       var tdate = todayDate.getDate();

       if (month < 10){
           month = "0" + month
       }
       if (tdate < 10){
           tdate = "0" + tdate
       }
         var minDate = year + "-" + month + "-" + tdate;
        document.getElementById("demo").setAttribute("min",minDate);
        console.log(minDate);
   }

    render(){
        return(
            <div  style={{backgroundImage:"url(http://localhost:3000/labImage/bglab1.jpg)",
            backgroundSize:'cover',
            height:'1300px',
            backgroundRepeat:'no-repeat', 
            backgroundSize:'cover',
            backgroundPosition:'center',
            backgroundAttachment:'fixed'
            }} >
            <div>
            <br></br>

            <Link to="/labs" className="results">
            <button className="btn btn-primary" style={{marginLeft:890,marginBottom:20}}><i class="fas fa-list"></i>&nbsp;View All Lab Tests</button>  
            </Link>
            
            <div className='container' align='center'>
            <form className="formc" >
                <div className='form-group' style={{marginBottom:'15px'}}>
                <h1 className='h3 mb-3 font-weight-normal'style={{textAlign:"center"}}>Request Laboratory Test</h1>
                <hr></hr>
                
                    <label style={{marginBottom:'5px',fontWeight: 'bold'}}>Patient Name </label>
                    <label style={{color:"red"}}> &nbsp;* </label>
                    <input type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter Patient Name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    required/>

                    <div style={{fontSize:12 ,color:"red"}}>       
                           {this.state.nameError}
                    </div>
                </div>
                
                <div className='form-group' style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight: 'bold'}}>Patient ID</label> 
                    <label style={{color:"red"}}> &nbsp;* </label>
                    <input type="number"
                    className="form-control"
                    name="id"
                    placeholder="Enter Patient ID"
                    value={this.state.id}
                    onChange={this.handleInputChange}
                    required/>

                    <div style={{fontSize:12 ,color:"red"}}>       
                           {this.state.idError}
                    </div>
                </div>



                <div className='form-group' style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight: 'bold'}}>Phone</label> 
                    <label style={{color:"red"}}> &nbsp;* </label>
                    <input type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Enter Phone Number (Eg: 076 9898948) "
                    value={this.state.phone}
                    onChange={this.handleInputChange}
                    required/>

                    <div style={{fontSize:12 ,color:"red"}}>       
                           {this.state.phoneError}
                    </div>
                </div>

               

                <div className='form-group' style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight: 'bold'}}>Age</label>
                    <label style={{color:"red"}}> &nbsp;* </label>
                    <input type="number"
                    className="form-control"
                    name="age"
                    placeholder="Enter Patient Age"
                    value={this.state.age}
                    onChange={this.handleInputChange}
                    required/>
                    <div style={{fontSize:12 ,color:"red"}}>       
                           {this.state.ageError}
                           </div>
                </div>

               

                <div className='form-group' style={{marginBottom:'15px'}}
                     value={this.state.gender}
                    onChange={this.handleInputChange}>
                        <label style={{marginBottom:'5px',fontWeight: 'bold'}}>Gender</label>
                        <label style={{color:"red"}}> &nbsp;* </label>
                        <br></br>
                        <input type="radio" value="Male" name="gender" checked/> Male &nbsp; &nbsp;
                        <input type="radio" value="Female" name="gender" /> Female
                   
                </div>

                

                <div className='form-group' style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight: 'bold'}}>Date</label> 
                    <label style={{color:"red"}}> &nbsp;* </label>
                    <input type="date"
                    className="form-control"
                    name="date"
                    id="demo"
                    placeholder="Enter Date"
                    value={this.state.date}
                    onSelect={this.datelimit}
                    onChange={this.handleInputChange}
                    required/>
                    <div style={{fontSize:12 ,color:"red"}}>       
                           {this.state.dateError}
                    </div>
                </div>

                

                <div className='form-group' style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight: 'bold'}}>Laboratory Test</label> 
                    <label style={{color:"red"}}> &nbsp;* </label>
                    <select class="form-select" name="labTest"
                    placeholder=" Select   "
                    value={this.state.labTest}
                    onChange={this.handleInputChange}
                    required>

                    <option> Select </option>
                    <option> Blood Suger </option>
                    <option> Covid-19 Antigen</option>
                    <option> Covid-19 PCR </option>
                    <option> Dengue Antigen </option>
                    <option> Full Blood Count </option>
                    
                    </select>

                    <div style={{fontSize:12 ,color:"red"}}>       
                           {this.state.labTestError}
                    </div>
                </div>

                

                <div className='form-group' style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight: 'bold'}}>Laboratory No</label>
                    <label style={{color:"red"}}> &nbsp;* </label>
                    <select class="form-select" name="labNo"
                         placeholder=" Select   "
                         value={this.state.labNo}
                         onChange={this.handleInputChange}>
                                <option> Select </option>
                                <option> 1 </option>
                                <option> 2</option>
                                <option> 3 </option>
                                <option> 4 </option>

                    </select>
                    <div style={{fontSize:12 ,color:"red"}}>       
                           {this.state.labNoError}
                    </div>
                </div>

                

                <div className='form-group' style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight: 'bold'}}>Laboratory Technologist</label>
                    <label style={{color:"red"}}> &nbsp;* </label>
                    <select class="form-select" 
                        placeholder=" Select   "
                        name="technologist"
                        value={this.state.technologist}
                        onChange={this.handleInputChange}>
                            <option> Select </option>
                            <option> Mr. Sarath Ranaweera </option>
                            <option> Mrs. Dayarathna</option>
                            <option> Mr. Jagath Perera </option>
                            <option> Mr. Dammika Siriwardana </option>

                    </select>
                    <div style={{fontSize:12 ,color:"red"}}>       
                           {this.state.technologistError}
                    </div>
                </div>


                <div className='form-group' style={{marginBottom:'15px'}}>
                    <label style={{marginBottom:'5px',fontWeight: 'bold'}}>Status</label>
                    <label style={{color:"red"}}> &nbsp;* </label>
                        <select class="form-select" 
                            placeholder=" Select   "
                            name="status"
                            value={this.state.status}
                            onChange={this.handleInputChange}>
                                <option> Select </option>
                                <option>Completed</option>
                                <option> Pending </option>
                   
                        </select>
                        <div style={{fontSize:12 ,color:"red"}}>       
                           {this.state.statusError}
                    </div>
                </div>

                <center>
                <button className='btn btn-success' type="submit" style={{marginTop:'25px',height: '50px', width : '100px'}}
                 onClick={this.onSubmit}>
                <i class="fas fa-save"></i>&nbsp;&nbsp;Save
                </button>
                &nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
                <button className='btn btn-danger' type="submit" onClick ={(e)=>{
                     this.setState(
                        {
                            
                        name:"",
                        id:"",
                        phone:"",
                        age:"",
                        gender:"",
                        date:"",
                        labTest:"",
                        labNo:"",
                        technologist:"",
                        status:"",
                        nameError:"",
                        idError:"",
                        phoneError:"",
                        ageError:"",
                        dateError:"",
                        labTestError:"",
                        labNoError:"",
                        technologistError:"",
                        statusError:""

    
                        })
                }}style={{marginTop:'25px',height: '50px', width : '100px'}}><i class="fas fa-rotate-right"></i>
                &nbsp;Clear
                </button>
                </center>
            </form>
            </div>
            <br></br>
            <br></br>
            
        </div>
        </div>
        
        )
    }
}