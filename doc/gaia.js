Packages["gaia"] = {
  "name": "gaia",
  "npmname": "ose-gaia",
  "caption": "HTML5 frontend",
  "readme": "OSE package providing an mobile-first HTML5 user interface built\nusing [Gaia\ncomponents](https://developer.mozilla.org/en-US/Apps/Design/Firefox_OS_building_blocks).\n\nAs the current implementation of Gaia components is based on Web\nComponents technology, so the UI is currently fully functional only\nin recent versions of Firefox.\n\nEach browser page (tab) displaying the OSE frontend is an [OSE\ninstance]. As part of the base [OSE plugin] configuration, a\n[peer], representing the backend OSE instance, is created and\nconnected to.\n\nThe connection is realized via a WebSocket in a standard OSE\n[peer-to-peer] way. All information needed for displaying requested\ncontent is exchanged through this WebSocket channel. After a\nsuccessful connection is established, content is displayed using\ndynamic injection.",
  "line": 9,
  "aliases": "oseUi HTML5frontend",
  "description": "## Initialization\n\nWhen the browser sends an HTML request to a backend (Node.js) OSE\ninstance, this instance responds by generating and providing\nindex.html. The `<head>` of the index.html contains `<script>` and\n`<style>` tags. Most of these scripts are shared between Node.js\nand the browser environments. The `<body>` contains a single\n`<script>` that loads the application.",
  "features": "- HTML5 user interface optimized for phones and tablets based on\n [Gaia components]\n (https://developer.mozilla.org/en-US/Apps/Design/Firefox_OS_building_blocks)",
  "scope": "ose",
  "comps": {
    "view": {
      "name": "view",
      "caption": "Views",
      "readme": "A view is a part of a page.\n\nEach view is a descendant of the [Element wrapper class]. There\nare several types of views (see `lib/view` directory). TODO:\nInsert link\n\nThe dashboard view defines the dashboard of the application.\nThe two other basic views are the detail view (displays the\ndetail of one entry) and the list view (displays a list of\nentries).\n\nEach [entry kind] can define own UI layout and behaviour for any\nview type displaying entry in an individual file.\n\nViews can contain other views.",
      "file": "lib/view/listItem.js",
      "line": 11,
      "modules": {
        "lib/view/dashboard": {
          "name": "lib/view/dashboard",
          "type": "class",
          "super": "gaia/lib.view",
          "caption": "Dashboard view",
          "readme": "View for creating dashboard content.",
          "file": "lib/view/dashboard.js",
          "method": {
            "addStateObj": {
              "name": "addStateObj",
              "type": "method",
              "description": "Adds an item defined by `stateObj` to the dashboard.",
              "params": [
                {
                  "name": "caption",
                  "description": "Text to be displayed",
                  "type": "String"
                },
                {
                  "name": "stateObj",
                  "description": "State object that should be displayed when the user taps on this item",
                  "type": "Object"
                }
              ]
            },
            "addContent": {
              "name": "addContent",
              "type": "method",
              "description": "Add multiple [State objects] to the dashboard.",
              "params": [
                {
                  "name": "val",
                  "description": "Array of items",
                  "type": "Array"
                }
              ]
            },
            "additem": {
              "name": "additem",
              "type": "method",
              "description": "Add an item to the dashboard.",
              "params": [
                {
                  "name": "caption",
                  "description": "Text to be displayed",
                  "type": "String"
                },
                {
                  "name": "onTap",
                  "description": "Function to be called when the user taps on this item",
                  "type": "Function"
                }
              ]
            }
          }
        },
        "lib/view/detail": {
          "name": "lib/view/detail",
          "type": "class",
          "super": "gaia/lib.view",
          "caption": "Detail view",
          "readme": "View for displaying entry detail",
          "file": "lib/view/detail.js",
          "method": {
            "post": {
              "name": "post",
              "type": "method",
              "description": "Post command to displayed entry's home"
            },
            "display": {
              "name": "display",
              "type": "method",
              "description": "Display entry based on layout profiles. This method gets\ncalled once after entry dval are loaded. It can be overridden in\nthe layout file for full custom data display."
            },
            "updateData": {
              "name": "updateData",
              "type": "method",
              "description": "Update the information displayed with data patch",
              "params": [
                {
                  "name": "patch",
                  "description": "Data patch",
                  "type": "Object"
                }
              ]
            },
            "setEntry": {
              "name": "setEntry",
              "type": "method",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry to be displayed",
                  "type": "Object"
                }
              ],
              "internal": true
            },
            "removed": {
              "name": "removed",
              "type": "method",
              "internal": true
            },
            "markHome": {
              "name": "markHome",
              "type": "method",
              "internal": true
            },
            "socketError": {
              "name": "socketError",
              "type": "method",
              "internal": true
            }
          }
        },
        "lib/view/entry": {
          "name": "lib/view/entry",
          "type": "class",
          "caption": "Entry view client socket",
          "readme": "Extension for entry view classes.",
          "file": "lib/view/entry.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor",
              "params": [
                {
                  "name": "view",
                  "description": "View",
                  "type": "Object"
                },
                {
                  "name": "entry",
                  "description": "Entry",
                  "type": "Object"
                },
                {
                  "name": "drev",
                  "description": "Whether obtain data and track data changes",
                  "type": "Boolean"
                },
                {
                  "name": "srev",
                  "description": "Whether obtain state and track state changes",
                  "type": "Boolean"
                }
              ]
            }
          }
        },
        "lib/view/gesture": {
          "name": "lib/view/gesture",
          "type": "class",
          "super": "gaia/lib.view",
          "caption": "Gesture view",
          "readme": "View for displaying an entry with the gesture interface.\n\nThis view creates a canvas on which, for example, gesture traces\ncan be drawn. A transparent `<div>` placed over this canvas is a\nHammer.js element registering touch gestures.",
          "file": "lib/view/gesture.js",
          "method": {
            "clearCanvas": {
              "name": "clearCanvas",
              "type": "method",
              "description": "Clears the canvas"
            },
            "log": {
              "name": "log",
              "type": "method",
              "description": "Debug aid method",
              "params": [
                {
                  "name": "message",
                  "description": "",
                  "type": "String"
                },
                {
                  "name": "val",
                  "description": "",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/view": {
          "name": "lib/view",
          "type": "class",
          "super": "gaia/lib.wrap",
          "caption": "View class",
          "readme": "Not every view is necessarily a descendant of this class. Some\nare direct descendants of the [Element wrapper class].",
          "file": "lib/view/index.js",
          "method": {
            "loadData": {
              "name": "loadData",
              "type": "method",
              "description": "Each View descendant should define a `loadData` method. This\nmethod should be called by the code creating the view and should\nensure that data displayed by the view are loaded.",
              "params": [
                {
                  "name": "cb",
                  "description": "Callback to be called after view is displayed",
                  "type": "Function",
                  "optional": true
                }
              ]
            },
            "verifyStateObj": {
              "name": "verifyStateObj",
              "type": "method",
              "description": "Each View descendant should define a \"verifyStateObj\"\nmethod. This method compares the supplied state object with the\ncurrently displayed one.",
              "params": [
                {
                  "name": "data",
                  "description": "State object to be compared",
                  "type": "Object"
                }
              ]
            },
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "View constructor"
            },
            "afterDisplay": {
              "name": "afterDisplay",
              "type": "method",
              "description": "Is called after a view is displayed.\n\nThe function creating a view receives a callback as one of its\nparameters. This callback is assigned to\n\"this.doAfterDisplay\". This method ensures that\n\"this.doAfterDisplay\" is called only once.",
              "params": [
                {
                  "name": "err",
                  "description": "Error",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "extend": {
              "name": "extend",
              "type": "method",
              "params": [
                {
                  "name": "obj",
                  "description": "Layout to extend `this` object",
                  "type": "Object"
                }
              ]
            }
          },
          "property": {
            "layout": {
              "name": "layout",
              "type": "property",
              "dtype": "String",
              "description": "Defines the layout which extends this view. Layouts are defined\nin modules located in the \"gaia\" subdirectory of the entry kind\ndirectory."
            }
          }
        },
        "lib/view/list": {
          "name": "lib/view/list",
          "type": "class",
          "super": "gaia/lib.view",
          "caption": "List of entries view",
          "readme": "View for displaying lists of entries",
          "file": "lib/view/list.js",
          "method": {
            "update": {
              "name": "update",
              "type": "method",
              "description": "Call to update list",
              "params": [
                {
                  "name": "stateObj",
                  "description": "New state object",
                  "type": "Object"
                },
                {
                  "name": "force",
                  "description": "If true, perform update even though stateObj is unchanged.",
                  "type": "Boolean"
                },
                {
                  "name": "keep",
                  "description": "Keep non-persistent list items.",
                  "type": "Boolean"
                }
              ]
            },
            "printItem": {
              "name": "printItem",
              "type": "method",
              "description": "Prints entry list item",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry instance to be printed",
                  "type": "Object"
                }
              ]
            },
            "tapItem": {
              "name": "tapItem",
              "type": "method",
              "description": "Called when user taps on a list item",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry",
                  "type": "Object"
                },
                {
                  "name": "ev",
                  "description": "Tap event object",
                  "type": "Object"
                }
              ]
            },
            "printHeader": {
              "name": "printHeader",
              "type": "method",
              "description": "Prints list header"
            }
          }
        },
        "lib/view/listItem": {
          "name": "lib/view/listItem",
          "type": "class",
          "super": "gaia/lib.view",
          "caption": "Entry list item view",
          "readme": "View for displaying a list item",
          "file": "lib/view/listItem.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "View constructor"
            },
            "tapItem": {
              "name": "tapItem",
              "type": "method",
              "dtype": "Object",
              "description": "Called when user taps on a list item"
            }
          }
        }
      }
    },
    "stateObj": {
      "name": "stateObj",
      "caption": "State objects",
      "readme": "The state object defines what is displayed by the application. It\ncan be saved in the browser's history. Boxes and views receive\nthe state object in as a parameter of their `display()` methods.",
      "file": "lib/stateObj.js",
      "line": 1
    }
  },
  "modules": {
    "lib": {
      "name": "lib",
      "type": "singleton",
      "super": "EventEmitter",
      "caption": "OSE frontend core",
      "readme": "Core singleton of gaia plugin.\n\nThis singleton is available through the `O.ui` property.",
      "file": "lib/index.js",
      "property": {
        "lastStateObj": {
          "name": "lastStateObj",
          "type": "property",
          "dtype": "Object",
          "description": "Last displayed \"page bit\" key object"
        },
        "defaultContent": {
          "name": "defaultContent",
          "type": "property",
          "dtype": "Object",
          "description": "View displayed by default"
        }
      },
      "method": {
        "run": {
          "name": "run",
          "type": "method",
          "description": "Internal OSE UI startup method",
          "internal": true
        },
        "newHistory": {
          "name": "newHistory",
          "type": "method",
          "description": "Creates a new empty state item to the browser's history",
          "internal": true
        },
        "updateHistory": {
          "name": "updateHistory",
          "type": "method",
          "description": "Updates the last history item with the current state object",
          "internal": true
        },
        "display": {
          "name": "display",
          "type": "method",
          "description": "Displays or updates ui based on the state object.",
          "params": [
            {
              "name": "stateObj",
              "description": "State object",
              "type": "Object"
            },
            {
              "name": "source",
              "description": "Source of the call",
              "type": "String 'user'|'history'"
            }
          ]
        },
        "bindContent": {
          "name": "bindContent",
          "type": "method",
          "description": "Creates new event handler that calls the \"O.ui.display(stateObj)\"",
          "params": [
            {
              "name": "stateObj",
              "description": "State object to be displayed",
              "type": "Object"
            }
          ]
        },
        "getStateObj": {
          "name": "getStateObj",
          "type": "method",
          "description": "Gets state object",
          "internal": true
        },
        "isMobile": {
          "name": "isMobile",
          "type": "method",
          "description": "Tests whether the UI is displayed in a mobile browser"
        },
        "checkOrientation": {
          "name": "checkOrientation",
          "type": "method",
          "description": "Checks browser orientation"
        },
        "portrait": {
          "name": "portrait",
          "type": "method",
          "description": "Switch to portrait mode"
        },
        "landscape": {
          "name": "landscape",
          "type": "method",
          "description": "Switch to landscape mode"
        }
      }
    },
    "lib/drawer": {
      "name": "lib/drawer",
      "type": "class",
      "super": "gaia/lib.wrap",
      "caption": "Drawer",
      "readme": "Class handling displaying of drawer.\n\nIt is placed right in the `<body>` and contains the drawer.",
      "file": "lib/drawer.js",
      "method": {
        "init": {
          "name": "init",
          "type": "method",
          "description": "Drawer initialization"
        },
        "addLink": {
          "name": "addLink",
          "type": "method",
          "description": "Append menu item to drawer",
          "params": [
            {
              "name": "caption",
              "description": "Text to display",
              "type": "String"
            },
            {
              "name": "name",
              "description": "Name of menu item",
              "type": "Object"
            },
            {
              "name": "onTap",
              "description": "Handler for click event",
              "type": "Function"
            }
          ]
        },
        "visible": {
          "name": "visible",
          "type": "method",
          "description": "Tell whether the drawer is visible."
        },
        "show": {
          "name": "show",
          "type": "method",
          "description": "Show drawer"
        },
        "hide": {
          "name": "hide",
          "type": "method",
          "description": "Hide drawer",
          "params": [
            {
              "name": "noBack",
              "description": "If true, do not revert history state.",
              "type": "Boolean"
            }
          ]
        },
        "toggle": {
          "name": "toggle",
          "type": "method",
          "description": "Show or hide the drawer"
        }
      }
    },
    "lib/field": {
      "name": "lib/field",
      "type": "class",
      "super": "gaia/lib.wrap",
      "caption": "Field view",
      "readme": "This [element wrapper] works together with the [ose.orm]\ncomponent to display and edit fields.",
      "file": "lib/field.js",
      "method": {
        "constructor": {
          "name": "constructor",
          "type": "method",
          "description": "Field view constructor",
          "params": [
            {
              "name": "wrap",
              "description": "[Field wrapper]",
              "type": "Object"
            },
            {
              "name": "el",
              "description": "Optional HTML element",
              "type": "Object",
              "optional": true
            },
            {
              "name": "attrs",
              "description": "Optional attributes of HTML element",
              "type": "Object",
              "optional": true
            }
          ]
        },
        "getAsside": {
          "name": "getAsside",
          "type": "method",
          "description": "Create content of <aside> of <li> based on field description"
        }
      }
    },
    "lib/header": {
      "name": "lib/header",
      "type": "class",
      "super": "gaia/lib.wrap",
      "caption": "Header",
      "readme": "Class handling displaying of header\n\nIt is placed right in the `<body>` and contains the header.",
      "file": "lib/header.js",
      "method": {
        "init": {
          "name": "init",
          "type": "method",
          "description": "Header initialization"
        },
        "newHeader": {
          "name": "newHeader",
          "type": "method",
          "description": "Create view header"
        }
      }
    },
    "lib/content": {
      "name": "lib/content",
      "type": "class",
      "super": "gaia/lib.wrap",
      "caption": "Main content",
      "readme": "Class handling displaying of the main content on the page.\n\nIt is placed right in the `<body>` and displays the main content of\nthe application.",
      "file": "lib/main.js",
      "method": {
        "constructor": {
          "name": "constructor",
          "type": "method",
          "description": "Main content initialization"
        },
        "display": {
          "name": "display",
          "type": "method",
          "description": "Display content based on `stateObj`",
          "params": [
            {
              "name": "stateObj",
              "description": "Object defining what is to be displayed",
              "type": "Object"
            },
            {
              "name": "source",
              "description": "Where this method is called from",
              "type": "String"
            }
          ]
        },
        "setActive": {
          "name": "setActive",
          "type": "method",
          "description": "Activate `view`",
          "params": [
            {
              "name": "view",
              "description": "View instance",
              "type": "Object"
            }
          ]
        }
      }
    },
    "lib/wrap": {
      "name": "lib/wrap",
      "type": "class",
      "caption": "Element wrapper",
      "readme": "This class provides helper functions for DOM manipulation.",
      "file": "lib/wrap.js",
      "aliases": "elementWrapper elementWrapperClass",
      "method": {
        "constructor": {
          "name": "constructor",
          "type": "method",
          "description": "Wrap constructor",
          "params": [
            {
              "name": "tag",
              "description": "Tag to be wrapped or created",
              "type": "String|Object"
            },
            {
              "name": "attrs",
              "description": "Attributes of tag",
              "type": "Object"
            }
          ]
        },
        "find": {
          "name": "find",
          "type": "method",
          "description": "Find first element within the current element using the selector\n`sel`.",
          "params": [
            {
              "name": "sel",
              "description": "",
              "type": "String"
            }
          ]
        },
        "hook": {
          "name": "hook",
          "type": "method",
          "description": "Create tie between an element and its wrapper by setting the `el.ose` property."
        },
        "free": {
          "name": "free",
          "type": "method",
          "description": "Remove tie between an element and its wrapper"
        },
        "on": {
          "name": "on",
          "type": "method",
          "description": "Add event listener to element",
          "params": [
            {
              "name": "name",
              "description": "Event name",
              "type": "String"
            },
            {
              "name": "cb",
              "description": "Callback",
              "type": "Function"
            }
          ]
        },
        "off": {
          "name": "off",
          "type": "method",
          "description": "Remove event listener from element",
          "params": [
            {
              "name": "name",
              "description": "Event name",
              "type": "String"
            },
            {
              "name": "cb",
              "description": "Callback to be removed",
              "type": "Function"
            }
          ]
        },
        "attr": {
          "name": "attr",
          "type": "method",
          "description": "Set or get value",
          "params": [
            {
              "name": "val",
              "description": "Value to be set",
              "type": "*",
              "optional": true
            }
          ]
        },
        "attrs": {
          "name": "attrs",
          "type": "method",
          "description": "Set multiple attribute",
          "params": [
            {
              "name": "vals",
              "description": "Key/value pairs of attributes to be set",
              "type": "Object"
            }
          ]
        },
        "prop": {
          "name": "prop",
          "type": "method",
          "description": "Set or get single property",
          "params": [
            {
              "name": "name",
              "description": "Property to be set",
              "type": "String"
            },
            {
              "name": "val",
              "description": "Value to be set",
              "type": "String"
            }
          ]
        },
        "props": {
          "name": "props",
          "type": "method",
          "description": "Set or get single property",
          "params": [
            {
              "name": "vals",
              "description": "Key/value pairs of properties to be set",
              "type": "Object"
            }
          ]
        },
        "style": {
          "name": "style",
          "type": "method",
          "description": "Set single CSS style",
          "params": [
            {
              "name": "name",
              "description": "Name of style property",
              "type": "String"
            },
            {
              "name": "val",
              "description": "Value to be set",
              "type": "String|Number"
            }
          ]
        },
        "styles": {
          "name": "styles",
          "type": "method",
          "description": "Set multiple CSS styles",
          "params": [
            {
              "name": "vals",
              "description": "Key/value pairs of styles and their values",
              "type": "Object"
            }
          ]
        },
        "show": {
          "name": "show",
          "type": "method",
          "description": "Show element"
        },
        "hide": {
          "name": "hide",
          "type": "method",
          "description": "Hide element"
        },
        "empty": {
          "name": "empty",
          "type": "method",
          "description": "Remove all children"
        },
        "html": {
          "name": "html",
          "type": "method",
          "description": "Set inner HTML",
          "params": [
            {
              "name": "val",
              "description": "Inner HTML",
              "type": "String"
            }
          ]
        },
        "text": {
          "name": "text",
          "type": "method",
          "description": "Set text content",
          "params": [
            {
              "name": "val",
              "description": "Text",
              "type": "String"
            }
          ]
        },
        "new": {
          "name": "new",
          "type": "method",
          "description": "Create new element",
          "params": [
            {
              "name": "tag",
              "description": "Element tag name or HTML snippet",
              "type": "String"
            },
            {
              "name": "attrs",
              "description": "Key/value pairs of attributes and their values",
              "type": "Object"
            }
          ]
        },
        "wrap": {
          "name": "wrap",
          "type": "method",
          "description": "Create new element or wrap existing element",
          "params": [
            {
              "name": "el",
              "description": "Element to be created or wrapped",
              "type": "String|Object"
            }
          ]
        },
        "append": {
          "name": "append",
          "type": "method",
          "description": "Create new element and append to `this.el`",
          "params": [
            {
              "name": "tag",
              "description": "Tag name, tag element or HTML snippet",
              "type": "String|Object"
            },
            {
              "name": "attrs",
              "description": "Key/value pairs of attributes and their values or element class",
              "type": "Object|String"
            }
          ]
        },
        "add": {
          "name": "add",
          "type": "method",
          "description": "Append child element or elements",
          "params": [
            {
              "name": "val",
              "description": "Stuff to be added",
              "type": "String|Object|Array"
            }
          ]
        },
        "prependTo": {
          "name": "prependTo",
          "type": "method",
          "description": "Prepend to parent element",
          "params": [
            {
              "name": "parent",
              "description": "Parent element",
              "type": "Object"
            }
          ]
        },
        "appendTo": {
          "name": "appendTo",
          "type": "method",
          "description": "Append to parent element",
          "params": [
            {
              "name": "parent",
              "description": "Parent element",
              "type": "Object"
            }
          ]
        },
        "before": {
          "name": "before",
          "type": "method",
          "description": "Append element before element",
          "params": [
            {
              "name": "sibling",
              "description": "Sibling element",
              "type": "Object"
            }
          ]
        },
        "after": {
          "name": "after",
          "type": "method",
          "description": "Append element after element",
          "params": [
            {
              "name": "sibling",
              "description": "Sibling element",
              "type": "Object"
            }
          ]
        },
        "stop": {
          "name": "stop",
          "type": "method",
          "description": "Stop event propagation and prevent default behaviour",
          "params": [
            {
              "name": "ev",
              "description": "Event",
              "type": "Object"
            }
          ]
        },
        "target": {
          "name": "target",
          "type": "method",
          "description": "Wrap current target of event",
          "params": [
            {
              "name": "ev",
              "description": "Event",
              "type": "Object"
            }
          ]
        },
        "remove": {
          "name": "remove",
          "type": "method",
          "description": "Remove element from DOM",
          "params": [
            {
              "name": "sel",
              "description": "Selector",
              "type": "String"
            }
          ]
        },
        "addClass": {
          "name": "addClass",
          "type": "method",
          "description": "Add class to element",
          "params": [
            {
              "name": "val",
              "description": "Class value",
              "type": "String"
            }
          ]
        },
        "hasClass": {
          "name": "hasClass",
          "type": "method",
          "description": "Check if element has class",
          "params": [
            {
              "name": "val",
              "description": "Class value",
              "type": "String"
            }
          ]
        },
        "removeClass": {
          "name": "removeClass",
          "type": "method",
          "description": "Remove class from element",
          "params": [
            {
              "name": "val",
              "description": "Class value",
              "type": "String"
            }
          ]
        },
        "view": {
          "name": "view",
          "type": "method",
          "description": "Create new view",
          "params": [
            {
              "name": "el",
              "description": "Element",
              "type": "Object",
              "optional": true
            },
            {
              "name": "stateObj",
              "description": "State object",
              "type": "Object"
            }
          ]
        },
        "select": {
          "name": "select",
          "type": "method",
          "description": "Select text in first child node"
        },
        "left": {
          "name": "left",
          "type": "method",
          "description": "Get element left"
        },
        "top": {
          "name": "top",
          "type": "method",
          "description": "Get element top"
        },
        "width": {
          "name": "width",
          "type": "method",
          "description": "Get element width"
        },
        "height": {
          "name": "height",
          "type": "method",
          "description": "Get element height"
        },
        "focus": {
          "name": "focus",
          "type": "method",
          "description": "Set element focus"
        }
      }
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "Gaia web components content",
      "readme": "This singleton defines which files to provide to browsers.",
      "file": "content.js"
    }
  }
};