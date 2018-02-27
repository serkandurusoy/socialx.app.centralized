import {connect} from 'react-redux';

import {StartupActions} from '../../reducers/StartupReducers';
import {Props, RootContainer} from './container';

const mapDispatchToProps = (dispatch: any): Props => ({
	startup: () => dispatch(StartupActions.startup()),
});

export default connect(null, mapDispatchToProps)(RootContainer);
