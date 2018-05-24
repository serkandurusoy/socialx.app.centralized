import {AsyncStorage} from 'react-native';
import {connect, Dispatch} from 'react-redux';

import {StartupActions} from '../../reducers/StartupReducers';
import {Props, RootContainer} from './container';

// TODO: @serkan ask @jake about typing redux actions and state
const mapDispatchToProps = (dispatch: Dispatch<{type: 'startup'}>): Props => ({
	startup: () => dispatch(StartupActions.startup()),
});

export default connect(null, mapDispatchToProps)(RootContainer);
