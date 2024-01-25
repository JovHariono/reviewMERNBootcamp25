import { useContext } from "react";
import { ContextApplication } from "../../libs/config/contexts";
import { Outlet } from "react-router-dom";
import PageAuthSignIn from "../auth/PageAuthSignIn";
import LibComponentNavbar from "../../libs/components/LibComponentNavbar";

const PageCommonOutlet = () => {
  const application = useContext(ContextApplication);

  return (
    <>
      {application.isAuthenticated ? (
        <>
          <LibComponentNavbar />
          <Outlet />
        </>
      ) : (
        <PageAuthSignIn />
      )}
    </>
  );
};

export default PageCommonOutlet;
