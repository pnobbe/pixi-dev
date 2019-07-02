import {SCALE_MODES} from 'pixi.js';

interface IConstants {
    MAX_TEXTURES?: number,
    BUFFER_SIZE?: number,
    BOUND_SIZE?: number,
    BOUND_COUNT_PER_BUFFER?: number,
    USE_32_BIT_INDEX?: boolean,
    SCALE_MODE?: SCALE_MODES,
    DO_CLEAR?: boolean
}

export const Constants: IConstants = {
    MAX_TEXTURES: 4,
    BUFFER_SIZE: 2048,
    BOUND_SIZE: 1024,
    BOUND_COUNT_PER_BUFFER: 1,
    USE_32_BIT_INDEX: false,
    SCALE_MODE: SCALE_MODES.LINEAR,
    DO_CLEAR: true
};
