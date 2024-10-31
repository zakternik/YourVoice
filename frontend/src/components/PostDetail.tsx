// components/PostDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';

interface Post {
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`) // Uporabite port 3000
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Napaka pri pridobivanju objave:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <Box p={6} maxW="container.md" mx="auto">
      {loading ? (
        <Spinner size="xl" />
      ) : post ? (
        <>
          <Heading as="h2" size="xl" mb={4}>
            {post.title}
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Kategorija: {post.category} | Datum:{' '}
            {new Date(post.createdAt).toLocaleDateString()}
          </Text>
          <Text mt={4}>{post.content}</Text>
        </>
      ) : (
        <Text>Objava ni najdena.</Text>
      )}
    </Box>
  );
};

export default PostDetail;
