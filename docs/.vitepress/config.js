export default {
  lang: 'en-US',
  title: "destrostudios docs",
  description: "Everything about our setups, including the server where everything is hosted.",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/destrostudios.svg',
    sidebar: {
      "/": [
        {
          text: "Services",
          items: [
            { text: "Overview", link: "/services/overview.md" },
          ],
        },
        {
          text: "Installation",
          items: [
            { text: "HTTP Server", link: "/installation/http_server.md" },
            { text: "MySQL Server", link: "/installation/mysql_server.md" },
            { text: "Mail Server", link: "/installation/mail_server.md" },
            { text: "Java", link: "/installation/java.md" },
            { text: "Jenkins", link: "/installation/jenkins.md" },
          ],
        },
        {
          text: "Project Setup",
          items: [
            { text: "Web Content", link: "/project_setup/web_content.md" },
            { text: "Ports", link: "/project_setup/ports.md" },
          ],
        },
      ]
    },
    editLink: {
      pattern: 'https://github.com/destroflyer/maniascript/blob/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/destrostudios/docs' },
    ],
    footer: {
      message: 'Made with ❤️ by destroflyer and Etherblood',
    },
  },
};
