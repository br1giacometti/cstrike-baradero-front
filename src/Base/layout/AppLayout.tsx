import { PropsWithChildren } from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";

import {
  BriefcaseIcon,
  HomeIcon,
  CubeIcon,
  ArchiveBoxIcon,
  ClipboardDocumentListIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

import { SidebarProvider } from "Base/contexts/SidebarContext";
import { DrawerProvider } from "Base/contexts/DrawerContext";
import { Drawer, Header, Sidebar, Footer } from "Base/components";
import { useTranslation } from "Base/i18n";

const HEADER_HEIGHT = "70px";

const AppLayout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation("appLayout");

  const sidebarMenu = [
    {
      title: t("sidebar.menu.home"),
      path: "/movements/create-aplication",
      icon: HomeIcon,
    },
    {
      title: t("sidebar.menu.team"),
      path: "/team",
      icon: CubeIcon,
    },
    {
      title: t("sidebar.menu.player"),
      path: "/player",
      icon: CubeIcon,
    },
  ];

  return (
    <DrawerProvider>
      <SidebarProvider>
        <Drawer menu={sidebarMenu} />
        <Flex>
          <Sidebar
            colorScheme="main"
            display={{ base: "none", md: "block" }}
            menu={sidebarMenu}
          />
          <Stack spacing={0} w="full">
            <Header menu={[]} username="" />
            <Box minH={`calc(100vh - ${HEADER_HEIGHT})`} pt={4}>
              {children}
            </Box>
            <Footer />
          </Stack>
        </Flex>
      </SidebarProvider>
    </DrawerProvider>
  );
};

export default AppLayout;
