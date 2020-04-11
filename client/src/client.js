import { useState, useEffect } from "react";
import { GraphQLClient } from "graphql-request";
import config from "./config";

export const useClient = () => {
  const [idToken, setIdToken] = useState("");

  useEffect(() => {
    const token = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token;
    setIdToken(token);
  }, []);

  return new GraphQLClient(config.BASE_URL, {
    headers: { authorization: idToken }
  });
};
