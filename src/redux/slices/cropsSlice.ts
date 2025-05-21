import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MarketDataItem {
  date: string;
  price: number;
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
}

export interface CropItem {
  name: string;
  basePrice: number;
  img: string;
  isPositive: boolean;
  systemType: string;
  category: string;
  variety: string;
  marketData: MarketDataItem[];
  previousDayHigh: number | null;
}

interface CropsState {
  crops: CropItem[];
}

const initialState: CropsState = {
  crops: [],
};

const cropsSlice = createSlice({
  name: 'crops',
  initialState,
  reducers: {
    setCrops(state, action: PayloadAction<CropItem[]>) {
      state.crops = action.payload;
    },
  },
});

export const { setCrops } = cropsSlice.actions;
export default cropsSlice.reducer;
