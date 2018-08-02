import {ipfsConfig as base} from 'configuration';
import {AvatarImagePlaceholder} from 'consts';
import {IUserQuery} from 'types';

export const getUserAvatar = (data: {user: IUserQuery}) => {
	if (!data) {
		return AvatarImagePlaceholder;
	}
	if (!data.user) {
		return AvatarImagePlaceholder;
	}
	return data.user.avatar ? base.ipfs_URL + data.user.avatar.hash : AvatarImagePlaceholder;
};

export const getUserAvatarNew = (user: IUserQuery) => {
	if (!user || !user.avatar) {
		return AvatarImagePlaceholder;
	}
	return base.ipfs_URL + user.avatar.hash;
};

export const getUserFullName = (user: IUserQuery) => {
	return user.name;
};
