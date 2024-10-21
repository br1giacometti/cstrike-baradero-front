import { useEffect, useCallback, useMemo } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Center, ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";

import { AuthProvider, PrivateRouteWrapper } from "@kushitech/auth-module";
import AppLayout from "Base/layout/AppLayout";
import styleCache from "Base/styles/styleCache";
import theme from "Base/theme";
import { Loading } from "Base/components";
import useRouteLoading from "Base/utils/hooks/useRouteLoading";
import { match } from "path-to-regexp"; // Asegúrate de instalar path-to-regexp

const isClientSide = typeof window !== "undefined";

// Definición de rutas públicas con segmentos dinámicos
const PUBLIC_ROUTES = [
  "/auth-public/public",
  "/auth/login",
  "/auth/sign-up",
  "/auth-public/fixture/fixture",
  "/auth-public/stats/stats",
  "/auth-public/filter/:id/:id", // Rutas con parámetros dinámicos
];

// Función para validar rutas públicas usando path-to-regexp
const isPublicRoute = (path: string) =>
  PUBLIC_ROUTES.some((route) => match(route)(path) !== false);

export default function App({ Component, pageProps, router }: AppProps) {
  const { loading: isRouteLoading } = useRouteLoading();
  const nextRouter = useRouter();

  const handleRedirectToLogin = useCallback(() => {
    if (isClientSide) {
      nextRouter.replace("/auth-public/public");
    }
  }, [nextRouter]);

  useEffect(() => {
    if (router.pathname === "/" && router.asPath !== "/auth/login") {
      router.replace("/auth-public/public");
    }
  }, [router]);

  const isPublic = useMemo(
    () => isPublicRoute(router.pathname),
    [router.pathname]
  );

  return (
    <AuthProvider>
      <CacheProvider value={styleCache}>
        <ChakraProvider theme={theme}>
          {isPublic ? (
            <Component {...pageProps} />
          ) : (
            <PrivateRouteWrapper
              loadingElement={() => <Loading h="100vh" />}
              redirectLogin={handleRedirectToLogin}
            >
              <AppLayout>
                {isRouteLoading ? (
                  <Center h="calc(100% - 70px)">
                    <Loading />
                  </Center>
                ) : (
                  <Component {...pageProps} />
                )}
              </AppLayout>
            </PrivateRouteWrapper>
          )}
        </ChakraProvider>
      </CacheProvider>
    </AuthProvider>
  );
}
