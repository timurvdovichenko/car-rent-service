import { createAsyncThunk } from '@reduxjs/toolkit';
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

axios.defaults.baseURL = 'https://65254b4767cfb1e59ce7092b.mockapi.io/api';
axios.defaults.responseEncoding = 'utf8';

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://65254b4767cfb1e59ce7092b.mockapi.io/api',
//   }),
//   endpoints: builder => ({
//     getCarsByPage: builder.query({
//       query: (page = 1) => `adverts?page=${page}&limit=8`,
//     }),
//   }),
// });

export const getAllWithPagination = createAsyncThunk('catalog/getAll', async (page, thunkAPI) => {
  try {
    const response = await axios.get(`adverts?page=${page}&limit=8`);
    console.log('response :>> ', response.data);
    return response.data;
  } catch (error) {
    console.log('error :>> ', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const getByID = createAsyncThunk('catalog/byID', async (data, thunkAPI) => {
  try {
    const id = data;
    const response = await axios.get(`adverts/${id}`);
    console.log('response :>> ', response.data);
    // return response.data;
  } catch (error) {
    console.log('error :>> ', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const updateFavoriteStatus = createAsyncThunk('catalog/updateFavorite', async (data, thunkAPI) => {
  try {
    const { id, favoriteStatus } = data;
    const response = await axios.put(`adverts/${id}`, favoriteStatus);

    return response.data;
  } catch (error) {
    console.log('error :>> ', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const getFavorites = createAsyncThunk('catalog/favorites', async (data, thunkAPI) => {
  try {
    const favoriteStatus = data;
    const response = await axios.get(`adverts?favorite=${favoriteStatus}`);
    console.log('response.data :>> ', response.data);

    return response.data;
  } catch (error) {
    console.log('error :>> ', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const { useGetCarsByPageQuery } = api;
export const operations = { getByID, updateFavoriteStatus, getFavorites, getAllWithPagination };
