import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import type { Activity } from "./activity-utils";

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ??
  "https://f2e-test.simpleinfo.tw/graphql";

export const ACTIVITIES_QUERY = gql`
  query Activities {
    activities {
      title
      description
      post_link
      date
    }
  }
`;

type ActivitiesQuery = {
  activities: Activity[];
};

function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: GRAPHQL_ENDPOINT,
      fetchOptions: { cache: "no-store" },
    }),
  });
}

export async function getActivities() {
  try {
    const { data } = await createApolloClient().query<ActivitiesQuery>({
      query: ACTIVITIES_QUERY,
      fetchPolicy: "no-cache",
    });

    return data?.activities ?? [];
  } catch {
    return [];
  }
}
