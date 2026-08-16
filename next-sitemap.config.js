/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://siritori-timer.kkweb.io/",
  generateRobotsTxt: true,
};

module.exports = config;
