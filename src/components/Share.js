import React from 'react'
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react'

const propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    sites: PropTypes.array,
    origin:PropTypes.string
};


let defaultProps = {
    sites: ["qzone", "weibo", "google", "twitter", "qq",
        "tencent", "wechat", "douban", "linkedin", "facebook"],
    wechatQrcodeTitle: '微信扫一扫：分享',
    wechatQrcodeHelper: '微信里点“发现”，扫一下,二维码便可将本文分享至朋友圈。',
};

class Share extends React.Component {



    render(){
        let sites = this.props.sites
        let url = this.props.url
        let wechatQrcodeTitle = defaultProps.wechatQrcodeTitle
        let wechatQrcodeHelper = defaultProps.wechatQrcodeHelper
        let title = (this.props.title)
        let description = (this.props.description)
        let image = (this.props.image)
        let site = title
        let origin = (this.props.origin)

        let summary = description
        let source = site
        const templates = {
            qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${description}&summary=${summary}&site=${site}&pics=${image}`,
            qq: `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&source=${source}&desc=${description}`,
            tencent: `http://share.v.t.qq.com/index.php?c=share&a=index&title=${title}&url=${url}&pic=${image}`,
            weibo: `https://service.weibo.com/share/share.php?title=${title}&pic=${image}&url=${url}&appkey=`,
            wechat: `javascript:`,
            douban: `http://shuo.douban.com/!service/share?name=${title}&text=${description}&image=${image}&starid=0&aid=0&style=11&href=${url}`,
            diandian: `http://www.diandian.com/share?lo=${url}&ti=${title}&type=link`,
            linkedin: `http://www.linkedin.com/shareArticle?mini=true&ro=true&title=${title}&url=${url}&summary=${summary}&source=${source}&armin=armin`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}&via=${origin}`,
            google: `https://plus.google.com/share?url=${url}`
        };
        const row = (sites)=>{
            return sites.map((item,i)=>{
                if(item === "wechat"){
                    let doc = <div key={i} className='wechat-qrcode'>
                        <h4>{wechatQrcodeTitle}</h4>
                        <div className='qrcode'>
                            <QRCode value={url} size={100} />
                        </div>
                        <div className='help'>
                            <p>{wechatQrcodeHelper}</p>
                        </div>
                    </div>
                    return (
                        <span key={i} className='social-share-icon icon-wechat' target='_blank'>
                            {doc}
                        </span>
                    )
                } else {
                    let className = `icon-${item} social-share-icon`
                    return (
                        <a key={i} className={className}  href={templates[item]} target="_blank"></a>
                    )
                }
            })
        }
        return(
            <div className="social-share">
                {row(sites)}
            </div>
        )
    };
};

Share.propTypes = propTypes;
/*ShareButtons.defaultProps = defaultProps;*/

export default Share;