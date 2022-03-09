import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { editActivityAct } from "../store/dataActions";
import FormControl from "./ui/FormControl";

import classes from "./Activity.module.css";

const Activity = ({ activity }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [nameInput, setNameInput] = useState(activity.name);
  const [descriptionInput, setDescriptionInput] = useState(
    activity.description
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const onClickEditHandler = (event) => {
    setIsEditMode((prevState) => {
      return !prevState;
    });
  };

  const onEditAccept = (event) => {
    event.preventDefault();
    dispatch(
      editActivityAct(user.token, activity.id, nameInput, descriptionInput)
    );
    setIsEditMode(false);
  };

  return (
    <div className={classes.activity}>
      <div className={classes.inner}>
        <form className={classes.form} onSubmit={onEditAccept}>
          {isEditMode ? (
            <div className={classes.textInput}>
              <FormControl
                type="text"
                label="Name"
                value={nameInput}
                onInputChange={(e) => setNameInput(e.target.value)}
              />
            </div>
          ) : (
            <div className={classes.textInput}>
              <Link to={`/activities/${activity.id}/routines`}>
                <h2>{activity.name}</h2>
              </Link>
            </div>
          )}
          {isEditMode ? (
            <div className={classes.textInput}>
              <textarea
                rows="4"
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
              ></textarea>
            </div>
          ) : (
            <div className={classes.textInput}>
              <p>{activity.description}</p>
            </div>
          )}

          {user && (
            <button
              onClick={onClickEditHandler}
              className={classes.editFormToggle}
              type="button"
            >
              {isEditMode ? "Cancel" : "Edit"}
            </button>
          )}
          {isEditMode && (
            // <button className={classes.acceptButton}>&#10004;</button>
            <button className={classes.acceptButton}>Done</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Activity;
