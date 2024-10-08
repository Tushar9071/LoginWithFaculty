import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";

const Map = () => {
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
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  
  const result = data.map((items) => {
    return (
      <>
      
      
      <div className="col-3" key={items.id}>
        <div
          className="card shadow-sm"
          style={{
            width: "18rem",
            height: "680px", 
            margin: "20px",
          }}
        >
          <img
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
            src={items.FacultyImage}
            className="card-img-top"
            alt={items.FacultyName}
          />
          <div className="card-body text-center">
            <h5 className="card-title">{items.FacultyName}</h5>
            <p className="card-text text-danger">
              <b>{items.FacultyDesignation}</b>
            </p>
            <hr className="u-divider-linear-gradient u-divider-linear-gradient--gray-light-v2 g-my-5"></hr>
            <p className="text-center">{items.FacultyEducationQualification}</p>
            <hr className="u-divider-linear-gradient u-divider-linear-gradient--gray-light-v2 g-my-5"></hr>
            <div className="row">
              <div className="col-6">Experience</div>
              <div className="col">Working Since</div>
            </div>
            <div className="row">
              <div className="col-6">
                <button type="button" className="btn btn-light">
                  {items.FacultyExperience}
                </button>
              </div>
              <div className="col">
                <button type="button" className="btn btn-light">
                  {items.FacultyWorkingSince}
                </button>
              </div>
            </div>

            {/* View More Button */}
            <div className="mt-4">
              <Link to={'/viewmore/' + items.id} className="btn btn-primary">
                View More
              </Link>
            </div>
          </div>

          {/* Edit and Delete Buttons */}
          <div className="card-footer text-center">
            <div className="btn-group" role="group">
              <Link to={'/updatefaculty/'+items.id}  className="btn btn-warning btn-sm me-2">
                <i className="bi bi-pencil"></i> Edit
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={()=>{

                  fetch(process.env.REACT_APP_DB_api_key+'/faculty/' + items.id, {method:"DELETE"})
                  .then(res=>  navigate('/'))
                }
              }
              >
                <i className="bi bi-trash"></i> 
                Delete
                
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  });

  return (
    <>
    <Navbar/>
      <div className="row m-4">{result}</div>
    </>
  );
};

export default Map;
