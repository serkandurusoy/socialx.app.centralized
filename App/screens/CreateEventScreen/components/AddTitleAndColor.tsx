import React from 'react';
import {View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {Sae} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Colors} from 'theme';
import style from '../style';

const EVENT_COLORS = ['red', 'purple', 'lime', 'yellow', 'blue', 'cyan'];

interface IAddTitleAndColorProps {
	selectedColorStyle: any;
	textInputChanged: (value: string, key: string) => void;
	newColorSelectedHandler: (index: number, value: string) => void;
	colorPickerUpdateSize: (sizes: any) => any;
}

export const AddTitleAndColor: React.SFC<IAddTitleAndColorProps> = ({
	selectedColorStyle,
	textInputChanged,
	newColorSelectedHandler,
	colorPickerUpdateSize,
}) => (
	<View style={[style.paddingContainer, style.topContainer]}>
		<View style={{flex: 1}}>
			<Sae
				label={'Add title'}
				iconClass={FontAwesomeIcon}
				iconName={'pencil'}
				iconColor={Colors.transparent} // trick to hide the icon
				style={[style.saeElement, style.addsaeElement]}
				inputStyle={style.titleInput}
				labelStyle={style.titleLabel}
				onChangeText={(value: string) => textInputChanged(value, 'title')}
				autoCapitalize={'none'}
				autoCorrect={false}
			/>
		</View>
		<ModalDropdown
			keyboardShouldPersistTaps={'handled'}
			dropdownStyle={style.colorDropDown}
			options={EVENT_COLORS}
			defaultValue={EVENT_COLORS[0]}
			onSelect={newColorSelectedHandler}
			renderRow={(color: string) => <View style={[style.colorRoundButton, {backgroundColor: color}]} />}
			renderSeparator={() => <View />}
			scrollEnabled={false}
			adjustFrame={colorPickerUpdateSize}
		>
			<View style={[style.colorRoundButton, selectedColorStyle]} />
		</ModalDropdown>
	</View>
);
