/*
    Parser por valoli.
    Parsea el mensaje entrante y después ejecuta
    la función correspondiente.



*/
const commands = require('./commands.json');
let funcs = {
    help: function(args){
        // command: string
        let command = args[2];
    },
    register: function(args){
        // id: integer, username: string, nickname: string
        console.log(args[3]);
    },
    info: function(args){
        return args[2];
    },
    config: function(args){
        return args[2];
    },
    hi: function(args)
    {
        console.log("Hi " + args[2]);
    }
};
// checar el tamaño de la expresión
function checkExpressionSize(expectedSize, actualSize)
{
    if(expectedSize === actualSize)
    {
        return true;
    }
    return false;
}

// function: obtener data desde los commandos
function commandData(index)
{
    let i = index + 1;
    i = i.toString();

    return commands[i];
}

function parser(message)
{
    let prefix           = ["valoli", "val"];
    let validCommands    = ["--h", "--r", "--i", "--config", "--hi"];
    let sizeOfCommands   = [3, 4, 4, 4, 3];

    let index = 0;
    let currentSize = 0;

    
    // obtenemos el tamaño del mensaje para verificar que tenga el tamaño adecuado t = 6 || 2
    if(message.length >= 3)
    {
        //executamos el split al mensaje
        let args = message.split(" ");
        //executamos la busqueda de comandos solo si el primer indice es igual a loli || lo || lol
        if(prefix.includes(args[0].toLowerCase()))
        {
            if(args.length >= 2)
            {
                if(validCommands.includes(args[1].toLowerCase()))
                {
                    // obtenemos el index del comando valido
                    index = validCommands.indexOf(args[1]);

                    // obtenemos la configuración del comando valido
                    currentSize = sizeOfCommands[index];

                    // obtenemos la función respecto al index
                    // execFunction = commandFunctions[index];

                    // comparamos el actual size con el tamaño de la config
                    let currentCommand = commandData(index);
                    let cucoArgSize    = currentCommand["argumentSize"];

                    
                    if(currentSize === cucoArgSize)
                    {
                        // ejecutamos la función si la configuración concuerda con la cantidad de argumentos
                        funcs[currentCommand["function"]](args);
                    }
                    else
                    {
                        // trigger mensaje de error de argumentos
                        console.log("la función debe de incluir arguments");
                    }

                    
                }
                else
                {
                    // trigger el controlador de excepciones de comandos con el argumento dado
                    // manda una lista con los argumentos validos
                    console.log("el comando que insertaste es invalido");
                }
            }
            else
            {
                // trigger el controlador de excepciones de comandos con el argumento dado
                // manda una lista de las posibles sintaxis
                console.log("no existen argumentos después del prefijo");
            }
        }
    }
}

// probando
parser("val --h help");
