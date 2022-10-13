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
  const { id } = context.query;

  // Fetch data from the TMDB API
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  );

  const data: TmdbMovie = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};

export default Movie;
