import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addRoutineActivityAct } from "../store/dataActions";

import classes from "./AddRoutineActivity.module.css";

const AddRoutineActivity = ({ routineId, activities = [] }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [selectInput, setSelectInput] = useState(
    activities.length && activities[0].id
  );
  const [countInput, setCountInput] = useState(1);
  const [durationInput, setDurationInput] = useState(1);

  const onAddActivitySubmit = (event) => {
    event.preventDefault();
    dispatch(
      addRoutineActivityAct(
        user.token,
        routineId,
        selectInput,
        countInput,
        durationInput
      )
    );
  };

  return (
    <form className={classes.form} onSubmit={onAddActivitySubmit}>
      <table>
        <thead>
          <tr className={classes.labelTR}>
            <td>
              <label htmlFor="activity">Activity</label>
            </td>
            <td>
              <label htmlFor="count">Count</label>
            </td>
            <td>
              <label htmlFor="duration">Duration</label>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.addTR}>
            <td>
              <select
                onChange={(e) => {
                  setSelectInput(e.target.value);
                }}
                value={selectInput}
              >
                {activities.map((activity) => {
                  return (
                    <option value={activity.id} key={activity.id}>
                      {activity.name}
                    </option>
                  );
                })}
              </select>
            </td>
            <td>
              <input
                className={classes.numInput}
                type="number"
                min="1"
                step="1"
                name="count"
                value={countInput}
                onChange={(e) => {
                  setCountInput(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                className={classes.numInput}
                type="number"
                min="1"
                step="1"
                name="duration"
                value={durationInput}
                onChange={(e) => setDurationInput(e.target.value)}
              />
            </td>
            <td className={classes.addButtonTD}>
              <button className={classes.addActivityButton}>
                Add activity
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default AddRoutineActivity;
