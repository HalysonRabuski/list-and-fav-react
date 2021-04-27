import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("listfav-signed"))
  );

  return (
    <AuthContext.Provider value={{ signed: user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );

  async function Login(email, password) {
    //Login is using localStorage as an example here, please keep in mind that for real use cases
    // you should not store the user data in front-end
    try {
      const users = JSON.parse(localStorage.getItem("listfav-users"));

      const usr = await users.filter((user) => {
        return user.email === email;
      });

      if (usr.length < 1) {
        return { error: "There is no user registered with the provided email" };
      }

      if (usr[0].password === password) {
        setUser(usr[0]);
        localStorage.setItem("listfav-signed", JSON.stringify(usr[0]));
        return { success: true };
      } else {
        return { error: "Wrong password" };
      }
    } catch (error) {
      return { error: "Oops, something unexpected occured, please try again " };
    }
  }

  async function Logout() {
    setUser(null);
    localStorage.removeItem("listfav-signed");
  }
};

export default AuthContext;
