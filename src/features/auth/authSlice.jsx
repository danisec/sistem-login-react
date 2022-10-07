import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import notif from 'react-hot-toast'

const initialState = {
  auth: [],
  loading: false,
}

function loginUser(email, password) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === 'admin') {
        resolve({
          email: email,
          password: password,
        })
      } else {
        reject('Invalid Email or Password')
      }
    }, 500)
  })
}

export const authLogin = createAsyncThunk(
  'auth/authLogin',
  async ({ email, password }) => {
    try {
      const res = await loginUser(email, password)
      return res
    } catch (e) {
      throw e
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducer: {},
  extraReducers: {
    [authLogin.pending]: (state) => {
      state.loading = true
    },
    [authLogin.fulfilled]: (state, { payload }) => {
      state.auth = payload
      state.loading = false
      notif.success('Login Success')
    },
    [authLogin.rejected]: (state) => {
      state.loading = false
      notif.error('Login Failed')
    },
  },
})

export default authSlice.reducer
