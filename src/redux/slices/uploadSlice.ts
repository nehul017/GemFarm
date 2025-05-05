import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UploadState {
  fileUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UploadState = {
  fileUrl: null,
  loading: false,
  error: null,
};

// ASYNC THUNK FOR IMAGE UPLOAD
export const uploadImage = createAsyncThunk<string, FormData>(
  "upload/uploadImage",
  async (formData, { rejectWithValue }) => {
    try {
      const axiosInstance = (await import("../../utils/axiosInstance")).default;
      const res = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.file as string; // Assuming `file` contains the uploaded URL
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.error || "Image upload failed");
    }
  }
);

// SLICE
const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    resetUpload(state) {
      state.fileUrl = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.fileUrl = action.payload;
        state.error = null;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.fileUrl = null;
      });
  },
});

export const { resetUpload } = uploadSlice.actions;

export default uploadSlice.reducer;
