import React, { useState, useContext } from 'react';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    useToast,
} from '@chakra-ui/react';
import { UserContext } from '../userContext';
import { useNavigate } from 'react-router-dom';

const EditProfile: React.FC = () => {
    const { user } = useContext(UserContext);
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const navigate = useNavigate();
    const toast = useToast();

    const handleSave = async () => {
        try {
            if (!user || !user._id) {
                throw new Error('Uporabnik ni prijavljen ali ID ni na voljo.');
            }
            const response = await fetch(`http://localhost:3000/user/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email }),
            });

            if (!response.ok) {
                throw new Error('Prišlo je do napake pri posodabljanju profila.');
            }

            const updatedUser = await response.json();

            // Obvestilo o uspehu
            toast({
                title: 'Profil uspešno posodobljen.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            // Preusmeri nazaj na profil
            navigate('/profile');
        } catch (error: any) {
            toast({
                title: 'Napaka.',
                description: error.message || 'Posodobitev ni uspela.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={6} maxW="container.md" mx="auto">
            <Heading as="h2" size="xl" mb={6} textAlign="center">
                Uredi profil
            </Heading>
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Uporabniško ime</FormLabel>
                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>E-pošta</FormLabel>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <Stack direction="row" spacing={4}>
                    <Button colorScheme="teal" onClick={handleSave}>
                        Shrani
                    </Button>
                    <Button colorScheme="red" onClick={() => navigate('/profile')}>
                        Prekliči
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default EditProfile;
