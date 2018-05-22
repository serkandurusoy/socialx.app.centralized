import {getAllPostsHoc} from 'backend/graphql';
import {ScreenHeaderButton} from 'components';
import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp, NavigationStackScreenOptions} from 'react-navigation';
import UserFeedScreen, {IFeedProps} from './index';

interface IWithHotPostsFeedProps {
	navigation: NavigationScreenProp<any>;
}

const withHotPostsFeed = (
	BaseComponent: React.ComponentType<IFeedProps>,
	navOptions: Partial<NavigationStackScreenOptions> = {},
) => {
	return class extends React.Component<IWithHotPostsFeedProps> {
		private static navigationOptions = navOptions;

		public render() {
			return <BaseComponent navigation={this.props.navigation} hideShareSection={true} />;
		}
	};
};

const navigationOptions = (props: any): Partial<NavigationStackScreenOptions> => {
	return {
		title: 'HOT POSTS NOW',
		headerRight: <ScreenHeaderButton onPress={() => returnToRegularUserFeed(props)} iconName={'ios-arrow-forward'} />,
		headerLeft: <View />,
	};
};

const returnToRegularUserFeed = (props: IFeedProps) => {
	// go back two times, not optimal but works!
	props.navigation.goBack(null);
	props.navigation.goBack(null);
};

// TODO @Jake: update posts hook here!
const withHotPosts = getAllPostsHoc(UserFeedScreen);
export default withHotPostsFeed(withHotPosts as any, navigationOptions as any);
