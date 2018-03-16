import React, {Component} from 'react';
import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {BlurView} from 'react-native-blur';
import Modal from 'react-native-modal';
import {withResizeOnKeyboardShow} from '../../hoc/ResizeOnKeyboardShow';
import {SearchResultCreateGroup} from '../../screens/SearchScreen';
import {Colors} from '../../theme';
import {GroupCreateSearchResultEntry} from '../GroupCreateSearchResultEntry';
import {InputSizes, SXTextInput, TRKeyboardKeys} from '../TextInput';
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
}

class ModalInvitePeopleComponent extends Component<IModalInvitePeopleProps, any> {
	public render() {
		return (
			<Modal
				isVisible={this.props.visible}
				backdropOpacity={0}
				animationIn={'slideInRight'}
				animationOut={'slideOutUp'}
				style={style.container}
			>
				<BlurView style={style.blurView} viewRef={this.props.blurViewRef} blurType='dark' blurAmount={2} />
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
							{this.renderSearchResults()}
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
		if (Platform.OS === 'ios') {
			ret.push({marginBottom: this.props.marginBottom});
		}
		return ret;
	}

	private renderSearchResults = () => {
		const ret: any = [];
		this.props.searchResults.forEach((searchResult: SearchResultCreateGroup, index: number) => {
			const isSelected = this.props.selectedUsers.indexOf(searchResult.id) > -1;
			ret.push(
				<GroupCreateSearchResultEntry
					key={index}
					{...searchResult}
					selected={isSelected}
					addHandler={() => this.props.selectNewUserForGroup(searchResult.id)}
				/>,
			);
		});
		return ret;
	}
}

export const ModalInvitePeople = withResizeOnKeyboardShow(ModalInvitePeopleComponent);
