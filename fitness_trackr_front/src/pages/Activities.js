import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormControl from "../components/ui/FormControl";
import Activity from "../components/Activity";
import { createActivityAct, getActivitiesAct } from "../store/dataActions";

import classes from "./Activities.module.css";
import { uiActions } from "../store/uiSlice";

const Activities = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const activities = useSelector((state) => state.data.activities);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  useEffect(() => {
    dispatch(uiActions.setLoader(true));
    dispatch(getActivitiesAct());
    dispatch(uiActions.setLoader(false));
  }, [dispatch]);

  const openFormToggle = (event) => {
    if (isFormOpen === true) {
      setIsFormOpen(false);
      setNameInput("");
      setDescriptionInput("");
    }

    if (isFormOpen === false) {
      setIsFormOpen(true);
    }
  };

  const onNameInputChange = (event) => {
    setNameInput(event.target.value);
  };

  const onDescriptionInputChange = (event) => {
    setDescriptionInput(event.target.value);
  };

  //create activity submission
  const onFormSubmit = async (event) => {
    event.preventDefault();
    dispatch(createActivityAct(user.token, nameInput, descriptionInput));
    setNameInput("");
    setDescriptionInput("");
    setIsFormOpen(false);
  };

  return (
    <section className={classes.activities}>
      <h1>Activities</h1>
      <div className={classes.main}>
        {user &&
          (isFormOpen ? (
            <form className={classes.form} onSubmit={onFormSubmit}>
              <h3>Create a new activity</h3>
              <div className={classes.formRight}>
                <div className={classes.cancelButtonBox}>
                  <button
                    className={classes.cancelButton}
                    onClick={openFormToggle}
                    type="button"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className={classes.inputsBox}>
                  <FormControl
                    type="text"
                    value={nameInput}
                    onInputChange={onNameInputChange}
                    label="Name"
                  />

                  <FormControl
                    type="text"
                    value={descriptionInput}
                    onInputChange={onDescriptionInputChange}
                    label="Description"
                  />
                  <button className={classes.submitButton} type="submit">
                    Create Activity
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <button className={classes.openFormButton} onClick={openFormToggle}>
              <i className="fas fa-plus-circle"></i> New Activity
            </button>
          ))}
        <ul>
          {activities.map((activity) => {
            return <Activity key={activity.id} activity={activity} />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default Activities;
