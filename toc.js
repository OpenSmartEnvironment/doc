function htmlTableOfContents (documentRef) {
  var documentRef = documentRef || document;
  var toc = documentRef.getElementById('toc');
  var headings = [].slice.call(documentRef.body.querySelectorAll('/*h1, */h2, h3, h4, h5, h6'));

  headings.forEach(function (heading, index) {
    var anchor = documentRef.createElement('a');
    anchor.setAttribute('name', 'toc' + index);
    anchor.setAttribute('id', 'toc' + index);
       
    var link = documentRef.createElement('a');
    link.setAttribute('href', '#toc' + index);
    link.textContent = heading.textContent;
        
    var div = documentRef.createElement('div');
    div.setAttribute('class', heading.tagName.toLowerCase());
       
    div.appendChild(link);
      toc.appendChild(div);
      heading.parentNode.insertBefore(anchor, heading);
  });
}

try {
     module.exports = htmlTableOfContents;
} catch (e) {
    // module.exports is not defined
}
