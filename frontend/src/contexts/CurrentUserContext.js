import { createContext } from "react"

const defaultUser = {
  name: "",
  about: "",
  avatar: "",
  email: ""
};

export const CurrentUserContext = createContext(defaultUser);