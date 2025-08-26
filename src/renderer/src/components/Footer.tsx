import { useEffect, useState } from "react";

export const Footer = () => {
  const [buildTime, setBuildTime] = useState("");
  const [version, setVersion] = useState("");

  const load = async () => {
    const { buildTime: _buildTime, version } = await window.app.getBuildTime();
    setBuildTime(_buildTime);
    setVersion(version)
  };

  useEffect(() => {
    load();
  }, []);

  return <footer>
    <span className={"text-sm text-muted-foreground"}>Build: {buildTime}</span>
    <span className={"text-sm text-muted-foreground"}>Version: {version}</span>
  </footer>;
};
