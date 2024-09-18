import Image from "next/image";
import { Typography, Stack, Link } from "@/components/ui";

export default async function Home() {
  return (
    <div>
      <main>
        <Image
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js demo"
          width={220}
          height={48}
          priority
        />
        <Typography variant="h3" align="center" sx={{ my: 2 }}>
          Demo
        </Typography>
        <Stack alignItems="center">
          <Link href="/login" variant="h5">
            Login
          </Link>
        </Stack>
      </main>
    </div>
  );
}
