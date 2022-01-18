// npm i react-loading
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Grid } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "../Auth";
import { auth, provider } from "../firebase";

const Login = () => {
  const { setLoading } = useAuth();
  const loginWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, provider);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}
    >
      <Button
        onClick={loginWithGoogle}
        variant="contained"
        startIcon={<GoogleIcon />}
      >
        Sign in Google
      </Button>
    </Grid>
  );
};

export default Login;
