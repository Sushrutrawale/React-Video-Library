
import { CancelTwoTone, ModeEditTwoTone, SaveTwoTone } from "@mui/icons-material";
import { Alert, Button, FormControl, InputLabel, NativeSelect, Slide, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function SlideSnackbar(props){
  return <Slide {...props} direction="left"/>
}

export function EditVideo(){

    const [categories,setCategories] = useState([]);
    const [videos,setVideos] = useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0,Comments:[]}])
    const [alertMsg,setAlertMsg] = useState({open:false,message:" ",severity:"info"});
    
    let params =useParams();
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            VideoId:videos[0].VideoId,
            Title:videos[0].Title,
            Url:videos[0].Url,
            Description:videos[0].Description,
            Likes:videos[0].Likes,
            Dislikes:videos[0].Dislikes,
            Views:videos[0].Views,
            CategoryId:videos[0].CategoryId
        },
        onSubmit:(values)=>{
            axios.put(`http://127.0.0.1:5050/edit-video/${params.id}`,values);
            setAlertMsg({open:true, message:"Video Modified Successfully..", severity:"success"});
            setTimeout(()=>{
                navigate('/admin-dash');
            },2000);
        },
        enableReinitialize:true
    });

    function LoadCategories(){
        axios.get('http://127.0.0.1:5050/get-categories')
        .then(response=>{
            response.data.unshift({CategoryId:-1,CategoryName:'Select a Category'});
            setCategories(response.data);
            
        })
    }

    useEffect(()=>{
        LoadCategories();

        axios.get(`http://127.0.0.1:5050/get-video/${params.id}`)
            .then(response=>{
                setVideos(response.data);
            });
    },[])

    return(
        <div className="container-fluid d-flex justify-content-center align-items-center overflow-hidden">
            <div className="row p-4 mt-2 w-50 edit-video-color" >
                <h2 className="text-center mb-3"><ModeEditTwoTone className="fs-dark" fontSize="20px"/> Modify Video</h2>
                <div className="col edit-video-bg">

                </div>
                <div className="col rounded-2 bg-light border border-2 p-2 ms-3" style={{boxShadow:'4px 4px 4px black'}}>
                    <div className="overflow-auto" style={{height:'460px'}}>
                        <form className="p-2" onSubmit={formik.handleSubmit}>
                            <dl>
                                <dt className="mt-2">Video Id:</dt>
                                <dd><TextField value={formik.values.VideoId} variant="filled" label="Video Id*" name="VideoId" type="number" placeholder="Enter Id" onChange={formik.handleChange}/></dd>
                                <dt className="mt-2">Title:</dt>
                                <dd><TextField value={formik.values.Title} variant="filled" label="Title*" name="Title" placeholder="Title" onChange={formik.handleChange}/></dd>
                                <dt className="mt-2">Url:</dt>
                                <dd><TextField value={formik.values.Url} variant="filled" label="Url*" name="Url" placeholder="Url" onChange={formik.handleChange}/></dd>
                                <dt className="mt-2">Description:</dt>
                                <dd><TextField value={formik.values.Description} variant="filled" label="Description*" name="Description" placeholder="Description" multiline rows={5} onChange={formik.handleChange}/></dd>
                                <dt className="mt-2">Likes:</dt>
                                <dd><TextField value={formik.values.Likes} variant="filled" label="Likes" name="Likes" type="number" placeholder="Likes" onChange={formik.handleChange}/></dd>
                                <dt className="mt-2">Dislikes:</dt>
                                <dd><TextField value={formik.values.Dislikes} variant="filled" label="Dislikes" name="Dislikes" type="number" placeholder="Dislikes" onChange={formik.handleChange}/></dd>
                                <dt className="mt-2">Views:</dt>
                                <dd><TextField value={formik.values.Views} variant="filled" label="Views" name="Views" type="number" placeholder="Views" onChange={formik.handleChange}/></dd>
                                
                                <dd>
                                    <FormControl fullWidth className="my-2">
                                        <InputLabel>Category*</InputLabel>
                                        <NativeSelect className="p-2 mt-2" value={formik.values.CategoryId} label="Category" variant="filled" name="CategoryId" onChange={formik.handleChange}>
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
                            <Button type="submit" className="me-2" color="success" variant="contained"><SaveTwoTone className="me-1"/> Save</Button>
                            <Link to="/admin-dash"><Button color="error" variant="contained"><CancelTwoTone className="me-1"/> Cancel</Button></Link>
                        </form>   
                    </div>
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