import React, {  Component } from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash'
import css from './../static/css/share.min.css'
import QRCode from 'qrcode.react'

const propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    sites: PropTypes.array,
};

function getMetaContentByName(name) {
    return (document.getElementsByName(name)[0] || 0).content;
}

let image = (document.images[0] || 0).src || '';
let site = getMetaContentByName('site') || getMetaContentByName('Site') || document.title;
let title = getMetaContentByName('title') || getMetaContentByName('Title') || document.title;
let description = document.getElementById('desc') .getAttribute('content')
let url = window.location.href
let origin = window.location.origin

let defaultProps = {
    url: url,
    origin: origin,
    title: title,
    description: description,
    summary: description,
    image: image,
    site: site,
    source: site,
    sites: ["qzone", "weibo", "google", "twitter", "qq",
        "tencent", "wechat", "douban", "linkedin", "facebook"],
    wechatQrcodeTitle: '微信扫一扫：分享',
    wechatQrcodeHelper: '微信里点“发现”，扫一下,二维码便可将本文分享至朋友圈。',
};

class ShareButtons extends React.Component {

    render(){
        console.log(this.props)
        let sites = this.props.sites
        let url = this.props.url
        let wechatQrcodeTitle = this.props.wechatQrcodeTitle
        let wechatQrcodeHelper = this.props.wechatQrcodeHelper

        let title = encodeURIComponent(this.props.title)
        let description = encodeURIComponent(this.props.description)
        let image = encodeURIComponent(this.props.image)
        let site = encodeURIComponent(this.props.site)
        let origin = encodeURIComponent(this.props.origin)

        let summary = description
        let source = site

        const templates = {
            //qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${description}&summary=${summary}&site=${source}`,
            qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${description}&summary=${summary}&site=${site}&pics=${image}`,
            qq: `http://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}&source=${source}&desc=${description}`,
            tencent: `http://share.v.t.qq.com/index.php?c=share&a=index&title=${title}&url=${url}&pic=${image}`,
            weibo: `https://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${image}`,
            wechat: `javascript:`,
            douban: `http://shuo.douban.com/!service/share?href=${url}&name=${title}&text=${description}&image=${image}&starid=0&aid=0&style=11`,
            diandian: `http://www.diandian.com/share?lo=${url}&ti=${title}&type=link`,
            linkedin: `http://www.linkedin.com/shareArticle?mini=true&ro=true&title=${title}&url=${url}&summary=${summary}&source=${source}&armin=armin`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}&via=${origin}`,
            google: `https://plus.google.com/share?url=${url}`
        };

        let html = _.map(sites, function (site, i) {
            if(site === "wechat"){
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
                    <a key={i} className='social-share-icon icon-wechat' target='_blank' href='javascript:'>
                        {doc}
                    </a>
                )
            } else {
                let className = `icon-${site} social-share-icon`
                return (
                    <a key={i} className={className} href={templates[site]} target="_blank"></a>
                )
            }
        })
        return(
            <div className="social-share">
                {html}
            </div>
        )
    };
};

ShareButtons.propTypes = propTypes;
ShareButtons.defaultProps = defaultProps;

export default ShareButtons;