import { ContactSupportTwoTone, HomeTwoTone, InfoTwoTone, LoginTwoTone, LogoutTwoTone, MenuTwoTone, SupportAgentTwoTone, ExpandMoreTwoTone, HouseTwoTone, LocalPhoneTwoTone, FacebookTwoTone, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Accordion, AccordionSummary, AccordionDetails, Typography} from "@mui/material";

export function Support(){
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const [expanded, setExpanded] = useState(null);
    const faqs = [
        {
        question: "How can I reset my password?",
        answer:
            "Click 'Forgot Password' on the login screen. Follow the email instructions to reset your password securely.",
        },
        {
        question: "Where can I find course materials?",
        answer:
            "All video tutorials and documents are available in your dashboard under 'My Courses'.",
        },
        {
        question: "Can I suggest a new video topic?",
        answer:
            "Absolutely! Use our contact form or email us directly — we love your feedback.",
        },
    ];
    const handleAccordionChange = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
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

            <div className="support-body">
                <div className="support-container">
                    <h1 className="support-h1 fw-bolder">🛠️ Tech Watch Support</h1>
                    <p className="support-p">
                        Get help instantly. We're always here to support your learning goals.
                    </p>

                    <div className="support-section">
                        <div className="support-card">
                        <h3>📩 Email Support</h3>
                        <p className="support-p">
                            Write to us at <strong>support@technologyvideo.com</strong> — we respond
                            within 24 hours.
                        </p>
                        </div>
                        <div className="support-card">
                        <h3>💬 Live Chat</h3>
                        <p className="support-p">
                            Chat with our team from 9 AM – 6 PM IST (Mon–Fri) by clicking the
                            help icon.
                        </p>
                        </div>
                        <div className="support-card">
                        <h3>📖 Knowledge Base</h3>
                        <p className="support-p">
                            Explore how-to guides, walkthroughs, and learning resources anytime.
                        </p>
                        </div>
                    </div>

                    <div style={{ marginTop: "50px" }}>
                        <h2 className="support-h2 fw-bold">Frequently Asked Questions</h2>
                        {faqs.map((faq, index) => (
                        <Accordion
                            expanded={expanded === index}
                            onChange={handleAccordionChange(index)}
                            key={index}
                            style={{ margin: "10px 0" }}
                        >
                            <AccordionSummary expandIcon={<ExpandMoreTwoTone />}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {faq.question}
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>{faq.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        ))}
                    </div>

                    <div className="support-contact-section">
                        <h2 className="support-h2 fw-bold">Need More Help?</h2>
                        <p className="support-p">Click below to submit a support request.</p>
                        <button onClick={() => alert("Redirecting to support form...")} className="support-button">
                        Submit Support Ticket
                        </button>
                    </div>

                    <div className="extra-content">
                        <h2 className="support-h2 fw-semibold">📌 Platform Standards & Policies</h2>
                        <p className="support-p">
                        At Tech Watch, we adhere to a high standard of quality and integrity.
                        All content is reviewed regularly to ensure accuracy, relevance, and
                        clarity.
                        </p>
                        <p className="support-p">
                        We also value learner feedback. Support requests, feature suggestions,
                        and reported bugs are handled by a dedicated team with a resolution
                        time of 24–48 hours.
                        </p>
                        <p className="support-p">
                        <strong>Reminder:</strong> Keep your email and password secure. We
                        will never ask for your credentials through email or chat.
                        </p>
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