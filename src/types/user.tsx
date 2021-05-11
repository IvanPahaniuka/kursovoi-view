export interface IUserWithEmail {
    email: string;
}

export interface IUserWithPassword {
    password: string;
}

export interface IIdentifiedUser {
    id: number;
}

export interface IUserWithAccessToken {
    accessToken: string;
}

export interface IUser extends IIdentifiedUser, IUserWithEmail, IUserWithPassword {}
export interface ISigninUser extends IUserWithEmail, IUserWithPassword {}
export interface ISignupUser extends IUserWithEmail, IUserWithPassword {}
export interface ILoggedInUser extends IIdentifiedUser, IUserWithEmail, IUserWithAccessToken {}