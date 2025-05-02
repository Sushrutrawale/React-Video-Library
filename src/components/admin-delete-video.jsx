import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Slide, Snackbar } from "@mui/material";
import axios from "axios";
import { CancelTwoTone, DeleteTwoTone } from "@mui/icons-material";

function SlideSnackbar(props){
    return <Slide {...props} direction="left"/>
}

export function VideoDelete(){

    const [videos,setVideos] = useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0,Comments:[]}])
    const [alertMsg,setAlertMsg] = useState({open:false,message:" ",severity:"info"});
    
    let params =useParams();
    let navigate = useNavigate();

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:5050/delete-video/${params.id}`);
        setAlertMsg({open:true,message:"Video Deleted Successfully...",severity:"success"});
        setTimeout(()=>{
            navigate("/admin-dash");
        },2000)
    };

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5050/get-video/${params.id}`)
        .then(response=>{
            setVideos(response.data);
        })
    },[])

    return(
        <div className="container-fluid d-flex justify-content-center align-items-center w-50">
            <div className="bg-light p-4 m-4">
                <h2 className="text-danger">Are you sure, want to delete?</h2>
                <div className="border border-3 border-dark rounded-5 p-4 m-2">
                    <dl className="my-4">
                        <dt>Title :</dt>
                        <dd>{videos[0].Title}</dd>
                        <dt>Description :</dt>
                        <dd>{videos[0].Description}</dd>
                    </dl>
                    <Button className="me-3" onClick={handleDeleteClick} variant="contained" color="warning"><DeleteTwoTone className="me-1" /> Delete</Button>
                    <Link to="/admin-dash"><Button variant="contained" color="error"><CancelTwoTone className="me-1"/> Cancel</Button></Link>
                </div>
            </div>
            <Snackbar open={alertMsg.open} autoHideDuration={1000} onClose={() => setAlertMsg({ ...alertMsg, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "right" }} TransitionComponent={SlideSnackbar}>
                <Alert severity={alertMsg.severity} variant="filled" onClose={() => setAlertMsg({ ...alertMsg, open: false })}>
                {alertMsg.message}
                </Alert>
            </Snackbar>
        </div>
    )
}