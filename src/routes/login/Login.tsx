import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Link,
  Stack,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";

import { OAuthButtonGroup } from "./AuthButtonGroup";
import { PasswordField } from "./PasswordField";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../assets/features/firebase/ConFig";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AuthAction,
  AuthSelector,
} from "../../assets/features/store/AuthSlice";

type SinginFormValues = {
  name: string;
  email: string;
  password: string;
};

const Login = () => {
  const Navigates = useNavigate();

  const {
    register,
    handleSubmit,
  } = useForm<SinginFormValues>();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(AuthSelector);
  const toast = useToast();
  useEffect(() => {
    if (user) {
      Navigates("/");
    }
  }, [user, Navigates]);
  const dispatch = useDispatch();
  const onSubmit = (values: SinginFormValues) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: values.name,
        }).then(() => {
          dispatch(
            AuthAction.authenticated({
              displayName: userCredential.user.displayName,
              email: userCredential.user.email,
              photoURL: userCredential.user.photoURL,
            })
          );
        });
      })
      .catch((error) => {
        console.error(error);
        toast({
          status: "error",
          title: "Authenticzation faiiled",
          description: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Container
        maxW="lg"
        py={{ base: "5", md: "10" }}
        px={{ base: "0", sm: "8" }}
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <h1 className=" text-3xl">Log in to your account</h1>
              <Text color="fg.muted">
                <p className=" text-center text-sm text-gray-500">
                  Don't have an account?
                  <Link
                    as={RouterLink}
                    to={"/register"}
                    className="font-semibold leading-6 text-blue-500 hover:text-indigo-500"
                  >
                    Sing up
                  </Link>
                </p>
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <div className="mt-2">
                    <input
                      {...register("email")}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </FormControl>
                <PasswordField {...register("password")} />
              </Stack>

              <Stack spacing="6">
                <Button
                  background={"#3B82F6"}
                  color={"white"}
                  type={"submit"}
                  isLoading={loading}
                >
                  Sign in
                </Button>
                <HStack>
                  <Divider />
                  <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
                <OAuthButtonGroup />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    
    </>
  );
};

export default Login;
