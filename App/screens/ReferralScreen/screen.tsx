import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {Icons} from 'theme';
import GreyContainer from './GrayContainer';
import Row from './Row';
import styles from './style';

const HEADING = 'Lorem ipsum dolor';
const TEXT = 'Lorem ipsum dolor sit amet, consectetur adipi elit, sed do eiusmod tempor incididunt ut labore';
const URL = 'http://www.lorem.ipsum.com';
const CODE = '5H91BGD34';
const INVITE = 'INVITE FRIENDS VIA SOCIAL';

interface IReferralScreenComponentProps {
	copyToClipboard: (value: string) => void;
	onShare: () => Promise<any>;
}

const ReferralScreenComponent: React.SFC<IReferralScreenComponentProps> = ({copyToClipboard, onShare}) => (
	<View style={styles.container}>
		<GreyContainer heading={HEADING} text={TEXT} />
		<Row title='Total referrals' value='18' />
		<Row title='SOCX earned through referrals' value='13,048' last={true} />
		<GreyContainer heading='Share' text={TEXT} />
		<Row title='Invite URL' value={URL} border={true} onCopyText={() => copyToClipboard(URL)} />
		<Row title='Invite Code' value={CODE} border={true} onCopyText={() => copyToClipboard(CODE)} last={true} />
		<View style={styles.footer}>
			<Text style={styles.text}>{INVITE}</Text>
			<TouchableOpacity onPress={onShare} style={styles.iconContainer}>
				<Image source={Icons.shareIconGradient} style={styles.icon} resizeMode='contain' />
			</TouchableOpacity>
		</View>
	</View>
);

export default ReferralScreenComponent;
