"use client";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactData {
  userName: string;
  email: string;
  comment: string;
}

interface ContactState {
  submissions: ContactData[];
}

const initialState: ContactState = {
  submissions: [],
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<ContactData>) => {
      state.submissions.push(action.payload);

      if (typeof window !== "undefined") {
        localStorage.setItem("userData", JSON.stringify(state.submissions));
      }
    },
    setSubmissions: (state, action: PayloadAction<ContactData[]>) => {
      state.submissions = action.payload;
    },
    deleteSubmission: (state, action: PayloadAction<number>) => {
      state.submissions.splice(action.payload, 1);

      if (typeof window !== "undefined") {
        localStorage.setItem("userData", JSON.stringify(state.submissions));
      }
    },
    updateSubmission: (
      state,
      action: PayloadAction<{ index: number; updatedData: ContactData }>
    ) => {
      const { index, updatedData } = action.payload;
      if (state.submissions[index]) {
        state.submissions[index] = updatedData;

        if (typeof window !== "undefined") {
          localStorage.setItem("userData", JSON.stringify(state.submissions));
        }
      }
    },
  },
});

export const {
  addSubmission,
  setSubmissions,
  deleteSubmission,
  updateSubmission,
} = contactSlice.actions;

export const store = configureStore({
  reducer: {
    contact: contactSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const loadFromLocalStorage = () => (dispatch: AppDispatch) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("userData");
    if (saved) {
      dispatch(setSubmissions(JSON.parse(saved)));
    }
  }
};