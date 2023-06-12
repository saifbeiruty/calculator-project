import { ChangeEvent } from "react";

interface Props {
  variable: string[];
  onVariableFill: (event: ChangeEvent<HTMLInputElement>) => void;
}

const VariableHolder = ({ variable, onVariableFill }: Props) => {
  return (
    <div style={{ marginLeft: "1rem" }}>
      {variable.length === 0 && <p>No Variable Present</p>}
      <ul className="variable">
        {variable.map((item) => (
          <li style={{ listStyleType: "none" }} key={item}>
            <form className="form-inline">
              <label
                style={{
                  fontWeight: "bold",
                  fontSize: "25px",
                  marginRight: "0.3rem",
                }}
                htmlFor={item}
              >
                {item}
              </label>
              <input id={item} onChange={onVariableFill} />
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VariableHolder;
