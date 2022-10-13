import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { TmdbMovie } from "~types/TmdbMovie";

type PropsType = {
  data: TmdbMovie;
};

const Movie = ({ data }: PropsType) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get the ID from the query string
  const { q } = context.query;
  console.log(q);

  // Fetch data from the TMDB API
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.API_KEY
    }&query=${q ?? ""}`
  );

  const data = await res.json();
  console.log(data);

  // Pass data to the page via props
  return { props: { data } };
};

export default Movie;
