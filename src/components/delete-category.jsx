
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Slide, Snackbar } from "@mui/material";
import axios from "axios";
import { CancelTwoTone, DeleteTwoTone } from "@mui/icons-material";

function SlideSnackbar(props){
    return <Slide {...props} direction="left"/>
}

export function CategoryDelete(){

    const[category,setCategory] = useState([{CategoryId:0,CategoryName:''}]);
    const [alertMsg,setAlertMsg] = useState({open:false, message:"", severity:"info"});
    
    let params =useParams();
    let navigate = useNavigate();

    function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:5050/delete-category/${params.id}`);
        setAlertMsg({open:true,message:"Category Deleted Successfully..",severity:"success"});
        setTimeout(()=>{
            navigate("/add-category");
        },2000)
    };

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5050/get-category/${params.id}`)
        .then(response=>{
            setCategory(response.data);
        })
    },[params.id]);

    return(
        <div className="container-fluid d-flex justify-content-center align-items-center w-50">
            <div className="bg-light p-4 m-4">
                <h2 className="text-danger">Are you sure, want to delete?</h2>
                <div className="border border-3 border-dark rounded-5 p-4 m-2">
                    <dl className="my-4">
                        <dt>Title :</dt>
                        <dd>{category[0].CategoryName}</dd>
                    </dl>
                    <Button className="me-3" onClick={handleDeleteClick} variant="contained" color="warning"><DeleteTwoTone className="me-1" /> Delete</Button>
                    <Link to="/add-category"><Button variant="contained" color="error"><CancelTwoTone className="me-1"/> Cancel</Button></Link>
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