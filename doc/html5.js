Packages["html5"] = {
  "name": "html5",
  "npmname": "ose-html5",
  "caption": "HTML5 frontend",
  "readme": "OSE package providing an mobile-first HTML5 user interface.\n\nEach browser page (tab) displaying the OSE frontend is an [OSE\ninstance]. As part of the base [OSE plugin] configuration, a\n[peer], representing the backend OSE instance, is created and\nconnected to.\n\nThe connection is realized via a WebSocket in a standard OSE\n[peer-to-peer] way. All information needed for displaying requested\ncontent is exchanged through this WebSocket channel. After a\nsuccessful connection is established, content is displayed using\ndynamic injection.",
  "line": 13,
  "aliases": "oseUi HTML5frontend",
  "description": "## Initialization\nWhen the browser sends an HTML request to a backend (Node.js) OSE\ninstance, this instance responds by generating and providing\nindex.html. The `<head>` of the index.html contains `<script>` and\n`<style>` tags. Most of these scripts are shared between Node.js\nand the browser environments. The `<body>` contains a single\n`<script>` that loads the application.\n\n## State object\nThe state object defines what is displayed by the application. It\ncan be saved in the browser's history. Views receive\nthe state object in as a parameter of their `display()` methods.",
  "features": "- HTML5 user interface optimized for phones and tablets",
  "comps": {
    "view": {
      "name": "view",
      "caption": "Views",
      "readme": "A view is a part of a page.\n\nEach view is a descendant of the [Element wrapper class]. There\nare several types of views (see `lib/view` directory). TODO:\nInsert link\n\nThe dashboard view defines the dashboard of the application.\nThe two other basic views are the detail view (displays the\ndetail of one entry) and the list view (displays a list of\nentries).\n\nEach [entry kind] can define own UI layout and behaviour for any\nview type displaying entry in an individual file.\n\nViews can contain other views.",
      "file": "lib/box.js",
      "line": 12,
      "modules": {
        "lib/view/dashboard": {
          "name": "lib/view/dashboard",
          "type": "class",
          "super": "html5/lib.view",
          "caption": "Dashboard view",
          "readme": "View for creating dashboard content.",
          "file": "lib/view/dashboard.js",
          "method": {
            "addDemand": {
              "name": "addDemand",
              "type": "method",
              "description": "Adds an item defined by `demand` to the dashboard.",
              "params": [
                {
                  "name": "caption",
                  "description": "Text to be displayed",
                  "type": "String"
                },
                {
                  "name": "demand",
                  "description": "Demand that should be displayed when the user taps on this item",
                  "type": "Object"
                }
              ]
            },
            "addContent": {
              "name": "addContent",
              "type": "method",
              "description": "Add multiple demands to the dashboard.",
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
          "super": "html5/lib.view",
          "caption": "Detail view",
          "readme": "View for displaying entry detail",
          "file": "lib/view/detail.js",
          "method": {
            "post": {
              "name": "post",
              "type": "method",
              "description": "Post command to displayed entry's home"
            },
            "patch": {
              "name": "patch",
              "type": "method",
              "description": "Update the information displayed with data patch",
              "params": [
                {
                  "name": "val",
                  "description": "Entry patch",
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
            "markHome": {
              "name": "markHome",
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
                }
              ]
            }
          }
        },
        "lib/view/gesture": {
          "name": "lib/view/gesture",
          "type": "class",
          "super": "html5/lib.view",
          "caption": "Gesture view",
          "readme": "View for displaying an entry with the gesture interface.\n\nThis view creates a canvas on which, for example, gesture traces\ncan be drawn. A transparent `<section>` placed over this canvas is\nan element registering touch and key gestures.",
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
          "super": "html5/lib.wrap",
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
            "verifyDemand": {
              "name": "verifyDemand",
              "type": "method",
              "description": "Each View descendant should define a \"verifyDemand\"\nmethod. This method compares the supplied demand with the\ncurrently displayed one.",
              "params": [
                {
                  "name": "data",
                  "description": "Demand to be compared",
                  "type": "Object"
                }
              ]
            },
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "View constructor"
            }
          },
          "property": {
            "layout": {
              "name": "layout",
              "type": "property",
              "dtype": "String",
              "description": "Defines the layout which extends this view. Layouts are defined\nin modules located in the \"html5\" subdirectory of the entry kind\ndirectory."
            }
          }
        },
        "lib/view/list": {
          "name": "lib/view/list",
          "type": "class",
          "super": "html5/lib.view",
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
                  "name": "demand",
                  "description": "New demand",
                  "type": "Object"
                },
                {
                  "name": "force",
                  "description": "If true, perform update even though demand is unchanged.",
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
            "displayHeader": {
              "name": "displayHeader",
              "type": "method",
              "description": "Prints list header"
            }
          }
        },
        "lib/view/listItem": {
          "name": "lib/view/listItem",
          "type": "class",
          "super": "html5/lib.view",
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
        },
        "lib/main": {
          "name": "lib/main",
          "type": "class",
          "super": "html5/lib.wrap",
          "caption": "View box class",
          "readme": "View box object handles one view at a time. Calling `box.display(demand, source, cb)` new view is created or existing one is updated.",
          "file": "lib/box.js",
          "aliases": "viewbox",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Main section initialization"
            },
            "display": {
              "name": "display",
              "type": "method",
              "description": "Display new view or update existing one inside this box based on `demand`.",
              "params": [
                {
                  "name": "demand",
                  "description": "Object defining what is to be displayed",
                  "type": "Object"
                },
                {
                  "name": "cb",
                  "description": "Final callback",
                  "type": "Function"
                }
              ]
            }
          }
        }
      }
    }
  },
  "modules": {
    "lib/body/simple": {
      "name": "lib/body/simple",
      "type": "class",
      "super": "html5/lib.wrap",
      "caption": "HTML body wrapper",
      "readme": "This singleton wraps the `document.body` and provides the\nbasic part of the UI. It creates the following basic components:\n\n- main\n  Shows a view containing data\n\n- header\n  Renders the app's header\n\n- drawer\n  Renders the app's drawer",
      "file": "lib/body/simple.js",
      "method": {
        "run": {
          "name": "run",
          "type": "method",
          "description": "Internal OSE UI startup method",
          "params": [
            {
              "name": "stateObj",
              "description": "State to be displayed",
              "type": "Object"
            }
          ],
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
              "description": "Request source, can be \"user\", \"init\" or \"history\"",
              "type": "String"
            },
            {
              "name": "cb",
              "description": "Callback",
              "type": "Function",
              "optional": true
            }
          ]
        }
      }
    },
    "lib/drawer": {
      "name": "lib/drawer",
      "type": "class",
      "super": "html5/lib.wrap",
      "caption": "Drawer",
      "readme": "Class handling displaying of drawer.\n\nIt is placed right in the `<body>` and contains the drawer.",
      "file": "lib/drawer.js",
      "property": {
        "lastStateObj": {
          "name": "lastStateObj",
          "type": "property",
          "dtype": "Object",
          "description": "Last displayed view state object"
        },
        "defaultStateObj": {
          "name": "defaultStateObj",
          "type": "property",
          "dtype": "Object",
          "description": "State object displayed by default"
        }
      },
      "method": {
        "newHistory": {
          "name": "newHistory",
          "type": "method",
          "description": "Creates a new item to the browser's history",
          "params": [
            {
              "name": "stateObj",
              "description": "New stateObj, provide null to mark current stateObj as ignored (drawers, etc.)",
              "type": "Object"
            }
          ],
          "internal": true
        },
        "updateHistory": {
          "name": "updateHistory",
          "type": "method",
          "description": "Updates the last history item with the current state object",
          "internal": true
        },
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
              "description": "Handler for tap event",
              "type": "Function"
            }
          ]
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
    "lib": {
      "name": "lib",
      "type": "singleton",
      "super": "EventEmitter",
      "caption": "OSE frontend core",
      "readme": "Core singleton of html5 plugin.",
      "file": "lib/index.js"
    },
    "lib/input": {
      "name": "lib/input",
      "type": "class",
      "caption": "HTML events handler",
      "readme": "This class handles events on the HTML page",
      "file": "lib/input.js",
      "aliases": "eventHandling",
      "method": {
        "constructor": {
          "name": "constructor",
          "type": "method",
          "description": "Class constructor"
        }
      }
    },
    "lib/wrap": {
      "name": "lib/wrap",
      "type": "class",
      "caption": "HTML Element wrapper",
      "readme": "This class provides helper functions for DOM manipulation.",
      "file": "lib/wrap.js",
      "aliases": "elementWrapper elementWrapperClass",
      "method": {
        "constructor": {
          "name": "constructor",
          "type": "method",
          "description": "HTML Element wrapper constructor.",
          "params": [
            {
              "name": "tag",
              "description": "Tag or element to be wrapped or created",
              "type": "String|Object"
            },
            {
              "name": "attrs",
              "description": "Attributes of element, supplied string is used as element class",
              "type": "String|Object",
              "optional": true
            },
            {
              "name": "params",
              "description": "Parameters of element wrapper, string is used as `element.textContent`",
              "type": "String|Object",
              "optional": true
            }
          ]
        },
        "hook": {
          "name": "hook",
          "type": "method",
          "description": "Hook a HTML element to its wrapper by setting the `ose` property of\nthe element."
        },
        "unhook": {
          "name": "unhook",
          "type": "method",
          "description": "Remove hook between an element and its wrapper by removing the\n`ose` property of the element."
        },
        "new": {
          "name": "new",
          "type": "method",
          "description": "Create a new element"
        },
        "parentBox": {
          "name": "parentBox",
          "type": "method",
          "description": "Return first [view box] found in parent tree"
        },
        "parent": {
          "name": "parent",
          "type": "method",
          "description": "Return parent element wrapper"
        },
        "append2": {
          "name": "append2",
          "type": "method",
          "description": "Append child element or elements",
          "params": [
            {
              "name": "val",
              "description": "Stuff to be appended",
              "type": "String|Object|Array"
            }
          ]
        },
        "tree": {
          "name": "tree",
          "type": "method",
          "description": "Create new element and append it to the current element."
        },
        "view2": {
          "name": "view2",
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
              "name": "demand",
              "description": "State object",
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
        "find": {
          "name": "find",
          "type": "method",
          "description": "Find first element within the current element using the selector\n`sel`.",
          "params": [
            {
              "name": "sel",
              "description": "",
              "type": "Object|String"
            }
          ]
        },
        "findEach": {
          "name": "findEach",
          "type": "method",
          "description": "Find all elements corresponding to a selector and calls a callback\nfor each one of them.",
          "params": [
            {
              "name": "sel",
              "description": "CSS selector",
              "type": "String"
            },
            {
              "name": "cb",
              "description": "Callback",
              "type": "Function"
            }
          ]
        },
        "eachChild": {
          "name": "eachChild",
          "type": "method",
          "description": "Call `cb` for each child element",
          "params": [
            {
              "name": "cb",
              "description": "Callback",
              "type": "Function"
            }
          ]
        },
        "params": {
          "name": "params",
          "type": "method",
          "description": "Set up wrapper parameters",
          "params": [
            {
              "name": "val",
              "description": "Parameters to be set",
              "type": "*"
            }
          ]
        },
        "attr": {
          "name": "attr",
          "type": "method",
          "description": "Set or get a single element attribute",
          "params": [
            {
              "name": "name",
              "description": "Attribute name",
              "type": "String"
            },
            {
              "name": "val",
              "description": "Value to be set",
              "type": "String",
              "optional": true
            }
          ]
        },
        "attrs": {
          "name": "attrs",
          "type": "method",
          "description": "Set multiple element attributes",
          "params": [
            {
              "name": "val",
              "description": "Key/value pairs of attributes to be set",
              "type": "Object|String"
            }
          ]
        },
        "style": {
          "name": "style",
          "type": "method",
          "description": "Set or get single CSS style for an element",
          "params": [
            {
              "name": "name",
              "description": "Name of style property",
              "type": "String"
            },
            {
              "name": "val",
              "description": "Value to be set",
              "type": "String|Number",
              "optional": true
            }
          ]
        },
        "styles": {
          "name": "styles",
          "type": "method",
          "description": "Set multiple CSS styles for an element",
          "params": [
            {
              "name": "vals",
              "description": "Key/value pairs of styles and their values",
              "type": "Object"
            }
          ]
        },
        "empty": {
          "name": "empty",
          "type": "method",
          "description": "Empty an element's `innerHTML`"
        },
        "val": {
          "name": "val",
          "type": "method",
          "description": "Set or get value element value",
          "params": [
            {
              "name": "val",
              "description": "Value to be set",
              "type": "*",
              "optional": true
            }
          ]
        },
        "html": {
          "name": "html",
          "type": "method",
          "description": "Set or get an element's `innerHTML`",
          "params": [
            {
              "name": "val",
              "description": "Inner HTML",
              "type": "String",
              "optional": true
            }
          ]
        },
        "text": {
          "name": "text",
          "type": "method",
          "description": "Set or get the text content of an element",
          "params": [
            {
              "name": "val",
              "description": "Text content",
              "type": "String",
              "optional": true
            }
          ]
        },
        "remove": {
          "name": "remove",
          "type": "method",
          "description": "Remove element from its parent"
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
          "description": "Check if an element has the givne class",
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
        "listen": {
          "name": "listen",
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
            },
            {
              "name": "useCapture",
              "description": "useCapture",
              "type": "Boolean"
            }
          ]
        },
        "removeListener": {
          "name": "removeListener",
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
            },
            {
              "name": "useCapture",
              "description": "useCapture",
              "type": "Boolean"
            }
          ]
        },
        "on": {
          "name": "on",
          "type": "method",
          "description": "Set up event handler on wrapper",
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
          "description": "Remove event handler from wrapper",
          "params": [
            {
              "name": "name",
              "description": "Event name",
              "type": "String"
            },
            {
              "name": "cb",
              "description": "Callback to be removed",
              "type": "Function",
              "optional": true
            }
          ]
        },
        "trigger": {
          "name": "trigger",
          "type": "method",
          "description": "Trigger event handlers on the wrapper",
          "params": [
            {
              "name": "name",
              "description": "Event name",
              "type": "String"
            },
            {
              "name": "ev",
              "description": "Event object",
              "type": "Object",
              "optional": true
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
          "description": "Get or set element left CSS property",
          "params": [
            {
              "name": "val",
              "description": "Value to be set",
              "optional": true
            }
          ]
        },
        "top": {
          "name": "top",
          "type": "method",
          "description": "Get or set element top CSS property",
          "params": [
            {
              "name": "val",
              "description": "Value to be set",
              "optional": true
            }
          ]
        },
        "width": {
          "name": "width",
          "type": "method",
          "description": "Get or set element width css property",
          "params": [
            {
              "name": "val",
              "description": "Value to be set",
              "optional": true
            }
          ]
        },
        "height": {
          "name": "height",
          "type": "method",
          "description": "Get or set element height CSS property",
          "params": [
            {
              "name": "val",
              "description": "Value to be set",
              "optional": true
            }
          ]
        },
        "offset": {
          "name": "offset",
          "type": "method",
          "description": "Get element offset"
        },
        "setField": {
          "name": "setField",
          "type": "method",
          "description": "Set up a connection between a data field and the current element wrapper",
          "params": [
            {
              "name": "wrap",
              "description": "Field wrapper object",
              "type": "Object"
            }
          ]
        },
        "section": {
          "name": "section",
          "type": "method",
          "description": "Create and append new `<section>` element",
          "params": [
            {
              "name": "attrs",
              "description": "Attributes of element, supplied string is used as element class",
              "type": "String|Object",
              "optional": true
            },
            {
              "name": "params",
              "description": "Parameters of element wrapper, string is used as `element.textContent`",
              "type": "String|Object",
              "optional": true
            }
          ]
        },
        "ul": {
          "name": "ul",
          "type": "method",
          "description": "Create and append new `<ul>` element",
          "params": [
            {
              "name": "attrs",
              "description": "Attributes of element, supplied string is used as element class",
              "type": "String|Object",
              "optional": true
            },
            {
              "name": "params",
              "description": "Parameters of element wrapper, string is used as `element.textContent`",
              "type": "String|Object",
              "optional": true
            }
          ]
        },
        "li": {
          "name": "li",
          "type": "method",
          "description": "Create and append new `<li>` element",
          "params": [
            {
              "name": "attrs",
              "description": "Attributes of element, supplied string is used as element class",
              "type": "String|Object",
              "optional": true
            },
            {
              "name": "params",
              "description": "Parameters of element wrapper, string is used as `element.textContent`",
              "type": "String|Object",
              "optional": true
            }
          ]
        },
        "h1": {
          "name": "h1",
          "type": "method",
          "description": "Create and append new `<h1>` element",
          "params": [
            {
              "name": "text",
              "description": "Text to be set",
              "type": "String",
              "optional": true
            },
            {
              "name": "attrs",
              "description": "Attributes of element, supplied string is used as element class",
              "type": "String|Object",
              "optional": true
            },
            {
              "name": "params",
              "description": "Parameters of element wrapper, string is used as `element.textContent`",
              "type": "String|Object",
              "optional": true
            }
          ]
        },
        "h2": {
          "name": "h2",
          "type": "method",
          "description": "Create and append new `<h2>` element",
          "params": [
            {
              "name": "text",
              "description": "Text to be set",
              "type": "String",
              "optional": true
            },
            {
              "name": "attrs",
              "description": "Attributes of element, supplied string is used as element class",
              "type": "String|Object",
              "optional": true
            },
            {
              "name": "params",
              "description": "Parameters of element wrapper, string is used as `element.textContent`",
              "type": "String|Object",
              "optional": true
            }
          ]
        },
        "h3": {
          "name": "h3",
          "type": "method",
          "description": "Create and append new `<h3>` element",
          "params": [
            {
              "name": "text",
              "description": "Text to be set",
              "type": "String",
              "optional": true
            },
            {
              "name": "attrs",
              "description": "Attributes of element, supplied string is used as element class",
              "type": "String|Object",
              "optional": true
            },
            {
              "name": "params",
              "description": "Parameters of element wrapper, string is used as `element.textContent`",
              "type": "String|Object",
              "optional": true
            }
          ]
        },
        "p": {
          "name": "p",
          "type": "method",
          "description": "Create and append new `p` element",
          "params": [
            {
              "name": "text",
              "description": "Text to be set",
              "type": "String",
              "optional": true
            },
            {
              "name": "attrs",
              "description": "Attributes of element, supplied string is used as element class",
              "type": "String|Object",
              "optional": true
            },
            {
              "name": "params",
              "description": "Parameters of element wrapper, string is used as `element.textContent`",
              "type": "String|Object",
              "optional": true
            }
          ]
        },
        "span": {
          "name": "span",
          "type": "method",
          "description": "Create and append new `span` element",
          "params": [
            {
              "name": "text",
              "description": "Text to be set",
              "type": "String",
              "optional": true
            },
            {
              "name": "attrs",
              "description": "Attributes of element, supplied string is used as element class",
              "type": "String|Object",
              "optional": true
            },
            {
              "name": "params",
              "description": "Parameters of element wrapper, string is used as `element.textContent`",
              "type": "String|Object",
              "optional": true
            }
          ]
        },
        "div": {
          "name": "div",
          "type": "method",
          "description": "Create and append new `div` element",
          "params": [
            {
              "name": "text",
              "description": "Text to be set",
              "type": "String",
              "optional": true
            },
            {
              "name": "attrs",
              "description": "Attributes of element, supplied string is used as element class",
              "type": "String|Object",
              "optional": true
            },
            {
              "name": "params",
              "description": "Parameters of element wrapper, string is used as `element.textContent`",
              "type": "String|Object",
              "optional": true
            }
          ]
        },
        "register": {
          "name": "register",
          "type": "method",
          "description": "Register new control element",
          "params": [
            {
              "name": "name",
              "description": "Name of control element",
              "type": "String"
            },
            {
              "name": "control",
              "description": "Control element definition",
              "type": "Object"
            }
          ]
        }
      }
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "html5 web components content",
      "readme": "exports singleton defines which files to provide to browsers.",
      "file": "content.js"
    }
  }
};