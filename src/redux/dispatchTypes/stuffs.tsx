import * as actionsTypes from '../actionsTypes';
import IStuff from '../../types/stuff';
import IRate from "../../types/rate";

export interface IGetStuffsDispatchType {
    type: typeof actionsTypes.GET_STUFFS;
    stuffs: Array<IStuff>;
}

export interface IRateStuffDispatchType {
    type: typeof actionsTypes.RATE_STUFF;
    stuff: IStuff;
    rate: IRate;
}

export type StuffsDispatchTypes = IGetStuffsDispatchType | IRateStuffDispatchType;