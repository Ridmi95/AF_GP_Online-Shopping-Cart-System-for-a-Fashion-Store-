// @flow
import { lazy } from "react";
import { USER_ROLES } from "constants/user";
import authRoutes from "modules/auth/routes";

export default [
  {
    path: "/",
    exact: true,
    auth: false,
    roles: [USER_ROLES.ADMIN],
    component: lazy(() => import("modules/dashboard/home")),
  },
  ...authRoutes,
];
