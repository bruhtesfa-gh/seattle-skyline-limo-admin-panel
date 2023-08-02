import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

function NonAuthRoutes() {
  return <Route index element={<LoginPage />} />;
}
{
  /* <Route path="teams" element={<Teams />}>
   <Route path=":teamId" element={<Team />} />
   <Route path="new" element={<NewTeamForm />} />
   <Route index element={<LeagueStandings />} /> */
}
{
  /* </Route> */
}

export default NonAuthRoutes;
