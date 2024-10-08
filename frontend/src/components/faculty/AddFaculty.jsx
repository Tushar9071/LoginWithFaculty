import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AddFaculty(){
    const [data, setData] = useState({});
    const navigate = useNavigate();
    let url = "http://localhost:3090/api/login" ;
  const token = document.cookie;
    fetch(`${url}/cookieVerification`,{
      method:'POST',
      headers: {
          "content-type": "application/json",
      },
      body: JSON.stringify({token:token})
      })
      .then(async res=>await res.json())
      .then(res=>{
          if(res.password == true){
              navigate('/login');
          }
      })
    return(
        <>
        <Navbar/>
            <div class="col-4" style={{marginLeft:"25vw",marginTop:"5vw"}}>
            <div class="card p-3 border " style={{width:"50vw"}}>
                <div class="card-header border">
                    Add Faculty
                </div>
                <div class="card-body">
                    <p class="card-text">
                        <div>
                        <div class="form-group row">
            </div>
            <div class="form-group row">
                <label for="text1" class="col-4 col-form-label">FacultyId : </label> 
                <div class="col-8">
                <input onChange={(e)=>{
                    setData({...data,id:e.target.value})
                }}  type="Number" class="form-control" />
                </div>
            </div>
            <div class="form-group row">
                <label for="text1" class="col-4 col-form-label">FacultyName : </label> 
                <div class="col-8">
                <input onChange={(e)=>{
                    setData({...data,FacultyName:e.target.value})
                }}  type="text" class="form-control" />
                </div>
            </div>
            <div class="form-group row">
                <label for="text4" class="col-4 col-form-label">Faculty Designation : </label> 
                <div class="col-8">
                <input onChange={(e)=>{
                    setData({...data,FacultyDesignation:e.target.value})
                }}  type="text" class="form-control" />
                </div>
            </div>
            <div class="form-group row">
                <label for="text3" class="col-4 col-form-label">Faculty EducationQualification : </label> 
                <div class="col-8">
                <input onChange={(e)=>{
                    setData({...data,FacultyEducationQualification:e.target.value})
                }}  type="text" class="form-control" />
                </div>
            </div>
            <div class="form-group row">
                <label for="text3" class="col-4 col-form-label">FacultyExperience
                : </label> 
                <div class="col-8">
                <input onChange={(e)=>{
                    setData({...data,FacultyExperience:e.target.value})
                }}  type="text" class="form-control" />
                </div>
            </div> 

            <div class="form-group row">
                <label for="text3" class="col-4 col-form-label">FacultyWorkingSince

                : </label> 
                <div class="col-8">
                <input onChange={(e)=>{
                    setData({...data,FacultyWorkingSince:e.target.value})
                }}  type="text" class="form-control" />
                </div>
            </div>
            <div class="form-group row">
                <label for="text3" class="col-4 col-form-label">FacultyImage  : </label> 
              <div class="col-8">
                <input onChange={(e)=>{
                    setData({...data,FacultyImage:e.target.value})
                }}  type="text" class="form-control" />
                </div>
            </div>  
            <div class="form-group row">
                <div class="offset-4 col-8">
                <br/>
                <button onClick={()=>{
                    const apiUrl = process.env.REACT_APP_DB_api_key+"/faculty/";

                    fetch(apiUrl,{
                        method:"POST",
                        body:JSON.stringify(data),
                        headers:{
                            "Content-Type":"application/json"
                        }
                    })
                    .then((res)=>res.json())
                    .then((res)=>{
                        navigate('/Map');
                    });
                }} name="submit" class="btn btn-success" style={{marginLeft:"5vw"}} > ADD Faculty </button>&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/Map" className="btn btn-info">BACK</Link>
                </div>
                </div>
                        </div>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
}

export default AddFaculty;