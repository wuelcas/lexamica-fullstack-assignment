import Head from "next/head";
import Container from "react-bootstrap/Container";
import KanbanBoard from "../components/KanbanBoard";

export default function Home() {
  return (
    <Container fluid className="py-5">
      <Head>
        <title>Lexamica Kanban Board</title>
        <meta name="description" content="Lexamica Fullstack Assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <KanbanBoard />
    </Container>
  );
}
