import { Link } from "react-router-dom";
import RoutineActivityPublic from "./RoutineActivityPublic";

import classes from "./Routine.module.css";

const Routine = ({ routine }) => {
  return (
    <div className={classes.routine}>
      <div className={classes.inner}>
        <div className={classes.routineTop}>
          <h2>{routine.name}</h2>
          <div>
            <span>by: </span>
            <Link to={`/users/${routine.creatorName}/routines`}>
              {routine.creatorName}
            </Link>
          </div>
        </div>

        <p className={classes.goal}>
          <span className={classes.goalLabel}>Goal: </span>
          {routine.goal}
        </p>
        <div className={classes.tableContainer}>
          <table className={classes.table}>
            {/* label row */}
            <thead>
              <tr className={classes.labelTR}>
                <td className={classes.nameTD}>Activity</td>
                <td className={classes.descriptionTD}>Description</td>
                <td className={classes.countTD}>Count</td>
                <td className={classes.durationTD}>Duration</td>
              </tr>
            </thead>

            {/* routine activities rows */}
            <tbody>
              {routine.activities.map((activity) => {
                return (
                  <RoutineActivityPublic
                    key={activity.id}
                    activity={activity}
                    routineId={routine.id}
                    creatorId={routine.creatorId}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Routine;
