import { CategoryTwoTone, DeleteTwoTone, EditTwoTone, HomeTwoTone, ListTwoTone, LogoutTwoTone, VideocamTwoTone } from "@mui/icons-material";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function AdminDashboard(){

    const [videos,setVideos] = useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0,Comments:[]}]);
    const [cookies,setcookie,removecookie] = useCookies(['admin']);
    let navigate = useNavigate();

    function handleSignout(){
        removecookie('admin');
        navigate("/admin-login");
    };

    useEffect(()=>{
        axios.get("http://127.0.0.1:5050/get-videos")
        .then(response=>{
            setVideos(response.data);
        });

        if(!cookies.admin){
            navigate("/admin-login");
        }

    },[cookies.admin,navigate]);

    return(
        <div className="container-fluid bg-light" style={{height:'650px'}}>
            <div className="row">

                <div className="col-2 p-2">
                    <div className="pt-2">
                        <Button><ListTwoTone className="text-dark"/></Button>
                    </div>
                    <div style={{backgroundColor:'rgba(0, 0, 0, 0.1)'}} className="mt-4">
                        <ul className="list-unstyled p-4">
                            <li className="my-3"><HomeTwoTone/> <Link to="/" onClick={handleSignout}>Home</Link></li>
                        </ul>
                    </div>
                </div>



                <div className="col-10 p-2 overflow-hidden">
                    <div className="d-flex justify-content-between">
                        <h2>Dashboard</h2>
                        <Button variant="contained" color="warning" onClick={handleSignout} className="text-capitalize fs-6 fw-bold rounded-5">Signout <LogoutTwoTone className="text-dark"/></Button>
                    </div>
                    <div>
                    <Link to="/add-video" className="p-2 me-1"><Button variant="contained" color="primary" className="text-capitalize fs-6 fw-bold rounded-3"><VideocamTwoTone className="me-1"/> Add Video</Button></Link>
                    <Link to="/add-category"><Button variant="contained" color="success" className="text-capitalize fs-6 fw-bold rounded-3"><CategoryTwoTone className="me-1"/> Add Category</Button></Link>
                    </div>
                    <div className="mt-4 overflow-auto" style={{height:'470px'}}>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">Title</th>
                                    <th className="text-center">Preview</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    videos.map(video=>
                                        <tr key={video.VideoId}>
                                            <td className="text-center">{video.Title}</td>
                                            <td className="text-center"><iframe src={video.Url} width="300px" height="150px"/></td>
                                            <td className="text-center">
                                                <Link to={`/edit-video/${video.VideoId}`}><Button className="me-2" color="warning" variant="contained"><EditTwoTone/> </Button></Link>
                                                <Link to={`/delete-video/${video.VideoId}`}><Button color="error" variant="contained"><DeleteTwoTone /></Button></Link>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}