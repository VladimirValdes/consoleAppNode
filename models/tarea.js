
const { v4: uuidv4 } = require('uuid');

class Tarea {

    id = '';
    desc = '';
    completeEn = null;

    constructor( desc ) {
        this.id = uuidv4();
        this.desc = desc;
        this.completeEn = null;
    }
}

module.exports = Tarea;