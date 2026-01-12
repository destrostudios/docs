export default {
  base: '/docs/',
  lang: 'en-US',
  title: "destrostudios docs",
  description: "Everything about our setups, including the server where everything is hosted.",
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    appearance: 'dark',
    logo: '/destrostudios.svg',
    sidebar: {
      "/": [
        {
          text: "Server",
          items: [
            { text: "Overview", link: "/server/overview.md" },
            { text: "Operating system", link: "/server/operating_system.md" },
            { text: "Storage", link: "/server/storage.md" },
            { text: "SSH", link: "/server/ssh.md" },
            { text: "FTP", link: "/server/ftp.md" },
          ],
        },
        {
          text: "Infrastructure",
          items: [
            { text: "DNS", link: "/infrastructure/dns.md" },
            { text: "HTTPS", link: "/infrastructure/https.md" },
            { text: "HTTP server", link: "/infrastructure/http_server.md" },
            { text: "Docker", link: "/infrastructure/docker.md" },
            { text: "Jenkins", link: "/infrastructure/jenkins.md" },
            { text: "Mail server", link: "/infrastructure/mail_server.md" }
          ],
        },
        {
          text: "Projects",
          items: [
            { text: "Overview", link: "/projects/overview.md" },
            { text: "Ports", link: "/projects/ports.md" },
            { text: "Emails", link: "/projects/emails.md" },
            { text: "Static content", link: "/projects/static_content.md" },
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
