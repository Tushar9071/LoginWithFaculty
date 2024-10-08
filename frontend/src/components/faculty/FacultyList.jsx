// FacultyTable.js
import {React,useEffect,useState} from "react";
import { Link , useNavigate} from "react-router-dom";
import Navbar from "./Navbar";


const FacultyTable = () => {
const [data, setData] = useState([]);
let url1 = "http://localhost:3090/api/login" ;
const navigate = useNavigate();
const token = document.cookie;
  fetch(`${url1}/cookieVerification`,{
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
  const url = process.env.REACT_APP_DB_api_key+"/faculty/";
  console.log(url);
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  return (
    <>
    
    
    <Navbar/>
    <div className="container mt-4">
      <h2 className="mb-4">Faculty List</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Faculty Designation</th>
            <th>Faculty Education Qualification</th>
            <th>Faculty Experience</th>
            <th>Faculty Working Since</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((items, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{items.FacultyName}</td>
              <td>{items.FacultyDesignation}</td>
              <td>{items.FacultyEducationQualification}</td>
              <td>{items.FacultyExperience}</td>
              <td>{items.FacultyWorkingSince}</td>
              <td>
              <Link to={'/viewmore/' + items.id} className="btn btn-primary">
                View More
              </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default FacultyTable;
