import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '../../../data';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  playList: TrackType[];
  shuffledPlayList: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playList: [],
  shuffledPlayList: [],
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentPlayList: (state, action: PayloadAction<TrackType[]>) => {
      state.playList = action.payload;
      state.shuffledPlayList = [...state.playList].sort(() => {
        return Math.random() - 0.5;
      });
    },
    setShuffledPlayList: (state, action: PayloadAction<TrackType[]>) => {
      state.shuffledPlayList = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },

    setNextTrack: (state) => {
      const currentIndex = state.playList.findIndex((el) => {
        return el._id === state.currentTrack?._id;
      });
      const nextIndex = currentIndex + 1;
      state.currentTrack = state.playList[nextIndex];
    },
    setNextShuffledTrack: (state) => {
      const currentIndex = state.shuffledPlayList.findIndex((el) => {
        return el._id === state.currentTrack?._id;
      });
      const nextIndex = currentIndex + 1;
      state.currentTrack = state.shuffledPlayList[nextIndex];
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentPlayList,
  setShuffledPlayList,
  setNextTrack,
  setNextShuffledTrack,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
