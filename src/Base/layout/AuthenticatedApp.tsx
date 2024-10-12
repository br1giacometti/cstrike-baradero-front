import { useAuthStatus } from "@kushitech/auth-module";
import { Center, Flex, Box, Stack, Drawer } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { User } from "Auth/types";
import { Footer, Header, Loading, Sidebar } from "Base/components";
import { DrawerProvider } from "Base/contexts/DrawerContext";
import { SidebarProvider } from "Base/contexts/SidebarContext";
import AppLayout from "./AppLayout";

const HEADER_HEIGHT = "0px"; // Ajusta esto según la altura de tu header

const AuthenticatedApp = ({ Component, pageProps }: any) => {
  const { user, loading: authLoading } = useAuthStatus<User>();
  const router = useRouter();

  if (authLoading) {
    return <Loading h="100vh" />;
  }

  const isAdmin = user?.rol === "ADMIN";

  if (isAdmin) {
    return (
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    );
  }

  // Renderización para usuarios no administradores
  return (
    <DrawerProvider>
      <SidebarProvider>
        <Flex direction="column" minH="100vh">
          <Header
            menu={[]}
            showSidebarToggle={false}
            username={user?.firstName || ""}
          />

          <Component {...pageProps} />

          <Footer />
        </Flex>
      </SidebarProvider>
    </DrawerProvider>
  );
};

export default AuthenticatedApp;
