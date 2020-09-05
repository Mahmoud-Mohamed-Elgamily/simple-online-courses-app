import Home from "client/home/Home";

const routes = [
  {
    path: "/home",
    component: Home,
    title: "dashboard",
    needsAuth: false,
  },
];

export default routes;
