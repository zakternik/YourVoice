import { Button } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Link } from 'react-router-dom';

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
            YourVoice je interaktivni forum, zasnovan za izmenjavo informacij in
            povezovanje uporabnikov. Aplikacija omogoča prijavljenim
            uporabnikom, da objavljajo svoje vsebine, komentirajo, ocenjujejo
            objave drugih ter urejajo svoj profil. Prijavljeni uporabniki lahko
            tudi aktivno sodelujejo pri predlogih in ocenjevanju izboljšav
            spletnega foruma. Neprijavljeni uporabniki lahko brskajo po objavah,
            vendar brez možnosti interakcije. Napredne funkcionalnosti
            vključujejo filtriranje in sortiranje objav, napredno iskanje ter
            ostale možnosti. Aplikacija vključuje tudi posebne funkcionalnosti
            ter pravice za moderatorje in administratorje. Za razvoj je
            uporabljen MERN sklad.
          </p>

          <hr></hr>

          <div className="d-flex justify-content-center flex-column">
            <h3 className="d-flex justify-content-center mb-4 mt-4">
              Vstop v forum
            </h3>
            <Link to="/posts" className="d-flex justify-content-center">
              <Button
                w={'180px'}
                colorScheme={'blue'}
                bg={'blue.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'blue.300',
                }}
              >
                <Link to={`/posts`}>
                  Vstopi <FontAwesomeIcon icon={faDoorOpen} />
                </Link>{' '}
                <br></br>
              </Button>
            </Link>
          </div>
        </div>

        <div className="col-md-6">
          <img src="images/default.png" width="500px" alt="YourVoice logo" />
        </div>
      </div>
    </div>
  );
};

export default Home;
