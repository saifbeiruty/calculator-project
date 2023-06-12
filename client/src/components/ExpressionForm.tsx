import { FormEvent, useState } from "react";
import VariableHolder from "./VariableHolder";
import OldExpressions from "./OldExpressions";

const ExpressionForm = () => {
  const [expression, setExpression] = useState({
    expression: "",
  });
  // Used to hold the variables to be rendered using VariableHolder
  const [variableName, setVariableName] = useState<string[]>([]);
  // Holds the key-value(variable-value) that are sent to the backend
  const [variables, setVariables] = useState<{ [key: string]: any }>({});

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Prevents submission of empty expression form
    if (expression.expression === "") return alert("Empty Expression");

    if (variableName.length === 0 && Object.values(variables).length > 0) {
      alert("Empty Variable");
      return;
    }
    console.log(variables);

    try {
      // fetch [POST] to the backend to save to the database
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expression: expression.expression,
          variables,
        }),
      });

      if (response.ok) {
        console.log("Calculation successful");
      } else {
        throw new Error("Calculation failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setVariableName([]);
    setVariables({});
    setExpression({ ...expression, expression: "" });
  };

  const handleVariable = (event: FormEvent<HTMLInputElement>) => {
    // Destructure the id and value
    const { id, value } = event.target as HTMLInputElement;
    //
    setVariables((variables) => ({
      ...variables,
      [id]: value,
    }));
  };

  // Modifies the expression to a format that can be parsed
  const modifyExpressionFormat = (inputExpression: string) => {
    let newExpression = inputExpression.replace(/(\d+)(?=[a-zA-Z][(])/g, "$1*");
    newExpression = newExpression.replace(/(\d+)([a-zA-Z])/g, "$1*$2");
    newExpression = newExpression.replace(/(\))(\()/g, "$1*$2");
    return newExpression;
  };

  const changeHandler = (event: FormEvent<HTMLInputElement>) => {
    // Prevents user from typing multiple consecutive / and * and other not allowed characers i.e. ?,!
    const inputExpression = (event.target as HTMLInputElement).value;
    const regex = /^(?!.*[*/]{2}|.*\([^)]*[\/*]\))[-+*/()\w]+$/;
    if (inputExpression === "" || regex.test(inputExpression)) {
      const newExpression = modifyExpressionFormat(inputExpression);
      setExpression({ expression: newExpression });
    }

    // Checks if there is a variable in the expression
    const regex2 = /([a-zA-Z]+)/g;
    const variableMatches = inputExpression.match(regex2);
    if (variableMatches !== null) {
      setVariableName(variableMatches);
    } else {
      setVariableName([]);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              style={{ fontWeight: "bold" }}
              htmlFor="expression"
              className="form-label"
            >
              Expression
            </label>
            <input
              onChange={changeHandler}
              id="expression"
              type="text"
              className="form-control"
              value={expression.expression}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        <VariableHolder
          variable={variableName}
          onVariableFill={handleVariable}
        />
      </div>
      <OldExpressions expression={expression} />
    </>
  );
};

export default ExpressionForm;
