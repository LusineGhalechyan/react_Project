import ToDo from "../components/ToDo/pages/ToDo";
import About from "../components/ToDo/pages/About/About";
import SingleTask from "../components/ToDo/pages/SingleTask/SingleTask";
import Contact from "../components/ToDo/pages/Contact/Contact";
import NotFound from "../components/ToDo/pages/NotFound/NotFound";

export const routesData = [
  {
    path: "/",
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
