import { combineReducers } from "redux";
import { stuffsReducer } from "./stuffs";
import { categoriesReducer } from "./categories";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
    stuffs: stuffsReducer,
    categories: categoriesReducer,
    auth: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;


