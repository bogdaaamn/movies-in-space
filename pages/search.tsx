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
    `${process.env.TMDB_API_URL}/search/movie?api_key=${
      process.env.TMDB_API_KEY
    }&query=${q ?? ""}`
  );

  const data: TmdbSearchResult = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};

export default Movie;
