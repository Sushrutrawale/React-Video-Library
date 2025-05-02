import React, { useState } from "react";
import axios from "axios";
import { Alert, Button, InputAdornment, Slide, Snackbar, TextField, Card, CardContent, Typography, Avatar } from "@mui/material";
import { Password, Grid3x3TwoTone, LocalPhoneTwoTone, HouseTwoTone, FacebookTwoTone, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

function SlideSnackbar(props) {
    return <Slide {...props} direction="left" />;
}

export function ResetPassword() {
    const [alertMsg, setAlertMsg] = useState({ open: false, message: "", severity: "info" });
    let navigate = useNavigate();

    const validationSchema = Yup.object({
        userId: Yup.string().required("User ID is required"),
        newPassword: Yup.string().min(6, "Password must be at least 6 characters").required("New Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Confirm Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            userId: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: (values) => {
            axios.put(`http://127.0.0.1:5050/edit-user-password/${values.userId}`, { NewPassword: values.newPassword })
                .then(() => {
                    setAlertMsg({ open: true, message: "Password updated successfully!", severity: "success" });
                    setTimeout(() => {
                        navigate("/user-login");
                    }, 2000);
                })
                .catch(() => setAlertMsg({ open: true, message: "Failed to update password!", severity: "error" }));
        },
    });

    return (
        <div style={{background: 'linear-gradient(to bottom right, #868F96, #596164)',height:'100%'}}>
            <div className="py-4 userpass-reset-body">
                <Card sx={{ maxWidth: 400, mx: "auto", p: 3, textAlign: "center"}} style={{boxShadow:'0px 7px 10px black'}}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom className="fw-bold">Password Reset</Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                label="User ID"
                                fullWidth
                                margin="normal"
                                name="userId"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.userId && Boolean(formik.errors.userId)}
                                helperText={formik.touched.userId && formik.errors.userId}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Grid3x3TwoTone color={formik.errors.userId ? "error" : "secondary"} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                label="New Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                name="newPassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                helperText={formik.touched.newPassword && formik.errors.newPassword}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Password color={formik.errors.newPassword ? "error" : "secondary"} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                name="confirmPassword"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Password color={formik.errors.confirmPassword ? "error" : "secondary"} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
                                Reset Password
                            </Button>
                            <Link to="/user-login">
                                <Button variant="contained" color="warning" fullWidth sx={{ mt: 2 }}>
                                    Login
                                </Button>
                            </Link>
                        </form>
                    </CardContent>
                    <Snackbar
                        open={alertMsg.open}
                        autoHideDuration={2000}
                        onClose={() => setAlertMsg({ ...alertMsg, open: false })}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        TransitionComponent={SlideSnackbar}
                    >
                        <Alert severity={alertMsg.severity} variant="filled" onClose={() => setAlertMsg({ ...alertMsg, open: false })}>
                            {alertMsg.message}
                        </Alert>
                    </Snackbar>
                </Card>
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
    );
}