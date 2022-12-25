import { configureStore } from '@reduxjs/toolkit'
import postsSlice from './slices/postsSlice'

export default configureStore({
	reducer: {
		posts: postsSlice,
	},
})