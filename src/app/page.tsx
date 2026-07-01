import { TurtleSpotPage } from "@/components/turtle-spot-page";
import { getActivities } from "@/lib/apollo";
import { sortActivitiesByDateDesc } from "@/lib/activity-utils";

export default async function Home() {
  const activities = sortActivitiesByDateDesc(await getActivities());

  return <TurtleSpotPage activities={activities} />;
}
