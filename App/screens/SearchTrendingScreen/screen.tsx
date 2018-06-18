import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';

import {Icons} from 'theme';
import style from './style';

interface ISearchTrendingSCProps {}

interface ISearchTrendingSCState {}

export default class SearchTrendingSC extends Component<ISearchTrendingSCProps, ISearchTrendingSCState> {
	public render() {
		return <View style={style.container}>{this.renderEmptyState()}</View>;
	}

	// TODO: here we should have a screen with trending searches
	private renderEmptyState = () => {
		return (
			<View style={style.emptyContainer}>
				<Image source={Icons.searchTabStartSearch} resizeMode={'contain'} style={style.startSearchIcon} />
				<Text style={style.startSearchText}>{'Start searching now'}</Text>
			</View>
		);
	};
}
