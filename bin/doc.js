#!/usr/bin/env node
'use strict';

var _ = require('underscore');
var Marked = require('marked');
var Y = require('yuidocjs');
var Fs = require('fs');

/** Doc {{{1
 * @caption OSE Documentation
 *
 * @readme
 * This package is used to build documentation for all official OSE
 * packages.
 *
 * @about
 * The main advantage of OSE is the easy creation of applications
 * consisting of multiple instances that work as a single whole. The
 * objective is to develop an all-encompassing personal mesh running
 * on various devices including HTPCs, phones, tablets, workstations,
 * servers, Raspberry Pis, home automation gadgets, wearables, drones
 * etc.
 *
 * <a href="http://opensmartenvironment.github.io/doc/resource/ose.svg"><img width=100% src="http://opensmartenvironment.github.io/doc/resource/ose.svg"></a>
 *
 * @getting_started
 * A good way to get started with OSE is to try out one of the examples:
 * - [Media player](#example-player)
 * - [Raspberry Pi](#example-rpi) (or other device with GPIO)
 * - [LIRC](#example-lirc)
 * - [DVB streamer](#example-dvb)
 *
 *
 * @platforms
 * OSE is being developed in JavaScript on the following platforms.
 * - Node.js (>0.10) running on Debian Jessie and Raspbian
 * - Firefox 37 or newer with Web Components enabled
 *
 * It, however, probably also works with other Linux distributions.
 *
 *
 * @install
 * # Installation
 *
 * ## Node.js
 * The main prerequisite is a working installation of a recent
 * installation of
 * [Node.js](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)
 * (>= 0.10).
 *
 * On Debian Jessie, you can install the default package:
 *
 *     sudo apt-get install nodejs
 *
 * On Raspbian, you can install Node.js, for example, by doing:
 *
 *     wget http://node-arm.herokuapp.com/node_latest_armhf.deb
 *     sudo dpkg -i node_latest_armhf.deb
 *
 *
 * You also need the following prerequisites
 *
 * - libdbus-1-dev package or its equivalent for your distribution
 * - pkg-config package or its equivalent in your distribution
 *
 * If you run Debian Jessie, just run:
 *
 *     sudo apt-get install libdbus-1-dev pkg-config
 *
 *
 * ## Manual installation of OSE packages
 * Instead of using npm, you can install OSE packages by cloning their
 * GitHub repositories. You can thus install only the packages that
 * you actually need.
 *
 * TODO: Expand on this.
 *
 *
 * @contrib
 * # Contributions
 * To get started with contributing or coding, it is good to read about the
 * two main npm packages [ose] and [ose-gaia].
 *
 * This software is in the pre-alpha stage. At the moment, it is
 * premature to file bugs. Input is, however, much welcome in the form
 * of ideas, comments and general suggestions.  Feel free to contact
 * us via
 * [github.com/opensmartenvironment](https://github.com/opensmartenvironment).
 *
 *
 * @status
 * - Pre-alpha stage (insecure and buggy)
 * - Unstable API
 * - Gaps in the documentation
 * - No test suite
 *
 * This is not yet a piece of download-and-use software. It is important
 * to understand the basic principles covered by the
 * [documentation](http://opensmartenvironment.github.io/doc/).
 *
 * Use of this software is currently recommended only to users that
 * wish to participate in the development process, see
 * [contributions](http://opensmartenvironment.github.io/doc/#contrib).
 *
 *
 * @licence
 * This software is released under the terms of the [GNU General
 * Public License v3.0](http://www.gnu.org/copyleft/gpl.html) or
 * later.
 *
 *
 * @about_doc
 * # About the documentation
 *
 * ## State of documentation
 * This documentation is currently under construction and is being
 * continuously improved. Links may be broken and information
 * incomplete or erroneous.
 *
 *
 * ## Packages and components
 * OSE documentation is compiled from source files of all official OSE
 * npm packages.
 *
 * Each package consists of components. Each component is a logical
 * concept consisting of modules.
 *
 * The documentation of each package contains basic information about
 * the package, its components and modules not assigned to any
 * component.
 *
 * The documentation of each component contains basic information
 * about the component and its modules.
 *
 *
 * ## Modules
 * Modules are mostly source files conforming to the CommonJS Modules
 * spec.
 *
 * The module view is a reference of methods, properties and events
 * provided by the given module.
 *
 * A module can be one of the following:
 * - simple module with exported methods and properties
 * - class definition
 * - singleton
 * - package core module
 *
 * @module doc
 * @main doc
 */

/**
 * @caption Documentation build script
 *
 * @readme
 * To build complete documentation, go to the "ose-doc" package directory and run:
 *
 *     node bin/doc.js
 *
 * @class doc.bin.doc
 * @type module
 */

/*
 * Mapping between yui names and OSE names:
 *
 * yui.module == ose.package
 * yui.submodule == ose.component (ose.comp)
 * yui.class == ose.module, module can be a "class", "singleton", "module" or "runtime"
 */

// Public {{{1
exports.build = function() {  // {{{2
//  Y.Handlebars.registerHelper('buildOseFileTree', buildFileTree);

  var options = {
    quiet: true,
    outdir: 'build',
//    themedir: 'yui/theme',
    linkNatives: 'true',
    attributesEmit: 'true',
    selleck: 'false',
    markdown: 'true',
    exclude: 'depends,node_modules,bower_components',
//    parseOnly: 'true',
    paths: [
      './',
      '../ose',
      '../example-dvb',
      '../example-lirc',
      '../example-player',
      '../example-rpi',
      '../control',
      '../dvb',
      '../fs',
      '../gaia',
      '../media',
      '../lirc',
      '../pa',
      '../rpi',
      '../videolan',

    /*

      '../icecast',
      '../xorg',
      '../yoctopuce',
      '../youtube',
      */
    ],
    project: {
      name: 'OSE',

      /*
      description: pkg.description,
      version: pkg.version,
      url: pkg.homepage,
      */

        /*
      name: pkg.name,
      description: pkg.description,
      version: pkg.version,
      url: pkg.homepage,
      */
    },
  };

  Json = (new Y.YUIDoc(options)).run();

//  for (var key in Json.files) prepFile(key);
  for (var key in Json.modules) prepPackage(key);
  for (var key in Json.modules) prepComp(key);
  for (var key in Json.classes) prepModule(key);
  for (var key in Json.classitems) prepModuleItem(key);

  var p = Json.modules.doc;
  Packages.ose.quick = {
    about: p.about,
    status: p.status,
    install: p.install,
    licence: p.licence,
    contrib: p.contrib,
    aboutDoc: p.about_doc,
    platforms: p.platforms,
    start: p.getting_started,
  };

  writeData();

  return;





/*
//  prepExample('bundle.media');

//  var readme = [];
  delete Json.warnings;

  Contrib = Json.modules['bundle'].contributions;
  License = Json.modules['bundle'].license;
  Status = Json.modules['bundle'].status;
  Starting = Json.modules['bundle'].getting_started;
  StartingLink = Json.modules['bundle'].getting_started_link;

  for (var key in Json.classitems) doModuleItem(key);
  for (var key in Json.classes) doModule(key);
  for (var key in Json.modules) doPackage(key);

//  Fs.writeFile('../doc/keywords.json', JSON.stringify(Keywords, null, 2));
//  Fs.writeFile('../doc/data2.json', JSON.stringify(Json, null, 2));
//  Fs.writeFile('../doc/data.js', 'window.doc = ' + JSON.stringify(Json) + ';');
//  grunt.file.write('README.md', readme.join('\n'));

  var doc = [Json.modules['bundle'].documentation];
  doc.push('## Getting started');
  doc.push(StartingLink);
  doc.push('');

  Fs.writeFile('yui/theme/partials/index.handlebars', Marked(mdKeywords(doc.join('\n'))));

  console.log('BUILDING ...');
  var builder = new Y.DocBuilder(options, Json);

  builder.compile(function() {
    grunt.log.writeln('DONE');
    cb();
  });
  */
};

// }}}1
// Private {{{1
var Json;
var Packages = {};
var GhUri = 'http://opensmartenvironment.github.io/doc';

function prepPackage(name) {  // {{{2
  var comp = Json.modules[name];
  if (comp.is_submodule) {
    return;
  }
  var d = {};

  d.name = comp.name;
  d.npmname = d.name === 'ose' ? 'ose' : 'ose-' + d.name;
  d.caption = comp.caption;
  d.readme = comp.readme;
  d.file = packageFile(comp.file);
  d.line = comp.line;
  d.aliases = comp.aliases;
  d.description = comp.description;
  d.features = comp.features;

  Packages[d.name] = d;
}

function prepComp(name) {  // {{{2
  var comp = Json.modules[name];
  if (! comp.is_submodule) {
    return;
  }
  var d = {};

  var n = comp.name.split('.');
  if (n[0] !== comp.module) throw new Error('Invalid component name: ' + comp.name + ' module: ' + comp.module);

  d.name = n[1];
  d.caption = comp.caption;
  d.readme = comp.readme;
  d.file = packageFile(comp.file);
  d.line = comp.line;
  d.aliases = comp.aliases;
  d.description = comp.description;
  d.features = comp.features;

  var p = Packages[comp.module];
  if (! ('comps' in p)) {
    p.comps = {}
  }
  p.comps[d.name] = d;
}

function prepModule(name) {  // {{{2
  var m = Json.classes[name];

  var d = {};

  var n = m.name.split('.');

  d.name = _.rest(n).join('/');
  d.type = m.type;
  d.super = m.extends && m.extends.replace('.', '/', 'g');
  d.caption = m.caption;
  d.readme = m.readme;
  d.file = packageFile(m.file);
  d.aliases = m.aliases;
  d.description = m.description

  var p;
  if (m.submodule) {
    p = m.submodule.split('.');
    p = Packages[p[0]].comps[p[1]];
  } else {
    p = Packages[m.module];
  }

  if (! ('modules' in p)) {
    p.modules = {};
  }
  p.modules[d.name] = d;

  if (! d.type) {
    console.log('MISSING MODULE TYPE', d.name, d.file, m.file);
  }
}

function prepModuleItem(name) {  // {{{2
  var i = Json.classitems[name];

//  console.log('PREP MODULE ITEM', name, i);

  var d = {};
  d.name = i.name;
  d.type = i.itemtype;
  d.dtype = i.type;
  d.description = i.description
  d.aliases = i.aliases;
  d.params = i.params;

  var p;
  if (i.submodule) {
    p = i.submodule.split('.');
    p = Packages[p[0]].comps[p[1]];
  } else {
    p = Packages[i.module];
  }
  var n = i.class.split('.');
  p = p.modules[_.rest(n).join('/')];

  if (! (d.type in p)) {
    p[d.type] = {};
  }
  p[d.type][d.name] = d;
}

function writeData() {  // {{{2
  for (var key in Packages) {
    var p = Packages[key];
    Fs.writeFileSync('./doc/' + key + '.js', 'Packages["' + key + '"] = ' + JSON.stringify(p, null, 2) + ';');
    Fs.writeFileSync('../' + key + '/README.md', getReadme(p));
  }
}

function packageFile(name) {  // {{{2
  name = name.split('/');
  if (name[0] === '..') {
    return _.rest(name, 2).join('/');
  }

  return name.join('/');
}

function getReadme(pkg) {  // {{{2
  var q = Packages.ose.quick;

  var r = ['# Open Smart Environment - ' + pkg.caption];
  r.push('This package is a part of the OSE suite.');
  r.push('All packages can be found [on GitHub](https://github.com/opensmartenvironment/).')
  r.push('');

  r.push(q.about);
  r.push('');
  r.push('For more information about OSE see **the [documentation](http://opensmartenvironment.github.io/doc/)**.');
  r.push('');

  r.push('## Status');
  r.push(q.status);
  r.push('');

  r.push('## Platforms');
  r.push(q.platforms);
  r.push('');

  r.push('## Package description');
  r.push(pkg.readme);
  r.push('');
  r.push('The documentation for "' + pkg.npmname + '" package can be found **[here](http://opensmartenvironment.github.io/doc/#' + pkg.npmname + '#)**.');
  r.push('');

  r.push('## Licence');
  r.push(q.licence);
  r.push('');

  return r.join('\n');
};

// }}}1

exports.build();




/* OBSOLETE  // {{{1
var Keywords = {};
var Contrib;
var License;
var Status;
var Starting;
var StartingLink;

function prepExample(name) {  // {{{2
  var e = Json.modules[name];

  e.description = [
    '## Prerequisities',
    e.prerequisities,
    '## Installation',
    e.installation,
    '## Getting it to run',
    e.gettingtorun,
    '## Configuration',
    e.configuration,
  ].join('\n');
}

function doPackage(name) {  // {{{2
//  console.log('DO PACKAGE', name);

  var comp = Json.modules[name];
  if (comp.is_submodule) return;

  var d = [comp.readme];
  d.push('');

  if (comp.features) {
    d.push('## Features');
    d.push(comp.features);
    d.push('');
  }

  d.push('## Status');
  d.push(Status);
  d.push('');

  d.push('## Getting started');
  if (name === 'bundle') {
    d.push(Starting);
  } else {
    d.push(StartingLink);
  }
  d.push('');

  if (comp.description) {
    d.push(comp.description);
    d.push('');
  }

  doComps(comp, d);
  doModules(comp, d, true);

  d.push(Contrib);
  d.push('');

  d.push('## Licence');
  d.push(License);
  d.push('');

  comp.description = crossKeywords(d.join('\n'));

  Fs.writeFile('../' + comp.name + '/README.md',
    '# ' + comp.caption + '\n\n' +
    mdKeywords(d.join('\n'))
  );

//  grunt.file.write('../doc/' + comp.name.replace('/', '.') + '.md', comp.description);
};

function doComps(comp, d) {  // {{{2
  if (_.isEmpty(comp.submodules)) return;

  d.push('## Components');
  d.push(comp.caption + ' consists of the following components:');

  for (var key in comp.submodules) {
    var sm = Json.modules[key];
    d.push('- ' + sm.caption);
  }

  d.push('');

  for (var key in comp.submodules) {
    var sm = Json.modules[key];

    d.push('### ' + sm.caption);
    d.push(sm.readme);
    d.push('');
    d.push('Read more about [' + sm.caption + '] ...\n\n');

    doComp(sm);
  }

//  grunt.file.write('../doc/' + sm.name.replace('/', '.') + '.md', sm.description);
}

function doComp(comp) {  // {{{2
  var d = [comp.readme];
  d.push('');

  if (comp.description) {
    d.push(comp.description);
    d.push('');
  }

  doModules(comp, d);

  comp.description = crossKeywords(d.join('\n'));
}

function doModules(comp, d, isMain) {  // {{{2
  d.push('## Modules');
  d.push(comp.caption + ' consists of the following modules:');

  for (var key in comp.classes) {
    var c = Json.classes[key];
    if (isMain && c.submodule) continue;

    d.push('- ' + c.caption);
  }

  d.push('');

  for (var key in comp.classes) {
    var c = Json.classes[key];
    if (isMain && c.submodule) continue;

    d.push('### ' + c.caption);
    d.push(c.readme);
    d.push('');
    d.push('Module [' + c.caption + '] reference ... ');
    d.push('');
  }
}

function doModule(name) {  // {{{2
//  console.log('DO MODULE', name);

  var c = Json.classes[name];

  c.displayName = c.caption;

  var d = [c.readme];
  d.push('');
  d.push(c.desc);

  c.description = crossKeywords(d.join('\n'));

//  grunt.file.write('../doc/' + c.name.replace('/', '.') + '.md', c.description);
};

function doModuleItem(name) {  // {{{2
//  console.log('DO MODULE ITEM', name);

  var c = Json.classitems[name];
  c.description = crossKeywords(c.description);

//  grunt.file.write('../doc/' + c.name.replace('/', '.') + '.md', c.description);
};

function crossKeywords(text) {  // {{{2
  return linkKeywords(text, crossLink);
};

function mdKeywords(text) {  // {{{2
  return linkKeywords(text, mdLink);
};

function linkKeywords(text, link) {  // {{{2
  if (! text) return '';

  if (typeof text !== 'string') {
    console.log('NOT A STRING', text);
  }

  var prev;
//  console.log('CROSSLINK', text);

  text = text.split(/([\[\]\(\)])/);
//  text = text.split(/([\[\]])/);

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
          /*
          if (text[i + 3].trim().toLowerCase().match(/^http/)) {
            continue;
          }

          if (text[i + 3].charAt(0) === '.') {
            continue;
          }

          if (text[i + 3].charAt(0) === '.') {
            continue;
          }

          args = text[i + 4];
          * /
        }
      }

      text[i - 2] = '';
      text[i - 1] = doLink(text[i - 1]);
      text[i] = '';
//      console.log('LINK REPLACED', text[i - 1]);
    }
  }

  return text.join('');

  function doLink(t) {
    if (t === 'constructor') {
      k = 'ose.wrap';
    } else {
      var k = Keywords[t.toLowerCase().replace(/\s/g, '')];
    }

    if (! k) {
      console.log('LINK NOT FOUND', t);
      return t;
      return '[' + t + ']';
    }

    if (k in Json.modules) {
      return link(t, k, 'module');
    }

    if (k in Json.classes) {
      return link(t, k, 'class');
    }

    if (k in Json.classitems) {
      return link(t, k, 'classitem');
    }

    if (k in Json.files) {
      return link(t, k, 'file');
    }

    console.log('LINK INVALID', t, k);
    return t;
    return '[' + t + ']';
  }
}

function mdLink(text, key, type) {  // {{{2
  switch (type) {
  case 'module':
    return '[' + text + '](' + GhUri + '/modules/' + key + '.html)';
  case 'class':
    return '[' + text + '](' + GhUri + '/classes/' + key + '.html)';
  case 'classitem':
    var i = Json.classitems[key];
    return '[' + text + '](' + GhUri + '/classes/' + i.class + '.html)';
  case 'file':
    return '[' + text + '](' + GhUri + '/files/' + key + '.html)';
  }

  throw new Error('Invalid LINK type: ' + JSON.stringify(arguments));
}

function crossLink(text, key, type) {  // {{{2
//  console.log('CROSSLINK', text, key, type);

  switch (type) {
  case 'module':
    return '{{#crossLinkModule "' + key + '"}}' + text + '{{/crossLinkModule}}';
  case 'class':
    return '{{#crossLink "' + key + '"}}' + text + '{{/crossLink}}';
  case 'classitem':
    var i = Json.classitems[key];
    if (! (i && i.class && i.name)) {
      throw new Error('MISSING CLASSITEM ' + JSON.stringify(arguments));
    }
    return '{{#crossLink "' + i.class + '/' + i.name + '"}}' + text + '{{/crossLink}}';
  case 'file':
    return '[' + text + '](../files/' + key.replace(/\//g, '_') + '.html)';
  }

  throw new Error('Invalid LINK type: ' + JSON.stringify(arguments));
}

function keyword(key, caption, list) {  // {{{2

  if (! (key && (typeof key === 'string'))) {
    console.log('INVALID KEYWORD', arguments);
    return;
  }

  add(key);

  if (caption) {
    add(caption);
  }

  if (! list) return;

  if (typeof list === 'string') list = list.split(/\s/);

  for (var i = 0; i < list.length; i++) {
    caption = list[i].trim();
    if (caption) {
      add(caption);
//      Keywords[caption.toLowerCase().replace(/\s/g, '')] = key;
    }
  }

  function add(v) {
    var v = v.toLowerCase().replace(/\s/g, '');
    if (v in Keywords) {
      if (Keywords[v] !== key) {
        console.log('DUPLICIT KEYWORD', v, key, Keywords[v]);
      }
    } else {
      Keywords[v] = key;
    }
  }
};

function filename(name) {  // {{{2
  var match = name.match(/^\.\.\/(.*)/);

  if (match) {
    name = match[1];

    match = name.match(/^ose\//);
    if (match) {
      return name;
    }

    return 'ose-' + name;
  } else {
    return 'ose-bundle/' + name;
  }
};

function prepFile(key) {  // {{{2
//  console.log('PREP FILE', key);

  var file = Json.files[key];

//  file.name = filename(key);
//  delete Json.files[key];
//  Json.files[filename(key)] = file;

  keyword(key, filename(key));
}

// }}}1*/

