module.exports = {
  base: "/fffBlog/",
  title: "吴炫境个人博客",
  description: "大前端开发学习记录",
  themeConfig: {// 主题设置
    nav: [// 导航栏
      {
        text: '首页',
        link: '/'
      }, {
        text: '前端基础',
        items: [
          {
            text:'HTML5',
            link:'/BasisPage/html'
          },
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
        text: 'Web前端框架',
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
          },
          {
            text: '算法',
            link: '/CNTPage/algorithm'
          },          {
            text: '数据结构',
            link: '/CNTPage/dataStructure'
          }
        ]
      },
      {
        text: 'AI学习',
        items:[
          {
            text: "AI工具链接",
            link: '/AI_learn/aiTools'
          }
        ]
      }
    ],
    sidebar: "auto"
  }
}