import { SearchContainer, SearchImage, StyledSearch } from "./styled.module";

const SearchInput = () => {
    return (
        <SearchContainer>
            <StyledSearch></StyledSearch>
            <SearchImage><svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64.000000 64.000000"
                preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                    fill="var(--text-color)" stroke="none">
                    <path d="M180 607 c-49 -16 -133 -102 -148 -153 -28 -94 -8 -169 63 -240 80
-80 176 -95 279 -43 l47 23 89 -89 c71 -71 92 -87 102 -77 10 10 -6 31 -77
102 l-89 89 23 47 c49 98 37 193 -36 274 -65 72 -158 97 -253 67z m190 -61
c59 -39 85 -89 85 -166 0 -78 -26 -127 -88 -168 -56 -37 -153 -39 -210 -3 -76
47 -111 140 -88 229 14 51 75 117 123 131 53 16 135 6 178 -23z"/>
                    <path d="M185 541 c-22 -10 -48 -27 -57 -37 -35 -39 -62 -134 -39 -134 5 0 11
19 15 42 9 57 67 115 124 124 23 4 42 10 42 15 0 15 -43 10 -85 -10z"/>
                </g>
            </svg>
            </SearchImage>
        </SearchContainer>
    )
}

export default SearchInput;