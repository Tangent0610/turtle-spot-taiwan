import { TurtleSpotPage } from "@/components/turtle-spot/turtle-spot-page";
import { getActivities } from "@/lib/apollo";
import { sortActivitiesByDateDesc } from "@/lib/activity-utils";

const Home = async () => {
  const activities = sortActivitiesByDateDesc(await getActivities());

  return <TurtleSpotPage activities={activities} />;
};

export default Home;
