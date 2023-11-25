export type UserDetails = {
  name: string;
  email: string;
};

export type AuthVerificationResponse = {
  token: string;
  userDetails: UserDetails;
};

export type TokenizedUserDetails = {
  id: string;
  email: string;
};
