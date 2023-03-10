import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../axios';
//
//
//
//
//
// autorithation
export const fetchLogin = createAsyncThunk(
	'auth/fetchAuth', async (params) => {
		const { data } = await axios.post('/auth/login', params)
		return data;
	}
)

export const fetchAuthMe = createAsyncThunk(
	'auth/fetchAuthMe', async () => {
		const { data } = await axios.get('/auth/me')
		return data;
	}
)

// register
export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister', async (params) => {
		const { data } = await axios.post('/auth/register', params)
		return data;
	}
)
//
//
//
export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		data: null,
		status: 'loading',
	},

	reducers: {
		logout: (state) => {
			state.data = null;
		}
	},
	extraReducers: {
		// 1
		[fetchLogin.pending]: (state) => {
			state.status = 'loading';
			state.data = null
		},
		[fetchLogin.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload

		},
		[fetchLogin.rejected]: (state) => {
			state.status = 'error';
			state.data = null
		},
		// 2
		[fetchAuthMe.pending]: (state) => {
			state.status = 'loading';
			state.data = null
		},
		[fetchAuthMe.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload

		},
		[fetchAuthMe.rejected]: (state) => {
			state.status = 'error';
			state.data = null
		},
		// 3
		[fetchRegister.pending]: (state) => {
			state.status = 'loading';
			state.data = null
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload

		},
		[fetchRegister.rejected]: (state) => {
			state.status = 'error';
			state.data = null
		},
	},
})

export const isAuthSelector = state => Boolean(state.auth.data)

export const { logout } = authSlice.actions

export default authSlice.reducer
