import React, { useState, useRef, useContext } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { UserContext } from '../userContext';

interface AddPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostAdded: () => void;
}

const AddPostModal: React.FC<AddPostModalProps> = ({
  isOpen,
  onClose,
  onPostAdded,
}) => {
  const { user } = useContext(UserContext); // Pridobi trenutno prijavljenega uporabnika
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const toast = useToast();

  // Ref za prvo vnosno polje
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!user) {
      toast({ title: 'Napaka: Uporabnik ni prijavljen.', status: 'error' });
      return;
    }

    fetch('http://localhost:3000/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, category, userId: user._id }), // Vključi userId
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        toast({ title: 'Objava uspešno dodana!', status: 'success' });
        setTitle('');
        setContent('');
        setCategory('');
        onPostAdded();
        onClose();
      })
      .catch((error) => {
        console.error('Error adding post:', error);
        toast({ title: 'Napaka pri dodajanju objave.', status: 'error' });
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={titleInputRef} // Nastavi fokus na prvo vnosno polje
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodaj novo objavo</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl mb={4}>
            <FormLabel>Naslov</FormLabel>
            <Input
              ref={titleInputRef} // Ref za fokus
              placeholder="Vnesite naslov"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Kategorija</FormLabel>
            <Input
              placeholder="Vnesite kategorijo"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Vsebina</FormLabel>
            <Textarea
              placeholder="Vnesite vsebino"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit} mr={3}>
            Shrani
          </Button>
          <Button onClick={onClose}>Prekliči</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPostModal;
