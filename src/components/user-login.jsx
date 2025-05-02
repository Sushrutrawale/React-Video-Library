import { AccountCircleSharp, FacebookTwoTone, HouseTwoTone, Instagram, LinkedIn, LocalPhoneTwoTone, Password, Twitter } from "@mui/icons-material";
import {Alert, Avatar, Button, InputAdornment, Slide, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function SlideSnackbar(props){
    return <Slide {...props} direction="left"/>
}

export function UserLogin(){
    const [users,setUsers] = useState([{UserId:'',UserName:'',Password:'',Email:'',Mobile:''}]);
    const[alertMsg,setAlertMsg] = useState({ open: false, message: "", severity: "info" });
    const [iconColors,setIconColors] = useState({user:"secondary",pass:"secondary"});
    const [showRocket, setShowRocket] = useState(false);
    
    const [cookies,setCookie,removeCookie] = useCookies(['username']);

    let navigate = useNavigate();

    const formik = useFormik({
      initialValues:{
        UserId:'',
        UserName:'',
        Password:''
      },
      onSubmit:(user)=>{
        axios.get('http://127.0.0.1:5050/get-users')
        .then(response=>{
          var users = response.data.find(item=> item.UserId===user.UserId);
          if(users){
            if(user.Password===users.Password){
              setAlertMsg({open: true, message: "Login Successfully.", severity: "success"});
              setTimeout(()=>{
                navigate("/user-dash");
              },2000);
              setIconColors({user:"success",pass:"success"});
              setShowRocket(true);
              setCookie('username',users.UserName);

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
        <div >
            <div className="container-fluid d-flex justify-content-center align-items-center w-100"style={{height:"650px",background: 'linear-gradient(to right, #667eea, #764ba2)'}}>
              <div style={{height:"640px",width:"1100px"}} className="user-login-body">
                <div className="row rounded-5 m-2" style={{height:"620px",boxShadow:"5px 5px 4px black"}}>
                    <div className="col-6 d-flex justify-content-center align-items-center bg-danger rounded-start-5">
                        <div className="bg-dark user-form-bg text-light rounded-5 p-4">
                            <h2 className="text-center">Login</h2>
                            <form style={{paddingTop:'20px'}} onSubmit={formik.handleSubmit}>
                                <dl className="mb-4">
                                  <dd>
                                    <TextField 
                                      slotProps={{
                                        input: {
                                          startAdornment: (
                                            <InputAdornment position="start">
                                              <AccountCircleSharp color={iconColors.user}/>
                                            </InputAdornment>
                                          ),
                                        },
                                      }}
                                    className="form-control" label="User Id*" name="UserId" variant="filled" onChange={formik.handleChange} placeholder="UserId"/>
                                  </dd>
                                  <dd className="my-4">
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
                                <Button type="submit" variant="contained" color="warning" className="w-100 rounded-5" style={{boxShadow:'5px 5px 5px black'}}><span className="fw-bold">Login</span> </Button>
                            </form>
                            <hr></hr>
                            <div className="container-fluid text-center">
                                  <div>
                                    <span className="me-2 fw-bold" style={{fontFamily:'Roboto'}}>Need an account?</span><Link to="/user-register"><Button variant="contained" color="primary" className="text-capitalize rounded-5" style={{boxShadow:'5px 5px 5px black'}}>Sign up</Button></Link>
                                  </div>
                                  <div className="pt-2">
                                    <span className="me-2 fw-bold" style={{fontFamily:'Roboto'}}>Forget your password?</span><Link className="text-danger" to="/edit-user-pass">Reset it</Link>
                                  </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 bg-danger rounded-end-5">
                      <div className="user-background rounded-end-5">
                        <div className={`rocket ${showRocket ? "launch" : ""}`}></div>
                      </div>
                    </div>
                    
                </div>
              </div>
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
            <Snackbar open={alertMsg.open} autoHideDuration={1000} onClose={() => setAlertMsg({ ...alertMsg, open: false })}
              anchorOrigin={{ vertical: "top", horizontal: "right" }} TransitionComponent={SlideSnackbar}>
              <Alert severity={alertMsg.severity} variant="filled" onClose={() => setAlertMsg({ ...alertMsg, open: false })}>
                {alertMsg.message}
              </Alert>
            </Snackbar>
        </div>
    )
}