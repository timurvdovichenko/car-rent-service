import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// import catalogReducer from './catalogSlice';
// import { api } from './operations';
import reducers from './slice';

// const reducers = combineReducers({
//   catalog: catalogReducer,
//   // [api.reducerPath]: api.reducer,
// });

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['brands'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
