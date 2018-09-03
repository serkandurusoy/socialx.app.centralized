// MIGRATION: jake and serkan, decide what to do
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
