const path = require('path');

module.exports = {
    mode: "development",
    entry: ['babel-polyfill', path.resolve(__dirname, 'app/frontend/src/index.js')],
    output: {
        path: path.resolve(__dirname, "app/frontend/static/frontend/public/"),

        publicPath: "/static/frontend/public/",
        filename: 'main.js',  
    },
    module: {
        rules: [
            {
                // regex test for js and jsx files
                test: /\.(js|jsx)?$/,
                // don't look in the node_modules/ folder
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {presets: ["@babel/env"]}
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
        ],
    },
};
