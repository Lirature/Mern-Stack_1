import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.user = action.payload
            // console.log("Users", action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUsers } = userSlice.actions

export default userSlice.reducer
