import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ToggleColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={() => toggleColorMode()} pos={"absolute"} top={0} right={0} m={"1rem"}>
      {colorMode == "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default ToggleColorMode;
