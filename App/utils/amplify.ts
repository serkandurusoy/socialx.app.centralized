import {Auth} from 'aws-amplify';

export interface ISignup {
	username: string;
	password: string;
	attributes: {
		phone_number: string;
		email: string;
	};
}

export const Signup = (params: ISignup): Promise<any> => Auth.signUp(params);
export const ConfirmSignup = (username: string, code: string): Promise<any> => Auth.confirmSignUp(username, code);
export const resendSignup = (username: string): Promise<any> => Auth.resendSignUp(username);

export const Signin = (username: string, password: string): Promise<any> => Auth.signIn(username, password);
export const ConfirmSignin = (username: string, code: string): Promise<any> => Auth.confirmSignIn(username, code);

export const CurrentUser = (): Promise<any> => Auth.currentAuthenticatedUser();
export const CurrentUserSession = (): Promise<any> => Auth.currentSession();
export const CurrentUserInfo = (): Promise<any> => Auth.currentUserInfo();
export const CurrentUserPool = (): Promise<any> => Auth.currentUserPoolUser();

export const ForgotPassword = (username: string): Promise<any> => Auth.forgotPassword(username);
export const ForgotPasswordConfirm = (username: string, code: string, password: string): Promise<any> => Auth.forgotPasswordSubmit(username, code, password); /* tslint:disable-line */
export const ChangePassword = (user: any, oldPass: string, newPass: string): Promise<any> => Auth.changePassword(user, oldPass, newPass); /* tslint:disable-line */

export const Signout = (): Promise<any> => Auth.signOut();
