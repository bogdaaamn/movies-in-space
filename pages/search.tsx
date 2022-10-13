import { GetServerSideProps } from "next/types";
import { TmdbSearchResult } from "~types/TmdbSearchResult";

type PropsType = {
  data: TmdbSearchResult;
};

const Movie = ({ data }: PropsType) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get the query from the query string
  const { q } = context.query;

  // Fetch data from the TMDB API
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.API_KEY
    }&query=${q ?? ""}`
  );

  const data: TmdbSearchResult = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};

export default Movie;
