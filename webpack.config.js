const path = require("path");
var library = "Atlas";
var output = library + "4.js";

module.exports = {
    entry: "./src/index.ts",
    // devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader",
                options: {
                    name: "./img/[name].[ext]",
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname + "/dist"),
        filename: output,
        library: library,
        libraryTarget: "umd",
        umdNamedDefine: true
    },
};
