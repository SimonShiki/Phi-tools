const { Extension, type, api } = require('clipcc-extension');

class MyExtension extends Extension {
    onInit() {
        console.log('init!');
        api.addCategory({
            categoryId: 'phi.tools.category',
            messageId: 'phi.tools.category',
            color: '#4d4d4d'
        });
        api.addBlock({
            opcode: 'phi.tools.eval',
            type: type.BlockType.REPORTER,
            messageId: 'phi.tools.eval',
            categoryId: 'phi.tools.category',
            param: {
                CODE: {
                    type: type.ParameterType.STRING,
                    default: 'alert("test")'
                }
            },
            function: (args, util) => eval(args.CODE)
        });
        api.addBlock({
            opcode: 'phi.tools.addCategory',
            type: type.BlockType.COMMAND,
            messageId: 'phi.tools.addCategory',
            categoryId: 'phi.tools.category',
            param: {
                CATEGORY: {
                    type: type.ParameterType.STRING,
                    default: 'test.category'
                },
                COLOR: {
                    type: type.ParameterType.COLOR,
                    default: '#4c97ff'
                }
            },
            function: (args, util) => {
                api.addCategory({
                    categoryId: args.CATEGORY,
                    messageId: args.CATEGORY,
                    color: args.COLOR
                });
            }
        });
        api.addBlock({
            opcode: 'phi.tools.removeCategory',
            type: type.BlockType.COMMAND,
            messageId: 'phi.tools.removeCategory',
            categoryId: 'phi.tools.category',
            param: {
                CATEGORY: {
                    type: type.ParameterType.STRING,
                    default: 'test.category'
                }
            },
            function: (args, util) => {
                api.removeCategory(args.CATEGORY);
            }
        });
        api.addBlock({
            opcode: 'phi.tools.addBlock',
            type: type.BlockType.COMMAND,
            messageId: 'phi.tools.addBlock',
            categoryId: 'phi.tools.category',
            param: {
                OPCODE: {
                    type: type.ParameterType.STRING,
                    default: 'test.block1'
                },
                CATEGORY: {
                    type: type.ParameterType.STRING,
                    default: 'test.category'
                },
                TYPE: {
                    type: type.ParameterType.STRING,
                    default: 'REPORTER'
                },
                FUNC: {
                    type: type.ParameterType.STRING,
                    default: 'function test() { return "test"; }'
                }
            },
            function: (args, util) => {
                api.addBlock({
                    opcode: args.OPCODE,
                    type: type.BlockType[args.TYPE],
                    messageId: args.OPCODE,
                    categoryId: args.CATEGORY,
                    function: eval(args.FUNC)
                });
            }
        });
        api.addBlock({
            opcode: 'phi.tools.removeBlock',
            type: type.BlockType.COMMAND,
            messageId: 'phi.tools.removeBlock',
            categoryId: 'phi.tools.category',
            param: {
                OPCODE: {
                    type: type.ParameterType.STRING,
                    default: 'test.block1'
                }
            },
            function: (args, util) => {
                api.removeBlock(args.OPCODE);
            }
        });
        api.addBlock({
            opcode: 'phi.tools.registerGlobalFunc',
            type: type.BlockType.COMMAND,
            messageId: 'phi.tools.registerGlobalFunc',
            categoryId: 'phi.tools.category',
            param: {
                NAME: {
                    type: type.ParameterType.STRING,
                    default: 'helloworld'
                },
                FUNC: {
                    type: type.ParameterType.STRING,
                    default: 'function() { alert("hello world!"); }'
                }
            },
            function: (args, util) => {
                api.registerGlobalFunction(args.NAME, eval(args.FUNC));
            }
        });
        api.addBlock({
            opcode: 'phi.tools.unregisterGlobalFunc',
            type: type.BlockType.COMMAND,
            messageId: 'phi.tools.unregisterGlobalFunc',
            categoryId: 'phi.tools.category',
            param: {
                NAME: {
                    type: type.ParameterType.STRING,
                    default: 'helloworld'
                }
            },
            function: (args, util) => {
                api.unregisterGlobalFunction(args.NAME);
            }
        });
        api.addBlock({
            opcode: 'phi.tools.callGlobalFunc',
            type: type.BlockType.COMMAND,
            messageId: 'phi.tools.callGlobalFunc',
            categoryId: 'phi.tools.category',
            param: {
                NAME: {
                    type: type.ParameterType.STRING,
                    default: 'helloworld'
                },
                ARGS: {
                    type: type.ParameterType.STRING,
                    default: '[]'
                }
            },
            function: (args, util) => {
                api.callGlobalFunction(args.NAME, JSON.parse(args.ARGS));
            }
        });
        api.addBlock({
            opcode: 'phi.tools.printSettings',
            type: type.BlockType.COMMAND,
            messageId: 'phi.tools.printSettings',
            categoryId: 'phi.tools.category',
            function: () => {
                console.log(
                    api.getSettings('phi.tools.injectVM'),
                    api.getSettings('phi.tools.workTime'),
                    api.getSettings('phi.tools.output')
                );
            }
        });
        api.addBlock({
            opcode: 'phi.tools.printInstance',
            type: type.BlockType.COMMAND,
            messageId: 'phi.tools.printInstance',
            categoryId: 'phi.tools.category',
            function: (args, util) => {
                console.log('BlockUtility:', util);
                // console.log('GuiInstance', api.getGuiInstance());
                console.log('VmInstance', api.getVmInstance());
                console.log('BlockInstance', api.getBlockInstance());
            }
        });
    }

    onUninit () {
        console.log('uninit!');
        api.removeCategory('phi.tools.category');
    }

    beforeProjectLoad () {
        console.log('beforeProjectLoad!');
    }

    beforeProjectSave () {
        console.log('beforeProjectSave!');
    }
}

module.exports = MyExtension;
