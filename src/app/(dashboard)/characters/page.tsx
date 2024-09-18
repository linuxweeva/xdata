import CharacterList from "./character-list";
import { Container, Typography } from "@/components/ui";

export default function Home() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Character List
      </Typography>
      <CharacterList />
    </Container>
  );
}
