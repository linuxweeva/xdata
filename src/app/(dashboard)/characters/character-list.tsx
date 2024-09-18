"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Typography,
  Paper,
  TextField,
} from "@/components/ui";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/constants";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface RickAndMortyResponse {
  results: Character[];
  info: {
    count: number;
    next: string | null;
    prev: string | null;
  };
}

const ROWS_PER_PAGE = 20;

export default function CharacterList() {
  const router = useRouter();

  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = ROWS_PER_PAGE;
  const [totalCount, setTotalCount] = useState<number>(0);
  const [filter, setFilter] = useState<string>("");
  const [debouncedFilter, setDebouncedFilter] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filter]);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_URL}/character/?page=${page}&name=${debouncedFilter}`,
        );
        if (!response.ok) {
          setError("Nothing found");
          return;
        }
        const data: RickAndMortyResponse = await response.json();
        setCharacterList(data.results);
        setTotalCount(data.info.count);
      } catch (err) {
        console.log(err, "eeee");
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page, debouncedFilter]);

  useEffect(() => {
    if (debouncedFilter) {
      setPage(1);
    }
  }, [debouncedFilter]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleRowClick = (id: number) => {
    router.push(`/character/${id}`);
  };

  return (
    <Paper>
      {error && <Typography color="error">{error}</Typography>}
      {loading && <CircularProgress />}
      <TextField
        label="Filter by Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filter}
        onChange={handleFilterChange}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Species</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characterList.length > 0 ? (
              characterList.map((character) => (
                <TableRow
                  key={character.id}
                  onClick={() => handleRowClick(character.id)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{character.name}</TableCell>
                  <TableCell>{character.status}</TableCell>
                  <TableCell>{character.species}</TableCell>
                  <TableCell>
                    <Image
                      src={character.image}
                      alt={character.name}
                      width={50}
                      height={50}
                      quality={80}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography>No results found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
      />
    </Paper>
  );
}
