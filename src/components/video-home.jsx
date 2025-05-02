import { ContactSupportTwoTone, FacebookTwoTone, HomeTwoTone, HouseTwoTone, InfoTwoTone, Instagram, LinkedIn, LocalPhoneTwoTone, LoginTwoTone, LogoutTwoTone, MenuTwoTone, SupportAgentTwoTone, Twitter } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Card, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export function VideoHome(){
    const [open, setOpen] =useState(false);
        const toggleDrawer = (newOpen) => () => {
            setOpen(newOpen);
        };
    return(
        <div className="video-home-container">
            <div className="row">
                <div className="col">
                    <AppBar position="static" style={{width:"99.2%"}}>
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
                                </div>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
            <div className="row" style={{background: 'linear-gradient(to right, #A1C4FD, #C2E9FB)'}}>
                <div className="video-home-body">
                    <div className="d-flex justify-content-center mt-4">
                        <Card className="m-4 p-4 w-50 rounded-5 custom-card" style={{backgroundColor:'rgba(0,0,0,0.2)',boxShadow:'10px 10px 10px black'}}>
                            <div className="d-flex justify-content-center align-items-center" style={{height:'50vh'}}>
                                <Button variant="contained" color="inherit" style={{boxShadow:'5px 5px 5px black'}} className="video-home-button-1 rounded-5"><Link to="/admin-login" className="text-dark fw-bold" style={{textDecoration:'none',textShadow: '0px 0px 2px white'}}>Admin Login</Link></Button>
                                <Button variant="contained" color="warning" className="ms-4 video-home-button-2 rounded-5" style={{boxShadow:'5px 5px 5px black'}}><Link to="/user-login" className="text-light fw-bold" style={{textDecoration:'none',textShadow: '0px 0px 2px black'}}>User Login</Link></Button>
                            </div>
                        </Card>
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