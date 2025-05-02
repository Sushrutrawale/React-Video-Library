import { createSlice } from "@reduxjs/toolkit"

const initialState={
    Videos:[],
    VideoCount:0
}

const videoSlicer = createSlice({
    name:'VideoSlice',
    initialState,
    reducers:{
        addToViewLater:(state,action)=>{
            state.Videos.push(action.payload);
            state.VideoCount = state.Videos.length;
        },
        removeFromViewLater:(state,action)=>{
            state.Videos = state.Videos.filter(video => video.VideoId !== action.payload);
            state.VideoCount = state.Videos.length;
        }
    }
})

export const {addToViewLater,removeFromViewLater} = videoSlicer.actions;
export default videoSlicer.reducer;