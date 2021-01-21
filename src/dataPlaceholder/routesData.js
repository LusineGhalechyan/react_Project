import MainCover from "../components/MainCover/MainCover";
import ToDo from "../components/ToDo/ToDo";
import About from "../components/pages/About/About";
import SingleTask from "../components/pages/SingleTask/SingleTask";
import Contact from "../components/pages/Contact/Contact";
import NotFound from "../components/pages/NotFound/NotFoundPage/NotFound";

export const routesData = [
  {
    path: "/",
    component: MainCover,
  },
  {
    path: "/profile",
    component: ToDo,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/task/:id",
    component: SingleTask,
  },
  {
    path: "/contact",
    component: Contact,
  },
  {
    path: "/404",
    component: NotFound,
  },
];
