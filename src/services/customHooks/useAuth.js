import React, { useContext } from "react";
import AuthContext from "../../contexts/auth";

export function useAuth() {
  const context = useContext(AuthContext);
  //   console.log(context);
  return context;
}
