module.exports = {
    title: "KnowledgeBase", // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: "KnowledgeBase", // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        [
            "link",
            {rel: "icon", href: "https://vuepress.vuejs.org/hero.png"},
            //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
        ],
    ],
    //下面涉及到的md文件和其他文件的路径下一步再详细解释
    themeConfig: {
        logo: "https://vuepress.vuejs.org/hero.png",  //网页顶端导航栏左上角的图标

        //顶部导航栏
        nav: [
            //格式一：直接跳转，'/'为不添加路由，跳转至首页
            {text: 'home', link: '/'},
            {text: 'Javascript', link: '/pages/Javascript/test3.md'},
            {text: 'Typescript', link: '/pages/Typescript/test4.md'},
            {text: 'Vue', link: '/pages/Vue'},
            {text: 'React', link: '/pages/React'},

            //格式二：添加下拉菜单，link指向的文件路径
            // {
            //     text: 'Javascript',  //默认显示
            //     ariaLabel: 'Javascript',   //用于识别的label
            //     items: [
            //         {text: '文章', link: '/pages/Javascript/test1.md'},
            //         //点击标签会跳转至link的markdown文件生成的页面
            //         {text: '琐碎', link: '/pages/Typescript/test4.md'},
            //     ]
            // },
            // {
            //     text: 'Typescript',  //默认显示
            //     ariaLabel: 'Typescript',   //用于识别的label
            //     items: [
            //         {text: '文章', link: '/pages/Javascript/test1.md'},
            //         //点击标签会跳转至link的markdown文件生成的页面
            //         {text: '琐碎', link: '/pages/Typescript/test4.md'},
            //     ]
            // },
            // {text: '功能演示', link: '/pages/Javascript/test3.md'},

            //格式三：跳转至外部网页，需http/https前缀
            {text: 'Github', link: 'https://github.com/drwna'},
        ],

        //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
        sidebar: {
            '/pages/Javascript/': [
                {
                    title: 'Javascript',   // 一级菜单名称
                    collapsable: true, // false为默认展开菜单, 默认值true是折叠,
                    sidebarDepth: 1,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
                    children: [
                        ['test1.md', '2'],  //菜单名称为'子菜单1'，跳转至/pages/Javascript/test1.md
                        ['test3.md', '3']
                    ]
                },
                {
                    title: 'Typescript',
                    collapsable: false,
                    children: [
                        ['test2.md', '子菜单1']
                    ]
                }
            ],
            /*
            '/pages/Typescript/': [
                {
                    title: 'Javascript',   // 一级菜单名称
                    collapsable: true, // false为默认展开菜单, 默认值true是折叠,
                    sidebarDepth: 1,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
                    children: [
                        ['test1.md', '2'],  //菜单名称为'子菜单1'，跳转至/pages/Javascript/test1.md
                        ['test3.md', '3']
                    ]
                },
                {
                    title: 'Typescript',
                    collapsable: false,
                    children: [
                        ['test2.md', '子菜单1'],
                        ['test2.md', '子菜单2'],
                    ]
                }
            ],
             */

            //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
        }

        /*
        sidebar: {
            '/pages/Javascript/': [{
                title: 'items01',
                collapsable: false,
                children: [
                    {title: 'items01', path: '/pages/test3.md/'},
                    {title: 'items02', path: '/pages/test3.md/'}
                ]
            }],
            '/pages/Typescript/': [{
                title: 'items02',
                collapsable: false,
                children: [
                    {title: 'items01', path: '/pages/test4.md'},
                    {title: 'items02', path: '/pages/test4.md'}
                ]
            }],
            '/guide/': [{
                title: 'items03-1',
                collapsable: false,
                children: [
                    {title: 'items01', path: '/guide/'},
                    {title: 'items01', path: '/guide/bbbb'}
                ]
            },
                {
                    title: 'items03-2',
                    collapsable: false,
                    children: [
                        {title: 'items01', path: '/guide/aaaa/'},
                        {title: 'items01', path: '/guide/bbb/'}
                    ],
                }],
            '/language/': [{
                title: 'items04',
                collapsable: false,
                children: [
                    {title: 'Chinese', path: '/language/chinese/'},
                    {title: 'English', path: '/language/english/'}
                ]
            }]
        }*/
    }
};
