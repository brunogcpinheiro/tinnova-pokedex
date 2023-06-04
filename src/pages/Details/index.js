import React, { useEffect, useState } from "react";
import {
  VStack,
  Box,
  Text,
  Image,
  Flex,
  Button,
  ScrollView,
  Modal,
  FormControl,
  Input,
  useToast,
  TextArea,
} from "native-base";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";

import { getPokemon } from "../../services/pokemons";
import { capitalizeFirstLetter, colorsByType } from "../../utils";
import { StyleSheet } from "react-native";

const Home = () => {
  const toast = useToast();
  const route = useRoute();
  const { navigate } = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState({});

  const { pokemonId } = route.params;

  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await getPokemon(pokemonId);
        setPokemon(response);
      } catch (err) {
        toast.show({
          render: () => (
            <Box bg="red.500" px={4} py={3} rounded="md" mb={5}>
              <Text color="white">Something went wrong</Text>
            </Box>
          ),
        });
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    const getPokemonFromStorage = async () => {
      const storage = await AsyncStorage.getItem(`@pokedex/${pokemonId}`);
      const storageParsed = JSON.parse(storage);

      if (storageParsed?.id === pokemonId) {
        setAdditionalInfo({
          nickname: storageParsed?.additional_info?.nickname,
          observations: storageParsed?.additional_info?.observations,
        });
      }
    };

    getPokemonFromStorage();
  }, []);

  const handleSave = async (payload) => {
    try {
      const pokemonObj =
        (await AsyncStorage.getItem("@pokedex")) ?? JSON.stringify(pokemon);
      const pokemonParsed = JSON.parse(pokemonObj);

      const newPokemonInfo = {
        ...pokemonParsed,
        additional_info: {
          ...payload,
          pokemonId,
        },
      };

      await AsyncStorage.setItem(
        `@pokedex/${pokemonId}`,
        JSON.stringify(newPokemonInfo)
      );

      toast.show({
        render: () => (
          <Box bg="green.500" px={4} py={3} rounded="md" mb={5}>
            <Text color="white">Saved successfully</Text>
          </Box>
        ),
      });
      setShowModal(false);
      navigate("Home");
    } catch (err) {
      toast.show({
        render: () => (
          <Box bg="red.500" px={4} py={3} rounded="md" mb={5}>
            <Text color="white">Something went wrong</Text>
          </Box>
        ),
      });
    }
  };

  return (
    Object.keys(pokemon).length > 0 && (
      <>
        <ScrollView h="full">
          <Box h="full">
            <VStack alignItems="center" h="full">
              <Box
                mt={10}
                w={200}
                h={200}
                borderColor={colorsByType(pokemon?.types[0]?.type?.name)?.dark}
                borderWidth={2}
                borderRadius={8}
                p={8}
              >
                <Image
                  source={
                    pokemon?.sprites?.other?.["official-artwork"]?.front_default
                  }
                  w="100%"
                  h="100%"
                  display="block"
                  alt={pokemon?.name}
                />
              </Box>
              <Box w="100%" p={6}>
                <Box>
                  <Text
                    fontWeight="bold"
                    fontSize="2xl"
                    color={colorsByType(pokemon?.types?.[0]?.type?.name)?.dark}
                  >
                    #{pokemonId} {capitalizeFirstLetter(pokemon?.name)}
                  </Text>
                </Box>
                <Flex>
                  <Flex direction="row" style={styles.typesContainer}>
                    {pokemon?.types?.map((type) => (
                      <Box
                        key={type.slot}
                        borderRadius={8}
                        px={4}
                        backgroundColor={colorsByType(type?.type?.name)?.dark}
                      >
                        <Text color="white" fontSize="sm">
                          {capitalizeFirstLetter(type?.type?.name)}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                  <Box mt={6} style={styles.infoWrapper}>
                    <Box style={styles.info}>
                      <Text style={styles.infoTitle}>Weight: </Text>
                      <Text>{pokemon?.weight} oz</Text>
                    </Box>
                    <Box style={styles.info}>
                      <Text style={styles.infoTitle}>Height: </Text>
                      <Text>{pokemon?.height} ft</Text>
                    </Box>
                    <Box style={styles.info}>
                      <Text style={styles.infoTitle}>Experience: </Text>
                      <Text>{pokemon?.base_experience} xp</Text>
                    </Box>
                    {Object.keys(additionalInfo).length > 0 && (
                      <>
                        <Box style={styles.info}>
                          <Text style={styles.infoTitle}>Nickname: </Text>
                          <Text>{additionalInfo?.nickname}</Text>
                        </Box>
                        <Box style={styles.info}>
                          <Text style={styles.infoTitle}>Observations </Text>
                        </Box>
                        <Text>{additionalInfo?.observations}</Text>
                      </>
                    )}
                  </Box>
                </Flex>
              </Box>

              <Box width="100%" px={4}>
                <Button
                  onPress={() => setShowModal(true)}
                  backgroundColor={
                    colorsByType(pokemon?.types?.[0]?.type?.name)?.dark
                  }
                >
                  Add informations
                </Button>
              </Box>
            </VStack>
          </Box>
        </ScrollView>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Add informations</Modal.Header>
            <Formik
              initialValues={{ nickname: "", observations: "" }}
              onSubmit={(values) => handleSave(values)}
              validate={(values) => {
                const errors = {};

                if (!values.nickname) {
                  errors.nickname = "Nickname is required";
                }

                if (!values.observations) {
                  errors.observations = "Observations is required";
                }

                return errors;
              }}
            >
              {({ handleChange, handleSubmit, errors }) => (
                <>
                  <Modal.Body>
                    <FormControl>
                      <FormControl.Label>Nickname</FormControl.Label>
                      <Input onChangeText={handleChange("nickname")} />
                      {errors.nickname && (
                        <Text style={styles.error}>{errors.nickname}</Text>
                      )}
                    </FormControl>
                    <FormControl mt="3">
                      <FormControl.Label>Observations</FormControl.Label>
                      <TextArea onChangeText={handleChange("observations")} />
                      {errors.observations && (
                        <Text style={styles.error}>{errors.observations}</Text>
                      )}
                    </FormControl>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button
                        variant="ghost"
                        colorScheme="blueGray"
                        onPress={() => {
                          setShowModal(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        backgroundColor={
                          colorsByType(pokemon?.types?.[0]?.type?.name)?.dark
                        }
                        onPress={handleSubmit}
                      >
                        Save
                      </Button>
                    </Button.Group>
                  </Modal.Footer>
                </>
              )}
            </Formik>
          </Modal.Content>
        </Modal>
      </>
    )
  );
};

const styles = StyleSheet.create({
  typesContainer: {
    gap: 6,
  },
  infoWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  infoTitle: {
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default Home;
