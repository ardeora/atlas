import {
    PathOptions,
    Path,
    LatLng,
    LatLngExpression,
} from "leaflet";
import geojson from "geojson";

declare module "*leaflet.css";

// Leaflet.Curve accepts two latlng types,
// [lat: number, lng: number] for commands M, L, C, S, Q, T and
// [lat/lng: number] for commands H, V
export type CurveLatLngExpression = [number, number] | [number];

// SVG Command Types
export type CurveSVGCommand =
    | "M"
    | "L"
    | "H"
    | "V"
    | "C"
    | "S"
    | "Q"
    | "T"
    | "Z";

// PathData consists of SVG command followed by their lat/lng parameters
export type CurvePathDataElement = CurveLatLngExpression | CurveSVGCommand;
export type CurvePathData = CurvePathDataElement[];

export type SVGShapeName =
    | "diamond"
    | "square"
    | "triangle"
    | "triangle-up"
    | "triangle-down"
    | "arrowhead"
    | "arrowhead-up"
    | "arrowhead-down"
    | "circle"
    | "x";

// Extending existing leaflet module to add Curve class and curve function
declare module "leaflet" {
    export interface CurveOptions extends PathOptions {
        animate?: KeyframeAnimationOptions | number;
    }
    export interface SVGShapeMarkerOptions extends PathOptions {
        radius: number;
        shape: SVGShapeName;
    }

    export class Curve extends Path {
        constructor(pathData: CurvePathData, options: CurveOptions);
        options: CurveOptions;

        // Public functions
        setPath(pathData: CurvePathData): this;
        getPath(): CurvePathData;
        setLatLngs(pathData: CurvePathData): this;
        trace(samplingDistance: number[]): LatLng[];
    }

    export function curve(
        pathData: CurvePathData,
        options: CurveOptions
    ): Curve;

    export class ShapeMarker<P = any> extends Path {
        constructor(position: LatLngExpression, options: SVGShapeMarkerOptions);
        options: SVGShapeMarkerOptions;

        // Public functions
        toGeoJSON(precision?: number): geojson.Feature<geojson.Point, P>;
        setLatLng(latLng: LatLngExpression): this;
        getLatLng(): LatLng;
        setRadius(radius: number): this;
        getRadius(): number;
    }

    export function shapeMarker(
        position: LatLngExpression,
        options: SVGShapeMarkerOptions
    ): ShapeMarker;
}
