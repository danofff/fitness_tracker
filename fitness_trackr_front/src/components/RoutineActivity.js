import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteRoutineActivityAct,
  editRoutineActivityAct,
} from "../store/dataActions";

import classes from "./RoutineActivity.module.css";

const RoutineActivity = ({ activity, isInForm, routineId, creatorId }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [countInput, setCountInput] = useState(activity.count);
  const [durationInput, setDurationInput] = useState(activity.duration);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const onRoutineActivityDelete = (event, activityId) => {
    dispatch(deleteRoutineActivityAct(user.token, activityId, routineId));
  };

  const onRoutineActivityEdit = () => {
    //dispatch action
    dispatch(
      editRoutineActivityAct(user.token, activity.id, countInput, durationInput)
    );
    setIsEdited(false);
  };
  return (
    <tr className={classes.routineActivity}>
      {/* delete button */}
      <td className={classes.deleteTD}>
        {user && creatorId === user.userId && (
          <button
            className={classes.deleteButton}
            type="button"
            onClick={(event) => {
              onRoutineActivityDelete(event, activity.id);
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        )}
      </td>

      {/* single routine activity */}
      <td className={classes.nameTD}>
        <Link to={`/activities/${activity.activityId}/routines`}>
          {activity.name}
        </Link>
      </td>
      <td className={classes.descriptionTD}>{activity.description}</td>

      <td className={classes.countTD}>
        {isEdited ? (
          <input
            type="number"
            min="1"
            step="1"
            onChange={(e) => setCountInput(e.target.value)}
            value={countInput}
          />
        ) : (
          activity.count
        )}
      </td>

      <td className={classes.durationTD}>
        {isEdited ? (
          <input
            type="number"
            min="1"
            step="1"
            onChange={(e) => setDurationInput(e.target.value)}
            value={durationInput}
          />
        ) : (
          activity.duration
        )}
      </td>

      {/* edit buttons */}
      <td className={classes.editButtonsTD}>
        {!isEdited && user && creatorId === user.userId && (
          <button
            className={classes.editButton}
            type="button"
            onClick={(e) => setIsEdited(!isEdited)}
          >
            <i className="fas fa-edit"></i>
          </button>
        )}
        {isEdited && (
          <button
            className={classes.acceptButton}
            type="button"
            onClick={onRoutineActivityEdit}
          >
            <i className="fas fa-check"></i>
          </button>
        )}
      </td>
    </tr>
  );
};

export default RoutineActivity;
