import { AccountCircleTwoTone, AlternateEmailTwoTone, FacebookTwoTone, Grid3x3TwoTone, HouseTwoTone, Instagram, LinkedIn, LocalPhoneTwoTone, Password, SmartphoneTwoTone, Twitter } from "@mui/icons-material";
import { Alert, Avatar, Button, InputAdornment, Slide, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SlideSnackbar(props){
 return <Slide {...props} direction="left"/>
}

export function RegisterUser(){
    const [user,setUser] = useState([]);
    const [alertMsg,setAlertMsg] = useState({open:false, message:"", severity:"info"});
    const [icons,setIcons] = useState({userid:"secondary",username:"secondary",pass:"secondary",email:"secondary",mobile:"secondary"});

    let navigate =useNavigate();

    const validationSchema = Yup.object({
        UserId: Yup.string()
          .min(4, "User ID must be at least 4 characters")
          .required("User ID is required"),
        UserName: Yup.string()
          .min(3, "Name must be at least 3 characters")
          .required("Name is required"),
        Email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
        Password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        Mobile: Yup.string()
          .matches(/^\+91[0-9]{10}$/, "Mobile number must start with +91 and be 10 digits")
          .required("Mobile number is required"),
      });

    const formik = useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            Password:'',
            Email:'',
            Mobile:''  
        },
        onSubmit:(user)=>{
            axios.post(`http://127.0.0.1:5050/register-user`,user)
            .then(() => {setAlertMsg({ open: true, message: "Registration Successful!", severity: "success" });
                setTimeout(()=>{
                    navigate("/user-login");
                },2000);
            })
            .catch(() => setAlertMsg({ open: true, message: "Registration Failed!", severity: "error" }))
        },
        validationSchema
    });

    return(
        <div style={{background: 'linear-gradient(to right, #FFECD2, #FCB69F)'}}>  
            <div className="d-flex justify-content-center align-items-center py-3">
                <div style={{width:'70%'}}>
                    <div className="row border-0 rounded-3 m-2 overflow-hidden register-user-bg" style={{height:"620px",boxShadow:'0px 7px 10px black'}}>
                        <div className="col-6 user-register-img">

                        </div>
                        <div className="col-6 overflow-auto" style={{height:"600px"}}>
                            <h2 className="text-center" style={{fontFamily:'serif'}}>Create account</h2>
                            <form onSubmit={formik.handleSubmit}>
                                <dl>
                                    <div className="d-flex">
                                        <div className="me-1">
                                            <dt>Name</dt>
                                            <dd>
                                                <TextField
                                                slotProps={{
                                                    input:{
                                                        startAdornment:(
                                                            <InputAdornment position="start">
                                                                <AccountCircleTwoTone color={formik.errors.UserName ? "error" : "secondary"}/>
                                                            </InputAdornment>
                                                        )
                                                    }
                                                }}
                                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                error={formik.touched.UserName && Boolean(formik.errors.UserName)}
                                                helperText={formik.touched.UserName && formik.errors.UserName} 
                                                name="UserName"/>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt>User Id</dt>
                                            <dd>
                                                <TextField
                                                slotProps={{
                                                    input:{
                                                        startAdornment:(
                                                            <InputAdornment position="start">
                                                                <Grid3x3TwoTone color={formik.errors.UserId ? "error" : "secondary"}/>
                                                            </InputAdornment>
                                                        )
                                                    }
                                                }}
                                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                error={formik.touched.UserId && Boolean(formik.errors.UserId)}
                                                helperText={formik.touched.UserId && formik.errors.UserId} 
                                                name="UserId"/>
                                            </dd>
                                        </div>
                                    </div>
                                    <dt>Email</dt>
                                    <dd>
                                        <TextField
                                        size="2"
                                        slotProps={{
                                            input:{
                                                startAdornment:(
                                                    <InputAdornment position="start">
                                                        <AlternateEmailTwoTone color={formik.errors.Email ? "error" : "secondary"}/>
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
                                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        error={formik.touched.Email && Boolean(formik.errors.Email)}
                                        helperText={formik.touched.Email && formik.errors.Email} 
                                        name="Email" type="email" fullWidth/>
                                    </dd>
                                    <dt>Password</dt>
                                    <dd>
                                        <TextField
                                        slotProps={{
                                            input:{
                                                startAdornment:(
                                                    <InputAdornment position="start">
                                                        <Password color={formik.errors.Password ? "error" : "secondary"}/>
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
                                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        error={formik.touched.Password && Boolean(formik.errors.Password)}
                                        helperText={formik.touched.Password && formik.errors.Password}
                                        name="Password" type="password" placeholder="6+ characters" fullWidth/>
                                    </dd>
                                    <dt>Mobile</dt>
                                    <dd>
                                        <TextField
                                        slotProps={{
                                            input:{
                                                startAdornment:(
                                                    <InputAdornment position="start">
                                                        <SmartphoneTwoTone color={formik.errors.Mobile ? "error" : "secondary"}/>
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
                                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                                        error={formik.touched.Mobile && Boolean(formik.errors.Mobile)}
                                        helperText={formik.touched.Mobile && formik.errors.Mobile}
                                        name="Mobile" type="mobile" placeholder="+91" fullWidth/>
                                    </dd>
                                </dl>
                                <Button fullWidth type="submit" variant="contained" className="rounded-3" color="error">Create Account</Button>
                            </form>
                            <div className="d-flex justify-content-center">
                                <span className="my-3"><span className="text-secondary">Already have an account?</span> <Link color="primary" to="/user-login"> Log in</Link></span>
                            </div>
                            <div className="d-flex justify-content-center">
                                <span><span className="text-secondary">Admin Sign in?</span> <Link color="primary" to="/admin-login"> Admin Signin</Link></span>
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