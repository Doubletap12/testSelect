import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

/** @type {import("webpack").Configuration} */
export default {
  mode: "development",

  entry: "./src/index.tsx",

  output: {
    path: path.resolve("dist"),
    filename: "bundle.js",
    clean: true,
  },

  devServer: {
    static: "./dist",
    port: 3000,
    open: true,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
