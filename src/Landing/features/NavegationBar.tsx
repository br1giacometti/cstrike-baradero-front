// Landing/features/NavegationBar.tsx
import { Flex, Text, HStack, Link, Box, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const NavegationBar = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      bg="gray.800"
      color="white"
      p={4}
      w="100%"
      position="fixed"
      top={0}
      zIndex={10}
    >
      {/* Logo con línea debajo */}
      <VStack
        align="start"
        spacing={1}
        cursor="pointer"
        onClick={() => handleNavigation("/")}
      >
        <Text fontSize="2xl" fontWeight="bold">
          CStrike Baradero
        </Text>
        <Box w="100%" h="2px" bg="rgb(177, 203, 2)" />
      </VStack>

      {/* Enlaces */}
      <HStack spacing={6}>
        {["Inicio", "Fixture", "Estadísticas", "Equipos"].map((item) => (
          <Link
            key={item}
            onClick={() => handleNavigation(`/${item.toLowerCase()}`)}
            _hover={{ color: "rgb(177, 203, 2)" }}
            transition="color 0.3s"
            fontSize="lg"
          >
            {item}
          </Link>
        ))}
      </HStack>
    </Flex>
  );
};

export default NavegationBar;
