import { combineReducers } from "redux";
import { stuffsReducer } from "./stuffs";
import { categoriesReducer } from "./categories";
import { authReducer } from "./auth";

export const rootReducer = combineReducers({
    stuffs: stuffsReducer,
    categories: categoriesReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;


