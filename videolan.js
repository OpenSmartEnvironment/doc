Packages["videolan"] = {
  "name": "videolan",
  "npmname": "ose-videolan",
  "caption": "VideoLAN",
  "readme": "This package contains [entry kinds] integrating VideoLAN software\ninto OSE.\n\nIt allows the [Media player] to use VLC as its playback\napplication and DVBlast as its DVB streamer.\n\nSee [Media player example].",
  "file": "content.js",
  "line": 12,
  "modules": {
    "lib/dvblast": {
      "name": "lib/dvblast",
      "type": "singleton",
      "super": "ose/lib.kind",
      "caption": "DVBlast kind",
      "readme": "[Entry kind] allowing to control DVBlast software",
      "file": "lib/dvblast/node.js",
      "method": {
        "register": {
          "name": "register",
          "type": "method",
          "description": "Registers media player",
          "params": [
            {
              "name": "req",
              "description": "Request data",
              "type": "Object"
            },
            {
              "name": "socket",
              "description": "Slave socket",
              "type": "Object"
            }
          ]
        }
      }
    },
    "lib/dvblast/master": {
      "name": "lib/dvblast/master",
      "type": "class",
      "caption": "DVBlast response socket",
      "readme": "[Response socket] relaying the switch entry events to the client.\n\nTODO",
      "file": "lib/dvblast/master.js",
      "method": {
        "init": {
          "name": "init",
          "type": "method",
          "description": "Socket constructor"
        },
        "close": {
          "name": "close",
          "type": "method",
          "description": "Close handler",
          "params": [
            {
              "name": "req",
              "description": "",
              "type": "Object",
              "optional": true
            }
          ]
        },
        "error": {
          "name": "error",
          "type": "method",
          "description": "Error handler",
          "params": [
            {
              "name": "err",
              "description": "[Error] instance",
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
    "lib/vlc": {
      "name": "lib/vlc",
      "type": "singleton",
      "super": "ose/lib.kind",
      "caption": "VLC kind",
      "readme": "[Entry kind] allowing to control VLC",
      "file": "lib/vlc/index.js",
      "method": {
        "playUri": {
          "name": "playUri",
          "type": "method",
          "description": "[Command handler]\n\nPlay media from URI.",
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
          "type": "method",
          "description": "[Command handler]\n\nPlay"
        },
        "pause": {
          "name": "pause",
          "type": "method",
          "description": "[Command handler]\n\nPause playback"
        },
        "stop": {
          "name": "stop",
          "type": "method",
          "description": "[Command handler]\n\nStop playback"
        },
        "turnOff": {
          "name": "turnOff",
          "type": "method",
          "description": "[Command handler]\n\nTurns the player off.",
          "params": [
            {
              "name": "req",
              "description": "None"
            }
          ]
        },
        "fullscreen": {
          "name": "fullscreen",
          "type": "method",
          "description": "[Command handler]\n\nToggles fullscreen",
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
          "type": "method",
          "description": "[Command handler]\n\nRaises window"
        },
        "shuffle": {
          "name": "shuffle",
          "type": "method",
          "description": "[Command handler]\n\nToggles shuffle mode",
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
          "type": "method",
          "description": "[Command handler]\n\nSeek media",
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
          "type": "method",
          "description": "[Command handler]\n\nSkip to next media",
          "params": [
            {
              "name": "req",
              "description": "Request object TODO",
              "type": "Object"
            }
          ]
        },
        "previous": {
          "name": "previous",
          "type": "method",
          "description": "[Command handler]\n\nSkip to previous media",
          "params": [
            {
              "name": "req",
              "description": "Request object TODO",
              "type": "Object"
            }
          ]
        }
      }
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "VideoLAN core",
      "readme": "Core singleton of [ose-videolan] npm package. Registers [entry kinds]\ndefined by this package to the `\"control\"` [scope].",
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