import { AccountCircleSharp, FacebookTwoTone, HouseTwoTone, Instagram, LinkedIn, LocalPhoneTwoTone, Logout, Password, Twitter } from "@mui/icons-material";
import {Alert, Avatar, Button, InputAdornment, Slide, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function SlideSnackbar(props){
  return <Slide {...props} direction="left"/>
}

export function AdminLogin(){
    const[alertMsg,setAlertMsg] = useState({ open: false, message: "", severity: "info" });
    const [cookies,setcookie,removecookie] = useCookies(['admin']);
    const [iconColors,setIconColors] = useState({user:"secondary",pass:"secondary"});
    let navigate = useNavigate();

    useEffect(()=>{
      if (!cookies.admin) {
        navigate('/admin-login');
      }
    },[cookies.admin, navigate])

    const formik = useFormik({
      initialValues:{
        UserId:'',
        Password:''
      },
      onSubmit:(admin)=>{
        axios.get('http://127.0.0.1:5050/get-admin')
        .then(response=>{
          var user = response.data.find(item=> item.UserId===admin.UserId);
          if(user){
            if(admin.Password===user.Password){
              setTimeout(()=>{
                navigate("/admin-dash");
              },2000);
              setAlertMsg({open: true, message: "Login Successful.", severity: "success"});
              setcookie('admin',user.UserId);
              setIconColors({user:"success",pass:"success"});
            }else{
              setAlertMsg({open: true, message: "Invalid Password.", severity: "error"});
              setIconColors({user:"secondary",pass:"error"});
            }
          }else{
            setAlertMsg({open: true, message: "Invalid User Id.", severity: "error"});
            setIconColors({user:"error",pass:"secondary"});
          }
        })
      }
    });

    return(
        <div   style={{background: 'linear-gradient(to right, #FFECD2, #FCB69F)',height:'100%'}}>
            <div className="container-fluid w-50 py-3">
              <div className="admin-background">
                  <div className="bg-admin-shade d-flex justify-content-end align-items-center">
                      <div className="admin-form-bg text-black w-50 p-4 m-4 rounded-5 ">
                          <h2 className="text-center">Admin Login</h2>
                          
                          <form style={{paddingTop:'20px'}} onSubmit={formik.handleSubmit}>
                              <dl className="mb-4">
                                <dd>
                                  <TextField 
                                    slotProps={{
                                      input:{
                                        startAdornment:(
                                          <InputAdornment position="start">
                                            <AccountCircleSharp color={iconColors.user}/>
                                          </InputAdornment>
                                        )
                                      }
                                    }}
                                  className="form-control" label="User Id*" name="UserId" variant="filled" onChange={formik.handleChange} placeholder="UserId"/>
                                </dd>
                                <dd className="mt-4">
                                  <TextField
                                    slotProps={{
                                      input:{
                                        startAdornment:(
                                          <InputAdornment position="start">
                                            <Password color={iconColors.pass}/>
                                          </InputAdornment>
                                        )
                                      }
                                    }} 
                                  label="Password*" variant="filled" name="Password"  className="form-control" onChange={formik.handleChange} type="password" placeholder="Password"/>
                                </dd>
                              </dl>
                              <Button type="submit" variant="contained" color="warning" className="w-100 rounded-5 mb-3">Login</Button>
                              <Link to="/" className="float-end"><Logout/> Cancel</Link>
                          </form>
                      </div>
                  </div>
                  
              </div>
              <Snackbar open={alertMsg.open} autoHideDuration={1000} onClose={() => setAlertMsg({ ...alertMsg, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "right" }} TransitionComponent={SlideSnackbar}>
                <Alert severity={alertMsg.severity} variant="filled" onClose={() => setAlertMsg({ ...alertMsg, open: false })}>
                  {alertMsg.message}
                </Alert>
              </Snackbar>
          </div>
          <footer className="row bg-dark text-light">
              <div className="col p-4">
                  <hr className="border-primary border-4" style={{filter: 'drop-shadow(0 0.2rem 0.25rem rgb(57, 85, 244))'}}></hr>
                  <div className="row container-fluid">
                      <div className="col">
                          <div className="row">
                              {/* Quick Links */}
                              <div className="col-md-4 mb-4">
                                  <h5 className="mb-3 text-primary">Quick Links</h5>
                                  <ul className="list-unstyled">
                                      <li className="mb-2">
                                          <Link to="/" className="text-decoration-none text-light">Home</Link>
                                      </li>
                                      <li className="mb-2">
                                          <Link to="/about" className="text-decoration-none text-light">About</Link>
                                      </li>
                                      <li className="mb-2">
                                          <Link to="/contact" className="text-decoration-none text-light">Contact</Link>
                                      </li>
                                      <li className="mb-2">
                                          <Link to="/support" className="text-decoration-none text-light">Support</Link>
                                      </li>
                                  </ul>
                              </div>

                              {/* Contact Information */}
                              <div className="col-md-4 mb-4">
                                  <h5 className="mb-3 text-primary">Contact Us</h5>
                                  <ul className="list-unstyled">
                                      <li className="mb-2">
                                          <span className="me-2 bi bi-envelope-at text-primary fs-5"></span> support@technologyvideo.com
                                      </li>
                                      <li className="mb-2">
                                          <span className="me-2"><LocalPhoneTwoTone color="error"/> </span> +91 12345 67890
                                      </li>
                                      <li className="mb-2">
                                          <span className="me-2"><HouseTwoTone style={{color:'#FAEBD7'}}/></span> 123 Tech Street, Hyderabad, India
                                      </li>
                                  </ul>
                              </div>

                              {/* Social Media Links */}
                              <div className="col-md-4 mb-4">
                                  <h5 className="mb-3 text-primary">Follow Us</h5>
                                  <div className="d-flex flex-column">
                                      <a href="https://www.facebook.com/nareshit?mibextid=ZbWKwL" target="_blank" className="text-light me-3 text-decoration-none my-1">
                                          <FacebookTwoTone color="primary"/> Facebook
                                      </a>
                                      <a href="https://x.com/nareshitech?t=lZU-LH_aPANCsVYHpXIJ7A&s=08" target="_blank" className="text-light me-3 text-decoration-none my-1">
                                          <Twitter/> Twitter
                                      </a>
                                      <a href="https://www.instagram.com/nareshitech?igsh=ajFpajQ0eDd1OW4z" target="_blank" className="text-light me-3 text-decoration-none my-1">
                                          <Instagram color="error"/> Instagram
                                      </a>
                                      <a href="https://www.linkedin.com/company/naresh-i-technologies/posts/?feedView=all" target="_blank" className="text-light me-3 text-decoration-none my-1">
                                          <LinkedIn color="primary"/> Linkedin
                                      </a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <hr className="border-primary border-4" style={{filter: 'drop-shadow(0 0.2rem 0.25rem rgb(57, 85, 244))'}}></hr>
                  <div className="row">
                      <div className="col">
                          <div className="d-flex mb-0">
                              <a href="https://www.facebook.com/nareshit?mibextid=ZbWKwL" target="_blank" className="text-light me-3 text-decoration-none my-1">
                                  <FacebookTwoTone color="primary"/>
                              </a>
                              <a href="https://x.com/nareshitech?t=lZU-LH_aPANCsVYHpXIJ7A&s=08" target="_blank" className="text-light me-3 text-decoration-none my-1">
                                  <Twitter/>
                              </a>
                              <a href="https://www.instagram.com/nareshitech?igsh=ajFpajQ0eDd1OW4z" target="_blank" className="text-light me-3 text-decoration-none my-1">
                                  <Instagram color="error"/>
                              </a>
                              <a href="https://www.linkedin.com/company/naresh-i-technologies/posts/?feedView=all" target="_blank" className="text-light me-3 text-decoration-none my-1">
                                  <LinkedIn color="primary"/>
                              </a>
                          </div>
                      </div>
                      <div className="col">
                          <div className="d-flex mb-0"><span><Avatar alt="Technology Video Logo" src="/techno-logo-3.png" style={{ width: 50, height: 50 }}/></span> <span className="h2 mx-1">Technology Video</span></div>
                      </div>
                      <div className="col">
                          <p className="mb-0" >&copy; {new Date().getFullYear()} Technology Video. All Rights Reserved.</p>
                      </div>
                  </div>
              </div>
          </footer>
        </div>
    )
}