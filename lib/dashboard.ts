
export interface NavigationItem {
  label: string;
  ariaLabel: string;
  link: string;
  isButton?: boolean;
}


export const NAVIGATION_DASHBOARD_ITEMS : NavigationItem[] = [
  { label: "Dashboard", ariaLabel: "Go to Dashboard", link: "/dashboard" },
  { label: "Module", ariaLabel: "Go to Modul", link: "/dashboard/module" },
  { label: "Task", ariaLabel: "Go to task", link: "/dashboard/task" },
  { label: "Profile", ariaLabel: "Go to profile", link: "/dashboard/profile" },
];

export default interface UserData{
  name: string;
  nim: string;
  className: string;
  noHp: string;
  gender: string;
  email: string;
  major: string;
  faculty: string;
  year: string;
  topic: string | null;
  document: string;
}


export const ACCORDION_CONTENT = {
  level1: "You will learn to understand the fundamentals of the topic you have chosen.",
  level2: "At this level, you will continue to deepen your knowledge and apply what you have learned in more advanced contexts.",
};
