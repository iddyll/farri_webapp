import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getUserSteamDetails } from "../../utils/api";

import AppContainer from "../../components/ui/Layout/AppContainer";
import UserSteamDetailsCard from "../../components/core/dashboard/UserSteamDetailsCard";
import NavBar from "../../components/shared/NavBar/NavBar";
import LoadingSpinner from "../../components/ui/Animation/LoadingSpinner/LoadingSpinner";

type TParams = { steamID: string };

const DashboardPresenter = ({
  match,
  history
}: RouteComponentProps<TParams>) => {
  const [validID, setValidID] = useState(null);
  const steamID: string = match.params.steamID;

  useEffect(() => {
    const validateID = async () => {
      try {
        const data = await getUserSteamDetails(steamID);
        setValidID(data.steamID64);

        const name = data.name;
        document.title =
          name + " - Dashboard // Farri - Check your CS:GO Statistics";
      } catch (err) {
        // If the user enters an invalid steamID(anything) after /dashboard/{..}
        // we redirect the user to "/" or else the App would crash.
        history.push("/");
      }
    };
    validateID();
  });

  if (validID === null)
    return (
      <AppContainer>
        <NavBar />
        <div style={{ textAlign: "center" }}>
          <LoadingSpinner />
        </div>
      </AppContainer>
    );

  return (
    <AppContainer>
      <NavBar />
      <UserSteamDetailsCard steamID={steamID} />
    </AppContainer>
  );
};

export default DashboardPresenter;
