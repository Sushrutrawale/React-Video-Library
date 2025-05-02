import { AccountTreeTwoTone, ChevronLeftTwoTone, ChevronRightTwoTone, ClassTwoTone, ContactSupportTwoTone, FacebookTwoTone, HomeRepairServiceTwoTone, HomeTwoTone, HouseTwoTone, InfoTwoTone, Instagram, LanguageTwoTone, LibraryBooksTwoTone, LinkedIn, LinkTwoTone, LocalPhoneTwoTone, LoginTwoTone, LogoutTwoTone, MenuTwoTone, NewspaperTwoTone, PublicTwoTone, QuestionAnswerTwoTone, QuestionMarkTwoTone, RocketLaunchTwoTone, ScubaDivingTwoTone, SupportAgentTwoTone, TipsAndUpdatesTwoTone, Twitter, VideoLibraryTwoTone } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export function About(){
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
        
    return(
        <div className="bg-light" style={{height:'100vh'}}>
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
            <div className="about-container">
                <div style={{height:'500px'}}>
                    <div className="about-background">
                        <div className="about-background-alpha">
                            <div className="card w-50" style={{backgroundColor:'transparent',border:'0',paddingTop:'10%',paddingLeft:'40px'}}>
                                <h1 className="text-light">Empowering Learners Through Technology</h1>
                                <span className="text-light fw-bold mt-4">
                                    Discover innovative ways to learn with cutting-edge tech solutions.
                                </span>
                                <div className="my-3">
                                    <button className="btn btn-primary fw-bold">Learn More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row bg-light">
                    <div className="col-5">
                        <img src="about-2.jpg" width='600' height='450'></img>
                    </div>
                    <div className="col-7">
                    <h1 className="text-dark text-center mt-5">About</h1>
                        <div className="card p-4 m-3 rounded-5 border-0" style={{boxShadow:'5px 5px 5px black'}}>
                            <p className='fw-semibold '>
                            At Tech Watch, we believe that technology should be easy to understand, exciting to learn, and accessible to everyone. We are a dynamic platform offering a wide range of video content focused on technology, programming, and software development.Your trusted destination for high-quality technology video content. We are passionate about simplifying the complex world of tech and making it accessible to everyone, from curious beginners to experienced developers.
                            </p>
                        </div>     
                    </div>
                </div>
                <div className="row" style={{backgroundColor:'lightskyblue'}}>
                    <div className="col d-flex flex-column justify-content-center align-items-center position-relative my-2">
                        <div className="h2 overflow-hidden Mission mt-2"><span>Our Mission</span><span><hr className="About-Mission-Border"/></span></div>
                        <p className="w-50 card text-light p-4 m-3 border-0" style={{backgroundColor:'rgba(0,0,0,0.7)',borderTopLeftRadius:'60px'}}>
                        To empower learners and professionals by providing clear, engaging, and practical video content that helps them understand, build, and innovate with technology. From beginners learning to code to experts exploring advanced topics — Tech Watch is your partner in continuous learning.
                        </p>
                        <div className="p-3 bg-dark rounded-circle position-absolute border-0" style={{top:'25%',right:'23%',boxShadow:'2px 2px 5px red'}}></div>
                        <div className="p-2 bg-dark rounded-circle position-absolute border-0" style={{top:'20%',right:'22%',boxShadow:'2px 2px 5px yellow'}}></div>
                    </div>
                </div>
                <div className="row bg-light"  >
                    <div className="col p-4 m-4" style={{backgroundColor:'#261f44',borderTopLeftRadius:'30%',borderBottomRightRadius:'30%',boxShadow:'0px 7px 10px black'}}>
                        <div className="text-center text-light h2">
                            What You’ll Find Here
                            <span className="w-100 border-0 d-flex justify-content-center align-content-center"><span className="w-50"><hr className="border-3 Find-border"/></span></span>
                        </div>
                        <div className="row my-2">
                            <div className="col d-flex justify-content-center align-items-center">
                                <div className="card mx-3 my-2 bg border-0 rounded-3 Card-Style" style={{width:'300px',height:'250px',boxShadow:'5px 5px black'}}>
                                    <div className="card-header border-2 border-dark bg-warning">
                                        <span className="card-title fw-bold"><ClassTwoTone/> Programming Tutorials</span>
                                    </div>
                                    <div className="card-body">
                                        <span style={{fontFamily:'gellix'}}>Learn HTML, CSS, JavaScript, Python, C#, Java, .NET, PHP, and more</span>
                                    </div>
                                </div>
                                <div className="card mx-3 my-2 bg border-0 rounded-3 Card-Style" style={{width:'300px',height:'250px',boxShadow:'5px 5px black'}}>
                                    <div className="card-header border-2 border-dark bg-warning">
                                        <span className="card-title fw-bold"><ScubaDivingTwoTone/> Tech Deep Dives</span>
                                    </div>
                                    <div className="card-body">
                                        <span style={{fontFamily:'gellix'}}>AI, machine learning, cloud computing, cybersecurity, IoT</span>
                                    </div>
                                </div>
                                <div className="card mx-3 my-2 bg border-0 rounded-3 Card-Style" style={{width:'300px',height:'250px',boxShadow:'5px 5px black'}}>
                                    <div className="card-header border-2 border-dark bg-warning">
                                        <span className="card-title fw-bold"><HomeRepairServiceTwoTone/> Frameworks & Tools</span>
                                    </div>
                                    <div className="card-body">
                                        <span style={{fontFamily:'gellix'}}>React, Angular, Node.js, Git, Docker, VS Code, and others</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col d-flex justify-content-center align-items-center">
                                <div className="card mx-3 my-2 bg border-0 rounded-3 Card-Style" style={{width:'300px',height:'250px',boxShadow:'5px 5px black'}}>
                                    <div className="card-header border-2 border-dark bg-warning">
                                        <span className="card-title fw-bold"><AccountTreeTwoTone/> Real-World Projects</span>
                                    </div>
                                    <div className="card-body">
                                        <span style={{fontFamily:'gellix'}}>Build apps, websites, and solutions from scratch</span>
                                    </div>
                                </div>
                                <div className="card mx-3 my-2 bg border-0 rounded-3 Card-Style" style={{width:'300px',height:'250px',boxShadow:'5px 5px black'}}>
                                    <div className="card-header border-2 border-dark bg-warning">
                                        <span className="card-title fw-bold"><NewspaperTwoTone/> Tech News & Trends</span>
                                    </div>
                                    <div className="card-body">
                                        <span style={{fontFamily:'gellix'}}>Stay updated with what’s shaping the future</span>
                                    </div>
                                </div>
                                <div className="card mx-3 my-2 bg border-0 rounded-3 Card-Style" style={{width:'300px',height:'250px',boxShadow:'5px 5px black'}}>
                                    <div className="card-header border-2 border-dark bg-warning">
                                        <span className="card-title fw-bold"><TipsAndUpdatesTwoTone/> Tips & Best Practices</span>
                                    </div>
                                    <div className="card-body">
                                        <span style={{fontFamily:'gellix'}}>Write cleaner code, debug faster, work smarter</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
                <div className="row bg-light">
                    <div className="col p-4 d-flex flex-column border-0 justify-content-center align-items-center"style={{background: 'linear-gradient(to right, #667eea, #764ba2)'}}>
                        <div className="carousel slide carousel-dark  border-black p-4 rounded-5" data-bs-ride="carousel" id="infoCarousel" style={{marginTop:'50px',backgroundColor:'rgba(1,1,1,0.2)'}}>
                            <div className="h2 text-center my-2">
                                Why Choose Tech Watch?
                            </div>
                            <div className="carousel-indicators">
                                <button data-bs-target="#infoCarousel" data-bs-slide-to="0" className="active"></button>
                                <button data-bs-target="#infoCarousel" data-bs-slide-to="1"></button>
                            </div>
                            <div className="d-flex justify-content-center align-items-center" style={{width:'820px'}}>
                                <Button className="carousel-control-prev but-control" data-bs-target="#infoCarousel" data-bs-slide="prev" style={{width:'55px',height:'55px',borderRadius:'50%'}}>
                                    <ChevronLeftTwoTone className="btn-left"/>
                                </Button>
                                <div className="carousel-inner">
                                    <div className="carousel-item active" data-bs-interval="5000">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="card mx-2 my-2 rounded-4 Card-Style-2" style={{width:'200px',height:'200px',backgroundColor:'rgba(0,0,0,0.5)',boxShadow:'2px 2px 5px black'}}>
                                                <div className="p-3 d-flex flex-column justify-content-center align-items-center text-light">
                                                    <span className="my-2 text-style"><VideoLibraryTwoTone/> </span>
                                                    <span className="fw-semibold text-center text-style-2">High-quality video lessons</span>
                                                </div>
                                            </div>
                                            <div className="card mx-2 my-2 rounded-4 Card-Style-2" style={{width:'200px',height:'200px',backgroundColor:'rgba(0,0,0,0.5)',boxShadow:'2px 2px 5px black'}}>
                                                <div className="p-3 d-flex flex-column justify-content-center align-items-center text-light">
                                                    <span className="my-2 text-style"><LibraryBooksTwoTone/> </span>
                                                    <span className="fw-semibold text-center text-style-2">Structured and beginner-friendly content</span>
                                                </div>
                                            </div>
                                            <div className="card mx-2 my-2 rounded-4 Card-Style-2" style={{width:'200px',height:'200px',backgroundColor:'rgba(0,0,0,0.5)',boxShadow:'2px 2px 5px black'}}>
                                                <div className="p-3 d-flex flex-column justify-content-center align-items-center text-light">
                                                    <span className="my-2 text-style"><RocketLaunchTwoTone/> </span>
                                                    <span className="fw-semibold text-center text-style-2">Focus on practical, hands-on learning</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item" data-bs-interval="5000">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="card mx-2 my-2 rounded-4 Card-Style-2" style={{width:'200px',height:'200px',backgroundColor:'rgba(0,0,0,0.5)',boxShadow:'2px 2px 5px black'}}>
                                                <div className="p-3 d-flex flex-column justify-content-center align-items-center text-light">
                                                    <span className="my-2 text-style"><PublicTwoTone/> </span>
                                                    <span className="fw-semibold text-center text-style-2">Diverse content for all experience levels</span>
                                                </div>
                                            </div>
                                            <div className="card mx-2 my-2 rounded-4 Card-Style-2" style={{width:'200px',height:'200px',backgroundColor:'rgba(0,0,0,0.5)',boxShadow:'2px 2px 5px black'}}>
                                                <div className="p-3 d-flex flex-column justify-content-center align-items-center text-light">
                                                    <span className="my-2 text-style"><QuestionAnswerTwoTone/> </span>
                                                    <span className="fw-semibold text-center text-style-2">Community-driven and support-focused</span>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                
                                <Button className="carousel-control-next but-control" data-bs-target="#infoCarousel" data-bs-slide="next" style={{width:'55px',height:'55px',borderRadius:'50%'}}>
                                    <ChevronRightTwoTone className="btn-right"/>
                                </Button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end " style={{marginTop:'60px',marginBottom:'40px'}}>
                            <div className="bg-primary p-4 m-4 w-100" style={{borderTopRightRadius:'50%',borderTopLeftRadius:'20px',borderBottomLeftRadius:'20px',borderBottomRightRadius:'50%',boxShadow:'5px 5px 10px black'}}>
                                <div className="h2 text-light">
                                    <LanguageTwoTone className="fs-1 text-black"/> Join the Tech Watch Community
                                </div>
                                <div className="d-flex">
                                    <div className="text-light p-4 rounded-5 w-50" style={{boxShadow:'3px 3px 7px black', backgroundColor:'rgba(0,0,0,0.5)'}}>
                                        <p style={{fontFamily:'gellix'}} className="fw-semibold">Be a part of a growing global network of learners, developers, and tech lovers.
                                        Subscribe now, join discussions, and start your journey into the world of technology with Tech Watch!</p>
                                    </div>
                                    <div style={{marginLeft:'20%'}} className="d-flex justify-content-center align-items-center">
                                        <Button variant="contained" color="secondary" style={{boxShadow:'3px 3px 5px black'}} className="border-0 rounded-5 join">
                                            <Link to="/user-login" className="text-decoration-none text-light fw-semibold p-2"><LanguageTwoTone className="public-two"/> Join Now</Link>
                                        </Button>
                                         
                                    </div>
                                </div>
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
        </div>
    )
}