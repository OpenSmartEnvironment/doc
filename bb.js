Packages["bb"] = {
  "name": "bb",
  "npmname": "ose-bb",
  "caption": "HTML5 frontend",
  "readme": "OSE package providing an HTML5 user interface built using [Firefox\nOS Building Blocks](http://buildingfirefoxos.com/) and\n[jQuery](http://www.jquery.com).\n\nEach browser page (tab) displaying the OSE frontend is an [OSE\ninstance]. As part of the base [OSE plugin] configuration, a\n[peer], representing the backend OSE instance, is created and\nconnected to.\n\nThe connection is realized via a WebSocket in a standard OSE\n[peer-to-peer] way. All information needed for displaying requested\ncontent is exchanged through this WebSocket channel. After a\nsuccessful connection is established, content is displayed using\ndynamic injection into the `<body>`.",
  "file": "content.js",
  "line": 11,
  "aliases": "oseUi HTML5frontend",
  "description": "## Initialization\n\nWhen the browser sends an HTML request to a backend (Node.js) OSE\ninstance, this instance responds by generating and providing\nindex.html. The `<head>` of the index.html contains `<script>` and\n`<style>` tags. Most of these scripts are shared between Node.js\nand the browser environments. The `<body>` contains a single\n`<script>` that loads the application.",
  "features": "- HTML5 user interface optimized for phones and tablets\n- Own widgets based on [Firefox OS Building\n  Blocks](http://buildingfirefoxos.com/)\n- Touchscreen gesture support using\n  [Hammer.js](http://eightmedia.github.io/hammer.js)",
  "comps": {
    "box": {
      "name": "box",
      "caption": "Boxes",
      "readme": "Boxes are parts of the html body corresponding to basic layout\ncomponents of the web application. `<body>` contains two boxes:\n* `left`: sidebar on the left\n* `content`: main box of the application\n\nThe `content` box displays a \"pagelet\" specified by the state object.",
      "file": "lib/box/left.js",
      "line": 11,
      "modules": {
        "lib/box/content": {
          "name": "lib/box/content",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "Content box",
          "readme": "Class handling displaying of the main content box on the page.\n\nIt is placed right in the `<body>` and displays the header and the\nmain content of the application. It also contains widget such as\nthe search box.",
          "file": "lib/box/content.js",
          "method": {
            "init": {
              "name": "init",
              "type": "method",
              "description": "Box initialization"
            },
            "display": {
              "name": "display",
              "type": "method",
              "description": "Displays content based on `stateObj`",
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
            "pagelet": {
              "name": "pagelet",
              "type": "method",
              "description": "Creates pagelet based on `stateObj`",
              "params": [
                {
                  "name": "stateObj",
                  "description": "Object defining what is to be displayed",
                  "type": "Object"
                }
              ]
            },
            "setActive": {
              "name": "setActive",
              "type": "method",
              "description": "Activates `pagelet`",
              "params": [
                {
                  "name": "pagelet",
                  "description": "Pagelet instance",
                  "type": "Object"
                }
              ]
            }
          },
          "undefined": {
            "undefined": {
              "description": "Creates HTML representation of content box"
            }
          }
        },
        "lib/box/left": {
          "name": "lib/box/left",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "Left box",
          "readme": "Class handling displaying of left side box.\n\nIt is placed right in the `<body>` and contains the slidable left\nsidebar.",
          "file": "lib/box/left.js",
          "method": {
            "init": {
              "name": "init",
              "type": "method",
              "description": "Box initialization"
            },
            "addLink": {
              "name": "addLink",
              "type": "method",
              "description": "Appends menu item to left box",
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
              "description": "Tells whether the box is visible."
            },
            "show": {
              "name": "show",
              "type": "method",
              "description": "Shows box"
            },
            "hide": {
              "name": "hide",
              "type": "method",
              "description": "Hides box",
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
              "description": "Show or hide the box"
            },
            "bindToggle": {
              "name": "bindToggle",
              "type": "method",
              "description": "Binds \"this\" to the toggle method"
            },
            "registerEdgeEvents": {
              "name": "registerEdgeEvents",
              "type": "method",
              "description": "Registers handlers for swipes and slides pertaining to the box."
            }
          },
          "undefined": {
            "undefined": {
              "description": "Creates HTML representation of left box"
            }
          }
        }
      }
    },
    "dialog": {
      "name": "dialog",
      "caption": "Dialogs",
      "readme": "Dialogs are fullscreen modal controls.",
      "file": "lib/dialog/valueSelector.js",
      "line": 11,
      "modules": {
        "lib/dialog/action": {
          "name": "lib/dialog/action",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "Action dialog",
          "readme": "Diplays a dialog with an action menu",
          "file": "lib/dialog/action.js"
        },
        "lib/dialog/confirm": {
          "name": "lib/dialog/confirm",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "Confirmation dialog",
          "readme": "Diplays a confirmation dialog with message and two buttons.",
          "file": "lib/dialog/confirm.js"
        },
        "lib/dialog/info": {
          "name": "lib/dialog/info",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "Information dialog",
          "readme": "Diplays a dialog with a message",
          "file": "lib/dialog/info.js"
        },
        "lib/dialog/valueSelector": {
          "name": "lib/dialog/valueSelector",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "Value selector dialog",
          "readme": "Diplays a dialog offering options to select from.",
          "file": "lib/dialog/valueSelector.js"
        }
      }
    },
    "pagelet": {
      "name": "pagelet",
      "caption": "Pagelets",
      "readme": "A pagelet is a part of a page.\n\nThere are several types of pagelets (see `lib/pagelet`\ndirectory).\nThe dashboard pagelet is a starting point for the user.\nTwo other basic pagelets are the entry pagelet (displays one\nentry) and the list pagelet (displays a list of entries).\n\nEach [entry kind] can define own UI layout and behaviour for any\npagelet type displaying entry in an individual file.\n\nPagelets can create and contain various widgets (see `lib/widget`\ndirectory) and other pagelets.",
      "file": "lib/pagelet/listItem.js",
      "line": 12,
      "modules": {
        "lib/pagelet/dashboard": {
          "name": "lib/pagelet/dashboard",
          "type": "class",
          "super": "bb/lib.pagelet",
          "caption": "Dashboard pagelet",
          "readme": "Pagelet for creating dashboard content.",
          "file": "lib/pagelet/dashboard.js",
          "method": {
            "loadData": {
              "name": "loadData",
              "type": "method",
              "description": "Appends a newly created list widget to the main pagelet element. It\nalso calls the \"Ose.ui.dashboard()\" method. \"Ose.ui.dashboard()\"\ngoverns what is diaplayed on the dashboard."
            },
            "verifyStateObj": {
              "name": "verifyStateObj",
              "type": "method",
              "description": "Verifies that data correspond to the displayed pagelet.",
              "params": [
                {
                  "name": "data",
                  "description": "State object to be compared",
                  "type": "Object"
                }
              ]
            }
          },
          "undefined": {
            "undefined": {
              "description": "Adds an item to the dashboardk.",
              "params": [
                {
                  "name": "caption",
                  "description": "Text to be displayed",
                  "type": "String"
                },
                {
                  "name": "cb",
                  "description": "Function to be called when the user taps on this item.",
                  "type": "Function"
                }
              ]
            }
          }
        },
        "lib/pagelet/detail": {
          "name": "lib/pagelet/detail",
          "type": "class",
          "super": "bb/lib.pagelet",
          "caption": "Detail pagelet",
          "readme": "Pagelet for displaying entry detail",
          "file": "lib/pagelet/detail.js",
          "property": {
            "layout": {
              "name": "layout",
              "type": "property",
              "dtype": "String",
              "description": "The layout that extends this pagelet"
            }
          },
          "method": {
            "displayData": {
              "name": "displayData",
              "type": "method",
              "description": "Displays entry data based on \"this.profile\". This method gets\ncalled once after entry data are loaded. It can be overridden in\nthe layout file for custom data display."
            },
            "updateData": {
              "name": "updateData",
              "type": "method",
              "description": "Updates the information displayed with updated entry data.",
              "params": [
                {
                  "name": "data",
                  "description": "Updated entry data",
                  "type": "Object"
                }
              ]
            }
          },
          "undefined": {
            "undefined": {
              "params": [
                {
                  "name": "this",
                  "description": "Pagelet",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/pagelet/entry": {
          "name": "lib/pagelet/entry",
          "type": "class",
          "caption": "Entry pagelet socket",
          "readme": "Extension for entry pagelet classes.",
          "file": "lib/pagelet/entry.js"
        },
        "lib/pagelet/gesture": {
          "name": "lib/pagelet/gesture",
          "type": "class",
          "super": "bb/lib.pagelet",
          "caption": "Gesture pagelet",
          "readme": "Pagelet for displaying an entry with the gesture interface.\n\nThis pagelet creates a canvas on which, for example, gesture traces\ncan be drawn. A transparent `<div>` placed over this canvas is a\nHammer.js element registering touch gestures.",
          "file": "lib/pagelet/gesture.js",
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
                  "name": "data",
                  "description": "",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/pagelet": {
          "name": "lib/pagelet",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "Pagelet class",
          "readme": "Not every pagelet is necessarily a descendant of this class. Some\nare direct descendants of the widget class.",
          "file": "lib/pagelet/index.js",
          "event": {
            "show": {
              "name": "show",
              "type": "event",
              "description": "Fired when pagelet is shown."
            },
            "hide": {
              "name": "hide",
              "type": "event",
              "description": "Fired when pagelet is hidden."
            }
          },
          "method": {
            "loadData": {
              "name": "loadData",
              "type": "method",
              "description": "Each Pagelet descendant should define a `loadData` method. This\nmethod should be called by the code creating the pagelet and should\nensure that data displayed by the pagelet are loaded."
            },
            "onSearch": {
              "name": "onSearch",
              "type": "method",
              "description": "Pagelets can define an `onSearch` method, which gets called when\nthe user performs a search. The searchbox is not displayed if there\nis no `onSearch` method on the active pagelet.",
              "params": [
                {
                  "name": "value",
                  "description": "Search string",
                  "type": "String"
                }
              ]
            },
            "verifyStateObj": {
              "name": "verifyStateObj",
              "type": "method",
              "description": "Each Pagelet descendant should define a \"verifyStateObj\"\nmethod. This method compares the supplied state object with the\ncurrently displayed one.",
              "params": [
                {
                  "name": "data",
                  "description": "State object to be compared",
                  "type": "Object"
                }
              ]
            },
            "html": {
              "name": "html",
              "type": "method",
              "description": "Each Pagelet descendant can override the `html` method. This method\nreturns the main pagelet element. It should be called by the code\ncreating the pagelet, and this code should also append the element\nto the right place in the `<body>`."
            },
            "afterDisplay": {
              "name": "afterDisplay",
              "type": "method",
              "description": "Is called after a pagelet is displayed.\n\nThe function creating a pagelet receives a callback as one of its\nparameters. This callback is assigned to\n\"this.doAfterDisplay\". This method ensures that\n\"this.doAfterDisplay\" is called only once."
            }
          },
          "property": {
            "layout": {
              "name": "layout",
              "type": "property",
              "dtype": "String",
              "description": "Defines the layout which extends this pagelet. Layouts are defined\nin modules located in the \"bb\" subdirectory of the entry kind\ndirectory. ."
            }
          }
        },
        "lib/pagelet/list": {
          "name": "lib/pagelet/list",
          "type": "class",
          "super": "bb/lib.pagelet",
          "caption": "List of entries pagelet",
          "readme": "Pagelet for displaying lists of entries",
          "file": "lib/pagelet/list.js",
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
            "printListEntry": {
              "name": "printListEntry",
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
            "printHeader": {
              "name": "printHeader",
              "type": "method",
              "description": "Prints list header"
            }
          }
        },
        "lib/pagelet/listItem": {
          "name": "lib/pagelet/listItem",
          "type": "class",
          "super": "bb/lib.pagelet",
          "caption": "Entry list item pagelet",
          "readme": "Pagelet for displaying a list item",
          "file": "lib/pagelet/listItem.js",
          "method": {
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
    "widget": {
      "name": "widget",
      "caption": "Widgets",
      "readme": "A Widget is an easily reusable control visually represented by\nHTML5 elements. Their behaviour is controlled by instances of\ndescendants of the [Widget class].",
      "file": "lib/widget/toolbar.js",
      "line": 10,
      "aliases": "widget",
      "modules": {
        "lib/widget/button": {
          "name": "lib/widget/button",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "Button widget",
          "readme": "Widget for displaying and controlling HTML buttons.",
          "file": "lib/widget/button.js"
        },
        "lib/widget/checkbox": {
          "name": "lib/widget/checkbox",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "Checkbox widget",
          "readme": "Widget for displaying and controlling HTML checkboxes.",
          "file": "lib/widget/checkbox.js"
        },
        "lib/widget": {
          "name": "lib/widget",
          "type": "class",
          "caption": "Widget class",
          "readme": "Ancestor for individual widgets and pagelets.",
          "file": "lib/widget/index.js",
          "method": {
            "html": {
              "name": "html",
              "type": "method",
              "description": "Creates a jQuery object representing widget."
            },
            "$": {
              "name": "$",
              "type": "method",
              "description": "Finds elements within current widget using a \"selector\".  It\nconcatenates \"this.id\" with the selector and uses jQuery \"$()\". If\nthe \"selector\" is empty, it returns the main jQuery element.",
              "params": [
                {
                  "name": "selector",
                  "description": "",
                  "type": "String"
                }
              ]
            },
            "visible": {
              "name": "visible",
              "type": "method",
              "description": "TODO Rename to isVisible?"
            },
            "show": {
              "name": "show",
              "type": "method",
              "description": "Shows widget."
            },
            "hide": {
              "name": "hide",
              "type": "method",
              "description": "Hides widget"
            },
            "remove": {
              "name": "remove",
              "type": "method",
              "description": "Removes widget and all its listeners"
            },
            "isRemoved": {
              "name": "isRemoved",
              "type": "method",
              "description": "Test whether element has been removed from the <body>"
            },
            "newPagelet": {
              "name": "newPagelet",
              "type": "method",
              "description": "Creates new pagelet",
              "params": [
                {
                  "name": "stateObj",
                  "description": "State object",
                  "type": "Object"
                }
              ]
            },
            "newWidget": {
              "name": "newWidget",
              "type": "method",
              "description": "Creates new widget",
              "params": [
                {
                  "name": "type",
                  "description": "Widget type",
                  "type": "String"
                },
                {
                  "name": "id",
                  "description": "Widget ID",
                  "type": "String"
                },
                {
                  "name": "prop",
                  "description": "Properties",
                  "type": "Object"
                }
              ]
            },
            "widget": {
              "name": "widget",
              "type": "method",
              "description": "Updates a widget or returns widget value",
              "params": [
                {
                  "name": "id",
                  "description": "Widget ID",
                  "type": "String"
                },
                {
                  "name": "prop",
                  "description": "Properties",
                  "type": "Object"
                },
                {
                  "name": "origin",
                  "description": "Origin of the call",
                  "type": "String"
                }
              ]
            }
          },
          "property": {
            "id": {
              "name": "id",
              "type": "property",
              "dtype": "String",
              "description": "ID of widget"
            }
          }
        },
        "lib/widget/list": {
          "name": "lib/widget/list",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "List widget",
          "readme": "Widget for displaying simple HTML lists.",
          "file": "lib/widget/list.js"
        },
        "lib/widget/listItem": {
          "name": "lib/widget/listItem",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "List item widget",
          "readme": "Widget for displaying items in HTML lists.",
          "file": "lib/widget/listItem.js"
        },
        "lib/widget/search": {
          "name": "lib/widget/search",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "Search widget",
          "readme": "Search input field widget.\n\nIt has two states: One displays a search button, and the other\ndisplays a search form.\n\nIf available, it uses Google's speech API.",
          "file": "lib/widget/search.js",
          "method": {
            "init": {
              "name": "init",
              "type": "method",
              "description": "Widget initialization"
            },
            "button": {
              "name": "button",
              "type": "method",
              "description": "Creates search button"
            },
            "form": {
              "name": "form",
              "type": "method",
              "description": "Creates search form"
            },
            "show": {
              "name": "show",
              "type": "method",
              "description": "Shows search form"
            },
            "hide": {
              "name": "hide",
              "type": "method",
              "description": "Hides search form",
              "params": [
                {
                  "name": "noBack",
                  "description": "If true, do not go back in history.",
                  "type": "Boolean"
                }
              ]
            },
            "visible": {
              "name": "visible",
              "type": "method",
              "description": "TODO: Rename to isVisible\nCheck if the search widget is visible."
            }
          }
        },
        "lib/widget/slider": {
          "name": "lib/widget/slider",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "Slider widget",
          "readme": "Widget for displaying and controlling HTML sliders.",
          "file": "lib/widget/slider.js"
        },
        "lib/widget/slideswitch": {
          "name": "lib/widget/slideswitch",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "Slideswitch widget",
          "readme": "Widget for displaying and controlling HTML slideswitches.",
          "file": "lib/widget/slideswitch.js"
        },
        "lib/widget/toolbar": {
          "name": "lib/widget/toolbar",
          "type": "class",
          "super": "bb/lib.widget",
          "caption": "Toolbar widget",
          "readme": "Widget for displaying and controlling button toolbars.",
          "file": "lib/widget/toolbar.js"
        }
      }
    },
    "stateObj": {
      "name": "stateObj",
      "caption": "State objects",
      "readme": "The state object defines what is displayed by the application. It\ncan be saved in the browser's history. Boxes and pagelets receive\nthe state object in as a parameter of their `display()` methods.",
      "file": "lib/stateObj.js",
      "line": 1
    }
  },
  "modules": {
    "lib": {
      "name": "lib",
      "type": "singleton",
      "super": "EventEmitter",
      "caption": "OSE Building Blocks core",
      "readme": "Core singleton of bb plugin.\n\nThis singleton is available through the `Ose.ui` property.",
      "file": "lib/index.js",
      "event": {
        "initialized": {
          "name": "initialized",
          "type": "event",
          "description": "Fired when UI is initialized"
        }
      },
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
          "description": "Pagelet displayed by default"
        }
      },
      "method": {
        "config": {
          "name": "config",
          "type": "method",
          "description": "OSE plugin configuration method",
          "params": [
            {
              "name": "name",
              "description": "Configuration name",
              "type": "Object"
            },
            {
              "name": "data",
              "description": "Configuration data",
              "type": "Object"
            }
          ]
        },
        "run": {
          "name": "run",
          "type": "method",
          "description": "Internal OSE UI startup method\n\nEmits the \"initialized\" event."
        },
        "newHistory": {
          "name": "newHistory",
          "type": "method",
          "description": "Creates a new empty state item to the browser's history"
        },
        "updateHistory": {
          "name": "updateHistory",
          "type": "method",
          "description": "Updates the last history item with the current state object"
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
          "description": "Creates new event handler that calls the \"Ose.ui.display(stateObj)\"",
          "params": [
            {
              "name": "stateObj",
              "description": "State object to be displayed",
              "type": "Object"
            }
          ]
        },
        "scrollToTop": {
          "name": "scrollToTop",
          "type": "method",
          "description": "Scroll element to the top of the screen.",
          "params": [
            {
              "name": "el",
              "description": "jQuery element to be scrolled to the top",
              "type": "Object"
            }
          ]
        },
        "handleHover": {
          "name": "handleHover",
          "type": "method",
          "description": "Handle hovering",
          "params": [
            {
              "name": "el",
              "description": "jQuery element",
              "type": "Object"
            }
          ]
        },
        "newDialog": {
          "name": "newDialog",
          "type": "method",
          "description": "Creates and displays a new dialog.",
          "params": [
            {
              "name": "type",
              "description": "Dialog type",
              "type": "String"
            },
            {
              "name": "prop",
              "description": "Properties object",
              "type": "Object"
            }
          ]
        },
        "closeDialog": {
          "name": "closeDialog",
          "type": "method",
          "dtype": "Object",
          "description": "Closes a dialog"
        },
        "getStateObj": {
          "name": "getStateObj",
          "type": "method",
          "description": "Gets state object"
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
      },
      "undefined": {
        "undefined": {}
      }
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "Building Blocks content",
      "readme": "This singleton defines which files to provide to browsers.",
      "file": "content.js"
    }
  }
};