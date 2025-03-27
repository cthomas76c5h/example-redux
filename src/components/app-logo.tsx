import AppLogoIcon from "./app-logo-icon";
import { useSelector } from "react-redux";
import { type SharedData } from "../types";

export default function AppLogo() {
  const name = useSelector((state: SharedData) => state.name);

  return (
    <>
      <div className="text-sidebar-primary-foreground flex square size-8 items-center justify-center">
        <AppLogoIcon className="size-8 text-dark dark:text-white" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-none font-semibold">{name}</span>
      </div>
    </>
  );
}
