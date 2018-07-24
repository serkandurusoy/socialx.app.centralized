import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationScreenProp} from 'react-navigation';

import {ModalCloseButton, TooltipDots} from 'components';
import {Colors} from 'theme';
import {CommentsSortingOptions} from 'types';
import {IWithTranslationProps, withTranslations} from 'utilities';
import style from './style';

interface IHeaderRightProps extends IWithTranslationProps {
	navigation?: NavigationScreenProp<any>;
	sortOption: CommentsSortingOptions;
	onValueChange: (value: string) => void;
}

const HeaderItem: React.SFC<{title: string}> = ({title}) => <Text style={style.headerLabel}>{title}</Text>;

const getSortingSectionHeaderItem = (title: string) => [
	{
		label: () => <HeaderItem title={title} />,
		onPress: Function.prototype,
	},
];

const SortingItem: React.SFC<{optionValue: string; selectedValue: CommentsSortingOptions}> = ({
	optionValue,
	selectedValue,
}) => (
	<View style={style.lineContainer}>
		<View style={style.iconView}>
			{selectedValue === optionValue ? <Icon name={'md-checkmark'} style={style.selectedIcon} /> : null}
		</View>
		<Text style={style.label}>{optionValue}</Text>
	</View>
);

const getSortingItems = (selectedValue: CommentsSortingOptions, onValueChange: (value: string) => void) =>
	Object.keys(CommentsSortingOptions).map((option: any) => {
		const optionValue = CommentsSortingOptions[option];
		return {
			label: () => <SortingItem optionValue={optionValue} selectedValue={selectedValue} />,
			onPress: () => onValueChange(optionValue),
		};
	});

const HeaderRightInt: React.SFC<IHeaderRightProps> = ({navigation, getText, sortOption, onValueChange}) => {
	const headerItem = getSortingSectionHeaderItem(getText('comments.order.title'));
	const menuItems = getSortingItems(sortOption, onValueChange);
	return (
		<View style={style.rightHeader}>
			<TooltipDots getItems={() => headerItem.concat(menuItems)} iconName={'ios-funnel'} iconColor={Colors.white} />
			{navigation && <ModalCloseButton navigation={navigation} />}
		</View>
	);
};

export const HeaderRight = withTranslations(HeaderRightInt);
