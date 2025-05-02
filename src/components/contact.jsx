import { ContactSupportTwoTone, FacebookTwoTone, HomeTwoTone, HouseTwoTone, InfoTwoTone, Instagram, LinkedIn, LocalPhoneTwoTone, LoginTwoTone, LogoutTwoTone, MenuTwoTone, SupportAgentTwoTone, Twitter } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Contact(){
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
        
    return(
        <div>
            <AppBar position="static container-fluid">
                <Toolbar className="row ">
                    <div className="col-2">
                        <IconButton edge="start" onClick={toggleDrawer(true)}>
                            <MenuTwoTone/>
                        </IconButton> 
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            <Box
                                sx={{ width: 250 }}
                                role="presentation"
                                onClick={toggleDrawer(false)} // Close Drawer when clicking inside
                                style={{marginTop:'40%'}}
                                
                            >
                                <h2 className="py-2 ps-3">Menu</h2>
                                <List>
                                    {/* Home Link */}
                                    <ListItem component={Link} to="/" className="py-2">
                                        <ListItemIcon>
                                            <HomeTwoTone />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItem>

                                    {/* About Link */}
                                    <ListItem component={Link} to="/about" className="py-2">
                                        <ListItemIcon>
                                            <InfoTwoTone />
                                        </ListItemIcon>
                                        <ListItemText primary="About" />
                                    </ListItem>

                                    {/* Contact Link */}
                                    <ListItem component={Link} to="/contact" className="py-2">
                                        <ListItemIcon>
                                            <ContactSupportTwoTone />
                                        </ListItemIcon>
                                        <ListItemText primary="Contact" />
                                    </ListItem>

                                    {/* Service Link */}
                                    <ListItem component={Link} to="/support" className="py-2">
                                        <ListItemIcon>
                                            <SupportAgentTwoTone />
                                        </ListItemIcon>
                                        <ListItemText primary="Support" />
                                    </ListItem>
                                </List>
                            </Box>
                        </Drawer> 
                    </div>
                    <div className="d-flex justify-content-between col-10">
                        <div className="navbar">
                            <Link to="/" className="mx-2 text-decoration-none animationstyle">
                                <HomeTwoTone className="iconstyle" /> Home
                            </Link>
                            <Link to="/about" className="mx-2 text-decoration-none animationstyle">
                                <InfoTwoTone className="iconstyle" /> About
                            </Link>
                            <Link to="/contact" className="mx-2 text-decoration-none animationstyle">
                                <ContactSupportTwoTone className="iconstyle" /> Contact
                            </Link>
                            <Link to="/support" className="mx-2 text-decoration-none animationstyle">
                                <SupportAgentTwoTone className="iconstyle" /> Support
                            </Link>
                        </div>
                        <div className="mt-2">
                            <Link to="/user-login"><Button variant="contained" color="secondary" className="rounded rounded-5 text-capitalize">Login <LoginTwoTone className="ms-1"/> </Button></Link>
                            <Button variant="contained" color="warning" className="mx-2 rounded rounded-5 text-capitalize">Signout <LogoutTwoTone className="ms-1"/> </Button>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>

            <div className="contact-body">
                <div className="contact-container my-3">
                    <h1 className="contact-h1 fw-bolder">📬 Contact Tech Watch</h1>
                    <p className="intro fw-semibold">
                        We're here to assist you! Whether it's feedback, questions, or support — reach out anytime.
                    </p>

                    <div className="contact-grid p-4">
                        <div className="contact-info p-4">
                            <h3 className="fw-bolder">📧 Email</h3>
                                <p className="fw-semibold" style={{fontSize:'19px'}}>support@technologyvideo.com</p>

                            <h3 className="fw-bolder">📱 Phone</h3>
                                <p className="fw-semibold" style={{fontSize:'19px'}}>+91 12345 67890</p>

                            <h3 className="fw-bolder">💬 Chat</h3>
                                <p className="fw-semibold" style={{fontSize:'19px'}}>Live chat 9am – 6pm (Mon–Fri)</p>

                            <h3 className="fw-bolder">📍 Location</h3>
                                <p className="fw-semibold" style={{fontSize:'19px'}}>123 Tech Street, Hyderabad, India</p>
                        </div>

                        <div className="contact-img">
                            <img
                                src="contact-us.jpg"
                                alt="Contact Support"
                                className="rounded-5 border-0"
                                style={{boxShadow:'2px 2px 5px black'}}
                            />
                        </div>
                    </div>

                    {/* New Contact Support Section */}
                    <div className="support-box">
                        <h2>🛠️ Contact Support</h2>
                        <p>Need technical help? Our support team is available Monday to Friday from 9 AM to 6 PM IST.</p>
                        <p>Email us at: <strong>support@technologyvideo.com</strong></p>
                        <p>Or submit a ticket via our <a href="#" style={{ color: "#ffd86b", textDecoration: "underline" }}>Support Center</a>.</p>
                        <p>We typically respond within 24 hours on business days.</p>
                    </div>

                    {/* Map Section */}
                    <div className="map-section">
                        <iframe
                        title="Map to Tech Watch"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.4685469552533!2d78.44807399999998!3d17.437274200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c8a05d2125%3A0xee84a18a25bbfce2!2sNaresh%20i%20Technologies!5e0!3m2!1sen!2sin!4v1745509582062!5m2!1sen!2sin"
                        width="100%"
                        height="200"
                        style={{ border: "0" }}
                        allowFullScreen=""
                        loading="lazy"
                        ></iframe>
                    </div>

                    {/* Links */}
                    <div className="button-links">
                        <a href="#">FAQs</a>
                        <a href="#">Help Center</a>
                        <a href="#">Join Community</a>
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
        </div>
    )
}