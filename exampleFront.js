import React from 'react';

import { ArrowButton } from '../button-arrow/arrowButton';
import { AnimationLottie } from '../../configSplitSection/animationLottie';
import { getImgCDNSrc } from '../../helpers/helpers';

import animationData from '../../../images/lottie/bannerSection.json';
import animationDataMobile from '../../../images/lottie/readyToSellMobile.json';

import './readyToSell.scss';

export const ReadyToSell = () => {
    return (
        <section className='readyToSell'>
            <div className='readyToSell_banner'>
                <AnimationLottie animationData={animationData} />
            </div>
            <div className='readyToSell_banner_mobile'>
                <AnimationLottie animationData={animationDataMobile} />
            </div>
            <div className='readyToSell_content'>
                <img loading='lazy' className='readyToSell_background' src={getImgCDNSrc('readyToSell-BG')} />
                <div className='readyToSell_logo'>
                    <h2 className='readyToSell_logo_logo'>Ready to sell?</h2>
                    <p className='readyToSell_logo_description'>text.</p>
                    <ArrowButton className='readyToSell_logo_button' buttonContext='Get Started for Free' href='' />
                </div>
            </div>
        </section>
    );
};
