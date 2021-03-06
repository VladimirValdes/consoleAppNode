
// Ventajas de utilizar un metodo getter es que se declara como una propiedad pero nos da la funcionalidad
// de poner logica dentro de ellos


// Object.keys() nos trae las llaves de un objeto y nos retorna un arreglo de string

require('colors');
const Tarea = require('./tarea');


class Tareas  {

    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];

            listado.push( tarea );

        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea( desc = '' ) {

        const tarea = new Tarea( desc );

        this._listado[tarea.id] = tarea;

    }

    borrarTarea( id = '') {
        
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toogleCompletadas( ids = [] ) {

        ids.forEach( id => {
            
            const tarea = this._listado[id];

            if ( !tarea.completeEn ) {
                tarea.completeEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach( tarea => {
            
            if ( !ids.includes( tarea.id )) {
                this._listado[tarea.id].completeEn = null;
            }
        });
    }

    listadoCompleto() {
        // const listado = this.listadoArr;

        // listado.forEach ( (tarea, index) => {

        //     if (tarea.completeEn) {
        //         console.log(`${colors.green((index + 1)+'.')} ${ tarea.desc }:: ${'Completada'.green}`);
        //     } else {
        //         console.log(`${colors.green((index + 1)+'.')} ${ tarea.desc }:: ${'Pendiente'.red}`);

        //     }

        // })

        console.log();

        this.listadoArr.forEach( ( tarea, i ) => {

            const idx = `${ i + 1}.`.green;
            const { desc, completeEn } = tarea;
            const estado = ( completeEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado } `);
        })
    }


    listarPendientesCompletadas( completadas = true ) {

            console.log();
            let contador = 0;
            this.listadoArr.forEach( ( tarea, i ) => {

                const { desc, completeEn } = tarea;
                const estado = ( completeEn ) 
                                    ? 'Completada'.green
                                    : 'Pendiente'.red;
    
                if ( completadas ) {

                    if (completeEn) {
                        contador += 1
                        console.log(`${(contador + '.').green} ${ desc } :: ${ completeEn.green } `);
                    }
                } else  {
                    if (!completeEn) {
                        contador += 1;
                        console.log(`${(contador + '.').green} ${ desc } :: ${ estado } `);
                    }
                }
    
            });

           
    }
}

module.exports =  Tareas;