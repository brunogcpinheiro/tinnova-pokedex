import { StyleSheet } from "react-native";
import { Text, HStack, Box, Flex, Image, Button } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { capitalizeFirstLetter, colorsByType } from "../../utils";

const ListItem = ({ item }) => {
  const { navigate } = useNavigation();

  const handleNavigationPokemonDetails = (pokemonId) => {
    navigate("Details", { pokemonId });
  };

  return (
    <Box
      borderRadius={8}
      backgroundColor={colorsByType(item?.types[0]?.type?.name)?.light}
      px={2}
      w="full"
      style={styles.mainContainer}
    >
      <Flex direction="row" justifyContent="space-between">
        <Text
          backgroundColor="transparent"
          position="relative"
          p={0}
          display="flex"
          w="full"
          justifyContent="space-between"
          onPress={() => handleNavigationPokemonDetails(item?.id)}
        >
          <HStack justifyContent="space-between" px={2} py={6}>
            <Box>
              <Text fontSize={10}>#{item?.id}</Text>
              <Text color="white" fontSize="2xl" bold mb={2}>
                {capitalizeFirstLetter(item?.name)}
              </Text>
              <Flex direction="row" style={styles.typesContainer}>
                {item?.types?.map((type) => (
                  <Box
                    key={type.slot}
                    borderRadius={8}
                    px={2}
                    backgroundColor={colorsByType(type?.type?.name)?.dark}
                  >
                    <Text color="white" fontSize={10}>
                      {capitalizeFirstLetter(type?.type?.name)}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </Box>
          </HStack>
          <Image
            source={item?.sprites?.other?.["official-artwork"]?.front_default}
            w={90}
            h={90}
            position="absolute"
            right={2}
            top={4}
            alt={item?.name}
          />
        </Text>
      </Flex>
    </Box>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 12,
  },
  typesContainer: {
    gap: 6,
  },
});

export default ListItem;
