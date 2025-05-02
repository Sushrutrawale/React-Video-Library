import { CancelTwoTone, DuoTwoTone, VideoCallTwoTone } from "@mui/icons-material";
import { Alert, Button, FormControl, InputLabel, NativeSelect, Slide, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SlideSnackbar(props){
  return <Slide {...props} direction="left"/>
}

export function AddVideos(){
    const [categories,setCategories] = useState([{CategoryId:0,CategoryName:''}]);
    const [alertMsg,setAlertMsg] = useState({open:false,message:" ",severity:"info"});
    let navigate = useNavigate();

    const validationSchema = Yup.object({
        VideoId: Yup.number().positive("Video ID must be positive").required("Video ID is required"),
        Title: Yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
        Url: Yup.string().url("Enter a valid URL").required("URL is required"),
        Description: Yup.string().min(10, "Description must be at least 10 characters").required("Description is required"),
        Likes: Yup.number().min(0, "Likes cannot be negative").required("Likes are required"),
        Dislikes: Yup.number().min(0, "Dislikes cannot be negative").required("Dislikes are required"),
        Views: Yup.number().min(0, "Views cannot be negative").required("Views are required"),
        CategoryId: Yup.number().min(1, "Please select a valid category").required("Category is required"),
      });

    const formik = useFormik({
        initialValues:{
            VideoId:0,
            Title:'',
            Url:'',
            Description:'',
            Likes:0,
            Dislikes:0,
            Views:0,
            CategoryId:0
        },
        validationSchema,
        onSubmit:(video)=>{
            axios.post('http://127.0.0.1:5050/add-video',video);
            setAlertMsg({open:true, message:"Video Added Successfully..", severity:"success"});
            setTimeout(()=>{
                navigate('/admin-dash');
            },2000);
        }
    })

    useEffect(()=>{
        axios.get('http://127.0.0.1:5050/get-categories')
        .then(response=>{
            response.data.unshift({
                CategoryId:-1,
                CategoryName:'Select Category'
            });
            setCategories(response.data);
        });
    },[])

    return(
        <div className="container-fluid d-flex justify-content-center align-items-center overflow-hidden">
            <div className="row p-4 mt-3 w-50 bg-dark text-light" style={{boxShadow:'0px 5px 5px blue'}}>
                <h2 className="text-center mb-3"><DuoTwoTone color="primary" fontSize="20px"/> Add New Video</h2>
                <div className="col bg-light border border-2 p-2 me-3" style={{boxShadow:'0px 0px 4px white'}}>
                    <div className="overflow-auto" style={{height:'460px'}}>
                        <form className="p-2" onSubmit={formik.handleSubmit}>
                            <dl>
                                <dt className="mt-2 text-dark">Video Id:</dt>
                                <dd><TextField variant="filled" label="Video Id*" name="VideoId" type="number" placeholder="Enter Id" onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.VideoId && Boolean(formik.errors.VideoId)} helperText={formik.touched.VideoId && formik.errors.VideoId}/></dd>
                                <dt className="mt-2 text-dark">Title:</dt>
                                <dd><TextField variant="filled" label="Title*" name="Title" placeholder="Title" onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.Title && Boolean(formik.errors.Title)} helperText={formik.touched.Title && formik.errors.Title}/></dd>
                                <dt className="mt-2 text-dark">Url:</dt>
                                <dd><TextField variant="filled" label="Url*" name="Url" placeholder="Url" onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.Url && Boolean(formik.errors.Url)} helperText={formik.touched.Url && formik.errors.Url}/></dd>
                                <dt className="mt-2 text-dark">Description:</dt>
                                <dd><TextField variant="filled" label="Description*" name="Description" placeholder="Description" multiline rows={5} onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.Description && Boolean(formik.errors.Description)} helperText={formik.touched.Description && formik.errors.Description}/></dd>
                                <dt className="mt-2 text-dark">Likes:</dt>
                                <dd><TextField variant="filled" label="Likes" name="Likes" type="number" placeholder="Likes" onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.Likes && Boolean(formik.errors.Likes)} helperText={formik.touched.Likes && formik.errors.Likes}/></dd>
                                <dt className="mt-2 text-dark">Dislikes:</dt>
                                <dd><TextField variant="filled" label="Dislikes" name="Dislikes" type="number" placeholder="Dislikes" onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.Dislikes && Boolean(formik.errors.Dislikes)} helperText={formik.touched.Dislikes && formik.errors.Dislikes}/></dd>
                                <dt className="mt-2 text-dark">Views:</dt>
                                <dd><TextField variant="filled" label="Views" name="Views" type="number" placeholder="Views" onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.Views && Boolean(formik.errors.Views)} helperText={formik.touched.Views && formik.errors.Views}/></dd>
                                
                                <dd className="mb-4">
                                    <FormControl fullWidth>
                                        <InputLabel className="mt-2">Category*</InputLabel>
                                        <NativeSelect className="p-1" label="Category" variant="filled" name="CategoryId" onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.touched.CategoryId && Boolean(formik.errors.CategoryId)} helperText={formik.touched.CategoryId && formik.errors.CategoryId}>
                                            {
                                                categories.map(category=>(
                                                    <option key={category.CategoryId} value={category.CategoryId}>
                                                        {category.CategoryName}
                                                    </option>
                                                ))
                                            }
                                        </NativeSelect>
                                    </FormControl>
                                </dd>
                            </dl>
                            <Button type="submit" className="me-2" color="success" variant="contained"><VideoCallTwoTone className="me-1"/> Add</Button>
                            <Link to="/admin-dash"><Button color="error" variant="contained"><CancelTwoTone className="me-1"/> Cancel</Button></Link>
                        </form>   
                    </div>
                </div>
                <div className="col add-video-bg">

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