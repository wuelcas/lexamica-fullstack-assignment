import Head from "next/head";
import Container from "react-bootstrap/Container";
import KanbanBoard from "../components/KanbanBoard";
import { getCategories } from "../api/categories";

export async function getServerSideProps() {
  const categories = await getCategories();
  return {
    props: {
      initialCategories: categories,
    },
  };
}

export default function Home({ initialCategories }) {
  return (
    <Container fluid className="py-5" style={{ height: "100vh" }}>
      <Head>
        <title>Lexamica Kanban Board</title>
        <meta name="description" content="Lexamica Fullstack Assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <KanbanBoard initialCategories={initialCategories} />
    </Container>
  );
}
