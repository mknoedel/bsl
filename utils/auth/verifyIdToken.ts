import getAdmin from "./getAdmin";

export default (token: string) => {
  return getAdmin()
    .auth()
    .verifyIdToken(token, true)
    .catch(error => {
      console.error("verifyIdToken", error)
      throw error;
    });
};
