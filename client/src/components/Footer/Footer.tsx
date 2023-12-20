import * as React from 'react';
import {facebook,accessibility,language,coin,instagram,linkedin,printeresst,twitter} from '../../assets';
interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
    return (
        <div className="footer my-24 py-8">
          <div className="container mx-auto space-y-4">
            <div className="top flex flex-col w-full space-x-0 space-y-6 md:flex-row md:space-y-0 md:space-x-4">
              <div className="item w-full text-center md:flex-1 space-y-3">
                <h2 className="h1 mb-4">Categories</h2>
                <p className='p'>Graphics & Design</p>
                <p className='p'>Digital Marketing</p>
                <p className='p'>Writing & Translation</p>
                <p className='p'>Video & Animation</p>
                <p className='p'>Music & Audio</p>
                <p className='p'>Programming & Tech</p>
                <p className='p'>Data</p>
                <p className='p'>Business</p>
                <p className='p'>Lifestyle</p>
                <p className='p'>Photography</p>
                <p className='p'>Sitemap</p>
              </div>
              <div className="item w-full text-center md:flex-1 space-y-3">
                <h2 className="h1 mb-4">About</h2>
                <p className='p'>Press & News</p>
                <p className='p'>Partnerships</p>
                <p className='p'>Privacy Policy</p>
                <p className='p'>Terms of Service</p>
                <p className='p'>Intellectual Property Claims</p>
                <p className='p'>Investor Relations</p>
                <p className='p'>Contact Sales</p>
              </div>
              <div className="item w-full text-center md:flex-1 space-y-3">
                <h2 className="h1 mb-4">Support</h2>
                <p className='p'>Help & Support</p>
                <p className='p'>Trust & Safety</p>
                <p className='p'>Selling on Liverr</p>
                <p className='p'>Buying on Liverr</p>
              </div>
              <div className="item w-full text-center md:flex-1 space-y-3">
                <h2 className="h1 mb-4">Community</h2>
                <p className='p'>Customer Success Stories</p>
                <p className='p'>Community hub</p>
                <p className='p'>Forum</p>
                <p className='p'>Events</p>
                <p className='p'>Blog</p>
                <p className='p'>Influencers</p>
                <p className='p'>Affiliates</p>
                <p className='p'>Podcast</p>
                <p className='p'>Invite a Friend</p>
                <p className='p'>Become a Seller</p>
                <p className='p'>Community Standards</p>
              </div>
              <div className="item w-full text-center md:flex-1 space-y-3">
                <h2 className="h1 mb-4">More From Fiverr</h2>
                <p className='p'>Liverr Business</p>
                <p className='p'>Liverr Pro</p>
                <p className='p'>Liverr Logo Maker</p>
                <p className='p'>Liverr Guides</p>
                <p className='p'>Get Inspired</p>
                <p className='p'>Liverr Select</p>
                <p className='p'>ClearVoice</p>
                <p className='p'>Liverr Workspace</p>
                <p className='p'>Learn</p>
                <p className='p'>Working Not Working</p>
              </div>
            </div>
            <hr />




            <div className="bottom flex justify-between items-center border-t border-gray-400 pt-8">
              <div className="left flex items-center space-x-3">
                <h2 className='h1'>Fiverr</h2>
                <span>© Liverr International Ltd. 2023</span>
              </div>
              <div className="right flex space-x-3 items-center">
                <div className="social flex items-center space-x-3">
                  <img src={twitter} alt="" />
                  <img src={facebook} alt="" />
                  <img src={linkedin} alt="" />
                  <img src={printeresst} alt="" />
                  <img src={instagram} alt="" />
                </div>
                <div className="link flex items-center space-x-3">
                  <img src={language} alt="" />
                  <span>English</span>
                </div>
                <div className="link flex items-center space-x-3">
                  <img src={coin} alt="" />
                  <span>USD</span>
                </div>
                <img src={accessibility} alt="" />
              </div>
            </div>
          </div>
        </div>
      );
};

export default Footer;
