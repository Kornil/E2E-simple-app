module.exports = {
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleDirectories: ["node_modules"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx|js|jsx)$",
  transform: {
    "^.+\\.(tsx?|jsx?)$": "babel-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/test/fileTransformer.js",
  },
  setupFilesAfterEnv: ["./src/test/setup.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
};
