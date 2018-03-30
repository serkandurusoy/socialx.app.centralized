import React, {Component} from 'react';
import {Keyboard, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {ButtonSizes, SXButton} from '../../components/Button';
import {Colors} from '../../theme';
import {ChartListDataRow} from './Components/ChartListDataRow';
import {PieChartComponent} from './Components/PieChart';
import {ChartListDataItem, PieChartSections} from './index';
import style from './style';

interface IRewardsScreenComponentProps {
	pieChartData: ChartListDataItem[];
	backToWallet: () => void;
}

interface IRewardsScreenComponentState {
	selectedPieChartSection: PieChartSections;
}

export class RewardsScreenComponent extends Component<IRewardsScreenComponentProps, IRewardsScreenComponentState> {
	public state = {
		selectedPieChartSection: PieChartSections.REFERRALS,
	};

	public render() {
		return (
			<View style={style.container}>
				<Text style={style.titleText}>{'Overview status'}</Text>
				<PieChartComponent data={this.props.pieChartData} selectedSection={this.state.selectedPieChartSection} />
				{this.renderChartList()}
				<View style={style.buttonPaddingContainer}>
					<SXButton
						label={'BACK TO WALLET'}
						size={ButtonSizes.Large}
						onPress={this.props.backToWallet}
						borderColor={Colors.transparent}
					/>
				</View>
			</View>
		);
	}

	private renderChartList = () => {
		const ret: any[] = [];
		this.props.pieChartData.forEach((pieChartItem, index) => {
			const isLastItem = index === this.props.pieChartData.length - 1;
			ret.push(
				<ChartListDataRow
					key={index}
					{...pieChartItem}
					isSelected={this.state.selectedPieChartSection === pieChartItem.badge}
					selectHandler={() => this.updateSelectedListRow(pieChartItem.badge)}
					hasBorder={!isLastItem}
				/>,
			);
		});
		return ret;
	}

	private updateSelectedListRow = (newRow: PieChartSections) => {
		this.setState({
			selectedPieChartSection: newRow,
		});
	}
}
