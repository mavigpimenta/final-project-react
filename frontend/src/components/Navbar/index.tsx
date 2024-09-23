import { NavbarContainer, Image, DarkModeButton, NavbarContent, DarkModeImage, UserIconContainer, UserIcon, DropdownMenu, DropdownItem, IconsContainer, LanguageIcon, LanguageDropdown, LanguageItem } from "./styled.module";
import { useEffect, useState } from "react";
import Sun from "/Sun.svg"
import Moon from "/Moon.svg"
import { useNavigate } from "react-router-dom";
import USFlag from "/USFlag.png";
import BRFlag from "/BRFlag.png";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [bgColor, setBgColor] = useState("#ccc");
    const [userInitial, setUserInitial] = useState("U");
    const [userName, setUserName] = useState("Usuário");
    const [selectedLanguage, setSelectedLanguage] = useState(BRFlag);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('dark-mode');
        return savedMode === 'true';
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('dark-mode', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    useEffect(() => {
        const storedUserName = localStorage.getItem('name') || "Usuário";
        const storedBgColor = localStorage.getItem(`${storedUserName}-color`);

        setUserName(formatUserName(storedUserName));
        setUserInitial(storedUserName.charAt(0).toUpperCase());

        if (storedBgColor) {
            setBgColor(storedBgColor);
        } else {
            const newColor = getRandomColor();
            localStorage.setItem(`${storedUserName}-color`, newColor);
            setBgColor(newColor);
        }
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleChangePassword = () => {
        navigate('/updatePass');
    };

    const handleSearchUsers = () => {
        navigate('/users');
    };

    const toggleLanguageDropdown = () => {
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    };

    const handleLanguageSelect = (flag: string) => {
        setSelectedLanguage(flag);
        setIsLanguageDropdownOpen(false);
    };

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const formatUserName = (name: string) => {
        const namesArray = name.split(" ");
        const firstName = namesArray[0];
        const lastName = namesArray[namesArray.length - 1];
        return `${firstName} ${lastName}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    return (
        <NavbarContainer>
            <NavbarContent>
                <Image>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                        width="200px" height="50px" viewBox="0 0 1539.000000 379.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g transform="translate(0.000000,379.000000) scale(0.100000,-0.100000)"
                            stroke="none">
                            <path fill="var(--bosch-logo)"
                                d="M1675 3619 c-401 -42 -801 -248 -1060 -547 -387 -446 -510 -1039
-333 -1602 16 -52 58 -153 94 -225 226 -460 638 -776 1154 -886 89 -20 136
-23 315 -23 240 -1 352 16 537 80 256 89 440 205 634 398 193 194 309 378 398
634 64 185 81 297 80 537 0 179 -3 226 -23 315 -110 515 -427 928 -886 1154
-290 143 -592 198 -910 165z m435 -164 c314 -59 569 -193 796 -420 218 -218
348 -454 416 -762 32 -143 32 -443 0 -590 -115 -529 -479 -944 -985 -1122
-168 -59 -271 -75 -482 -75 -215 -1 -297 12 -474 70 -129 44 -258 108 -376
187 -125 85 -313 275 -398 403 -355 534 -337 1214 46 1730 66 88 213 235 301
301 209 155 443 251 705 289 117 16 331 11 451 -11z" />
                            <path fill="var(--bosch-logo)"
                                d="M1099 2959 c-95 -76 -144 -125 -213 -214 -185 -237 -266 -472 -266
-771 0 -381 167 -726 468 -966 71 -56 75 -58 133 -58 l59 0 0 280 0 280 570 0
570 0 0 -280 0 -280 61 0 c57 0 64 3 122 47 237 181 406 455 463 750 23 120
23 339 0 457 -51 263 -167 478 -355 659 -126 122 -167 147 -235 147 l-56 0 0
-285 0 -285 -567 2 -568 3 -3 283 -2 282 -58 0 c-55 0 -62 -3 -123 -51z m31
-986 l0 -807 -46 44 c-74 72 -161 195 -209 293 -197 408 -128 872 180 1215 31
34 61 62 66 62 5 0 9 -322 9 -807z m1518 742 c388 -424 383 -1063 -11 -1482
-28 -29 -54 -53 -58 -53 -5 0 -9 360 -9 800 0 475 4 800 9 800 5 0 36 -29 69
-65z m-228 -735 l0 -310 -570 0 -570 0 0 310 0 310 570 0 570 0 0 -310z" />
                            <path fill="var(--bosch-text)"
                                d="M8015 3123 c-314 -37 -556 -187 -714 -444 -224 -364 -239 -925 -36
-1319 103 -199 287 -371 474 -441 139 -52 198 -62 376 -63 146 0 182 3 260 22
242 63 446 216 575 433 151 255 206 631 141 967 -46 239 -133 414 -280 566
-155 160 -334 248 -561 276 -81 10 -171 11 -235 3z m186 -523 c177 -33 301
-166 361 -385 30 -113 30 -345 0 -456 -47 -174 -135 -293 -260 -352 -63 -30
-73 -32 -182 -32 -110 0 -118 1 -182 33 -86 42 -157 115 -202 206 -60 123 -71
179 -71 376 0 193 13 257 77 384 86 171 270 261 459 226z" />
                            <path fill="var(--bosch-text)"
                                d="M9938 3115 c-247 -42 -453 -178 -548 -365 -84 -164 -87 -427 -8 -584
74 -147 216 -261 406 -327 31 -11 140 -40 242 -64 196 -46 253 -64 311 -102
88 -58 92 -201 7 -280 -13 -12 -46 -32 -73 -45 -44 -20 -65 -23 -175 -22 -109
0 -134 3 -198 26 -106 38 -176 83 -264 168 l-78 75 -170 -170 -171 -171 79
-80 c167 -171 355 -268 587 -305 119 -18 353 -16 450 5 192 42 341 122 456
244 118 125 169 261 169 452 0 187 -46 315 -151 421 -105 105 -235 161 -520
224 -185 40 -244 58 -311 91 -149 75 -136 255 24 324 147 63 358 16 523 -118
l61 -48 169 164 170 164 -69 65 c-158 147 -336 231 -561 263 -94 13 -263 11
-357 -5z" />
                            <path fill="var(--bosch-text)"
                                d="M11953 3106 c-349 -66 -612 -304 -731 -661 -49 -150 -66 -260 -65
-445 0 -374 107 -662 329 -883 183 -183 398 -267 685 -267 360 0 574 105 784
384 50 66 56 79 44 90 -16 16 -415 286 -421 286 -3 0 -19 -22 -36 -48 -43 -67
-113 -129 -180 -160 -51 -24 -68 -27 -172 -27 -112 0 -117 1 -191 36 -168 81
-268 240 -299 479 -53 407 190 746 513 716 128 -12 229 -68 304 -170 25 -33
51 -61 57 -60 10 1 397 253 419 274 12 10 -99 154 -175 226 -111 107 -236 177
-393 220 -82 23 -372 29 -472 10z" />
                            <path fill="var(--bosch-text)"
                                d="M5150 1986 l0 -1086 599 0 c646 0 672 2 800 54 120 48 252 157 308
254 168 287 70 644 -214 778 -46 22 -83 41 -83 44 0 3 21 16 47 30 26 14 73
50 104 81 108 108 151 246 130 418 -6 49 -17 107 -25 128 -63 180 -196 299
-401 359 -54 16 -123 18 -662 21 l-603 4 0 -1085z m964 634 c98 -16 161 -81
173 -178 8 -70 -29 -150 -88 -189 l-42 -28 -239 -3 -238 -3 0 199 c0 109 3
202 7 205 10 11 361 8 427 -3z m87 -856 c107 -30 159 -96 159 -201 0 -89 -30
-140 -105 -178 l-59 -30 -258 -3 -258 -3 0 215 0 216 232 0 c182 0 244 -3 289
-16z" />
                            <path fill="var(--bosch-text)"
                                d="M13240 1985 l0 -1085 280 0 280 0 2 428 3 427 333 3 332 2 0 -430 0
-430 285 0 285 0 0 1085 0 1085 -285 0 -285 0 0 -400 0 -400 -332 2 -333 3 -3
398 -2 397 -280 0 -280 0 0 -1085z" />
                        </g>
                    </svg>
                </Image>
                <IconsContainer>
                    <DarkModeButton onClick={toggleDarkMode}>
                        <DarkModeImage src={isDarkMode ? Moon : Sun} style={{ filter: isDarkMode ? 'invert(80%) sepia(20%) hue-rotate(190deg)' : 'none' }} />
                    </DarkModeButton>
                    <LanguageIcon onClick={toggleLanguageDropdown}>
                        <img src={selectedLanguage} alt="Selected Language" style={{ width: "30px", height: "30px" }} />
                    </LanguageIcon>
                    {isLanguageDropdownOpen && (
                        <LanguageDropdown>
                            <LanguageItem onClick={() => handleLanguageSelect(BRFlag)}>
                                <img src={BRFlag} alt="Português" style={{ width: "30px", height: "30px", marginRight: "10px" }} /> Português
                            </LanguageItem>
                            <LanguageItem onClick={() => handleLanguageSelect(USFlag)}>
                                <img src={USFlag} alt="Inglês" style={{ width: "30px", height: "30px", marginRight: "10px" }} /> Inglês
                            </LanguageItem>
                        </LanguageDropdown>
                    )}
                    <UserIconContainer onClick={toggleDropdown}>
                        <UserIcon bgColor={bgColor}>{userInitial}</UserIcon>
                        <DropdownMenu isOpen={isDropdownOpen}>
                            <DropdownItem><b>{userName}</b></DropdownItem>
                            <DropdownItem onClick={handleChangePassword}>Mudar Senha</DropdownItem>
                            <DropdownItem onClick={handleSearchUsers}>Buscar Users</DropdownItem>
                            <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
                        </DropdownMenu>
                    </UserIconContainer>
                </IconsContainer>
            </NavbarContent>
        </NavbarContainer >
    )
}

export default Navbar;