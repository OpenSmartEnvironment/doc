Packages["xorg"] = {
  "name": "xorg",
  "npmname": "ose-xorg",
  "caption": "X.Org",
  "readme": "This package allows to control the mouse and pointer in X.Org\n\nSee [Media player example].",
  "line": 13,
  "modules": {
    "lib/xorg": {
      "name": "lib/xorg",
      "type": "kind",
      "super": "ose/lib.kind",
      "caption": "X.Org server kind",
      "readme": "[Entry kind] for X.Org server\n\nUses xdotool to remotely control the keyboard and pointer",
      "file": "lib/xorg/index.js",
      "kind": "xorg",
      "handler": {
        "client": {
          "name": "client",
          "type": "handler",
          "description": "Create an [X.Org response socket]"
        }
      }
    },
    "lib/xorg/resp": {
      "name": "lib/xorg/resp",
      "type": "class",
      "caption": "X.Org response socket",
      "readme": "Socket created as a response to a `client` request",
      "file": "lib/xorg/resp.js",
      "method": {
        "constructor": {
          "name": "constructor",
          "type": "method",
          "description": "Class constructor",
          "params": [
            {
              "name": "entry",
              "description": "Entry of xorg kind",
              "type": "Object"
            }
          ]
        }
      },
      "handler": {
        "move": {
          "name": "move",
          "type": "handler",
          "description": "Move pointer by provided delta values",
          "params": [
            {
              "name": "req",
              "description": "Client request",
              "type": "Object",
              "props": [
                {
                  "name": "x",
                  "description": "X delta",
                  "type": "Number"
                },
                {
                  "name": "y",
                  "description": "Y delta",
                  "type": "Number"
                }
              ]
            },
            {
              "name": "socket",
              "description": "Response socket",
              "type": "Object"
            }
          ]
        },
        "button": {
          "name": "button",
          "type": "handler",
          "description": "Trigger button down or up",
          "params": [
            {
              "name": "req",
              "description": "Client request",
              "type": "Object",
              "props": [
                {
                  "name": "button",
                  "description": "Button to be operated",
                  "type": "String"
                },
                {
                  "name": "state",
                  "description": "`true` for down, `false` for up",
                  "type": "Boolean"
                }
              ]
            },
            {
              "name": "socket",
              "description": "Response socket",
              "type": "Object"
            }
          ]
        },
        "scroll": {
          "name": "scroll",
          "type": "handler",
          "description": "Scroll by provided delta values",
          "params": [
            {
              "name": "req",
              "description": "Client request",
              "type": "Object",
              "props": [
                {
                  "name": "x",
                  "description": "X delta",
                  "type": "Number"
                },
                {
                  "name": "y",
                  "description": "Y delta",
                  "type": "Number"
                }
              ]
            },
            {
              "name": "socket",
              "description": "Response socket",
              "type": "Object"
            }
          ]
        },
        "click": {
          "name": "click",
          "type": "handler",
          "description": "Trigger click",
          "params": [
            {
              "name": "req",
              "description": "Client request",
              "type": "Object",
              "props": [
                {
                  "name": "button",
                  "description": "Button to be clicked",
                  "type": "Number"
                }
              ]
            },
            {
              "name": "socket",
              "description": "Response socket",
              "type": "Object"
            }
          ]
        },
        "keypress": {
          "name": "keypress",
          "type": "handler",
          "description": "Trigger keypress",
          "params": [
            {
              "name": "req",
              "description": "Client request",
              "type": "Object",
              "props": [
                {
                  "name": "keycomb",
                  "description": "Object specifying combination of pressed modifiers",
                  "type": "Object"
                },
                {
                  "name": "value",
                  "description": "Code of key to be pressed",
                  "type": "Number"
                }
              ]
            },
            {
              "name": "socket",
              "description": "Response socket",
              "type": "Object"
            }
          ]
        },
        "keyup": {
          "name": "keyup",
          "type": "handler",
          "description": "Trigger keyup",
          "params": [
            {
              "name": "req",
              "description": "Client request",
              "type": "Object",
              "props": [
                {
                  "name": "value",
                  "description": "Code of key to be pressed",
                  "type": "Number"
                }
              ]
            },
            {
              "name": "socket",
              "description": "Response socket",
              "type": "Object"
            }
          ]
        },
        "keydown": {
          "name": "keydown",
          "type": "handler",
          "description": "Trigger keydown",
          "params": [
            {
              "name": "req",
              "description": "Client request",
              "type": "Object",
              "props": [
                {
                  "name": "value",
                  "description": "Code of key to be pressed",
                  "type": "Number"
                }
              ]
            },
            {
              "name": "socket",
              "description": "Response socket",
              "type": "Object"
            }
          ]
        }
      }
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "X.Org core",
      "readme": "Core singleton of ose-xorg npm package. Registers [entry kinds]\ndefined by this package to the `\"control\"` [schema].",
      "file": "lib/index.js"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "X.Org content",
      "readme": "Provides files of [ose-xorg] package to the browser.",
      "file": "content.js"
    }
  }
};