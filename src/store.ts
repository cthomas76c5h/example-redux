import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

/* Define types */
export interface User {
  id: number;
  name: string;
  avatar: string;
  token: string;
}

export interface Auth {
  user: User | null;
}

export interface SharedData {
  name: string;
  url: string;
  auth: Auth;
  [key: string]: unknown;
}

const initialUser: User = {
  id: 1234,
  name: "Chris",
  avatar: "hello.jpg",
  token: import.meta.env.VITE_MY_TOKEN
};

/* Initial state using SharedData */
const initialState: SharedData = {
  name: "My App",
  url: import.meta.env.VITE_AL_ENDPOINT,
  auth: {
    user: initialUser
  },
};

/* Create a slice for shared data */
const sharedDataSlice = createSlice({
  name: 'sharedData',
  initialState,
  reducers: {
    /* Update authenticated user */
    setUser(state, action: PayloadAction<User | null>) {
      state.auth.user = action.payload;
    },
    /* Update application name */
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    /* You can add more reducers here as needed */
  },
});

/* Export actions */
export const { setUser, setName } = sharedDataSlice.actions;

/* Configure Redux store */
export const store = configureStore({
  reducer: {
    sharedData: sharedDataSlice.reducer,
  },
});

/* Export RootState and AppDispatch types */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
