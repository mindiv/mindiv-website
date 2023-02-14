import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosRequestConfig } from 'axios';
import { CategoryData, QuestionData } from '../interfaces/game.interface';
import { api } from '../services/api';
import { BASE_URL } from '../utils/constants';

interface GameState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  categories: CategoryData[];
  questions: QuestionData[];
  view: string;
  selectedCategories: string[];
  difficulty: string;
}

const initialState: GameState = {
  status: 'idle',
  categories: [],
  questions: [],
  view: 'categories',
  selectedCategories: [],
  difficulty: 'easy',
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
      const state: any = thunkAPI.getState();
      const config: AxiosRequestConfig = {
        params: {
          categories: state.game.selectedCategories,
          difficulty: state.game.difficulty,
          numberOfQuestions: 4,
        },
      };
      const { data } = await api.get(
        `${BASE_URL}/question/questions_to_answer/`,
        config
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameCategories(state, action: PayloadAction<any>) {
      state.selectedCategories = action.payload;
    },
    setView(state, action: PayloadAction<string>) {
      state.view = action.payload;
    },
  },
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

export const { setGameCategories, setView } = gameSlice.actions;
export default gameSlice.reducer;
