import { Button, ButtonGroup } from "@chakra-ui/react";
import { GitHubIcon, GoogleIcon} from "./ProviderIcon2";
import { FaFacebook } from "react-icons/fa";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../assets/features/firebase/ConFig";
const gitHubProvider = new GithubAuthProvider();
const ggProvider = new GoogleAuthProvider();

const FacebookProvier = new FacebookAuthProvider();
export const OAuthButtonGroup = () => {
  return (
    <ButtonGroup
      variant="secondary"
      flex={"row"}
      justifyContent={"space-between"}
    >
      <Button fontSize={"30px"} onClick={() => signInWithPopup(auth, ggProvider)}>
        <GoogleIcon />
      </Button>
     
      <Button fontSize={"30px"} onClick={() => signInWithPopup(auth, gitHubProvider)}>
        <GitHubIcon />
      </Button>
      <Button
        color={"#3B82F6"}
        fontSize={"30px"}
        onClick={() => signInWithPopup(auth, FacebookProvier)}
      >
        <FaFacebook />
      </Button>
    </ButtonGroup>
  );
};
