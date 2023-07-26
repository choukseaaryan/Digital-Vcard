import Header from "./components/Header/Header";
import Body from "./components/Body/Body";
import { useParams } from "react-router-dom";

export default function App() {
  const { empID } = useParams();
  
  return (
    <div className="App">
      <Header empID={empID} />
      <Body empID={empID} />
    </div>
  );
};