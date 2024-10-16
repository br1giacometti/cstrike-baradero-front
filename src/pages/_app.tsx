import { useEffect, useCallback } from "react";
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

const isClientSide = typeof window !== "undefined";

// Rutas públicas que no requieren autenticación
const PUBLIC_ROUTES = ["/auth-public/public", "/auth/login", "/auth/register"];

export default function App({ Component, pageProps, router }: AppProps) {
  const { loading: isRouteLoading } = useRouteLoading();
  const nextRouter = useRouter();

  // Redirección a login si el usuario no está autenticado
  const handleRedirectToLogin = useCallback(() => {
    if (isClientSide) {
      nextRouter.replace("/auth/login");
    }
  }, [nextRouter]);

  // Redirección automática de "/" a "/auth-public/public"
  useEffect(() => {
    if (router.pathname === "/") {
      router.replace("/auth-public/public");
    }
  }, [router]);

  const isPublicRoute = PUBLIC_ROUTES.includes(router.pathname);

  return (
    <AuthProvider>
      <CacheProvider value={styleCache}>
        <ChakraProvider theme={theme}>
          {isPublicRoute ? (
            // Rutas públicas sin autenticación
            <Component {...pageProps} />
          ) : (
            // Rutas protegidas (Backoffice)
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
