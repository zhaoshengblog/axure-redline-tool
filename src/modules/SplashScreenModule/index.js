import PropTypes from 'prop-types';
import React from 'react';

import ButtonComponent from '../../components/ButtonComponent';
import Icon from '../../components/IconComponent';
import ModalComponent from '../../components/ModalComponent';

import { codeInspect } from '../../icons';

import './styles.scss';


class SplashScreenModule extends React.PureComponent {
    static displayName = 'SplashScreenModule';

    constructor(props) {
        super(props);

        this.state = {
            isModalShown: true
        };
    }

    handleCloseModal = () => {
        const {
            closeCallback
        } = this.props;

        this.setState({
            isModalShown: false
        }, () => {
            closeCallback();
        });
    }

    renderSplashScreenContent = () => (
        <div className={SplashScreenModule.displayName}>
            <div className={`${SplashScreenModule.displayName}__header`}>
                <Icon
                    height={28}
                    path={codeInspect}
                    width={28}
                />
                <h1>Welcome to Redline Tool V3!</h1>
            </div>
            <p>Things may look similar in this new version, but a lot has changed under the hood. Find out what's new below and thanks for using the tool!</p>
            <h2>What's New?</h2>
            <ul>
                <li>The tool has been ported to React. This means, development work is much easier and you'll see features faster.</li>
                <li>Revised UI - Things have been adjusted in the hopes of making your experience a little more pleasant.</li>
                <li>
                    We now support grid system column overlays. In the sidebar, you'll now see an option to enable and select these overlays.
                    <br />
                    <span className={`${SplashScreenModule.displayName}--disclosure`}>
                        * Currently just supporting Bootstrap V4 but will implementing more.
                    </span>
                </li>
                <li>Better edge case support. The way markup is rendered from Axure creates some difficult edge cases. We've tried to better anticipate these along with the general interaction of the tool with the existing AxShare UI.</li>
            </ul>
            <ButtonComponent
                label={'Get Started!'}
                onClickCallback={this.handleCloseModal}
            />
        </div>
    );

    render() {
        const {
            isModalShown
        } = this.state;

        return (
            <ModalComponent
                closeModal={this.handleCloseModal}
                isShown={isModalShown}
            >
                {this.renderSplashScreenContent()}
            </ModalComponent>
        );
    }
}

SplashScreenModule.propTypes = {
    closeCallback: PropTypes.func.isRequired
};

export default SplashScreenModule;
