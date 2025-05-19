import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Manager {
    id?: string;
    farmIds?: string[];
    name?: string;
    email?: string;
}

interface ManagerState {
    managers: Manager[];
    loading: boolean;
    error: string | null;
    manager: Manager;
}
const initialState: ManagerState = {
    managers: [],
    loading: false,
    error: null,
    manager: {} as Manager,
};
// CREATE
export const createManager = createAsyncThunk(
    "manager/createManager",
    async (data: Omit<Manager, "id">, { rejectWithValue }) => {
        const axiosInstance = (await import("../../utils/axiosInstance")).default;
        try {
            const res = await axiosInstance.post("/managers/create", data);
            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Create failed");
        }
    }
);
// READ
export const fetchManagers = createAsyncThunk<Manager[]>(
    "manager/fetchManagers",
    async (_, { rejectWithValue }) => {
        const axiosInstance = (await import("../../utils/axiosInstance")).default;
        try {
            const res = await axiosInstance.get(`/managers/get`);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Fetch failed");
        }
    }
);
// UPDATE
export const updateManager = createAsyncThunk(
    "manager/updateManager",
    async (
        { id, data }: { id: string; data: Partial<Manager> },
        { rejectWithValue }
    ) => {
        try {
            const axiosInstance = (await import("../../utils/axiosInstance")).default;
            const res = await axiosInstance.put(`/managers/${id}`, data);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Update failed");
        }
    }
);
// DELETE
export const deleteManager = createAsyncThunk(
    "manager/deleteManager",
    async (id: string, { rejectWithValue }) => {
        const axiosInstance = (await import("../../utils/axiosInstance")).default;
        try {
            const res = await axiosInstance.delete(`/managers/delete/${id}`);
            console.log('res', res)
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Delete failed");
        }
    }
);
// SLICE
const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {
        setManager: (state, action) => {
            state.manager = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createManager.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createManager.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(state.managers)) {
                    state.managers.push(action.payload);
                } else {
                    state.managers = [action.payload];  // fallback if somehow farms is not an array
                }
            })
            .addCase(createManager.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchManagers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchManagers.fulfilled, (state, action) => {
                state.loading = false;
                state.managers = action.payload;
            })
            .addCase(fetchManagers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateManager.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateManager.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.managers.findIndex((manager) => manager.id === action.payload.id);
                if (index !== -1) {
                    state.managers[index] = { ...state.managers[index], ...action.payload };
                }
            })
            .addCase(updateManager.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteManager.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteManager.fulfilled, (state, action) => {
                state.loading = false;
                console.log('state.managers', state.managers)
                const index = state.managers.findIndex((manager) => manager.id === action.meta.arg);
                if (index !== -1) {
                    state.managers.splice(index, 1);
                }
            })
            .addCase(deleteManager.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});
export const { setManager } = managerSlice.actions;
export default managerSlice.reducer;