import * as React from 'react';
import {StatusBar, View} from 'react-native';

import ReduxNavigation from '../../navigation/ReduxNavigation';

// Styles
import styles from './styles';

export interface Props {
	startup: () => void;
}

export class RootContainer extends React.Component<Props> {
	public componentDidMount() {
		this.props.startup();
	}

	public render() {
		return (
			<View style={styles.applicationView}>
				<StatusBar barStyle='light-content' />
				<ReduxNavigation />
			</View>
		);
	}
}
