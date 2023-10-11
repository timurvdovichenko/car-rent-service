import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://65254b4767cfb1e59ce7092b.mockapi.io/api';
axios.defaults.responseEncoding = 'utf8';

export const getDataWithPagination = createAsyncThunk('catalog/getAll', async (data, thunkAPI) => {
  try {
    const { page = 'page=1', action = '', limit = '&limit=8' } = data;
    const response = await axios.get(`adverts?${page}${limit}${action}`);

    console.log('response :>> ', response);

    return response.data;
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

const getFavorites = createAsyncThunk('catalog/favorites', async (favoriteStatus, thunkAPI) => {
  try {
    const response = await axios.get(`adverts?favorite=${favoriteStatus}`);
    return response.data;
  } catch (error) {
    console.log('error :>> ', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

const getSortCarByBrands = createAsyncThunk('catalog/sortByBrands', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`adverts?sortBy=make`);

    return response.data;
  } catch (error) {
    console.log('error :>> ', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const operations = {
  updateFavoriteStatus,
  getFavorites,
  getDataWithPagination,
  getSortCarByBrands,
};
