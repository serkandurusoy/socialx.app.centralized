// TODO: this is not used, only in storybook! keep it here for later reference!

import {OS_TYPES} from 'consts';
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
	searchResults: any[];
	selectedUsers: string[];
	onSearchUpdated: (term: string) => void;
	selectNewUserForGroup: (userId: string) => void;
}

export const ModalInvitePeople = (props: IModalInvitePeopleProps) => {
	const resizableStyles = [
		style.keyboardView,
		// ...(Platform.OS === OS_TYPES.IOS ? [{marginBottom: props.marginBottom}] : []), // make resizable when used!
	];

	return (
		<Modal
			// onDismiss={props.onDismiss}
			// onModalHide={props.onModalHide} // make this managed, as other modals
			isVisible={props.visible}
			backdropOpacity={0}
			animationIn={'slideInRight'}
			animationOut={'slideOutUp'}
			style={style.container}
		>
			<BlurView style={style.blurView} viewRef={props.blurViewRef} blurType={'dark'} blurAmount={2} />
			<View style={resizableStyles}>
				<View style={style.boxContainer}>
					<View style={style.pinkContainer}>
						<Text style={style.title}>{'Invite people'}</Text>
						<View style={style.inputContainer}>
							<SXTextInput
								autoFocus={true}
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
						{props.searchResults.map((searchResult: SearchResultCreateGroup, index: number) => (
							<GroupCreateSearchResultEntry
								key={index}
								{...searchResult}
								selected={props.selectedUsers.indexOf(searchResult.id) > -1}
								addHandler={() => props.selectNewUserForGroup(searchResult.id)}
							/>
						))}
					</ScrollView>
					<View style={style.buttonsContainer}>
						<TouchableOpacity style={[style.button, style.leftButton]} onPress={props.cancelHandler}>
							<Text style={[style.buttonText, style.buttonTextCancel]}>{'Back'}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={style.button} onPress={props.createHandler}>
							<Text style={[style.buttonText, style.buttonTextConfirm]}>{'Create'}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};
