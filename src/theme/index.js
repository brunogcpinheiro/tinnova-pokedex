import { extendTheme } from "native-base";

const config = {
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: "Poppins-Bold",
    body: "Poppins-Regular",
    mono: "Poppins-Light",
  },
});
