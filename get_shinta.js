const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://shinta.framer.media/?utm_source=framer', {waitUntil: 'networkidle2'});

  const footerStyles = await page.evaluate(() => {
    // find the footer
    const footer = document.querySelector('footer') || document.querySelector('[data-framer-name="Footer"]');
    if (!footer) return "Footer not found";
    
    // Get its computed styles
    const styles = window.getComputedStyle(footer);
    const parentStyles = window.getComputedStyle(footer.parentElement);
    const prevStyles = window.getComputedStyle(footer.previousElementSibling || document.body);

    return {
      footer: {
        position: styles.position,
        bottom: styles.bottom,
        top: styles.top,
        zIndex: styles.zIndex,
        display: styles.display
      },
      parent: {
        position: parentStyles.position,
        display: parentStyles.display,
        zIndex: parentStyles.zIndex
      },
      prev: {
        position: prevStyles.position,
        marginBottom: prevStyles.marginBottom,
        zIndex: prevStyles.zIndex
      }
    };
  });

  console.log(JSON.stringify(footerStyles, null, 2));
  await browser.close();
})();
