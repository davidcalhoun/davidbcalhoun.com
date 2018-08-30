var migrate = text => {
  let output = text;

  output = output.replace(/(?:categories):\s+(\[.+\])/i, (whole, cats) => {
    let catsArr;
    try {
      catsArr = JSON.parse(cats);
    } catch(e) {
      catsArr = cats
        .replace(/"/g, '')
        .replace('[', '["')
        .replace(']', '"]')
        .replace(/,/g, '","');
      catsArr = JSON.parse(catsArr);
    }
    const catsStr = catsArr.map(cat => `- ${ cat.trim() }`).join('\n');

    return `tags:\n${ catsStr }`;
  });

  output = output
    .replace(/&#8217;|&#039;/g, '\'')
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&#8211;/g, '-')
    .replace(/&#038;/g, '&');

  output = output.replace(/{% imgcap\s*(?:center)*\s*.*davidbcalhoun.com(\n|.[^\s]+)?\s+([0-9]+)?\s+([0-9]+)?\s+(([^%}]+.|\n)*)?%}/gi, (whole, url, width, height, caption='') => {
  	return `<figure itemprop="image" itemscope="" itemtype="http://schema.org/ImageObject" class="center">
    <meta itemprop="width" content="${ width }" />
    <meta itemprop="height" content="${ height }" />
    <meta itemprop="url" content="https://www.davidbcalhoun.com${ url }" />
    <a href="https://www.davidbcalhoun.com${ url }">
        <img itemprop="contentUrl" src="https://www.davidbcalhoun.com${ url }" title="${ caption.trim() }" />
    </a>
    <figcaption itemprop="caption">${ caption.trim() }</figcaption>
</figure>
`;
  });

  copy && copy(output);

  return output;
}

var m = migrate;