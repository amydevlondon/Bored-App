import React, { useState, useEffect } from 'react';

export const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [activity, setActivity] = useState();
  const [type, setType] = useState("recreational");
  const types = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"];

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`https://www.boredapi.com/api/activity?type=${type}`);
        const data = await response.json();
        setIsLoading(false);
        setActivity(data.activity);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };
    fetchData();
  }, [type]);

  const changeType = (e) => {
    e.preventDefault();
    setType(e.target.value);
  };

  return (
    isLoading ? <div className="loading">Loading...</div>
      : isError ? <div className="error">Error</div>
        :
        <main>
          <h1 className="title">Bored?</h1>
          <h2 className="activity">{activity}</h2>
          <form className="form">
            <h3 className="sub-title">Try Something Else</h3>
            <select className="form-select" value={type} onChange={changeType}>
              {types.map((item) => {
                return (
                  <option value={item}>{item}</option>
                );
              })}
            </select>
          </form>
        </main>
  );
};

export default App;