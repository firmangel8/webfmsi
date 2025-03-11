/* eslint-disable react/prop-types */
import MainLayout from "./Main";

const PrivateRoute = ({ component }) => {
  return <MainLayout> {component} </MainLayout>;
  // Render the child component or outlet
};

export default PrivateRoute;
