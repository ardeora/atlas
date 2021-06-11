import L, { Map } from "leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import { AtlasOptions, TileOptions } from "../data/atlas/AtlasOptions";
import { Tile } from "./Tile";
export default class Atlas {
    readonly container: string;
    readonly options: AtlasOptions;

    private tiles: Tile[];

    public map: Map;

    constructor(mapContainerID: string, options: AtlasOptions) {
        this.container = mapContainerID;
        this.options = options;

        this.map = this.initializeMap();

        this.tiles = this.initializeTiles();
    }

    // Creates a leaflet map when the constructor is called
    private initializeMap(): Map {
        let map = L.map(this.container, this.options.leaflet);
        return map;
    }

    // Creates all the tile bjects from the config and adds the default tile to the map
    private initializeTiles(): Tile[] {
        let tilesOptions = this.options.tiles;
        let tileArray: Tile[] = [];

        for (const tileOptionObject of tilesOptions) {
            tileArray.push(new Tile(this.map, tileOptionObject));
        }

        // The default tile to draw would be the one with the @default property set to true
        // If no default property is set, the default tile will be the first tile in the config array
        let defaultTileToDraw: Tile;
        let defaultTiles = tileArray.filter((tile) => tile.default);
        if (defaultTiles.length > 0) defaultTileToDraw = defaultTiles[0];
        else defaultTileToDraw = tileArray[0];

        defaultTileToDraw.show();

        return tileArray;
    }

    // #region TILE METHODS

    // Helper: Hides all the tiles from the map
    private hideAlllTiles(): void {
        this.tiles.forEach((tile) => tile.hide());
    }

    // Show tile layer with the given name
    // Returns true if the tile was found and changed
    // and false if no changes were made
    public showTile(name: string): boolean {
        let selectedTiles = this.tiles.filter((tile) => tile.name == name);
        if (selectedTiles.length > 0) {
            this.hideAlllTiles();
            selectedTiles[0].show();
            return true;
        } else {
            return false;
        }
    }

    // Add Tile Layers dynamically after Atlas object is constructed
    // Overrides the tile if a tile with same name already exists
    public addTile(config: TileOptions) {
        let { name } = config;
        this.deleteTile(name);
        this.tiles.push(new Tile(this.map, config));
    }

    // Hides the tile layer first before removing it from this.tiles array
    public deleteTile(name: string) {
        let tilesToDelete = this.tiles.filter((tile) => tile.name == name);
        tilesToDelete.forEach((tile) => tile.hide());
        this.tiles = this.tiles.filter((tile) => tile.name !== name);
    }

    // #endregion TILE METHODS

    // #region TOPOLOGY METHODS

    // #endregion TOPOLOGY METHODS
}
