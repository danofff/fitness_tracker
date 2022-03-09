import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import FormControl from "./ui/FormControl";
import StyledCheckbox from "./ui/StyledCheckbox";
import { editRoutineAct } from "../store/dataActions";

import classes from "./EditRoutineForm.module.css";

const EditRoutineForm = ({ routine, onClose }) => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [nameInput, setNameInput] = useState(routine.name);
  const [goalInput, setGoalInput] = useState(routine.goal);
  const [isPublic, setIsPublic] = useState(routine.isPublic);

  const onNameChange = (event) => {
    setNameInput(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setGoalInput(event.target.value);
  };

  const onEditSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editRoutineAct(user.token, routine.id, nameInput, goalInput, isPublic)
    );
    onClose();
  };

  return (
    <div>
      <form className={classes.form}>
        <div className={classes.buttonBox}>
          <button
            className={classes.cancelButton}
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button className={classes.submitButton} onClick={onEditSubmit}>
            Edit
          </button>
        </div>

        <FormControl
          type="text"
          value={nameInput}
          onInputChange={onNameChange}
          label="Name"
        />
        <FormControl
          type="text"
          value={goalInput}
          onInputChange={onDescriptionChange}
          label="Goal"
        />
        <StyledCheckbox
          checked={isPublic}
          onChangeHandler={() => {
            setIsPublic(!isPublic);
          }}
          label={isPublic ? "Public Routine" : "Private Routine"}
        />
      </form>
    </div>
  );
};

export default EditRoutineForm;
