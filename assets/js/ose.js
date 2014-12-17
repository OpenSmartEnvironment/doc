'use strict';

(function() {

  var input = $('#filter-input');
  input.val('');
  input.focus();

  $('body').on('keypress', function(ev) {
    console.log('KEY PRESS', ev);

    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;

    if (input.is(':focus')) {
      setTimeout(filter, 0);
    } else {
      if (! ev.charCode) return;

      input.focus();
      input.val((input.val() || '') + String.fromCharCode(ev.charCode));
      setTimeout(filter, 0);
    }

    return;
  });

  function filter() {
//  console.log('FILTER');

    var items = $('#sidebar li');

    var val = input.val().toLowerCase();
    if (! val) {
      items.show();
      return;
    }

    items.hide();
    items.each(function(i, item) {
      item = $(item);
      var text = item.children('a').text() || item.text();

//      console.log('TEXT', text);

      if (text && text.toLowerCase().indexOf(val) < 0) return;

      while (item.prop('id') !== 'sidebar') {
        item.show();
        item = item.parent();
      }
    });

    return;
  };

})();

