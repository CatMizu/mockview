// src/features/common/userSlice.ts
import { APIResponse, UserProfile } from '@/helper/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


export const getUserInfo = createAsyncThunk<UserProfile, void>(
    "user/getUserInfo",
    async (thunkApi) => {
        // const response = await axios.get<APIResponse>("/workspace/home");
        // return response.data.payload;
        return {name: "Jianhao", avatar : "https://reqres.in/img/faces/7-image.jpg", emailId : "demo@gmail.com"}
    }
  );

const initialState: UserProfile = {
    name: "",
    avatar: "",
    emailId: "",
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.emailId = action.payload;
          }
    },

    extraReducers: (builder) => {
        builder.addCase(getUserInfo.pending, (state) => {
            
        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            console.log(action.payload)
            state.name = action.payload.name
            state.avatar = action.payload.avatar
            state.emailId = action.payload.emailId; 
        });
        builder.addCase(getUserInfo.rejected, (state) => {
            
        });
    }
});

export const { setEmail } = userSlice.actions;

export default userSlice.reducer;
