import { useEffect, useState } from "react";

function App() {
  const [count1, setCount1] = useState(0);

  function test() {
    fetch("/api")
      .then((data) => {
        return data.json();
      })
      .then((post) => {
        console.log(post[0]);
        setCount1(post[0].expression);
      });
  }

  return <>Hey</>;
}

export default App;
