import React from 'react'
import jquery from 'jquery'
import editormd from 'editor.md/src/editormd'
export default class ArticleDetail extends React.Component{
    componentDidMount() {
        console.log(editormd())
        editormd('test-editormd', {
            width: '100%',
            height: 640,
            syncScrolling: 'single',
            path: '/static/markdown/lib/',
            saveHTMLToTextarea: true, // 注意3：这个配置，textarea可以提交
            emoji: true, // emoji表情，默认关闭
            /** 上传图片相关配置如下 */
            imageUpload: true,
            imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
            imageUploadURL: '/api/article/blog_img_upload/'
        })
        let test = this
        jquery(function () {

        })
    }
    componentWillMount() {
        console.log(jquery('#app'))

    }

    render() {
        return(
            <div>
                {console.log(this.props)}
                <div id="test-editormd">
                    <textarea name="" id="" className="form-control" cols="30" rows="10"></textarea></div>
            </div>
        )
    }

}
