import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Farm {
    id: string;
    name: string;
    farmImage: string;
    location: string;
}

interface FarmState {
    farms: Farm[];
    farm: Farm;
    loading: boolean;
    error: string | null;
}

const initialState: FarmState = {
    farms: [],
    farm: {} as Farm,
    loading: false,
    error: null,
};

// CREATE
export const createFarm = createAsyncThunk(
    "farm/createFarm",
    async (data: Omit<Farm, "id">, { rejectWithValue }) => {
        const axiosInstance = (await import("../../utils/axiosInstance")).default;
        try {
            const res = await axiosInstance.post("/farms", data);

            return res.data.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Create failed");
        }
    }
);

// READ SINGLE FARM
export const fetchFarmById = createAsyncThunk<Farm, string>(
    "farm/fetchFarmById",
    async (id: string, { rejectWithValue }) => {
        const axiosInstance = (await import("../../utils/axiosInstance")).default;
        try {
            const res = await axiosInstance.get(`/farms/by-id/${id}`);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Fetch failed");
        }
    }
);
// READ
export const fetchFarms = createAsyncThunk<Farm[]>(
    "farm/fetchFarms",
    async (_, { rejectWithValue }) => {
        const axiosInstance = (await import("../../utils/axiosInstance")).default;
        try {
            const res = await axiosInstance.get("/farms");
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Fetch failed");
        }
    }
);

// UPDATE
export const updateFarm = createAsyncThunk(
    "farm/updateFarm",
    async ({ id, data }: { id: string; data: Partial<Farm> }, { rejectWithValue }) => {
        try {
            const axiosInstance = (await import("../../utils/axiosInstance")).default;
            const res = await axiosInstance.put(`/farms/${id}`, data);
            return res.data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Update failed");
        }
    }
);

// DELETE
export const deleteFarm = createAsyncThunk(
    "farm/deleteFarm",
    async (id: string, { rejectWithValue }) => {
        const axiosInstance = (await import("../../utils/axiosInstance")).default;
        try {
            await axiosInstance.delete(`/farms/${id}`);
            return id;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || "Delete failed");
        }
    }
);

const farmSlice = createSlice({
    name: "farm",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFarms.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.farms = action.payload;
            })
            .addCase(fetchFarms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFarms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createFarm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createFarm.fulfilled, (state, action) => {
                console.log('action', action)
                state.loading = false;
                state.farm = action.payload;
                if (Array.isArray(state.farms)) {
                    state.farms.push(action.payload);
                } else {
                    state.farms = [action.payload];  // fallback if somehow farms is not an array
                }
                state.error = null;
            })
            .addCase(createFarm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateFarm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateFarm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateFarm.fulfilled, (state, action) => {
                const index = state.farms.findIndex(f => f.id === action.payload.id);
                if (index !== -1) state.farms[index] = action.payload;
            })
            .addCase(deleteFarm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteFarm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteFarm.fulfilled, (state, action) => {
                state.farms = state.farms.filter(f => f.id !== action.payload);
            })
            .addCase(fetchFarmById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFarmById.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.farm = action.payload;
            }
            )
            .addCase(fetchFarmById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            }
            );
    },
});

export default farmSlice.reducer;
