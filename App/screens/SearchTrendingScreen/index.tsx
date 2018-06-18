import * as _ from 'lodash';
import React, {Component} from 'react';
import {InteractionManager} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';

import SearchTrendingScreenComponent from './screen';

interface ISearchTrendingScreenProps {
	navigation: NavigationScreenProp<any>;
}

interface ISearchTrendingScreenState {}

export default class SearchTrendingScreen extends Component<ISearchTrendingScreenProps, ISearchTrendingScreenState> {
	private static navigationOptions = (props: ISearchTrendingScreenProps) => ({
		headerTitle: () => {
			const onPressHandler = _.get(props, 'navigation.state.params.onStartSearch', null);
			return <DisabledSearchHeader onPress={onPressHandler} />;
		},
	});

	public componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.navigation.setParams({onStartSearch: this.startSearchHandler});
		});
	}

	public render() {
		return <SearchTrendingScreenComponent />;
	}

	private startSearchHandler = () => {
		this.props.navigation.navigate('SearchScreen');
	};
}
