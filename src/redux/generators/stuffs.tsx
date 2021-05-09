import * as actionsTypes from '../actionsTypes';
import IStuff from '../../types/stuff';

export interface IGetStuffsGenerator {
    type: typeof actionsTypes.GET_STUFFS;
    stuffs: Array<IStuff>;
}

export type StuffsDispatchTypes = IGetStuffsGenerator;