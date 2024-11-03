import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Heading,
  Button,
  Stack,
  Text,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { UserContext } from '../userContext';
import AddPostModal from '../components/AddPostModal';
import { Post } from '../interfaces/Post';

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(UserContext);

  const loadPosts = () => {
    setLoading(true);
    fetch('http://localhost:3000/post')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error('Napaka pri pridobivanju objav:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostAdded = () => {
    loadPosts();
  };

  return (
    <Box p={6} maxW="container.lg" mx="auto">
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Forum - Objave
      </Heading>
      {user && (
        <Button onClick={onOpen} colorScheme="blue" mb={6}>
          Dodaj novo objavo
        </Button>
      )}
      {loading ? (
        <Spinner size="xl" />
      ) : posts.length === 0 ? (
        <Text fontSize="lg" color="gray.500" textAlign="center" mt={8}>
          Trenutno ni nobenih objav.
        </Text>
      ) : (
        <Stack spacing={6}>
          {posts.map((post) => (
            <Box
              key={post._id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              _hover={{ bg: 'gray.50' }}
            >
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={2} fontSize="md" color="gray.600">
                Kategorija: {post.category}
              </Text>
              <Text mt={2} fontSize="sm" color="gray.500">
                Avtor: {post?.userId?.username || 'Neznan uporabnik'}
              </Text>
              <Link to={`/posts/${post._id}`}>
                <Button colorScheme="teal" mt={4}>
                  Preberi več
                </Button>
              </Link>
            </Box>
          ))}
        </Stack>
      )}
      <AddPostModal
        isOpen={isOpen}
        onClose={onClose}
        onPostAdded={handlePostAdded}
      />
    </Box>
  );
};

export default Posts;
