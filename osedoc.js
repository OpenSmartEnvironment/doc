'use strict';

window.Packages = {};

$(document).ready(function() {  // {{{1

var Keywords = {};
var Current = {};
var Files = {};
var DontScrollToc = false;

var Search = $('#search');
Search.val('');
Search.focus();

for (var key in Packages) {
  addPackage(Packages[key]);
}

onState();

$(window).on('popstate', onState);
$(window).on('resize', onResize);

$('body').on('keypress', function(ev) {  // {{{2
  if (ev.altKey || ev.ctrlKey || ev.metaKey) return;

  if (Search.is(':focus')) {
    setTimeout(filter, 0);
  } else {
    if (! ev.charCode) return;

    Search.focus();
    Search.val((Search.val() || '') + String.fromCharCode(ev.charCode));
    setTimeout(filter, 0);
  }

  return;
});

function filter() {  // {{{2
  var items = $('.sidebar li, .sidebar ul');

  var val = Search.val().toLowerCase();
  if (! val) {
    items.show();
    return;
  }

  items.hide();

  var items = $('.sidebar a');

  items.each(function(i, item) {
    item = $(item);
    var text = item.text();

    if (text && text.toLowerCase().indexOf(val) < 0) return;

    while (! item.hasClass('sidebar')) {
      item.show();
      item = item.parent();
    }
  });

  return;
};

function addPackage(p) {  // {{{2
  if (! p.features) p.features = '';

  keyword(p.name, p.name, p.npmname, p.caption, p.aliases && p.aliases.split(/\s/));

  var children = $('<ul>');

  $('<li>', {class: 'h1'})
    .append($('<a>', {href: '#' + p.name + '#'}).html(p.caption))
    .append(children)
    .appendTo('#packages');
  ;

  for (var key in p.comps) {
    addComp(p.comps[key]);
  };

  for (var key in p.modules) {
    addModule(p.name, p.modules[key]);
  };

  if (! p.features) {
    delete p.features;
  }

  function addComp(c) {  // {{{3
    if (c.features) {
      p.features += c.features;
    }

    var ref = p.name + '|' + c.name;
    keyword(ref, c.caption, p.name + '/' + c.name, c.aliases && c.aliases.split(/\s/));

    $('<li>', {class: 'h2'})
      .append($('<a>', {href: '#' + ref + '#'}).html(c.caption))
      .appendTo(children)
    ;

    for (var key in c.modules) {
      addModule(ref, c.modules[key]);
    };
  }

  function addModule(ref, m) {  // {{{3
    ref += '|' + m.name;
    var n = p.name + '/' + m.name;

    keyword(ref, n, m.caption, p.npmname + '/' + m.name, m.aliases && m.aliases.split(/\s/));
    Files[p.npmname + '/' + m.file] = m;

    $('<li>')
      .append($('<a>', {href: '#' + ref + '#'})
        .html(n)
      )
      .appendTo('#modules')
    ;

    /* TODO add keywords for individual items, take care of methods (parameters are part of the link) and "all" display
     * item links should be "#<package ref>|<module ref><here>##" in the hash
     * OR refactor keywords so that they will point to object instead of string

    addItems(m, 'method');

    for (var key in m.items) {
      var i = m.items[key];
      keyword(ref + '#' + itemType(i.type) + '|' + i.name, i.aliases);
    }
    */
  }

  // }}}3
}

/*function itemType(val) {  // {{{2
  switch (val) {
  case 'property':
    return 'Properties';
  case 'method':
    return 'Methods';
  case 'event':
    return 'Events';
  case 'command':
    return 'Commands';
  }

  console.log('INVALID ITEM TYPE', val);
  console.trace();
}
*/

function keyword(key) {  // {{{2
  if (! (key && (typeof key === 'string'))) {
    console.log('INVALID KEYWORD KEY', arguments);
    console.trace();
    return;
  }

  for (var i = 1; i < arguments.length; i++) {
    add(arguments[i]);
  }

  function add(v) {
    if (! v) return;

    switch (typeof v) {
    case 'string':
      var v = v.toLowerCase().replace(/\s/g, '');
      if (v in Keywords) {
        if (Keywords[v] !== key) {
          console.log('DUPLICIT KEYWORD', v, key, Keywords[v]);
        }
      } else {
        Keywords[v] = key;
      }
      return;
    case 'object':
      if (! Array.isArray(v)) break;

      for (var i = 0; i < v.length; i++) {
        add(v[i]);
      }
      return;
    }

    console.log('INVALID KEYWORD', v);
    console.trace();
  }
};

function onResize() {  // {{{2
  var width = $('body').width() - $('#right').width();
  var lw = $('#left').width();

  $('#right').css('left', width);
  $('#main').css({
    left: lw,
    width: width - lw,
  });
};

function onState(ev) {  // {{{2
  var q, p, c, m;
  var chapter = '';

  var h = window.location.hash.split('#');
  if (h && (h[0] === '')) {
    chapter = h[2] || '';
    h = (h[1] || '').split('|');
  } else {
    h = [];
  }

  p = Packages[h[0]];
  if (! p) {
    q = h[0] || 'first';
    return done();
  }
  if (h.length === 1) return done();

  c = p.comps && p.comps[h[1]];
  if (c) {
    if (h.length === 2) return done();
    m = c.modules && c.modules[h[2]];
    return done();
  }

  m = p.modules && p.modules[h[1]];
  return done();

  function done() {  // {{{3
    var repl = (
      (m !== Current.module) ||
      (c !== Current.comp) ||
      (p !== Current.package) ||
      (q !== Current.quick)
    );

    Current.state = h;

    if (repl) {
      if (q === 'all') {
        $('#main').html('Reading ...');
      }
      setTimeout(display, 0);
    } else {
      setTimeout(scroll, 0);
    }
  }

  function display() {  // {{{3
    Current.quick = q;
    Current.package = p;
    Current.comp = c;
    Current.module = m;

    var r = [];

    Current.hash = q || (p.name +
      (c ? '|' + c.name : '') +
      (m ? '|' + m.name : '')
    );

    var main = $('<div>', {id: 'main'});

    if (m) {
      mdModule(append, p, c, m);
    } else if (c) {
      mdComp(append, p, c);
    } else if (p) {
      mdPackage(append, p);
    } else {
      mdQuick(append, q);
    }

    toc(main);
    $('#main').replaceWith(main);
    onResize();

    setTimeout(scroll, 0);

    function append(arr) {
      main.append($('<div>').html(marked(arr.join('\n'))));
    }
  }

  function scroll() {  // {{{3
    scrollTo(chapter, ! DontScrollToc);
    DontScrollToc = false;
  }

  // }}}3
}

function mdQuick(done, name, all) {  // {{{2
  var q = Packages.bundle.quick;
  var r = [];

  switch (name) {
  case 'first':
    r.push('# Read First');
    r.push(links(q.about));
    r.push('## Status');
    r.push(links(q.status));
    r.push('## Platforms');
    r.push(links(q.platforms));
    r.push(links(q.aboutDoc));
    r.push(links(q.contrib));
    r.push('# Licence');
    r.push(links(q.licence));
    done(r);
    return;
  case 'contrib':
  case 'install':
    r.push(links(q[name]));
    done(r);
    return;
  case 'all':
    mdQuick(done, 'first', true);
    mdQuick(done, 'install', true);
    for (var kea in Packages) {
      var pkg = Packages[kea];
      mdPackage(done, pkg, true);
      for (var keb in pkg.comps) {
        var c = pkg.comps[keb];
        mdComp(done, pkg, c, true);
        for (var kec in c.modules) {
          mdModule(done, pkg, c, c.modules[kec], true);
        }
      }
      for (var kec in pkg.modules) {
        mdModule(done, pkg, null, pkg.modules[kec], true);
      }
    }
    return;
  }

  console.log('UHANDLED QUICK', name);
  console.trace();
  return;
}

function mdPackage(done, pkg, all) {  // {{{2
  var r = ['# ' + pkg.caption];
  r.push('**Documentation for "' + pkg.npmname + '" package.** ([GitHub](https://www.github.com/opensmartenvironment/' + pkg.npmname + '))');
  r.push('');
  r.push(links(pkg.readme));
  mdFeatures(r, '## Features', pkg.features);
  r.push(links(pkg.description));

  mdComps(r, pkg.comps, pkg.name, all);
  mdModules(r, pkg.modules, pkg.name, all);
  
  done(r);
}

function mdComp(done, pkg, comp, all) {  // {{{2
  var r = ['# ' + comp.caption];
  r.push('**Documentation for "' + pkg.npmname + '/' + comp.name + '" component.**<br />');
  r.push('For more details, see **"[' + pkg.caption + '](#' + pkg.name + '#)**" package.');
  r.push('');
  r.push(links(comp.readme));
  r.push(links(comp.description));

  mdModules(r, comp.modules, pkg.name + '|' + comp.name, all);
  
  done(r);
}

function mdModule(done, pkg, comp, mod, all) {  // {{{2
  var r = ['# ' + mod.caption];
  r.push('**Reference of "' + pkg.npmname + '/' + mod.name.replace(/\./g, '/') +
    '" module.** [GitHub](https://github.com/OpenSmartEnvironment/' + pkg.npmname + '/blob/master/' + mod.file + ')<br />'
  );
  if (comp) {
    r.push('For more details, see "[' + comp.caption + '](#' + pkg.name + '|' + comp.name + '#)" component.');
  } else {
    r.push('For more details, see "[' + pkg.caption + '](#' + pkg.name + '#)" package.');
  }
  r.push('');

  r.push('Type: `' + mod.type + '`');
  if (mod.super) {
    r.push('<br />Superclass: ' + links('[' + mod.super.replace('.', '/', 'g') + ']', true));
  }
  r.push('');

  r.push(links(mod.readme));
  r.push(links(mod.description));

  mdProps(r, mod.property);
  mdMethods(r, mod.method);
  mdEvents(r, mod.event);
  
  done(r);
}

function mdProps(res, vals) {  // {{{2
  if (! vals) return;

  res.push('## Own properties');
  res.push('');
  for (var key in vals) {
    var v = vals[key];

    res.push('###' + v.name);
    if (v.dtype) {
      res.push('Type: `' + v.dtype + '`');
      res.push('');
    }
    res.push(links(v.description));
  }
}

function mdMethods(res, vals) {  // {{{2
  if (! vals) return;

  res.push('## Own methods');
  res.push('');
  for (var key in vals) {
    var v = vals[key];

    res.push('### ' + v.name + '(' + params2Args(v.params) + ')');
    if (v.dtype) {
      res.push('Type: `' + v.dtype + '`');
      res.push('');
    }
    res.push(links(v.description));

    mdParams(res, v.params);
  }
}

function mdEvents(res, vals) {  // {{{2
  if (! vals) return;

  res.push('## Own events');
  res.push('');
  for (var key in vals) {
    var v = vals[key];

    res.push('### ' + v.name);
    res.push(links(v.description));

    mdParams(res, v.params);
  }
}

function mdParams(res, vals) {  // {{{2
  if (! vals) return;

  res.push('**Parameters:**<br />');
  for (var key in vals) {
    var v = vals[key];

    var n;
    if (v.optional) {
      n = '[' + v.name + ']';
    } else {
      n = v.name;
    }

    res.push('- ' + n +
      (v.type ? ' `' + v.type + '` ' : ' ') +
      links(v.description, true)
    );
  }

  res.push('');

  return;
}

function mdComps(res, vals, ref, all) {  // {{{2
  if (! vals) return;

  res.push('## Components');
  res.push('');
  for (var key in vals) {
    var v = vals[key];

    if (all) {
      res.push('- ' + v.caption);
    } else {
      res.push('###' + v.caption);
      res.push(links(v.readme));

      res.push('[Read more about ' + v.caption + ' ...](#' + ref + '|' + v.name + '#)');
      res.push('');
    }
  }

  if (all) res.push('');

  return;
}

function mdModules(res, vals, ref, all) {  // {{{2
  if (! vals) return;

  res.push('## Modules');
  res.push('');
  for (var key in vals) {
    var v = vals[key];

    if (all) {
      res.push('- ' + v.caption);
    } else {
      res.push('###' + v.caption);
      res.push(links(v.readme));

      res.push('[' + v.caption + ' module reference ...](#' + ref + '|' + v.name + '#)');
      res.push('');
    }
  }

  if (all) res.push('');

  return;
}

function mdFeatures(res, head, vals) {  // {{{2
  if (! vals) return;

  res.push(head);
  res.push(links(vals));

  return;
}

function params2Args(params) {  // {{{2
  if (! params) return '';

  var res = '';
  for (var i = 0; i < params.length; i++) {
    var p = params[i];

    if (p.optional) {
      res += '[' + p.name + ']';
    } else {
      res += p.name;
    }
    res += ', ';
  }

  return res.substr(0, res.length - 2);
}

function links(text, noNl) {  // {{{2
  if (! text) return '';

  text = text.split(/([\[\]\(\)])/);

  for (var i = 0; i < text.length; i++) {
    if (text[i] === ']') {
      if ((text[i - 2] !== '[') || (i < 2)) {
        console.log('Invalid brackets', i, text[i - 2], text[i - 1], text);
        throw new Error('aa');
        continue;
      }

      var args;
      if (text.length > i + 3) {
        if ((text[i + 2] === '(') && (text[i + 4] === ')') && ! text[i + 1].trim()) {
          continue;
        }
      }

      text[i - 2] = '';
      text[i - 1] = link(text[i - 1]);
      text[i] = '';
    }
  }

  if (! noNl) {
    text.push('\n');
  }

  return text.join('');

  function link(t) {  // {{{3
    if (t in Files) {
      var f = t.split('/');
      return '[' + t + '](https://github.com/OpenSmartEnvironment/' + f.shift() + '/blob/master/' + f.join('/') + ')';
    }

    var k = Keywords[t.toLowerCase().replace(/\s/g, '').replace(/\./g, '/')];
    if (! k) {
      console.log('LINK NOT FOUND', t);
      return t;
    }

    return '[' + t + '](#' + k + '#)';
  }

  // }}}3
}

function toc(main) {  // {{{2
  var root = {
    ul: $('<ul>', {id: 'toc'}),
    children: [],
  };
  var parents = [];
  Current.toc = root;

  main.find('h1, h2, h3, h4, h5, h6').each(function(index, h) {
    var p;
    var hash = '#' + Current.hash + '#';
    var r = {
      h: $(h)
        .attr('id', null)
        .click(function() {
          console.log('HEADER CLICK', h, window.location.hash);

          if (hash === window.location.hash) {
            scrollTo(r, true);
          } else {
            window.location = hash;
          }
        })
      ,
    };

    r.name = r.h.text().replace(/[\s#|]/g, '').toLowerCase();
    r.level = parseInt(h.tagName.charAt(1));

    for (var i = 1; i < r.level; i++) {
      if (i in parents) {
        p = parents[i];

        hash += p.name + '|';
      }
    }
    hash += r.name;

    if (! p) p = root;

    if (! p.ul) {
      p.ul = $('<ul>').appendTo(p.li);
      p.children = [];
    }

    r.li = $('<li>', {
      class: 'h' + r.level,
      chapter: r.name,
    })
      .prop('toc', r)
      .append($('<a>', {href: hash})
        .html(r.h.html())
        .click(function() {
          if (hash === window.location.hash) {
            scrollTo(r, true);
          } else {
            DontScrollToc = true;
            window.location = hash;
          }
        })
      )
      .appendTo(p.ul)
    ;

    p.children.push(r);
    parents[r.level] = r;
  });

  $('#toc').replaceWith(root.ul);
}

function scrollTo(chapter, toc) {  // {{{2
  var main = $('#main');

  if (! chapter) {
    main.scrollTop(0);
    return;
  }

  if (typeof chapter === 'string') {
    chapter = chapter.split('|');

    var sel = '#left';
    for (var i = 0; i < chapter.length; i++) {
      sel += '>ul>li[chapter="' + chapter[i] + '"]'
    }
    var chapter = $(sel);

    if (! chapter.length) {
      var sel = '#toc';
      for (var i = 0; i < chapter.length; i++) {
        sel += ' li[chapter="' + chapter[i] + '"]'
      }
      var chapter = $(sel);
    }

    switch (chapter.length) {
    case 0:
      main.scrollTop(0);
      return;
    case 1:
      break;
    default:
      chapter = $(chapter[0]);
    }

    chapter = chapter.prop('toc');
  }

  Current.chapter = chapter;
  if (! chapter) {
    main.scrollTop(0);
    return;
  }

  if (toc) {
    var l = $('#left');
    l.scrollTop(l.scrollTop() + chapter.li.offset().top);
  }

  main.scrollTop(main.scrollTop() + chapter.h.offset().top);

  return;
}


// }}}2

});

