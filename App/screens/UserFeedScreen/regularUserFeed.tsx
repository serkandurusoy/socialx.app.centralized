import {getPublicPostsHoc} from 'backend/graphql';
import {ScreenHeaderButton} from 'components';
import React from 'react';
import {NavigationStackScreenOptions} from 'react-navigation';
import {Icons} from 'theme';
import UserFeedScreen, {IFeedProps} from './index';

const withRegularUserFeed = (
	BaseComponent: React.ComponentType<IFeedProps>,
	navOptions: Partial<NavigationStackScreenOptions> = {},
) => {
	return class extends React.Component {
		private static navigationOptions = navOptions;

		public render() {
			return (
				<BaseComponent
					Posts={this.props.Posts}
					navigation={this.props.navigation}
					hideShareSection={false}
				/>
			);
		}
	};
};

const navigationOptions = (props: any) => {
	return {
		title: 'FEED',
		headerRight: (
			<ScreenHeaderButton onPress={() => navigateToMessagingScreen(props)} iconSource={Icons.messagingIcon} />
		),
		headerLeft: <ScreenHeaderButton iconName={'md-flame'} onPress={() => {/* navigateToHotPosts(props) */}} />,
	};
};

const navigateToMessagingScreen = (props: IFeedProps) => {
	props.navigation.navigate('MessagingScreen');
};

const navigateToHotPosts = (props: IFeedProps) => {
	props.navigation.navigate('HotPostsFeedScreenStack');
};

const withAllPosts = getPublicPostsHoc(UserFeedScreen);
export default withRegularUserFeed(withAllPosts, navigationOptions as any);
