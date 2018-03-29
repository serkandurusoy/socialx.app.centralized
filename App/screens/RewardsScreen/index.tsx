import React, {Component} from 'react';
import {Keyboard, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {NavigationScreenProp} from 'react-navigation';
import {ButtonSizes, SXButton} from '../../components/Button';
import {Sizes} from '../../theme';
import {Colors} from '../../theme';
import {BarChartComponent} from './Components/BarChart';
import {PieChart, PieChartComponent} from './Components/PieChart';
import {UnderPieLineComponent} from './Components/UnderPieLineComponent';
import style from './style';

const PIECHART = {
	referals: {
		index: 0,
		left: 'RFLS',
		center: 'Referrals',
		right: 22,
	},
	posts: {
		index: 1,
		left: 'PST',
		center: 'Posts',
		right: 39,
	},
	bounties: {
		index: 2,
		left: 'BNTS',
		center: 'Bounties',
		right: 39,
	},
};
const PIE_CHART_SELECTED_FILL = Colors.diminishedRed;
const PIE_CHART_FILL = Colors.geyser;

const BAR_CHART_FIRST_FILL = Colors.ceriseRed;
const BAR_CHART_SECOND_FILL = Colors.diminishedRed;

const DATA_FOR_BAR_CHART_MONTH = [14, 80, 100, 55, 14, 80, 100, 55, 14, 80, 100, 55, 14, 80, 100, 55];
const DATA_FOR_BAR_CHART_YEAR = [
	{
		value: 50,
		label: 'One',
	},
	{
		value: 10,
		label: 'Two',
	},
	{
		value: 40,
		label: 'Three',
	},
	{
		value: 95,
		label: 'Four',
	},
	{
		value: 85,
		label: 'Five',
	},
];

interface RewardsScreenProps {
	navigation: NavigationScreenProp<any>;
}

export class RewardsScreen extends Component<RewardsScreenProps> {
	private static navigationOptions = (props: RewardsScreenProps) => ({
		title: 'REWARDS',
	});

	public state = {
		postText: '',
		selected: 0,
		selectedPercent: PIECHART.referals.right,
	};
	private setSelectedToRederals = () => {
		this.setState({
			selected: 0,
			selectedPercent: PIECHART.referals.right,
		});
	};
	private setSelectedToPosts = () => {
		this.setState({
			selected: 1,
			selectedPercent: PIECHART.posts.right,
		});
	};
	private setSelectedToBounties = () => {
		this.setState({
			selected: 2,
			selectedPercent: PIECHART.bounties.right,
		});
	};
	private backToWalletHandler = () => {
		alert('backToWalletHandler');
	};

	public render() {
		const dataForPieChart = [
			{
				key: 1,
				value: 50,
				svg: {fill: this.getColor(0)},
			},
			{
				key: 2,
				value: 50,
				svg: {fill: this.getColor(1)},
			},
			{
				key: 3,
				value: 40,
				svg: {fill: this.getColor(2)},
			},
		];
		return (
			<View style={style.container}>
				<Text style={style.topText}>{'Overview status'}</Text>
				<PieChartComponent data={dataForPieChart} selectedPercent={this.state.selectedPercent} />

				<TouchableOpacity onPress={this.setSelectedToRederals}>
					<UnderPieLineComponent
						left={PIECHART.referals.left}
						center={PIECHART.referals.center}
						right={PIECHART.referals.right}
						index={PIECHART.referals.index}
						selectedFieldColorIndex={this.state.selected}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={this.setSelectedToPosts}>
					<UnderPieLineComponent
						left={PIECHART.posts.left}
						center={PIECHART.posts.center}
						right={PIECHART.posts.right}
						index={PIECHART.posts.index}
						selectedFieldColorIndex={this.state.selected}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={this.setSelectedToBounties}>
					<UnderPieLineComponent
						left={PIECHART.bounties.left}
						center={PIECHART.bounties.center}
						right={PIECHART.bounties.right}
						index={PIECHART.bounties.index}
						selectedFieldColorIndex={this.state.selected}
					/>
				</TouchableOpacity>

				{/*<ScrollView horizontal={true} centerContent={true} style={style.barChartContainer}>
					{DATA_FOR_BAR_CHART_YEAR.map((item, index) => {
						return (
							<BarChartComponent data={item}/>
						);
					})}
				</ScrollView>
				<ScrollView horizontal={true} centerContent={true} style={style.barChartContainer}>
					{DATA_FOR_BAR_CHART_MONTH.map((item, index) => {
						return (
							<BarChartComponent data={item}/>
						);
					})}
				</ScrollView>*/}
				<SXButton
					label={'BACK TO WALLET'}
					size={ButtonSizes.Large}
					width={Sizes.smartHorizontalScale(320)}
					onPress={this.backToWalletHandler}
				/>
			</View>
		);
	}

	private getColor(index: number) {
		if (this.state.selected === index) {
			return PIE_CHART_SELECTED_FILL;
		}
		return PIE_CHART_FILL;
	}
}
