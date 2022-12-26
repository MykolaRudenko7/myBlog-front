import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import postsSlice from './slices/postsSlice'

export default configureStore({
	reducer: {
		posts: postsSlice,
		auth: authSlice,
	},
})