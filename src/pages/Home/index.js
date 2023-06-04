import React, { useContext, useEffect, useState } from "react";
import { VStack, Box, Text, Image, Input, useToast } from "native-base";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ListItem from "../../components/ListItem";
import { getPokemons } from "../../services/pokemons";
import { api } from "../../services/api";
import Loading from "../../components/Loading";
import AuthContext from "../../context/authContext";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const toast = useToast();
  const { navigate } = useNavigation();
  const { user, setUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(true);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = data?.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setResults(filtered);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@pokedex/auth");
      setUser(null);
      navigate("Login");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { results } = await getPokemons();

        const payloadPokemons = await Promise.all(
          results.map(async (pokemon) => {
            const { id, types, sprites } = await getMoreInfo(pokemon.url);

            return {
              name: pokemon.name,
              id,
              types,
              sprites,
            };
          })
        );

        setData(payloadPokemons);
        setResults(payloadPokemons);
      } catch (err) {
        toast.show({
          render: () => (
            <Box bg="red.500" px={4} py={3} rounded="md" mb={5}>
              <Text color="white">Something went wrong</Text>
            </Box>
          ),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getMoreInfo = async (url) => {
    const response = await api.get(url);
    const { id, types, sprites } = response?.data;

    return {
      id,
      types,
      sprites,
    };
  };

  return loading ? (
    <Loading />
  ) : (
    <Box backgroundColor="white">
      <Image
        source={require("../../../assets/img/pokebola.png")}
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
          opacity: 0.05,
          position: "absolute",
          top: -30,
          right: 0,
        }}
        alt="Logo"
      />
      <VStack alignItems="center" h="full">
        <Box w="100%" p={6}>
          <Box pb={4}>
            <Text fontWeight="bold" fontSize="2xl">
              Pokédex
            </Text>

            <Text onPress={logout} color="emerald.400" bold fontSize="xs">
              Logout
            </Text>
          </Box>

          <Box pb={4}>
            <Text color="gray.600" fontSize="xs">
              Hello, {user?.user?.email}!
            </Text>
          </Box>
          <Input
            placeholder="Which pokemon are you looking for?"
            my={2}
            mb={4}
            p={3}
            borderColor="gray.400"
            backgroundColor="white"
            value={search}
            onChange={handleSearch}
            clearButtonMode="always"
          />
          <FlatList
            style={{ width: "100%" }}
            data={results}
            ListEmptyComponent={() => (
              <Box
                flex={1}
                justifyContent="center"
                alignItems="center"
                mt={10}
                mb={10}
              >
                <Text fontSize="lg" fontWeight="bold">
                  No results found
                </Text>
              </Box>
            )}
            renderItem={({ item }) => <ListItem item={item} />}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default Home;
