import React, {Component} from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';
import {OS_TYPES} from '../../../constants';
import {withManagedTransitions} from '../../../hoc/ManagedModal';
import {withResizeOnKeyboardShow} from '../../../hoc/ResizeOnKeyboardShow';
import {FriendsSearchResult} from '../../../screens/PhotoScreen';
import {Colors} from '../../../theme';
import {GroupCreateSearchResultEntry} from '../../Displayers';
import {InputSizes, SXTextInput, TRKeyboardKeys} from '../../Inputs';
import style from './style';

interface IModalTagFriendsProps {
	visible: boolean;
	doneHandler: () => void;
	cancelHandler: () => void;
	blurViewRef: any;
	marginBottom: number;
	searchResults: FriendsSearchResult[];
	selectedUsers: FriendsSearchResult[];
	onSearchUpdated: (term: string) => void;
	selectTagUserInModal: (friend: FriendsSearchResult) => void;
	onDismiss: () => void;
	onModalHide: () => void;
}

class ModalTagFriendsComponent extends Component<IModalTagFriendsProps, any> {
	public render() {
		return (
			<Modal
				onDismiss={this.props.onDismiss}
				onModalHide={this.props.onModalHide}
				isVisible={this.props.visible}
				backdropOpacity={0}
				animationIn={'slideInUp'}
				animationOut={'slideOutUp'}
				style={style.container}
			>
				<BlurView style={style.blurView} viewRef={this.props.blurViewRef} blurType='dark' blurAmount={2} />
				<View style={this.getResizableStyles()}>
					<View style={style.boxContainer}>
						<View style={style.pinkContainer}>
							<Text style={style.title}>{'Tag Friends'}</Text>
							<View style={style.inputContainer}>
								<SXTextInput
									autoFocus={true}
									onChangeText={this.props.onSearchUpdated}
									placeholder={'Search'}
									icon={'search'}
									canCancel={false}
									size={InputSizes.Small}
									borderColor={Colors.transparent}
									iconColor={Colors.cadetBlue}
									returnKeyType={TRKeyboardKeys.done}
									blurOnSubmit={true}
								/>
							</View>
						</View>
						<ScrollView
							contentContainerStyle={style.resultsContainer}
							alwaysBounceVertical={false}
							keyboardShouldPersistTaps={'handled'}
						>
							{this.renderSearchResults()}
						</ScrollView>
						<View style={style.buttonsContainer}>
							<TouchableOpacity style={[style.button, style.leftButton]} onPress={this.props.cancelHandler}>
								<Text style={[style.buttonText, style.buttonTextCancel]}>{'Back'}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={style.button} onPress={this.props.doneHandler}>
								<Text style={[style.buttonText, style.buttonTextConfirm]}>{'Done'}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	private getResizableStyles = () => {
		const ret = [style.keyboardView];
		if (Platform.OS === OS_TYPES.iOS) {
			ret.push({marginBottom: this.props.marginBottom});
		}
		return ret;
	}

	private renderSearchResults = () => {
		const ret: any = [];
		this.props.searchResults.forEach((searchResult: FriendsSearchResult, index: number) => {
			const isSelected = this.props.selectedUsers.indexOf(searchResult) > -1;
			ret.push(
				<GroupCreateSearchResultEntry
					key={index}
					{...searchResult}
					selected={isSelected}
					addHandler={() => this.props.selectTagUserInModal(searchResult)}
				/>,
			);
		});
		return ret;
	}
}

export const ModalTagFriends = withManagedTransitions(withResizeOnKeyboardShow(ModalTagFriendsComponent));
