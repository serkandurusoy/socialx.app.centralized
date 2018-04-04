import moment from 'moment';
import numeral from 'numeral';
import React, {Component} from 'react';
import {
	Animated,
	Easing,
	FlatList,
	Keyboard,
	LayoutEvent,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {ButtonSizes, SXButton} from '../../components/Button';
import {MessagingTabButton} from '../../components/MessagingTabButton';
import {Colors, colorWithAlpha} from '../../theme';
import {ChartListDataRow} from './Components/ChartListDataRow';
import {PieChartComponent} from './Components/PieChart';
import {ChartListDataItem, IDailyBarChartData, IMonthlyBarChartData, PieChartSections} from './index';
import style, {DAY_CHART_ITEM_WIDTH} from './style';

enum RewardsTabView {
	DAILY,
	MONTHLY,
}

interface IRewardsScreenComponentProps {
	pieChartData: ChartListDataItem[];
	backToWallet: () => void;
	totalAmount: number;
	dailySeries: IDailyBarChartData[];
	monthlySeries: IMonthlyBarChartData[];
}

interface IRewardsScreenComponentState {
	selectedPieChartSection: PieChartSections;
	selectedView: RewardsTabView;
}

export class RewardsScreenComponent extends Component<IRewardsScreenComponentProps, IRewardsScreenComponentState> {
	public state = {
		selectedPieChartSection: PieChartSections.REFERRALS,
		selectedView: RewardsTabView.DAILY,
		translateX: new Animated.Value(0),
	};

	private slideWidth = 0;
	private maxDailyValue = 0; // we do not expect negative values!
	private maxMonthValue = 0; // we do not expect negative values!
	private scrollRef: FlatList | undefined;

	constructor(props: IRewardsScreenComponentProps) {
		super(props);
		this.maxDailyValue = this.getMaxSeriesValue(this.props.dailySeries);
		this.maxMonthValue = this.getMaxSeriesValue(this.props.monthlySeries);
	}

	public render() {
		const totalAmountWithFormat = numeral(this.props.totalAmount).format('0.000a');
		return (
			<View style={style.container}>
				<Text style={style.titleText}>{'Overview status'}</Text>
				<PieChartComponent data={this.props.pieChartData} selectedSection={this.state.selectedPieChartSection} />
				{this.renderChartList()}
				<View style={style.viewSwitchButtonsContainer}>
					<MessagingTabButton
						text={'daily'}
						selected={this.state.selectedView === RewardsTabView.DAILY}
						onPress={() => this.tabUpdatedHandler(RewardsTabView.DAILY)}
					/>
					<MessagingTabButton
						text={'monthly'}
						selected={this.state.selectedView === RewardsTabView.MONTHLY}
						onPress={() => this.tabUpdatedHandler(RewardsTabView.MONTHLY)}
					/>
				</View>
				<View style={style.totalAmountRow}>
					<Text style={style.totalAmountValue}>{totalAmountWithFormat}</Text>
					<Text style={style.totalAmountLabel}>{'Total amount'}</Text>
				</View>
				<View style={style.animatedViewport}>
					<Animated.View style={[style.animatedView, {transform: [{translateX: this.state.translateX}]}]}>
						<View style={style.fullWidth} onLayout={this.dailyChartContainerOnLayout}>
							<FlatList
								showsHorizontalScrollIndicator={false}
								ref={(ref: FlatList) => (this.scrollRef = ref)}
								onLayout={() => this.scrollRef.scrollToEnd()}
								horizontal={true}
								data={this.props.dailySeries}
								renderItem={this.renderBarChartDailyItem}
								initialScrollIndex={this.props.dailySeries.length - 1}
								getItemLayout={this.getDailyChartItemLayout}
								initialNumToRender={1}
								windowSize={10}
								keyExtractor={(item: IDailyBarChartData, index: number) => index.toString()}
							/>
						</View>
						<View style={style.fullWidth}>
							<FlatList
								alwaysBounceHorizontal={false}
								contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}
								horizontal={true}
								data={this.props.monthlySeries}
								renderItem={this.renderBarChartMonthlyItem}
								keyExtractor={(item: IMonthlyBarChartData, index: number) => index.toString()}
							/>
						</View>
					</Animated.View>
				</View>
				<View style={style.buttonPaddingContainer}>
					<SXButton
						label={'BACK TO WALLET'}
						size={ButtonSizes.Normal}
						onPress={this.props.backToWallet}
						borderColor={Colors.transparent}
					/>
				</View>
			</View>
		);
	}

	private getMaxSeriesValue = (series: IDailyBarChartData[] | IMonthlyBarChartData[]) => {
		let ret = 0;
		for (const dailyData of series) {
			if (dailyData.value > ret) {
				ret = dailyData.value;
			}
		}
		return ret;
	}

	private renderBarChartDailyItem = (data: {item: IDailyBarChartData; index: number}) => {
		const monthDate = moment(data.item.date).format('Do');
		const monthDateNumber = parseInt(monthDate, 10);
		const monthDateSuffix = monthDate.substr(monthDateNumber.toString().length);
		const barChartColumnStyles = [style.barChartColumn];
		const valueAsPercentage = Math.round(data.item.value * 100 / this.maxDailyValue);
		barChartColumnStyles.push({
			backgroundColor: data.index % 2 === 0 ? Colors.pink : colorWithAlpha(Colors.pink, 0.5),
			height: valueAsPercentage + '%',
		});
		return (
			<View style={style.dayChartItem}>
				<View style={style.barChartColumnContainer}>
					<View style={barChartColumnStyles} />
				</View>
				<View style={style.barChartLabelContainer}>
					<Text style={style.barCharItemLabel}>{monthDateNumber}</Text>
					<Text style={style.barCharItemLabelUpperScript}>{monthDateSuffix}</Text>
				</View>
			</View>
		);
	}

	private renderBarChartMonthlyItem = (data: {item: IMonthlyBarChartData; index: number}) => {
		const barChartColumnStyles = [style.barChartColumn];
		const valueAsPercentage = Math.round(data.item.value * 100 / this.maxMonthValue);
		barChartColumnStyles.push({
			backgroundColor: data.index % 2 === 0 ? Colors.pink : colorWithAlpha(Colors.pink, 0.5),
			height: valueAsPercentage + '%',
		});
		return (
			<View style={style.monthChartItem}>
				<View style={style.barChartColumnContainer}>
					<View style={barChartColumnStyles} />
				</View>
				<Text style={style.barCharItemLabel}>{data.item.monthShort}</Text>
			</View>
		);
	}

	private getDailyChartItemLayout = (data: any, index: number) => {
		return {
			length: DAY_CHART_ITEM_WIDTH,
			offset: DAY_CHART_ITEM_WIDTH * index,
			index,
		};
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

	private tabUpdatedHandler = (newTab: RewardsTabView) => {
		if (newTab !== this.state.selectedView) {
			this.setState({
				selectedView: newTab,
			});
			this.runSlideTransition(newTab);
		}
	}

	private runSlideTransition = (newTab: RewardsTabView) => {
		const slideValue = newTab === RewardsTabView.MONTHLY ? -this.slideWidth : 0;
		Animated.timing(this.state.translateX, {
			toValue: slideValue,
			easing: Easing.linear,
			duration: 300,
			isInteraction: false,
			useNativeDriver: true,
		}).start();
	}

	private dailyChartContainerOnLayout = (event: LayoutEvent) => {
		this.slideWidth = event.nativeEvent.layout.width;
	}
}
