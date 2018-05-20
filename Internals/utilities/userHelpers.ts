import {ipfsConfig as base} from 'configuration';
import {AvatarImagePlaceholder} from 'consts';
import {IUserQuery} from 'types';

export const getUserAvatar = (user: IUserQuery) => {
	return user.avatar ? base.ipfs_URL + user.avatar.hash : AvatarImagePlaceholder;
};

export const getUserFullName = (user: IUserQuery) => {
	return user.name;
};
