import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import ContextMenuItem from "../types/ContextMenuItem";

interface ProfileMenuProps {
  menu: ContextMenuItem[];
  profileImageUrl?: string; // No es necesario si usamos una imagen fija
  username?: string;
  logout: () => void;
}

const ProfileMenu = ({
  menu,
  username,
  logout,
}: ProfileMenuProps): JSX.Element => (
  <Center bg="neutral.200" gap={4} height="100%" px={2}>
    <Avatar
      borderColor="black"
      borderWidth="3px"
      h={9}
      src="/userIcon.png" // Ruta a la imagen en el directorio `public`
      w={9}
    />
    <Menu>
      <MenuButton
        as={Button}
        display="flex"
        rightIcon={<ChevronDownIcon />}
        variant="unstyled"
      >
        {username}
      </MenuButton>
      <MenuList>
        {menu.map((menuItem) => (
          <MenuItem key={menuItem.label?.toString()} onClick={menuItem.onClick}>
            {menuItem.label}
          </MenuItem>
        ))}
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  </Center>
);

export default ProfileMenu;
