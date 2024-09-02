module.exports={
    base:"/fffBlog/",
    title: "吴炫境个人博客",  
    description: "代码学习记录",  
    extendMarkdown: md => {
        md.use(require("markdown-it-disable-url-encode"));
      }
}
//https://blog.csdn.net/weixin_54546701/article/details/140067564?ops_request_misc=&request_id=&biz_id=102&utm_term=vuepress&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-0-140067564.nonecase&spm=1018.2226.3001.4187