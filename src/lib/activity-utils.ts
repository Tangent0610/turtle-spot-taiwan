export type Activity = {
  title: string;
  description: string | null;
  post_link: string | null;
  date: string;
};

export const formatActivityDate = (date: string) => date.replaceAll("-", "/");

export const sortActivitiesByDateDesc = (activities: readonly Activity[]) =>
  [...activities].sort(
    (left, right) =>
      new Date(right.date).getTime() - new Date(left.date).getTime(),
  );
