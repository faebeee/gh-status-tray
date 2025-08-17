import { useEffect, useState } from "react";

export const Footer = () => {
  const [buildTime, setBuildTime] = useState("");

  const load = async () => {
    const { buildTime: _buildTime } = await window.app.getBuildTime();
    setBuildTime(_buildTime);
  };

  useEffect(() => {
    load();
  }, []);

  return <footer>
    <span className={"text-sm text-muted-foreground"}>Build: {buildTime}</span>
  </footer>;
};
