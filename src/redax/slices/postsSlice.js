import { createSlice } from '@reduxjs/toolkit'
//
//
//
//
//
export const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		posts: {
			items: [],
			status: 'loading',
		},
		tags: {
			items: [],
			status: 'loading',
		},
	},

	reducers: {
		decrement: (state) => {
			state.value -= 1
		},
	},
})

// export const { } = postsSlice.actions

export default postsSlice.reducer