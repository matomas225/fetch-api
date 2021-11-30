import { useEffect, useState } from "react";
import "./app.css";
function App() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [postData, setPostData] = useState();
  const [input, setInput] = useState();
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

  const fetchData = async () => {
    try {
      setLoadingFetch(true);
      const response = await fetch(
        "https://dev.api.globetrott.app/api/build-version/"
      );
      setData(await response.json());
    } catch (error) {
      setError("Fetch Went Wrong");
    }
    setLoadingFetch(false);
  };

  const getInput = (event) => {
    setInput(event.target.value);
  };

  const postDataTo = async () => {
    try {
      setLoadingPost(true);
      const response = await fetch(
        "https://dev.api.globetrott.app/api/check-app-version/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ app_version: `${input}` }),
        }
      );
      setPostData(await response.json());
    } catch (error) {
      console.log(error);
      setError("Post Went Wrong");
    }
    setLoadingPost(false);
  };
  return (
    <div className="App">
      <div>
        {loadingFetch ? (
          <button style={{ backgroundColor: "gray" }}>Fetch Data</button>
        ) : (
          <button onClick={fetchData}>Fetch Data</button>
        )}

        <br />
        <input type="text" value={input} onChange={getInput} />
        <br />
        {loadingPost ? (
          <button style={{ backgroundColor: "gray" }}>Post Input</button>
        ) : (
          <button onClick={postDataTo}>Post Input</button>
        )}

        <br />
        {data ? (
          <h1 style={{ color: error ? `red` : `green` }}>
            {error ? `Error: ${error}` : `Your Data is: ${data}`}
          </h1>
        ) : (
          ""
        )}
        {postData ? (
          <h1
            style={{
              color: postData.validation_result === "OK" ? "green" : "red",
            }}
          >
            Post Returns: {postData.validation_result}
          </h1>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
