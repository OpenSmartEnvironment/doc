Packages["lirc"] = {
  "name": "lirc",
  "npmname": "ose-lirc",
  "caption": "LIRC",
  "readme": "This package allows to use LIRC in OSE. It is thus possible to\nmanage your environment using IR remote controllers.\n\nIt forwards received commands to the [control.remote] component.",
  "file": "content.js",
  "line": 12,
  "description": "## Command names pre-processing\n\nReceived LIRC command names are pre-processed by removing\n\"KEY_\" and \"BTN_\" and converting the rest of the command names to\nlowercase.\n\nIt also suppresses double presses of the same button within 150 ms.",
  "modules": {
    "lib/lirc": {
      "name": "lib/lirc",
      "type": "singleton",
      "caption": "LIRC kind",
      "readme": "Entry kind for connecting to and communicating with the LIRC\ndaemon.\n\nReceives and processes LIRC commands from the LIRC Unix socket\n(/var/run/lirc/lircd). Emits the \"receive\" event, which can then\nbe, for example, handled by the [control.remote] component.",
      "file": "lib/lirc/index.js",
      "event": {
        "": {
          "name": "",
          "type": "event",
          "description": "Fired when the lirc module receives a command",
          "params": [
            {
              "name": "UNKNOWN",
              "description": "{\n     count: {Number} Incremented number reached during long press\n     remote: {String} Remote controller name\n     lirc: {String} Original LIRC command name\n     key: {String} Command name after pre-processing\n   }",
              "type": "Object"
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