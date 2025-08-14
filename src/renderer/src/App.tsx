import { Button } from "@renderer/components/ui/button";
import React from "react";
import { RepositoryList } from "./components/repositories/RepositoryList";

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [verificationUri, setVerificationUri] = React.useState<string | null>(null);
  const [userCode, setUserCode] = React.useState<string | null>(null);

  React.useEffect(() => {
    window.app.getAuthStatus().then(setIsAuthenticated);
    window.app.onVerificationUri(({ verification_uri, user_code }) => {
      console.log(verification_uri, user_code);
      setVerificationUri(verification_uri);
      setUserCode(user_code);
    });
  }, []);

  const handleLogin = () => {
    window.app.startDeviceFlow();
  };

  return (
    <div className={"p-4 flex flex-col gap-4"}>
      {isAuthenticated ? (
        <RepositoryList />
      ) : (
        <div className={"flex flex-col gap-4 items-center"}>
          {verificationUri && userCode ? (
            <div>
              <p>Please go to <a href={verificationUri} target={"_blank"}>{verificationUri}</a> and enter the code:</p>
              <p>{userCode}</p>
            </div>
          ) : (
            <>
              <p>Please login to continue</p>
              <Button onClick={handleLogin}>Login with Github</Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
