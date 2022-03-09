import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RoutinePublic from "../components/RoutinePublic";
import { getPublicRoutinesAct, getActivitiesAct } from "../store/dataActions";

import classes from "./Routines.module.css";

const Routines = (props) => {
  const dispatch = useDispatch();
  const routines = useSelector((state) => state.data.routines);

  useEffect(() => {
    dispatch(getPublicRoutinesAct());
    dispatch(getActivitiesAct());
  }, [dispatch]);

  return (
    <section className={classes.routinespage}>
      <h1>Routines</h1>
      <ul className={classes.main}>
        {routines.map((routine) => {
          return <RoutinePublic key={routine.id} routine={routine} />;
        })}
      </ul>
    </section>
  );
};

export default Routines;
