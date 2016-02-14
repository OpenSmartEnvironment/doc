Packages["control"] = {
  "name": "control",
  "npmname": "ose-control",
  "caption": "Control",
  "readme": "This package contains definitions of general [kinds of entries]\nthat role real objects found in most environments (lights,\nswitches, heaters, sensors etc.). Entries are configured by\ndefining `entry.dval` values. Communication between or among\nentries is realized via [links].",
  "line": 13,
  "comps": {
    "room": {
      "name": "room",
      "caption": "Rooms",
      "readme": "This component defines basic room entry kinds. By configuring\nentries of these kinds, it is possible to define an indoor\nenvironment and its behaviour.\n\nFor a simple example of how to control a light using a switch, see\nthe [Raspberry Pi example].",
      "file": "lib/activity.js",
      "line": 13,
      "description": "## Description\nEach light channel can be controlled either through a digital\noutput pin or a pin supporting PWM. Smooth changes of light\nintensity can be controlled through the `speed` value, which\ndefines the time in milliseconds it takes change the light\nintensity from 0 to 100% or vice versa.\n\nEach light supports auto-off timeout since last change with\nconfigurable dim speed.\n\nEvery light can be controlled by a [switch entry] with the\nfollowing behaviour:\n- One tap when shining: Switch the light off.\n- One tap when off: Switch to the default configurable value.\n- Two taps: Switch the light fully on.\n- Hold: Switch the light off.",
      "modules": {
        "lib/blinds": {
          "name": "lib/blinds",
          "type": "kind",
          "super": "ose/lib.kind",
          "caption": "Blinds kind",
          "readme": "[Entry kind] defining blinds behaviour.",
          "file": "lib/blinds/index.js",
          "schema": "control",
          "kind": "blinds",
          "handler": {
            "power": {
              "name": "power",
              "type": "handler",
              "description": "Move blinds of some delta",
              "params": [
                {
                  "name": "req",
                  "description": "Value between 0..1",
                  "type": "Boolean | Number | String"
                },
                {
                  "name": "socket",
                  "description": "Command response socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            }
          }
        },
        "lib/door": {
          "name": "lib/door",
          "type": "kind",
          "super": "ose/lib.kind",
          "caption": "Door kind",
          "readme": "Each [entry] of this kind establishes a [link] to the `dval.master`\ncontroller entry with `type: \"din\"`. Entry sval is changed\ndepending on the incoming data, and the `open` or `close` events\nare fired. These events can be listened for, and appropriate\nactions can be taken.",
          "file": "lib/door/index.js",
          "schema": "control",
          "kind": "door",
          "aliases": "door doors doorEntry",
          "property": {
            "dval.master": {
              "name": "dval.master",
              "type": "property",
              "dtype": "String | Object",
              "description": "Controller entry identification object.\n\nThe switch entry establishes a new link to this controller."
            },
            "dval.pin": {
              "name": "dval.pin",
              "type": "property",
              "dtype": "String",
              "description": "Master pin index\n\nIndex of digital input pin on the master controller"
            },
            "dval.debounce": {
              "name": "dval.debounce",
              "type": "property",
              "dtype": "Number",
              "description": "Debounce timeout\n\nDefines debounce timeout of the digital input in milliseconds.\n\nThe default value is `O.consts(\"control\").switchDebounce`."
            },
            "sval.value": {
              "name": "sval.value",
              "type": "property",
              "dtype": "Number (0, 1)",
              "description": "Current switch state value"
            },
            "sval.at": {
              "name": "sval.at",
              "type": "property",
              "dtype": "Number",
              "description": "Timestamp of the last switch change."
            },
            "sval.debounce": {
              "name": "sval.debounce",
              "type": "property",
              "dtype": "Number",
              "description": "Debounce timeout\n\nDefines debounce timeout of the digital input in milliseconds. The\nvalue is taken from `dval.debounce`."
            }
          },
          "event": {
            "open": {
              "name": "open",
              "type": "event",
              "description": "Open event\n\nFired when a \"door open\" event is detected."
            },
            "close": {
              "name": "close",
              "type": "event",
              "description": "Close event\n\nFired when a \"door close\" event is detected."
            }
          }
        },
        "lib/door/pin": {
          "name": "lib/door/pin",
          "type": "class",
          "caption": "Door-to-controller pin client socket",
          "readme": "Establishes a link to the `dval.master` controller pin `dval.pin`\nwith `type: \"din\"`. The controller can be a [Raspberry Pi], for\nexample.",
          "file": "lib/door/pin.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor",
              "params": [
                {
                  "name": "entry",
                  "description": "Door entry",
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
                  "type": "Object",
                  "props": [
                    {
                      "name": "value",
                      "description": "(0, 1) Current pin state",
                      "type": "Number"
                    },
                    {
                      "name": "at",
                      "description": "Timestamp of the update",
                      "type": "Number"
                    }
                  ]
                }
              ]
            }
          }
        },
        "lib/heater": {
          "name": "lib/heater",
          "type": "kind",
          "super": "ose/lib.kind",
          "caption": "Heater kind",
          "readme": "[Entry kind] defining behaviour of heaters. Each heater establishes\na [link] to the `dval.master` entry and to an optional\n`dval.tariff` entry to watch low and high tariff switching.",
          "file": "lib/heater/index.js",
          "schema": "control",
          "kind": "heater",
          "aliases": "heater heaters heaterEntry heaterEntryKind",
          "property": {
            "dval.master": {
              "name": "dval.master",
              "type": "property",
              "dtype": "String | Object",
              "description": "Controller entry identification\n\nThe heater entry establishes a new link to the controller."
            },
            "dval.pin": {
              "name": "dval.pin",
              "type": "property",
              "dtype": "String",
              "description": "Master pin index\n\nIndex of digital input pin on the master controller"
            },
            "dval.tariff": {
              "name": "dval.tariff",
              "type": "property",
              "dtype": "String | Object",
              "description": "Tariff entry identification\n\nIf specified, the heater establishes a new link to the\n`dval.tariff` entry and gets controlled by it."
            }
          },
          "handler": {
            "power": {
              "name": "power",
              "type": "handler",
              "description": "Sets up heater power to specified value.",
              "params": [
                {
                  "name": "req",
                  "description": "Value between 0..1",
                  "type": "Boolean | Number | String"
                },
                {
                  "name": "socket",
                  "description": "Command response socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            }
          }
        },
        "lib/heater/pin": {
          "name": "lib/heater/pin",
          "type": "class",
          "caption": "Heater-to-controller pin client socket",
          "readme": "Establishes a [link] to the `dval.master` [controller pin]\n`dval.pin` with `type: \"dout\"`. The master can be a [Raspberry Pi],\nfor example.",
          "file": "lib/heater/pin.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor"
            },
            "update": {
              "name": "update",
              "type": "method",
              "description": "Update handler",
              "params": [
                {
                  "name": "req",
                  "description": "Update request",
                  "type": "Object",
                  "props": [
                    {
                      "name": "value",
                      "description": "(0, 1) Current pin state",
                      "type": "Number"
                    },
                    {
                      "name": "at",
                      "description": "Timestamp of the update",
                      "type": "Number"
                    }
                  ]
                }
              ]
            }
          }
        },
        "lib/heater/tariff": {
          "name": "lib/heater/tariff",
          "type": "class",
          "caption": "Heater-to-tariff client socket",
          "readme": "Establishes a link to the `dval.tariff` entry.",
          "file": "lib/heater/tariff.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor",
              "params": [
                {
                  "name": "entry",
                  "description": "Heater entry",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/light": {
          "name": "lib/light",
          "type": "kind",
          "super": "ose/lib.kind",
          "caption": "Light kind",
          "readme": "[Entry kind] defining behaviour of lights. Each light consists of\nchannels. Each channel is controlled by some `master`\ncontroller. It is possible to use dimming when the controller\nsupports it. This component allows to easily create lights composed\nof LED strips that can smoothly change the colour and intensity,\nand do any other effects.",
          "file": "lib/light/index.js",
          "schema": "control",
          "kind": "light",
          "aliases": "light lights lightEntry lightEntryKind",
          "description": "## Description\nEach light channel can be controlled either through a digital\noutput pin or a pin supporting PWM. Smooth changes of light\nintensity can be controlled through the `speed` value, which\ndefines the time in milliseconds it takes change the light\nintensity from 0 to 100% or vice versa.\n\nEach light supports auto-off timeout since last change with\nconfigurable dim speed.\n\nEvery light can be controlled by a [switch entry] with the\nfollowing behaviour:\n- One tap when shining: Switch the light off.\n- One tap when off: Switch to the default configurable value.\n- Two taps: Switch the light fully on.\n- Hold: Switch the light off.",
          "property": {
            "dval.name": {
              "name": "dval.name",
              "type": "property",
              "dtype": "String",
              "description": "Light name"
            },
            "dval.master": {
              "name": "dval.master",
              "type": "property",
              "dtype": "Object",
              "description": "Controller entry identification object\n\nThe light entry establishes a new link to the controller."
            },
            "dval.pinType": {
              "name": "dval.pinType",
              "type": "property",
              "dtype": "String",
              "description": "Controller pin type, possible values are: ('dout' | 'pwm')"
            },
            "dval.channels": {
              "name": "dval.channels",
              "type": "property",
              "dtype": "Object",
              "description": "Light channels\n\nA light entry can consist of one or more channels. An example light\ncan have 3 LED strips (warm white, cold white and RGB). The entry\ndescribing such a light consists of 5 independently controllable\nchannels (warm, cold, red, green and blue).\n\nEach property of `dval.channels` is one channel. The key is a\nchannel name and the value is the pin index on the `dval.master`\ncontroller."
            },
            "dval.switch": {
              "name": "dval.switch",
              "type": "property",
              "dtype": "String | Object",
              "description": "Switches entry identification objects\n\nIf specified, the light establishes a new link to a switch and gets\ncontrolled by it."
            },
            "dval.autoOff": {
              "name": "dval.autoOff",
              "type": "property",
              "dtype": "Boolean | Number | Object",
              "description": "Auto off value\n\nDefines how long the light will wait before it starts dimming and\nthe speed of the dimming. The auto off timer is enabled each time\nany light channel is changed.\n\nThe value can be one of the following:\n- `true`: Enable auto off with default values\n- `false`: Disable auto off\n- Number: Wait timeout in seconds\n- Object: `{wait: <seconds>, speed: <milliseconds>}`\n\nDefault values:\n- `dval.autoOff.wait: Consts.lightAutoOffWait`\n- `dval.autoOff.speed: Consts.lightAutoOffSpeed`"
            },
            "dval.profiles": {
              "name": "dval.profiles",
              "type": "property",
              "dtype": "Object",
              "description": "Each property of this object defines one profile of the\nlight. There are predefined profiles `\"off\"`, `\"on\"` and `\"full\"`.\n\nDefault values are:\n- `\"off\": 0`\n- `\"on\": Consts.lightDefaultOn`\n- `\"full\": 1`"
            }
          },
          "handler": {
            "profile": {
              "name": "profile",
              "type": "handler",
              "description": "Sets light profile.",
              "params": [
                {
                  "name": "req",
                  "description": "Sets the light profile to the value specified. Simple profile name can be specified.",
                  "type": "Object|String",
                  "props": [
                    {
                      "name": "name",
                      "description": "Profile name",
                      "type": "String"
                    },
                    {
                      "name": "speed",
                      "description": "Speed of change",
                      "type": "Number",
                      "optional": true
                    }
                  ]
                }
              ]
            },
            "set": {
              "name": "set",
              "type": "handler",
              "description": "Keep all channels at their current value.",
              "params": [
                {
                  "name": "req",
                  "description": "Unused",
                  "type": "*",
                  "optional": true
                },
                {
                  "name": "socket",
                  "description": "Response [socket]",
                  "type": "Object"
                }
              ]
            },
            "delta": {
              "name": "delta",
              "type": "handler",
              "description": "Update requested channels.",
              "params": [
                {
                  "name": "req",
                  "description": "Delta",
                  "type": "String | Number"
                },
                {
                  "name": "socket",
                  "description": "Response [socket]",
                  "type": "Object"
                }
              ]
            },
            "update": {
              "name": "update",
              "type": "handler",
              "description": "Update requested channels.",
              "params": [
                {
                  "name": "req",
                  "description": "List of channels with their requested values.",
                  "type": "Number|Object"
                },
                {
                  "name": "socket",
                  "description": "Response [socket]",
                  "type": "Object"
                }
              ]
            },
            "lock": {
              "name": "lock",
              "type": "handler",
              "description": "Lock or unlock a light. Locked light cannot be changed via its command handlers.",
              "params": [
                {
                  "name": "req",
                  "description": "Unused",
                  "type": "Boolean",
                  "optional": true
                },
                {
                  "name": "socket",
                  "description": "Response [socket]",
                  "type": "Object"
                }
              ]
            },
            "autoOff": {
              "name": "autoOff",
              "type": "handler",
              "description": "Change auto off behaviour.",
              "params": [
                {
                  "name": "req",
                  "description": "Auto off configuration conforming to dval.autoOff.",
                  "type": "Boolean | Number | Object"
                },
                {
                  "name": "socket",
                  "description": "Response [socket]",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/light/pin": {
          "name": "lib/light/pin",
          "type": "class",
          "caption": "Light channel-to-controller pin client socket",
          "readme": "Establishes a link for a channel to the `dval.master`\ncontroller.",
          "file": "lib/light/pin.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor"
            }
          },
          "handler": {
            "update": {
              "name": "update",
              "type": "handler",
              "description": "Invoked on controller pin change",
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
        "lib/light/switch": {
          "name": "lib/light/switch",
          "type": "class",
          "caption": "Light-to-switch client socket",
          "readme": "Establishes a link to a [switch] controlling behaviour of a light.",
          "file": "lib/light/switch.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor"
            }
          },
          "handler": {
            "press": {
              "name": "press",
              "type": "handler",
              "description": "Press handler"
            },
            "release": {
              "name": "release",
              "type": "handler",
              "description": "Release handler"
            },
            "tap": {
              "name": "tap",
              "type": "handler",
              "description": "Tap handler",
              "params": [
                {
                  "name": "count",
                  "description": "Count of presses within `O.consts(\"control\").switchTapTimeout`.",
                  "type": "Number"
                }
              ]
            },
            "hold": {
              "name": "hold",
              "type": "handler",
              "description": "Hold handler"
            }
          }
        },
        "lib/room": {
          "name": "lib/room",
          "type": "kind",
          "super": "ose/lib.kind",
          "caption": "Room kind",
          "readme": "[Entry kind] defining behaviour of rooms.\n\nVarious activities can be defined for each room. Activities govern\nthe behaviour of rooms. When an activity is selected, it sends\ncommands to entries and trigger scheduled actions.\n\nEach activity is identified by its name and can be selected by a\ncommand sent to the room entry. Each activity should be a\ndescendant of the [activity class].\n\nExample:\n\nThe living room may have the following activities defined:\n\n- watching TV (lights dimmed, TV on, blinds down if dark outside,\n    etc.)\n- tidying (lights fully on, radio on)\n- reading (lights half on, multimedia off)\n\nAnother example:\n\nThe house may have the following activities:\n- at home (full comfort)\n- empty house (detection of intruders, heating down, etc.)\n- vacation (random actions simulating the presence of inhabitants)",
          "file": "lib/room/index.js",
          "schema": "control",
          "kind": "room",
          "property": {
            "sval.activity": {
              "name": "sval.activity",
              "type": "property",
              "dtype": "Object",
              "description": "Activity\n\nCurrently selected room activity"
            },
            "sval.activity.name": {
              "name": "sval.activity.name",
              "type": "property",
              "dtype": "String",
              "description": "Activity name\n\nCurrently selected room activity name"
            },
            "dval.activities": {
              "name": "dval.activities",
              "type": "property",
              "dtype": "Object",
              "description": "Configurations of activities for current room. Keys are names, and\nvalues are optional configuration objects."
            },
            "activities": {
              "name": "activities",
              "type": "property",
              "dtype": "{Object}",
              "description": "Initialization methods for activities. Keys are names, and values\nare functions."
            }
          },
          "undefined": {
            "undefined": {
              "description": "Change room activity.",
              "params": [
                {
                  "name": "req",
                  "description": "Request object or activity name",
                  "type": "String | Object",
                  "props": [
                    {
                      "name": "name",
                      "description": "Activity name",
                      "type": "String"
                    }
                  ]
                },
                {
                  "name": "socket",
                  "description": "Optional response socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            }
          }
        },
        "lib/switch": {
          "name": "lib/switch",
          "type": "kind",
          "super": "ose/lib.kind",
          "caption": "Switch kind",
          "readme": "Each switch is a digital input that has two logical values: `0` or `1`.\n\nEach [entry] of this kind establishes a [link] to the `dval.master`\ncontroller entry with `flavour: \"switch\"`.\n\n`press`, `release`, `tap` and `hold` events are fired on the entry,\nand the `sval` of the entry is updated depending on controller pin\nchanges. These events can be listened for, and appropriate actions\ncan be taken.\n\nIt is also possible to establish a new [link] to a switch as a\nclient socket with the \"relay\" command. The events listed above are\nthen relayed to the client socket.\n\nFor example, a [light entry] connects to a switch (if defined in\n`light.dval.switch`) as a client socket and is turned on or off\ndepending on pressing the switch.\n\nCurrently, only momentary switches (push-to-make) are\nsupported. Support for all other kinds of switches is planned.",
          "file": "lib/switch/index.js",
          "schema": "control",
          "kind": "switch",
          "aliases": "switch switchEntry",
          "property": {
            "sval.value": {
              "name": "sval.value",
              "type": "property",
              "dtype": "Number (0, 1)",
              "description": "Current switch state value"
            },
            "sval.at": {
              "name": "sval.at",
              "type": "property",
              "dtype": "Number",
              "description": "Timestamp of the last switch change."
            },
            "sval.debounce": {
              "name": "sval.debounce",
              "type": "property",
              "dtype": "Number",
              "description": "Debounce timeout\n\nDefines the debounce timeout of the digital input in\nmilliseconds. The value is taken from `dval.debounce`."
            },
            "sval.hold": {
              "name": "sval.hold",
              "type": "property",
              "dtype": "Number",
              "description": "Hold timeout\n\nDefines the hold timeout of the switch in milliseconds. The value is\ntaken from `dval.hold`."
            },
            "sval.tap": {
              "name": "sval.tap",
              "type": "property",
              "dtype": "Number",
              "description": "Tap timeout\n\nDefines the tap timeout of the switch in milliseconds. The value is\ntaken from `dval.tap`."
            }
          },
          "event": {
            "press": {
              "name": "press",
              "type": "event",
              "description": "Press event\n\nFired when a switch press is detected."
            },
            "release": {
              "name": "release",
              "type": "event",
              "description": "Release event\n\nFired when a switch release is detected."
            },
            "tap": {
              "name": "tap",
              "type": "event",
              "description": "Tap event\n\nFired when a switch tap is detected.",
              "params": [
                {
                  "name": "count",
                  "description": "Tap count within tap timeout."
                }
              ]
            },
            "hold": {
              "name": "hold",
              "type": "event",
              "description": "Hold event\n\nFired when a switch hold is detected."
            }
          },
          "handler": {
            "relay": {
              "name": "relay",
              "type": "handler",
              "description": "Create a response socket relaying switch events to the client."
            }
          }
        },
        "lib/switch/socket": {
          "name": "lib/switch/socket",
          "type": "class",
          "super": "ose/lib.entry.command",
          "caption": "Switch-to-controller client socket",
          "readme": "Establishes a link to the `dval.master` controller. The controller\ncan be a [Raspberry Pi], for example.",
          "file": "lib/switch/pin.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor",
              "params": [
                {
                  "name": "entry",
                  "description": "Switch entry",
                  "type": "Object"
                }
              ]
            },
            "press": {
              "name": "press",
              "type": "method",
              "description": "Press handler"
            },
            "release": {
              "name": "release",
              "type": "method",
              "description": "Release handler"
            },
            "tap": {
              "name": "tap",
              "type": "method",
              "description": "Tap handler",
              "params": [
                {
                  "name": "count",
                  "description": "Tap counts within `sval.tap` timeout",
                  "type": "Object"
                }
              ]
            },
            "hold": {
              "name": "hold",
              "type": "method",
              "description": "Hold handler"
            }
          }
        },
        "lib/switch/relay": {
          "name": "lib/switch/relay",
          "type": "class",
          "caption": "Switch relay response socket",
          "readme": "[Response socket] relaying the switch entry events to the client socket.",
          "file": "lib/switch/relay.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor",
              "params": [
                {
                  "name": "entry",
                  "description": "Switch entry",
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
            }
          }
        },
        "lib/activity": {
          "name": "lib/activity",
          "type": "class",
          "caption": "Activity class",
          "readme": "Ancestor for activity definintions",
          "file": "lib/activity.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Class constructor",
              "params": [
                {
                  "name": "name",
                  "description": "Activity name",
                  "type": "String"
                },
                {
                  "name": "entry",
                  "description": "Room entry",
                  "type": "Object"
                }
              ]
            },
            "job": {
              "name": "job",
              "type": "method",
              "description": "Creates a new scheduled job",
              "params": [
                {
                  "name": "name",
                  "description": "Name of job",
                  "type": "String"
                },
                {
                  "name": "rule",
                  "description": "Schedule information",
                  "type": "Object"
                },
                {
                  "name": "cb",
                  "description": "Callback",
                  "type": "Function"
                }
              ]
            },
            "daily": {
              "name": "daily",
              "type": "method",
              "description": "Creates a new daily job",
              "params": [
                {
                  "name": "name",
                  "description": "Name of job",
                  "type": "String"
                },
                {
                  "name": "hour",
                  "description": "Hour",
                  "type": "Number"
                },
                {
                  "name": "minute",
                  "description": "Minute",
                  "type": "Number"
                },
                {
                  "name": "cb",
                  "description": "Callback",
                  "type": "Function"
                }
              ]
            },
            "start": {
              "name": "start",
              "type": "method",
              "description": "Called when an activity is selected",
              "params": [
                {
                  "name": "req",
                  "description": "Request data",
                  "type": "*"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object"
                }
              ]
            },
            "stop": {
              "name": "stop",
              "type": "method",
              "description": "Called when another activity is selected"
            },
            "update": {
              "name": "update",
              "type": "method",
              "description": "Called when an activity is selected or updated",
              "params": [
                {
                  "name": "req",
                  "description": "Request data",
                  "type": "*"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object"
                }
              ]
            }
          }
        }
      }
    },
    "remote": {
      "name": "remote",
      "caption": "Remote control",
      "readme": "This component makes it possible to specify what individual remote\ncontroller commands do with OSE entries. An example of using this\ncomponent is the [ose-lirc] package.\n\nThe remote controller can be easily configured to control\nmultimedia, lights, etc. It is possible to define commands and\ngroups of commands.\n\nFor examples, see the [ose-example-lirc] package",
      "file": "lib/remote.js",
      "line": 24,
      "modules": {
        "lib/blind/remote": {
          "name": "lib/blind/remote",
          "type": "class",
          "caption": "Remote controller command group class for blinds",
          "readme": "Facilitates configuration of controlling blinds with remote\ncontrollers.\n\nSee the [control.remote] component.",
          "file": "lib/blinds/remote.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Call to add a blind to this group of commands.",
              "params": [
                {
                  "name": "index",
                  "description": "Index of blind",
                  "type": "Number"
                },
                {
                  "name": "target",
                  "description": "Blinds entry identification",
                  "type": "Number | String | Object"
                }
              ]
            }
          }
        },
        "lib/light/remote": {
          "name": "lib/light/remote",
          "type": "class",
          "caption": "Remote controller command group class for lights",
          "readme": "Facilitates configuration of controlling lights with remote\ncontrollers.\n\nSee the [control.remote] component.",
          "file": "lib/light/remote.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Call to add a light to this group of commands.",
              "params": [
                {
                  "name": "index",
                  "description": "Index of light",
                  "type": "Number"
                },
                {
                  "name": "target",
                  "description": "Light entry identification",
                  "type": "Number | String | Object"
                }
              ]
            }
          }
        },
        "lib/remote": {
          "name": "lib/remote",
          "type": "module",
          "caption": "Remote control module",
          "readme": "Methods allowing the setup of remote controller",
          "file": "lib/remote.js",
          "method": {
            "defaults": {
              "name": "defaults",
              "type": "method",
              "description": "Sets up default command group",
              "params": [
                {
                  "name": "entry",
                  "description": "Remote controller receiver entry",
                  "type": "Object"
                },
                {
                  "name": "key",
                  "description": "Remote command name",
                  "type": "String"
                },
                {
                  "name": "group",
                  "description": "Group of remote commands",
                  "type": "Number"
                }
              ]
            },
            "addGroup": {
              "name": "addGroup",
              "type": "method",
              "description": "Adds new command group",
              "params": [
                {
                  "name": "entry",
                  "description": "Remote controller receiver entry",
                  "type": "Object"
                },
                {
                  "name": "key",
                  "description": "Remote command name",
                  "type": "String"
                },
                {
                  "name": "group",
                  "description": "Group of remote commands",
                  "type": "Number"
                }
              ]
            },
            "add": {
              "name": "add",
              "type": "method",
              "description": "Adds an action to the group assigned to the remote command",
              "params": [
                {
                  "name": "group",
                  "description": "Group of remote commands",
                  "type": "Object"
                },
                {
                  "name": "key",
                  "description": "Remote command name",
                  "type": "Number"
                },
                {
                  "name": "val",
                  "description": "Action to be taken",
                  "type": "Object"
                }
              ]
            },
            "groupKey": {
              "name": "groupKey",
              "type": "method",
              "description": "Assigns key to group",
              "params": [
                {
                  "name": "entry",
                  "description": "Remote controller receiver entry",
                  "type": "Object"
                },
                {
                  "name": "master",
                  "description": "Master group",
                  "type": "Object"
                },
                {
                  "name": "key",
                  "description": "Remote command name",
                  "type": "String"
                },
                {
                  "name": "group",
                  "description": "Group of remote commands",
                  "type": "Number"
                }
              ]
            },
            "selectGroup": {
              "name": "selectGroup",
              "type": "method",
              "description": "Activates group",
              "params": [
                {
                  "name": "entry",
                  "description": "Remote controller receiver entry",
                  "type": "Object"
                },
                {
                  "name": "group",
                  "description": "Group of remote commands",
                  "type": "Number"
                }
              ]
            },
            "receive": {
              "name": "receive",
              "type": "method",
              "description": "Called by remote controller receiver entry when a key is pressed",
              "params": [
                {
                  "name": "entry",
                  "description": "Remote controller receiver entry",
                  "type": "Object"
                },
                {
                  "name": "val",
                  "description": "Data object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "key",
                      "description": "Key name",
                      "type": "String"
                    },
                    {
                      "name": "count",
                      "description": "Number of repeats",
                      "type": "Number"
                    }
                  ]
                }
              ]
            },
            "next": {
              "name": "next",
              "type": "method",
              "description": "Next channel handler",
              "params": [
                {
                  "name": "entry",
                  "description": "Remote controller receiver entry",
                  "type": "Object"
                },
                {
                  "name": "val",
                  "description": "Data object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "key",
                      "description": "Key name",
                      "type": "String"
                    },
                    {
                      "name": "count",
                      "description": "Number of repeats",
                      "type": "Number"
                    },
                    {
                      "name": "number",
                      "description": "Resulting decimal number",
                      "type": "Number"
                    }
                  ]
                }
              ]
            },
            "prev": {
              "name": "prev",
              "type": "method",
              "description": "Previous channel handler",
              "params": [
                {
                  "name": "entry",
                  "description": "Remote controller receiver entry",
                  "type": "Object"
                },
                {
                  "name": "val",
                  "description": "Data object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "key",
                      "description": "Key name",
                      "type": "String"
                    },
                    {
                      "name": "count",
                      "description": "Number of repeats",
                      "type": "Number"
                    },
                    {
                      "name": "number",
                      "description": "Resulting decimal number",
                      "type": "Number"
                    }
                  ]
                }
              ]
            }
          },
          "undefined": {
            "undefined": {
              "description": "Reset current group after timeout to last group without timeout."
            }
          }
        }
      }
    },
    "distributor": {
      "name": "distributor",
      "caption": "Power distributors",
      "readme": "TBD\n\nThis component defines basic power distributor entry kinds. By\nconfiguring entries of these kinds, it is possible to define the\npower distributor configuration and behaviour.",
      "file": "lib/flowMeter/index.js",
      "line": 13,
      "aliases": "powerDistributor",
      "modules": {
        "lib/din": {
          "name": "lib/din",
          "type": "kind",
          "super": "ose/lib.kind",
          "caption": "Digital input pin kind",
          "readme": "Kind defining digital input entries\n\nThe `din` entry connects to the controller by creating a [link] to\nthe master controller pin.  The `sval` of the `din` entry then\nchanges with the state of the physical pin on the controller side.",
          "file": "lib/din/index.js",
          "schema": "control",
          "kind": "din",
          "property": {
            "dval.master": {
              "name": "dval.master",
              "type": "property",
              "dtype": "String | Object",
              "description": "Identification of entry representing a controller"
            },
            "dval.pin": {
              "name": "dval.pin",
              "type": "property",
              "dtype": "String",
              "description": "The pin index of the corresponding pin on the controller."
            }
          }
        },
        "lib/distributor": {
          "name": "lib/distributor",
          "type": "kind",
          "super": "ose/lib.kind",
          "caption": "Power distributor kind",
          "readme": "TBD\n\n[Entry kind] defining behaviour of power distributors.",
          "file": "lib/distributor/index.js",
          "schema": "control",
          "kind": "distributor"
        },
        "lib/flowMeter": {
          "name": "lib/flowMeter",
          "type": "kind",
          "super": "ose/lib.kind",
          "caption": "Flow meter kind",
          "readme": "Kind defining flow meters of liquids or gasses.\n\nEach entry of this kind established a new [link] to the master by\nsending a `registerPin()` command with `type: \"din\"`, `flavour:\n\"counter\"` and a client socket. The `sval.value` of the entry then\nincrements with each master pin change. State changes are debounced\nusing the `sval.debounce` value.",
          "file": "lib/flowMeter/index.js",
          "schema": "control",
          "kind": "flowMeter"
        }
      }
    },
    "pin": {
      "name": "pin",
      "caption": "Pins",
      "readme": "This component allows to simply define an [entry kind] describing\nsome type of controller with individual physical or logical\npins, such as a [Raspberry Pi] with its GPIO pins.\n\nFor each entry of the Raspberry Pi [entry kind], a new [pin list]\nis created. The [pin list] constructor receives an entry\nrepresenting a Raspberry Pi, a list of pin types and a list of pins\nthat can be controlled.\n\nEach Raspberry Pi entry is then ready to receive `registerPin` commands.\n\nAn example [entry kind] that establishes a link to a Raspberry Pi\nentry is the [switch kind]. After it is created, each entry of the\n[switch kind] sends a `registerPin` command with a new client\nsocket to the controller entry defined by `entry.dval.master`.\n\nBased on this request, a new response socket controlling a\nrequested pin is created and set up by the Raspberry Pi entry. As a\nresponse to the `registerPin` command, the current state of the\ngiven switch is sent to the `open()` handler of the corresponding\nclient socket.\n\nEach time a physical pin changes its state, the `press` or\n`release` commands of the client socket are invoked.\n\nThe [light entry kind] or [heater entry kind], for example, are\nimplemented in a similar way",
      "file": "lib/pin/tri.js",
      "line": 11,
      "aliases": "pinFlavour",
      "description": "## Communication\n\nCommunication between a client and a controller consists of the\nfollowing steps:\n\n1. Define a [client socket] with `update()` handler.\n\n2. Send `registerPin` [command] with request containing pin index,\n   pin type, optional [pin flavour],  configuration data and a\n   client socket instance.\n\n3. On the controller side, a new response socket is created and\n   registered by a controllers entry, and the [link] is\n   established.\n\n4. On the client side, the `open()` client socket handler is\n   invoked.\n\nNow it is possible to send `write()` requests from the client side\nto change the physical or logical pin state of the controller. The\nresponse socket calls the client's `update()` handler when a pin\nvalue change is detected. Each pin can register only one active\n[link] at a time.\n\n\n## How to use pins\n\nTo create new entry kind describing some type of controller, follow\nthese steps:\n\n1. Define a new [entry kind].\n\n2. Define the `read()`, `write()`, `setup()` and `release()`\n   methods for each pin type of the controller.\n\n3. Define a list of pins with their capabilities.\n\n4. Create a [pin list] instance for each entry in the `homeInit()`\n   method of the given [entry kind].\n\nThis can be used to easily integrate, for example, Arduino boards\nor other controllers into the OSE ecosystem. If you wish to put\nyour effort into this challenge, don't hesitate to contact us via\n[GitHub](https://github.com/OpenSmartEnvironment) for support.\n\n\n## Pin types\n\nEvery pin has assigned a pin type, defined by the controller. The\ntype defines the `read()` and `write()` methods to read or update\nthe value of a physical pin on the controller. Each pin type can\nhave the `setup()` method that is called during the pin is\nregistered and te `release()` method called when the link to the\npin is disconnected.\n\nThe Raspberry Pi entry kind, for example, defines the `din` and\n`dout` pin types. Both these types have the `setup()` method that\nsets up a Gpio class instance from the\n[onoff](https://www.npmjs.org/package/onoff) npm package for each\nregistered pin to read or write the pin's value.\n\nThere are following pre-defined pin types:\n- Digital input\n- Digital output\n- PWM\n\n\n## Pin flavours\n\nCommunication between a pin and a client can be changed using pin\nflavours. At registration time, the client can send a flavour value\nwith the `registerPin` request command. A new socket is created\nbased on `pin.flavour || pin.type`. Each flavour class is a\ndescendant of the [pin response socket] class.\n\nOne example is the `switch` flavour. Client sockets connected to\nstandard pins receive `update` messages, but client sockets\nconnected to pins of the `switch` flavour receive `press`,\n`release`, `tap` and `hold` messages instead.\n\nThe following pin flavours are currently predefined:\n- Counter\n- Light\n- Switch\n\n\n## Dummy pins\nTODO",
      "modules": {
        "lib/din/pin": {
          "name": "lib/din/pin",
          "type": "class",
          "caption": "Digital input-to-controller pin client socket",
          "readme": "Client socket connecting to a controller pin. Updates digital input\nentry sval.",
          "file": "lib/din/pin.js",
          "handler": {
            "update": {
              "name": "update",
              "type": "handler",
              "description": "Update handler called when the state of a pin changes on\nthe controller",
              "params": [
                {
                  "name": "req",
                  "description": "Update request data",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/pin/din": {
          "name": "lib/pin/din",
          "type": "extend",
          "caption": "Digital input pin response socket",
          "readme": "Setup of digital input pin.",
          "file": "lib/pin/din.js",
          "method": {
            "update": {
              "name": "update",
              "type": "method",
              "description": "Called on change of physical pin state",
              "params": [
                {
                  "name": "val",
                  "description": "New value",
                  "type": "Number"
                }
              ],
              "internal": true
            }
          }
        },
        "lib/pin/client": {
          "name": "lib/pin/client",
          "type": "class",
          "caption": "Pin entry client socket",
          "readme": "Client socket connecting to a controller pin. Updates entry sval.",
          "file": "lib/pin/client.js",
          "undefined": {
            "undefined": {
              "description": "Pin client socket constructor",
              "params": [
                {
                  "name": "entry",
                  "description": "[Entry] to be notified about pin changes",
                  "type": "Object"
                },
                {
                  "name": "type",
                  "description": "Controller [pin type]",
                  "type": "String"
                },
                {
                  "name": "flavour]  [Pin flavour",
                  "description": "",
                  "type": "String",
                  "optional": true
                },
                {
                  "name": "prefix",
                  "description": "Entry pin name prefix",
                  "type": "String",
                  "optional": true
                }
              ]
            }
          }
        },
        "lib/pin/commands": {
          "name": "lib/pin/commands",
          "type": "extend",
          "caption": "Pin list commands",
          "readme": "Commands that are registered on [entry kinds] creating a list of\npins for their [entries].",
          "file": "lib/pin/commands.js",
          "handler": {
            "registerPin": {
              "name": "registerPin",
              "type": "handler",
              "description": "Register pin",
              "params": [
                {
                  "name": "req",
                  "description": "Client request",
                  "type": "Object",
                  "props": [
                    {
                      "name": "index",
                      "description": "Pin index",
                      "type": "Number|String"
                    },
                    {
                      "name": "type",
                      "description": "[Pin type]",
                      "type": "String"
                    },
                    {
                      "name": "flavour]  [Pin flavour",
                      "description": "",
                      "type": "String",
                      "optional": true
                    },
                    {
                      "name": "caption",
                      "description": "Pin caption",
                      "type": "String",
                      "optional": true
                    },
                    {
                      "name": "entry",
                      "description": "Client entry identification",
                      "type": "Object",
                      "optional": true
                    },
                    {
                      "name": "path",
                      "description": "Path to requested flavour class",
                      "type": "String",
                      "optional": true
                    }
                  ]
                },
                {
                  "name": "socket",
                  "description": "Slave socket",
                  "type": "Object"
                }
              ]
            },
            "emulatePin": {
              "name": "emulatePin",
              "type": "handler",
              "description": "Emulates change of pin state on the controller",
              "params": [
                {
                  "name": "req",
                  "description": "Client request",
                  "type": "Object",
                  "props": [
                    {
                      "name": "index",
                      "description": "Pin index",
                      "type": "Number|Object"
                    },
                    {
                      "name": "value",
                      "description": "Requested value",
                      "type": "Number"
                    }
                  ]
                },
                {
                  "name": "socket",
                  "description": ""
                }
              ]
            },
            "writePin": {
              "name": "writePin",
              "type": "handler",
              "description": "Changes physical pin state",
              "params": [
                {
                  "name": "req",
                  "description": "Client request",
                  "type": "Object",
                  "props": [
                    {
                      "name": "index",
                      "description": "Pin index",
                      "type": "Number|Object"
                    },
                    {
                      "name": "value",
                      "description": "Requested value",
                      "type": "Number"
                    }
                  ]
                },
                {
                  "name": "socket",
                  "description": "",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/pin/dout": {
          "name": "lib/pin/dout",
          "type": "extend",
          "caption": "Digital output pin response socket",
          "readme": "Setup of digital output pin.",
          "file": "lib/pin/dout.js",
          "handler": {
            "write": {
              "name": "write",
              "type": "handler",
              "description": "Change pin state",
              "params": [
                {
                  "name": "req",
                  "description": "Requested value of a pin",
                  "type": "Number|Boolean"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/pin": {
          "name": "lib/pin",
          "type": "class",
          "caption": "Pin response socket",
          "readme": "Response socket representing a pin which handles communication with\na client.",
          "file": "lib/pin/index.js",
          "aliases": "controllerPin",
          "property": {
            "caption": {
              "name": "caption",
              "type": "property",
              "dtype": "String",
              "description": "Caption sent by client request"
            },
            "path": {
              "name": "path",
              "type": "property",
              "dtype": "String",
              "description": "Path to flavour class"
            },
            "pins": {
              "name": "pins",
              "type": "property",
              "dtype": "Object",
              "description": "Owning [pin list] reference"
            },
            "index": {
              "name": "index",
              "type": "property",
              "dtype": "String",
              "description": "Pin index\n\nPin index of a controller entry.",
              "aliases": "pinIndex"
            },
            "type": {
              "name": "type",
              "type": "property",
              "dtype": "Object",
              "description": "Pin type\n\nPin type reference defined by controller entry",
              "aliases": "pinType pinTypes"
            },
            "flavour": {
              "name": "flavour",
              "type": "property",
              "dtype": "String",
              "description": "Pin flavour\n\nPin flavour name",
              "aliases": "pinFlavour pinFlavours"
            },
            "caps": {
              "name": "caps",
              "type": "property",
              "dtype": "Object",
              "description": "Pin capabilities reference.\n\nPin capabilities are defined by the controller entry for each pin\nand pin type."
            }
          },
          "method": {
            "init": {
              "name": "init",
              "type": "method",
              "description": "Response pin socket initialization method (can be overwritten by\ndescendant flavours)",
              "params": [
                {
                  "name": "pins",
                  "description": "[Pin list]",
                  "type": "Object"
                },
                {
                  "name": "req",
                  "description": "Pin register request",
                  "type": "Object"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object"
                }
              ]
            },
            "setupDummy": {
              "name": "setupDummy",
              "type": "method",
              "description": "Set up dummy pin\n\nCan't be asynchronous\nCan be overridden by flavour",
              "params": [
                {
                  "name": "req",
                  "description": "Client request",
                  "type": "Object"
                },
                {
                  "name": "resp",
                  "description": "Prepared response to client request",
                  "type": "Object"
                },
                {
                  "name": "state",
                  "description": "Prepared state object",
                  "type": "Object"
                }
              ],
              "internal": true
            },
            "setup": {
              "name": "setup",
              "type": "method",
              "description": "Set up physical pin\n\nOn success, `cb()` gets called with current pin value.",
              "params": [
                {
                  "name": "req",
                  "description": "Client request",
                  "type": "Object"
                },
                {
                  "name": "resp",
                  "description": "Prepared response to client request",
                  "type": "Object"
                },
                {
                  "name": "state",
                  "description": "Prepared sval patch object",
                  "type": "Object"
                },
                {
                  "name": "cb",
                  "description": "Callback to be called after pin setup",
                  "type": "Function"
                }
              ],
              "internal": true
            },
            "update": {
              "name": "update",
              "type": "method",
              "description": "Called on change of physical pin state",
              "params": [
                {
                  "name": "val",
                  "description": "New value",
                  "type": "Number"
                }
              ],
              "internal": true
            }
          }
        },
        "lib/pin/light": {
          "name": "lib/pin/light",
          "type": "extend",
          "caption": "Light pin flavour response socket",
          "readme": "Flavour controlling pins to which one light channel is connected as\na client. This flavour allows smooth light dimming.",
          "file": "lib/pin/light.js",
          "method": {
            "write": {
              "name": "write",
              "type": "method",
              "description": "Set state of light channel connected to the pin controlled by this socket",
              "params": [
                {
                  "name": "req",
                  "description": "Requested parameters or value",
                  "type": "Object|Number",
                  "props": [
                    {
                      "name": "value",
                      "description": "Final requested value",
                      "type": "Number",
                      "optional": true
                    },
                    {
                      "name": "speed",
                      "description": "Dimming speed in milliseconds",
                      "type": "Number",
                      "optional": true
                    }
                  ]
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object"
                }
              ]
            }
          },
          "undefined": {
            "undefined": {
              "description": "Transform val before sending to a light."
            }
          }
        },
        "lib/pin/list": {
          "name": "lib/pin/list",
          "type": "class",
          "caption": "Pin List",
          "readme": "List of pins registered in the owning entry.",
          "file": "lib/pin/list.js",
          "property": {
            "dummy": {
              "name": "dummy",
              "type": "property",
              "dtype": "Boolean",
              "description": "If `dummy` is truish, states of physical pins are not changed"
            },
            "entry": {
              "name": "entry",
              "type": "property",
              "dtype": "Object",
              "description": "Controller entry"
            },
            "pins": {
              "name": "pins",
              "type": "property",
              "dtype": "Object",
              "description": "List of connected sockets to individual pins"
            },
            "types": {
              "name": "types",
              "type": "property",
              "dtype": "Object",
              "description": "List of pin types"
            },
            "caps": {
              "name": "caps",
              "type": "property",
              "dtype": "Object",
              "description": "List of available pins with their capabilities"
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Constructor",
              "params": [
                {
                  "name": "entry",
                  "description": "Controller entry",
                  "type": "Object"
                },
                {
                  "name": "types",
                  "description": "List of pin types",
                  "type": "Object"
                },
                {
                  "name": "caps",
                  "description": "List of all pins with their capabilities",
                  "type": "Object"
                },
                {
                  "name": "dummy",
                  "description": "If `dummy` is truish, states of physical pins are not changed",
                  "type": "Boolean"
                }
              ]
            },
            "toString": {
              "name": "toString",
              "type": "method",
              "description": "Return short description"
            },
            "cleanup": {
              "name": "cleanup",
              "type": "method",
              "description": "Called when this object is destroyed",
              "internal": true
            },
            "readAll": {
              "name": "readAll",
              "type": "method",
              "description": "Read values of all registered pins"
            }
          }
        },
        "lib/pin/pwm": {
          "name": "lib/pin/pwm",
          "type": "module",
          "caption": "PWM pin type response socket",
          "readme": "PWM pin type",
          "file": "lib/pin/pwm.js"
        },
        "lib/pin/switch": {
          "name": "lib/pin/switch",
          "type": "extend",
          "caption": "Switch pin flavour response socket",
          "readme": "Processes pin changes and calls `link.press()`, `link.release()`,\n`link.tap(count)` or `link.hold()` instead of `link.update()`.",
          "file": "lib/pin/switch.js"
        },
        "lib/pin/tri": {
          "name": "lib/pin/tri",
          "type": "extend",
          "caption": "Digital tri-state output pin response socket",
          "file": "lib/pin/tri.js",
          "handler": {
            "write": {
              "name": "write",
              "type": "handler",
              "description": "Change pin state",
              "params": [
                {
                  "name": "req",
                  "description": "Requested value of a pin",
                  "type": "Number|Boolean"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
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
    "lib/ippool": {
      "name": "lib/ippool",
      "type": "kind",
      "super": "ose/lib.kind",
      "caption": "IP pool kind",
      "readme": "IP address pool. Respond to \"getIp\" commands by providing a new IP\naddress from a pool defined by the `dval.start` .. `dval.end`\ninterval. Used by the [ose-dvb] package to assign multicast group\naddresses to DVB channels.",
      "file": "lib/ippool/index.js",
      "schema": "control",
      "kind": "ippool",
      "handler": {
        "getIp": {
          "name": "getIp",
          "type": "handler",
          "description": "Handler for getIp commands",
          "params": [
            {
              "name": "req",
              "description": "Request",
              "type": "Undefined"
            },
            {
              "name": "socket",
              "description": "Client socket",
              "type": "Object"
            }
          ]
        }
      }
    },
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "Control core",
      "readme": "Core singleton of ose-control npm package. Register [entry kinds]\ndefined by this package to the `\"control\"` [schema].",
      "file": "lib/index.js"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "Control content",
      "readme": "Provides files of [ose-control] package to the browser.",
      "file": "content.js"
    }
  }
};