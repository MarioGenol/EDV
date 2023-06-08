export interface Data {
    faculty: number;
    date: string;
    consumption: number;
}

export interface Building {
    id: number;
    name: string;
    campus: string;
    coordinates?: JSON;
}

export interface Feature {
    type: string,
    properties: { description: string, color: string },
    geometry: { type: string, coordinates: [number[][]] }
}

export enum ColorPalette {
    red = '#ff0000',
    orange = '#ffa700',
    yellow = '#fff400',
    lightGreen = '#a3ff00',
    green = '#2cba00',
}