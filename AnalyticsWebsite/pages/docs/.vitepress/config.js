import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PayPath API Documentation",
  description: "This comprehensive documentation guides you through integrating the PayPath button seamlessly into your eCommerce website. With the PayPath API, you can empower your customers with a secure and effortless payment experience online, boosting your conversion rates and revenue.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/Complete-Guide' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Overview', link: '/Complete-Guide' },
          { text: 'Integration Steps', link: '#integration-steps' },
          { text: 'JavaScript Methods', link: '#javascript-methods' },
          { text: 'Need Help?', link: '#need-help' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://git.fdmgroup.com/howzatts/app_project_q2_2024' }
    ]
  }
})
