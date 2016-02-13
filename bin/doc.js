#!/usr/bin/env node

'use strict';

var _ = require('underscore');
var Marked = require('marked');
var Y = require('yuidocjs');
var Fs = require('fs');

/** Doc {{{1
 * @caption OSE software documentation
 *
 * @readme
 * This package is used to build documentation for all official OSE
 * packages.
 *
 * @about
 * <b>Open Smart Environment software is a suite for creating
 * multi-instance applications that work as a single whole.</b><br>
 * Imagine, for example, a personal mesh running on various devices
 * including HTPCs, phones, tablets, workstations, servers, Raspberry
 * Pis, home automation gadgets, wearables, drones, etc.
 *
 * OSE software consists of several npm packages: a [framework] running
 * on Node.js, an [HTML5 frontend], extending
 * packages and a set of example applications.
 *
 * <a href="http://opensmartenvironment.github.io/doc/resource/ose.svg"><img width=100% src="http://opensmartenvironment.github.io/doc/resource/ose.svg"></a>
 *
 * **Set-up of current example applications.** Here,
 * OSE provides a [Media player](#example-player) running on an HTPC
 * that can be controlled by an IR remote through
 * [LIRC](#example-lirc) and is capable of playing streams from a
 * [DVB streamer](#example-dvb) and control devices through GPIO
 * pins on a [Raspberry Pi](#example-rpi)
 *
 * @getting_started
 * The best way to get started with OSE is to try out the examples:
 * - [Media player](#example-player)
 * - [Raspberry Pi](#example-rpi) (or other device with GPIO)
 * - [LIRC](#example-lirc)
 * - [DVB streamer](#example-dvb)
 *
 *
 * @platforms
 * OSE has the following prerequisites:
 * - Node.js (>0.12) running on Debian Jessie and Raspbian
 * - Recent version of Firefox or Chrome browser
 *
 * @install
 * # Installation
 *
 * ## Node.js
 * The main prerequisite is a working installation of a recent
 * version of Node.js (>= 0.12).
 *
 *
 * ## Manual installation of OSE packages
 * Instead of using npm, you can install OSE packages by cloning their
 * GitHub repositories.
 *
 *
 * @contrib
 * # Contributions
 * To get started with contributing or coding, it is good to read about the
 * two main npm packages [ose] and [ose-html5].
 *
 * This software is in the pre-alpha stage. Any input is welcome, for
 * example, in the form of bug reports, pull requests, ideas, comments
 * and general suggestions, either under the appropriate repository if
 * you know which one it is, or the [main OSE
 * repository](https://github.com/opensmartenvironment/ose) if you are
 * unsure.
 *
 *
 * @status
 * - Pre-alpha stage (insecure and buggy)
 * - Unstable API
 * - Patchy documentation
 * - No test suite
 *
 * This is not yet a piece of download-and-use software. It is important
 * to understand the basic principles covered by the
 * [documentation](http://opensmartenvironment.github.io/doc/).
 *
 *
 * @licence
 * This software is released under the terms of the [GNU General
 * Public Licence v3.0](http://www.gnu.org/copyleft/gpl.html) or
 * later.
 *
 *
 * @about_doc
 * # About the documentation
 *
 * ## State of the documentation
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
 *
 * @module doc
 * @main doc
 */

/**
 * @caption Documentation build script
 *
 * @readme
 * To build complete documentation, go to the "ose-doc" package parent directory and run:
 *
 *     ose-doc/bin/doc.js
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
  var options = {
    quiet: true,
    outdir: 'build',
    linkNatives: 'true',
    attributesEmit: 'true',
    selleck: 'false',
    markdown: 'true',
    exclude: 'depends,node_modules,bower_components,resource',
    project: {
      name: 'OSE',
    },
    paths: [
      './doc',
      './ose',
      './html5',
      './control',
      './fs',
      './rpi',
      './media',
      './dvb',
      './lirc',
      './pa',
      './videolan',
      './xorg',
      './yoctopuce',
      './icecast',
      './example-dvb',
      './example-lirc',
      './example-player',
      './example-rpi',
    ],
  };

  Json = (new Y.YUIDoc(options)).run();

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
};

// }}}1
// Private {{{1
var Json;
var Packages = {};

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
  d.line = comp.line;
  d.aliases = comp.aliases;
  d.description = comp.description;
  d.features = comp.features;
  d.usage = comp.usage;

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
  if (m.kind) {
    d.schema = m.schema;
    d.kind = m.kind;
    d.type = 'kind';
  }
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
  if ('internal' in i) d.internal = i.internal || true;
  if ('handler' in i) d.type = 'handler';

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
    Fs.writeFileSync('./doc/doc/' + key + '.js', 'Packages["' + key + '"] = ' + JSON.stringify(p, null, 2) + ';');
    Fs.writeFileSync('./' + key + '/README.md', getReadme(p));
  }
}

function packageFile(name) {  // {{{2
  name = name.split('/');

  return _.rest(name, 1).join('/');
}

function getReadme(pkg) {  // {{{2
  var q = Packages.ose.quick;

  var r = ['# Open Smart Environment - ' + pkg.caption];
  r.push(links(pkg.readme));
  r.push('');

  if (pkg.features) {
    r.push('## Features');
    r.push(links(pkg.features));
    r.push('');
  }

  r.push('## Important links');
  r.push('This package is a part of the OSE suite. For more information, see the following links:');
  if (pkg.install) {
    r.push('- [' + pkg.caption + ' usage](http://opensmartenvironment.github.io/doc/#' + pkg.name + '|usage)');
  }
  r.push('- [' + pkg.caption + ' documentation](http://opensmartenvironment.github.io/doc/#' + pkg.name + ')');
  r.push('- [OSE suite documentation](http://opensmartenvironment.github.io/doc/)');
  r.push('- [All packages](https://github.com/opensmartenvironment/)');
  r.push('');

  r.push('## About OSE');
  r.push(links(q.about));
  r.push('');
  r.push('For more information about OSE see **[the documentation](http://opensmartenvironment.github.io/doc/)**.');
  r.push('');

  r.push('## Status');
  r.push(q.status);
  r.push('');

  r.push('## Platforms');
  r.push(q.platforms);
  r.push('');

  if (pkg.usage) {
    r.push(links(pkg.usage));
    r.push('');
  }

  r.push('## Licence');
  r.push(q.licence);
  r.push('');

  return r.join('\n');
};

function links(text) {  // {{{2
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
          var t = text[i + 3];
          if (t.match(/^http/)) continue;

          text[i + 3] = 'http://opensmartenvironment.github.io/doc/' + t;
          continue;
        }
      }

      text[i - 2] = '';
      var t = text[i - 1];
      text[i - 1] = '[' + t + '](http://opensmartenvironment.github.io/doc/#' + t.toLowerCase().replace(/\s/g, '').replace(/\./g, '/') + ')';
      text[i] = '';
    }
  }

  return text.join('');
}

// }}}1

exports.build();
