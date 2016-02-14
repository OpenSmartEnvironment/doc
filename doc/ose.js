Packages["ose"] = {
  "name": "ose",
  "npmname": "ose",
  "caption": "Framework",
  "readme": "Extensible framework for development and rapid prototyping of\napplications based on Node.js and HTML5.",
  "line": 13,
  "aliases": "framework oseFramework supportedBrowser supportedBrowsers",
  "features": "- Robust multi-instance architecture\n- Document-oriented partitioned data model\n- Event-driven network transparent communication\n- Near real-time synchronization\n- Code sharing between Node.js and web browsers\n- Extensible via npm packages",
  "comps": {
    "data": {
      "name": "data",
      "caption": "Data model",
      "readme": "The data model of the framework is designed so that individual\ninstances of OSE hold subsets of the data and together create a\nsingle whole. Data model is document-oriented.\n\nData partitions are called [shards]. Basic data units\n(similar to table records) contained by [shards] are called\n[entries].\n\nEach [entry] is of a certain [kind]. [Kinds] define the properties\nand behaviour of [entries]. Each kind is assigned to some [schema].\nEach kind can define document structure using [fields] component.\n\nEach [shard] belongs to a [space] that acts as the shard's\nnamespace. Each shard uses a certain [schema]. This schema defines\nthe entries that can be contained in the shard and how entry data\nare stored and retrieved. For example, the \"control\" schema,\ndefined in the [ose-control] package, uses LevelDB as the entry\ndata store. The \"fs\" schema, defined in the [ose-fs] package, uses\nthe filesystem and exposes files and directories as entries.\n\nSchemas and kinds define data structures with the following\nhierarchy:\n* schema\n  * kind\n\nBy contrast, spaces, shards and entries contain actual data\norganized as follows:\n* space\n  * shard\n    * entry\n\nExample:\n\nThe `reading.light` is an entry of the kind `light`, the `light`\nkind belongs to the `control` schema, and the `reading.light` entry\nis saved in the shard `living.room`, which belongs to the space\n`my.house`.\n\nTo retrieve an entry, call, for example, `shard.get(entryId,\ncallback)`. To get a list of entries, call `shard.query(queryName,\nrequest, callback)`. How data are retrieved depends on the\nparticular schema.\n\nChanges to shard data are made via [transactions]. Via\ntransactions, it is possible to add, patch and delete entries.<br>\n**IMPORTANT:**<br>\nTransactions are not yet ACID compliant, data may be lost during\npower outages or for other reasons.\n\nEach shard is managed by a certain [peer], which is its [home]. The\nOSE frameword makes it possible to work with shards and entries\nscattered across multiple [peers].",
      "file": "lib/subject.js",
      "line": 10,
      "aliases": "command commands entryCommand entryCommands commandHandler commandHandlers schema schemas",
      "description": "## Commands\nIt is possible to send commands to individual [entries] using\n`shard.post(entryIdentification, commandName, commandData,\nclientSocket)`. Each command is delivered to the [home] of the\ngiven [entry]. Commands consist of a command name and optional\ndata. A command can be a request for data or to establish a new\n[link].\n\nCommand handlers can be registered for a [kind] with an `on()`\nmethod call. The [Kind] class is not an [Event Emitter] descendant.\nIn command handler code, the target `entry` can be accessed in\n`this.entry`.\n\nExample:\n    TODO",
      "modules": {
        "lib/entry/command": {
          "name": "lib/entry/command",
          "type": "class",
          "caption": "Entry command client socket",
          "readme": "Sends a command to the target entry. This class ensures that\nlinks are reopened, it tries to reopen it as soon as possible\nafter they disconnect due to network problems, restarts of peers or\nother reasons.\n\nThis can be used as an ancestor of client sockets that are to be\nreopened automatically.",
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
            "data": {
              "name": "data",
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
            }
          }
        },
        "lib/entry": {
          "name": "lib/entry",
          "type": "class",
          "super": "EventEmitter",
          "caption": "Entry class",
          "readme": "An [Entry] instance is a data structure representing a physical\nobject or logical concept. Each [entry] belongs to a certain\n[shard]. Within the [shard], it has a unique `id`. Each [entry] is\nof a certain [kind] that defines its behaviour.\n\nAn [entry] can contain a data value `dval` object in JSON format\n(analogous to a database table row).\n\nThe `sval` JSON object, unlike `dval`, can\noften change and is non-persistent by design because it reflects\nchanging objective reality. Changes of `sval` objects are\npropagated to [peers] tracking changes of certain [entries].\n\nThe `dval` and `sval` objects can contain any valid JSON excluding\n`null`, which is used for deleting keys during patching.\n\nIn addition, the `blob` object may contain arbitrary binary\ndata. Each `blob` can be read as a stream.",
          "file": "lib/entry/index.js",
          "aliases": "entry entries dval data sval state statesOfEntries entryIdentification",
          "property": {
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
              "description": "Id of transaction last updating `dval`"
            },
            "dval": {
              "name": "dval",
              "type": "property",
              "dtype": "Object",
              "description": "Persistent data value"
            },
            "master": {
              "name": "master",
              "type": "property",
              "dtype": "Object",
              "description": "Reference to [client socket to master entry]"
            },
            "srev": {
              "name": "srev",
              "type": "property",
              "dtype": "Number",
              "description": "Timestamp in microseconds of last sval update"
            },
            "sval": {
              "name": "sval",
              "type": "property",
              "dtype": "Object",
              "description": "Non-persistent data"
            },
            "slaveId": {
              "name": "slaveId",
              "type": "property",
              "dtype": "Number",
              "description": "Last slave id",
              "internal": true
            },
            "slaves": {
              "name": "slaves",
              "type": "property",
              "dtype": "Object",
              "description": "Contains all response sockets of slave entries",
              "internal": true
            },
            "shard": {
              "name": "shard",
              "type": "property",
              "dtype": "Object",
              "description": "Reference to containing [shard]"
            },
            "id": {
              "name": "id",
              "type": "property",
              "dtype": "Integer",
              "description": "Unique id of entry within containing [shard]"
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
                  "name": "eid",
                  "description": "Entry id",
                  "type": "Number|String"
                }
              ]
            },
            "getIdent": {
              "name": "getIdent",
              "type": "method",
              "description": "Return identification object",
              "params": [
                {
                  "name": "sibling",
                  "description": "When specified, return identification object relative to `sibling` entry. When `sibling === undefined`, return full identification.",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "isIdentified": {
              "name": "isIdentified",
              "type": "method",
              "description": "Test whether entry is identified by ident.",
              "params": [
                {
                  "name": "ident",
                  "description": "Entry identification",
                  "type": "Object"
                }
              ]
            },
            "getCaption": {
              "name": "getCaption",
              "type": "method",
              "description": "Return entry caption"
            },
            "track": {
              "name": "track",
              "type": "method",
              "description": "Establishes a [link] to the current entry.",
              "params": [
                {
                  "name": "socket",
                  "description": "Client socket to be linked to an entry",
                  "type": "Object"
                }
              ]
            },
            "post": {
              "name": "post",
              "type": "method",
              "description": "Post a command to be executed on the entry at its home.",
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
            "setState": {
              "name": "setState",
              "type": "method",
              "description": "Change entry `sval`. Can be called only in the home. `patch` is\naltered (unchanged keys are removed).",
              "params": [
                {
                  "name": "patch",
                  "description": "State patch",
                  "type": "*"
                },
                {
                  "name": "src",
                  "description": "Source of a change",
                  "type": "TODO",
                  "optional": true
                }
              ]
            },
            "onStates": {
              "name": "onStates",
              "type": "method",
              "description": "Register sval change handlers",
              "params": [
                {
                  "name": "handlers",
                  "description": "Handlers object",
                  "type": "Object"
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
              "description": "Remove entry from shard's cache.",
              "internal": true
            },
            "setupKind": {
              "name": "setupKind",
              "type": "method",
              "description": "Setup entry kind.",
              "params": [
                {
                  "name": "kind",
                  "description": "Kind of entry\n\nTODO: params",
                  "type": "String|Object"
                }
              ],
              "internal": true
            },
            "setup": {
              "name": "setup",
              "type": "method",
              "description": "Setup entry and call `homeInit()` of the kind if at home.",
              "internal": true
            },
            "isAtHome": {
              "name": "isAtHome",
              "type": "method",
              "description": "Check whether we are running in entry`s [home]."
            },
            "command": {
              "name": "command",
              "type": "method",
              "description": "Execute a command on the current entry",
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
              ],
              "internal": true
            },
            "respond": {
              "name": "respond",
              "type": "method",
              "description": "Creates a response with `entry.dval` or `entry.sval`.",
              "internal": true
            },
            "patchData": {
              "name": "patchData",
              "type": "method",
              "internal": true
            },
            "updateData": {
              "name": "updateData",
              "type": "method",
              "description": "Update this entry data.",
              "internal": true
            },
            "patchState": {
              "name": "patchState",
              "type": "method",
              "description": "Patch entry.sval. Update `entry.sval` and `entry.srev`.",
              "internal": true
            },
            "updateState": {
              "name": "updateState",
              "type": "method",
              "description": "Update this entry.sval.",
              "internal": true
            }
          }
        },
        "lib/entry/master": {
          "name": "lib/entry/master",
          "type": "class",
          "caption": "Client socket to master entry",
          "readme": "Socket assigned to `entry.master` of slave entry.",
          "file": "lib/entry/master.js",
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
              "type": "method"
            },
            "open": {
              "name": "open",
              "type": "method",
              "description": "Open handler",
              "params": [
                {
                  "name": "resp",
                  "description": "Update object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "drev",
                      "description": "Data revision",
                      "type": "Object",
                      "optional": true
                    },
                    {
                      "name": "dval",
                      "description": "Data value",
                      "type": "Object",
                      "optional": true
                    },
                    {
                      "name": "srev",
                      "description": "State revision",
                      "type": "Object",
                      "optional": true
                    },
                    {
                      "name": "sval",
                      "description": "State value",
                      "type": "Object",
                      "optional": true
                    },
                    {
                      "name": "home",
                      "description": "Whether the chain of links to the `home` is created",
                      "type": "Boolean"
                    }
                  ]
                }
              ]
            },
            "patch": {
              "name": "patch",
              "type": "method",
              "description": "Entry data or state patch handler",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Object",
                  "props": [
                    {
                      "name": "brev",
                      "description": "",
                      "type": "Number"
                    },
                    {
                      "name": "drev",
                      "description": "",
                      "type": "Number"
                    },
                    {
                      "name": "dpatch",
                      "description": "",
                      "type": "Object"
                    },
                    {
                      "name": "srev",
                      "description": "",
                      "type": "Number"
                    },
                    {
                      "name": "spatch",
                      "description": "",
                      "type": "Object"
                    },
                    {
                      "name": "src",
                      "description": "",
                      "type": "String"
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
          "caption": "Response socket to slave entry",
          "readme": "Reponse socket for link entry requests. Is registered in `entry.slaves`.",
          "file": "lib/entry/slave.js",
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
                }
              ]
            }
          },
          "handler": {
            "command": {
              "name": "command",
              "type": "handler",
              "description": "Command handler executing a command on a target entry",
              "params": [
                {
                  "name": "req",
                  "description": "Request object",
                  "type": "Object",
                  "props": [
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
            }
          }
        },
        "lib/schema/cache": {
          "name": "lib/schema/cache",
          "type": "Object",
          "caption": "Cache schema singleton",
          "readme": "Provides schema without any data store. All entries are cached to `shard.cache`.",
          "file": "lib/schema/cache.js",
          "description": "",
          "method": {
            "init": {
              "name": "init",
              "type": "method",
              "description": "Initialize shard",
              "params": [
                {
                  "name": "shard",
                  "description": "Shard to be initialized",
                  "type": "Object"
                },
                {
                  "name": "params",
                  "description": "Shard parameters",
                  "type": "*"
                },
                {
                  "name": "cb",
                  "description": "Callback called after shard initializaiton",
                  "type": "Function"
                }
              ]
            },
            "cleanup": {
              "name": "cleanup",
              "type": "method",
              "description": "Clean up shard",
              "params": [
                {
                  "name": "Shard",
                  "description": "to be cleaned up",
                  "type": "Object"
                }
              ]
            },
            "get": {
              "name": "get",
              "type": "method",
              "description": "Get entry from shard based on its id",
              "params": [
                {
                  "name": "shard",
                  "description": "Shard containing requested entry",
                  "type": "Object"
                },
                {
                  "name": "eid",
                  "description": "Entry id",
                  "type": "String|Number"
                },
                {
                  "name": "cb",
                  "description": "Final callback",
                  "type": "Function"
                }
              ]
            },
            "find": {
              "name": "find",
              "type": "method",
              "description": "Find entry in shard based on its alias",
              "params": [
                {
                  "name": "shard",
                  "description": "Shard containing entry",
                  "type": "Object"
                },
                {
                  "name": "alias",
                  "description": "Alias of entry",
                  "type": "String"
                },
                {
                  "name": "cb",
                  "description": "Final callback",
                  "type": "Function"
                }
              ]
            },
            "findAlias": {
              "name": "findAlias",
              "type": "method",
              "description": "Find entry id based on its alias",
              "params": [
                {
                  "name": "shard",
                  "description": "Shard containing entry",
                  "type": "Object"
                },
                {
                  "name": "alias",
                  "description": "Alias of entry",
                  "type": "String"
                },
                {
                  "name": "cb",
                  "description": "Final callback",
                  "type": "Function"
                }
              ]
            },
            "query": {
              "name": "query",
              "type": "method",
              "description": "Query shard for data",
              "params": [
                {
                  "name": "shard",
                  "description": "Shard queried",
                  "type": "Object"
                },
                {
                  "name": "name",
                  "description": "Query name",
                  "type": "String"
                },
                {
                  "name": "opts",
                  "description": "Options",
                  "type": "Object"
                },
                {
                  "name": "cb",
                  "description": "Final callback",
                  "type": "Function"
                }
              ]
            },
            "commit": {
              "name": "commit",
              "type": "method",
              "description": "Update shard data",
              "params": [
                {
                  "name": "trans",
                  "description": "Transaction to be commited",
                  "type": "Object"
                },
                {
                  "name": "cb",
                  "description": "`function(err)`",
                  "type": "Function"
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
          "readme": "A shard is a container for [entries]. Each shard belongs to a certain\n[space]. Every shard has an id that is unique within\nits [space]. Each shard is tied to a single [schema] (ie. it cannot\ncontain [entries] of [kinds] belonging to different\n[schemas]). Every shard either belongs to the same [home] as its\nspace or is assigned to a different one.",
          "file": "lib/shard/index.js",
          "aliases": "shard shards",
          "description": "Each shard has a defined schema, which determines its data are\nhandled, such as:\n- [ose/lib/schema/cache]\n- [ose-fs]\n- [ose-level]",
          "property": {
            "id": {
              "name": "id",
              "type": "property",
              "dtype": "Number",
              "description": "Shard id unique within a space"
            },
            "space": {
              "name": "space",
              "type": "property",
              "dtype": "Object",
              "description": "Space containing shard"
            },
            "schema": {
              "name": "schema",
              "type": "property",
              "dtype": "Object",
              "description": "schema instance"
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
              "dtype": "Object",
              "description": "Home peer"
            },
            "master": {
              "name": "master",
              "type": "property",
              "dtype": "Object",
              "description": "Client socket linked to the master shard"
            },
            "lastTid": {
              "name": "lastTid",
              "type": "property",
              "dtype": "Number",
              "description": "Autoincemental part of last transaction id created in this shard and peer"
            },
            "lastEid": {
              "name": "lastEid",
              "type": "property",
              "dtype": "Number",
              "description": "Autoincremental part of last entry id created in this shard and peer"
            },
            "cache": {
              "name": "cache",
              "type": "property",
              "dtype": "Object",
              "description": "Object containing entries"
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Class constructor"
            },
            "toString": {
              "name": "toString",
              "type": "method",
              "description": "Return short shard description"
            },
            "isIdentified": {
              "name": "isIdentified",
              "type": "method",
              "description": "Checks whether this shard is identified by an `ident` entry\nidentification.",
              "params": [
                {
                  "name": "ident",
                  "description": "Entry identification",
                  "type": "Object|Array"
                }
              ]
            },
            "isAtHome": {
              "name": "isAtHome",
              "type": "method",
              "description": "Check whether we are running in shard`s [home]."
            },
            "addCommand": {
              "name": "addCommand",
              "type": "method",
              "description": "Add command handler to the current shard",
              "params": [
                {
                  "name": "name",
                  "description": "Command name",
                  "type": "String"
                },
                {
                  "name": "handler",
                  "description": "Command handler",
                  "type": "String|Function|Object"
                }
              ]
            },
            "removeCommand": {
              "name": "removeCommand",
              "type": "method",
              "description": "Remove command handler from the current shard",
              "params": [
                {
                  "name": "name",
                  "description": "Command name",
                  "type": "String"
                }
              ]
            },
            "get": {
              "name": "get",
              "type": "method",
              "description": "Get [entry] with data in the current shard.",
              "params": [
                {
                  "name": "eid",
                  "description": "Entry id",
                  "type": "Number|String"
                },
                {
                  "name": "cb",
                  "description": "Callback with entry as a response, `function(err, entry)`",
                  "type": "Function"
                }
              ]
            },
            "find": {
              "name": "find",
              "type": "method",
              "description": "Find an [entry] relative to this shard",
              "params": [
                {
                  "name": "ident",
                  "description": "Entry identification",
                  "type": "Object|String|Number"
                },
                {
                  "name": "cb",
                  "description": "Callback with entry as a response, `function(err, entry)`",
                  "type": "Function"
                }
              ]
            },
            "findSibling": {
              "name": "findSibling",
              "type": "method",
              "description": "Find a [shard] based on entry `ident`",
              "params": [
                {
                  "name": "ident",
                  "description": "Entry identification",
                  "type": "Object|String|Number"
                },
                {
                  "name": "cb",
                  "description": "Callback with entry as a response, `function(err, shard)`",
                  "type": "Function"
                }
              ]
            },
            "track": {
              "name": "track",
              "type": "method",
              "description": "Establish a [link] to an [entry] identified by `ident`",
              "params": [
                {
                  "name": "ident",
                  "description": "Target [entry identification]",
                  "type": "Object|Array"
                },
                {
                  "name": "socket",
                  "description": "Client socket to be connectted to the\ntarget entry. If the socket is not provided, an new EventEmitter is\ncreated and returned.",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "post": {
              "name": "post",
              "type": "method",
              "description": "Send command to target's entry home",
              "params": [
                {
                  "name": "ident",
                  "description": "Target entry identification object",
                  "type": "Integer|String|Object"
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
            "query": {
              "name": "query",
              "type": "method",
              "description": "Query shard data",
              "params": [
                {
                  "name": "name",
                  "description": "Query name",
                  "type": "String"
                },
                {
                  "name": "req",
                  "description": "Parameters",
                  "type": "Object"
                },
                {
                  "name": "cb",
                  "description": "`function(err, response)`",
                  "type": "Function"
                }
              ]
            },
            "cacheAll": {
              "name": "cacheAll",
              "type": "method",
              "description": "TODO"
            },
            "nextTime": {
              "name": "nextTime",
              "type": "method"
            },
            "afterHome": {
              "name": "afterHome",
              "type": "method",
              "description": "Execute a callback only in the [home OSE instance]. If the shard\nhas been already initialized, defer `cb()` call, otherwise call\n`cb()` after shard gets initialized.",
              "params": [
                {
                  "name": "cb",
                  "description": "Method to be called, or unit to be required",
                  "type": "Function|String"
                }
              ]
            },
            "transaction": {
              "name": "transaction",
              "type": "method",
              "description": "Start new transaction"
            },
            "expandIdent": {
              "name": "expandIdent",
              "type": "method",
              "description": "Add space and shard information to entry identification",
              "params": [
                {
                  "name": "ident",
                  "description": "Entry identification to be expanded",
                  "type": "Object|String|Number"
                }
              ]
            },
            "getDataDir": {
              "name": "getDataDir",
              "type": "method",
              "description": "Return directory with shard data"
            },
            "command": {
              "name": "command",
              "type": "method",
              "description": "Execute a command on the current shard",
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
              ],
              "internal": true
            },
            "cleanup": {
              "name": "cleanup",
              "type": "method",
              "description": "Remove shard from space cache.",
              "internal": true
            },
            "config": {
              "name": "config",
              "type": "method",
              "description": "TODO",
              "params": [
                {
                  "name": "key",
                  "description": "Configuration key",
                  "type": "String"
                },
                {
                  "name": "val",
                  "description": "Configuration data",
                  "type": "Object"
                },
                {
                  "name": "deps",
                  "description": "Dependencies object",
                  "type": "Object"
                }
              ],
              "internal": true
            },
            "_post": {
              "name": "_post",
              "type": "method",
              "description": "Executes a command on the entry at home.",
              "params": [
                {
                  "name": "ident",
                  "description": "Entry id or alias",
                  "type": "Number|String"
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
                  "description": "Client socket",
                  "type": "Object",
                  "optional": true
                }
              ],
              "internal": true
            },
            "getGw": {
              "name": "getGw",
              "type": "method",
              "internal": true
            },
            "masterOpened": {
              "name": "masterOpened",
              "type": "method",
              "internal": true
            }
          }
        },
        "lib/shard/slave": {
          "name": "lib/shard/slave",
          "type": "class",
          "caption": "Response socket to slave shard",
          "readme": "Socket created in response to a request from a slave shard.",
          "file": "lib/shard/slave.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Sends request to the master shard to establish a link.",
              "params": [
                {
                  "name": "shard",
                  "description": "Slave shard",
                  "type": "Object"
                },
                {
                  "name": "ws",
                  "description": "WebSocket",
                  "type": "Object"
                }
              ]
            }
          },
          "handler": {
            "command": {
              "name": "command",
              "type": "handler",
              "description": "Command handler executing a command on a target entry",
              "params": [
                {
                  "name": "req",
                  "description": "Request object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "id",
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
            "get": {
              "name": "get",
              "type": "handler",
              "description": "Handler called when a slave shard attempts to get an entry",
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
            },
            "findAlias": {
              "name": "findAlias",
              "type": "handler",
              "description": "Handler called when a slave shard attempts to find entry alias",
              "params": [
                {
                  "name": "req",
                  "description": "Requested entry alias",
                  "type": "String"
                },
                {
                  "name": "socket",
                  "description": "Slave entry socket",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "read": {
              "name": "read",
              "type": "handler",
              "description": "Handler called when a slave shard attempts to get an entry",
              "params": [
                {
                  "name": "req",
                  "description": "Requested entry id",
                  "type": "String | Number"
                },
                {
                  "name": "cb",
                  "description": "Callback to be called with stream",
                  "type": "Function"
                }
              ]
            },
            "link": {
              "name": "link",
              "type": "handler",
              "description": "Handler called when a slave shard attempts to create a link to an entry",
              "params": [
                {
                  "name": "req",
                  "description": "",
                  "type": "Object",
                  "props": [
                    {
                      "name": "id",
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
            },
            "query": {
              "name": "query",
              "type": "handler",
              "description": "Handler called when a slave shard requests a map.",
              "params": [
                {
                  "name": "req",
                  "description": "Request to be sent to `shard.query()`",
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
        "lib/shard/trans": {
          "name": "lib/shard/trans",
          "type": "class",
          "caption": "Transaction class",
          "readme": "Changes to shards are made via transactions.\n\nTo add an entry to a shard, for example, create a new\ntransaction, add the entry and commit the transaction.\n\nExample:\n\n    var trans = shard.transaction();\n\n    var light = trans.add('light', {\n      alias: 'reading.light',\n      parent: 'living.room'\n    });\n\n    trans.commit(O.log.bindError());",
          "file": "lib/shard/trans.js",
          "aliases": "transaction transactions",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Class constructor",
              "params": [
                {
                  "name": "shard",
                  "description": "Shard to be changed",
                  "type": "Object"
                }
              ]
            },
            "commit": {
              "name": "commit",
              "type": "method",
              "description": "Update all entries maps concerned by the current transaction",
              "params": [
                {
                  "name": "cb",
                  "description": "`function(err)`",
                  "type": "Function"
                }
              ]
            },
            "patch": {
              "name": "patch",
              "type": "method",
              "description": "Add entry patch to the current transaction.",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry to be patched",
                  "type": "Object"
                },
                {
                  "name": "val",
                  "description": "Patch",
                  "type": "Object"
                }
              ]
            },
            "del": {
              "name": "del",
              "type": "method",
              "description": "Delete entry from the current shard",
              "params": [
                {
                  "name": "entry",
                  "description": "Entry to be deleted",
                  "type": "Object"
                }
              ]
            },
            "add": {
              "name": "add",
              "type": "method",
              "description": "Add new entry to the current shard.",
              "params": [
                {
                  "name": "kind",
                  "description": "Entry kind",
                  "type": "Object|String"
                },
                {
                  "name": "val",
                  "description": "Optional `entry.dval`",
                  "type": "Object",
                  "optional": true
                },
                {
                  "name": "id",
                  "description": "Optional `entry.id`",
                  "type": "Number|String",
                  "optional": true
                }
              ]
            },
            "find": {
              "name": "find",
              "type": "method",
              "description": "Find entry in a shard as if the transaction were already  commmitted",
              "params": [
                {
                  "name": "ident",
                  "description": "Entry identification",
                  "type": "Number|String"
                },
                {
                  "name": "cb",
                  "description": "Callback `function(err, entry)`",
                  "type": "Function"
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
            "master": {
              "name": "master",
              "type": "property",
              "dtype": "Object",
              "description": "Client socket linked to the master space"
            },
            "peers": {
              "name": "peers",
              "type": "property",
              "dtype": "Object",
              "description": "List of peers belonging to this space"
            },
            "shards": {
              "name": "shards",
              "type": "property",
              "dtype": "Object",
              "description": "Object containing shards indexed by `sid`",
              "internal": true
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Class constructor",
              "internal": true
            },
            "toString": {
              "name": "toString",
              "type": "method",
              "description": "Return short space description"
            },
            "peer": {
              "name": "peer",
              "type": "method",
              "description": "Get an existing peer by the `name` or create a new one and configure `peer.url`.",
              "params": [
                {
                  "name": "name",
                  "description": "Peer name to retrieve or create.",
                  "type": "String"
                },
                {
                  "name": "url",
                  "description": "",
                  "type": "String"
                }
              ],
              "internal": true
            },
            "getShard": {
              "name": "getShard",
              "type": "method",
              "description": "Find a shard by shard id in the current space",
              "params": [
                {
                  "name": "sid",
                  "description": "Shard id",
                  "type": "Number"
                },
                {
                  "name": "cb",
                  "description": "Response callback `function(err, shard)`",
                  "type": "Function"
                }
              ]
            },
            "findShard": {
              "name": "findShard",
              "type": "method",
              "description": "Find a shard by shard identification in the current space",
              "params": [
                {
                  "name": "ident",
                  "description": "Shard id or shard alias",
                  "type": "Number|String"
                },
                {
                  "name": "cb",
                  "description": "Response callback `function(err, shard)`",
                  "type": "Function"
                }
              ]
            },
            "findShards": {
              "name": "findShards",
              "type": "method",
              "description": "Find shards based on `filter`.\n\nTODO",
              "params": [
                {
                  "name": "filter",
                  "description": "Filter object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "sid",
                      "description": "Shard id",
                      "type": "String",
                      "optional": true
                    },
                    {
                      "name": "peer",
                      "description": "Peer name",
                      "type": "String",
                      "optional": true
                    },
                    {
                      "name": "schema",
                      "description": "schema name",
                      "type": "String",
                      "optional": true
                    },
                    {
                      "name": "alias",
                      "description": "Shard alias",
                      "type": "String",
                      "optional": true
                    }
                  ]
                },
                {
                  "name": "cb",
                  "description": "Callback that returns an array if IDs or an error.",
                  "type": "Function"
                }
              ]
            },
            "isAtHome": {
              "name": "isAtHome",
              "type": "method",
              "description": "Check whether we are running in space`s [home]."
            },
            "config": {
              "name": "config",
              "type": "method",
              "description": "TODO",
              "params": [
                {
                  "name": "name",
                  "description": "Configuration name",
                  "type": "String"
                },
                {
                  "name": "val",
                  "description": "Configuration data",
                  "type": "Object"
                },
                {
                  "name": "deps",
                  "description": "Dependencies object",
                  "type": "Object"
                }
              ],
              "internal": true
            },
            "setup": {
              "name": "setup",
              "type": "method",
              "description": "Set up a space",
              "params": [
                {
                  "name": "name",
                  "description": "Space name",
                  "type": "String"
                }
              ],
              "internal": true
            },
            "disconnectPeers": {
              "name": "disconnectPeers",
              "type": "method",
              "description": "Disconnect all peers.",
              "internal": true
            },
            "connectPeers": {
              "name": "connectPeers",
              "type": "method",
              "description": "Connect all peers with url defined.",
              "params": [
                {
                  "name": "cb",
                  "description": "Dependencies object",
                  "type": "Function",
                  "optional": true
                }
              ],
              "internal": true
            },
            "browserConfig": {
              "name": "browserConfig",
              "type": "method",
              "description": "Fill the configuration object for the browser.",
              "params": [
                {
                  "name": "config",
                  "description": "Plugin configuration",
                  "type": "Object"
                }
              ],
              "internal": true
            },
            "getGw": {
              "name": "getGw",
              "type": "method",
              "internal": true
            },
            "masterOpened": {
              "name": "masterOpened",
              "type": "method",
              "internal": true
            }
          }
        },
        "lib/subject/master": {
          "name": "lib/subject/master",
          "type": "class",
          "caption": "Client socket to master subject",
          "readme": "Socket for communicating from a subject to a master in another OSE\ninstance.",
          "file": "lib/space/master.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Constructor",
              "params": [
                {
                  "name": "subject",
                  "description": "Slave subject",
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
                  "name": "data",
                  "description": "Response object",
                  "type": "Object",
                  "props": [
                    {
                      "name": "home",
                      "description": "Whether it is possible to communicate with the `home`",
                      "type": "Boolean"
                    }
                  ]
                }
              ]
            }
          },
          "undefined": {
            "undefined": {
              "description": "Called when the link to the master is closed"
            }
          }
        },
        "lib/space/slave": {
          "name": "lib/space/slave",
          "type": "class",
          "caption": "Response socket to slave space",
          "readme": "Socket created in response to a request from a slave space.",
          "file": "lib/space/slave.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Sends request to the master space to establish a link.",
              "params": [
                {
                  "name": "space",
                  "description": "Slave space",
                  "type": "Object"
                },
                {
                  "name": "ws",
                  "description": "WebSocket",
                  "type": "Object"
                }
              ]
            }
          },
          "undefined": {
            "undefined": {
              "description": "Get entry",
              "params": [
                {
                  "name": "req",
                  "description": "Entry id",
                  "type": "Integer"
                }
              ]
            }
          }
        },
        "lib/data": {
          "name": "lib/data",
          "type": "module",
          "caption": "Data model module",
          "file": "lib/data.js",
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
            "master": {
              "name": "master",
              "type": "property",
              "dtype": "Object",
              "description": "Client socket linked to the master space"
            },
            "peers": {
              "name": "peers",
              "type": "property",
              "dtype": "Object",
              "description": "List of peers belonging to this space"
            },
            "shards": {
              "name": "shards",
              "type": "property",
              "dtype": "Object",
              "description": "Object containing shards indexed by `sid`",
              "internal": true
            },
            "schemas": {
              "name": "schemas",
              "type": "property",
              "dtype": "Object",
              "description": "Object containing schemas objects indexed by schema name"
            },
            "spaces": {
              "name": "spaces",
              "type": "property",
              "dtype": "Object",
              "description": "Object containing space objects indexed by space name"
            }
          },
          "method": {
            "addSchema": {
              "name": "addSchema",
              "type": "method",
              "description": "Add new schema",
              "params": [
                {
                  "name": "name",
                  "description": "Schema name",
                  "type": "String"
                },
                {
                  "name": "val",
                  "description": "Schema to be added",
                  "type": "Object"
                }
              ]
            },
            "getSpace": {
              "name": "getSpace",
              "type": "method",
              "description": "Attempt to find requested space.",
              "params": [
                {
                  "name": "name",
                  "description": "Space name",
                  "type": "String"
                },
                {
                  "name": "cb",
                  "description": "Response callback",
                  "type": "Function (err, space)"
                }
              ]
            },
            "eachSpace": {
              "name": "eachSpace",
              "type": "method",
              "description": "Call callback for each space synchronously.",
              "params": [
                {
                  "name": "cb",
                  "description": "callback",
                  "type": "Function (space)"
                }
              ]
            },
            "findEntry": {
              "name": "findEntry",
              "type": "method",
              "description": "Find an entry",
              "params": [
                {
                  "name": "ident",
                  "description": "Entry identification object",
                  "type": "Object"
                },
                {
                  "name": "cb",
                  "description": "Callback",
                  "type": "Function"
                }
              ]
            },
            "trackEntry": {
              "name": "trackEntry",
              "type": "method",
              "description": "Establish a [link] to an entry identified by `ident`",
              "params": [
                {
                  "name": "ident",
                  "description": "Target [entry identification]",
                  "type": "Object|Array"
                },
                {
                  "name": "socket",
                  "description": "Client socket to be connectted to the\ntarget entry. If the socket is not provided, an new EventEmitter is\ncreated and returned.",
                  "type": "Object",
                  "optional": true
                }
              ]
            }
          }
        },
        "lib/kind": {
          "name": "lib/kind",
          "type": "class",
          "caption": "Kind class",
          "readme": "Each [entry] is of a certain kind. Kinds define the behaviour of\n[entries].\n\nKinds should describe, as closely as possible, physical or virtual\nobjects.",
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
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Kind constructor",
              "params": [
                {
                  "name": "schema",
                  "description": "Schema containing the kind",
                  "type": "Object|String"
                },
                {
                  "name": "name",
                  "description": "Unique kind name within the schema",
                  "type": "String"
                }
              ]
            },
            "toString": {
              "name": "toString",
              "type": "method",
              "description": "Return short description"
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
              "description": "Register command handlers",
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
            },
            "doHomeInit": {
              "name": "doHomeInit",
              "type": "method",
              "internal": true
            }
          },
          "property": {
            "ddef": {
              "name": "ddef",
              "type": "property",
              "dtype": "Object",
              "description": "`entry.dval` structure description\n\nContains an [ose/lib/field/object] instance"
            },
            "name": {
              "name": "name",
              "type": "property",
              "dtype": "String",
              "description": "Kind name unique within a schema"
            },
            "schema": {
              "name": "schema",
              "type": "property",
              "dtype": "Object",
              "description": "Schema to which the kind is assigned"
            }
          }
        },
        "lib/subject": {
          "name": "lib/subject",
          "type": "module",
          "caption": "Subject",
          "readme": "Set of methods used in entries, shards and spaces",
          "file": "lib/subject.js",
          "property": {
            "subjectState": {
              "name": "subjectState",
              "type": "property",
              "dtype": "Object",
              "description": "List of states entered by subjects"
            },
            "masterState": {
              "name": "masterState",
              "type": "property",
              "dtype": "Object",
              "description": "List of master relation states entered by subjects"
            }
          },
          "method": {
            "remove": {
              "name": "remove",
              "type": "method",
              "description": "Mark subject as removed and call `cleanup()`.",
              "internal": true
            },
            "isGone": {
              "name": "isGone",
              "type": "method",
              "description": "Check whether subject has been removed",
              "internal": true
            },
            "setBusy": {
              "name": "setBusy",
              "type": "method",
              "internal": true
            },
            "setReady": {
              "name": "setReady",
              "type": "method",
              "internal": true
            },
            "sendMaster": {
              "name": "sendMaster",
              "type": "method",
              "internal": true
            },
            "canReachHome": {
              "name": "canReachHome",
              "type": "method",
              "description": "Check whether the subject is at home or linked to home.",
              "internal": true
            }
          },
          "undefined": {
            "undefined": {
              "description": "If the subject is GONE, returns `subject._err || err`. When subject is not GONE, call `subject.remove(err)`."
            }
          }
        }
      }
    },
    "field": {
      "name": "field",
      "caption": "JSON document structure description",
      "readme": "This component allows to describe JSON data structures.\n\nTODO\n\nData descriptions contain no particular data.\n\nEntry kinds uses this component to describe `entry.data` and `entry.state` data structure.\n\nGenerate UI views (detail, list, listItem, ... )\n\nLayouts - Kinds\n\nGenerate flat list of fields from hierarchical document based on defined order",
      "file": "lib/field/wraps.js",
      "line": 14,
      "aliases": "fields",
      "modules": {
        "lib/field/array": {
          "name": "lib/field/array",
          "type": "module",
          "super": "ose/lib.field.field",
          "caption": "Array field containing list of values",
          "file": "lib/field/array.js"
        },
        "lib/field/boolean": {
          "name": "lib/field/boolean",
          "type": "class",
          "super": "ose/lib.field.field",
          "caption": "Boolean field description",
          "readme": "Description of fields containing a boolean",
          "file": "lib/field/boolean.js"
        },
        "lib/field/lookup": {
          "name": "lib/field/lookup",
          "type": "class",
          "super": "ose/lib.field.text",
          "caption": "Lookup field description",
          "readme": "Makes it possible to select from predefined values or a map",
          "file": "lib/field/entry.js",
          "property": {
            "lookup": {
              "name": "lookup",
              "type": "property",
              "dtype": "Object",
              "description": "Object containing lookup description"
            },
            "[lookup.values]": {
              "name": "[lookup.values]",
              "type": "property",
              "dtype": "Array",
              "description": "Array of values"
            },
            "[lookup.get]": {
              "name": "[lookup.get]",
              "type": "property",
              "dtype": "Function",
              "description": "Method obtaining lookup values"
            },
            "[lookup.filter]": {
              "name": "[lookup.filter]",
              "type": "property",
              "dtype": "Object",
              "description": "Map filtering"
            },
            "[lookup.ident]": {
              "name": "[lookup.ident]",
              "type": "property",
              "dtype": "Object",
              "description": "Map identificaation"
            },
            "[lookup.view]": {
              "name": "[lookup.view]",
              "type": "property",
              "dtype": "String",
              "description": "View name"
            }
          }
        },
        "lib/field/field": {
          "name": "lib/field/field",
          "type": "class",
          "caption": "Common field description",
          "readme": "Ancestor for field descriptions",
          "file": "lib/field/field.js",
          "property": {
            "name": {
              "name": "name",
              "type": "property",
              "dtype": "String",
              "description": "Field name"
            },
            "order": {
              "name": "order",
              "type": "property",
              "dtype": "Number",
              "description": "Field order"
            },
            "required": {
              "name": "required",
              "type": "property",
              "dtype": "Boolean",
              "description": "Whether the field is required"
            },
            "readonly": {
              "name": "readonly",
              "type": "property",
              "dtype": "Boolean",
              "description": "Whether the field is read-only"
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Field constructor",
              "params": [
                {
                  "name": "parent",
                  "description": "Parent object",
                  "type": "Object",
                  "optional": true
                },
                {
                  "name": "name",
                  "description": "Field name",
                  "type": "String",
                  "optional": true
                }
              ]
            },
            "detail": {
              "name": "detail",
              "type": "method",
              "description": "Setup detail layout of this field"
            },
            "layout": {
              "name": "layout",
              "type": "method",
              "description": "Setup layout `name` of this field"
            },
            "params": {
              "name": "params",
              "type": "method",
              "description": "Set parameters of field",
              "params": [
                {
                  "name": "val",
                  "description": "Field parameters, copied to field object",
                  "type": "Object",
                  "optional": true
                }
              ]
            },
            "iterPatch": {
              "name": "iterPatch",
              "type": "method",
              "internal": true
            },
            "iterLayout": {
              "name": "iterLayout",
              "type": "method",
              "description": "Iterate over described fields and add fields with layout `name` to `wraps`.",
              "params": [
                {
                  "name": "wraps",
                  "description": "Wrap fields object",
                  "type": "Object"
                },
                {
                  "name": "name",
                  "description": "Layout name",
                  "type": "Boolean|String"
                },
                {
                  "name": "val",
                  "description": "JSON data",
                  "type": "Object"
                },
                {
                  "name": "cb",
                  "description": "Callback to be called on each new wrap",
                  "type": "Function(wrap)"
                }
              ]
            }
          }
        },
        "lib/field/list": {
          "name": "lib/field/list",
          "type": "module",
          "super": "ose/lib.field.field",
          "caption": "Field containing list of values",
          "file": "lib/field/list.js"
        },
        "lib/field/map": {
          "name": "lib/field/map",
          "type": "module",
          "super": "ose/lib.field.field",
          "caption": "Map field containing key: value pairs",
          "file": "lib/field/map.js"
        },
        "lib/field/millitime": {
          "name": "lib/field/millitime",
          "type": "class",
          "super": "ose/lib.field.number",
          "caption": "Millitime field description",
          "readme": "Description of fields containing time in milliseconds",
          "file": "lib/field/millitime.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Millitime field constructor"
            }
          }
        },
        "lib/field/number": {
          "name": "lib/field/number",
          "type": "class",
          "super": "ose/lib.field.field",
          "caption": "Number field description",
          "readme": "Description of fields containing a number",
          "file": "lib/field/number.js",
          "property": {
            "min": {
              "name": "min",
              "type": "property",
              "dtype": "Number",
              "description": "Minimum value"
            },
            "max": {
              "name": "max",
              "type": "property",
              "dtype": "Number",
              "description": "Maximum value"
            },
            "decimal": {
              "name": "decimal",
              "type": "property",
              "dtype": "Number",
              "description": "Number of decimal places"
            },
            "radix": {
              "name": "radix",
              "type": "property",
              "dtype": "Number",
              "description": "Formatting radix"
            },
            "unit": {
              "name": "unit",
              "type": "property",
              "dtype": "String",
              "description": "Unit"
            }
          }
        },
        "lib/field/object": {
          "name": "lib/field/object",
          "type": "module",
          "super": "ose/lib.field.field",
          "caption": "JSON object description",
          "file": "lib/field/object.js",
          "property": {
            "children": {
              "name": "children",
              "type": "property",
              "dtype": "Object",
              "description": "Child fields"
            }
          },
          "method": {
            "afterInit": {
              "name": "afterInit",
              "type": "method",
              "internal": true
            },
            "getChild": {
              "name": "getChild",
              "type": "method",
              "params": [
                {
                  "name": "path",
                  "description": "Path to the field",
                  "type": "String"
                }
              ],
              "internal": true
            },
            "getVal": {
              "name": "getVal",
              "type": "method",
              "description": "Get JSON value for this object",
              "params": [
                {
                  "name": "get",
                  "description": "[Function] Callback that gets called for each primitive field"
                }
              ],
              "internal": true
            },
            "iterPatch": {
              "name": "iterPatch",
              "type": "method",
              "description": "Iterate over a patch and field wrapper structure. For each field wrapper with layout call `wrap.patch(patch, val)`.",
              "params": [
                {
                  "name": "wrap",
                  "description": "Field wrapper",
                  "type": "Object"
                },
                {
                  "name": "patch",
                  "description": "JSON patch",
                  "type": "Object"
                }
              ],
              "internal": true
            }
          },
          "undefined": {
            "undefined": {}
          }
        },
        "lib/field/text": {
          "name": "lib/field/text",
          "type": "class",
          "super": "ose/lib.field.field",
          "caption": "Text field description",
          "readme": "Description of fields containing text",
          "file": "lib/field/text.js"
        },
        "lib/field/wrap": {
          "name": "lib/field/wrap",
          "type": "class",
          "caption": "Field value wrapper",
          "readme": "Connects the value of particular field with its description",
          "file": "lib/field/wrap.js",
          "aliases": "fieldWrappers",
          "property": {
            "owner": {
              "name": "owner",
              "type": "property",
              "dtype": "Object",
              "description": "List of field wraps"
            },
            "field": {
              "name": "field",
              "type": "property",
              "dtype": "Object",
              "description": "Field description"
            },
            "value": {
              "name": "value",
              "type": "property",
              "dtype": "*",
              "description": "Field value"
            },
            "valueError": {
              "name": "valueError",
              "type": "property",
              "dtype": "Object",
              "description": "Optional error returned from field.format"
            },
            "layout": {
              "name": "layout",
              "type": "property",
              "dtype": "Object",
              "description": "Optional layout for altering description"
            },
            "edit": {
              "name": "edit",
              "type": "property",
              "dtype": "Object",
              "description": "Current edit information"
            },
            "edit.last": {
              "name": "edit.last",
              "type": "property",
              "dtype": "",
              "description": "Field value before last edit"
            },
            "edit.value": {
              "name": "edit.value",
              "type": "property",
              "dtype": "",
              "description": "Edited field value"
            },
            "editError": {
              "name": "editError",
              "type": "property",
              "dtype": "Object",
              "description": "Optional error returned from field.unformat"
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Field wrapper constructor",
              "params": [
                {
                  "name": "owner",
                  "description": "Owning wrap list",
                  "type": "Object"
                },
                {
                  "name": "field",
                  "description": "Field description object",
                  "type": "Object"
                },
                {
                  "name": "layout",
                  "description": "Layout",
                  "type": "Object"
                },
                {
                  "name": "val",
                  "description": "Field value",
                  "type": "*"
                }
              ]
            },
            "on": {
              "name": "on",
              "type": "method",
              "description": "Register handler `cb`. For 'patch' handler, call `cb(this.value)`.",
              "params": [
                {
                  "name": "name",
                  "description": "Event name to be registered, possible values are ('patch'|'input')",
                  "type": "String"
                },
                {
                  "name": "cb",
                  "description": "Event callback",
                  "type": "Function"
                }
              ]
            },
            "patch": {
              "name": "patch",
              "type": "method",
              "description": "Called when field value is patched",
              "internal": true
            },
            "stopEdit": {
              "name": "stopEdit",
              "type": "method",
              "description": "Called when value is edited",
              "params": [
                {
                  "name": "val",
                  "description": "New value",
                  "type": "*"
                },
                {
                  "name": "update",
                  "description": "Whether to call update",
                  "type": "Boolean"
                }
              ],
              "internal": true
            }
          },
          "undefined": {
            "undefined": {
              "description": "Invoked when control was changed by user"
            }
          }
        },
        "lib/field/wraps": {
          "name": "lib/field/wraps",
          "type": "module",
          "caption": "List of field wraps",
          "readme": "Manages particular data against field description objects. Converts\nthe description tree hierarchy into a simple list. This can be\nused, for example, by the [detail view] to display and edit entry\ndata.  Makes it possible to obtain patches or full data objects\nfrom edited fields.",
          "file": "lib/field/wraps.js",
          "property": {
            "view": {
              "name": "view",
              "type": "property",
              "dtype": "Object",
              "description": "Current view displaying data"
            },
            "fields": {
              "name": "fields",
              "type": "property",
              "dtype": "Array",
              "description": "List of [field wrappers]"
            },
            "canStopEdit": {
              "name": "canStopEdit",
              "type": "property",
              "dtype": "Boolean",
              "description": "Whether editing can be stopped"
            },
            "edit": {
              "name": "edit",
              "type": "property",
              "dtype": "Boolean",
              "description": "Whether the list is currently being edited\n\nTODO: Consider renaming to `isEdited`"
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Field list constructor",
              "params": [
                {
                  "name": "view",
                  "description": "Current view",
                  "type": "Object"
                }
              ]
            },
            "each": {
              "name": "each",
              "type": "method",
              "description": "param cb {Function} Callback",
              "internal": true
            },
            "sort": {
              "name": "sort",
              "type": "method",
              "internal": true
            },
            "getVal": {
              "name": "getVal",
              "type": "method",
              "params": [
                {
                  "name": "def",
                  "description": ""
                },
                {
                  "name": "orig",
                  "description": ""
                }
              ],
              "internal": true
            }
          }
        }
      }
    },
    "http": {
      "name": "http",
      "caption": "HTTP server",
      "readme": "This component provides an HTTP server for OSE. It responds to HTTP\nrequests and provides data needed to run OSE instances in the\nbrowser. Each OSE package that needs to run in the browser creates\none `ose/lib/http/content` class instance and defines which files\nwill be provided to the browser.\n\nThe HTTP server handles incoming WebSocket requests from other OSE\ninstances and relays them to the [peers component].\n\nThe OSE framework provides files to the frontend to emulate a\nlimited Node.js environment in the browser. It is thus possible to,\nfor example, do `require('utils');` in modules shared between\nNode.js and the browser side.",
      "file": "lib/http/index.js",
      "line": 34,
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
            "init": {
              "name": "init",
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
              "description": "Adds a module among scripts in the `<head>`.",
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
              "description": "Adds a JavaScript file to scripts in `<head>`.",
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
              "description": "Adds a CSS file to scripts in the `<head>`.",
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
            "addContent": {
              "name": "addContent",
              "type": "method",
              "description": "Add content instance",
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
              "description": "Add script to document head",
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
              "description": "Get url of this Http instance."
            },
            "onVerify": {
              "name": "onVerify",
              "type": "method",
              "description": "Verify event handler. Called before a remote peer WebSocket\nconnects as a client to this HTTP server.",
              "params": [
                {
                  "name": "val",
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
        }
      }
    },
    "peer": {
      "name": "peer",
      "caption": "Peers",
      "readme": "The system, which is based on the OSE framework, consist of one or\nmore configured instances, called OSE instances. An OSE instance is\nidentified by a unique `name` an can run in Node.js or in a web\nbrowser.\n\nFrom the point of view of an OSE instance, a peer is another OSE\ninstance. Each peer is assinged to a certain [space]. Two peers can\ncommunicate with each other using the WebSocket protocol. Peers can\nbe accessed directly, when a WebSocket channel exists, or\nindirectly, by using another peer as a gateway.\n\nThis component allows the following communication between OSE\ninstances:\n\n- Obtaining [entries] and maps of entries.\n- Synchronization of [states of entries] in near real-time.\n- Sending commands to entries.\n- Streaming blobs contained by entries\n- Establishing transparent, asynchronous bidirectional [links]\n  between entries.",
      "file": "lib/ws/writable.js",
      "line": 12,
      "aliases": "peers homeOseInstance homeInstance oseInstance home peer-to-peer peersComponent",
      "description": "## Peer-to-peer relationships\nRemote peers of an OSE instance can enter the following connection\nstates:\n\n- near: peer reachable directly through a WebSocket\n- far: peer not reachable directly, but through a gateway \"near\"\n  (or chain of \"nears\")\n- unreachable: a peer that can't be reached\n\nIn addition, each OSE instance creates a [here peer] object\ndescribing itself.\n\nFrom the point of view of a [shard], a `home` is a [peer] to which\nits [entries] logically belong. The `home` is where commands are\nexecuted.\n\n\n## Establishing a peer-to-peer channel\n\nWhen a communication channel between two OSE instances is\nestablished, the following steps are taken:\n\n1. The client Peer instance calls the `connect()` method.\n  - A [WebSocket wrapper] is created.\n  - A WebSocket native object is created and connects to `peer.url`.\n\n2. The server verifies the incoming request\n  - When there is no Peer instance for the client OSE instance, one is created.\n\n3. Server opens a WebSocket channel\n  - A [WebSocket wrapper] is created.\n\n4. Handshake between peers\n\n5. Both Peer instances assign the `rxData()` method to the `rx`\n   property of the [WebSocket wrapper] instance.\n   - After this step, the client and server become equal.\n\n\n## Messages\nFor standard peer to peer communication, data blocks, sent through\nWebSockets, are called \"messages\". Each message has a type.\nDepending on the message type, the appropriate method from [peer rx\nhandlers] is called to handle the incoming message.",
      "modules": {
        "lib/peer/here": {
          "name": "lib/peer/here",
          "type": "module",
          "caption": "Here peer",
          "readme": "Object representing own OSE instance peer. Each OSE instance\nregisters this object at startup with other peers in `O.here`\nunder its own name, i.e. `O.here.name`.",
          "file": "lib/peer/here.js",
          "method": {
            "toString": {
              "name": "toString",
              "type": "method",
              "description": "Return short peer description"
            },
            "isConnected": {
              "name": "isConnected",
              "type": "method",
              "description": "Check whether the peer is connected"
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
              "description": "Peer name unique within a space. It is good\npractice to use a server domain name."
            },
            "space": {
              "name": "space",
              "type": "property",
              "dtype": "Object",
              "description": "Space to which this peer belongs"
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
              "description": "Current [WebSocket wrapper] instance connected to an OSE instance\nrepresented by this peer.",
              "internal": true
            }
          },
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Class constructor.",
              "params": [
                {
                  "name": "space",
                  "description": "Space the peer belongs to",
                  "type": "Object"
                },
                {
                  "name": "name",
                  "description": "Peer name",
                  "type": "String"
                }
              ],
              "internal": true
            },
            "toString": {
              "name": "toString",
              "type": "method",
              "description": "Return short peer description"
            },
            "remove": {
              "name": "remove",
              "type": "method",
              "description": "Removes peer",
              "internal": true
            },
            "urlFromWindowLocation": {
              "name": "urlFromWindowLocation",
              "type": "method",
              "description": "Determines peer url from current `window.location`",
              "internal": true
            },
            "connect": {
              "name": "connect",
              "type": "method",
              "description": "Call to connect as a client to the server peer defined in\n`this.url`.",
              "params": [
                {
                  "name": "force",
                  "description": "Force connection even when other WebSocket connection is already active.",
                  "type": "Boolean",
                  "optional": true
                },
                {
                  "name": "cb",
                  "description": "Dependencies object",
                  "type": "Object",
                  "optional": true
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
              "description": "Call to close the WebSocket connection to a remote peer and not attempt to reconnect"
            },
            "close": {
              "name": "close",
              "type": "method",
              "description": "Call to close WebSocket connection to remote peer.",
              "params": [
                {
                  "name": "flipped",
                  "description": "Whether the underlying WebSocket was closed",
                  "type": "Boolean"
                }
              ],
              "internal": true
            },
            "verify": {
              "name": "verify",
              "type": "method",
              "description": "Called after a remote peer WebSocket connects as a client to this HTTP server.",
              "params": [
                {
                  "name": "ws",
                  "description": "WebSocket",
                  "type": "Object"
                }
              ],
              "internal": true
            },
            "getGw": {
              "name": "getGw",
              "type": "method",
              "description": "Finds a peer acting as a gateway",
              "params": [
                {
                  "name": "cb",
                  "description": "Callback",
                  "type": "Function"
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
              ],
              "internal": true
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
                  "name": "val",
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
            "space": {
              "name": "space",
              "type": "method",
              "description": "Establishes a link to the master space",
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
              "description": "Close link",
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
              "description": "Close link with error",
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
            "send": {
              "name": "send",
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
            },
            "read": {
              "name": "read",
              "type": "method",
              "description": "Read entry stream handler",
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
            "chunk": {
              "name": "chunk",
              "type": "method",
              "description": "Stream chunk handler",
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
          "readme": "Extension of `WebSocket wrapper` for browsers",
          "file": "lib/ws/browser.js",
          "method": {
            "open": {
              "name": "open",
              "type": "method",
              "description": "Create native WebSocket object",
              "params": [
                {
                  "name": "url",
                  "description": "URL to connect to",
                  "type": "String"
                }
              ]
            },
            "closeExt": {
              "name": "closeExt",
              "type": "method",
              "internal": true
            },
            "bindWsHandlers": {
              "name": "bindWsHandlers",
              "type": "method",
              "internal": true
            }
          }
        },
        "lib/ws": {
          "name": "lib/ws",
          "type": "class",
          "caption": "WebSocket wrapper class",
          "readme": "Communication between two near OSE instances is carried out via the\nWebSocket protocol. The native WebSocket object, provided by the\nruntime environment, is wrapped by an instance of the WebSocket\nwrapper class. This instance is created and controlled by a [Peer]\ninstance and hides differences between the Node.js and browser\nenvironments.\n\nEach WebSocket wrapper instance handles incoming packets via its\n`rx()` method. WebSocket communication behaviour can be controlled\nby assigning some method to the `rx` property.",
          "file": "lib/ws/index.js",
          "aliases": "websocketWrapper websocket",
          "method": {
            "toString": {
              "name": "toString",
              "type": "method",
              "description": "Return short description"
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
              ],
              "internal": true
            },
            "wsOpen": {
              "name": "wsOpen",
              "type": "method",
              "description": "WebSocket object open handler, called after a WebSocket is opened.",
              "internal": true
            },
            "wsClose": {
              "name": "wsClose",
              "type": "method",
              "description": "WebSocket object close handler, called after a WebSocket is closed.",
              "internal": true
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
              ],
              "internal": true
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
            "addLid": {
              "name": "addLid",
              "type": "method",
              "description": "Register a new [link]",
              "params": [
                {
                  "name": "socket",
                  "description": "`Socket` instance - one end of the `link`.",
                  "type": "Object"
                }
              ],
              "internal": true
            },
            "delLid": {
              "name": "delLid",
              "type": "method",
              "description": "Deregister the `link` identified by `lid`",
              "params": [
                {
                  "name": "lid",
                  "description": "O.link id of the `link` to deregister.",
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
                  "name": "val",
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
                  "description": "O.link id",
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
              "description": "Check whether the WebSocket object is connected\n\nreturns {Boolean} Whether the WebSocket object is connected"
            },
            "onTime": {
              "name": "onTime",
              "type": "method",
              "description": "Regularly check the socket state and take according actions. Timer\nis defined by parts of this class dependent on the runtime environment."
            }
          }
        },
        "lib/ws/node": {
          "name": "lib/ws/node",
          "type": "module",
          "caption": "Node WebSocket wrapper",
          "readme": "Extension of `WebSocket wrapper` for Node.js",
          "file": "lib/ws/node.js"
        },
        "lib/ws/worker": {
          "name": "lib/ws/worker",
          "type": "module",
          "caption": "WebSocket browser worker",
          "readme": "Worker object that isolates the [WebSocket wrapper] timer from the\n`window` object in the browser. A workaround for better (but still\nnot correct!) timer behaviour in the Android environmnent while\nsleeping.",
          "file": "lib/ws/worker.js"
        },
        "lib/ws/writable": {
          "name": "lib/ws/writable",
          "type": "class",
          "caption": "WebSocket write stream socket",
          "readme": "Relays readable stream to a peer.",
          "file": "lib/ws/writable.js",
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
            }
          }
        }
      }
    },
    "link": {
      "name": "link",
      "caption": "Sockets and links",
      "readme": "The framework makes it possible to easily create links between\n`entries` to allow communication regardless of whether it is\nrealized within one OSE instance or transparently across multiple\nOSE instances. A link is a virtual bidirectional communication\nchannel between two sockets. A link cannot exist without an active\n[peer-to-peer] connection channel between two sockets. When some\nWebSocket channel is closed, an `error` handler is called on both\nends of links using such channel and links are closed.",
      "file": "lib/link.js",
      "line": 155,
      "aliases": "link links socket sockets clientSocket responseSocket",
      "description": "## Internals\n\nEach socket is an object with handlers or an event emitter. A\nsocket is either a client socket or a response socket. To establish\na link, a client socket must first be created. The client socket\nmust then be delivered to the master entry's handler. This handler\nmust then create a corresponding response socket and open a link.\nAfter the link is established, the client and response sides become\nequal.",
      "modules": {
        "lib/link": {
          "name": "lib/link",
          "type": "module",
          "caption": "Links helper module",
          "readme": "This module contains methods for controlling links.",
          "file": "lib/link.js",
          "property": {
            "socketState": {
              "name": "socketState",
              "type": "property",
              "dtype": "Object",
              "description": "List of states entered by sockets\n\nTODO: Document individual states."
            },
            "forbiddenNames": {
              "name": "forbiddenNames",
              "type": "property",
              "dtype": "Array",
              "description": "Array of handler names that can't be used.",
              "internal": true
            }
          },
          "method": {
            "canReplace": {
              "name": "canReplace",
              "type": "method",
              "description": "Check whether it is possible to substitute a mock socket with a\nreal socket.",
              "params": [
                {
                  "name": "socket",
                  "description": "Mock socket to be checked",
                  "type": "Object"
                }
              ],
              "internal": true
            },
            "canOpen": {
              "name": "canOpen",
              "type": "method",
              "description": "Check whether it is possible to establish a link to `socket`.",
              "params": [
                {
                  "name": "socket",
                  "description": "Client socket",
                  "type": "Object"
                }
              ]
            },
            "open": {
              "name": "open",
              "type": "method",
              "description": "Call by the response side to open a link. The `open(data)` handler\non the client side is invoked.",
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
                  "type": "Object",
                  "optional": true
                },
                {
                  "name": "safe",
                  "description": "Optionally return an error object instead of throwing it, when the error can't be handled by the `socket`",
                  "type": "Boolean",
                  "optional": true
                }
              ]
            },
            "isOpened": {
              "name": "isOpened",
              "type": "method",
              "description": "Check whether a socket is opened.",
              "params": [
                {
                  "name": "socket",
                  "description": "Socket to be checked",
                  "type": "Object"
                }
              ]
            },
            "canClose": {
              "name": "canClose",
              "type": "method",
              "description": "Check whether a socket can be closed.",
              "params": [
                {
                  "name": "socket",
                  "description": "Socket to be checked",
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
                  "type": "Undefined | Object | Function",
                  "optional": true
                },
                {
                  "name": "data",
                  "description": "Data to be sent to the close handler",
                  "type": "Object",
                  "optional": true
                },
                {
                  "name": "safe",
                  "description": "Optionally return an error object instead of throwing it, when the error can't be handled by the `socket`",
                  "type": "Boolean",
                  "optional": true
                }
              ]
            },
            "error": {
              "name": "error",
              "type": "method",
              "description": "Call to close a link with an error. This method invokes\n`error(err)` handler on socket at first. When link is connected,\nthis method invokes `error(err)` handler on the other side.",
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
                },
                {
                  "name": "safe",
                  "description": "Optionally return an error object instead of throwing it, when the error can't be handled by the `socket`",
                  "type": "Boolean",
                  "optional": true
                }
              ]
            },
            "canReuse": {
              "name": "canReuse",
              "type": "method",
              "description": "Check if a socket can be reused.",
              "params": [
                {
                  "name": "socket",
                  "description": "Socket to be checked",
                  "type": "Object"
                }
              ]
            },
            "reuse": {
              "name": "reuse",
              "type": "method",
              "description": "Reuse an existing socket",
              "params": [
                {
                  "name": "socket",
                  "description": "Socket to be reused",
                  "type": "Object"
                },
                {
                  "name": "safe",
                  "description": "Optionally return an error object instead of throwing it, when the error can't be handled by the `socket`",
                  "type": "Boolean",
                  "optional": true
                }
              ]
            },
            "canSend": {
              "name": "canSend",
              "type": "method",
              "description": "Checks whether data can be sent through a link",
              "params": [
                {
                  "name": "socket",
                  "description": "Socket",
                  "type": "Object"
                }
              ]
            },
            "read": {
              "name": "read",
              "type": "method",
              "description": "Sends a stream read request to `socket`. Callback will provide readable stream.",
              "params": [
                {
                  "name": "socket",
                  "description": "Socket object",
                  "type": "Object"
                },
                {
                  "name": "name",
                  "description": "Command name",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Data to be sent",
                  "type": "Object"
                },
                {
                  "name": "cb",
                  "description": "Callback",
                  "type": "Function(err, stream)"
                }
              ]
            },
            "send": {
              "name": "send",
              "type": "method",
              "description": "Sends a message to the other end of a `socket`",
              "params": [
                {
                  "name": "socket",
                  "description": "Socket object",
                  "type": "Object"
                },
                {
                  "name": "name",
                  "description": "Command name",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Data to be sent",
                  "type": "Object"
                },
                {
                  "name": "client",
                  "description": "Client socket",
                  "type": "Object"
                }
              ]
            },
            "bindClose": {
              "name": "bindClose",
              "type": "method",
              "description": "Return function that can be used as standard `callback(err, data)`.",
              "params": [
                {
                  "name": "socket",
                  "description": "Socket to be closed",
                  "type": "Object"
                }
              ]
            },
            "bindCommandClass": {
              "name": "bindCommandClass",
              "type": "method",
              "description": "Return [entry kind] command handler that creates new response socket based on the class defined by `path`. When called, the new response socket is created with parameters `(entry, client_socket, command_request_data, data)`. Response socket is responsible to open or close provided `client_socket`.",
              "params": [
                {
                  "name": "wrap",
                  "description": "Module wrapper, `path` can be relative to this module wrapper.",
                  "type": "Object"
                },
                {
                  "name": "path",
                  "description": "Path to response socket class",
                  "type": "String"
                },
                {
                  "name": "data",
                  "description": "Optional data sent to response object constructor",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "relay": {
              "name": "relay",
              "type": "method",
              "description": "TODO:\n\nCall to relay `req` to response side socket `ws`. If `mock` is defined, semi-open a link by registering `mock` to `ws` to receive `open`, `close`, or `error` message. `mock._ws` is the socket on the client side. `mock` is now registered by both sockets. Sending anything from client side should respond in closing the link.\n\nCall to relay `req` received by `mock._ws` to `ws`. Couple of SS.RELAY sockets is created and replaces `mock`.",
              "internal": true
            },
            "mock": {
              "name": "mock",
              "type": "method",
              "description": "Call when new `req` is received by `ws` to create new mock socket.",
              "internal": true
            },
            "isForbidden": {
              "name": "isForbidden",
              "type": "method",
              "description": "Checks if a command name is forbidden.",
              "params": [
                {
                  "name": "name",
                  "description": "Command name",
                  "type": "String"
                }
              ],
              "internal": true
            }
          },
          "undefined": {
            "undefined": {
              "description": "Returns true when `socket` is linked via connected WebSocket"
            }
          }
        }
      }
    },
    "logger": {
      "name": "logger",
      "caption": "Logging and error handling",
      "readme": "Logging is implemented in the OSE framework in the [Logger] class.\nCurrently messages are logged simply using `console.log()`.\n\nError handling tries to adhere to the production practices outlined\nby Joyent ([Error Handling in\nNode.js](http://www.joyent.com/developers/node/design/errors)).",
      "file": "lib/logger.js",
      "line": 64,
      "aliases": "error logging",
      "description": "## Usage\n\nExample module :\n\n    'use strict';\n\n    var O = require('ose').module(module);\n    ...\n    O.log.info('Processing');\n\nTo create an error, it is possible to use `O.error()`, which\nappends optional `subject`, `code`, `message` and `data` to the\nerror object. These parameters make it easier to analyse\nproblems.\n\nExample:\n\n    var err = O.error(subject, 'Something has gone terribly wrong.', arguments);\n    ...\n\n    // To log an error:\n    O.log.error(err);\n\n    // or to use an error in callback:\n    cb(err);\n\n    // or to throw an error:\n    throw err;\n\n    // or send an error to a link:\n    O.link.error(socket, err);\n\nWhen calling any callback with an error response, sending an error\nto a link, or throwing an exception, an `Error` instance created by\n`O.error()` or another error instance must be used.\n\nTODO: Describe suppression of recurrent errors",
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
            "constructor": {
              "name": "constructor",
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
            "todo": {
              "name": "todo",
              "type": "method",
              "description": "Use this method to indicate an intention to do something in the future.",
              "params": [
                {
                  "name": "message",
                  "description": "Message to be logged",
                  "type": "String"
                },
                {
                  "name": "subject",
                  "description": "Subject to be logged",
                  "type": "String",
                  "optional": true
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
            "bindError": {
              "name": "bindError",
              "type": "method",
              "description": "Creates logging function\n\nTODO"
            },
            "debug": {
              "name": "debug",
              "type": "method",
              "description": "Log message with 'debug' severity.",
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
              "description": "Log message with 'info' severity.",
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
              "description": "Log message with 'notice' severity.",
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
              "description": "Log message with 'warning' severity.",
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
              "description": "Log error object.",
              "params": [
                {
                  "name": "err",
                  "description": "Error object",
                  "type": "Object"
                }
              ]
            },
            "unhandled": {
              "name": "unhandled",
              "type": "method",
              "description": "Log unhandled error object  with optional data",
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
            },
            "suppressError": {
              "name": "suppressError",
              "type": "method",
              "description": "Log error with the ability to suppress recurrent errors.",
              "params": [
                {
                  "name": "err",
                  "description": "Error object",
                  "type": "Object"
                },
                {
                  "name": "subject",
                  "description": "Subject for count",
                  "type": "Object"
                },
                {
                  "name": "message",
                  "description": "Error message",
                  "type": "String"
                },
                {
                  "name": "count",
                  "description": "Maximum number of recurrent errors for the same subject and error code",
                  "type": "Number"
                }
              ]
            },
            "isSuppressed": {
              "name": "isSuppressed",
              "type": "method",
              "description": "Check whether an error with a given subject and error code is suppressed",
              "params": [
                {
                  "name": "subject",
                  "description": "Error subject",
                  "type": "Object"
                },
                {
                  "name": "code",
                  "description": "Error code",
                  "type": "String"
                },
                {
                  "name": "count",
                  "description": "Maximum number of recurrent errors for the same subject and error code",
                  "type": "Number"
                }
              ]
            },
            "liftSuppress": {
              "name": "liftSuppress",
              "type": "method",
              "description": "Remove suppressing error messages from subject",
              "params": [
                {
                  "name": "subject",
                  "description": "Subject of error to to have logging enabled",
                  "type": "Object"
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
      "readme": "To run, each [OSE instance] requires a main configuration object\n(JavaScript object or JSON). Each main configuration object\nproperty contains configuration data for one plugin. A plugin can\nbe a class, singleton or module.\n\nDuring [OSE instance] startup, the following steps are carried out:\n1. Setup of the framework\n2. Preparation of plugins\n3. Configuration of plugins\n4. Asynchronous processing of plugin dependencies\n\nWhen all dependencies are processed, the `done` event is emitted by\nthe `dependencies` object sent to the `config()` method of each\nplugin.",
      "file": "lib/plugins.js",
      "line": 5,
      "aliases": "osePlugin oseConfig pluginsComponent",
      "description": "## OSE framework setup\n\nBasic classes and singletons are set up depending on the specified\nruntime environment (browser or server).\n\n\n## Preparation of plugins\n\nEach property of the main configuration object contains the\nconfiguration of a single OSE plugin. The `id` property of each\nplugin configuration specifies the module to be loaded with\n`require()`. If the `id` property is omitted, the key of the plugin\nconfiguration is taken as the module id.\n\nAny CommonJS module can be a plugin. If a module defines a class,\nits instance is created without parameters and becomes a plugin.\nIf a module defines a singleton, it gets initialized without any\narguments. Modules not defining a class or singleton are simply\nrequired.\n\n\n## Configuration of plugins\n\nAfter all plugins are created, individual plugins are configured\nusing the `plugin.config(key, val, deps)` method, where `key` is\nthe key taken from the main configuration object, `val` is a\nproperty corresponding to the key, and `deps` is the dependencies\nobject, which is the same for all plugins.\n\nThe `config` method, if it exists, is called on every prototype in\na plugin prototype chain. It must not call the ancestor `config()`\nmethod.\n\n\n## Dependencies\n\nDependencies make it possible to carry out asynchronous operations\nin a specific order.\n\nDuring the previous step or in any dependency callback, a new\ndependency can be registered by calling `deps.add(name, after,\ncb)`, where `cb()` represents the particular dependency.  Optional\nparameter `name` is the name of a group of dependencies to which\nthe given dependency belongs. Optional parameter `after` is the\nname of a group whose all dependencies must be processed before the\ndependency is called by the `deps` object.\n\nEach dependency receives a callback as a parameter. This callback\nmust be called after the dependency is processed. If a dependency\nis registered using a `name` of a group, the provided callback must\nbe called with the same name as its parameter.\n\n\nExample:\n\nTODO deps.add\n\nWhen there are no dependencies left, the `done` event is emitted on\nthe `deps` object.\n\nTo run some code after all plugins are initialized, register a\nmethod via `deps.on('done', <method>)` during the\n\"configuration\" or \"dependencies\" phase.\n\n\n## Order of plugins initialization\n\n- `Plugins.read()` reads configuration object and create all plugins\n- `config()` is called on each plugin.\n- `deps.exec(cb)` process the following dependency groups:\n  - \"core\" - configure kinds\n  - \"peers\" - create peers\n  - \"shards\" - configure shards\n  - \"entries\" - create entries\n  - \"connect\" - connect all peers with `url` property defined\n  - \"finish\" - finish spaces, shards and entries initialization\n\nIt is possible to add new groups and use existing ones. It's better to register dependencies before calling `deps.exec()`, that means in `config()` methods.\n\n\n## Extending\n\nIt is easy to extend OSE by creating a new npm package and adding\nan empty object with the package name as a key to the main\nconfiguration object of an [OSE instance].\n\nTo use some configuration, define the `config()` method on the\npackage's main `module.exports` and provide some configuration data\nto the package configuration property of the main configuration\nobject. The [Plugins component] then initialiazes the new package as\nanother OSE plugin during startup of an [OSE instance].\n\nTODO: example"
    },
    "wrap": {
      "name": "wrap",
      "caption": "Module wrapper",
      "readme": "This component is the core of the framework based on the\nCommonJS Modules spec.\n\nBefore you can start using the framework's methods and properties from some module,\nit is necessary to wrap the module:<br>\n`const O = require(\"ose\")(module);`\n\nThe `O` variable then gives access to both general and\nmodule-related properties and methods of the framework, see [Module\nwrapper class].",
      "file": "lib/wrap.js",
      "line": 288,
      "aliases": "class classes singleton singletons eventEmitter super moduleWrapping wrappingModule wrappingModules",
      "description": "## Description\n\nThere are several types of module wrapping:\n- simple module:<br>\n  `const O = require(\"ose\")(module);`\n- class definition:<br>\n  `const O = require(\"ose\")(module).class(constructor, \"super_module_path\");`\n- singleton definition:<br>\n  `const O = require(\"ose\")(module).singleton(init_method, \"super_module_path\");`\n\n**IMPORTANT:**<br>\nEach time a module is wrapped using `require(\"ose\")(module).class();` or `require(\"ose\")(module).singleton();`, the wrapper adds the `O` property\nto `module.exports`. The `O` property is read-only and\nnon-configurable. It is not safe to overwrite this property.\n\nSimple modules do nothing with `module` or `module.exports`. They\nonly provide the framework's methods and properties to the current\nmodule.\n\n\n## Extending `O`\n\nIt is possible to extend the framework using\n`O.extendO(\"property_name\", property_value)`. Calling this method\nadds the supplied property to the prototype of module wrapper (`const O = require('ose')...`\nvariable).\n\n\n## Classes\n\nA class is a function used as a class constructor with a prototype. It\nis good practice to define each class within its own module.\n\nOf course, it is still possible to use `util.inherits(...);`\n\nUsing the OSE module wrapping for class definition brings syntactic\nsugar for:\n- creating classes:<br>\n  `const O = require(\"ose\")(module).class(constructor_method, \"super_module_path\");`\n- chainable mixing modules into class prototypes:<br>\n  `const O = require(\"ose\")(module).class().prepend(\"module_path\").append(\"another_module_path\");`\n- runtime-specific behaviour with simple code sharing between\n    Node.js and the browser:<br>\n  `O.prepend(\"browser\")`, `O.append(\"runtime\");`\n- definition class prototype properties using `exports` variable:<br>\n  `exports.config = function(...) { ... };`\n- calling methods of superclass:<br>\n  `O.inherited(this, \"method\")(args ...);`\n- calling methods of all ancestors in prototype chain without\n    explicitly calling \"inherited\" methods in method definition:<br>\n  `O.callChain(this, \"method\")(args ...);`\n- creating class instances:<br>\n  `O.new(\"module_path\")(args ...);`\n\nTo use a class, you need to carry out three steps:\n\n1. Prepare a module containing the class definition.\n2. Obtain a class constructor.\n3. Create a new object.\n\nFirst, the class needs to be prepared in the module containing the\nclass definition by calling, for example, `const O =\nrequire(\"ose\")(module).class(init, super)`. The\n`init` parameter is an optional class initialization method. The `super` parameter\ndefines a superclass. The `super` parameter can be `undefined`, a\nclass constructor or a path to the module containing class definition.\n\nExample module with class preparation:\n\n    // Module \"ose/lib/entry\"\n    \"use strict\";\n\n    // Wrap a module to be used as a class inheriting `EventEmitter` with an `init` method.\n    const O = require(\"ose\")(module).class(init, \"EventEmitter\");\n\n    // Class constructor\n    function init(...) {\n      // Call super constructor\n      O.inherited(this)();\n      ...\n    }\n\n    // Add properties of the class prototype to the `exports` object:\n    exports.config = function(name, data) {\n      ...\n    };\n\n    // Define another property\n    exports.getIdent = function() {\n      return ...\n    };\n\nThe second step is to obtain a class constructor with its\nprototype. This step is carried out when the class is first\naccessed by calling `O.getClass(\"ose/lib/entry\")`. Multiple calls to\n`O.getClass(\"ose/lib/entry\")` return the same, already created\nclass. When called for the first time, the class prototype is\ncreated from module exports and optional mixins. If the class has\nan ancestor, the constructor should usually call the super\nconstructor (see example above).\n\nThe last step is to create a new object based on the class.\n\nClass usage example:\n\n    // Some other module ...\n    \"use strict\";\n    const O = require(\"ose\")(module);\n\n    // Obtain class constructor (second step).\n    var Entry = O.getClass(\"ose/lib/entry\");\n\n    ...\n\n      // Create a new Entry instance object (third step).\n      entry = new Entry(shard, id);\n\n    ...\n\nOr another way:\n\n    // Some other module ...\n    \"use strict\";\n    const O = require(\"ose\")(module);\n\n    ...\n\n    // Create a new Entry instance object (second and third step together).\n    entry = O.new(\"ose/lib/entry\")(shard, id);\n\n\nThe **EventEmitter** class is built in. To use this\nclass, pass `\"EventEmitter\"` to the `class()` method (see the\nexamples above).\n\n\n## Mixins\n\nIt is possible to mix another module into a class prototype. To do\nthat, use the `prepend()` or `append()` methods of the `O` wrap\nobject.\n\nExample:\n\n    // Some module\n    \"use strict\";\n\n    // Wrap module as a class definition\n    const O = require(\"ose\")(module).class(C, \"EventEmitter\");\n\n    // Prepend a module\n    O.prepend(\"some_module\");\n\n    // Append a module depending on the runtime.\n    O.append(\"runtime\");\n\nThe `prepend()` or `append()` methods supports call chaining. Both\nmethods accept a module name or array of module names. Properties\nto a class prototype are mixed in the second step of\nclass creation. Conflicting properties are overwritten\nin the following order: Last prepended, prepended, module.exports,\nfirst appended, appended.\n\nIt is possible to use the following predefined values as module names:\n* \"browser\" – If in a browser environment, use the `browser.js`\n   module from the same directory.\n* \"node\" – If in a Node.js environment, use the `node.js`\n   module from the same directory.\n* \"runtime\" – Use either the `browser.js` or `node.js` module\n   depending on the environment.\n\nIt is possible to use relative paths as module names.\n\n\n## Singletons\n\nA singleton is a JavaScript object assigned to `module.exports`. It can be\ncreated as any class instance and can use the same `append()` and\n`prepend()` mixin methods as classes. There are two types of\nsingletons. The first initializes itself in its own module and the\nsecond is initialized outside the singleton module.\n\n**IMPORTANT:**<br />\nEvery singleton must always exist in only one instance\nwithin a single running instance of OSE. The use of npm can result\nin mixing multiple installations of packages using singletons\nwithin a single OSE instance. This situation must be avoided.\n\nLike the creation of a class, the creation of a singleton is a\nthree-step process:\n\n1. Prepare a module containing the singleton's definition and\n   create the singleton\n2. Obtain singleton initialization method\n3. Initialize and obtain the singleton\n\nExample module with self-initializing singleton::\n\n    // Wrap module to be used as a singleton\n    const O = require(\"ose\")(module).singleton(I, \"EventEmitter\");\n\n    // Initialize of the singleton\n    exports = O.init();\n\n    // Singleton initialization function\n    function I() {\n      // Call super constructor\n      O.inherited(this)();\n      ...\n    }\n\n    // Properties of the singleton are defined in the `exports` variable:\n\n    exports.getId = function() {\n      return id;\n    };\n\n    ...\n\nExample module without singleton self-initialization:\n\n    // Wrap module to be used as a singleton\n    const O = require(\"ose\")(module).singleton(I, \"EventEmitter\");\n\n    // Obtain singleton object\n    exports = O.exports;\n    ...\n\nExample module with separate singleton initialization:\n\n    // Some other module ...\n    \"use strict\";\n\n    // Wrap module as module\n    const O = require(\"ose\")(module);\n\n    ...\n\n    var result = require(\"ose/lib/peer/list\").O.init(arg);\n\n    ...\n\nTo access or extend any initialized singleton, standard `require` can be used:\n\n    // Module changing singleton.\n    \"use strict\";\n\n    // Require OSE.\n    const O = require(\"ose\")(module);\n\n    // Obtain singleton.\n    var result = require(\"ose/lib/id\");\n\n    // Add new method to the singleton.\n    result.newMethod = function() {...};\n\nBe careful when altering singletons before their initialization\nbecause your changes may get overwritten by mixing of other modules\nduring singleton initialization.",
      "modules": {
        "lib/wrap": {
          "name": "lib/wrap",
          "type": "class",
          "caption": "Module wrapper class",
          "readme": "Class providing the framework's methods and properties",
          "file": "lib/wrap.js",
          "method": {
            "constructor": {
              "name": "constructor",
              "type": "method",
              "description": "Module wrapper constructor",
              "params": [
                {
                  "name": "mod",
                  "description": "Module to be wrapped",
                  "type": "Object"
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
            "typeof": {
              "name": "typeof",
              "type": "method",
              "description": "Return typeof val. For null it returns `\"null\"` and for arrays it returns `\"array\"`.",
              "params": [
                {
                  "name": "val",
                  "description": "",
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "applyError": {
              "name": "applyError",
              "type": "method",
              "description": "Create and return new error object",
              "params": [
                {
                  "name": "subject",
                  "description": "Subject of error",
                  "type": "Object"
                },
                {
                  "name": "args",
                  "description": "Error properties",
                  "type": "Object"
                }
              ]
            },
            "error": {
              "name": "error",
              "type": "method",
              "description": "Create an `Error` instance and append a subject and data to it.\n\nSee [logging].",
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
                  "type": "*",
                  "optional": true
                }
              ]
            },
            "addClass": {
              "name": "addClass",
              "type": "method",
              "description": "Register a class among predefined `classes`.",
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
            "callChain": {
              "name": "callChain",
              "type": "method",
              "description": "Call all methods with name `method` in prototype chain of `obj`.",
              "params": [
                {
                  "name": "obj",
                  "description": "",
                  "type": "Object"
                },
                {
                  "name": "method",
                  "description": "",
                  "type": "Function"
                }
              ]
            },
            "extendO": {
              "name": "extendO",
              "type": "method",
              "description": "Extend prototype for all wrappers, even those not yet created (the `O` variable)",
              "params": [
                {
                  "name": "key",
                  "description": "Property name",
                  "type": "String"
                },
                {
                  "name": "val",
                  "description": "Property value",
                  "type": "*"
                }
              ]
            },
            "require": {
              "name": "require",
              "type": "method",
              "description": "Safe version of `module.require()`",
              "params": [
                {
                  "name": "id",
                  "description": "Module to be required",
                  "type": "String"
                }
              ]
            },
            "requireChain": {
              "name": "requireChain",
              "type": "method",
              "description": "Try to require the first module found in the prototype chain\nbased on a relative path",
              "params": [
                {
                  "name": "id",
                  "description": "Relative module path",
                  "type": "String"
                }
              ]
            },
            "content": {
              "name": "content",
              "type": "method",
              "description": "Create package content",
              "params": [
                {
                  "name": "id",
                  "description": "Content module id",
                  "type": "String"
                }
              ]
            },
            "new": {
              "name": "new",
              "type": "method",
              "description": "Create new object based on a class\n\nSupply class constructor arguments to the returned function",
              "params": [
                {
                  "name": "id",
                  "description": "Class module id",
                  "type": "String"
                }
              ]
            },
            "isSuper": {
              "name": "isSuper",
              "type": "method",
              "description": "Tests whether `desc` is descendant of `sup`. When called with one\nargument, this argument is assigned to `desc`, and `sup` is\nassigned to `this.ctor`",
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
            },
            "toString": {
              "name": "toString",
              "type": "method",
              "description": "Return a short description"
            },
            "subjectToString": {
              "name": "subjectToString",
              "type": "method",
              "description": "Return subject description",
              "params": [
                {
                  "name": "subject",
                  "description": "Subject to be described",
                  "type": "*"
                }
              ]
            },
            "prepend": {
              "name": "prepend",
              "type": "method",
              "description": "Utility method for class and singleton mixing",
              "params": [
                {
                  "name": "extend",
                  "description": "Extension to be mixed into wrapped class or singleton.",
                  "type": "String|Array|Object"
                }
              ]
            },
            "append": {
              "name": "append",
              "type": "method",
              "description": "Utility method for class and singleton mixing",
              "params": [
                {
                  "name": "extend",
                  "description": "Extension to be mixed into wrapped class or singleton.",
                  "type": "String|Array"
                }
              ]
            },
            "quit": {
              "name": "quit",
              "type": "method",
              "description": "Gracefully close everything and terminate the process."
            },
            "random": {
              "name": "random",
              "type": "method",
              "description": "Generate eight-digit pseudorandom hexadecimal digit"
            },
            "nextTime": {
              "name": "nextTime",
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
            "consts": {
              "name": "consts",
              "type": "method",
              "description": "Return or create an object containing constants",
              "params": [
                {
                  "name": "name",
                  "description": "Name of object containing constants",
                  "type": "String"
                }
              ]
            },
            "run": {
              "name": "run",
              "type": "method",
              "description": "Starts OSE instance",
              "params": [
                {
                  "name": "config",
                  "description": "Configuration object",
                  "type": "Object"
                }
              ]
            },
            "inherited": {
              "name": "inherited",
              "type": "method",
              "description": "Return a function that call the `method` in `obj.prototype`",
              "params": [
                {
                  "name": "obj",
                  "description": "Class instance",
                  "type": "Object"
                },
                {
                  "name": "method",
                  "description": "Method name. When no method is specified, the default initialization method or constructor is used.",
                  "type": "String",
                  "optional": true
                }
              ]
            },
            "isModule": {
              "name": "isModule",
              "type": "method",
              "description": "Tell whether an wrapper is a module"
            },
            "isClass": {
              "name": "isClass",
              "type": "method",
              "description": "Tell whether an wrapper is a class"
            },
            "isSingleton": {
              "name": "isSingleton",
              "type": "method",
              "description": "Tell whether an wrapper is a singleton"
            },
            "getClass": {
              "name": "getClass",
              "type": "method",
              "description": "Return class constructor",
              "params": [
                {
                  "name": "name",
                  "description": "Name of class",
                  "type": "String"
                }
              ]
            },
            "class": {
              "name": "class",
              "type": "method",
              "description": "Specify that the current module is a class definition",
              "params": [
                {
                  "name": "init",
                  "description": "Initialization method",
                  "type": "Function",
                  "optional": true
                },
                {
                  "name": "superClass",
                  "description": "Super class constructor or name or path to class module",
                  "type": "Function|String",
                  "optional": true
                }
              ]
            },
            "singleton": {
              "name": "singleton",
              "type": "method",
              "description": "Specify that the current module is a singleton definition",
              "params": [
                {
                  "name": "init",
                  "description": "Initialization method",
                  "type": "Function",
                  "optional": true
                },
                {
                  "name": "superClass",
                  "description": "Super class constructor or name or path to class module",
                  "type": "Function|String",
                  "optional": true
                }
              ]
            },
            "isInitialized": {
              "name": "isInitialized",
              "type": "method",
              "description": "Determine whether a singleton has been initialized"
            },
            "init": {
              "name": "init",
              "type": "method",
              "description": "Initialize current singleton"
            },
            "setPackage": {
              "name": "setPackage",
              "type": "method",
              "description": "Specify that the current module is a main package module",
              "params": [
                {
                  "name": "name",
                  "description": "Package name",
                  "type": "String"
                }
              ]
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
            }
          },
          "property": {
            "PD_TYPE": {
              "name": "PD_TYPE",
              "type": "property",
              "dtype": "Object",
              "description": "[Property descriptor]\n(https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/defineProperty)\ntypes enumeration.",
              "internal": true
            },
            "prototype": {
              "name": "prototype",
              "type": "property",
              "dtype": "Object",
              "description": "Class prototype"
            },
            "exports": {
              "name": "exports",
              "type": "property",
              "dtype": "*",
              "description": "Module exports"
            },
            "log": {
              "name": "log",
              "type": "property",
              "dtype": "Object",
              "description": "[Logger] instance"
            },
            "package": {
              "name": "package",
              "type": "property",
              "dtype": "Object",
              "description": "Package wrapper reference"
            },
            "lastTime": {
              "name": "lastTime",
              "type": "property",
              "dtype": "Number",
              "internal": true
            },
            "_": {
              "name": "_",
              "type": "property",
              "dtype": "Object",
              "description": "Reference to [Underscore.js](http://underscorejs.org/)"
            },
            "_s": {
              "name": "_s",
              "type": "property",
              "dtype": "Object",
              "description": "Reference to [Underscore string library](https://github.com/epeli/underscore.string)"
            },
            "async": {
              "name": "async",
              "type": "property",
              "dtype": "Object",
              "description": "Reference to [Async.js library](https://github.com/caolan/async)"
            },
            "classes": {
              "name": "classes",
              "type": "property",
              "dtype": "Object",
              "description": "Predefined class names and constructors",
              "internal": true
            }
          },
          "undefined": {
            "undefined": {
              "description": "Return property descriptor type of \"prop\". (exports.PD_TYPE.data || exports.PD_TYPE.accessor || exports.PD_TYPE.object)"
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
      "readme": "This script contains the OSE framework initialization in the\nbrowser. It must be sourced before any other OSE module that is\nusing `window.ose()`.\n\nLimited CommonJS require() behaviour is made available. Every module,\nprovided by the backend to the browser, is wrapped to\n`window.ose()` method call.",
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
          "description": "`ose` is a global variable.\nProvides CommonJS Require emulation. Registers module wrapped by `init` function.",
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
          "description": "Setups OSE framework and initializes plugins."
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
      }
    },
    "lib/cli": {
      "name": "lib/cli",
      "type": "module",
      "caption": "CLI interface module",
      "readme": "This module provides a CLI interface module for OSE Node.js\ninstances. Commands can be entered to readline interface or run as\na script from a configuration file.\n\nInteractive example:\n    > sleep 10000\n    > space klinec.snasel.net\n    > shard d1\n    > entry kitchen.heater\n    > command power 0.23\n    > entry living.heater\n    > info\n    > detail\n\nConfiguration file example:\n\n    exports.cli = {\n      id: 'ose/lib/cli',\n      script: {\n        'wait 10000',\n        'space klinec.snasel.net',\n        'shard d1',\n        'entry kitchen.heater',\n        'command power 0.23',\n        'entry living.light',\n        'command switch \"on\"',\n        'info',\n        'detail'\n      }\n    }",
      "file": "lib/cli.js",
      "property": {
        "iface": {
          "name": "iface",
          "type": "property",
          "dtype": "Object",
          "description": "Readline interface"
        }
      }
    },
    "lib/deps": {
      "name": "lib/deps",
      "type": "class",
      "super": "EventEmitter",
      "caption": "Dependencies",
      "readme": "Dependencies make it possible to carry out asynchronous operations\nin a specific order.",
      "file": "lib/deps.js",
      "method": {
        "constructor": {
          "name": "constructor",
          "type": "method",
          "description": "Class constructor"
        },
        "exec": {
          "name": "exec",
          "type": "method",
          "description": "Execute dependencies",
          "params": [
            {
              "name": "cb",
              "description": "Final callback",
              "type": "Function"
            }
          ]
        },
        "add": {
          "name": "add",
          "type": "method",
          "description": "Add a new dependency",
          "params": [
            {
              "name": "name",
              "description": "Group name",
              "type": "String",
              "optional": true
            },
            {
              "name": "after",
              "description": "Name of group on which this dependency depends",
              "type": "String",
              "optional": true
            },
            {
              "name": "cb",
              "description": "Dependency code",
              "type": "Function"
            }
          ]
        },
        "inc": {
          "name": "inc",
          "type": "method",
          "description": "Increment dependency group counter",
          "params": [
            {
              "name": "name",
              "description": "Group name",
              "type": "String"
            }
          ]
        },
        "dec": {
          "name": "dec",
          "type": "method",
          "description": "Decrement dependency group counter",
          "params": [
            {
              "name": "name",
              "description": "Group name",
              "type": "String"
            }
          ]
        }
      },
      "undefined": {
        "undefined": {
          "description": "Increment a counter and return a method to be called after a task has been done.",
          "params": [
            {
              "name": "name",
              "description": "Key, to identify a task",
              "type": "String"
            },
            {
              "name": "timeout",
              "description": "Timeout in milliseconds",
              "optional": true
            }
          ]
        }
      }
    },
    "core": {
      "name": "core",
      "type": "module",
      "caption": "OSE core",
      "readme": "The core object of the \"ose\" package. It provides methods for\n[wrapping modules] complying to the CommonJS modules spec. Wrapped modules\ngives access the functionality of the OSE framework, see [Module\nwrapping].",
      "file": "lib/index.js",
      "method": {
        "config": {
          "name": "config",
          "type": "method",
          "description": "OSE plugin configuration method.",
          "internal": true
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
          ],
          "internal": true
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
    "lib/plugins": {
      "name": "lib/plugins",
      "type": "module",
      "caption": "Plugins module",
      "file": "lib/plugins.js",
      "property": {
        "plugins": {
          "name": "plugins",
          "type": "property",
          "dtype": "Object",
          "description": "List of all plugins"
        }
      },
      "method": {
        "read": {
          "name": "read",
          "type": "method",
          "description": "Read configuration object `val`, create all plugins and processes all dependencies.",
          "params": [
            {
              "name": "val",
              "description": "Configuration object or module id for `require(val)`",
              "type": "String|Object"
            }
          ]
        },
        "respond": {
          "name": "respond",
          "type": "method",
          "description": "Create a configuration object for the browser in response to a\nHTTP request.",
          "params": [
            {
              "name": "req",
              "description": "HTTP request",
              "type": "Object"
            },
            {
              "name": "resp",
              "description": "HTTP response",
              "type": "Object"
            }
          ]
        }
      }
    },
    "content": {
      "name": "content",
      "type": "singleton",
      "super": "ose/lib.http.content",
      "caption": "Framework content",
      "readme": "Provides files of [ose] package to the browser.",
      "file": "content.js"
    }
  },
  "quick": {
    "about": "<b>Open Smart Environment software is a suite for creating\nmulti-instance applications that work as a single whole.</b><br>\nImagine, for example, a personal mesh running on various devices\nincluding HTPCs, phones, tablets, workstations, servers, Raspberry\nPis, home automation gadgets, wearables, drones, etc.\n\nOSE software consists of several npm packages: a [framework] running\non Node.js, an [HTML5 frontend], extending\npackages and a set of example applications.\n\n<a href=\"http://opensmartenvironment.github.io/doc/resource/ose.svg\"><img width=100% src=\"http://opensmartenvironment.github.io/doc/resource/ose.svg\"></a>\n\n**Set-up of current example applications.** Here,\nOSE provides a [Media player](#example-player) running on an HTPC\nthat can be controlled by an IR remote through\n[LIRC](#example-lirc) and is capable of playing streams from a\n[DVB streamer](#example-dvb) and control devices through GPIO\npins on a [Raspberry Pi](#example-rpi)",
    "status": "- Pre-alpha stage (insecure and buggy)\n- Unstable API\n- Patchy documentation\n- Low test coverage (1 %)\n\nThis is not yet a piece of download-and-use software. It is important\nto understand the basic principles covered by the\n[documentation](http://opensmartenvironment.github.io/doc/).\n\nHowever, this software is successfully and continuously used since end\nof 2013 in one installation running 7 OSE instances spread over several\nRaspberries, HTPC and notebook.",
    "install": "# Installation\n\n## Node.js\nThe main prerequisite is a working installation of a recent\nversion of Node.js (>= 0.12).\n\n\n## Manual installation of OSE packages\nInstead of using npm, you can install OSE packages by cloning their\nGitHub repositories.",
    "licence": "This software is released under the terms of the [GNU General\nPublic Licence v3.0](http://www.gnu.org/copyleft/gpl.html) or\nlater.",
    "contrib": "# Contributions\nTo get started with contributing or coding, it is good to read about the\ntwo main npm packages [ose] and [ose-html5].\n\nThis software is in the pre-alpha stage. Any input is welcome, for\nexample, in the form of bug reports, pull requests, ideas, comments\nand general suggestions, either under the appropriate repository if\nyou know which one it is, or the [main OSE\nrepository](https://github.com/opensmartenvironment/ose) if you are\nunsure.",
    "aboutDoc": "# About the documentation\n\n## State of the documentation\nThis documentation is currently under construction and is being\ncontinuously improved. Links may be broken and information\nincomplete or erroneous.\n\n\n## Packages and components\nOSE documentation is compiled from source files of all official OSE\nnpm packages.\n\nEach package consists of components. Each component is a logical\nconcept consisting of modules.\n\nThe documentation of each package contains basic information about\nthe package, its components and modules not assigned to any\ncomponent.\n\nThe documentation of each component contains basic information\nabout the component and its modules.\n\n\n## Modules\nModules are mostly source files conforming to the CommonJS Modules\nspec.\n\nThe module view is a reference of methods, properties and events\nprovided by the given module.",
    "platforms": "OSE has the following prerequisites:\n- Node.js (>0.12) running on Debian Jessie and Raspbian\n- Recent version of Firefox or Chrome browser",
    "start": "The best way to get started with OSE is to try out the examples:\n- [Media player](#example-player)\n- [Raspberry Pi](#example-rpi) (or other device with GPIO)\n- [LIRC](#example-lirc)\n- [DVB streamer](#example-dvb)"
  }
};