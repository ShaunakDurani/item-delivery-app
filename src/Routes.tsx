import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Error404 } from "./pages";
import { Loader } from "./components/shared";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
const ProductView = React.lazy(() => import("./pages/ProductView"));

const AppWithRouting: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout component={<Home />} />
          </PrivateRoute>
        }
      />

      <Route
        path="/prn/:name/prid/:id"
        element={
          <Suspense fallback={<Loader fullscreen />}>
            <Layout component={<ProductView />} />
          </Suspense>
        }
      />

      <Route
        path="/not-found"
        element={<Layout noFooter component={<Error404 />} />}
      />
      <Route path="*" element={<Layout noFooter component={<Error404 />} />} />
    </Routes>
  );
};

export default AppWithRouting;
