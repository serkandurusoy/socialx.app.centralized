import Icons from '../theme/Icons';

export enum FormTypes {
	Input,
	AvatarPicker,
	Checkbox,
}

export enum DeviceOrientations {
	Portrait = 'PORTRAIT',
	Landscape = 'LANDSCAPE',
	Uknown = 'UNKNOWN',
	Upsidedown = 'PORTRAITUPSIDEDOWN',
}

export enum OS_TYPES {
	iOS = 'ios',
	Android = 'android',
}

export enum CoinSymbol {
	// here the values are in sync with CoinIcons & CoinFullName keys
	SOCX = 'SOCX',
	ETH = 'ETH',
}

export enum CoinIcons {
	SOCX = Icons.socxCoinIcon,
	ETH = Icons.ethCoinIcon,
}

export enum CoinFullName {
	SOCX = 'SOCX',
	ETH = 'Ethereum',
}
