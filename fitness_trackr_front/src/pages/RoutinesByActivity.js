import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import RoutinePublic from "../components/RoutinePublic";

import { getActivityRoutineAct } from "../store/dataActions";
import classes from "./Routines.module.css";

const RoutinesByUser = (props) => {
  const { activityId } = useParams();
  const [activityName, setActivityName] = useState("");
  const dispatch = useDispatch();
  const activityRoutines = useSelector((state) => state.data.activityRoutines);

  useEffect(() => {
    dispatch(getActivityRoutineAct(activityId));
  }, [dispatch, activityId]);

  useEffect(() => {
    if (activityRoutines.length > 0) {
      const activity = activityRoutines[0].activities.find((activity) => {
        return activity.activityId === Number.parseInt(activityId);
      });
      // console.log(activity, activityId, activityRoutines[0]);
      if (activity) {
        setActivityName(activity.name);
      }
    }
  }, [activityRoutines, activityId]);

  return (
    <section className={classes.routinespage}>
      <h1>Routines featuring "{activityName}"</h1>
      <ul className={classes.main}>
        {activityRoutines.map((routine) => {
          return <RoutinePublic key={routine.id} routine={routine} />;
        })}
      </ul>
    </section>
  );
};

export default RoutinesByUser;
