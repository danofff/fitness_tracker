import "./StyledCheckbox.css";

const StyledCheckbox = ({ onChangeHandler, label, checked = true }) => {
  return (
    <div className="checkbox__control">
      <input
        type="checkbox"
        onChange={() => {
          onChangeHandler();
        }}
        checked={checked}
      />
      <label>{label}</label>
    </div>
  );
};

export default StyledCheckbox;
