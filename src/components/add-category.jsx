import {  AddCircleTwoTone, CancelTwoTone, CategoryTwoTone, DeleteTwoTone, EditTwoTone } from "@mui/icons-material";
import { Alert, Button, NativeSelect, Slide, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function SlideSnackbar(props){
    return <Slide {...props} direction="left"/>
}

export function AddCategory(){

    const [categories,setCategories] = useState([{CategoryId:0,CategoryName:''}]);
    const [alertMsg,setAlertMsg] = useState({open:false, message:'', severity:'info'});

    const validationSchema = yup.object({
        CategoryId:yup.number().positive("Category ID must be positive").required("Category ID is required"),
        CategoryName:yup.string().min(3, "Category Name must be at least 3 characters").required("Category Name is required"),
    })

    useEffect(()=>{
        LoadCategories();

    },[]);

    const formik = useFormik({
        initialValues:{
            CategoryId:0,
            CategoryName:''
        },
        validationSchema,
        onSubmit:(category)=>{
            axios.post(`http://127.0.0.1:5050/add-category`,category);
            setAlertMsg({open:true, message:"Category Added Successfully..",severity: "success"});   
            LoadCategories();
        },
    })

    function LoadCategories(){
        axios.get(`http://127.0.0.1:5050/get-categories`)
        .then(response=>{
            setCategories(response.data);
        });
    }


    return(
        <div className="container-fluid w-50 mt-3">
            <div className="bg-light p-4 rounded-5 row" style={{boxShadow:'10px 10px 10px black'}}>
                <div className="col-6">
                    <div className="border border-2 border-black p-4 mt-2" style={{boxShadow:'4px 4px 4px black'}}>
                        <h2 className="text-success"><CategoryTwoTone className="me-1" color="success"/> Add Category</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <dl>
                                <dt className="mt-2">Category Id:</dt>
                                <dd><TextField onChange={formik.handleChange} variant="filled" label="Category Id*" name="CategoryId" type="number" placeholder="Category Id" onBlur={formik.handleBlur} error={formik.touched.CategoryId && Boolean(formik.errors.CategoryId)} helperText={formik.touched.CategoryId && formik.errors.CategoryId}/> </dd>
                                <dt className="mt-2">Category Name:</dt>
                                <dd><TextField onChange={formik.handleChange} variant="filled" label="Category Name*" name="CategoryName" placeholder="Enter Name" onBlur={formik.handleBlur} error={formik.touched.CategoryName && Boolean(formik.errors.CategoryName)} helperText={formik.touched.CategoryName && formik.errors.CategoryName}/></dd>
                            </dl>
                            <Button type="submit" variant="contained" color="primary"><AddCircleTwoTone className="me-1"/> Add</Button>
                            <Link to="/admin-dash" className="ms-2"><Button variant="contained" color="error"><CancelTwoTone className="me-1"/> Cancel</Button></Link>
                        </form>
                    </div>
                </div>
                <div className="mt-2 col-6 d-flex justify-content-center align-items-center">
                    <div className="w-100">
                        <div className="border border-3 border-danger p-2 overflow-auto" style={{height:'400px'}}>
                            <table className="table table-hover" >
                                <thead>
                                    <tr>
                                        <th className="col-8 ">Title</th>
                                        <th className="col-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories.map(category=>(
                                            <tr key={category.CategoryId}>
                                                <td>{category.CategoryName}</td>
                                                <td className="d-flex">
                                                    <Link to={`/edit-category/${category.CategoryId}`}><Button><EditTwoTone/></Button></Link>
                                                    <Link to={`/delete-category/${category.CategoryId}`}><Button><DeleteTwoTone color="error"/></Button></Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Snackbar open={alertMsg.open} autoHideDuration={1000} onClose={ ()=> setAlertMsg({...alertMsg, open:false})}
            anchorOrigin={{vertical:"top",horizontal:"right"}} TransitionComponent={SlideSnackbar} >
                <Alert severity={alertMsg.severity} variant="filled" onClose={ ()=> setAlertMsg({...alertMsg, open:false}) }>
                    {alertMsg.message}
                </Alert>
            </Snackbar>
        </div>
    )
}