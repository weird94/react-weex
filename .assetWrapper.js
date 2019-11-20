let returned = false;

const raxFrameworkBanner = async ({ name, bundler }) => {
  if (!returned) {
    returned = true;
    return {
      header: `'use weex:rax'`,
      footer: `// The End.`
    };
  }
};

module.exports = raxFrameworkBanner;
