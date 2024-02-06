import Header from "../../components/VcardHeader";
import Body from "../../components/VcardBody";
import { useParams } from "react-router-dom";

const VCard = () => {
  const { company, empId } = useParams();
  
  return (
    <>
      <Header empID={empId} company={company} />
      <Body empID={empId} company={company}/>
    </>
  );
};

export default VCard;