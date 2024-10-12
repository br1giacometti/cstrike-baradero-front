import { Text, useColorModeValue } from "@chakra-ui/react";

interface LogoProps {
  width?: number | string;
}

const Logo = ({ width = 160 }: LogoProps) => {
  const textColor = useColorModeValue("black", "white");

  return (
    <Text
      as="h1"
      fontSize={width}
      fontWeight="bold"
      color={textColor}
      letterSpacing="widest"
      maxH={200}
    >
      HBGuessr
    </Text>
  );
};

export default Logo;
