import React from 'react';
import ReactToPrint,{PrintContextConsumer} from 'react-to-print';
import axios from 'axios';
import { Link } from "react-router-dom";


export class StaffReport extends React.PureComponent {
    constructor(props) {

        super(props);

        this.state = {
            staff: [],
            roleFilter: '',
            specializationFilter: '',
            genderFilter: '',
            size: 0
        }
    }

    specializations = [
        {
          value: 'General',
          label: 'General'
        },
        {
          value: 'Urologist',
          label: 'Urologist'
        },
        {
          value: 'Dermatologists',
          label: 'Dermatologists'
        },
        {
          value: 'Neurologist',
          label: 'Neurologist'
        },
        {
            value: 'Physiotherapist',
            label: 'Physiotherapist'
        },
        {
            value: 'Phsychiatrists',
            label: 'Phsychiatrists'
        },
        {
            value: 'Cardiologist',
            label: 'Cardiologist'
        }
      ]

    role = [
        {
            value: 'Doctor',
            label: 'Doctor'
        },
        {
            value: 'Nurse',
            label: 'Nurse'
        },
        {
            value: 'Lab Assistant',
            label: 'Lab Assistant'
        }
    ]

    gender = [
        {
            value: 'Male',
            label: 'Male'
        },
        {
            value: 'Female',
            label: 'Female'
        }
    ]

    
setSpecialization = (e) => {
    this.setState({specializationFilter: e.target.value});
    console.log(e.target.value);
}

setRole = (e) => {
    this.setState({roleFilter: e.target.value});
    console.log(e.target.value);
}

setGender = (e) => {
    this.setState({genderFilter: e.target.value});
    console.log(e.target.value);
}

componentDidMount(){
    axios.get("http://localhost:8070/staff/view")
            .then(Response => {
                this.setState({ staff: Response.data })
              


            }).catch(function (err) {
                console.log(err);
            })
        }

        

    
        render() {
            console.log("ViewBody");
            let staffCount = 0;
            return (
    
    
    
                <div className="container"style={{ marginTop: 10,marginLeft:0}}>
    
                   
                    <h2 align="center"><b>Staff Report</b></h2>
                    
                    
                    {/*Count all raws of staff memmber table */}
                    <h5 align="left"><b>Total number of Staff Members:{staffCount === 0? this.state.staff.length : this.state.size}</b></h5>
                    
                    <div className="d-flex row alert alert-secondary p-2 my-4 justify-content-evenly">
                        <div className="col">
                        <label for="exampleFormControlInput1" class="form-label">Specialization</label>
                        <select name="specialization" class="form-select form-select" placeholder='Specialization' onChange={this.setSpecialization}>
                            <option value="">---</option>
                            {this.specializations.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        </div>
                        <div className="col">
                        <label for="exampleFormControlInput1" class="form-label">Role</label>
                        <select name="specialization" class="form-select form-select" placeholder='Role' onChange={this.setRole}>
                            <option value="">---</option>
                            {this.role.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        </div>
                        <div className="col">
                        <label for="exampleFormControlInput1" class="form-label">Gender</label>
                        <select name="specialization" class="form-select form-select" placeholder='Gender' onChange={this.setGender}>
                            <option value="">---</option>
                            {this.gender.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        
                        </div>
                        
                    </div>
                   
                   <hr style={{ width:1269}}></hr>
                    <table className="table table-striped" id="stable" style={{ marginTop: 20,marginLeft:3}}>
                    
                        <thead>
                            <tr class='table-primary'>
                                <th scope="col">First Name</th>
                                <th scope="col"> Last Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Contact Number</th>
                                <th scope="col">NIC Number</th>
                                <th scope="col">Email</th>
                                <th scope="col">DOB</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Role</th>
                                <th scope="col">Specialization</th>
                    
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.state.staff.filter((val) => {
                                console.log(this.state.specializationFilter);
                                if (this.state.specializationFilter === '' && this.state.roleFilter === '' && this.state.genderFilter === '') {
                                    return val;
                                    staffCount++;
                                  }
                                   else if (val.specialization.toLowerCase().includes(this.state.specializationFilter.toLowerCase()) && val.role.toLowerCase().includes(this.state.roleFilter.toLowerCase()) && val.gender.includes(this.state.genderFilter)){
                                    return val;
                                    staffCount++;
                                  }
                            }).map(staffmem => (
                                
    
                                <tr>
                                    <td scope="row">{staffmem.firstName}</td>
                                    <td scope="row"><div>{staffmem.lasttName}</div></td>
                                    <td scope="row"><div>{staffmem.address}</div></td>
                                    <td scope="row"><div>{staffmem.contactNumber}</div></td>
                                    <td scope="row"><div>{staffmem.nicNumber}</div></td>
                                    <td scope="row"><div>{staffmem.email}</div></td>
                                    <td scope="row"><div style={{ width:100}}>{staffmem.dateOfBirth}</div></td>
                                    <td scope="row"><div>{staffmem.gender}</div></td>
                                    <td scope="row"><div>{staffmem.role}</div></td>
                                    <td scope="row"><div>{staffmem.specialization}</div></td>
    
                                    
                                </tr>
    
                            ))}
                        </tbody>
                    </table>
                    <br></br>
                    
                    <br></br>
                </div>
    
            )
    
        }
    }

class Example extends React.PureComponent {
    render() {
        return (
            <div>

            <ReactToPrint content={() => this.componentRef}>
    
              <PrintContextConsumer>
    
                {({ handlePrint }) => (
    
                  <button className="buttond" style={{ marginLeft:1133}} onClick={handlePrint}>
                    <div className="row">
                        <div className="col">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-arrow-down-fill" viewBox="0 0 16 16">
                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"/>
                        </svg>
                        </div>
                        <div className="col">
                        Download
                        </div>
                    </div>
                    
                </button>
    
                )}
    
              </PrintContextConsumer>
    
            </ReactToPrint>
    
            <StaffReport ref={el => (this.componentRef = el)} />
    
          </div>
            
        );
        
    }
}

   

export default Example;