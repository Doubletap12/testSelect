import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOptions, sendSelectedOption } from "../api/selectApi";

export interface OptionItem {
  name: string;
  value: string;
}

interface SelectState {
  options: OptionItem[];
  selectedValue: string | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: SelectState = {
  options: [],
  selectedValue: null,
  loading: false,
  error: null,
  message: null,
};

export const loadOptions = createAsyncThunk("select/loadOptions", async () => {
  const data = await fetchOptions();

  if (!Array.isArray(data)) {
    throw new Error("Некорректные данные");
  }

  return data;
});

export const sendOption = createAsyncThunk(
  "select/sendOption",
  async (value: string) => {
    const data = await sendSelectedOption(value);
    return data.message;
  }
);

const selectSlice = createSlice({
  name: "select",
  initialState,
  reducers: {
    setSelectedValue(state, action: PayloadAction<string | null>) {
      state.selectedValue = action.payload;
    },

    clearError(state) {
      state.error = null;
    },

    clearMessage(state) {
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.options = action.payload;
      })
      .addCase(loadOptions.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка загрузки списка";
      })

      .addCase(sendOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOption.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(sendOption.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка отправки";
      });
  },
});

export const { setSelectedValue, clearError, clearMessage } =
  selectSlice.actions;
export default selectSlice.reducer;
