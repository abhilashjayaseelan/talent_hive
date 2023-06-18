import { OAuth2Client } from "google-auth-library";
import configKeys from "../../config";
const client = new OAuth2Client(configKeys.GOOGLE_CLIENT_ID);

export const googleAuthService = () => {
  const verify = async (token: string) => {
    const user = {
      name: "",
      email: "",
      image: "",
      isGoogleUser: true,
    };
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: configKeys.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (payload?.given_name && payload.email && payload.picture) {    
      user.name = payload.given_name;
      user.email = payload.email;
      user.image = payload.picture;
    }
    return user;
  };

  return {
    verify,
  };
};

export type GoogleAuthService = typeof googleAuthService;