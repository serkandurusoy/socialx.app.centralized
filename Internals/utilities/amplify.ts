import {Auth} from 'aws-amplify';

// <============= Auth =============>
export interface ISignup {
	username: string;
	password: string;
	attributes: {
		phone_number: string;
		email: string;
		custom: {
			avatarImage?: string;
			userId: string;
			name: string;
		};
	};
}

export const Signup = (params: ISignup): Promise<any> => Auth.signUp(params);
export const ConfirmSignup = (username: string, code: string): Promise<any> => Auth.confirmSignUp(username, code);
export const resendSignup = (username: string): Promise<any> => Auth.resendSignUp(username);

export const Signin = (username: string, password: string): Promise<any> => Auth.signIn(username, password);
export const ConfirmSignin = (username: string, code: string, mfaType: string | null): Promise<any> =>
	Auth.confirmSignIn(username, code, mfaType);

export const CurrentUser = (): Promise<any> => Auth.currentAuthenticatedUser();
export const CurrentUserSession = (): Promise<any> => Auth.currentSession();
export const CurrentUserInfo = (): Promise<any> => Auth.currentUserInfo();
export const CurrentUserPool = (): Promise<any> => Auth.currentUserPoolUser();

export const ForgotPassword = (username: string): Promise<any> => Auth.forgotPassword(username);
export const ForgotPasswordConfirm = (username: string, code: string, password: string): Promise<any> =>
	Auth.forgotPasswordSubmit(username, code, password);

export const ChangePassword = (user: any, oldPass: string, newPass: string): Promise<any> =>
	Auth.changePassword(user, oldPass, newPass);

export const Signout = (): Promise<any> => Auth.signOut();

export const updateUserAttr = async (attr: any): Promise<any> =>
	Auth.updateUserAttributes(await Auth.currentAuthenticatedUser(), attr);

export const essentialCreds = async (): Promise<any> => Auth.essentialCredentials(await Auth.currentUserCredentials());
