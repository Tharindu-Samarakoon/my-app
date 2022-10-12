import { Link,useParams } from 'react-router-dom';


function StaffDash(props){
    const{id} = useParams();
    return(

        <div className='' >

            
            <h2 className="text-center"><b>Staff Management</b></h2>
            <br></br><br></br><br></br>

            <div class="row justify-content-evenly gx-5">
            <br></br>
            
            {/* <div className=" col "  style={{marginLeft:1}}>
            <Link to="/add" className="addstaff">
                <img src="/images/add staff.png" width="240" height="240" alt="" /><br></br><br></br>
                <button className="btn btn-info" style={{marginLeft:17}}><h6><b> Add New Staff Member</b></h6></button>
            </Link>
            </div> */}
            <div className="col" style={{marginLeft: 20, marginRight: 20}}>
            <Link to="/add" className="addstaff" style={{textDecoration: 'none', color: 'black'}}>
                <div class="card text-center">
                <img src="https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={450} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <p class="card-text"><h6><b> Add New Staff Member</b></h6></p>
                </div>
            </div>
            </Link>
            </div>

            {/* <div className="col " style={{marginLeft:50}} >
            <Link to="/view" className="viewstaff">
                <img src="/images/view new staff.png" width="240" height="240" alt="" /><br></br><br></br>
                <button className="btn btn-info" style={{marginLeft:70}}><h6><b>Staff List</b></h6></button>
            </Link>
            </div> */}
            <div className="col" style={{marginLeft: 20, marginRight: 20}}>
            <Link to="/view" className="viewstaff" style={{textDecoration: 'none', color: 'black'}}>
                <div class="card text-center">
                <img src="https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={450} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <p class="card-text"><h6><b>Staff List</b></h6></p>
                </div>
            </div>
            </Link>
            </div>

            {/* <div className="col "  style={{marginLeft:50}}>
            <Link to="/report" className="staffreport">
                <img src="/images/report.png" width="240" height="240" alt="" /><br></br><br></br>
                <button className="btn btn-info" style={{marginLeft:70}}><h6><b> Staff Report</b></h6></button>
            </Link>
            </div> */}

            <div className="col" style={{marginLeft: 20, marginRight: 20}}>
            <Link to="/report" className="staffreport" style={{textDecoration: 'none', color: 'black'}}>
                <div class="card text-center">
                <img src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={450} class="card-img-top" alt="..."/>
                <div class="card-body">
                    <p class="card-text"><h6><b>Staff Report</b></h6></p>
                </div>
            </div>
            </Link>
            </div>

            </div>
            <br></br><br></br><br></br><br></br><br></br>
        </div>
        
    )
}
export default StaffDash;