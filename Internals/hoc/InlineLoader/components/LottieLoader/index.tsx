import LottieView from 'lottie-react-native';
import React, {Component, RefObject} from 'react';

import {globe2} from '../../../../animation';
import style from './style';

export class LottieLoader extends Component {
	private animationRef: RefObject<LottieView> = React.createRef();

	public componentDidMount() {
		if (this.animationRef.current) {
			this.animationRef.current.play();
		}
	}

	public componentWillUnmount() {
		if (this.animationRef.current) {
			// even with this trick Lottie is showing a warning for `Can't call setState on an unmounted component.`
			this.animationRef.current.reset();
		}
	}

	public render() {
		return <LottieView source={globe2} loop={true} style={style.lottieAnimation} ref={this.animationRef} />;
	}
}
