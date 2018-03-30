import React, {Component} from 'react';
import {NavigationScreenProp} from 'react-navigation';
import {RewardsScreenComponent} from './screen';

export enum PieChartSections {
	REFERRALS = 'RFLS',
	POSTS = 'PST',
	BOUNTIES = 'BNTS',
}

interface StaticListDataItem {
	title: string;
	badge: PieChartSections;
}

export interface ChartListDataItem extends StaticListDataItem {
	percentValue: number;
}

const ChartListData: StaticListDataItem[] = [
	{
		title: 'Referrals',
		badge: PieChartSections.REFERRALS,
	},
	{
		title: 'Posts',
		badge: PieChartSections.POSTS,
	},
	{
		title: 'Bounties',
		badge: PieChartSections.BOUNTIES,
	},
];

// this should come from the outside as props!
// keys here are associated with 'badge' key in ChartListData
const PIE_CHART_VALUES: any = {};
PIE_CHART_VALUES[PieChartSections.REFERRALS] = 22;
PIE_CHART_VALUES[PieChartSections.POSTS] = 35;
PIE_CHART_VALUES[PieChartSections.BOUNTIES] = 43;

interface RewardsScreenProps {
	navigation: NavigationScreenProp<any>;
}

interface IRewardsScreenState {
	pieChartData: ChartListDataItem[];
}

export class RewardsScreen extends Component<RewardsScreenProps, IRewardsScreenState> {
	private static navigationOptions = (props: RewardsScreenProps) => ({
		title: 'REWARDS',
	})

	constructor(props: RewardsScreenProps) {
		super(props);
		this.state = {
			pieChartData: this.getPieChartData(),
		};
	}

	public render() {
		return <RewardsScreenComponent pieChartData={this.state.pieChartData} backToWallet={this.backToWalletHandler} />;
	}

	private getPieChartData = () => {
		const ret: ChartListDataItem[] = [];
		ChartListData.forEach((listItem) => {
			ret.push({
				...listItem,
				percentValue: PIE_CHART_VALUES[listItem.badge],
			});
		});
		return ret;
	}

	private backToWalletHandler = () => {
		alert('backToWalletHandler');
	}
}
