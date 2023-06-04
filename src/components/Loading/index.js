import { StyleSheet } from "react-native";
import { Box, Center, Text, Spinner } from "native-base";

const Loading = () => {
  return (
    <Center height="full" width="full">
      <Spinner color="emerald.700" />
    </Center>
  );
};

export default Loading;
