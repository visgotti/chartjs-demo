import { createSlice, configureStore } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';


export type ChartType = 'bar' | 'line' | 'pie';

interface ChartState {
  bar: number[]
  line: number[],
  pie: number[],
}

const initialState : ChartState = { 
  bar: [],
  line: [],
  pie: [],
}

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    removeDatum: (state, action: PayloadAction<{ chart: ChartType, index: number }>) => {
      state[`${action.payload.chart}`] = [...(state[action.payload.chart]).splice(action.payload.index, 1)];
    },
    setData: (state, action: PayloadAction<{ chart: ChartType, data: any[] }>) => {
      state[`${action.payload.chart}`] = action.payload.data;
    },
  }
})

export const { removeDatum, setData } = chartSlice.actions;

const store = configureStore({
  reducer: {
    chart: chartSlice.reducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>

export default store;