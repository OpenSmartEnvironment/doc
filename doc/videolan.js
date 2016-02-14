Packages["videolan"] = {
  "name": "videolan",
  "npmname": "ose-videolan",
  "caption": "VideoLAN",
  "readme": "This package contains [entry kinds] integrating VideoLAN software\ninto OSE.\n\nIt allows the [Media player] to use VLC as its playback\napplication and DVBlast as its DVB streamer.\n\nSee [Media player example].",
  "line": 13,
  "modules": {
    "lib/dvblast/boon": {
      "name": "lib/dvblast/boon",
      "type": "class",
      "caption": "DVB streaming boon response socket",
      "readme": "[Response socket] responsible for maintaining media stream",
      "file": "lib/dvblast/boon.js",
      "method": {
        "constructor": {
          "name": "constructor",
          "type": "method",
          "description": "Socket constructor",
          "params": [
            {
              "name": "entry",
              "description": "DVBlast entry",
              "type": "Object"
            },
            {
              "name": "req",
              "description": "Request",
              "type": "Object",
              "props": [
                {
                  "name": "channel",
                  "description": "Channel entry identification",
                  "type": "Object"
                },
                {
                  "name": "playback",
                  "description": "Playback entry identification",
                  "type": "Object"
                },
                {
                  "name": "mcast",
                  "description": "Multicast pool identification",
                  "type": "Object"
                },
                {
                  "name": "ucast",
                  "description": "Unicast destination ip address",
                  "type": "Object",
                  "props": [
                    {
                      "name": "ip",
                      "description": "Unicast destination ip address",
                      "type": "Object"
                    },
                    {
                      "name": "port",
                      "description": "Unicast destination port",
                      "type": "Object"
                    }
                  ]
                }
              ]
            },
            {
              "name": "socket",
              "description": "Boon client socket",
              "type": "Object"
            }
          ]
        },
        "stream": {
          "name": "stream",
          "type": "method",
          "description": "`stream` [command handler]",
          "params": [
            {
              "name": "req",
              "description": "Stream to be connected to",
              "type": "Object"
            }
          ]
        }
      }
    },
    "lib/dvblast": {
      "name": "lib/dvblast",
      "type": "kind",
      "super": "ose/lib.kind",
      "caption": "DVBlast kind",
      "readme": "[Entry kind] allowing to control DVBlast software\n\nSee [DVB streamer example]",
      "file": "lib/dvblast/node.js",
      "schema": "control",
      "kind": "dvblast",
      "property": {
        "current": {
          "name": "current",
          "type": "property",
          "dtype": "Object",
          "description": "Currently streaming info"
        },
        "current.boons": {
          "name": "current.boons",
          "type": "property",
          "dtype": "Array",
          "description": "List of boons"
        },
        "current.ucast": {
          "name": "current.ucast",
          "type": "property",
          "dtype": "{Object}",
          "description": "Streaming to ip and port specified by this property. If not\nspecified, streaming is in multicast mode.\n\n{\n  ip: {String},\n  port: {Number}\n}"
        },
        "current.mplex": {
          "name": "current.mplex",
          "type": "property",
          "dtype": "Object",
          "description": "Currently streamed multiplex entry"
        },
        "current.channels": {
          "name": "current.channels",
          "type": "property",
          "dtype": "Array",
          "description": "List of currently streaming channel entries"
        },
        "current.config": {
          "name": "current.config",
          "type": "property",
          "dtype": "String",
          "description": "Configuration file content"
        },
        "aim": {
          "name": "aim",
          "type": "property",
          "dtype": "Object",
          "description": "The `aim` property has the same structure as `current`. This\nproperty indicates that the requested streaming has not yet\nstarted. When both properties are defined, streaming of `current`\nis finishing and gets replaced with `aim` after new streaming\nstarts."
        },
        "ps": {
          "name": "ps",
          "type": "property",
          "dtype": "Object",
          "description": "Process handler"
        },
        "configFile": {
          "name": "configFile",
          "type": "property",
          "dtype": "String",
          "description": "Path to dvblast configuration file"
        },
        "mcast": {
          "name": "mcast",
          "type": "property",
          "dtype": "String",
          "description": "Reference to multicast address pool entry"
        },
        "boon": {
          "name": "boon",
          "type": "property",
          "dtype": "Object",
          "description": "Currently requesting boon, assures boons requests serialization"
        }
      },
      "method": {
        "cleanup": {
          "name": "cleanup",
          "type": "method",
          "description": "Cleanup entry",
          "params": [
            {
              "name": "entry",
              "description": "Entry to be cleaned up",
              "type": "Object"
            }
          ]
        },
        "applyAim": {
          "name": "applyAim",
          "type": "method",
          "description": "Stop current streaming and start new streaming defined by `aim`.",
          "params": [
            {
              "name": "entry",
              "description": "Entry",
              "type": "Object"
            }
          ]
        },
        "removeBoon": {
          "name": "removeBoon",
          "type": "method",
          "description": "Remove `boon` from `entry`",
          "params": [
            {
              "name": "entry",
              "description": "Entry",
              "type": "Object"
            },
            {
              "name": "boon",
              "description": "Boon to be removed",
              "type": "Object"
            }
          ]
        },
        "kill": {
          "name": "kill",
          "type": "method",
          "description": "Kill dvblast process",
          "params": [
            {
              "name": "entry",
              "description": "Entry",
              "type": "Object"
            }
          ]
        },
        "spawn": {
          "name": "spawn",
          "type": "method",
          "description": "Spawn dvblast process",
          "params": [
            {
              "name": "entry",
              "description": "Entry",
              "type": "Object"
            },
            {
              "name": "cb",
              "description": "Callback",
              "type": "Function"
            }
          ]
        }
      }
    },
    "lib/vlc": {
      "name": "lib/vlc",
      "type": "kind",
      "super": "ose/lib.kind",
      "caption": "VLC kind",
      "readme": "[Entry kind] allowing to control VLC\n\nSee [Media player example]",
      "file": "lib/vlc/index.js",
      "schema": "control",
      "kind": "vlc",
      "aliases": "vlc",
      "description": "Implementation of media player playback using VLC over D-Bus",
      "handler": {
        "playUri": {
          "name": "playUri",
          "type": "handler",
          "description": "Play media from URI.",
          "params": [
            {
              "name": "req",
              "description": "Media URI",
              "type": "String"
            }
          ]
        },
        "play": {
          "name": "play",
          "type": "handler",
          "description": "Play"
        },
        "pause": {
          "name": "pause",
          "type": "handler",
          "description": "Pause playback"
        },
        "stop": {
          "name": "stop",
          "type": "handler",
          "description": "Stop playback"
        },
        "turnOff": {
          "name": "turnOff",
          "type": "handler",
          "description": "Turns the player off.",
          "params": [
            {
              "name": "req",
              "description": "None"
            }
          ]
        },
        "fullscreen": {
          "name": "fullscreen",
          "type": "handler",
          "description": "Toggles fullscreen",
          "params": [
            {
              "name": "req",
              "description": "Fullscreen?",
              "type": "Object"
            }
          ]
        },
        "raise": {
          "name": "raise",
          "type": "handler",
          "description": "Raises window"
        },
        "shuffle": {
          "name": "shuffle",
          "type": "handler",
          "description": "Toggles shuffle mode",
          "params": [
            {
              "name": "req",
              "description": "Shuffle?",
              "type": "Boolean"
            }
          ]
        },
        "seek": {
          "name": "seek",
          "type": "handler",
          "description": "Seek media",
          "params": [
            {
              "name": "req",
              "description": "Position in microseconds",
              "type": "Number"
            }
          ]
        },
        "next": {
          "name": "next",
          "type": "handler",
          "description": "Skip to next media"
        },
        "previous": {
          "name": "previous",
          "type": "handler",
          "description": "Skip to previous media"
        }
      }
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "VideoLAN core",
      "readme": "Core singleton of [ose-videolan] npm package. Registers [entry kinds]\ndefined by this package to the `\"control\"` [schema].",
      "file": "lib/index.js"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "VideoLAN content",
      "readme": "Provides files of [ose-videolan] package to the browser.",
      "file": "content.js"
    }
  }
};