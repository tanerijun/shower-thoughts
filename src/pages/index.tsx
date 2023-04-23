import { type NextPage } from "next";
import { Container, Loading, Text, type CSS, Spacer } from "@nextui-org/react";
import { api } from "~/utils/api";
import CreatePostWizard from "~/components/CreatePostWizard";
import PostsRenderer from "~/components/PostsRenderer";

const containerStyles: CSS = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const Home: NextPage = () => {
  const { data: posts, isLoading } = api.post.getAll.useQuery();

  console.log(posts); // DEBUG

  if (isLoading) {
    return (
      <Container fluid css={containerStyles}>
        <Loading size="lg">
          <Text>Finding shower thoughts from all over the world...</Text>
        </Loading>
      </Container>
    );
  }

  if (!posts) {
    return (
      <Container fluid css={containerStyles}>
        <Text>
          There&apos;re no shower thoughts here. Maybe you can add one?
        </Text>
      </Container>
    );
  }

  return (
    <Container fluid as="main" css={containerStyles}>
      <Spacer y={2} />
      <CreatePostWizard />
      <Spacer y={2} />
      <PostsRenderer posts={posts} />
    </Container>
  );
};

export default Home;
