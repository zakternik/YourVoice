import React, { useContext, useState, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Image,
  Heading,
  useToast,
  Checkbox,
} from '@chakra-ui/react';
import { UserContext, UserContextType } from '../userContext';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const userContext = useContext<UserContextType>(UserContext);
  const toast = useToast();

  const validateInputs = (): boolean => {
    if (!username.trim()) {
      setValidationError('Prosimo, vnesite uporabniško ime.');
      return false;
    }
    if (!password.trim()) {
      setValidationError('Prosimo, vnesite geslo.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
    
      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.message) {
          setError("Nepravilno uporabniško ime ali geslo");
        } else {
          throw new Error('Network response was not ok');
        }
        return;
      }
    
      const data = await res.json();
    
      if (data && data._id) {
        userContext.setUserContext(data);
        toast({
          title: 'Prijava uspešna',
          description: `Dobrodošli, ${username}!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        setError('Nepravilno uporabniško ime ali geslo.');
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      console.error(error);
      setError('Napaka pri prijavi. Poskusite znova.');
    }
  };

  return (
    <Box
      maxW="xl"
      mx="auto"
      mt={12}
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="2xl"
      bg="white"
    >
      {userContext.user ? <Navigate replace to="/" /> : null}

      <Stack align="center" mb={6}>
        <Image
          src="images/default.png"
          alt="YourVoice Logo"
          boxSize="150px"
          mb={4}
        />
        <Heading as="h2" size="lg" color="blue.600">
          Prijava v YourVoice
        </Heading>
        <Text fontSize="md" color="gray.600">
          Pridružite se pogovoru!
        </Text>
      </Stack>

      <form onSubmit={handleLogin}>
        <Stack spacing={5}>
          <FormControl id="username" isRequired>
            <FormLabel fontSize="lg">Uporabniško ime</FormLabel>
            <Input
              type="text"
              placeholder="Vnesite uporabniško ime"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="lg"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel fontSize="lg">Geslo</FormLabel>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Vnesite geslo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="lg"
            />
            <Checkbox
              mt={2}
              isChecked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              required={false}
            >
              Prikaži geslo
            </Checkbox>
          </FormControl>

          {validationError && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {validationError}
            </Text>
          )}

          {error && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {error}
            </Text>
          )}

          <Button
            colorScheme="blue"
            type="submit"
            mt={4}
            size="lg"
            width="full"
          >
            Prijava
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
