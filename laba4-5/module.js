let util = require('util');
let events = require('events');

let bd_data =  [
    {id: 1, name: 'Ninadov A.M.', bday: '2000-01-02'},
    {id: 2, name: 'Kataev C.E.', bday: '2000-01-03'},
    {id: 3, name: 'Petrovich N.I.', bday: '2000-01-04'}
];

function DB() {
    this.get = () => {return bd_data};
    this.post = (element) => {bd_data.push(element);};
    this.put =  (element) => {let index = bd_data.indexOf(element.id); bd_data.splice(index,1, element);};
    this.delete = (element) => {let index =bd_data.indexOf(element.id); bd_data.splice(index, 1);};
    this.commit = () => {console.log('Commit success. \n'); return 0;};
}

util.inherits(DB, events.EventEmitter);

exports.DB =DB;