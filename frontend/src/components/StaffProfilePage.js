import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';

export default function StaffProfile() {

    const location = useLocation();

    const {staffMember} = location.state;
    console.log(staffMember);

    // const [firstName, setfirstName ]=useState("");
    // const [lasttName, setlasttName ]=useState("");
    // const [address, setaddress]=useState("");
    // const [contactNumber, setcontactNumber]=useState("");
    // const [nicNumber , setnicNumber ]=useState("");
    // const [email , setemail]=useState("");
    // const [dateOfBirth, setdateOfBirth]=useState("");
    // const [gender, setgender ]=useState("Male");
    // const [role, setrole]=useState("");
    // const [specialization, setspecialization]=useState("");


    const onCancel = (e) => {

        axios.delete(`http://localhost:8070/staff/delete/${e}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
            alert("Successfully Deleted")

            window.location = '/view'
        })
    }

    const deleteRow = (e) => {
        if (window.confirm('Are you sure want to delete?'))
        {
            onCancel(e);
        }

        
    }

    // const {id}=useParams();
    // console.log("Id : "+id);
    // let updated=false;
    // useEffect(()=>{
    //     if(!updated){
    //         updated=true;
    //         axios.get(`http://localhost:8070/staff/get/${id}`)
    //      .then(Response =>{

    //         setfirstName(Response.data.staff.firstName);
    //         setlasttName(Response.data.staff.lasttName);
    //         setaddress(Response.data.staff.address);
    //         setcontactNumber(Response.data.staff.contactNumber);
    //         setnicNumber(Response.data.staff.nicNumber);
    //         setemail(Response.data.staff.email);
    //         setdateOfBirth(Response.data.staff.dateOfBirth);
    //         setgender(Response.data.staff.gender);
    //         setrole(Response.data.staff.role);
    //         setspecialization(Response.data.staff.specialization);
             
    //      }).catch(e=>console.log(e));
 
    //      console.log("Fname : ");
    //     }

    // },[])

  return (
            <div>
                <div className="card mb-3" style={{}}>
        <div className="row g-0">
            <div className="col-md-4 p-5">
            <img src="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=640:*" className="img-fluid rounded-circle" style={{maxHeight: 400}} alt="..."/>
            </div>
            <div className="col-md-8">
            <div className="card-body">
                <h5 className="card-title"><u><b>Staff Profile</b></u></h5>
                <table className="table table-hover my-5">
                <tbody>
                    <tr>
                    <th scope="row">Name</th>
                    <td>{staffMember.firstName + ' ' + staffMember.lasttName}</td>
                    </tr>
                    <tr>
                    <th scope="row">Gender</th>
                    <td>{staffMember.gender}</td>
                    </tr>
                    <tr>
                    <th scope="row">Contact Number</th>
                    <td>{staffMember.contactNumber}</td>
                    </tr>
                    <tr>
                    <th scope="row">Date of Birth</th>
                    <td colspan="2">{staffMember.dateOfBirth}</td>
                    </tr>
                    <tr>
                    <th scope="row">Email Address</th>
                    <td colspan="2">{staffMember.email}</td>
                    </tr>
                    <tr>
                    <th scope="row">NIC Number</th>
                    <td colspan="2">{staffMember.nicNumber}</td>
                    </tr>
                    <tr>
                    <th scope="row">Role</th>
                    <td colspan="2">{staffMember.role}</td>
                    </tr>
                    <tr>
                    <th scope="row">Specialization</th>
                    <td colspan="2">{staffMember.specialization}</td>
                    </tr>

                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
        <div className="row mb-5 justify-content-end">
            <div className="col-3 justify-content-evenly">
                <Link className='btn btn-warning me-4' to={"/update/"+staffMember._id} >Update Profile</Link>
                <button className='btn btn-danger' onClick={(e) => deleteRow(staffMember._id)}>Delete Profile</button>
            </div>
            </div>
            </div>
  )
}
