import React, {useState} from "react"
import axios from "axios";
import { Link } from "react-router-dom";


export default function AddStaff(){

    const [firstName, setfirstName ]=useState("");
    const [lasttName, setlasttName ]=useState("");
    const [address, setaddress]=useState("");
    const [contactNumber, setcontactNumber]=useState("");
    const [nicNumber , setnicNumber ]=useState("");
    const [email , setemail]=useState("");
    const [dateOfBirth, setdateOfBirth]=useState("");
    const [gender, setgender ]=useState("Male");
    const [role, setrole]=useState("");
    const [specialization, setspecialization]=useState("");

    const [suberror, setSuberror] = useState("");

    const [subberror, setSubberror] = useState("");

    const [nicError, setNicError]=useState("");
    var nictxt="";

    const [numError,setNumError]=useState("");
    var numTxt="";

    const [maleChecked ,setMaleChecked]=useState(true);
    const [femaleChecked,setFemaleChecked]=useState(false);



    var maleRb,femaleRb;
    // var dob=new Date();

    function sendData(e){
        e.preventDefault();

        if((nicError=="Invalid NIC")||(numError=="Invalid number")||(suberror=="Maximum length is 10 Charactors")||(subberror=="Maximum length is 20 Charactors")){
            alert("Invalid Data");//Error
        }else if(role === "Doctor" && specialization !== '') {

        }else{
        
            const newStaff={
                firstName,
                lasttName,
                address,
                contactNumber,
                nicNumber,
                email,
                dateOfBirth,
                gender,
                role,
                specialization

            }

            axios.post("http://localhost:8070/staff/add",newStaff).then(()=>{
                alert("staff added")
                
            }).catch((err)=>{
                alert(err)
            })
        }
    }

    //clear button implementation
    const clearVal = ()=>{
        setfirstName('');
        setlasttName ('');
        setaddress('');
        setcontactNumber('');
        setnicNumber('');
        setemail('');
        setdateOfBirth('');
        setrole("");
        setspecialization("");

    }

    //first name validation
    function ValidateFname(tlength,ntext) {
        if (tlength > 15) {

            setSuberror("Maximum length is 15 Characters")
        }else {
            setSuberror("")
        }

        setfirstName(ntext)
    }

    //last name validation
    function ValidateLname(length,ntext) {
        if (length > 20) {

            setSubberror("Maximum length is 20 Characters")
        }else {
            setSubberror("")
        }

        setlasttName(ntext)
    }
    
    
    //NIC Validation
    function validateNIC(length,text){

        const p1=/[0-9]{9}[V,v]$/;
        const p2=/[0-9]{12}/;
         nictxt=text;
         const mtch1=nictxt.match(p1);
         const mtch2=nictxt.match(p2);
        if((length<11)&&(mtch1)){
           setNicError("");
            
        }else if((length<13)&&(mtch2)){
            setNicError("");
        }else{
            
            setNicError("Invalid NIC");
        }
    }


    //contact number validation
    function validateNumber(length,text){
        const p1=/[0-9]{10}/;

        numTxt=text;
        const mtch=numTxt.match(p1);
        if((mtch)&&(length==10)){
            setNumError("");
        }else{
            
            setNumError("Invalid number");
        }
    }

    
    //gender checked implementation
    function genderChanged(val){
        if(val=="Male"){
            setMaleChecked(true);
            setFemaleChecked(false);
        }else{
            setMaleChecked(false);
            setFemaleChecked(true);
        }

        setgender(val);
    }

    //form implementation
    return(
        
    //add background image
    <div  style={{backgroundImage:"url(http://localhost:3000/images/star.jpg)"
    
    ,backgroundSize:'cover',

    height:'1300px',

    backgroundRepeat:'no-repeat', backgroundSize:'cover',backgroundPosition:'center',backgroundAttachment:'fixed'

    }} >
        
        <div className="container"align="center">
            <br></br>   <br></br>
            
            
            
            <br></br> 
            
            
        <div>
           
            <Link to="/view">
            <button type="stafflist" class="buttonv"style={{marginLeft:400}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style={{marginRight: 9, marginBottom: 3}} fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
            </svg>
        View Staff List</button>
            </Link>
        </div>
            
            <br></br> 
   
        <form class="form" align="center" onSubmit={sendData} autocomplete="off">
            
            <h3 class="hstyle" align="center"><b>New Staff Member Entry</b></h3>
            <hr></hr>
            <br></br>
            
                <div class="mb-3 container">
                    <label for="FirstName" class="form-label"><b>First Name:</b></label>
                    <input type="text" placeholder="Enter First Name" class="form-control" id="FirstName" 
                    onChange= {(e)=>{ValidateFname(e.target.value.length,e.target.value)}}
                    value={firstName}required/><p style={{color:"red"}}>{suberror}</p>
                </div>

                <div class="mb-3 container">
                    <label for="LastName" class="form-label"><b>Last Name:</b></label>
                    <input type="text" placeholder="Enter Last Name" class="form-control" id="LastName"
                    onChange= {(e)=>{ValidateLname(e.target.value.length,e.target.value)}}
                    value={lasttName}required/><p style={{color:"red"}}>{subberror}</p>
                </div>

                <div class="mb-3 container">
                    <label for="Address" class="form-label"><b>Address:</b></label>
                    <input type="text" placeholder="Enter Address" class="form-control" id="Address"
                    onChange= {(e)=>{setaddress(e.target.value)}}
                    value={address}required/>
                </div>

                <div class="mb-3 container">
                    <label for="ContactNumber" class="form-label"><b>Contact Number:</b></label>
                    <input type="text" placeholder="Enter Contact Number  Eg:+94234567898" class="form-control" id="ContactNumber"
                    onChange= {(e)=>{setcontactNumber(e.target.value);
                    validateNumber(e.target.value.length,e.target.value);}}
                    value={contactNumber}required/> <p style={{color:"red"}}>{numError}</p>
                </div>

                <div class="mb-3 container">
                    <label for="NICtNumber" class="form-label"><b>NIC Number:</b></label>
                    <input type="text" placeholder="Enter NIC Number  Eg:199975103v" class="form-control" id="NICNumber"
                    onChange= {(e)=>{setnicNumber(e.target.value);
                    validateNIC(e.target.value.length,e.target.value);
                    }}
                    value={nicNumber}required/> <p style={{color:"red"}}>{nicError}</p>
                </div>

                <div class="mb-3 container">
                    <label for="Email" class="form-label"><b>Email:</b></label>
                    <input type="email" placeholder="Enter Email" class="form-control" id="email"
                    onChange= {(e)=>{setemail(e.target.value)}}
                    value={email}required/>
                </div>
                  
                <div class="mb-3 container">
                     <label class="form-label"><b>Date Of Birth:</b></label>
                     <input type="date" class="form-control" name="fdate" id="fdate"
                     onChange= {(e)=>{
                        var dob=new Date(e.target.value);
                         const year=dob.getFullYear();
                         const month=(dob.getMonth())+1;
                         const date=dob.getDate();

                         var monthtxt="";
                         var datetxt="";
                        
                        if(month<10){
                            monthtxt="0"+(String(month));
                        }else{
                            monthtxt=String(month);
                        }

                        if(date<10){
                            datetxt="0"+(String(date));
                        }else{
                            datetxt=String(date);
                        }
                         const bday=(String(year)+"-"+monthtxt+"-"+datetxt);

                         console.log("Birthday : "+bday)
                         
                        setdateOfBirth(bday)
                    }}
                    value={dateOfBirth}
                    />
                 </div>
                
                 

                <div class="mb-3 container">
                <label for="Gender" class="form-label"><b>Gender:</b></label><br></br>
                <input type="radio"  name="gender" checked={maleChecked} id="Malerb" value="Male" onClick= {(e)=>{
                        
                        genderChanged(e.target.value);
                        
                        
                }}/> <label for="Malerb" class="form-label">Male</label>

                <input type="radio"  name="gender"  id="Femalerb" checked={femaleChecked} style={{marginLeft:20}}value="Female"onClick= {(e)=>{
                       
                        genderChanged(e.target.value);
                        
                }}/> <label for="Femalerb" class="form-label">Female</label>
                </div>

                

                <div class="mb-3 container">
                <label for="Role" class="form-label"><b>Role:</b></label>
                <br></br>
                
                            <select name="Role" class="form-select" id="Role"placeholder="select"
                             onChange= {(e)=>{setrole(e.target.value)}}value={role}>
                                <option value="" disabled selected hidden>Select</option>
                                <option value="Doctor" >Doctor</option>
                                <option value="Nurse">Nurse</option>
                                <option value="Lab Assistant">Lab Assistant</option>  
                            </select>
                 </div>

                    

                <div class="mb-3 container">
                <label for="specialization" class="form-label"><b>Specialization:</b></label>
                <br></br>

                        <select name="specialization" class="form-select" id="specialization"
                            onChange= {(e)=>{setspecialization(e.target.value)}}value={specialization}>
                                
                                <option value="" selected disabled hidden>Select</option>
                                <option value="General">General</option>
                                <option value="Cardiologist">Cardiologist </option>
                                <option value="Dermatologists">Dermatologists</option>
                                <option value="Neurologist">Neurologist </option>
                                <option value="Physiotherapist">Physiotherapist </option>
                                <option value="Psychiatrists ">Psychiatrists </option>
                                <option value="Urologist">Urologist</option>  
                        </select>
                 </div>

                <br></br>
                <button type="submit" class="buttons"style={{marginLeft:90}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{marginRight: 5}} fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                </svg>
                    Save</button>
                <button type="clear"  class="buttonc"style={{marginLeft:90}} onClick={clearVal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" style={{marginRight: 5}} fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
                    Clear </button>
            
            </form>
            <br></br> <br></br>
        </div>
        </div>    

    )
    

}