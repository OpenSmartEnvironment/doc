Packages["dvb"] = {
  "name": "dvb",
  "npmname": "ose-dvb",
  "caption": "DVB",
  "readme": "This package contains the general definition of DVB-related logic.\nIt is able to parse `channels.conf` files (output of\n[`w_scan`](http://www.linuxtv.org/wiki/index.php/W_scan)) and\nregister them as sources used by the [Media player].\n\nSee [DVB streamer example]",
  "line": 13,
  "modules": {
    "lib/channel/boon": {
      "name": "lib/channel/boon",
      "type": "class",
      "caption": "DVB streaming boon client socket",
      "readme": "[Client socket] responsible for for maintaining media stream",
      "file": "lib/channel/boon.js",
      "method": {
        "constructor": {
          "name": "constructor",
          "type": "method",
          "description": "Socket constructor"
        }
      },
      "handler": {
        "open": {
          "name": "open",
          "type": "handler",
          "description": "Boon socket open handler",
          "params": [
            {
              "name": "req",
              "description": "Request for boon",
              "type": "Object",
              "props": [
                {
                  "name": "count",
                  "description": "Number of current boons for given channel",
                  "type": "Number"
                },
                {
                  "name": "ucast",
                  "description": "Unicast destination address",
                  "type": "String",
                  "optional": true
                }
              ]
            }
          ]
        }
      }
    },
    "lib/channel": {
      "name": "lib/channel",
      "type": "kind",
      "super": "ose/lib.kind",
      "caption": "DVB channel kind",
      "readme": "[Entry kind] describing DVB channels.",
      "file": "lib/channel/index.js",
      "kind": "dvbChannel"
    },
    "lib/mplex": {
      "name": "lib/mplex",
      "type": "kind",
      "super": "ose/lib.kind",
      "caption": "DVB multiplex kind",
      "readme": "[Entry kind] describing DVB multiplex.",
      "file": "lib/mplex/index.js",
      "kind": "dvbMplex"
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "DVB core",
      "readme": "Core singleton of [ose-dvb] npm package. Registers [entry kinds]\ndefined by this package to the `\"media\"` [schema].",
      "file": "lib/index.js",
      "method": {
        "parseChannels": {
          "name": "parseChannels",
          "type": "method",
          "description": "Create multiplex (mplex) and channel entries by parsing output from\n`w_scan`. For each channel, assign a multicast group ip address\nfrom `pool`.",
          "params": [
            {
              "name": "trans",
              "description": "Transaction of \"media\" shard for channel entries",
              "type": "Object"
            },
            {
              "name": "lines",
              "description": "Output from `w_scan`",
              "type": "String"
            },
            {
              "name": "pool",
              "description": "IP multicast pool identification",
              "type": "Object",
              "optional": true
            },
            {
              "name": "cb",
              "description": "Callback to be called when finished parsing",
              "type": "Function"
            }
          ]
        }
      }
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "DVB content",
      "readme": "Provides files of [ose-dvb] package to the browser.",
      "file": "content.js"
    }
  }
};