//import { Button, Heading } from "@chakra-ui/react";
/*
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from "@chakra-ui/react";
 */
import React from "react";

const Home: React.FC = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {/* 
                    <Heading className="pb-4">
                        Forum Your Voice
                    </Heading>*/}
                    <p>
                    YourVoice je interaktivni forum, zasnovan za izmenjavo informacij in povezovanje uporabnikov. 
                    Aplikacija omogoča prijavljenim uporabnikom, da objavljajo svoje vsebine, komentirajo, ocenjujejo objave drugih ter urejajo svoj profil. 
                    Prijavljeni uporabniki lahko tudi aktivno sodelujejo pri predlogih in ocenjevanju izboljšav spletnega foruma. 
                    Neprijavljeni uporabniki lahko brskajo po objavah, vendar brez možnosti interakcije. 
                    Napredne funkcionalnosti vključujejo filtriranje in sortiranje objav, napredno iskanje ter ostale možnosti. 
                    Aplikacija vključuje tudi posebne funkcionalnosti ter pravice za moderatorje in administratorje. 
                    Za razvoj je uporabljen MERN sklad.
                    </p>
                </div>

                <div className="col-md-6">
                    <img src="images/default.png" width="500px" alt="Programming Image" />
                </div>
            </div>
        </div>
    );
};

export default Home;
