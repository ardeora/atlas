import  { Map, TileLayer, tileLayer } from "leaflet";
import { TileOptions } from "../types/atlas/AtlasOptions";

export class Tile {
    private config: TileOptions;
    private map: Map;
    private leafletLayer: TileLayer | undefined;

    readonly name: string;
    readonly default: boolean;
    readonly refreshInterval: number | undefined;

    constructor(map: Map, config: TileOptions) {
        this.config = config;
        this.map = map;

        this.name = config.name;
        this.default = config.default || false;
        this.refreshInterval = config.refreshEvery;

        this.leafletLayer = undefined;
    }

    // Create Leaflet Tile Layer
    private createTile(): TileLayer {
        let urlString = this.createTileURL();
        return tileLayer(urlString, this.config);
    }

    // Appends the access token to the url string provided in the config
    private createTileURL(): string {
        let { url, accessToken } = this.config;

        let urlString = url;

        if (accessToken) {
            urlString += `?access_token=${accessToken}`;
        }
        return urlString;
    }

    public show(): void {
        this.leafletLayer = this.createTile();
        this.leafletLayer.addTo(this.map);
    }

    // Removing the reference to the leaflet layer will help
    // in memory management and optimal garbage collection
    // when the tile is not showed
    public hide(): void {
        if (this.leafletLayer) {
            this.leafletLayer.remove();
            this.leafletLayer = undefined;
        }
    }
}
