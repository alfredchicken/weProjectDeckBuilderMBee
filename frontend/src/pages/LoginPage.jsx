import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./loginPage.css";

const LoginPage = () => (
  <div className="login-page-container">
    <Tabs>
      <TabList>
        <Tab>Login</Tab>
        <Tab>Register</Tab>
      </TabList>

      <TabPanel>
        <Login />
      </TabPanel>
      <TabPanel>
        <Register />
      </TabPanel>
    </Tabs>
  </div>
);

export default LoginPage;
