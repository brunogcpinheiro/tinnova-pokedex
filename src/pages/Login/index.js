import {
  Flex,
  Box,
  Text,
  Image,
  Input,
  Button,
  VStack,
  useToast,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { StyleSheet } from "react-native";
import { fakeCredentials } from "../../data/fakeCredentials";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/authContext";

const Login = () => {
  const { navigate } = useNavigation();
  const { setUser } = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await AsyncStorage.getItem("@pokedex/auth");
      if (auth) {
        setUser(JSON.parse(auth));
        return navigate("Home");
      }
    };

    checkAuth();
  }, []);

  const checkPassword = async (values) => {
    if (JSON.stringify(values) === JSON.stringify(fakeCredentials)) {
      await AsyncStorage.setItem(
        "@pokedex/auth",
        JSON.stringify({
          logged: true,
          user: {
            email: values?.email,
          },
        })
      );
      setUser({ logged: true, user: values });
      toast.show({
        render: () => (
          <Box bg="green.500" px={4} py={3} rounded="md" mb={5}>
            <Text color="white">Login successfully</Text>
          </Box>
        ),
      });
      return navigate("Home");
    }

    return toast.show({
      render: () => (
        <Box bg="red.500" px={4} py={3} rounded="md" mb={5}>
          <Text color="white">Invalid credentials</Text>
        </Box>
      ),
    });
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="full" w="full">
      <Image
        source={require("../../../assets/img/pokebola.png")}
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
          opacity: 0.5,
          position: "absolute",
          top: -30,
          right: 0,
        }}
        alt="Logo"
      />

      <Text fontSize="2xl" color="gray.500" bold>
        Login
      </Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => checkPassword(values)}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          } else if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
          }
          return errors;
        }}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <VStack space={[4, 2]} w="full" px={8}>
            <Box>
              <Text>Email</Text>
              <Input placeholder="Email" onChangeText={handleChange("email")} />
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            </Box>

            <Box>
              <Text>Password</Text>
              <Input
                placeholder="Password"
                onChangeText={handleChange("password")}
                type="password"
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </Box>

            <Box>
              <Button onPress={handleSubmit}>Submit</Button>
            </Box>
          </VStack>
        )}
      </Formik>
    </Flex>
  );
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default Login;
