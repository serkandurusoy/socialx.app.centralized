import {OS_TYPES} from 'consts';
import {withManagedTransitions} from 'hoc/ManagedModal';
import {withResizeOnKeyboardShow} from 'hoc/ResizeOnKeyboardShow';
import React, {Component} from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';
import {Colors} from 'theme';
import {SearchResultCreateGroup} from 'types';
import {GroupCreateSearchResultEntry} from '../../Displayers';
import {InputSizes, SXTextInput, TRKeyboardKeys} from '../../Inputs';
import style from './style';

interface IModalInvitePeopleProps {
	visible: boolean;
	createHandler: () => void;
	cancelHandler: () => void;
	blurViewRef: any;
	marginBottom: number;
	searchResults: any[];
	selectedUsers: string[];
	onSearchUpdated: (term: string) => void;
	selectNewUserForGroup: (userId: string) => void;
	onDismiss: () => void;
	onModalHide: () => void;
}

class ModalInvitePeopleComponent extends Component<IModalInvitePeopleProps, any> {
	public render() {
		return (
			<Modal
				onDismiss={this.props.onDismiss}
				onModalHide={this.props.onModalHide}
				isVisible={this.props.visible}
				backdropOpacity={0}
				animationIn={'slideInRight'}
				animationOut={'slideOutUp'}
				style={style.container}
			>
				<BlurView style={style.blurView} viewRef={this.props.blurViewRef} blurType="dark" blurAmount={2} />
				<View style={this.getResizableStyles()}>
					<View style={style.boxContainer}>
						<View style={style.pinkContainer}>
							<Text style={style.title}>{'Invite people'}</Text>
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
							{
								this.props.searchResults.map((searchResult: SearchResultCreateGroup, index: number) => (
									<GroupCreateSearchResultEntry
										key={index}
										{...searchResult}
										selected={this.props.selectedUsers.indexOf(searchResult.id) > -1}
										addHandler={() => this.props.selectNewUserForGroup(searchResult.id)}
									/>
								))
							}
						</ScrollView>
						<View style={style.buttonsContainer}>
							<TouchableOpacity style={[style.button, style.leftButton]} onPress={this.props.cancelHandler}>
								<Text style={[style.buttonText, style.buttonTextCancel]}>{'Back'}</Text>
							</TouchableOpacity>
							<TouchableOpacity style={style.button} onPress={this.props.createHandler}>
								<Text style={[style.buttonText, style.buttonTextConfirm]}>{'Create'}</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		);
	}

	private getResizableStyles = () => {
		const ret = [style.keyboardView];
		if (Platform.OS === OS_TYPES.IOS) {
			ret.push({marginBottom: this.props.marginBottom});
		}
		return ret;
	}
}

export const ModalInvitePeople = withManagedTransitions(withResizeOnKeyboardShow(ModalInvitePeopleComponent));
