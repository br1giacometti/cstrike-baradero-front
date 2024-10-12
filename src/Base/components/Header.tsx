import {
  Center,
  Flex,
  Icon,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import { useSidebar } from "Base/contexts/SidebarContext";
import { useDrawer } from "Base/contexts/DrawerContext";

import { ProfileMenu } from "Base/components";

import ContextMenuItem from "Base/types/ContextMenuItem";
import { useAuthMethods, useAuthStatus } from "@kushitech/auth-module";

interface HeaderProps {
  menu: ContextMenuItem[];
  username: string;
  hideMenuOnMobile?: boolean;
  showSidebarToggle?: boolean; // Nueva propiedad para controlar la visibilidad del toggle
}

const Header = ({
  menu,
  username,
  hideMenuOnMobile,
  showSidebarToggle = true, // Valor predeterminado es true
}: HeaderProps): JSX.Element => {
  const sidebar = useSidebar();
  const drawer = useDrawer();
  const { toggleColorMode } = useColorMode();
  const ColorModeIcon = useColorModeValue(SunIcon, MoonIcon);

  const { logout } = useAuthStatus();

  const handleLogout = () => {
    logout();
  };

  return (
    <Flex
      borderBottom="1px solid"
      borderColor="neutral.300"
      h="70px"
      justifyContent="space-between"
      px={4}
      transition="width 0.4s"
      // Cambia el ancho solo si showSidebarToggle es true
      w={{
        lg: showSidebarToggle
          ? `calc(100vw - 16px - ${sidebar.isOpen ? "250px" : "70px"} )`
          : "100%",
      }}
    >
      {showSidebarToggle && (
        <Center py={3}>
          <IconButton
            aria-label="Menu"
            display={{ base: "none", md: !sidebar.isOpen ? "initial" : "none" }}
            icon={<Icon as={Bars3Icon} h={4} w={4} />}
            mr={2}
            px={3}
            size="xs"
            variant="ghost"
            onClick={sidebar.toggle}
          />
          <IconButton
            aria-label="Menu"
            display={{
              base: hideMenuOnMobile ? "none" : "initial",
              md: "none",
            }}
            icon={<Icon as={Bars3Icon} h={4} w={4} />}
            mr={2}
            px={3}
            size="xs"
            variant="ghost"
            onClick={drawer.toggle}
          />
        </Center>
      )}
      <Center gap={2}>
        <ProfileMenu menu={menu} username={username} logout={handleLogout} />
      </Center>
    </Flex>
  );
};

export default Header;
