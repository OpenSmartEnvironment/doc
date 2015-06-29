Packages["lirc"] = {
  "name": "lirc",
  "npmname": "ose-lirc",
  "caption": "LIRC",
  "readme": "This package allows to use LIRC in OSE. It is thus possible to\nmanage your environment using IR remote controllers.\n\nIt forwards received commands to the [control.remote] component.",
  "line": 10,
  "description": "## Command names pre-processing\n\nReceived LIRC command names are pre-processed by removing\n\"KEY_\" and \"BTN_\" and converting the rest of the command names to\nlowercase.\n\nIt also suppresses double presses of the same button within 150 ms.\n\nSee [LIRC example].",
  "scope": "control",
  "modules": {
    "lib/lirc": {
      "name": "lib/lirc",
      "type": "kind",
      "caption": "LIRC kind",
      "readme": "Entry kind for connecting to and communicating with the LIRC\ndaemon.\n\nReceives and processes LIRC commands from the LIRC Unix socket\n(/var/run/lirc/lircd). Emits the `\"receive\"` event, which can then\nbe, for example, handled by the [control.remote] component.",
      "file": "lib/lirc/index.js",
      "kind": "lirc",
      "event": {
        "receive": {
          "name": "receive",
          "type": "event",
          "description": "Fired when the lirc module receives a command",
          "params": [
            {
              "name": "val",
              "description": "",
              "type": "Object",
              "props": [
                {
                  "name": "count",
                  "description": "Incremented number reached during long press",
                  "type": "Number"
                },
                {
                  "name": "remote",
                  "description": "Remote controller name",
                  "type": "String"
                },
                {
                  "name": "lirc",
                  "description": "Original LIRC command name",
                  "type": "String"
                },
                {
                  "name": "key",
                  "description": "Command name after pre-processing",
                  "type": "String"
                }
              ]
            }
          ]
        }
      }
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "LIRC core",
      "readme": "Core singleton of ose-lirc npm package. Register [entry kinds]\ndefined by this package to the `\"control\"` [scope].",
      "file": "lib/index.js"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "LIRC content",
      "readme": "Provides files of [ose-lirc] package to the browser.",
      "file": "content.js"
    }
  }
};