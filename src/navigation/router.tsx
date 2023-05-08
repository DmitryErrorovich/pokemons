import { Route, Routes } from "react-router";
import { ROUTES } from "./const";
import Home from "../pages/Home";

export const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Home  />} />
    </Routes>
  );
};
