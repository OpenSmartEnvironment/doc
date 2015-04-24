Packages["media"] = {
  "name": "media",
  "npmname": "ose-media",
  "caption": "Media",
  "readme": "The Media package implements a general media player into your\nenvironment. Together with other OSE packages (e.g. [ose-pa],\n[ose-videolan] and [ose-dvb]), it can be used to create a\nmulti-instance media application.\n\nSee [Media player example].",
  "line": 10,
  "aliases": "oseMediaPlayer",
  "features": "- Media sources extended by other npm packages\n- Predefined media streams, files and playback history\n- Media playback using a configurable set of applications\n  (currently DVBlast as DVB stramer, PulseAudio as audio backend\n  and VLC as media player)",
  "comps": {
    "history": {
      "name": "history",
      "caption": "Media history",
      "readme": "OSE Media package keeps track of played media items. These items\ncan be displayed in the player history and played again.",
      "file": "lib/item/index.js",
      "line": 18,
      "modules": {
        "lib/item": {
          "name": "lib/item",
          "type": "singleton",
          "super": "ose/lib.kind",
          "caption": "Media item kind",
          "readme": "The media item entry represents a single media item that can be\nplayed back. It contains a reference to another entry and\nadditional data depending on the source.",
          "file": "lib/item/index.js"
        }
      }
    },
    "player": {
      "name": "player",
      "caption": "Media player",
      "readme": "The media player [kind] contains the logic for media control. It\ncontrols the volume, playback and DVB streamer on Linux boxes. In\nthe [OSE UI] it displays information about currently playing media\nand allows to control the player remotely. It's possible to display\none of registered media sources and select an item.",
      "file": "lib/remote.js",
      "line": 11,
      "modules": {
        "lib/player": {
          "name": "lib/player",
          "type": "singleton",
          "super": "ose/lib.kind",
          "caption": "Media player kind",
          "readme": "On each entry initialization, [links] to volume control, playback\nand optional DVB streamer entries are established. Every entry of\nthis kind handles commands to control media playback.",
          "file": "lib/player/index.js",
          "handler": {
            "mute": {
              "name": "mute",
              "type": "handler",
              "description": "Toggle mute",
              "params": [
                {
                  "name": "req",
                  "description": "Whether to mute",
                  "type": "Boolean"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "volume": {
              "name": "volume",
              "type": "handler",
              "description": "Change volume",
              "params": [
                {
                  "name": "req",
                  "description": "(0 .. 1) or \"up\"/\"down\"",
                  "type": "Number|String"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "playItem": {
              "name": "playItem",
              "type": "handler",
              "description": "Play media item.",
              "params": [
                {
                  "name": "req",
                  "description": "Media item entry identification.",
                  "type": "Object"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "stop": {
              "name": "stop",
              "type": "handler",
              "description": "Stop playback",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Undefined"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "pause": {
              "name": "pause",
              "type": "handler",
              "description": "Pause playback",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Undefined"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "playPause": {
              "name": "playPause",
              "type": "handler",
              "description": "Play or pause current media",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Undefined"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "play": {
              "name": "play",
              "type": "handler",
              "description": "Play",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Undefined"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "fullscreen": {
              "name": "fullscreen",
              "type": "handler",
              "description": "Toggle fullscreen",
              "params": [
                {
                  "name": "req",
                  "description": "Whether to switch to fullscreen or \"toggle\"",
                  "type": "Boolean|Object"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "playLast": {
              "name": "playLast",
              "type": "handler",
              "description": "Play last media item",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Undefined"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "next": {
              "name": "next",
              "type": "handler",
              "description": "Skip to next media",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Undefined"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "previous": {
              "name": "previous",
              "type": "handler",
              "description": "Skip to previous media",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Undefined"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "shuffle": {
              "name": "shuffle",
              "type": "handler",
              "description": "Toggle shuffle",
              "params": [
                {
                  "name": "req",
                  "description": "Whether to shuffle or \"toggle\"",
                  "type": "Boolean|String"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "setPos": {
              "name": "setPos",
              "type": "handler",
              "description": "Change current pos",
              "params": [
                {
                  "name": "req",
                  "description": "Position delta in microseconds",
                  "type": "Number"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
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
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            }
          },
          "method": {
            "setBoon": {
              "name": "setBoon",
              "type": "method",
              "params": [
                {
                  "name": "socket",
                  "description": "",
                  "type": "Object"
                }
              ],
              "internal": true
            },
            "closeBoon": {
              "name": "closeBoon",
              "type": "method",
              "params": [
                {
                  "name": "socket",
                  "description": "",
                  "type": "Object"
                }
              ],
              "internal": true
            }
          }
        },
        "lib/player/dvb": {
          "name": "lib/player/dvb",
          "type": "class",
          "caption": "Media player to DVB streamer client socket",
          "readme": "Establish a [link] to a DVB streamer",
          "file": "lib/player/dvb.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor",
              "params": [
                {
                  "name": "player",
                  "description": "Media player entry",
                  "type": "Object"
                },
                {
                  "name": "ident",
                  "description": "DVB streamer identification",
                  "type": "Object"
                }
              ]
            }
          },
          "handler": {
            "open": {
              "name": "open",
              "type": "handler",
              "description": "Open handler",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Undefined"
                }
              ]
            },
            "close": {
              "name": "close",
              "type": "handler",
              "description": "Close handler",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Undefined"
                }
              ]
            },
            "home": {
              "name": "home",
              "type": "handler"
            },
            "patch": {
              "name": "patch",
              "type": "handler"
            }
          }
        },
        "lib/player/playback": {
          "name": "lib/player/playback",
          "type": "class",
          "caption": "Media player-to-playback client socket",
          "readme": "Establish a [link] to a playback entry.",
          "file": "lib/player/playback.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor",
              "params": [
                {
                  "name": "entry",
                  "description": "Media player entry",
                  "type": "Object"
                }
              ]
            },
            "open": {
              "name": "open",
              "type": "method"
            }
          },
          "handler": {
            "home": {
              "name": "home",
              "type": "handler"
            },
            "patch": {
              "name": "patch",
              "type": "handler"
            }
          }
        },
        "lib/player/volume": {
          "name": "lib/player/volume",
          "type": "class",
          "caption": "Media player to volume client socket",
          "readme": "Establish a [link] to a volume entry.",
          "file": "lib/player/volume.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor",
              "params": [
                {
                  "name": "entry",
                  "description": "Media player entry",
                  "type": "Object"
                }
              ]
            },
            "open": {
              "name": "open",
              "type": "method"
            }
          },
          "handler": {
            "home": {
              "name": "home",
              "type": "handler"
            },
            "patch": {
              "name": "patch",
              "type": "handler"
            }
          }
        },
        "lib/player/remote": {
          "name": "lib/player/remote",
          "type": "class",
          "caption": "Remote controller command group class for media player",
          "readme": "Facilitates configuration of controlling the media player with\nremote controllers.\n\nSee the [control.remote] component.",
          "file": "lib/remote.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method"
            },
            "add": {
              "name": "add",
              "type": "method",
              "description": "Sets up a media source as a single remote controller group",
              "params": [
                {
                  "name": "group",
                  "description": "Group to be used",
                  "type": "Object"
                },
                {
                  "name": "shard",
                  "description": "Shard containing media identification object",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "List of media items",
                  "type": "Object"
                }
              ]
            }
          }
        }
      }
    },
    "stream": {
      "name": "stream",
      "caption": "Media streams",
      "readme": "It is possible to predefine streams or files into the OSE\nMedia player. These can be easily selected and played.",
      "file": "lib/stream/index.js",
      "line": 18,
      "modules": {
        "lib/stream": {
          "name": "lib/stream",
          "type": "singleton",
          "super": "ose/lib.kind",
          "caption": "Media stream kind",
          "readme": "Media stream entry represents a single media stream that can be\nplayed back.",
          "file": "lib/stream/index.js",
          "method": {
            "getMediaKeys": {
              "name": "getMediaKeys",
              "type": "method",
              "description": "Returns an object containing information about media entry to\ndisplay in the player detail view.",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry to display",
                  "type": "Object"
                }
              ]
            }
          },
          "undefined": {
            "undefined": {
              "description": "Send media item to to playback",
              "params": [
                {
                  "name": "player",
                  "description": "Media player entry",
                  "type": "Object"
                },
                {
                  "name": "item",
                  "description": "Media item entry",
                  "type": "Object"
                }
              ]
            }
          }
        }
      }
    }
  },
  "modules": {
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "Media core",
      "readme": "Core singleton of [ose-media] npm package. Registers [entry kinds]\ndefined by this package to the `media` [scope].",
      "file": "lib/index.js"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "Media content",
      "readme": "Provides files of Media package to the browser.",
      "file": "content.js"
    }
  }
};