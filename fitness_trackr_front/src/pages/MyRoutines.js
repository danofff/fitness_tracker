import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormControl from "../components/ui/FormControl";
import Routine from "../components/Routine";
import {
  createRoutineAct,
  getActivitiesAct,
  getMyRoutinesAct,
} from "../store/dataActions";
import StyledCheckbox from "../components/ui/StyledCheckbox";

import classes from "./Routines.module.css";
import { uiActions } from "../store/uiSlice";

const MyRoutines = (props) => {
  const user = useSelector((state) => state.user.user);
  const myRoutines = useSelector((state) => state.data.myRoutines);

  const dispatch = useDispatch();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  //fetch all myroutines
  useEffect(() => {
    if (user) {
      dispatch(getMyRoutinesAct(user.token));
      dispatch(getActivitiesAct());
    }
  }, [user, dispatch]);

  //open add routine form handler
  const openFormToggle = (event) => {
    if (isFormOpen === true) {
      setIsFormOpen(false);
      setNameInput("");
      setGoalInput("");
    }
    if (isFormOpen === false) {
      setIsFormOpen(true);
    }
  };

  const onNameInputChange = (event) => {
    setNameInput(event.target.value);
  };

  const onGoalInputChange = (event) => {
    setGoalInput(event.target.value);
  };

  const onSwitchChange = (event) => {
    isPublic ? setIsPublic(false) : setIsPublic(true);
  };

  //add new routine form handler
  const onFormSubmit = (event) => {
    event.preventDefault();
    //UI if success clean inputs and close form,
    //if not leave form open clean form or not?
    dispatch(uiActions.setLoader(true));
    dispatch(
      createRoutineAct(
        user.token,
        user.username,
        isPublic,
        nameInput,
        goalInput
      )
    );

    setNameInput("");
    setGoalInput("");
    setIsPublic(false);
    setIsFormOpen(false);
    dispatch(uiActions.setLoader(false));
  };
  // console.log(myRoutines);
  return (
    <section className={classes.routinespage}>
      <h1>My Routines</h1>
      <div className={classes.main}>
        {isFormOpen && (
          <form className={classes.form} onSubmit={onFormSubmit}>
            <button
              className={classes.cancelButton}
              onClick={openFormToggle}
              type="button"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className={classes.formContent}>
              <h3>Create A New Routine</h3>
              <div className={classes.formRight}>
                <div className={classes.cancelButtonBox}></div>

                <div className={classes.inputsBox}>
                  <FormControl
                    type="text"
                    value={nameInput}
                    onInputChange={onNameInputChange}
                    label="Name"
                  />
                  <FormControl
                    type="text"
                    value={goalInput}
                    onInputChange={onGoalInputChange}
                    label="Goal"
                  />

                  <StyledCheckbox
                    onChangeHandler={onSwitchChange}
                    label={isPublic ? "Public Routine" : "Private Routine"}
                    checked={isPublic}
                  />
                </div>
              </div>
            </div>
            <button className={classes.submitButton} type="submit">
              Create
            </button>
          </form>
        )}

        {!isFormOpen && (
          <button className={classes.openFormButton} onClick={openFormToggle}>
            <i className="fas fa-plus-circle"></i> New Routine
          </button>
        )}
        <ul>
          {myRoutines.map((routine) => {
            return <Routine key={routine.id} routine={routine} />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default MyRoutines;
