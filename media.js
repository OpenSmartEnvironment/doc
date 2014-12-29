Packages["media"] = {
  "name": "media",
  "npmname": "ose-media",
  "caption": "Media",
  "readme": "The Media package implements a general media player into your\nenvironment. It makes use of various media applications. The logic\nof controlling these applications is contained in separate packages\n([ose-pa], [ose-videolan]).\n\nSee [Media player example].",
  "file": "content.js",
  "line": 12,
  "aliases": "oseMediaPlayer",
  "features": "- Media sources extended by other npm packages\n- Predefined media streams, files and playback history\n- Media playback using a configurable set of applications\n  (currently DVBlast as DVB stramer, PulseAudio as audio backend\n  and VLC as media player)",
  "comps": {
    "history": {
      "name": "history",
      "caption": "Media history",
      "readme": "OSE Media package keeps track of played media items. These items\ncan be displayed in the player history and played again.",
      "file": "lib/item/index.js",
      "line": 19,
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
      "readme": "The media player [kind] contains the logic for media control. It\ncontrols the volume, playback and DVB streamer on one or more Linux\nboxes. In the [OSE UI] it displays information about currently\nplaying media and allows to control the player remotely. It's\npossible to display one of registered media sources and select an\nitem. Some sources support searching.",
      "file": "lib/remote.js",
      "line": 12,
      "modules": {
        "lib/player/commands": {
          "name": "lib/player/commands",
          "type": "class",
          "caption": "Media player command handlers",
          "readme": "Command handlers for entries of media player kind",
          "file": "lib/player/commands.js",
          "method": {
            "mute": {
              "name": "mute",
              "type": "method",
              "description": "[Command handler]\n\nToggle mute",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Boolean"
                }
              ]
            },
            "volume": {
              "name": "volume",
              "type": "method",
              "description": "[Command handler]\n\nChange volume",
              "params": [
                {
                  "name": "req",
                  "description": "(0 .. 1)",
                  "type": "Number"
                }
              ]
            },
            "playDvb": {
              "name": "playDvb",
              "type": "method",
              "description": "[Command handler]\n\nPlay DVB media item.",
              "params": [
                {
                  "name": "req",
                  "description": "DVB data",
                  "type": "Object"
                }
              ]
            },
            "playItem": {
              "name": "playItem",
              "type": "method",
              "description": "[Command handler]\n\nPlay media item.",
              "params": [
                {
                  "name": "req",
                  "description": "Media item entry identification.",
                  "type": "Object"
                }
              ]
            },
            "stop": {
              "name": "stop",
              "type": "method",
              "description": "[Command handler]\n\nStop playback"
            },
            "pause": {
              "name": "pause",
              "type": "method",
              "description": "[Command handler]\n\nPause playback"
            },
            "playPause": {
              "name": "playPause",
              "type": "method",
              "description": "[Command handler]\n\nPlay or pause current media",
              "params": [
                {
                  "name": "req",
                  "description": "Media item entry identification.",
                  "type": "Object"
                }
              ]
            },
            "play": {
              "name": "play",
              "type": "method",
              "description": "[Command handler]\n\nPlay"
            },
            "fullscreen": {
              "name": "fullscreen",
              "type": "method",
              "description": "[Command handler]\n\nToggle fullscreen",
              "params": [
                {
                  "name": "req",
                  "description": "Fullscreen? TODO",
                  "type": "Object"
                }
              ]
            },
            "playLast": {
              "name": "playLast",
              "type": "method",
              "description": "[Command handler]\n\nPlay last media item",
              "params": [
                {
                  "name": "req",
                  "description": "Request object",
                  "type": "Object"
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
            },
            "shuffle": {
              "name": "shuffle",
              "type": "method",
              "description": "[Command handler]\n\nToggle shuffle",
              "params": [
                {
                  "name": "req",
                  "description": "Shuffle?",
                  "type": "Boolean"
                }
              ]
            },
            "setPos": {
              "name": "setPos",
              "type": "method",
              "description": "[Command handler]\n\nChange current pos",
              "params": [
                {
                  "name": "req",
                  "description": "Position delta in microseconds",
                  "type": "Number"
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
            }
          }
        },
        "lib/player/dvb": {
          "name": "lib/player/dvb",
          "type": "class",
          "caption": "Media player to dvb client socket",
          "readme": "Establishes [link] to a dvb entry.",
          "file": "lib/player/dvb.js",
          "method": {
            "init": {
              "name": "init",
              "type": "method",
              "description": "Socket constructor"
            },
            "open": {
              "name": "open",
              "type": "method",
              "description": "Open handler",
              "params": [
                {
                  "name": "value",
                  "description": "Socket is linked to entry home.",
                  "type": "Boolean"
                }
              ]
            },
            "end": {
              "name": "end",
              "type": "method",
              "description": "Close handler",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/player": {
          "name": "lib/player",
          "type": "singleton",
          "super": "ose/lib.kind",
          "caption": "Media player kind",
          "readme": "On each entry initialization, [links] to volume control, playback\nand DVB streamer entries are established. Every entry of this kind\nhandles commands to control media playback.",
          "file": "lib/player/index.js"
        },
        "lib/player/playback": {
          "name": "lib/player/playback",
          "type": "class",
          "caption": "Media player-to-playback client socket",
          "readme": "Establishes a [link] to a playback entry.",
          "file": "lib/player/playback.js",
          "method": {
            "init": {
              "name": "init",
              "type": "method",
              "description": "Socket constructor"
            },
            "open": {
              "name": "open",
              "type": "method",
              "description": "Open handler",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Object"
                }
              ]
            },
            "close": {
              "name": "close",
              "type": "method",
              "description": "Close handler",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Object"
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
            "synced": {
              "name": "synced",
              "type": "method",
              "description": "Synced handler",
              "params": [
                {
                  "name": "value",
                  "description": "Synced or not",
                  "type": "Boolean"
                }
              ]
            },
            "update": {
              "name": "update",
              "type": "method",
              "description": "Update handler",
              "params": [
                {
                  "name": "req",
                  "description": "Update request",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/player/volume": {
          "name": "lib/player/volume",
          "type": "class",
          "caption": "Media player to volume client socket",
          "readme": "Establishes a [link] to a volume entry.",
          "file": "lib/player/volume.js",
          "method": {
            "init": {
              "name": "init",
              "type": "method",
              "description": "Socket constructor"
            },
            "open": {
              "name": "open",
              "type": "method",
              "description": "Open handler",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Object"
                }
              ]
            },
            "close": {
              "name": "close",
              "type": "method",
              "description": "Close handler",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Object"
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
            "update": {
              "name": "update",
              "type": "method",
              "description": "Update handler",
              "params": [
                {
                  "name": "req",
                  "description": "Update request",
                  "type": "Object"
                }
              ]
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
                  "name": "space",
                  "description": "Space containing media shard",
                  "type": "String"
                },
                {
                  "name": "shard",
                  "description": "Media shard",
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
      "readme": "It is possible to predefine favourite streams or files into the OSE\nMedia player. These can be easily selected and played.",
      "file": "lib/stream/index.js",
      "line": 19,
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
    },
    "source": {
      "name": "source",
      "caption": "Media sources",
      "readme": "Each media source is a reference to some [entry kind] describing\nsource of media items. Media player use sources to select media to\nplay. Registration to sources is done during initialization of the\nnpm package containing the source. Any OSE package can contain one\nor more media sources. Examples are the [DVB], [Icecast] or\n[YouTube] packages.",
      "file": "lib/sources.js",
      "line": 29,
      "description": "## Description\nMedia source kind must implement two methods:\n- `getMediaKeys()`\n- `playItem()`\n\nDescription of these methods can be found at [Media stream kind].",
      "modules": {
        "lib/sources": {
          "name": "lib/sources",
          "type": "singleton",
          "caption": "Media sources singleton",
          "readme": "Singleton containing all media sources.",
          "file": "lib/sources.js",
          "method": {
            "add": {
              "name": "add",
              "type": "method",
              "description": "Adds new media source",
              "params": [
                {
                  "name": "name",
                  "description": "Media source name",
                  "type": "String"
                },
                {
                  "name": "scope",
                  "description": "Media source scope",
                  "type": "String"
                },
                {
                  "name": "kind",
                  "description": "Media source kind",
                  "type": "String"
                }
              ]
            },
            "get": {
              "name": "get",
              "type": "method",
              "description": "Returns media source by name",
              "params": [
                {
                  "name": "name",
                  "description": "Media source name",
                  "type": "String"
                }
              ]
            },
            "each": {
              "name": "each",
              "type": "method",
              "description": "Iterates all media sources",
              "params": [
                {
                  "name": "cb",
                  "description": "Callback",
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