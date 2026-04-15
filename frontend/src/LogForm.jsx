import { useState } from "react";
import LogList from "./LogList";

function LogForm() {
  const [text, setText] = useState("");
  const[file, setFile] = useState(null);
    const [logs, setLogs] = useState([]);

  const handleAddLog = () => {
    if (text.trim() === "" && !file) return;
    const newLog = {
        text,
        file,
        date: new Date().toLocaleString()
    };
    
    setLogs([...logs, newLog]);
    setText("");
    setFile(null);
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Add Internship Log</h2>

      <input
        type="text"
        placeholder="Enter your log..."
        value={text}
        onChange={(e) => setLog(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginRight: "10px"
        }}
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        />

      <button onClick={handleAddLog} style={{ padding: "10px 20px" }}>
        Add Log
      </button>

      
      <LogList logs={logs} />
    </div>
  );
}

export default LogForm;