import React from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';

import {GroupCreateSearchResultEntry} from 'components';
import {OS_TYPES} from 'consts';
import {WithResizeOnKeyboardShow} from 'hoc';
import {withManagedTransitions} from 'hoc/ManagedModal';
import {Colors} from 'theme';
import {FriendsSearchResult} from 'types';
import {InputSizes, SXTextInput, TRKeyboardKeys} from '../../Inputs';
import style from './style';

interface IModalTagFriendsProps {
	visible: boolean;
	doneHandler: () => void;
	cancelHandler: () => void;
	blurViewRef: any;
	searchResults: FriendsSearchResult[];
	selectedUsers: FriendsSearchResult[];
	onSearchUpdated: (term: string) => void;
	selectTagUserInModal: (friend: FriendsSearchResult) => void;
	onDismiss: () => void;
	onModalHide: () => void;
}

const ModalTagFriendsComponent = (props: IModalTagFriendsProps) => {
	return (
		<Modal
			onDismiss={props.onDismiss}
			onModalHide={props.onModalHide}
			isVisible={props.visible}
			backdropOpacity={0}
			animationIn={'slideInUp'}
			animationOut={'slideOutUp'}
			style={style.container}
		>
			<BlurView style={style.blurView} viewRef={props.blurViewRef} blurType='dark' blurAmount={2} />
			<WithResizeOnKeyboardShow>
				{({marginBottom}) => (
					<View style={[style.keyboardView, Platform.OS === OS_TYPES.IOS ? {marginBottom} : {}]}>
						<View style={style.boxContainer}>
							<View style={style.pinkContainer}>
								<Text style={style.title}>{'Tag Friends'}</Text>
								<View style={style.inputContainer}>
									<SXTextInput
										autoFocus={true}
										autoCorrect={true}
										onChangeText={props.onSearchUpdated}
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
								{props.searchResults.map((searchResult: FriendsSearchResult, index: number) => (
									<GroupCreateSearchResultEntry
										key={index}
										{...searchResult}
										selected={props.selectedUsers.indexOf(searchResult) > -1}
										addHandler={() => props.selectTagUserInModal(searchResult)}
									/>
								))}
							</ScrollView>
							<View style={style.buttonsContainer}>
								<TouchableOpacity style={[style.button, style.leftButton]} onPress={props.cancelHandler}>
									<Text style={[style.buttonText, style.buttonTextCancel]}>{'Back'}</Text>
								</TouchableOpacity>
								<TouchableOpacity style={style.button} onPress={props.doneHandler}>
									<Text style={[style.buttonText, style.buttonTextConfirm]}>{'Done'}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				)}
			</WithResizeOnKeyboardShow>
		</Modal>
	);
};

export const ModalTagFriends = withManagedTransitions(ModalTagFriendsComponent);
