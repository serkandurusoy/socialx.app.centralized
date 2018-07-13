declare module 'aws-appsync';
declare module 'aws-appsync-react';
declare module 'aws-appsync/lib/link/auth-link';

declare module 'ipfs-api';
declare module 'browser-ipfs';

declare module 'blob';

declare module 'redux-axios-middleware';

declare module 'react-native-vector-icons';
declare module 'react-native-keyboard-spacer';
declare module 'react-native-modal-dropdown';
declare module 'react-native-svg-charts';
declare module 'react-native-gifted-chat';
declare module 'react-native-android-keyboard-adjust';
declare module 'react-native-smart-splash-screen';
declare module 'react-native-spinkit';

declare module 'react-native-mime-types' {
	export function lookup(filenameOrExt: string): string | false;

	export function contentType(filenameOrExt: string): string | false;

	export function extension(typeString: string): string | false;

	export function charset(typeString: string): string | false;

	export const types: {[key: string]: string};
	export const extensions: {[key: string]: string[]};
}
