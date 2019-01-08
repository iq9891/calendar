const base = process.env.GH ? '/calendar/' : '/'

module.exports = {
  title: 'calendar',
  base,
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'calendar',
      description: '日历组件 Vue 2.x 实现'
    },
  },
  dest: './docs',
  serviceWorker: true,
  themeConfig: {
    repo: 'fe6/calendar',
    searchMaxSuggestions: 5,
    docsDir: 'site',
    locales: {
      '/': {
        label: '简体中文',
        selectText: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        serviceWorker: {
          updatePopup: {
            message: "发现新内容可用",
            buttonText: "刷新"
          }
        },
        sidebar: [
          '/',
          '/mcalendar',
          '/date',
        ]
      },
    },
  }
}
