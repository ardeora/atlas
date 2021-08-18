import {
  MapOptions as LeafletMapOptions,
  TileLayerOptions as LeafletTileLayerOptions,
  SVGShapeMarkerOptions,
  CurveOptions as LeafletCurveOptions,
} from 'leaflet';

export interface MapOptions {
  debug: boolean; // Debug Mode
  controls: {
    // Map Controls To Render On Presentation
    zoom: boolean; // Zoom In/Out
    layers: boolean; // Show All/Hide All Layers
    editor: boolean; // Atlas Editor Layer
  };
}

export interface LegendOptions {
  position: 'bottom-left' | 'top-left' | 'top-right' | 'bottom-right';
  orientation: 'horizontal' | 'vertical';
  size: string; // % of the container Legend should span to
  type: 'percent' | 'absolute';
  units: string;
  min: number;
  max: number;
  thresholds: number[];
  colors: string[];
  target: string;
}

export interface TileOptions extends LeafletTileLayerOptions {
  name: string;
  url: string;
  accessToken?: string;
  refreshEvery?: number;
  default?: boolean;
}

export interface NodeOptions {
  orientation: 'left' | 'center' | 'right';
  leafletLayer: SVGShapeMarkerOptions;
}

export interface CurveOptions {
  leafletLayer: LeafletCurveOptions;
}

export interface AtlasOptions {
  map: MapOptions;
  legend: LegendOptions[];
  leaflet: LeafletMapOptions;
  tiles: TileOptions[];
  overlayTiles: TileOptions[];

  node: NodeOptions;
  line: CurveOptions;
}
