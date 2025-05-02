import { CancelTwoTone, CategoryTwoTone, SaveTwoTone } from "@mui/icons-material";
import { Alert, Button, Slide, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function SlideSnackbar(props){
    return <Slide {...props} direction="left"/>
}

export function EditCategory(){
    const[category,setCategory] = useState([{CategoryId:0,CategoryName:''}]);
    const [alertMsg,setAlertMsg] = useState({open:false, message:"", severity:"info"});

    let params = useParams();
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            CategoryId: category[0].CategoryId,
            CategoryName: category[0].CategoryName
        },
        onSubmit:(value)=>{
            axios.put(`http://127.0.0.1:5050/edit-category/${params.id}`,value);
            setAlertMsg({open:true, message:"Modified successfully", severity:"success"})
            setTimeout(()=>{
                navigate("/add-category");
            },2000)
        },
        enableReinitialize:true
    }); 

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5050/get-category/${params.id}`)
        .then(response=>{
            setCategory(response.data);
        })
    },[params.id]);

    return(
        <div className="container-fluid w-50 mt-4">
            <div className="bg-light d-flex justify-content-center py-4">
                <div className="border border-2 border-black p-4 mt-2" style={{boxShadow:'4px 4px 4px black'}}>
                    <h2 className="text-success"><CategoryTwoTone className="me-1" color="success"/> Edit Category</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <dl>
                            <dt className="mt-2">Category Id:</dt>
                            <dd><TextField onChange={formik.handleChange} value={formik.values.CategoryId} variant="filled" label="Category Id*" name="CategoryId" type="number" placeholder="Category Id"/> </dd>
                            <dt className="mt-2">Category Name:</dt>
                            <dd><TextField onChange={formik.handleChange} value={formik.values.CategoryName} variant="filled" label="Category Name*" name="CategoryName" placeholder="Enter Name"/></dd>
                        </dl>
                        <Button type="submit" variant="contained" color="success"><SaveTwoTone className="me-1"/> Save</Button>
                        <Link to="/add-category" className="ms-2"><Button variant="contained" color="error"><CancelTwoTone className="me-1"/> Cancel</Button></Link>
                    </form>
                </div>
            </div>
            <Snackbar open={alertMsg.open} autoHideDuration={1000} onClose={ () => setAlertMsg({...alertMsg,open:false})}
            anchorOrigin={{vertical:"top",horizontal:"right"}} TransitionComponent={SlideSnackbar}>
                <Alert severity={alertMsg.severity} variant="filled" onClose={() => setAlertMsg({...alertMsg,open:false})}>
                    {alertMsg.message}
                </Alert>
            </Snackbar>
        </div>
    )
}