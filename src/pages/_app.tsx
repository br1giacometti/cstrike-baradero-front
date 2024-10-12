import { useCallback } from "react";
import type { AppProps } from "next/app";
import { Center, ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@emotion/react";
import { AuthProvider, PrivateRouteWrapper } from "@kushitech/auth-module";
import styleCache from "Base/styles/styleCache";
import theme from "Base/theme";
import { Loading } from "Base/components";
import useRouteLoading from "Base/utils/hooks/useRouteLoading";
import AuthenticatedApp from "Base/layout/AuthenticatedApp";

const isClientSide = typeof window !== "undefined";

export default function App({ Component, pageProps, router }: AppProps) {
  const { loading: isRouteLoading } = useRouteLoading();

  const handleRedirectToLogin = useCallback(() => {
    if (isClientSide) {
      router.replace("/auth/login");
    }
  }, [router]);

  return (
    <CacheProvider value={styleCache}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          {router.pathname.startsWith("/auth") ? (
            <Component {...pageProps} />
          ) : (
            <PrivateRouteWrapper
              loadingElement={() => <Loading h="100vh" />}
              redirectLogin={handleRedirectToLogin}
            >
              {isRouteLoading ? (
                <Center h="calc(100% - 70px)">
                  <Loading />
                </Center>
              ) : (
                <AuthenticatedApp Component={Component} pageProps={pageProps} />
              )}
            </PrivateRouteWrapper>
          )}
        </AuthProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
