import { DashboardTwoTone, DeleteTwoTone, DownloadForOfflineTwoTone, EditTwoTone, HomeTwoTone, LogoutTwoTone, MenuTwoTone, MessageTwoTone, QueueTwoTone, RemoveCircleTwoTone, SearchTwoTone, SupportAgentTwoTone, ThumbDownTwoTone, ThumbUpTwoTone, VisibilityTwoTone } from "@mui/icons-material";
import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, Drawer, IconButton, InputAdornment, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Select, TextField, Toolbar, Typography} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import { addToViewLater, removeFromViewLater } from "../slicers/video-slicer";
import store from "../store/store";

export function UserDashboard(){
    const [videos,setVideos] = useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,Comments:[],CategoryId:0}]);
    const [categories,setCategories] = useState([{CategoryId:0,CategoryName:''}]);
    const [selectedCategory, setSelectedCategory] = useState("-1");
    const [searchVideo,setSearchVideo] = useState("");
    const [cookies,setCookie,removeCookie] = useCookies();
    const [userLikedVideos, setUserLikedVideos] = useState(new Set());
    const [userDislikedVideos, setUserDislikedVideos] = useState(new Set());
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [selectedVideoForComments, setSelectedVideoForComments] = useState(null);

    let navigate = useNavigate();
    
    let dispatch = useDispatch();
    const videoCount = useSelector((state) => state.store.VideoCount);
    const VideoList = useSelector((state) => state.store.Videos);


    function LoadCategories(){
        axios.get(`http://127.0.0.1:5050/get-categories`)
        .then(response => {
            response.data.unshift({CategoryId:-1,CategoryName:'Select a Category'});
            setCategories(response.data);
        })
    }

    function LoadAllVideos(){
        axios.get(`http://127.0.0.1:5050/get-videos`)
        .then(response=>{
            setVideos(response.data);
        });
    }


    

    useEffect(()=>{
        LoadCategories();
        LoadAllVideos();
        if (selectedVideoForComments) {
            fetchComments(selectedVideoForComments.VideoId);
        }
        
        if(!cookies.username){
            navigate('/user-login');
        }

    },[cookies.username,selectedVideoForComments,navigate]);

    function handleSignout(){
        removeCookie('username');
        navigate("/user-login");
    }
    
    function formatViews(views) {
        if (views >= 1000000) {
            return (views / 1000000).toFixed(1) + "M"; 
        } else if (views >= 1000) {
            return (views / 1000).toFixed(1) + "K"; 
        }
        return views.toString(); 
    }

    function formatLikes(likes) {
        if (likes >= 1000000) {
            return (likes / 1000000).toFixed(1) + "M"; 
        } else if (likes >= 1000) {
            return (likes / 1000).toFixed(1) + "K"; 
        }
        return likes.toString(); 
    }

    function formatDislikes(dislikes) {
        if (dislikes >= 1000000) {
            return (dislikes / 1000000).toFixed(1) + "M"; 
        } else if (dislikes >= 1000) {
            return (dislikes / 1000).toFixed(1) + "K"; 
        }
        return dislikes.toString(); 
    }

    function handleCategoryChange(e){
        const categoryId = parseInt(e.target.value, 10);
        setSelectedCategory(categoryId);
        if(categoryId === -1){
            LoadAllVideos();
        }else{
            axios.get(`http://127.0.0.1:5050/filter-videos/${categoryId}`)
            .then(response => {
                setVideos(response.data);
            })
        }
    }
    
    function handleSearch(e){
        setSearchVideo(e.target.value);
    }

    const filteredVideos = videos.filter(video=>
        video.Title.toLowerCase().includes(searchVideo.toLowerCase())
    );

    function handleClickSaveLater(video) {
        const isAlreadyAdded = VideoList.some(item => item.VideoId === video.VideoId);
        if (!isAlreadyAdded) {
            const videoData = {
                VideoId: video.VideoId,
                Title: video.Title,
                Url: video.Url,
            };
            dispatch(addToViewLater(videoData));
        }
    }

    function openModal() {
        const myModal = new Modal(document.getElementById("watchLater"));
        myModal.show();
    }

    function handleRemoveClick(videoId){
        dispatch(removeFromViewLater(videoId)); 
    }
    
    function handleModalClose() {
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
    }





    function handleLike(video) {
        const videoId = video.VideoId;
    
        if (userLikedVideos.has(videoId)) {
            // If already liked → Remove like only
            updateDatabase(videoId, -1, 0);
            setUserLikedVideos(prev => {
                const newSet = new Set(prev);
                newSet.delete(videoId);
                return newSet;
            });
        } else {
            let likeChange = 1;
            let dislikeChange = 0;
    
            if (userDislikedVideos.has(videoId)) {
                dislikeChange = -1; // Remove dislike
                setUserDislikedVideos(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(videoId);
                    return newSet;
                });
            }
    
            updateDatabase(videoId, likeChange, dislikeChange);
            setUserLikedVideos(prev => {
                const newSet = new Set(prev);
                newSet.add(videoId);
                return newSet;
            });
        }
    }
    
    function handleDislike(video) {
        const videoId = video.VideoId;
    
        if (userDislikedVideos.has(videoId)) {
            // If already disliked → Remove dislike only
            updateDatabase(videoId, 0, -1);
            setUserDislikedVideos(prev => {
                const newSet = new Set(prev);
                newSet.delete(videoId);
                return newSet;
            });
        } else {
            let likeChange = 0;
            let dislikeChange = 1;
    
            if (userLikedVideos.has(videoId)) {
                likeChange = -1; // Remove like
                setUserLikedVideos(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(videoId);
                    return newSet;
                });
            }
    
            updateDatabase(videoId, likeChange, dislikeChange);
            setUserDislikedVideos(prev => {
                const newSet = new Set(prev);
                newSet.add(videoId);
                return newSet;
            });
        }
    }

    function updateDatabase(videoId, likeChange, dislikeChange) {
        axios.put(`http://127.0.0.1:5050/update-likes/${videoId}`, {
            VideoId: videoId,
            LikeChange: likeChange,
            DislikeChange: dislikeChange
        }).then(() => {
            LoadAllVideos();  // Refresh data after update
        })
    }

   
    function fetchComments(videoId) {
        axios
            .get(`http://127.0.0.1:5050/get-comments/${videoId}`)
            .then((response) => {
                setComments(response.data.Comments);
            });
    }

    function handleCommentSubmit(videoId) {
        if (comment.trim() === "") {
            alert("Comment cannot be empty");
            return;
        }

        const newComment = {
            UserName: cookies.username,
            CommentText: comment,
            Timestamp: new Date().toISOString(),
        };

        axios
            .post(`http://127.0.0.1:5050/add-comment/${videoId}`, newComment)
            .then(() => {
                setComment("");
                fetchComments(videoId);
            });
    }


    const [open, setOpen] =useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    

    return(
        <div className="bg-light" style={{height:'87.9vh'}}>
            <AppBar position="static">
                <Toolbar className="row container-fluid">
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
                                            <EditTwoTone />
                                        </ListItemIcon>
                                        <ListItemText primary="About" />
                                    </ListItem>

                                    {/* Contact Link */}
                                    <ListItem component={Link} to="/contact" className="py-2">
                                        <ListItemIcon>
                                            <MessageTwoTone />
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

                                    {/* Dashboard Link */}
                                    <ListItem component={Link} to="/user-dash" className="py-2">
                                        <ListItemIcon>
                                            <DashboardTwoTone />
                                        </ListItemIcon>
                                        <ListItemText primary="Dashboard" />
                                    </ListItem>

                                </List>
                            </Box>
                        </Drawer> 
                    </div>
                    <div className="d-flex justify-content-between col-10">
                        
                        <span className="h3 fw-bold"> Dashboard</span>
                        
                    
                        <Button variant="contained" color="warning" onClick={handleSignout} className="rounded-5">Sign out <LogoutTwoTone/> </Button>
                        
                    </div>
                </Toolbar>
            </AppBar>
            <div className="row container-fluid">
                <div className="col-2" style={{boxShadow:'2px 2px 2px black'}}>
                    <div>
                        <label className="mt-4 fw-bold">Search Videos</label>
                        <TextField className="mt-1" placeholder="Search Video" value={searchVideo} onChange={handleSearch} slotProps={{
                            input:{
                                startAdornment:(
                                    <InputAdornment position="start">
                                        <IconButton color="primary" edge="start"> 
                                            <SearchTwoTone style={{fontSize:"25px"}}/>
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}/>
                    </div>
                    <div>
                        <label className="mt-4 fw-bold">Select Category</label>
                        <Select native  fullWidth className="mt-1" onChange={handleCategoryChange} value={selectedCategory} >
                            {
                                categories.map(category=>
                                    <option key={category.CategoryId} value={category.CategoryId}>
                                        {category.CategoryName}
                                    </option>
                                )
                            }
                        </Select>
                            
                        
                    </div>
                </div>
                <div className="col-10">
                    <div className="mt-2 mb-2 d-flex justify-content-between">
                        <span className="h4 fw-bold user-text-animation">Hello ! {cookies.username}</span>
                        <span>
                            <IconButton onClick={openModal} className="position-relative" data-bs-target="#watchLater" data-bs-toggle="modal">
                                        
                                <QueueTwoTone className="text-dark fs-3"/>
                                <span className="badge rounded position-absolute rounded-5 bg-danger" style={{fontSize:'14px',top:'0px',right:'-10px'}}>{videoCount}</span>
                                
                            </IconButton>
                            <div className="modal fade" id="watchLater">
                                    <div className="modal-dialog modal-fullscreen">
                                        <div className="modal-content">
                                            <div className="modal-header p-2 m-2" style={{boxShadow:'5px 5px 5px black',backgroundColor:'darkviolet'}}>
                                                <h3 className="fw-bold">Watch Later</h3>
                                                <button className="btn btn-close " data-bs-dismiss="modal" onClick={handleModalClose}></button>
                                            </div>
                                            <div className="modal-body" >
                                                <table className="table table-hover">
                                                    <thead className="table-primary">
                                                        <tr>
                                                            <th className="text-center">Title</th>
                                                            <th className="text-center">Preview</th>
                                                            <th className="text-center">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            VideoList.map(item => (
                                                                <tr key={item.VideoId}>
                                                                    <td className="text-center">
                                                                        {item.Title}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <iframe src={item.Url} width="300px" height="150px"/>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <IconButton onClick={()=>handleRemoveClick(item.VideoId)}>
                                                                            <RemoveCircleTwoTone color="error"/>
                                                                        </IconButton>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                    
                                                </table>
                                            </div>
                                            <div className="modal-footer">
                                            <Button variant="contained" color="error" data-bs-dismiss="modal" className="float-end my-2" onClick={handleModalClose}>cancel</Button>
                                            </div>
                                        </div>

                                    </div>
                            </div>
                        </span>
                    </div>
                    <div className="overflow-auto" style={{height:"510px"}}>
                        <section className="mt-1 d-flex flex-wrap">
                            {
                                filteredVideos.map(video=>(
                                    <Card key={video.VideoId} sx={{ maxWidth: 300 }} className="mx-4 my-2 border border-dark user-card" style={{boxShadow:'2px 2px 2px black',height:'400px'}}>
                                        <CardMedia sx={{height:140}}>
                                        {video.Url ? (
                                            <iframe 
                                                src={video.Url} 
                                                width="304px" 
                                                height="140px" 
                                                className="user-card-url overflow-hidden"
                                            ></iframe>
                                        ) : (
                                            <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", paddingTop: "50px" }}>
                                                No Video Available
                                            </Typography>
                                        )}
                                        </CardMedia>
                                        <CardContent sx={{height:140}} className="overflow-auto">
                                            <Typography gutterBottom variant="h7" component="div" className="fw-bold">
                                                {video.Title}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }} >
                                            {
                                                video.Description
                                            }
                                            </Typography>
                                            
                                        </CardContent>
                                        <div className="container-fluid">
                                            <VisibilityTwoTone className="fs-5" color="error"/><span className="text-black fw-bold ms-1" style={{fontSize:"15px"}}>{formatViews(video.Views)}</span>
                                        </div>
                                        <CardActions className="d-flex justify-content-between">
                                            <div>
                                                <IconButton className="user-dash-button" onClick={() => handleLike(video)} color={userLikedVideos.has(video.VideoId) ? "primary" : "default"}>
                                                    <ThumbUpTwoTone className="fs-5"/>
                                                </IconButton>
                                                <span className="text-black fw-bold" style={{fontSize:"15px"}}>{formatLikes(video.Likes)}</span>
                                                <IconButton className="user-dash-button" onClick={() => handleDislike(video)} color={userDislikedVideos.has(video.VideoId) ? "secondary" : "default"}>
                                                    <ThumbDownTwoTone className="fs-5"/>
                                                </IconButton>
                                                <span className="text-black fw-bold" style={{fontSize:"15px"}} >{formatDislikes(video.Dislikes)}</span>
                                            </div>
                                            <IconButton className="user-dash-button"
                                            onClick={() => {
                                                setSelectedVideoForComments(video); // Set the selected video
                                                setIsCommentModalOpen(true); // Open the modal
                                                fetchComments(video.VideoId); // Fetch comments for the video
                                            }}
                                            >
                                                <MessageTwoTone className="fs-5"/>
                                            </IconButton>
                                            {/* Comment Menu */}
                                            <Modal
                                            open={isCommentModalOpen}
                                            onClose={() => setIsCommentModalOpen(false)}
                                            aria-labelledby="comment-modal-title"
                                            aria-describedby="comment-modal-description"
                                        >
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, -50%)',
                                                    width: 400,
                                                    bgcolor: 'background.paper',
                                                    boxShadow: 24,
                                                    p: 4,
                                                    borderRadius: 2,
                                                    maxHeight: '550px', // Set a maximum height for the modal
                                                    overflowY: 'auto',  // Enable vertical scroll within the modal
                                                }}
                                            >
                                                <Typography id="comment-modal-title" variant="h6" component="h2" gutterBottom>
                                                    Comments for {selectedVideoForComments?.Title}
                                                </Typography>

                                                {/* Comments Display - Now with scroll */}
                                                <Box id="comment-modal-description" sx={{ mt: 2, overflowY: 'auto', maxHeight: '250px' }} className="border border-black p-2"> {/* Set max height for comments */}
                                                    {comments.map((comment, index) => (
                                                        comment && comment.UserName ? ( // Check if comment exists AND has a UserName
                                                            <Box key={index} sx={{ mb: 2 }}>
                                                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                                    {comment.UserName}:
                                                                </Typography>
                                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                                    {comment.CommentText}
                                                                </Typography>
                                                            </Box>
                                                        ) : null
                                                    ))}
                                                </Box>

                                                {/* Comment Input and Button (Static) */}
                                                <TextField
                                                    fullWidth
                                                    placeholder="Add a comment"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    sx={{ mt: 2 }}
                                                />
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleCommentSubmit(selectedVideoForComments.VideoId)}
                                                    sx={{ mt: 2 }}
                                                >
                                                    Post Comment
                                                </Button>
                                            </Box>
                                        </Modal>
                                            
                                            
                                           
                                        </CardActions>
                                        <div className="text-center">
                                            <Button style={{height:'20px'}} className="mb-2" onClick={()=> handleClickSaveLater(video)}><DownloadForOfflineTwoTone className="user-dash-button" /><span className="fs-6 fw-bold text-lowercase">Watch later</span></Button>
                                        </div>
                                    </Card>
                                ))
                            }
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}