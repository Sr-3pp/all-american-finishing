import type { User } from "~/types/User";

const defaultAuth = {
  loggedIn: false,
  user: null,
  token: null,
};

export const useAuth = () => {
  const authCoockie: any = useCookie("auth", {
    default: () => defaultAuth,
  });
  const login = (user: User, token: string) => {
    authCoockie.value = {
      loggedIn: true,
      user,
      token,
    };
  };
  const logout = () => {
    authCoockie.value = defaultAuth;
    useRouter().push("/login");
  };

  const isLoggedIn = authCoockie.value.loggedIn;

  return {
    cookie: authCoockie,
    login,
    logout,
    isLoggedIn,
  };
};
