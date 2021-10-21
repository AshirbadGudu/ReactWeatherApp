const { lazy } = require("react");

export const Home = lazy(() => import("./Home")),
  Login = lazy(() => import("./Login")),
  Register = lazy(() => import("./Register"));
