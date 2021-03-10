const fs = require('fs');

const archivo = './db/data.json';

const guardarDB = ( data ) => {
    // guardamos la data en el archivo
    fs.writeFileSync( archivo, JSON.stringify(data));
}

const leerDB = () => {

    // Verificamos si nuestro archivo existe
    if ( !fs.existsSync(archivo) ) {
        return null;
    }

    // Leemos nuestro archivo
    const info = fs.readFileSync( archivo, { encoding: 'utf-8' });

    // Parseamos nuestra data
    const data = JSON.parse(info); 
    
    // console.log(data);

    return data;
}

module.exports = {
    guardarDB,
    leerDB
};