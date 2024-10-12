import Login from "Auth/features/Login";
import { useRouter } from "next/router";
import { useCallback } from "react";
// Adjust the import path as necessary

const LoginPage = () => {
  const router = useRouter();

  const navigateToHome = useCallback(() => {
    router.replace("/game/");
  }, [router]);

  const navigateToRegister = useCallback(() => {
    router.push("/auth/register");
  }, [router]);

  return (
    <Login
      navigateToHome={navigateToHome}
      navigateToRegister={navigateToRegister}
    />
  );
};

export default LoginPage;
