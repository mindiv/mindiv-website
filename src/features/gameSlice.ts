import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { QuestionData } from '../interfaces/game.interface';
import { api } from '../services/api';
import { BASE_URL } from '../utils/constants';

interface GameState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  categories: [];
  questions: QuestionData[];
}

const initialState: GameState = {
  status: 'idle',
  categories: [],
  questions: [],
};

export const getCategories = createAsyncThunk(
  'game/getCategories',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get(`${BASE_URL}/category`);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getQuestions = createAsyncThunk(
  'game/getQuestions',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get(
        `${BASE_URL}/question/questions_to_answer`
      );
      console.log(data);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.categories = action.payload.payload;
      })
      .addCase(getCategories.rejected, (state) => {
        state.status = 'failed';
      });

    builder
      .addCase(getQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getQuestions.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.questions = action.payload.payload;
      });
  },
});

export default gameSlice.reducer;
