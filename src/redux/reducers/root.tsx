import { combineReducers } from "redux";
import { stuffsReducer } from "./stuffs";
import { categoriesReducer } from "./categories";

export const rootReducer = combineReducers({
    stuffs: stuffsReducer,
    categories: categoriesReducer
});

export type RootState = ReturnType<typeof rootReducer>;


