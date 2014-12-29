Packages["ose"] = {
  "name": "ose",
  "npmname": "ose",
  "caption": "Framework",
  "readme": "Lightweight and extensible framework for development and rapid\nprototyping of modern applications based on Node.js and HTML5.\n\nThe framework is created as a base for an OSE application that\nmanages the physical and virtual environment that a user lives\nin. It brings the ability to easily monitor and control the\nenvironment, and to automate tasks.",
  "file": "content.js",
  "line": 11,
  "aliases": "framework oseFramework supportedBrowser supportedBrowsers",
  "features": "- Multi-instance architecture\n- Transparent network communication via WebSockets\n- Near real-time synchronization\n- Code sharing between Node.js and web browsers\n- Partitioned data model\n- Extensible via npm packages",
  "comps": {
    "data": {
      "name": "data",
      "caption": "Data model",
      "readme": "The data model of the framework is designed so that individual\ninstances of OSE hold subsets of the data and together create a\nsingle whole.\n\nData partitions are called [shards]. Basic data units contained by\n[shards] are called [entries].\n\nEach [entry] is of a certain [kind]. [Kinds] define the properties\nand behaviour of [entries]. Kinds are namespaced using [scopes].\n\nEach [shard] belongs to a [space] that act as the shard's\nnamespace. Each shard is tied to [scope] and can contain only\nentries of kinds from that [scope].\n\nKind hierarchy:\n* scope\n  * kind\n\nData partitioning hierarchy:\n* space\n  * shard\n    * entry\n\nExample:\n\nThe `reading.light` is an entry of the kind `light`, the `light`\nkind belongs to the `control` scope, and the `reading.light` entry\nis saved in the shard `living.room`, which belongs to the space\n`my.house`.",
      "file": "lib/scope.js",
      "line": 11,
      "aliases": "command commands entryCommand entryCommands commandHandler commandHandlers",
      "description": "## Commands\nIt is possible to send commands to individual [entries]. Each\ncommand is delivered to the [home] of an [entry]. Commands consist\nof a command name and optional data. A command can be a request for\ndata or to establish a new [link].\n\nCommand handlers can be registered for a [kind] with an `on()`\nmethod call. The [Kind] class is not an [Event Emitter] descendant.\nIn command handler code, the target `entry` can be accessed in\n`this.entry`.\n\nExample:\n    TODO",
      "modules": {
        "lib/entry/command": {
          "name": "lib/entry/command",
          "type": "class",
          "caption": "Entry command client socket",
          "readme": "Sends some command to the target entry. When the link disconnects,\nit tries to reopen it as soon as possible.",
          "file": "lib/entry/command.js",
          "property": {
            "entry": {
              "name": "entry",
              "type": "property",
              "dtype": "Object",
              "description": "Entry sending a command"
            },
            "target": {
              "name": "target",
              "type": "property",
              "dtype": "Number|String|Object",
              "description": "Identification of target entry"
            },
            "command": {
              "name": "command",
              "type": "property",
              "dtype": "String",
              "description": "Command name"
            },
            "[data]": {
              "name": "[data]",
              "type": "property",
              "dtype": "*",
              "description": "Optional command data"
            },
            "shard": {
              "name": "shard",
              "type": "property",
              "dtype": "Object",
              "description": "Target shard"
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Socket constructor",
              "params": [
                {
                  "name": "entry",
                  "description": "Source entry",
                  "type": "Object"
                },
                {
                  "name": "target",
                  "description": "Target entry identification",
                  "type": "Number|String|Object"
                },
                {
                  "name": "command",
                  "description": "Command name",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Optional data",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "open": {
              "name": "open",
              "type": "method",
              "description": "Open handler."
            },
            "close": {
              "name": "close",
              "type": "method",
              "description": "Close handler clears this socket."
            },
            "error": {
              "name": "error",
              "type": "method",
              "description": "Error handler tries to reopen the link in case of network problems.",
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
        "lib/entry": {
          "name": "lib/entry",
          "type": "class",
          "super": "EventEmitter",
          "caption": "Entry class",
          "readme": "An [Entry] instance is a data structure representing a physical\nobject or logical concept. Each [entry] belongs to a certain\n[shard]. Within the [shard], it has a unique `id`. Each [entry] is\nof a certain [kind] that defines its behaviour. An [entry] can\ncontain a `data` object in JSON format (analogous to a database\ntable row). At the moment, `data` are defined at the start-up of an\n[OSE instance] and are immutable. Data management and persistence\nare planned features. The `state` JSON object, unlike `data`, can\noften change and is non-persistent by design because it reflects\nchanging objective reality. Changes of `state` objects are\npropagated to [peers] tracking changes of certain [entries].",
          "file": "lib/entry/index.js",
          "aliases": "entry entries data state statesOfEntries",
          "property": {
            "id": {
              "name": "id",
              "type": "property",
              "dtype": "String",
              "description": "ID of entry within shard"
            },
            "shard": {
              "name": "shard",
              "type": "property",
              "dtype": "Object",
              "description": "Reference to containing [shard]"
            },
            "kind": {
              "name": "kind",
              "type": "property",
              "dtype": "Object",
              "description": "Reference to [entry kind]"
            },
            "drev": {
              "name": "drev",
              "type": "property",
              "dtype": "Number",
              "description": "Timestamp in microseconds of last data update"
            },
            "data": {
              "name": "data",
              "type": "property",
              "dtype": "Object",
              "description": "Persistent data"
            },
            "master": {
              "name": "master",
              "type": "property",
              "dtype": "Object",
              "description": "Reference to [slave entry client socket]"
            },
            "srev": {
              "name": "srev",
              "type": "property",
              "dtype": "Number",
              "description": "Timestamp in microseconds of last state update"
            },
            "state": {
              "name": "state",
              "type": "property",
              "dtype": "Object",
              "description": "Non-persistent data"
            },
            "synced": {
              "name": "synced",
              "type": "property",
              "dtype": "Boolean",
              "description": "Indicates whether entry is sync with its home"
            },
            "queuedState": {
              "name": "queuedState",
              "type": "property",
              "dtype": "Object",
              "description": "Queued state"
            },
            "queueStateHandle": {
              "name": "queueStateHandle",
              "type": "property",
              "dtype": "Number",
              "description": "Timeout handle"
            },
            "queueStateTimeout": {
              "name": "queueStateTimeout",
              "type": "property",
              "dtype": "Integer (milliseconds)",
              "description": "Setup this property to enable set state queue."
            },
            "slaveId": {
              "name": "slaveId",
              "type": "property",
              "dtype": "Number",
              "description": "Last slave id"
            },
            "slaves": {
              "name": "slaves",
              "type": "property",
              "dtype": "Object",
              "description": "Contains all response sockets of slave entries"
            },
            "dtc": {
              "name": "dtc",
              "type": "property",
              "dtype": "Number",
              "description": "Count of data trackers"
            },
            "stc": {
              "name": "stc",
              "type": "property",
              "dtype": "Number",
              "description": "Count of clients state trackers"
            }
          },
          "undefined": {
            "undefined": {
              "dtype": "Boolean",
              "description": "Set to TRUE when the entry is removed"
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Entry constructor",
              "params": [
                {
                  "name": "shard",
                  "description": "Entry owner shard instance",
                  "type": "Object"
                },
                {
                  "name": "id",
                  "description": "Entry id",
                  "type": "String|Number"
                }
              ]
            },
            "setup": {
              "name": "setup",
              "type": "method",
              "description": "Sets entry properties",
              "params": [
                {
                  "name": "kind",
                  "description": "Kind of entry",
                  "type": "String|Object"
                }
              ]
            },
            "remove": {
              "name": "remove",
              "type": "method",
              "description": "Removes entry from shard"
            },
            "getCaption": {
              "name": "getCaption",
              "type": "method",
              "description": "Returns entry caption"
            },
            "command": {
              "name": "command",
              "type": "method",
              "description": "Executes a command on the current entry",
              "params": [
                {
                  "name": "name",
                  "description": "Command name",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Data to be sent",
                  "type": "*"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object"
                }
              ]
            },
            "post": {
              "name": "post",
              "type": "method",
              "description": "Executes a command on the entry at home.",
              "params": [
                {
                  "name": "name",
                  "description": "Command name",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Data to be sent",
                  "type": "*",
                  "optional": true
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "postTo": {
              "name": "postTo",
              "type": "method",
              "description": "Send command to target's home",
              "params": [
                {
                  "name": "target",
                  "description": "Target id or target identification object",
                  "type": "String|Object"
                },
                {
                  "name": "name",
                  "description": "Command name",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Data to be sent",
                  "type": "*",
                  "optional": true
                },
                {
                  "name": "socket",
                  "description": "",
                  "type": "Object|Function",
                  "optional": true
                }
              ]
            },
            "onStates": {
              "name": "onStates",
              "type": "method",
              "description": "Register state handlers",
              "params": [
                {
                  "name": "handlers",
                  "description": "Handlers object",
                  "type": "Object"
                }
              ]
            },
            "setState": {
              "name": "setState",
              "type": "method",
              "description": "Change entry \"state\". Can be called only in the home. Data are\naltered (unchanged keys are removed).",
              "params": [
                {
                  "name": "data",
                  "description": "Data object",
                  "type": "Object"
                },
                {
                  "name": "src",
                  "description": "Source of a change",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "inView": {
              "name": "inView",
              "type": "method",
              "description": "Tests whether entry belongs to view.\n\nTODO: Consider renaming method to isInView.",
              "params": [
                {
                  "name": "params",
                  "description": "Object containing parameters",
                  "type": "Object"
                }
              ]
            },
            "isIdentified": {
              "name": "isIdentified",
              "type": "method",
              "description": "Tests whether entry is identified by data.",
              "params": [
                {
                  "name": "data",
                  "description": "Entry identification",
                  "type": "Object"
                }
              ]
            },
            "identify": {
              "name": "identify",
              "type": "method",
              "description": "Returns identification object"
            },
            "isSynced": {
              "name": "isSynced",
              "type": "method",
              "description": "Checks whether data or state are synced",
              "params": [
                {
                  "name": "what",
                  "description": "What to check (\"data\"|\"state\"|Null)",
                  "type": "String|Null"
                }
              ]
            },
            "linkTo": {
              "name": "linkTo",
              "type": "method",
              "description": "Establishes a link to a target entry. When `req` contains a track\nrequest, the target entry will establish a link to the [home].",
              "params": [
                {
                  "name": "entry",
                  "description": "Target entry identification",
                  "type": "Object|String|Number"
                },
                {
                  "name": "req",
                  "description": "Request object",
                  "type": "Object|String",
                  "props": [
                    {
                      "name": "drev",
                      "description": "Current data revision. Specifies whether to request entry data.",
                      "type": "Object"
                    },
                    {
                      "name": "dtrack",
                      "description": "Whether to track data changes",
                      "type": "Boolean"
                    },
                    {
                      "name": "srev",
                      "description": "Current state revision. Specifies whether to request entry state.",
                      "type": "Object"
                    },
                    {
                      "name": "strack",
                      "description": "Whether to track state changes",
                      "type": "Boolean"
                    }
                  ]
                },
                {
                  "name": "socket",
                  "description": "Socket to be linked as a slave to an entry, or a callback with an entry as a response.",
                  "type": "Object|Function(err, entry)"
                }
              ]
            },
            "find": {
              "name": "find",
              "type": "method",
              "description": "Finds a sibling entry.",
              "params": [
                {
                  "name": "req",
                  "description": "Entry identification",
                  "type": "Object|String|Number"
                },
                {
                  "name": "cb",
                  "description": "Callback",
                  "type": "Function (err, shard)"
                }
              ]
            },
            "findShard": {
              "name": "findShard",
              "type": "method",
              "description": "Finds a sibling shard based on an entry's identification.",
              "params": [
                {
                  "name": "req",
                  "description": "Entry identification",
                  "type": "Object|String|Number"
                },
                {
                  "name": "cb",
                  "description": "Callback",
                  "type": "Function (err, shard)"
                }
              ]
            },
            "setSynced": {
              "name": "setSynced",
              "type": "method",
              "description": "Sets `synced` property and emits `\"synced\"` event.",
              "params": [
                {
                  "name": "val",
                  "description": "Value to be set",
                  "type": "Boolean"
                }
              ]
            },
            "update": {
              "name": "update",
              "type": "method",
              "description": "Updates this entry based on `req`. Called at a slave entry when\n`update` request from the master is received.",
              "params": [
                {
                  "name": "req",
                  "description": "Update object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "data",
                      "description": "Data update",
                      "type": "Object"
                    },
                    {
                      "name": "drev",
                      "description": "Data revision",
                      "type": "Object"
                    },
                    {
                      "name": "state",
                      "description": "State",
                      "type": "Object"
                    },
                    {
                      "name": "srev",
                      "description": "State revision",
                      "type": "Object"
                    },
                    {
                      "name": "synced",
                      "description": "Whether the entry is synced with home",
                      "type": "Boolean"
                    }
                  ]
                },
                {
                  "name": "full",
                  "description": "Whether the update contain full data or the difference only",
                  "type": "Boolean"
                }
              ]
            },
            "broadcast": {
              "name": "broadcast",
              "type": "method",
              "description": "Broadcasts an entry update request to slaves",
              "params": [
                {
                  "name": "req",
                  "description": "Request object",
                  "type": "Object"
                }
              ]
            },
            "linkSlave": {
              "name": "linkSlave",
              "type": "method",
              "description": "Links a [slave entry client socket]",
              "params": [
                {
                  "name": "req",
                  "description": "Request data",
                  "type": "Object"
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object"
                }
              ]
            },
            "linkMaster": {
              "name": "linkMaster",
              "type": "method",
              "description": "Establishes a link to the master entry.\n\nCalls `cb(err, entry)` after a entry has a defined kind and data.",
              "params": [
                {
                  "name": "cb",
                  "description": "Callback",
                  "type": "Function"
                }
              ]
            },
            "respond": {
              "name": "respond",
              "type": "method",
              "description": "Creates a response with `entry.data` or `entry.state` depending on\n`req`",
              "params": [
                {
                  "name": "req",
                  "description": "Request object",
                  "type": "Object"
                }
              ]
            },
            "tracked": {
              "name": "tracked",
              "type": "method",
              "description": "Method called when data or state changes should be tracked.",
              "params": [
                {
                  "name": "data",
                  "description": "",
                  "type": "Object"
                },
                {
                  "name": "state",
                  "description": "",
                  "type": "Object"
                },
                {
                  "name": "cb",
                  "description": "Function to be called after setup tracking.",
                  "type": "Function",
                  "optional": true
                }
              ]
            }
          }
        },
        "lib/entry/master": {
          "name": "lib/entry/master",
          "type": "class",
          "caption": "Master entry response socket",
          "readme": "Reponse socket for slave entry requests. Is registered in `entry.slaves`.",
          "file": "lib/entry/master.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Class constructor",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry instance",
                  "type": "Object"
                },
                {
                  "name": "req",
                  "description": "Request object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "drev",
                      "description": "Current data revision. Specifies whether to request entry data.",
                      "type": "Object"
                    },
                    {
                      "name": "dtrack",
                      "description": "Whether to track data changes",
                      "type": "Boolean"
                    },
                    {
                      "name": "srev",
                      "description": "Current state revision. Specifies whether to request entry state.",
                      "type": "Object"
                    },
                    {
                      "name": "strack",
                      "description": "Whether to track state changes",
                      "type": "Boolean"
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
            "close": {
              "name": "close",
              "type": "method",
              "description": "Close handler"
            },
            "error": {
              "name": "error",
              "type": "method",
              "description": "Error handler"
            },
            "track": {
              "name": "track",
              "type": "method",
              "description": "Track handler",
              "params": [
                {
                  "name": "req",
                  "description": "Request object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "dtrack",
                      "description": "Whether to track data changes",
                      "type": "Boolean"
                    },
                    {
                      "name": "strack",
                      "description": "Whether to track state changes",
                      "type": "Boolean"
                    }
                  ]
                }
              ]
            }
          }
        },
        "lib/entry/slave": {
          "name": "lib/entry/slave",
          "type": "class",
          "super": "EventEmitter",
          "caption": "Slave entry client socket",
          "readme": "Socket to build a link to the master entry.",
          "file": "lib/entry/slave.js",
          "event": {
            "done": {
              "name": "done",
              "type": "event",
              "description": "Fired when an entry is acquired"
            }
          },
          "property": {
            "entry": {
              "name": "entry",
              "type": "property",
              "dtype": "Object",
              "description": "Slave entry"
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Class constructor.",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry",
                  "type": "Object"
                }
              ]
            },
            "close": {
              "name": "close",
              "type": "method",
              "description": "Close handler\n\nCalled when there are no more response sockets in `entry.slaves`."
            },
            "error": {
              "name": "error",
              "type": "method",
              "description": "Error handler\n\nError keeps socket as `entry.master`",
              "params": [
                {
                  "name": "err",
                  "description": "Error object",
                  "type": "Object"
                }
              ]
            },
            "update": {
              "name": "update",
              "type": "method",
              "description": "Update handler. Updates `this.entry` based on `req`. Broadcast `req` to `this.entry.slaves`.",
              "params": [
                {
                  "name": "req",
                  "description": "Update object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "kind",
                      "description": "Setup the entry kind",
                      "type": "String"
                    },
                    {
                      "name": "data",
                      "description": "Data update",
                      "type": "Object"
                    },
                    {
                      "name": "drev",
                      "description": "Data revision",
                      "type": "Object"
                    },
                    {
                      "name": "state",
                      "description": "State",
                      "type": "Object"
                    },
                    {
                      "name": "srev",
                      "description": "State revision",
                      "type": "Object"
                    },
                    {
                      "name": "synced",
                      "description": "Whether the entry is synced with the home",
                      "type": "Boolean"
                    }
                  ]
                }
              ]
            }
          }
        },
        "lib/shard": {
          "name": "lib/shard",
          "type": "class",
          "super": "EventEmitter",
          "caption": "Shard class",
          "readme": "A shard is a set of [entries]. Each shard belongs to a certain\n[space]. Every shard has a `sid` (shard id) that is unique within\nits [space]. Each shard is tied to a single [scope] (ie. it cannot\ncontain [entries] of [kinds] belonging to different\n[scopes]). Every shard either belongs to the same [home] as its\nspace or is assigned to a different one.",
          "file": "lib/shard/index.js",
          "aliases": "shard shards",
          "property": {
            "scope": {
              "name": "scope",
              "type": "property",
              "dtype": "String|Object",
              "description": "Scope instance"
            },
            "space": {
              "name": "space",
              "type": "property",
              "dtype": "Object",
              "description": "Space containing shard"
            },
            "sid": {
              "name": "sid",
              "type": "property",
              "dtype": "Number",
              "description": "Shard id unique within a space"
            },
            "alias": {
              "name": "alias",
              "type": "property",
              "dtype": "String",
              "description": "Shard alias"
            },
            "home": {
              "name": "home",
              "type": "property",
              "dtype": "String|Object",
              "description": "Home peer"
            },
            "cache": {
              "name": "cache",
              "type": "property",
              "dtype": "Object",
              "description": "Object containing entries"
            },
            "master": {
              "name": "master",
              "type": "property",
              "dtype": "Object",
              "description": "Socket linked to the master shard"
            },
            "synced": {
              "name": "synced",
              "type": "property",
              "dtype": "Boolean",
              "description": "Whether the shard can communicate with its [home]\nTODO: Consider renaming"
            },
            "initialized": {
              "name": "initialized",
              "type": "property",
              "dtype": "Boolean",
              "description": "Whether the shard has been initialized"
            }
          },
          "event": {
            "afterInit": {
              "name": "afterInit",
              "type": "event",
              "description": "Gets fired after all shards is the current space are initialized",
              "params": [
                {
                  "name": "Callback",
                  "description": "to be called when the work is done.",
                  "type": "Function"
                }
              ]
            },
            "synced": {
              "name": "synced",
              "type": "event",
              "description": "Is fired when the `synced` property changes",
              "params": [
                {
                  "name": "Whether",
                  "description": "the shard is in sync with its home.",
                  "type": "Boolean"
                }
              ]
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Class constructor",
              "params": [
                {
                  "name": "scope",
                  "description": "Scope instance",
                  "type": "String|Object"
                },
                {
                  "name": "space",
                  "description": "Space",
                  "type": "Object"
                },
                {
                  "name": "sid",
                  "description": "Shard id",
                  "type": "Number"
                },
                {
                  "name": "alias",
                  "description": "Shard alias",
                  "type": "String"
                },
                {
                  "name": "home",
                  "description": "Home peer",
                  "type": "String|Object",
                  "optional": true
                }
              ]
            },
            "afterInit": {
              "name": "afterInit",
              "type": "method",
              "description": "Gets called after all shards in the current space are initialized"
            },
            "check2Link": {
              "name": "check2Link",
              "type": "method",
              "description": "Check whether this shard needs to be linked to the master."
            },
            "afterHome": {
              "name": "afterHome",
              "type": "method",
              "description": "Executes callback after the shard has been initialized, but only in\nthe [home OSE instance].",
              "params": [
                {
                  "name": "cb",
                  "description": "Method to be called",
                  "type": "Function"
                }
              ]
            },
            "atHome": {
              "name": "atHome",
              "type": "method",
              "description": "Returns true if shard is in its home"
            },
            "entry": {
              "name": "entry",
              "type": "method",
              "description": "Creates a new entry and adds it to `this.cache`.",
              "params": [
                {
                  "name": "id",
                  "description": ""
                },
                {
                  "name": "kind",
                  "description": ""
                },
                {
                  "name": "data",
                  "description": ""
                }
              ]
            },
            "get": {
              "name": "get",
              "type": "method",
              "description": "Get entry with data in the current shard.",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry id.",
                  "type": "String|Number"
                },
                {
                  "name": "cb",
                  "description": "Callback with entry as a response",
                  "type": "Function"
                }
              ]
            },
            "link": {
              "name": "link",
              "type": "method",
              "description": "Establish a link to an entry in the current shard.",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry id.",
                  "type": "String|Number"
                },
                {
                  "name": "req",
                  "description": "Request object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "drev",
                      "description": "Current data revision. Specifies whether to request entry data.",
                      "type": "Object"
                    },
                    {
                      "name": "dtrack",
                      "description": "Whether to track data changes",
                      "type": "Boolean"
                    },
                    {
                      "name": "srev",
                      "description": "Current state revision. Specifies whether to request entry state.",
                      "type": "Object"
                    },
                    {
                      "name": "strack",
                      "description": "Whether to track state changes",
                      "type": "Boolean"
                    }
                  ]
                },
                {
                  "name": "socket",
                  "description": "Socket to be linked as a slave to an entry | Callback with entry as a response",
                  "type": "Object|Function"
                }
              ]
            },
            "send": {
              "name": "send",
              "type": "method",
              "description": "Send a command to shard's home",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry id.",
                  "type": "String|Number"
                },
                {
                  "name": "name",
                  "description": "Command name",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Data to be sent",
                  "type": "*",
                  "optional": true
                },
                {
                  "name": "socket",
                  "description": "Slave socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "findShard": {
              "name": "findShard",
              "type": "method",
              "description": "Finds a shard by id or alias in the same space as this shard or by\nan identification object in another space",
              "params": [
                {
                  "name": "req",
                  "description": "Requested shard (sid or alias) in the current space or object also specifying another space.",
                  "type": "Number|String|Object",
                  "props": [
                    {
                      "name": "space",
                      "description": "Space name",
                      "type": "String",
                      "optional": true
                    },
                    {
                      "name": "shard",
                      "description": "Shard id or alias",
                      "type": "Number|String",
                      "optional": true
                    }
                  ]
                },
                {
                  "name": "cb",
                  "description": "Response callback",
                  "type": "Function"
                }
              ]
            },
            "getView": {
              "name": "getView",
              "type": "method",
              "description": "**Views logic will be changed in principle**",
              "params": [
                {
                  "name": "params",
                  "description": "Parameters",
                  "type": "Object"
                },
                {
                  "name": "socket",
                  "description": "Slave socket or callback",
                  "type": "Object|Function"
                }
              ]
            },
            "identify": {
              "name": "identify",
              "type": "method",
              "description": "Returns shard identification object. This object consists of `space\nname` and `shards sid`."
            },
            "isIdentified": {
              "name": "isIdentified",
              "type": "method",
              "description": "Checks whether this shard is identified by a `data` identification\nobject.",
              "params": [
                {
                  "name": "data",
                  "description": "Identification object",
                  "type": "Object"
                }
              ]
            },
            "setSynced": {
              "name": "setSynced",
              "type": "method",
              "description": "Sets `synced` property. Emits `synced` event if the property is\nchanged.",
              "params": [
                {
                  "name": "value",
                  "description": "Value to be set",
                  "type": "Boolean"
                }
              ]
            },
            "afterSynced": {
              "name": "afterSynced",
              "type": "method",
              "description": "Calls the callback after the shard gets synced with its home or\nimmediately if already in sync. It can wait forever.",
              "params": [
                {
                  "name": "cb",
                  "description": "Callback",
                  "type": "Function"
                }
              ]
            },
            "linkSlave": {
              "name": "linkSlave",
              "type": "method",
              "description": "Opens a link to the slave shard",
              "params": [
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object"
                }
              ]
            },
            "linkMaster": {
              "name": "linkMaster",
              "type": "method",
              "description": "Establishes a link to the master shard if it doesn't exist and\nprovides a shard/slave socket as a callback response.\nShould be called only when not at home.\n`shard.master` is removed only when it is unnecessary - the shard doesn't needs to be synced to its home.",
              "params": [
                {
                  "name": "cb",
                  "description": "",
                  "type": "Function(err, shardMaster)"
                }
              ]
            }
          }
        },
        "lib/shard/master": {
          "name": "lib/shard/master",
          "type": "class",
          "caption": "Master shard response socket",
          "readme": "Socket created in response to a request from a slave shard.",
          "file": "lib/shard/master.js",
          "method": {
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
                  "description": "Error object",
                  "type": "Object"
                }
              ]
            },
            "command": {
              "name": "command",
              "type": "method",
              "description": "Command handler executing a command on a target entry",
              "params": [
                {
                  "name": "req",
                  "description": "Request object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "target",
                      "description": "Target entry id",
                      "type": "String"
                    },
                    {
                      "name": "name",
                      "description": "Command name",
                      "type": "String"
                    },
                    {
                      "name": "data",
                      "description": "Optional data",
                      "type": "*",
                      "optional": true
                    }
                  ]
                },
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "entry": {
              "name": "entry",
              "type": "method",
              "description": "Handler called when a slave shard attempts to create a link to an entry",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Object",
                  "props": [
                    {
                      "name": "entry",
                      "description": "Requested entry id",
                      "type": "String"
                    },
                    {
                      "name": "what",
                      "description": "Request to be sent to `shard.link()`",
                      "type": "Object"
                    }
                  ]
                },
                {
                  "name": "socket",
                  "description": "Slave entry socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            }
          },
          "undefined": {
            "undefined": {
              "description": "Handler called a slave shard requests a view",
              "params": [
                {
                  "name": "req",
                  "description": "Request to be sent to `shard.getView()`",
                  "type": "Object"
                },
                {
                  "name": "socket",
                  "description": "Slave entry socket",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/shard/slave": {
          "name": "lib/shard/slave",
          "type": "class",
          "caption": "Slave shard client socket",
          "readme": "Socket for communicating from a shard to a master in another OSE\ninstance.",
          "file": "lib/shard/slave.js",
          "method": {
            "init": {
              "name": "init",
              "type": "method",
              "description": "Class constructor called from `space.sync()`. Sends request to the master\nshard to establish a link.",
              "params": [
                {
                  "name": "shard",
                  "description": "Slave shard",
                  "type": "Object"
                },
                {
                  "name": "peer",
                  "description": "Shard's home peer",
                  "type": "Object"
                },
                {
                  "name": "cb",
                  "description": "Callback to be called after the link is established",
                  "type": "Function"
                }
              ]
            },
            "open": {
              "name": "open",
              "type": "method",
              "description": "Open handler",
              "params": [
                {
                  "name": "data",
                  "description": "Response object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "synced",
                      "description": "Whether it is possible to communicate with the `home`",
                      "type": "Boolean"
                    }
                  ]
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
                  "description": "Error object",
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
                  "name": "data",
                  "description": "Whether it is possible to communicate with the `home`.",
                  "type": "Boolean"
                }
              ]
            }
          }
        },
        "lib/space": {
          "name": "lib/space",
          "type": "class",
          "caption": "Space class",
          "readme": "A space is a data namespace containing [shards]. It is identified\nby its unique `name` (eg. a domain name or email address).",
          "file": "lib/space/index.js",
          "aliases": "space spaces",
          "property": {
            "name": {
              "name": "name",
              "type": "property",
              "dtype": "String",
              "description": "Unique space name"
            },
            "home": {
              "name": "home",
              "type": "property",
              "dtype": "Object",
              "description": "Home peer"
            },
            "shards": {
              "name": "shards",
              "type": "property",
              "dtype": "Object",
              "description": "Object containing shards indexed by `sid`"
            }
          },
          "method": {
            "init": {
              "name": "init",
              "type": "method",
              "description": "Class constructor"
            },
            "config": {
              "name": "config",
              "type": "method",
              "description": "Plugin configuration method",
              "params": [
                {
                  "name": "name",
                  "description": "Configuration name",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Plugin configuration",
                  "type": "Object"
                }
              ]
            },
            "browserConfig": {
              "name": "browserConfig",
              "type": "method",
              "description": "Fills the configuration object for the browser.",
              "params": [
                {
                  "name": "config",
                  "description": "Plugin configuration",
                  "type": "Object"
                }
              ]
            },
            "getShard": {
              "name": "getShard",
              "type": "method",
              "description": "Finds a shard by shard id (sid)",
              "params": [
                {
                  "name": "sid",
                  "description": "Shard id",
                  "type": "Number|String"
                },
                {
                  "name": "cb",
                  "description": "Response callback",
                  "type": "Function"
                }
              ]
            },
            "getShardAlias": {
              "name": "getShardAlias",
              "type": "method",
              "description": "Finds a shard by shard alias",
              "params": [
                {
                  "name": "sid",
                  "description": "Shard alias",
                  "type": "String"
                },
                {
                  "name": "cb",
                  "description": "Response callback",
                  "type": "Function"
                }
              ]
            },
            "findShard": {
              "name": "findShard",
              "type": "method",
              "description": "Finds a shard by id or alias in the current space or by an\nidentification object in another space",
              "params": [
                {
                  "name": "req",
                  "description": "Requested shard (sid or alias) in the current space or object also specifying another space.",
                  "type": "Number|String|Object",
                  "props": [
                    {
                      "name": "space",
                      "description": "Space name",
                      "type": "String",
                      "optional": true
                    },
                    {
                      "name": "shard",
                      "description": "Shard id or alias",
                      "type": "Number|String",
                      "optional": true
                    }
                  ]
                },
                {
                  "name": "cb",
                  "description": "Response callback",
                  "type": "Function"
                }
              ]
            },
            "eachShard": {
              "name": "eachShard",
              "type": "method",
              "description": "Calls a callback for each shard matching filtering criteria.",
              "params": [
                {
                  "name": "filter",
                  "description": "",
                  "type": "Object"
                },
                {
                  "name": "cb",
                  "description": "callback",
                  "type": "Function (shard)"
                }
              ]
            },
            "link": {
              "name": "link",
              "type": "method",
              "description": "Builds a new `link` to an `entry`.",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry identification",
                  "type": "Object"
                },
                {
                  "name": "req",
                  "description": "Request",
                  "type": "Object"
                },
                {
                  "name": "socket",
                  "description": "Slave socket instance",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/space/list": {
          "name": "lib/space/list",
          "type": "module",
          "caption": "List of spaces",
          "readme": "Contains a list of all spaces registered by this OSE instance",
          "file": "lib/space/list.js",
          "method": {
            "add": {
              "name": "add",
              "type": "method",
              "description": "Add a space",
              "params": [
                {
                  "name": "space",
                  "description": "Space",
                  "type": "Object"
                }
              ]
            },
            "get": {
              "name": "get",
              "type": "method",
              "description": "Attempts to find requested space.",
              "params": [
                {
                  "name": "req",
                  "description": "Request",
                  "type": "Object"
                },
                {
                  "name": "cb",
                  "description": "Callback",
                  "type": "Function (err, space)"
                }
              ]
            },
            "each": {
              "name": "each",
              "type": "method",
              "description": "Calls callback for each space matching filtering criteria.",
              "params": [
                {
                  "name": "cb",
                  "description": "callback",
                  "type": "Function (space)"
                }
              ]
            },
            "link": {
              "name": "link",
              "type": "method",
              "description": "Builds a new `link` to an `entry`.",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry identification",
                  "type": "Object"
                },
                {
                  "name": "req",
                  "description": "Request",
                  "type": "Object"
                },
                {
                  "name": "socket",
                  "description": "Slave socket instance",
                  "type": "Object"
                }
              ]
            },
            "findShard": {
              "name": "findShard",
              "type": "method",
              "description": "Attempts to find requested shard.",
              "params": [
                {
                  "name": "req",
                  "description": "Shard request.",
                  "type": "String"
                },
                {
                  "name": "cb",
                  "description": "Callback",
                  "type": "Function (err, shard)"
                }
              ]
            },
            "getShard": {
              "name": "getShard",
              "type": "method",
              "description": "Attempts to find requested shard.",
              "params": [
                {
                  "name": "req",
                  "description": "Shard request.",
                  "type": "String"
                },
                {
                  "name": "cb",
                  "description": "Callback",
                  "type": "Function (err, shard)"
                }
              ]
            }
          }
        },
        "lib/kind": {
          "name": "lib/kind",
          "type": "class",
          "caption": "Kind class",
          "readme": "Each [entry] is of a certain kind. Kinds define the properties and\nbehaviour of [entries].\n\nKinds should describe, as closely as possible, physical or virtual\nobjects that can be managed somehow.",
          "file": "lib/kind.js",
          "aliases": "kind kinds entryKind entryKinds kindsOfEntries",
          "method": {
            "homeInit": {
              "name": "homeInit",
              "type": "method",
              "description": "Initializes an entry in the home OSE instance",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry to initialize",
                  "type": "Object"
                }
              ]
            },
            "init": {
              "name": "init",
              "type": "method",
              "description": "Kind constructor",
              "params": [
                {
                  "name": "scope",
                  "description": "Scope to which assign the kind",
                  "type": "Object|String"
                },
                {
                  "name": "name",
                  "description": "Unique kind name within the scope",
                  "type": "String"
                }
              ]
            },
            "afterInit": {
              "name": "afterInit",
              "type": "method",
              "description": "Dependency initialization",
              "params": [
                {
                  "name": "cb",
                  "description": "Callback",
                  "type": "Function"
                }
              ]
            },
            "identify": {
              "name": "identify",
              "type": "method",
              "description": "Returns identification object"
            },
            "getCaption": {
              "name": "getCaption",
              "type": "method",
              "description": "Returns entry caption",
              "params": [
                {
                  "name": "entry",
                  "description": "`Entry` instance",
                  "type": "Object"
                }
              ]
            },
            "on": {
              "name": "on",
              "type": "method",
              "description": "Registers command handlers",
              "params": [
                {
                  "name": "name",
                  "description": "Object containing handler or module name with handlers",
                  "type": "Object"
                }
              ]
            },
            "getLayout": {
              "name": "getLayout",
              "type": "method",
              "description": "Finds the right module for a given page and layout",
              "params": [
                {
                  "name": "page",
                  "description": "",
                  "type": "String"
                },
                {
                  "name": "layout",
                  "description": "",
                  "type": "String"
                }
              ]
            }
          },
          "property": {
            "scope": {
              "name": "scope",
              "type": "property",
              "dtype": "Object",
              "description": "Scope to which the kind is assigned"
            },
            "name": {
              "name": "name",
              "type": "property",
              "dtype": "String",
              "description": "Kind name unique within a scope"
            }
          }
        },
        "lib/scope": {
          "name": "lib/scope",
          "type": "class",
          "caption": "Scope class",
          "readme": "A scope is a set of [kinds] of [entries].",
          "file": "lib/scope.js",
          "aliases": "scope scopes",
          "property": {
            "name": {
              "name": "name",
              "type": "property",
              "dtype": "String",
              "description": "Scope name"
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Class constructor",
              "params": [
                {
                  "name": "name",
                  "description": "Scope name",
                  "type": "String"
                }
              ]
            },
            "identify": {
              "name": "identify",
              "type": "method",
              "description": "Returns scope identification. This object consists of `space name`\nand `shards sid`."
            },
            "add": {
              "name": "add",
              "type": "method",
              "description": "Adds a kind to this scope",
              "params": [
                {
                  "name": "kind",
                  "description": "Kind to be added",
                  "type": "Object"
                }
              ]
            },
            "getView": {
              "name": "getView",
              "type": "method",
              "description": "Creates a view based on params",
              "params": [
                {
                  "name": "kind",
                  "description": "Kind",
                  "type": "Object",
                  "optional": true
                },
                {
                  "name": "params",
                  "description": "View parameters",
                  "type": "Object",
                  "optional": true
                },
                {
                  "name": "callback",
                  "description": "Callback",
                  "type": "Function"
                }
              ]
            }
          }
        }
      }
    },
    "http": {
      "name": "http",
      "caption": "HTTP server",
      "readme": "This component provides an HTTP server for OSE. It responds to HTTP\nrequests and provides data needed to run OSE instances in the\nbrowser. Each OSE package that needs to run in the browser creates\none `ose/lib/http/content` class instance and defines which files\nwill be provided to the browser.\n\nIt also handles incoming WebSocket requests from other OSE\ninstances and relays them to the [peers component].",
      "file": "lib/http/index.js",
      "line": 29,
      "modules": {
        "lib/http/content": {
          "name": "lib/http/content",
          "type": "class",
          "caption": "HTTP Content",
          "readme": "Descendants of this class provide browsers with files from\nindividual OSE packages.",
          "file": "lib/http/content.js",
          "property": {
            "name": {
              "name": "name",
              "type": "property",
              "dtype": "String",
              "description": "Content name"
            },
            "path": {
              "name": "path",
              "type": "property",
              "dtype": "String",
              "description": "Path to content"
            },
            "modules": {
              "name": "modules",
              "type": "property",
              "dtype": "Object",
              "description": "List of modules provided by this content instance."
            },
            "scripts": {
              "name": "scripts",
              "type": "property",
              "dtype": "Object",
              "description": "List of JavaScript files provided by this content instance."
            },
            "styles": {
              "name": "styles",
              "type": "property",
              "dtype": "Object",
              "description": "List of CSS style files provided by this content instance."
            },
            "handlers": {
              "name": "handlers",
              "type": "property",
              "dtype": "Object",
              "description": "List of handlers provided by this content instance."
            }
          },
          "method": {
            "C": {
              "name": "C",
              "type": "method",
              "description": "Class constructor",
              "params": [
                {
                  "name": "name",
                  "description": "Name of HttpContent instance",
                  "type": "String"
                },
                {
                  "name": "path",
                  "description": "Path to content",
                  "type": "String"
                }
              ]
            },
            "addHead": {
              "name": "addHead",
              "type": "method",
              "description": "Adds a URI to the HTML <head> element.",
              "params": [
                {
                  "name": "uri",
                  "description": "URI",
                  "type": "String"
                },
                {
                  "name": "index",
                  "description": "Order index",
                  "type": "Number"
                }
              ]
            },
            "addModule": {
              "name": "addModule",
              "type": "method",
              "description": "Adds a module among scripts in <body>.",
              "params": [
                {
                  "name": "filename",
                  "description": "Module filename",
                  "type": "String"
                },
                {
                  "name": "name",
                  "description": "Registered module name",
                  "type": "String"
                }
              ]
            },
            "addJs": {
              "name": "addJs",
              "type": "method",
              "description": "Adds a JavaScript file to scripts in <body>.",
              "params": [
                {
                  "name": "name",
                  "description": "Script filename",
                  "type": "String"
                }
              ]
            },
            "addCss": {
              "name": "addCss",
              "type": "method",
              "description": "Adds a CSS file to scripts in <body>.",
              "params": [
                {
                  "name": "name",
                  "description": "CSS file filename",
                  "type": "String"
                }
              ]
            },
            "addHandler": {
              "name": "addHandler",
              "type": "method",
              "description": "Adds a handler for this content instance to list of handlers.",
              "params": [
                {
                  "name": "uri",
                  "description": "URI to handle",
                  "type": "String"
                },
                {
                  "name": "cb",
                  "description": "Hanlder to add",
                  "type": "Function (req, resp, params)"
                }
              ]
            },
            "printIndex": {
              "name": "printIndex",
              "type": "method",
              "description": "Adds this content of this instance to index.html.",
              "params": [
                {
                  "name": "req",
                  "description": "HTTP request object",
                  "type": "Object"
                },
                {
                  "name": "resp",
                  "description": "HTTP response object",
                  "type": "Object"
                }
              ]
            },
            "respond": {
              "name": "respond",
              "type": "method",
              "description": "Method called from HTTP module to handle reponses",
              "params": [
                {
                  "name": "req",
                  "description": "HTTP request object",
                  "type": "Object"
                },
                {
                  "name": "req",
                  "description": "HTTP response object",
                  "type": "Object"
                },
                {
                  "name": "name",
                  "description": "Part of URI relative to this content prefix.",
                  "type": "String"
                },
                {
                  "name": "ext",
                  "description": "File extension",
                  "type": "String"
                },
                {
                  "name": "params",
                  "description": "Additional request parameters",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/http": {
          "name": "lib/http",
          "type": "module",
          "caption": "HTTP server plugin",
          "readme": "This singleton provides HTTP server for OSE instance.",
          "file": "lib/http/index.js",
          "property": {
            "ip": {
              "name": "ip",
              "type": "property",
              "dtype": "String",
              "description": "IP address of Node.js host"
            },
            "port": {
              "name": "port",
              "type": "property",
              "dtype": "Number",
              "description": "Port of Node.js HTTP server"
            },
            "files": {
              "name": "files",
              "type": "property",
              "dtype": "Object",
              "description": "List of files"
            },
            "contents": {
              "name": "contents",
              "type": "property",
              "dtype": "Object",
              "description": "List of content objects"
            }
          },
          "method": {
            "config": {
              "name": "config",
              "type": "method",
              "description": "[OSE plugin] configuration method",
              "params": [
                {
                  "name": "data",
                  "description": "Configuration data object",
                  "type": "Object"
                }
              ]
            },
            "addContent": {
              "name": "addContent",
              "type": "method",
              "description": "Adds content instance",
              "params": [
                {
                  "name": "content",
                  "description": "",
                  "type": "Object"
                }
              ]
            },
            "addHead": {
              "name": "addHead",
              "type": "method",
              "description": "TODO",
              "params": [
                {
                  "name": "uri",
                  "description": "URI",
                  "type": "String"
                },
                {
                  "name": "order",
                  "description": "Order in which to provide file",
                  "type": "Number"
                },
                {
                  "name": "remote",
                  "description": "TODO"
                }
              ]
            },
            "getUrl": {
              "name": "getUrl",
              "type": "method",
              "description": "Returns url of this Http instance."
            }
          }
        }
      }
    },
    "peer": {
      "name": "peer",
      "caption": "Peers",
      "readme": "The system, which is based on the OSE framework, consist of one or\nmore configured instances, called OSE instances. An OSE instance is\nidentified by a unique `name` an can run in Node.js or in a web\nbrowser.\n\nFrom the point of view of an OSE instance, a peer is another OSE\ninstance. Two peers can communicate with each other using the\nWebSocket protocol. Peers can be accessed directly, when a\nWebSocket channel exists, or indirectly, by using another peer as a\ngateway.\n\nThis component allows the following communication between OSE\ninstances:\n\n- Obtaining [entries] and views of entries.\n- Synchronization of [states of entries] in near real-time.\n- Sending of commands to entries.\n- Establishing transparent, asynchronous bidirectional [links]\n  between entries.",
      "file": "lib/ws/worker.js",
      "line": 8,
      "aliases": "peers homeOseInstance homeInstance oseInstance home peer-to-peer peersComponent",
      "description": "## Peer-to-peer relationships\nRemote peers of an OSE instance can enter the following connection\nstates:\n\n- near: peer reachable directly through a WebSocket\n- far: peer not reachable directly, but through a gateway \"near\"\n  (or chain of \"nears\")\n- unreachable: a peer that can't be reached\n\nIn addition, each OSE instance creates a [here peer] object\ndescribing itself.\n\nFrom the point of view of a [shard], a `home` is a [peer] to which\nits [entries] logically belong. The `home` is where commands are\nexecuted.\n\n\n## Establishing a peer-to-peer channel\n\nWhen a communication channel between two OSE instances is\nestablished, the following steps are taken:\n\n1. The client Peer instance calls the `connect()` method.\n  - A [WebSocket wrapper] is created.\n  - A WebSocket native object is created and connects to `peer.url`.\n\n2. The server verifies incoming request\n  - When there is no Peer instance for the client OSE instance, one is created.\n\n3. Server opens a WebSocket channel\n  - [WebSocket wrapper] is created.\n\n4. Handshake between peers\n\n5. Both Peer instances assign the `rxData()` method to the `rx`\n   property of [WebSocket wrapper] instance.\n   - After this step, the client and server become equal.\n\n\n## Messages\nFor standard peer to peer communication, data blocks, sent through\nWebSockets, are called \"messages\". Each message has a type.\nDepending on the message type, the appropriate method from [peer rx\nhandlers] is called to handle the incoming message.",
      "modules": {
        "lib/peer/here": {
          "name": "lib/peer/here",
          "type": "module",
          "caption": "Here peer",
          "readme": "Object representing own OSE instance peer. Each OSE instance\nregisters this object at startup with other peers in `Ose.peers`\nunder it's own name, i.e. `Ose.name`.",
          "file": "lib/peer/here.js"
        },
        "lib/peer/list": {
          "name": "lib/peer/list",
          "type": "singleton",
          "caption": "Peer list",
          "readme": "Singleton containing all registered peers. The singleton can be\naccessed through `Ose.peers`. A single peer can be accessed through\n`Ose.peers.get(peer name)`.",
          "file": "lib/peer/list.js",
          "property": {
            "gw": {
              "name": "gw",
              "type": "property",
              "dtype": "Object",
              "description": "Near peer instance that act as a default gateway to far peers"
            },
            "here": {
              "name": "here",
              "type": "property",
              "dtype": "Object",
              "description": "Own OSE instance peer, reference to [ose/lib/peer/here] singleton."
            }
          },
          "method": {
            "config": {
              "name": "config",
              "type": "method",
              "description": "Singleton initialization method.",
              "params": [
                {
                  "name": "name",
                  "description": "Peer name",
                  "type": "String"
                },
                {
                  "name": "peers",
                  "description": "Contains name: uri pairs for individual remote peers.",
                  "type": "Object"
                },
                {
                  "name": "gw",
                  "description": "Peer name that act as a default gateway to far peers.",
                  "type": "String"
                }
              ]
            },
            "peer": {
              "name": "peer",
              "type": "method",
              "description": "Get an existing peer by the `name` or create a new one.",
              "params": [
                {
                  "name": "name",
                  "description": "Peer name to retrieve or create.",
                  "type": "String"
                },
                {
                  "name": "url",
                  "description": "Peer WebSockets URL.",
                  "type": "String"
                }
              ]
            },
            "get": {
              "name": "get",
              "type": "method",
              "description": "Disconnect and remove `peer`.",
              "params": [
                {
                  "name": "peer",
                  "description": "Peer to be removed.",
                  "type": "Object"
                }
              ]
            },
            "connect": {
              "name": "connect",
              "type": "method",
              "description": "Connect all peers with url defined."
            },
            "disconnect": {
              "name": "disconnect",
              "type": "method",
              "description": "Disconnect all peers."
            },
            "onVerify": {
              "name": "onVerify",
              "type": "method",
              "description": "Verify event handler. Called before a remote peer WebSocket\nconnects as a client to this HTTP server.",
              "params": [
                {
                  "name": "data",
                  "description": "Verification request data.",
                  "type": "Object"
                }
              ]
            },
            "onConnect": {
              "name": "onConnect",
              "type": "method",
              "description": "Connect event handler. Called after remote peer WebSocket connects\nas a client to this HTTP server."
            }
          }
        },
        "lib/peer/remote": {
          "name": "lib/peer/remote",
          "type": "class",
          "caption": "Remote peer",
          "readme": "Each instance of this class represents another OSE instance and\nencapsulates communication with it.  It creates and manages the\n[WebSocket wrapper] class instance, which handles communication\nthrough WebSockets.  Can act as a server or a client.\n\nKeeps the connection opened by reconnecting.",
          "file": "lib/peer/remote.js",
          "aliases": "peer",
          "property": {
            "name": {
              "name": "name",
              "type": "property",
              "dtype": "String",
              "description": "Peer name unique within a group of communicating peers. It is good\npractice to use a server domain name."
            },
            "url": {
              "name": "url",
              "type": "property",
              "dtype": "String",
              "description": "WebSockets URL. When defined, the peer can connect as a client to a\nnear OSE instance."
            },
            "ws": {
              "name": "ws",
              "type": "property",
              "dtype": "Object",
              "description": "Current [WebSocket wrapper] instance connected to an OSE instance\nrepresented by this peer."
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Class constructor.",
              "params": [
                {
                  "name": "name",
                  "description": "Peer name",
                  "type": "String"
                },
                {
                  "name": "url",
                  "description": "WebSockets URL",
                  "type": "String"
                }
              ]
            },
            "connect": {
              "name": "connect",
              "type": "method",
              "description": "Call to connect as a client to the server peer defined in\n`this.url`.",
              "params": [
                {
                  "name": "force",
                  "description": "Force connection even when other WebSocket connection is already active.",
                  "type": "Boolean"
                }
              ]
            },
            "isConnected": {
              "name": "isConnected",
              "type": "method",
              "description": "Check whether the peer is connected"
            },
            "disconnect": {
              "name": "disconnect",
              "type": "method",
              "description": "Call to close WebSocket connection to remote peer."
            },
            "verify": {
              "name": "verify",
              "type": "method",
              "description": "Called after a remote peer WebSocket connects as a client to this HTTP server.",
              "params": [
                {
                  "name": "req",
                  "description": "Verification request data.",
                  "type": "Object"
                }
              ]
            },
            "getWs": {
              "name": "getWs",
              "type": "method",
              "description": "Finds a WebSocket for the current peer or a gateway to this\npeer. Returns connected [WebSocket wrapper].",
              "params": [
                {
                  "name": "cb",
                  "description": "Response callback",
                  "type": "Function(err, ws)"
                }
              ]
            },
            "coreShard": {
              "name": "coreShard",
              "type": "method",
              "description": "Defines the core shard of the OSE instance represented by this peer.",
              "params": [
                {
                  "name": "shard",
                  "description": "[Shard] instance that acts as the core shard.",
                  "type": "Object"
                }
              ]
            }
          },
          "undefined": {
            "undefined": {
              "description": "Standard peer to peer communication RX handler. This handler is assigned to ws.rx.",
              "params": [
                {
                  "name": "this",
                  "description": "WS object",
                  "type": "Object"
                },
                {
                  "name": "data",
                  "description": "JSON data",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/peer/rx": {
          "name": "lib/peer/rx",
          "type": "module",
          "caption": "Peer RX handlers",
          "readme": "This module contains handlers for incomming communication of\nstandard peer to peer traffic.",
          "file": "lib/peer/rx.js",
          "method": {
            "ping": {
              "name": "ping",
              "type": "method",
              "description": "Ping handler.\nTODO: respond pong",
              "params": [
                {
                  "name": "ws",
                  "description": "[WebSocket wrapper]",
                  "type": "Object"
                },
                {
                  "name": "req",
                  "description": "Request data",
                  "type": "Object"
                }
              ]
            },
            "pong": {
              "name": "pong",
              "type": "method",
              "description": "Pong handler.\nTODO: Calculate timeshift",
              "params": [
                {
                  "name": "ws",
                  "description": "[WebSocket wrapper]",
                  "type": "Object"
                },
                {
                  "name": "req",
                  "description": "Request data",
                  "type": "Object"
                }
              ]
            },
            "shard": {
              "name": "shard",
              "type": "method",
              "description": "Establishes a link to the master shard",
              "params": [
                {
                  "name": "ws",
                  "description": "[WebSocket wrapper]",
                  "type": "Object"
                },
                {
                  "name": "req",
                  "description": "Request data",
                  "type": "Object"
                }
              ]
            },
            "open": {
              "name": "open",
              "type": "method",
              "description": "Open link response handler",
              "params": [
                {
                  "name": "ws",
                  "description": "[WebSocket wrapper]",
                  "type": "Object"
                },
                {
                  "name": "req",
                  "description": "Request data",
                  "type": "Object"
                }
              ]
            },
            "close": {
              "name": "close",
              "type": "method",
              "description": "Close link handler",
              "params": [
                {
                  "name": "ws",
                  "description": "[WebSocket wrapper]",
                  "type": "Object"
                },
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
                  "name": "ws",
                  "description": "[WebSocket wrapper]",
                  "type": "Object"
                },
                {
                  "name": "req",
                  "description": "Request data",
                  "type": "Object"
                }
              ]
            },
            "command": {
              "name": "command",
              "type": "method",
              "description": "Command handler",
              "params": [
                {
                  "name": "ws",
                  "description": "[WebSocket wrapper]",
                  "type": "Object"
                },
                {
                  "name": "req",
                  "description": "Request data",
                  "type": "Object"
                }
              ]
            }
          }
        },
        "lib/ws/browser": {
          "name": "lib/ws/browser",
          "type": "module",
          "caption": "Browser WebSocket wrapper",
          "readme": "Extension of `WebSocket wrapper` for browser",
          "file": "lib/ws/browser.js"
        },
        "lib/ws": {
          "name": "lib/ws",
          "type": "class",
          "caption": "WebSocket wrapper class",
          "readme": "Communication between two near OSE instances is carried out via the\nWebSocket protocol. The native WebSocket object, provided by the\nruntime environment, is wrapped by an instance of the WebSocket\nwrapper class. This instance is created and controlled by a [Peer]\ninstance and hides differences between the Node.js and browser\nenvironments.\n\nEach WebSocket wrapper instance handles incoming packets via its\n`rx()` method. WebSocket communication behaviour can be controlled\nby assigning some method to the `rx` property.",
          "file": "lib/ws/index.js",
          "aliases": "websocketWrapper websocket",
          "method": {
            "identify": {
              "name": "identify",
              "type": "method",
              "description": "Returns identification object"
            },
            "close": {
              "name": "close",
              "type": "method",
              "description": "Close WebSocket object, send a `disconnect` error to all peers, clean\nhandlers, deregister from peer."
            },
            "setWs": {
              "name": "setWs",
              "type": "method",
              "description": "Assign a WebSocket object to this wrapper.",
              "params": [
                {
                  "name": "ws",
                  "description": "WebSocket object",
                  "type": "Object"
                }
              ]
            },
            "wsOpen": {
              "name": "wsOpen",
              "type": "method",
              "description": "WebSocket object close handler, called after a WebSocket is closed."
            },
            "wsError": {
              "name": "wsError",
              "type": "method",
              "description": "WebSocket object error handler, called on WebSocket error.",
              "params": [
                {
                  "name": "err",
                  "description": "Error instance",
                  "type": "Object"
                }
              ]
            },
            "addLink": {
              "name": "addLink",
              "type": "method",
              "description": "Register a new [link]",
              "params": [
                {
                  "name": "socket",
                  "description": "`Socket` instance - one end of the `link`.",
                  "type": "Object"
                }
              ]
            },
            "delLid": {
              "name": "delLid",
              "type": "method",
              "description": "Deregister the `link` identified by `lid`",
              "params": [
                {
                  "name": "lid",
                  "description": "Ose.link id of the `link` to deregister.",
                  "type": "Number"
                }
              ]
            },
            "tx": {
              "name": "tx",
              "type": "method",
              "description": "Transmit data to peer via WebSocket object.",
              "params": [
                {
                  "name": "data",
                  "description": "Data to be sent",
                  "type": "Object"
                }
              ]
            },
            "txError": {
              "name": "txError",
              "type": "method",
              "description": "Send error message to peer via the WebSocket object.",
              "params": [
                {
                  "name": "lid",
                  "description": "Ose.link id",
                  "type": "Number"
                },
                {
                  "name": "err",
                  "description": "`Error` instance",
                  "type": "Object"
                }
              ]
            },
            "isConnected": {
              "name": "isConnected",
              "type": "method",
              "description": "Check whether the WebSocket object is connected"
            },
            "onTime": {
              "name": "onTime",
              "type": "method",
              "description": "Regularly check the socket state and take according actions. Timer\nis defined by parts of this class dependent on the runtime environment."
            }
          }
        },
        "lib/ws/master": {
          "name": "lib/ws/master",
          "type": "class",
          "caption": "Master WebSocket client socket",
          "readme": "Created when a new link is requested from another peer via a\nWebSocket. Acts as a client socket of the link.\n\nTogether with [ose/lib/ws/slave], this makes links\nnetwork-transparent.",
          "file": "lib/ws/master.js"
        },
        "lib/ws/node": {
          "name": "lib/ws/node",
          "type": "module",
          "caption": "Node WebSocket wrapper",
          "readme": "Extension of `WebSocket wrapper` for Node.js",
          "file": "lib/ws/node.js"
        },
        "lib/ws/relay": {
          "name": "lib/ws/relay",
          "type": "class",
          "caption": "Relaying WebSocket response socket",
          "readme": "Created when a peer responds to a link request with `open()`. Acts\nas a response socket of the link.\n\nTogether with [ose/lib/ws/master], this makes links\nnetwork-transparent.",
          "file": "lib/ws/relay.js"
        },
        "lib/ws/slave": {
          "name": "lib/ws/slave",
          "type": "class",
          "caption": "WebSocket browser worker",
          "readme": "Worker object that isolates the [WebSocket wrapper] timer from the\n`window` object in the browser. A workaround for better (but still\nnot correct!) timer behaviour in the Android environmnent while\nsleeping.",
          "file": "lib/ws/worker.js"
        }
      }
    },
    "link": {
      "name": "link",
      "caption": "Sockets and links",
      "readme": "The framework makes it possible to easily create links between\n`entries` to allow communication regardless of whether it is\nrealized within one OSE instance or transparently across multiple\nOSE instances. A link is a virtual bidirectional communication\nchannel between two sockets. Link cannot exist without an active\n[peer-to-peer] connection channel between sockets. When some\nWebSocket channel is closed, an `error` handler is called on both\nends of links using such channel and links are closed.\n\nEach socket is an object with handlers. A socket is either a client\nsocket or a response socket. To establish a link, a client socket\nmust first be created. The client socket must then be delivered to\nthe master entry's handler. This handler must then create a\ncorresponding response socket and open a link.  After the link is\nestablished, the client and response sides become equal.",
      "file": "lib/link.js",
      "line": 145,
      "aliases": "link links socket sockets clientSocket responseSocket",
      "description": "## Example\n\nBelow is a real example of how a link is created and works between\nthe [light entry] and the [switch entry]. The [light entry] has a\ncontrolling [switch entry] identification assigned in its\n`entry.data.switch` value. Based on this object, the [light entry]\ncalls its `postTo()` method that sends a `relay` command to the\n[switch entry] together with the client socket. The [switch entry]\nthen creates a response socket and links the two sockets by calling\n`Ose.link.open()`. The `open()` handler of the client socket is\nthen invoked. From now on, the switch response socket relays\n`press`, `release`, `hold` and `tap` events to the client socket of\nthe [light entry].\n\nThis example is composed of snippets from the following files:\n\n- Light entry kind: [ose-control/lib/light/index.js]\n- Light client socket class: [ose-control/lib/light/switch.js]\n- Switch entry kind: [ose-control/lib/switch/index.js]\n- Switch response socket class: [ose-control/lib/switch/relay.js]\n\nCreation of client socket – [ose-control/lib/light/index.js]\n\n    // Create a client socket class\n    var Switch = M.class('ose-control/lib/light/switch');\n\n    ...\n    // Create a client socket when an entry is initializing\n    new Switch(entry);\n    ...\n\nSend a command to the [switch entry] after the client socket is initialized – [ose-control/lib/light/switch.js]\n\n    ...\n    that.entry.postTo(\n      that.entry.data.switch,\n      'relay',\n      null,\n      that\n    );\n    ...\n\nCreate a switch response socket in [switch entry] `relay` command handler – [ose-control/lib/switch/index.js]\n\n    // Creates response socket class\n    var Relay = M.class('ose-control/lib/switch/relay');\n    ...\n    // Registers a relay handler in the switch entry kind\n    this.on('relay', relay);\n    ...\n    // Handler body\n    function relay(req, socket) {\n      // Creates response socket\n      new Relay(this.entry, socket);\n    };\n\nOpen the link after response socket is initialized – [ose-control/lib/switch/relay.js]\n\n    // Open link; `this` is the response socket, and `socket` is the\n    // client socket.  On both sides, the other socket is assigned to\n    // the `link` property (e.g. `client.link = response`).\n    Ose.link.open(this, socket, resp);\n\nThe client's `open()` handler is called – [ose-control/lib/light/switch.js].\n\n    exports.open = function(req) {\n      ...\n    };\n\n\n## Handlers\nEach `socket` is an object with handlers attached to it. A handler\nis a method directly assigned to a socket object (or a prototype\nchain) with the handler's `name` as the socket object's key. A\nsocket is not an `EventEmitter`.\n\nHandlers are called directly via `this.link.handler(data)`, where\n`handler` is the handler's name and `this` is the the other socket\nof the link.\n\nThere are some special handlers:\n\n- `open([data])`:<br />\n  Invoked on the client side when the response calls\n  `Ose.link.open(resp, client, data)`. On both sides, the other\n  socket is assigned to the `link` property (e.g. `client.link =\n  response`). There is no `open()` handler on the response side.\n\n- `close([data])`:<br />\n  Invoked when the link is gracefully closed by\n  `Ose.link.close(socket, data)`. Can be called instead of\n  `Ose.link.open()` from the response side. In such case the link\n  is not opened and acts only as a callback. `Ose.link.close()`\n  destroys the link and deletes the `link` property of both\n  sockets.\n\n- `error(err)`:<br />\n  Invoked in the case of an error with `Ose.link.error(socket,\n  err)`. `err` should be an instance of `Error`. `Ose.link.error()`\n  destroys the link and deletes the `link` property of both sides.\n  An error handler is invoked, for example, when the underlying\n  WebSocket channel is closed.\n\n## Network transparency\n\nTODO",
      "modules": {
        "lib/link": {
          "name": "lib/link",
          "type": "module",
          "caption": "Links helper",
          "readme": "This module contains methods for controlling links.",
          "file": "lib/link.js",
          "method": {
            "open": {
              "name": "open",
              "type": "method",
              "description": "Call by the response side to open a link. On both the response and\nclient side, the other socket is assigned to the `link` property\n(e.g. `client.link = response`). The `open(data)` handler on the\nclient side is invoked.",
              "params": [
                {
                  "name": "socket",
                  "description": "Reponse socket",
                  "type": "Object"
                },
                {
                  "name": "client",
                  "description": "Client socket",
                  "type": "Object"
                },
                {
                  "name": "data",
                  "description": "Data to be sent to the client",
                  "type": "Object"
                }
              ]
            },
            "close": {
              "name": "close",
              "type": "method",
              "description": "Call to gracefully close a link. This method invokes `close(data)`\nhandlers on both the client and response side.",
              "params": [
                {
                  "name": "socket",
                  "description": "Socket to be closed",
                  "type": "Object",
                  "optional": true
                },
                {
                  "name": "data",
                  "description": "Data sent to the close handler",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "error": {
              "name": "error",
              "type": "method",
              "description": "Call to close a link with an error. This method invokes\n`error(data)` handlers on both the client and response side.",
              "params": [
                {
                  "name": "socket",
                  "description": "Socket object",
                  "type": "Object"
                },
                {
                  "name": "err",
                  "description": "`Error` instance",
                  "type": "Object"
                }
              ]
            }
          },
          "undefined": {
            "undefined": {
              "description": "Relay `req` to `ws`."
            }
          },
          "property": {
            "forbiddenNames": {
              "name": "forbiddenNames",
              "type": "property",
              "dtype": "Array",
              "description": "An array of handler names that can't be used."
            }
          }
        }
      }
    },
    "logger": {
      "name": "logger",
      "caption": "Logging and error handling",
      "readme": "To log errors and messages, each module should at first create `M.log` instance by calling\n`Ose.logger(context)`. The context is an identifier of the logging\nnamespace. `Ose.logger()` either returns an existing `M.log`\ninstance for the namespace or creates a new one. Once created, the logger can be used to log messages.\n\nError handling tries to adhere to the production practices outlined\nby Joyent ([Error Handling in\nNode.js](http://www.joyent.com/developers/node/design/errors)).",
      "file": "lib/logger.js",
      "line": 63,
      "aliases": "error logging",
      "description": "## Usage\n\nExample module :\n\n    'use strict';\n\n    var Ose = require('ose');\n    var M = Ose.module(module);\n    ...\n    M.log.info('Processing');\n\nTo create an error, it is possible to use `Ose.error()`, which\nappends an optional `subject` and `data` to the error object. the\n`subject` and `data` make it easier to analyse problems. If an\nerror is logged, `subject.identify()`, if it is defined, is used\nto display subject identification.\n\nExample:\n\n    var err = Ose.error(subject, 'Something has gone terribly wrong.', arguments);\n    ...\n\n    // To log an error:\n    M.log.error(err);\n\n    // or to use an error in callback:\n    cb(err);\n\n    // or to throw an error:\n    throw err;\n\n    // or send an error to a link:\n    Ose.link.error(socket, err);\n\nWhen calling any callback with an error response, sending an error to a link, or throwing an exception, `Error` instance created by `Ose.error()` should be used.",
      "modules": {
        "lib/logger": {
          "name": "lib/logger",
          "type": "class",
          "caption": "Logger",
          "file": "lib/logger.js",
          "property": {
            "context": {
              "name": "context",
              "type": "property",
              "dtype": "String",
              "description": "Logging namespace"
            }
          },
          "method": {
            "init": {
              "name": "init",
              "type": "method",
              "description": "Class constructor",
              "params": [
                {
                  "name": "context",
                  "description": "Context of logger instance",
                  "type": "String"
                }
              ]
            },
            "interval": {
              "name": "interval",
              "type": "method",
              "params": [
                {
                  "name": "message",
                  "description": "Message to log",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Optional data to be logged",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "obsolete": {
              "name": "obsolete",
              "type": "method",
              "description": "Use when obsolete code is executed.\nDisplays message with data and stack trace.",
              "params": [
                {
                  "name": "message",
                  "description": "Message to log",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Optional data to be logged",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "missing": {
              "name": "missing",
              "type": "method",
              "description": "Use when something is missing.\nDisplays message with data and stack trace.",
              "params": [
                {
                  "name": "message",
                  "description": "Message to log",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Optional data to be logged",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "caught": {
              "name": "caught",
              "type": "method",
              "description": "Use when an error object is caught",
              "params": [
                {
                  "name": "err",
                  "description": "Error object",
                  "type": "Object"
                },
                {
                  "name": "message",
                  "description": "Message to log",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Optional data to be logged",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "bind": {
              "name": "bind",
              "type": "method",
              "description": "Creates logging function",
              "params": [
                {
                  "name": "severity",
                  "description": "Text indicating everity",
                  "type": "String"
                },
                {
                  "name": "message",
                  "description": "Message to log",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Optional data to be logged",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "debug": {
              "name": "debug",
              "type": "method",
              "description": "Logs message with 'debug' severity.",
              "params": [
                {
                  "name": "message",
                  "description": "Message to log",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Optional data to be logged",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "info": {
              "name": "info",
              "type": "method",
              "description": "Logs message with 'info' severity.",
              "params": [
                {
                  "name": "message",
                  "description": "Message to log",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Optional data to be logged",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "notice": {
              "name": "notice",
              "type": "method",
              "description": "Logs message with 'notice' severity.",
              "params": [
                {
                  "name": "message",
                  "description": "Message to log",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Optional data to be logged",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "warning": {
              "name": "warning",
              "type": "method",
              "description": "Logs message with 'warning' severity.",
              "params": [
                {
                  "name": "message",
                  "description": "Message to log",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Optional data to be logged",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "error": {
              "name": "error",
              "type": "method",
              "description": "Logs error object with optional data",
              "params": [
                {
                  "name": "err",
                  "description": "Error object",
                  "type": "Object"
                },
                {
                  "name": "data",
                  "description": "Optional data to be logged",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "unhandled": {
              "name": "unhandled",
              "type": "method",
              "description": "Logs unhandled error object  with optional data",
              "params": [
                {
                  "name": "message",
                  "description": "Message to be logged",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Optional data to be logged",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "log": {
              "name": "log",
              "type": "method",
              "description": "Displays log message to stdout",
              "params": [
                {
                  "name": "severity",
                  "description": "Text indicating everity",
                  "type": "String"
                },
                {
                  "name": "message",
                  "description": "Message to log",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Optional data to be logged",
                  "type": "*",
                  "optional": true
                }
              ]
            }
          }
        }
      }
    },
    "plugin": {
      "name": "plugin",
      "caption": "Plugins",
      "readme": "To run, each [OSE instance] requires a main configuration object\n(JavaScript object or JSON). Each main configuration object\nproperty contains configuration data for one plugin. A plugin can\nbe a class, singleton or module.\n\nAll plugins are registered to the `Ose.plugins` singleton. This\nsingleton prepares configurations for the OSE browser instances as\npart of the response to HTTP requests for `index.html`.\n\nDuring [OSE instance] startup, the following steps are carried out:\n1. Setup of the framework\n2. Preparation of plugins\n3. Configuration of plugins\n4. Asynchronous processing of plugin dependencies\n\nAfter all dependencies are processed, the `initialized` event is\nemitted by `Ose.plugins`.",
      "file": "lib/plugins.js",
      "line": 112,
      "aliases": "osePlugin oseConfig pluginsComponent",
      "description": "## OSE framework setup\n\nBasic classes and singletons are set up depending on the specified\nruntime environment (browser or server).\n\n\n## Preparation of plugins\n\nEach property of the main configuration object contains the\nconfiguration of a single OSE plugin. The `id` property of each\nplugin configuration specifies the module to be loaded with\n`require()`. If the `id` property is omitted, the key of the plugin\nconfiguration is taken as the module id.\n\nAny CommonJS module can be a plugin. If a module defines a class,\nits instance is created without parameters and becomes a plugin.\nIf a module defines a singleton, it gets initialized without any\narguments. Modules not defining a class or singleton are simply\nrequired.\n\n\n## Configuration of plugins\n\nAfter all plugins are created, individual plugins are configured\nusing the `plugin.config(data)` method, where `data` is taken from\nthe main configuration object for each plugin.\n\nThe `config` method, if it exists, is called on every prototype in\na plugin prototype chain. It must not call the ancestor `config()`\nmethod.\n\nDuring this step, dependencies can be registered by calling\n`ose.plugins.addDependency()`.\n\n\n## Dependencies\n\nEach dependency is defined by a method with a callback and an\noptional 'test' parameter.\n\nExample:\n\nTODO addDependency(dependency, test) ...\n\nTODO dependency(cb)...\n\nWhen a dependency is processed, it must call the provided\ncallback. When the processing of one dependency ends, the next\ndependency whose `test` method returns `TRUE` is found and\nprocessed. Other dependencies can be added during this step. When\nthere are no more dependencies left, the `initialized` event is\nemitted by `Ose.plugins`.\n\nTo run some code after all plugins are initialized, register a\nmethod via `Ose.plugins.on('initialized', <method>)` during the\n\"configuration\" or \"dependencies\" phase.\n\n\n## Extending\n\nIt is easy to extend OSE by creating a new npm package and adding\nan empty object with the package name as a key to the main\nconfiguration object of an [OSE instance].\n\nTo use some configuration, define the `config()` method on the\npackage's main `module.exports` and provide some configuration data\nto the package configuration property of the main configuration\nobject. The [Plugins component] then initializes the new package as\nanother OSE plugin during startup of an [OSE instance].\n\nTODO: example",
      "modules": {
        "lib/plugins": {
          "name": "lib/plugins",
          "type": "singleton",
          "caption": "Plugins singleton",
          "readme": "Handles plugin instances defined in configuration file (or object).",
          "file": "lib/plugins.js",
          "method": {
            "push": {
              "name": "push",
              "type": "method",
              "description": "Adds configuration item to configuration object for the browser.",
              "params": [
                {
                  "name": "key",
                  "description": "Configuration name",
                  "type": "String"
                },
                {
                  "name": "plugin",
                  "description": "Plugin",
                  "type": "Object"
                },
                {
                  "name": "data",
                  "description": "Configuration data",
                  "type": "Object"
                }
              ]
            }
          }
        }
      }
    },
    "wrap": {
      "name": "wrap",
      "caption": "Classes and singletons",
      "readme": "This component facilitates the usage of classes or singletons with\nsimple code sharing and runtime specific behaviour by the browser\nand Node.js environments. This makes it possible to use\nprototypal inheritance to create classes and singletons and to mix\nin modules into class prototypes and singletons.",
      "file": "lib/wrap.js",
      "line": 480,
      "aliases": "class classes singleton singletons eventEmitter super",
      "description": "## Module wrapping\n\nThe creation of classes and singletons is based on the CommonJS\nModules spec. Each class or singleton is defined within its own\nmodule.\n\nTo create a class or singleton, you first need to wrap the module\ncontaining the class or singleton definition by calling one of the\nfollowing:\n\n- `Ose.class(module)`.\n- `Ose.singleton(module)`.\n- `Ose.package(module)`.\n- `Ose.module(module)`.\n\nExample:\n\n    // Module containing class definiton.\n    'use strict';\n\n    // Require OSE.\n    var Ose = require('ose');\n    // Create and return wrap instance\n    var M = Ose.class(module);\n    ...\n\nThe `Ose` variable gives access to global OSE functionalities.  The\n`M` variable contains the module wrapper and gives access to\nfunctionalities relative to the module.\n\n**IMPORTANT:**<br />\nEach time a module is wrapped using `Ose.class`, `Ose.singleton` or\n`Ose.package` (ie. not `Ose.module`), the wrapper adds the `M`\nproperty to `module.exports`. It is not allowed to overwrite this\nproperty. The `M` property is read-only and non-configurable. It is\nbetter not to overload this property.\n\n## Classes\n\nA class is a function used as a class constructor with a prototype.\n\nTo use a class, you need to carry out three steps:\n1. Prepare a module containing a class definition.\n2. Obtain a class constructor.\n3. Create a new object.\n\nFirst, the class needs to be prepared in the module containing the\nclass definition by calling `Ose.class(module, [constructor],\n[super])`. The `constructor` is an optional class constructor\nmethod. If it is not defined, it gets created automatically. The\n`super` parameter can be `undefined`, a class constructor or a\nclass name. It is not possible to inherit from singletons.\n\nExample module with class preparation::\n\n    // Module \"ose/lib/entry\"\n    'use strict';\n\n    // Require OSE\n    var Ose = require('ose');\n\n    // Wrap module and specifies a class with a constructor\n    // function `C` and \"EventEmitter\" as a super-class.\n    var M = Ose.class(module, C, 'EventEmitter');\n\n    // Class constructor\n    function C(...) {\n      // Call super constructor\n      M.super.call(this);\n      ...\n    }\n\n    // Add properties of the class' prototype to the `exports`\n    // object:\n\n    // Define property.\n    exports.config = function(name, data) {\n      ...\n    };\n\n    // Define another property\n    exports.identify = function() {\n      return {\n        space: this.shard.space.name,\n        shard: this.shard.sid,\n        entry: this.id\n      };\n    };\n\n\nThe second step is to obtain a class constructor with its\nprototype. This step is carried out when the class is first\naccessed by calling `M.class('ose/lib/entry')`. Multiple calls to\n`M.class('ose/lib/entry')` return the same, already created\nclass. When called for the first time, the class prototype is\ncreated from module exports and optional mixins. If the class has\nan ancestor, the constructor should usually call the super\nconstructor (see example above). If a class is defined without a\nconstructor, the constructor is created.\n\nThe last step is to create a new object based on the class.\n\nClass usage example:\n\n    // Some other module ...\n    'use strict';\n\n    // Require OSE\n    var Ose = require('ose');\n    // Wrap module\n    var M = Ose.module(module);\n\n    // Obtain class constructor (second step).\n    var Entry = M.class('ose/lib/entry');\n\n    ...\n\n    // Create new object as an Entry instance (third step).\n    entry = new Entry(shard, kind);\n\n    ...\n\nThere is a built-in class named **EventEmitter**. To use this\nclass, pass `'EventEmitter'` to the `class()` method (see the\nexamples above). In the browser environment, the\n[\"wolfy87-eventemitter\"](https://github.com/Wolfy87/EventEmitter)\npackage is used.\n\nTo access the `module.exports` object that is wrapped and prepared\nas a class, call the standard `require('ose/lib/entry')`\nmethod. This call returns the original `module.exports` object.\n\nTo extend any class, use the following example:\n\n    // Require OSE\n    var Ose = require('ose');\n    // Wrap module\n    var M = Ose.module(module);\n\n    // Obtain Entry class\n    var Entry = M.class('ose/lib/entry');\n\n    // Add new method to entry class prototype\n    Entry.prototype.newMethod = function() {...};\n\nChanging the prototype of a class alters all its instances and\ndescendants, even those already created.\n\n## Singletons\n\nEach singleton is an object. There are two types of singletons. The\nfirst initializes itself, and the second is initialized outside the\nsingleton definition.\n\n**IMPORTANT:**<br />\nEvery singleton must always exist in only one instance\nwithin a single running instance of OSE. The use of npm can result\nin mixing multiple installations of packages using singletons\nwithin a single OSE instance. This situation must be avoided.\n\nLike the creation of a class, the creation of a singleton is a\nthree-step process:\n\n1. Prepare a module containing the singleton's definition and\n   create the singleton\n2. Obtain singleton initialization method\n3. Initialize and obtain the singleton\n\nExample module with self-initializing singleton::\n\n    // Require OSE\n    var Ose = require('ose');\n    // Wrap module as a singleton\n    var M = Ose.singleton(module, I, 'EventEmitter');\n    // Initialization of the singleton\n    exports = M.init();\n\n    // Singleton initialization\n    function I() {\n      // Call super constructor\n      M.super.call(this);\n      ...\n    }\n\n    // Properties of the singleton are defined in the `exports` variable:\n\n    exports.identify = function() {\n      return {\n        id: this.id\n      };\n    };\n\n    exports.getId = function() {\n      return id;\n    };\n\n    ...\n\nExample module without singleton self-initialization:\n\n    // Require OSE\n    var Ose = require('ose');\n    // Wrap module as a singleton\n    var M = Ose.singleton(module, I, 'EventEmitter');\n    // Initialization of the singleton\n    exports = M.exports;\n    ...\n\nExample module with separate singleton initialization:\n\n    // Some other module ...\n    'use strict';\n\n    // Require OSE\n    var Ose = require('ose');\n    // Wrap module\n    var M = Ose.module(module);\n\n    ...\n\n    // Obtain singleton initialization (second step)\n    var init = M.singleton('ose/lib/peer/list');\n\n    // Initialize and obtain singleton (third step)\n    var result = init(arg);\n\n    // Or the second and third step together without the init\n    // variable:\n    var result = M.singleton('ose/lib/peer/list')(arg);\n\n    ...\n\nTo access or extend any initialized singleton, use standard `require`:\n\n    // Module changing singleton.\n    'use strict';\n\n    // Require OSE.\n    var Ose = require('ose');\n\n    // Obtain singleton.\n    var result = require('ose/lib/id');\n\n    // Add new method to the singleton.\n    result.newMethod = function() {...};\n\nThe singleton can be changed before it is initialized. If this is\ndone, it is possible that the change will be overwritten by mixing\nother modules during singleton initialization.\n\n\n## Mixins\n\nIt is possible to mix another module into a class prototype or\nsingleton. To do that, use the `append()` or `prepend()` methods of\nthe `wrap` object.\n\nExample:\n\n    // Some module\n    'use strict';\n    // Require OSE\n    var Ose = require('ose');\n\n    // Wrap module\n    var M = Ose.class(module, C, 'EventEmitter');\n\n    // Prepend a module\n    M.prepend('someModuleName')\n    // Append a module depending on the runtime.\n    M.append('runtime')\n\nThe `append()` or `prepend()` methods supports call chaining. Both\nmethods accept a module name or array of module names. Properties\nto a class prototype or singleton are mixed in the second step of\nclass or singleton creation. Conflicting properties are overwritten\nin the following order: Last prepended, prepended, module.exports,\nfirst appended, appended.\n\nIt is possible to use the following predefined values as module names:\n* 'browser' – If in the browser environment, use the `browser.js`\n   module from the same directory.\n* 'node' – If in the Node.js environment, use the `node.js`\n   module from the same directory.\n* 'runtime' – Use either the `browser.js` or `node.js` module\n   depending on the environment.\n\nIt is possible to use relative paths as module names.\n\n## Relative paths\nTODO\n\nA class or singleton is identified by its module\n(e.g. `ose/lib/entry`).",
      "modules": {
        "wrap/common": {
          "name": "wrap/common",
          "type": "class",
          "caption": "Common wrapper class",
          "readme": "Properties common for all wrappers",
          "file": "lib/wrap.js",
          "undefined": {
            "undefined": {
              "description": "[Property descriptor]\n(https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty)\ntypes enumeration."
            }
          },
          "method": {
            "setup": {
              "name": "setup",
              "type": "method",
              "description": "Sets up module wrapper of this module"
            }
          }
        },
        "wrap/class": {
          "name": "wrap/class",
          "type": "class",
          "super": "ose/wrap.common",
          "caption": "Class wrapper",
          "readme": "Class defining a class module wrapper.",
          "file": "lib/wrap.js"
        },
        "wrap/module": {
          "name": "wrap/module",
          "type": "class",
          "super": "ose/wrap.common",
          "caption": "Module wrapper",
          "readme": "Class defining a standard module wrapper.",
          "file": "lib/wrap.js"
        },
        "wrap/package": {
          "name": "wrap/package",
          "type": "class",
          "super": "ose/wrap.common",
          "caption": "Package wrapper",
          "readme": "Class defining a package module wrapper.",
          "file": "lib/wrap.js"
        },
        "wrap/singleton": {
          "name": "wrap/singleton",
          "type": "class",
          "super": "ose/wrap.common",
          "caption": "Singleton wrapper",
          "readme": "The class defining a singleton module wrapper.",
          "file": "lib/wrap.js",
          "method": {
            "identify": {
              "name": "identify",
              "type": "method",
              "description": "Return identification object"
            },
            "object2Def": {
              "name": "object2Def",
              "type": "method",
              "description": "Copy and convert property definitions from \"src\" class definition\nto \"dst\" class definition.",
              "params": [
                {
                  "name": "src",
                  "description": "Source object",
                  "type": "Object"
                },
                {
                  "name": "dst",
                  "description": "Destination definition object",
                  "type": "Object"
                }
              ]
            },
            "prepend": {
              "name": "prepend",
              "type": "method",
              "description": "TODO",
              "params": [
                {
                  "name": "extend",
                  "description": "Extension to be mixed into wrapped class or singleton.",
                  "type": "String|Array"
                }
              ]
            },
            "": {
              "name": "",
              "type": "method",
              "params": [
                {
                  "name": "extend",
                  "description": "TODO",
                  "type": "Object"
                }
              ]
            },
            "isSuper": {
              "name": "isSuper",
              "type": "method",
              "description": "Tests whether `desc` is descendant of `sup`. When called with one argument, this argument is assigned to `desc` and super is `this.ctor`",
              "params": [
                {
                  "name": "sup",
                  "description": "Super",
                  "type": "String|Object|Function"
                },
                {
                  "name": "desc",
                  "description": "Descendant",
                  "type": "String|Object|Function"
                }
              ]
            }
          },
          "undefined": {
            "undefined": {
              "description": "Return property descriptor type of \"prop\". (exports.pdType.data || exports.pdType.accessor || exports.pdType.object)"
            }
          }
        }
      }
    }
  },
  "modules": {
    "lib/browser": {
      "name": "lib/browser",
      "type": "module",
      "caption": "OSE browser",
      "readme": "This script contains the OSE framework initialization in the browser. It must be sourced before any other OSE module that is using `window.ose()`.\n\nThe following steps are taken in this script:\n- The limited CommonJS require() behaviour is prepared. Every module, provided by the backend to the browser, is wrapped to `window.ose()` method call.\n- The `run` method on `document.onload` event is registered.\n- After the document is ready, `ose.setup()` is called to prepare OSE framework.\n- Finally [plugins] are configured with configuration from module `ose/config`.",
      "file": "lib/browser.js",
      "property": {
        "Cache": {
          "name": "Cache",
          "type": "property",
          "dtype": "Object",
          "description": "Cached modules, `require()` was already called on them"
        },
        "Modules": {
          "name": "Modules",
          "type": "property",
          "dtype": "Object",
          "description": "Registered, but not yet created modules"
        }
      },
      "method": {
        "window.ose": {
          "name": "window.ose",
          "type": "method",
          "description": "CommonJS Require emulation. Register module wrapped by function `init`.",
          "params": [
            {
              "name": "id",
              "description": "Module id",
              "type": "String"
            },
            {
              "name": "filename",
              "description": "Module filename",
              "type": "String"
            },
            {
              "name": "init",
              "description": "Module initialization",
              "type": "Function"
            }
          ]
        },
        "run": {
          "name": "run",
          "type": "method",
          "description": "Setup OSE framework and intialize plugins."
        },
        "require": {
          "name": "require",
          "type": "method",
          "description": "Emulate CommonJS \"require\".\n`this` is bound to the calling module.",
          "params": [
            {
              "name": "id",
              "description": "Module to be required",
              "type": "String"
            }
          ]
        },
        "cache": {
          "name": "cache",
          "type": "method",
          "description": "Initialize and move module from `Modules` to `Cache`.",
          "params": [
            {
              "name": "id",
              "description": "Module to be cached",
              "type": "String"
            }
          ]
        }
      },
      "undefined": {
        "undefined": {
          "description": "Make this module available via `require(\"ose/lib/browser\")`"
        }
      }
    },
    "lib/cli": {
      "name": "lib/cli",
      "type": "module",
      "caption": "CLI interface module",
      "readme": "This module provides a CLI interface module for OSE Node.js\ninstances. Commands can be entered to readline interface or run as\na script from a configuration file.\n\nInteractive example:\n    > sleep 10000\n    > space klinec.snasel.net\n    > shard d1\n    > entry kitchen.heater\n    > command power 0.23\n    > entry living.heater\n    > info\n    > detail\n\nConfiguration file example:\n\n    exports.cli = {\n      type: 'ose/lib/cli',\n      script: TODO\n        'wait 10000',\n        'space klinec.snasel.net',\n        'shard d1',\n        'entry kitchen.heater',\n        'command power 0.23',\n        'entry living.light',\n        'command switch \"on\"',\n        'info',\n        'detail'\n    }",
      "file": "lib/cli.js"
    },
    "lib/counter": {
      "name": "lib/counter",
      "type": "class",
      "caption": "Counter",
      "readme": "Counters are used for multiple asynchronous operations with one final callback.",
      "file": "lib/counter.js",
      "property": {
        "cb": {
          "name": "cb",
          "type": "property",
          "dtype": "Function (err)",
          "description": "Final callback"
        },
        "timeout": {
          "name": "timeout",
          "type": "property",
          "dtype": "Number",
          "description": "Timeout in milliseconds"
        }
      },
      "method": {
        "init": {
          "name": "init",
          "type": "method",
          "description": "Class constructor, sets up `cb` and `count = 1`",
          "params": [
            {
              "name": "cb",
              "description": "Callback",
              "type": "Function (err)"
            }
          ]
        },
        "done": {
          "name": "done",
          "type": "method",
          "description": "Sets up `timeout` and `cb` properties and decrements a counter.",
          "params": [
            {
              "name": "timeout",
              "description": "Timeout in milliseconds",
              "type": "Number",
              "optional": true
            },
            {
              "name": "cb",
              "description": "Callback",
              "type": "Function (err)"
            }
          ]
        },
        "inc": {
          "name": "inc",
          "type": "method",
          "description": "Increments counter by count.",
          "params": [
            {
              "name": "count",
              "description": "Count to increment counter by",
              "type": "Number",
              "optional": true,
              "optdefault": "1"
            }
          ]
        },
        "dec": {
          "name": "dec",
          "type": "method",
          "description": "Decrements counter by one.",
          "params": [
            {
              "name": "err",
              "description": "Error object",
              "type": "Object",
              "optional": true
            },
            {
              "name": "key",
              "description": "Key of a call",
              "type": "String",
              "optional": true
            },
            {
              "name": "resp",
              "description": "Response for a `key`",
              "type": "*",
              "optional": true
            }
          ]
        }
      },
      "undefined": {
        "undefined": {
          "description": "Increments a counter and returns method to be called after task has been done.",
          "params": [
            {
              "name": "key",
              "description": "Key, to identify a task",
              "type": "String",
              "optional": true
            }
          ]
        }
      }
    },
    "core": {
      "name": "core",
      "type": "singleton",
      "caption": "OSE core",
      "readme": "Most modules use the `OSE core` singleton by calling `var Ose = require('ose')`.",
      "file": "lib/index.js",
      "property": {
        "classes": {
          "name": "classes",
          "type": "property",
          "dtype": "Object",
          "description": "Predefined class names and constructors"
        }
      },
      "method": {
        "setup": {
          "name": "setup",
          "type": "method",
          "description": "Sets up OSE framework",
          "params": [
            {
              "name": "runtime",
              "description": "(`\"browser\"` | `\"node\"`) Runtime environment",
              "type": "String"
            }
          ]
        },
        "dia": {
          "name": "dia",
          "type": "method",
          "description": "Return new string based on `val` with diacriticts transformed to ascii.",
          "params": [
            {
              "name": "val",
              "description": "Value to transform.",
              "type": "String"
            }
          ]
        },
        "config": {
          "name": "config",
          "type": "method",
          "description": "OSE plugin configuration method.",
          "params": [
            {
              "name": "data",
              "description": "Configuration data",
              "type": "Object"
            }
          ]
        },
        "browserConfig": {
          "name": "browserConfig",
          "type": "method",
          "description": "Prepare configuration for the browser.",
          "params": [
            {
              "name": "config",
              "description": "Configuration object",
              "type": "Object"
            }
          ]
        },
        "addClass": {
          "name": "addClass",
          "type": "method",
          "description": "Add a class constructor `ctor` into predefined `classes`.",
          "params": [
            {
              "name": "name",
              "description": "Class name",
              "type": "String"
            },
            {
              "name": "ctor",
              "description": "Class constructor",
              "type": "Function"
            }
          ]
        },
        "getTime": {
          "name": "getTime",
          "type": "method",
          "description": "Return current time in unix timestamp format in microseconds"
        },
        "parseBool": {
          "name": "parseBool",
          "type": "method",
          "description": "Parses booleans",
          "params": [
            {
              "name": "val",
              "description": "Value to parse",
              "type": "Undefined|null|String|Number|Boolean"
            }
          ]
        },
        "counter": {
          "name": "counter",
          "type": "method",
          "description": "Creates a new counter. If \"cb\" is already a counter instance, it only increments it.\nCounters are used for multiple asynchronous operations with one final callback.",
          "params": [
            {
              "name": "cb",
              "description": "Final callback",
              "type": "Function"
            }
          ]
        },
        "scope": {
          "name": "scope",
          "type": "method",
          "description": "Creates a new scope instance of a given name or returns an existing one.",
          "params": [
            {
              "name": "name",
              "description": "Name of a scope",
              "type": "String"
            }
          ]
        },
        "callProtoChain": {
          "name": "callProtoChain",
          "type": "method",
          "description": "Call all methods with name \"method\" in \"subject\"s prototype chain.\n\n\"method\" is called with arguments specified after argument \"method\".",
          "params": [
            {
              "name": "subject",
              "description": "",
              "type": "Subject"
            },
            {
              "name": "method",
              "description": "",
              "type": "Function"
            },
            {
              "name": "arg",
              "description": "Optional arguments to send to subject's init function.",
              "type": "*",
              "optional": true,
              "multiple": true
            }
          ]
        }
      },
      "undefined": {
        "undefined": {
          "description": "Creates `Error` instance and appends a subject and data to it.\n\nSee [logging].",
          "params": [
            {
              "name": "subject",
              "description": "Subject of the error",
              "type": "*",
              "optional": true
            },
            {
              "name": "code",
              "description": "Error code",
              "type": "String"
            },
            {
              "name": "message",
              "description": "Error message",
              "type": "String",
              "optional": true
            },
            {
              "name": "data",
              "description": "Optional data describing error",
              "type": "Object",
              "optional": true
            }
          ]
        }
      }
    },
    "lib/node": {
      "name": "lib/node",
      "type": "module",
      "caption": "OSE node",
      "readme": "This module contains the OSE framework initialization in the Node.js.",
      "file": "lib/node.js"
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "Framework content",
      "readme": "Provides files of [ose] package to the browser.",
      "file": "content.js"
    }
  }
};