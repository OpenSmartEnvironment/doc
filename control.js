Packages["control"] = {
  "name": "control",
  "npmname": "ose-control",
  "caption": "Control",
  "readme": "This package contains definitions of general [kinds of entries]\nthat represent real objects found in most environments (lights,\nswitches, heaters, sensors etc.). Entries are configured by\ndefining `entry.data` values. Communication between or among\nentries is realized via [links].",
  "file": "content.js",
  "line": 12,
  "features": "",
  "comps": {
    "distributor": {
      "name": "distributor",
      "caption": "Power distributors",
      "readme": "This component defines basic power distributor entry kinds. By\nconfiguring entries of these kinds, it is possible to define the\npower distributor configuration and behaviour.",
      "file": "lib/flowMeter/index.js",
      "line": 11,
      "aliases": "powerDistributor",
      "modules": {
        "lib/din": {
          "name": "lib/din",
          "type": "singleton",
          "super": "ose/lib.kind",
          "caption": "Digital input pin kind",
          "readme": "Kind defining digital input entries\n\nThe `din` entry connects to the controller by sending a\n`registerPin()` command with a client socket. The state of the\n`din` entry then changes with the state of the physical pin on the\ncontroller side.",
          "file": "lib/din/index.js",
          "property": {
            "data": {
              "name": "data",
              "type": "property",
              "dtype": "Object",
              "description": "Entry data object"
            },
            "data.master": {
              "name": "data.master",
              "type": "property",
              "dtype": "String | Object",
              "description": "Identification of entry representing a physical device."
            },
            "data.pin": {
              "name": "data.pin",
              "type": "property",
              "dtype": "String",
              "description": "The pin index of the corresponding pin on the controller."
            }
          }
        },
        "lib/distributor": {
          "name": "lib/distributor",
          "type": "class",
          "super": "ose/lib.kind",
          "caption": "Power distributor kind",
          "readme": "[Entry kind] defining power behaviour of distributors.",
          "file": "lib/distributor/index.js"
        },
        "lib/flowMeter": {
          "name": "lib/flowMeter",
          "type": "class",
          "super": "ose/lib.kind",
          "caption": "Flow meter kind",
          "readme": "Kind defining flow meters of liquids or gasses.\n\nEach entry of this kind established a new [link] to the master by\nsending a `registerPin()` command with `type: \"din\"`, `flavour:\n\"counter\"` and a client socket. The `state.value` of the entry then\nincrements with each master pin change. State changes are debounced\nusing the `state.debounce` value.",
          "file": "lib/flowMeter/index.js"
        }
      }
    },
    "pin": {
      "name": "pin",
      "caption": "Pins",
      "readme": "This component allows to simply define an [entry kind] describing\nsome type of controller with individual physical or logical\npins, such as a [Raspberry Pi] with its GPIO pins.\n\nEach entry of a kind using this component can establish [links] to\nindividual pins. An example [entry kind] that establishes a link to a\ncontroller switching some physical pin is the [heater].\n\nCommunication between a client and a controller consists of the\nfollowing steps:\n\n1. Define a [client socket] class with `update()` handler.\n2. Send `registerPin` [command] with request containing pin\n   index, pin type, optional configuration data and a client\n   socket instance.\n3. On the controller side, a new response socket is created and\n   registered by a controllers entry [pin list], and the [link] is\n   established.\n4. On the client side, the `open()` client socket handler is\n   invoked.\n\nNow it is possible to send `read()` or `update()` requests from the\nclient side to read or change the physical or logical pin state of\nthe controller. The response socket calls the client's `update()`\nhandler when a pin value change is detected. Each pin can register\nonly one active [link] at a time.\n\nTo create new entry kind describing some type of controller, follow\nthese steps:\n\n1. Define a new [entry kind].\n2. Define the `read()`, `write()` and `setup()` methods for each\n   pin type of the controller.\n3. Define list of pins describing which pin can be of which type.\n4. Create [pin list] instance for each entry in `homeInit()` method\n   of such kind.\n\nThis can be used to easily integrate, for example, Arduino boards\nor other controllers into the OSE ecosystem. If someone wants to\nput his effort into this challenge, don't hesitate to contact us\nvia [GitHub](https://github.com/OpenSmartEnvironment) for support.",
      "file": "lib/pin/switch.js",
      "line": 10,
      "description": "## Pin types\n\nEvery pin has assigned a pin type, defined by the controller. Type\ndefines the `read()` and `write()` methods to read or update the\nvalue of a physical pin on the controller. Pin type can have the\n`setup()` method that is called during the pin is registered.\n\nThe Raspberry Pi entry kind, for example, defines the `din` and\n`dout` pin types. Both these types have the `setup()` method that\nsets up a Gpio class instance from the\n[onoff](https://www.npmjs.org/package/onoff) npm package for each\nregistered pin to read or write the pin's value.\n\nThere are following pre-defined pin types:\n- Digital input\n- Digital output\n- PWM\n\n## Flavours\n\nCommunication between a pin and a client can be changed using pin\nflavours.  At registration time, the client can send a flavour\nvalue with the `registerPin` request command.\n\nThere are following predefined pin flavours:\n- Counter\n- Light\n- Switch\n\nExamples are a [switch entry] that registers to the master's pin\nwith `flavour: 'switch'` or a [light entry] that registers each\nchannel with `flavour: 'light'`.",
      "modules": {
        "lib/din/pin": {
          "name": "lib/din/pin",
          "type": "class",
          "caption": "Digital input-to-controller pin client socket",
          "readme": "Client socket connecting to a physical device pin. Updates digital\ninput entry state.",
          "file": "lib/din/pin.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Class constructor",
              "params": [
                {
                  "name": "entry",
                  "description": "Digital input entry",
                  "type": "Object"
                }
              ]
            },
            "end": {
              "name": "end",
              "type": "method",
              "description": "Broken link handler"
            },
            "sync": {
              "name": "sync",
              "type": "method",
              "description": "Sync handler"
            },
            "update": {
              "name": "update",
              "type": "method",
              "description": "Update handler called when the state of a physical pin changes on\nthe master side",
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
        "lib/pin/commands": {
          "name": "lib/pin/commands",
          "type": "extend",
          "caption": "Pin list commands",
          "readme": "Commands that are registered on [entry kinds] creating a list of\npins for their [entries].",
          "file": "lib/pin/commands.js",
          "method": {
            "registerPin": {
              "name": "registerPin",
              "type": "method",
              "description": "[Command handler]",
              "params": [
                {
                  "name": "req",
                  "description": "Request relayed to [pin list] `register`",
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
        "lib/pin/counter": {
          "name": "lib/pin/counter",
          "type": "extend",
          "caption": "Counter pin flavour",
          "readme": "Setup of a digital input pin acting as a counter. When a pin\nchanges its value to 1, the counter increments. `link.update()` is\nsent throttled by a timeout defined in the request or the default\ntimeout of 1 second.\n\nThis pin flavour can be used, for example, by a gas or liquid flow\nmeter.",
          "file": "lib/pin/counter.js"
        },
        "lib/pin/din": {
          "name": "lib/pin/din",
          "type": "extend",
          "caption": "Digital input pin type",
          "readme": "Setup of digital input pin.",
          "file": "lib/pin/din.js"
        },
        "lib/pin/dout": {
          "name": "lib/pin/dout",
          "type": "extend",
          "caption": "Digital output pin type",
          "readme": "Setup of digital output pin.",
          "file": "lib/pin/dout.js"
        },
        "lib/pin": {
          "name": "lib/pin",
          "type": "class",
          "caption": "Pin response socket",
          "readme": "Response socket representing one pin that handles the communication\nwith a client.",
          "file": "lib/pin/index.js",
          "aliases": "controllerPin",
          "property": {
            "index": {
              "name": "index",
              "type": "property",
              "dtype": "String",
              "description": "Pin index\n\nPin index within master [entry]",
              "aliases": "pinIndex"
            },
            "type": {
              "name": "type",
              "type": "property",
              "dtype": "Object",
              "description": "Pin type\n\nPin type reference",
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
              "description": "Pin capabilities reference.\n\nPin capabilities are defined by the master entry for each pin and\npin type."
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Class constructor",
              "params": [
                {
                  "name": "pins",
                  "description": "[Pin list]",
                  "type": "Object"
                },
                {
                  "name": "index",
                  "description": "Pin index",
                  "type": "String"
                },
                {
                  "name": "type",
                  "description": "Pin type",
                  "type": "Object"
                },
                {
                  "name": "caps",
                  "description": "Pin capabilities",
                  "type": "Object"
                }
              ]
            },
            "close": {
              "name": "close",
              "type": "method",
              "description": "Close handler"
            },
            "error": {
              "name": "error",
              "type": "method",
              "description": "Error handler",
              "params": [
                {
                  "name": "err",
                  "description": "[Error] object",
                  "type": "Object"
                }
              ]
            },
            "read": {
              "name": "read",
              "type": "method",
              "description": "Read request handler",
              "params": [
                {
                  "name": "req",
                  "description": "Request data",
                  "type": "Object"
                },
                {
                  "name": "socket",
                  "description": "Optional response socket only for this\n  request. After the read request is processed, `socket.close()` is\n  invoked with the response. Pin changes are always sent to the\n  client by a `link.update()` call.",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "update": {
              "name": "update",
              "type": "method",
              "description": "Update request handler, calls `this.type.write()` to change\nphysical pin value.  This method can be overridden by individual pin\nflavours.",
              "params": [
                {
                  "name": "req",
                  "description": "Request data",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/pin/light": {
          "name": "lib/pin/light",
          "type": "extend",
          "caption": "Light pin flavour",
          "readme": "Flavour controlling pins to which one light channel is connected as\na slave. This flavour allows smooth light dimming.",
          "file": "lib/pin/light.js",
          "undefined": {
            "undefined": {
              "description": "Transform value before sending to a light."
            }
          }
        },
        "lib/pin/list": {
          "name": "lib/pin/list",
          "type": "class",
          "caption": "Pin List",
          "readme": "List of pins registered to the owning entry.",
          "file": "lib/pin/list.js",
          "property": {
            "master": {
              "name": "master",
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
            "pinCaps": {
              "name": "pinCaps",
              "type": "property",
              "dtype": "Object",
              "description": "List of available pins with their capabilities"
            }
          },
          "method": {
            "init": {
              "name": "init",
              "type": "method",
              "description": "Constructor",
              "params": [
                {
                  "name": "master",
                  "description": "Controller entry",
                  "type": "Object"
                },
                {
                  "name": "types",
                  "description": "List of pin types",
                  "type": "Object"
                },
                {
                  "name": "pins",
                  "description": "List of pins",
                  "type": "Object"
                }
              ]
            },
            "register": {
              "name": "register",
              "type": "method",
              "description": "Register a pin.",
              "params": [
                {
                  "name": "req",
                  "description": "TODO request",
                  "type": "Object",
                  "props": [
                    {
                      "name": "index",
                      "description": "Index of pin to be registered",
                      "type": "String"
                    },
                    {
                      "name": "type",
                      "description": "Pin type",
                      "type": "String"
                    },
                    {
                      "name": "flavour",
                      "description": "Pin flavour",
                      "type": "String"
                    }
                  ]
                },
                {
                  "name": "socket",
                  "description": "TODO socket",
                  "type": "Object"
                }
              ]
            },
            "remove": {
              "name": "remove",
              "type": "method",
              "description": "Removes pin",
              "params": [
                {
                  "name": "Pin",
                  "description": "to be removed",
                  "type": "Object"
                }
              ]
            },
            "update": {
              "name": "update",
              "type": "method",
              "description": "Called from master entry (device), when a pin value change is\ndetected",
              "params": [
                {
                  "name": "index",
                  "description": "Index of pin to be updated",
                  "type": "String"
                },
                {
                  "name": "value",
                  "description": "Value of physical pin",
                  "type": "Number"
                }
              ]
            },
            "readAll": {
              "name": "readAll",
              "type": "method",
              "description": "Read raw values of all registered pins"
            }
          }
        },
        "lib/pin/pwm": {
          "name": "lib/pin/pwm",
          "type": "module",
          "caption": "PWM pin type",
          "readme": "PWM pin type",
          "file": "lib/pin/pwm.js"
        },
        "lib/pin/switch": {
          "name": "lib/pin/switch",
          "type": "extend",
          "caption": "Switch pin flavour",
          "readme": "Processes pin changes and calls `link.press()`, `link.release()`,\n`link.tap(count)` or `link.hold()` instead of `link.update()`.",
          "file": "lib/pin/switch.js"
        }
      }
    },
    "room": {
      "name": "room",
      "caption": "Rooms",
      "readme": "This component defines basic room entry kinds. By configuring\nentries of these kinds, it is possible to define an indoor\nenvironment and its behaviour.\n\nFor a simple example of how to control a light using a switch, see\nthe [Raspberry Pi example].",
      "file": "lib/activity.js",
      "line": 12,
      "description": "## Description\nEach light channel can be controlled either through a digital\noutput pin or a pin supporting PWM. Smooth changes of light\nintensity can be controlled through the `speed` value, which\ndefines the time in milliseconds it takes change the light\nintensity from 0 to 100% or vice versa.\n\nEach light supports auto-off timeout since last change with\nconfigurable dim speed.\n\nEvery light can be controlled by a [switch entry] with the\nfollowing behaviour:\n- One tap when shining: Switch the light off.\n- One tap when off: Switch to the default configurable value.\n- Two taps: Switch the light fully on.\n- Hold: Switch the light off.",
      "modules": {
        "lib/door": {
          "name": "lib/door",
          "type": "class",
          "super": "ose/lib.kind",
          "caption": "Door kind",
          "readme": "Each [entry] of this kind establishes a [link] to the `data.master`\ncontroller entry with `type: \"din\"`. Entry state is changed\ndepending on the incoming data, and the `open` or `close` events\nare fired. These events can be listened for, and appropriate\nactions can be taken.",
          "file": "lib/door/index.js",
          "aliases": "door doors doorEntry",
          "property": {
            "data.master": {
              "name": "data.master",
              "type": "property",
              "dtype": "String | Object",
              "description": "Controller entry identification object.\n\nThe switch entry establishes a new link to this controller."
            },
            "data.pin": {
              "name": "data.pin",
              "type": "property",
              "dtype": "String",
              "description": "Master pin index\n\nIndex of digital input pin on the master controller"
            },
            "data.debounce": {
              "name": "data.debounce",
              "type": "property",
              "dtype": "Number",
              "description": "Debounce timeout\n\nDefines debounce timeout of the digital input in milliseconds.\n\nThe default value is `M.consts.switchDebounce`."
            },
            "state.value": {
              "name": "state.value",
              "type": "property",
              "dtype": "Number (0, 1)",
              "description": "Current switch state value"
            },
            "state.at": {
              "name": "state.at",
              "type": "property",
              "dtype": "Number",
              "description": "Timestamp of the last switch change."
            },
            "state.debounce": {
              "name": "state.debounce",
              "type": "property",
              "dtype": "Number",
              "description": "Debounce timeout\n\nDefines debounce timeout of the digital input in milliseconds. The\nvalue is taken from `data.debounce`."
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
          "readme": "Establishes a link to the `data.master` controller pin `data.pin`\nwith `type: \"din\"`. The controller can be a [Raspberry Pi] or [OSE\nMain board], for example.",
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
            "sync": {
              "name": "sync",
              "type": "method",
              "description": "Sync handler",
              "params": [
                {
                  "name": "req",
                  "description": "Request data",
                  "type": "*"
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
          "type": "class",
          "super": "ose/lib.kind",
          "caption": "Heater kind",
          "readme": "[Entry kind] defining behaviour of heaters. Each heater establishes\na [link] to the `data.master` entry with a `registerPin()`\n[command] and to an optional `data.tariff` entry to watch low and\nhigh tariff switching.",
          "file": "lib/heater/index.js",
          "aliases": "heater heaters heaterEntry",
          "property": {
            "data.master": {
              "name": "data.master",
              "type": "property",
              "dtype": "String | Object",
              "description": "Controller entry identification object.\n\nThe heater entry establishes a new link to the controller."
            },
            "data.pin": {
              "name": "data.pin",
              "type": "property",
              "dtype": "String",
              "description": "Master pin index\n\nIndex of digital input pin on the master controller"
            },
            "data.tariff": {
              "name": "data.tariff",
              "type": "property",
              "dtype": "String | Object",
              "description": "Tariff entry identification object.\n\nIf specified, the heater establishes a new link to the\n`data.tariff` entry and gets controlled by it."
            }
          },
          "method": {
            "power": {
              "name": "power",
              "type": "method",
              "description": "Command handler. Sets up heater power to specified value.",
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
          "readme": "Establishes a [link] to the `data.master` [controller pin]\n`data.pin` with `type: \"dout\"`. The master can be a [Raspberry Pi]\nor [OSE Main board], for example.",
          "file": "lib/heater/pin.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor"
            },
            "end": {
              "name": "end",
              "type": "method",
              "description": "Broken link handler",
              "params": [
                {
                  "name": "err",
                  "description": "[Error] instance",
                  "type": "Object"
                },
                {
                  "name": "resp",
                  "description": "Response data",
                  "type": "Object"
                }
              ]
            },
            "sync": {
              "name": "sync",
              "type": "method",
              "description": "Sync handler",
              "params": [
                {
                  "name": "value",
                  "description": "",
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
          "readme": "Establishes a link to the `data.tariff` entry.",
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
            },
            "open": {
              "name": "open",
              "type": "method",
              "description": "Open handler",
              "params": [
                {
                  "name": "req",
                  "description": "Open request",
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
                  "description": "Request data",
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
        "lib/light": {
          "name": "lib/light",
          "type": "class",
          "super": "ose/lib.kind",
          "caption": "Light kind",
          "readme": "[Entry kind] defining behaviour of lights. Each light consists of\nchannels. Each channel is controlled by some `master`\ncontroller. It is possible to use dimming when the controller\nsupports it. This component allows to easily create lights composed\nof LED strips that can smoothly change the colour and intensity,\nand do any other effects.",
          "file": "lib/light/index.js",
          "aliases": "light lights lightEntry",
          "description": "## Description\nEach light channel can be controlled either through a digital\noutput pin or a pin supporting PWM. Smooth changes of light\nintensity can be controlled through the `speed` value, which\ndefines the time in milliseconds it takes change the light\nintensity from 0 to 100% or vice versa.\n\nEach light supports auto-off timeout since last change with\nconfigurable dim speed.\n\nEvery light can be controlled by a [switch entry] with the\nfollowing behaviour:\n- One tap when shining: Switch the light off.\n- One tap when off: Switch to the default configurable value.\n- Two taps: Switch the light fully on.\n- Hold: Switch the light off.",
          "property": {
            "data.channels": {
              "name": "data.channels",
              "type": "property",
              "dtype": "Object",
              "description": "Light channels\n\nA light entry can consist of one or more channels. An example light\ncan have 3 LED strips (warm white, cold white and RGB). The entry\ndescribing such a light consists of 5 independently controllable\nchannels (warm, cold, red, green and blue).\n\nEach property of `data.channels` is one channel. The key is a\nchannel name and the value is the pin index on the `data.master`\ncontroller."
            },
            "data.master": {
              "name": "data.master",
              "type": "property",
              "dtype": "String | Object",
              "description": "Controller entry identification object.\n\nThe light entry establishes a new link to the controller."
            },
            "data.main": {
              "name": "data.main",
              "type": "property",
              "dtype": "Object",
              "description": "Each property of this object defines one profile of the\nlight. There are predefined profiles `\"off\"`, `\"on\"` and `\"full\"`.\n\nDefault values are:\n- `\"off\": 0`\n- `\"on\": M.consts.lightDefaultOn`\n- `\"full\": 1`"
            },
            "data.switch": {
              "name": "data.switch",
              "type": "property",
              "dtype": "String | Object",
              "description": "Switch entry identification object.\n\nIf specified, the light establishes a new link to a switch and gets\ncontrolled by it."
            },
            "data.autoOff": {
              "name": "data.autoOff",
              "type": "property",
              "dtype": "Boolean | Number | Object",
              "description": "Auto off value\n\nDefines how long the light will wait before it starts dimming and\nthe speed of the dimming. The auto off timer is enabled each time\nany light channel is changed.\n\nThe value can be one of the following:\n- `true`: Enable auto off with default values\n- `false`: Disable auto off\n- Number: Wait timeout in seconds\n- Object: `{wait: <seconds>, speed: <milliseconds>}`\n\nDefault values:\n- `data.autoOff.wait: M.consts.lightAutoOffWait`\n- `data.autoOff.speed: M.consts.lightAutoOffSpeed`"
            }
          },
          "method": {
            "profile": {
              "name": "profile",
              "type": "method",
              "description": "[Command handler].\n\nSets light profile.",
              "params": [
                {
                  "name": "req",
                  "description": "Sets the light to the value specified. Simple profile name can be specified.",
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
            "switch": {
              "name": "switch",
              "type": "method",
              "description": "[Command handler].\n\nSwitch between on or off profiles.",
              "params": [
                {
                  "name": "req",
                  "description": "Sets the light to the value specified. If `req` is not an object `req` is replaced with `{type: req, speed: M.consts.lightDimSpeed}`",
                  "type": "Object",
                  "props": [
                    {
                      "name": "type",
                      "description": "\n- `false`: Switch all channels off\n- `true`: Switch all channels to profile \"on\"\n- `\"off\"`: Switch all channels off\n- `\"on\"`: Switch all channels to profile \"on\"",
                      "type": "Null | Boolean | Number, String"
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
              "type": "method",
              "description": "[Command handler].\n\nKeep all channels at their current value.",
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
              "type": "method",
              "description": "[Command handler]\n\nUpdate requested channels.",
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
              "type": "method",
              "description": "[Command handler]\n\nUpdate requested channels.",
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
              "type": "method",
              "description": "[Command handler].\n\nLock or unlock a light. Locked light cannot be changed via its command handlers.",
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
              "type": "method",
              "description": "[Command handler]\n\nChange auto off behaviour.",
              "params": [
                {
                  "name": "req",
                  "description": "Auto off configuration conforming to data.autoOff.",
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
          "readme": "Establishes a link for a channel to the `data.master`\ncontroller. The controller can be an [OSE PWM board], for example.",
          "file": "lib/light/pin.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor"
            },
            "end": {
              "name": "end",
              "type": "method",
              "description": "Broken link handler",
              "params": [
                {
                  "name": "err",
                  "description": "[Error] instance",
                  "type": "Object"
                },
                {
                  "name": "resp",
                  "description": "Response",
                  "type": "*"
                }
              ]
            },
            "sync": {
              "name": "sync",
              "type": "method",
              "description": "Sync handler",
              "params": [
                {
                  "name": "state",
                  "description": "Whether this socket is synced",
                  "type": "Boolean"
                },
                {
                  "name": "data",
                  "description": "Optional open data",
                  "type": "Object",
                  "optional": true
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
                  "description": "Count of presses within `M.consts.switchTapTimeout`.",
                  "type": "Number"
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
        "lib/room": {
          "name": "lib/room",
          "type": "class",
          "super": "ose/lib.kind",
          "caption": "Room kind",
          "readme": "[Entry kind] defining behaviour of rooms.\n\nVarious activities can be defined for each room. Activities govern\nthe behaviour of rooms. When an activity is selected, it sends\ncommands to entries and trigger scheduled actions.\n\nEach activity is identified by its name and can be selected by a\ncommand sent to the room entry. Each activity should be a\ndescendant of the [activity class].\n\nExample:\n\nThe living room may have the following activities defined:\n\n- watching TV (lights dimmed, TV on, blinds down if dark outside,\n    etc.)\n- tidying (lights fully on, radio on)\n- reading (lights half on, multimedia off)\n\nAnother example:\n\nThe house may have the following activities:\n- at home (full comfort)\n- empty house (detection of intruders, heating down, etc.)\n- vacation (random actions simulating the presence of inhabitants)",
          "file": "lib/room/index.js",
          "property": {
            "state.activity": {
              "name": "state.activity",
              "type": "property",
              "dtype": "Object",
              "description": "Activity\n\nCurrently selected room activity"
            },
            "state.activity.name": {
              "name": "state.activity.name",
              "type": "property",
              "dtype": "String",
              "description": "Activity name\n\nCurrently selected room activity name"
            },
            "data.activities": {
              "name": "data.activities",
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
              "description": "[Command handler] changes room activity.",
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
          "type": "class",
          "super": "ose/lib.kind",
          "caption": "Switch kind",
          "readme": "Each switch is a digital input that has two logical values: `0` or `1`.\n\nEach [entry] of this kind establishes a [link] to the `data.master`\ncontroller entry with `flavour: \"switch\"`.\n\n`press`, `release`, `tap` and `hold` events are fired on the entry,\nand the state of the entry is updated depending on controller pin\nchanges. These events can be listened for, and appropriate actions\ncan be taken.\n\nIt is also possible to establish a new [link] to a switch as a\nslave with the `relay(req, slave)` command. The events listed above\nare then relayed to the `slave` socket.\n\nFor example, a [light entry] connects to a switch (if defined in\n`light.data.switch`) as a slave and is turned on or off depending\non pressing the switch.\n\nCurrently, only momentary switches (push-to-make) are\nsupported. Support for all other kinds of switches is planned.",
          "file": "lib/switch/index.js",
          "aliases": "switch switchEntry",
          "property": {
            "data.master": {
              "name": "data.master",
              "type": "property",
              "dtype": "String | Object",
              "description": "Controller entry identification object.\n\nThe switch entry establishes a new link to this controller."
            },
            "data.pin": {
              "name": "data.pin",
              "type": "property",
              "dtype": "String",
              "description": "Master pin index\n\nIndex of digital input pin on the master controller"
            },
            "data.debounce": {
              "name": "data.debounce",
              "type": "property",
              "dtype": "Number",
              "description": "Debounce timeout\n\nDefines debounce timeout of the digital input in milliseconds.\n\nDefault value is `M.consts.switchDebounce`."
            },
            "data.hold": {
              "name": "data.hold",
              "type": "property",
              "dtype": "Number",
              "description": "Hold timeout\n\nDefines hold timeout of the switch in milliseconds.\n\nDefault value is `M.consts.switchHold`."
            },
            "data.tap": {
              "name": "data.tap",
              "type": "property",
              "dtype": "Number",
              "description": "Tap timeout\n\nDefines tap timeout of the switch in milliseconds.\n\nDefault value is `M.consts.switchTap`."
            },
            "state.value": {
              "name": "state.value",
              "type": "property",
              "dtype": "Number (0, 1)",
              "description": "Current switch state value"
            },
            "state.at": {
              "name": "state.at",
              "type": "property",
              "dtype": "Number",
              "description": "Timestamp of the last switch change."
            },
            "state.debounce": {
              "name": "state.debounce",
              "type": "property",
              "dtype": "Number",
              "description": "Debounce timeout\n\nDefines the debounce timeout of the digital input in\nmilliseconds. The value is taken from `data.debounce`."
            },
            "state.hold": {
              "name": "state.hold",
              "type": "property",
              "dtype": "Number",
              "description": "Hold timeout\n\nDefines the hold timeout of the switch in milliseconds. The value is\ntaken from `data.hold`."
            },
            "state.tap": {
              "name": "state.tap",
              "type": "property",
              "dtype": "Number",
              "description": "Tap timeout\n\nDefines the tap timeout of the switch in milliseconds. The value is\ntaken from `data.tap`."
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
          }
        },
        "lib/switch/socket": {
          "name": "lib/switch/socket",
          "type": "class",
          "super": "ose/lib.entry.command",
          "caption": "Switch-to-controller client socket",
          "readme": "Establishes a link to the `data.master` controller. The controller\ncan be a [Raspberry Pi] or [OSE Main board], for example.",
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
            "end": {
              "name": "end",
              "type": "method",
              "description": "Broken link handler",
              "params": [
                {
                  "name": "err",
                  "description": "[Error] instance",
                  "type": "Object"
                },
                {
                  "name": "resp",
                  "description": "Response",
                  "type": "*"
                }
              ]
            },
            "sync": {
              "name": "sync",
              "type": "method",
              "description": "Sync handler",
              "params": [
                {
                  "name": "value",
                  "description": "",
                  "type": "Boolean"
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
                  "description": "Tap counts within `state.tap` timeout",
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
          "readme": "[Response socket] relaying the switch entry events to the slave.",
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
                },
                {
                  "name": "socket",
                  "description": "Client socket",
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
      "readme": "This component makes it possible to specify what individual remote\ncontroller commands do with OSE entries. An example of using this\ncomponent is the [ose-lirc] package.\n\nThe remote controller can be easily configured to control\nmultimedia, lights, etc. It is possible to define commands and\ngroups of commands.\n\nExample:\nTODO",
      "file": "lib/remote.js",
      "line": 26,
      "modules": {
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
                  "name": "data",
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
                  "name": "data",
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
                  "name": "data",
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
                  "name": "data",
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
    }
  },
  "modules": {
    "lib": {
      "name": "lib",
      "type": "singleton",
      "caption": "Control core",
      "readme": "Core singleton of ose-control npm package. Register [entry kinds]\ndefined by this package to the `\"control\"` [scope].",
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