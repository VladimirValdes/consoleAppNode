
const { green } = require('colors');
const inquirer = require('inquirer');
const Choices = require('inquirer/lib/objects/choices');

require('colors');

// Creamos un arreglo con el objeto que contendra nuestras opciones
const preguntas = [
    
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar Tareas Completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar Tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
];



const inquirerMenu = async() => {
    
    console.clear();
    console.log('================================'.green);
    console.log('   Seleccione una opcion'.white);
    console.log('================================\n'.green);

    // Mostramos nuestro menu y nos devuelve la opcion seleccionada
    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;


}



const listadoTareasBorrar = async( tareas = [] ) => {


    const choices = tareas.map( ( tarea, i ) => {

        const idx = `${ i + 1}`.green;

        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }

    ];

    const { id } = await inquirer.prompt(preguntas);

    return id;


}

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`
        }
    
    ];
    
    console.log('\n');
    await inquirer.prompt(question);

}


const leerInput = async( message ) => {
    
    
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) { // nos permite validar el valor ingresado por el usuario

                if ( value.length === 0) {
                    return 'Por favor ingrese un valor'
                }

                return true;
            }
        }    
    ];

   const { desc } = await inquirer.prompt( question );
   return desc;
}


const confirmar = async( message ) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt( question );

    return ok;
}



const mostrarListadoCheckList = async( tareas = [] ) => {


    const choices = tareas.map( ( tarea, i ) => {

        const idx = `${ i + 1}`.green;


        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.desc}`,
            checked: ( tarea.completeEn)
                            ? true
                            : false
        }
    });


    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }

    ];

    const { ids } = await inquirer.prompt(pregunta);

    return ids;


}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList

}