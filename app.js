//
//
require('colors');

const { inquirerMenu, 
        pausa, 
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList
      } = require('./helpers/inquirer');

const { guardarDB, leerDB  } = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');

console.clear();

const main =  async() => {

  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();

    if ( tareasDB ) {
    
      tareas.cargarTareasFromArray( tareasDB );
    }

    // await pausa();

    do {
        
       opt = await inquirerMenu();

      switch (opt) {
        case '1':

          const tarea = await leerInput('Descripcion:');
          // console.log(tarea);
          tareas.crearTarea( tarea );

          break;
        case '2':
            tareas.listadoCompleto();

          break;
        case '3':
          tareas.listarPendientesCompletadas(); 

          break;
        case '4':
          tareas.listarPendientesCompletadas(false); 

          break;
        case '5': 

          const ids = await mostrarListadoCheckList( tareas.listadoArr );
          // console.log(ids);
            tareas.toogleCompletadas( ids );
          break;
        case '6': 
          const id = await listadoTareasBorrar( tareas.listadoArr );

          if ( id !== '0') {
            const ok = await confirmar('Estas seguro?');

            if (ok) {
              tareas.borrarTarea( id );
              console.log('Tarea Borrada');
            }
          }
         break;
      }

      guardarDB( tareas.listadoArr );


      
      if ( opt !== '0') {  await pausa(); } 

    } while (opt !== '0');
}

main();