import Home from "client/home/Home";
import MyCourses from "client/myCourses/MyCourses";

const routes = [
  {
    path: "/",
    component: Home,
    title: "home",
    needsAuth: false,
  },
  {
    path: "/myCourses",
    component: MyCourses,
    title: "My Courses",
    needsAuth: true,
  },
];

export default routes;
