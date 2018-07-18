import {getAllPostsHoc} from 'backend/graphql';
import {ScreenHeaderButton} from 'components';
import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import UserFeedScreen, {IFeedProps} from './index';

interface IWithNavigationProps {
	navigation: NavigationScreenProp<any>;
}

const withHotPostsFeed = (BaseComponent: React.ComponentType<IFeedProps>) => {
	return class extends React.Component {
		private static navigationOptions = ({navigation}: IWithNavigationProps) => ({
			title: 'HOT POSTS NOW',
			headerRight: <ScreenHeaderButton onPress={() => navigation.goBack(null)} iconName={'ios-arrow-forward'} />,
			headerLeft: <View />,
		});

		public render() {
			return <BaseComponent shareSectionPlaceholder={null} {...this.props} />;
		}
	};
};

// TODO @Jake: update posts hook here!
const withHotPosts = getAllPostsHoc(UserFeedScreen);
export default withHotPostsFeed(withHotPosts as any);
