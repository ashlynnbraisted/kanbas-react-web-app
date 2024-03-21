import { useSelector, useDispatch } from "react-redux";
import { LabState } from "../../../Store";
function HelloRedux() {
  const { message } = useSelector((state: LabState) => state.helloReducer);
  return (
    <div>
      <h1>Hello Redux</h1>
      <h2>{message}</h2>
    </div>
  );
}
export default HelloRedux;