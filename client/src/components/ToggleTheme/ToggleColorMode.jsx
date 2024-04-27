import { useCallback, useState } from "react";
import "./style.css";
import { GoSun, GoMoon } from "react-icons/go";

const ToggleColorMode = () => {
    const [colorMode, setcolorMode] = useState("dark");
    const toggleColorMode = useCallback(() => {
        console.log("mode changed");
    }, []);

    return (
        <button onClick={toggleColorMode} className="toggle-theme-button">
            {colorMode == "dark" ? <GoSun size={25} /> : <GoMoon size={25} />}
        </button>
    );
};

export default ToggleColorMode;
