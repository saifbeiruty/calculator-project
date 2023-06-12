import { useEffect, useState } from "react";

interface Props {
  expression: object; // Change the prop type to ExpressionItem
}

const OldExpressions = (expression: Props) => {
  const [expressions, setExpressions] = useState<object[]>([]);

  // Fetches old expressions from the database (if any)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        if (!response.ok) {
          throw new Error("Failed to fetch the data");
        }
        const data = await response.json();
        setExpressions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [expression]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1rem",
      }}
    >
      <ul className="list-group">
        {expressions.length === 0 && <p>No Previous Expressions Present</p>}
        {expressions.map((item: any, index: number) => (
          <li key={item.result + index} className="list-group-item">
            Expression: {item.expression} | Result:
            {item.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OldExpressions;
