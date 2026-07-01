export type Activity = {
  title: string;
  description: string | null;
  post_link: string | null;
  date: string;
};

export function formatActivityDate(date: string) {
  return date.replaceAll("-", "/");
}

export function sortActivitiesByDateDesc(activities: readonly Activity[]) {
  return [...activities].sort(
    (left, right) =>
      new Date(right.date).getTime() - new Date(left.date).getTime(),
  );
}
