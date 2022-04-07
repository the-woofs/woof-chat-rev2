import "./index.css";

import { Card } from "antd";

import SignUpForm from "../../Components/SignUpForm";

function Auth() {
  return (
    <div className="RootContainer">
      <div className="InnerGrid">
        <Card title="Sign Up">
          <h2>New Here?</h2>
          <br />
          <SignUpForm />
        </Card>
        <Card title="Sign In">
          <h2>Already Got An Account?</h2>
        </Card>
      </div>
    </div>
  );
}

export default Auth;
