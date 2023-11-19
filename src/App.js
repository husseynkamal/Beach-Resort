import React, { Fragment, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import Navbar from "./components/UI/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { beachActions } from "./components/store/beachSlice";
import items from "./data";
import Loading from "./components/UI/Loading";

const Home = React.lazy(() => import("./pages/Home"));
const Rooms = React.lazy(() => import("./pages/Rooms"));
const SingleRoom = React.lazy(() => import("./pages/SingleRoom"));
const Error = React.lazy(() => import("./pages/Error"));

const App = () => {
  const rooms = useSelector((state) => state.dataBeach.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(beachActions.formatData(items));
  }, [dispatch]);

  useEffect(() => {
    dispatch(beachActions.featuredData(rooms));
  }, [dispatch, rooms]);

  return (
    <Fragment>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:slug" element={<SingleRoom />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
};

export default App;
