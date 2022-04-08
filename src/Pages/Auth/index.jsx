import React, { useState } from "react";
import "./index.css";

import { Card } from "antd";

import SignUpForm from "../../Components/SignUpForm";
import SignInForm from "../../Components/SignInForm";

function Auth() {
  const [isNew, setIsNew] = useState(false);

  return (
    <div className="RootContainer">
      <div className="InnerGrid">
        {!isNew && (
          <Card title="Sign In" className="Card">
            <SignInForm />
            <p>
              Don't Have An Account?{" "}
              <u onClick={() => setIsNew(true)}>Sign Up</u>
            </p>
          </Card>
        )}
        {isNew && (
          <Card title="Sign Up" className="Card">
            <SignUpForm />
            <p>
              Already Have An Account?{" "}
              <u onClick={() => setIsNew(false)}>Sign In</u>
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Auth;
