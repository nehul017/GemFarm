import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Container {
    id: string;
    container_name: string;
    container_crop?: string;
    container_image?: string;
    container_status?: string;
    autoGrowDeviceId?: string;
    blueLabDeviceId?: string;
    harvest_date?: string;
    farm_id: string;
}

interface ContainerState {
    containers: Container[];
    loading: boolean;
    error: string | null;
}

const initialState: ContainerState = {
    containers: [],
    loading: false,
    error: null,
};

// CREATE
export const createContainer = createAsyncThunk(
    "container/createContainer",
    async (data: Omit<Container, "id">, { rejectWithValue }) => {
        const axiosInstance = (await import("../../components/utils/axiosInstance")).default;
        try {
            const res = await axiosInstance.post("/containers", data);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Create failed");
        }
    }
);
// READ
export const fetchContainers = createAsyncThunk<Container[], string>(
    "container/fetchContainers",
    async (farmId, { rejectWithValue }) => {
        const axiosInstance = (await import("../../components/utils/axiosInstance")).default;
        try {
            const res = await axiosInstance.get(`/containers?farm_id=${farmId}`);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Fetch failed");
        }
    }
);
// UPDATE
export const updateContainer = createAsyncThunk(
    "container/updateContainer",
    async ({ id, data }: { id: string; data: Partial<Container> }, { rejectWithValue }) => {
        try {
            const axiosInstance = (await import("../../components/utils/axiosInstance")).default;
            const res = await axiosInstance.put(`/containers/${id}`, data);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Update failed");
        }
    }
);
// DELETE
export const deleteContainer = createAsyncThunk(
    "container/deleteContainer",
    async (id: string, { rejectWithValue }) => {
        try {
            const axiosInstance = (await import("../../components/utils/axiosInstance")).default;
            const res = await axiosInstance.delete(`/containers/${id}`);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Delete failed");
        }
    }
);
// Slice
const containerSlice = createSlice({
    name: "container",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createContainer.pending, (state) => {
                state.loading = true;
            })
            .addCase(createContainer.fulfilled, (state, action) => {
                state.loading = false;
                state.containers.push(action.payload);
            })
            .addCase(createContainer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchContainers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchContainers.fulfilled, (state, action) => {
                state.loading = false;
                state.containers = action.payload;
            })
            .addCase(fetchContainers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateContainer.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateContainer.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.containers.findIndex((container) => container.id === action.payload.id);
                if (index !== -1) {
                    state.containers[index] = action.payload;
                }
            })
            .addCase(updateContainer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteContainer.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteContainer.fulfilled, (state, action) => {
                state.loading = false;
                state.containers = state.containers.filter((container) => container.id !== action.payload.id);
            })
            .addCase(deleteContainer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default containerSlice.reducer;