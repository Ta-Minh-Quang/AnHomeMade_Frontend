import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
//  if(!sessionStorage.getItem("UserLogged")) {
//  return <Navigate to="/admin" replace />;
//  }
 return children;
};
export default Protected;