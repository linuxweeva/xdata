"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  CircularProgress,
  Typography,
  Paper,
  Box,
  Stack,
} from "@/components/ui";
import { API_URL } from "@/lib/constants";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export default function CharacterDetails() {
  const { id } = useParams(); // Use useParams to get the id
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (id) {
        setLoading(true);
        try {
          const response = await fetch(`${API_URL}/character/${id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data: Character = await response.json();
          setCharacter(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCharacter();
  }, [id]);

  if (!id) return <Typography>Loading...</Typography>;
  if (loading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">Error fetching character: {error}</Typography>
    );

  return (
    <Paper>
      {character && (
        <Box sx={{ p: 5 }}>
          <Typography variant="h4" textAlign="center">
            {character.name}
          </Typography>
          <Stack alignItems="center" sx={{ my: 2 }}>
            <Image
              src={character.image}
              alt={character.name}
              width={200}
              height={200}
              priority
            />
          </Stack>
          <Typography textAlign="center">Status: {character.status}</Typography>
          <Typography textAlign="center">
            Species: {character.species}
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
