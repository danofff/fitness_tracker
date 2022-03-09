import { Link } from "react-router-dom";

import classes from "./RoutineActivity.module.css";

const RoutineActivity = ({ activity }) => {
  return (
    <tr className={classes.routineActivity}>
      <td className={classes.nameTD}>
        <Link to={`/activities/${activity.activityId}/routines`}>
          {activity.name}
        </Link>
      </td>
      <td className={classes.descriptionTD}>{activity.description}</td>
      <td className={classes.countTD}>{activity.count}</td>
      <td className={classes.durationTD}>{activity.duration}</td>
    </tr>
  );
};

export default RoutineActivity;
