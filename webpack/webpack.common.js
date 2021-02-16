const Path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const fs = require("fs");

const PAGES_DIR = Path.resolve(__dirname, "../src/pages");
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith(".handlebars"));

module.exports = {
  entry: {
    app: Path.resolve(__dirname, "../src/scripts/index.js"),
  },
  output: {
    path: Path.join(__dirname, "../build"),
    filename: "js/[name].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: Path.resolve(__dirname, "../public"), to: "public" }],
    }),
    ...PAGES.map((page) => {
      return new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/${page}`,
        filename: `${page}`.replace(/.handlebars/, ".html"),
      });
    }),
  ],
  resolve: {
    alias: {
      "~": Path.resolve(__dirname, "../src"),
    },
    extensions: [
      ".ts",
      ".js",
      ".sass",
      ".scss",
      ".html",
      "css",
      ".ejs",
      ".handlebars",
    ],
  },
  module: {
    rules: [
      {
        test: /\.handlebars$/,
        loader: "handlebars-loader",
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      },
    ],
  },
};
