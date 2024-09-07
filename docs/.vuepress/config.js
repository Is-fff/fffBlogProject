module.exports = {
  base: "/fffBlog/",
  title: "吴炫境个人博客",
  description: "代码学习记录",
  themeConfig: {// 主题设置
    nav: [// 导航栏
      {
        text: '首页',
        link: '/'
      }, {
        text: '前端基础',
        items: [
          {
            text: 'JavaScript',
            link: '/BasisPage/Js'
          }, 
          {
            text: 'CSS',
            link: '/BasisPage/css'
          },        
          {
            text: 'ES6新特性',
            link: '/BasisPage/ES6'
          },        
          {
            text: 'TypeScript',
            link: '/BasisPage/ts'
          },        
          {
            text: '杂记',
            link: '/BasisPage/something'
          }
        ]
      },
      {
        text: '前端框架',
        items:[
          {
            text: '框架概述',
            link: '/FrameworkPage/index'
          },{
            text: 'Vue',
            link: '/FrameworkPage/vue'
          },{
            text: 'React',
            link: '/FrameworkPage/react'
          }
        ]
      },
      {
        text:'构建工具',
        items:[
          {
            text:'webpack',
            link:'/toolPage/webpack'
          }
        ]
      },
      {
        text: '浏览器相关',
        link: '/browserPage/browser'
      },
      {
        text: '计算机系统',
        items:[
          {
            text: '计算机网络',
            link: '/CNTPage/cnt'
          }
        ]
      }
    ],
    sidebar: "auto"
  }
}