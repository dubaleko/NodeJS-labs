const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Faculty extends Model{};
class Pulpit extends Model{};
class Subject extends Model{};
class AuditoriumType extends Model{};
class Auditorium extends Model{};
function internalORM(sequelize){
    Faculty.init(
        {
            FACULTY: {type: Sequelize.STRING, allowNull:false, primaryKey:true},
            FACULTY_NAME: {type:Sequelize.STRING}
        }, {sequelize, modelName:'Faculty', tableName:'FACULTY', timestamps: false}
    );
    Pulpit.init(
        {
            PULPIT:{type: Sequelize.STRING, allowNull:false, primaryKey:true},
            PULPIT_NAME: {type:Sequelize.STRING},
            FACULTY: {type:Sequelize.STRING, allowNull:false}
        },{sequelize, modelName:'Pulpit', tableName:'PULPIT', timestamps: false}

    )
    Subject.init(
        {
            SUBJECT:{type:Sequelize.STRING,allowNull:false, primaryKey:true},
            SUBJECT_NAME: {type:Sequelize.STRING, allowNull:false},
            PULPIT: {type:Sequelize.STRING, allowNull:false}
        },{sequelize, modelName:'Subject', tableName:'SUBJECT', timestamps: false}
    )
    AuditoriumType.init(
        {
            AUDITORIUM_TYPE:{type:Sequelize.STRING, allowNull:false, primaryKey:true},
            AUDITORIUM_TYPENAME:{type:Sequelize.STRING, allowNull:false}
        },{sequelize, modelName:'AuditoriumType', tableName:'AUDITORIUM_TYPE', timestamps: false}
    )
    Auditorium.init(
        {
            AUDITORIUM:{type:Sequelize.STRING, allowNull:false, primaryKey:true},
            AUDITORIUM_NAME:{type:Sequelize.STRING},
            AUDITORIUM_CAPACITY:{type:Sequelize.INTEGER},
            AUDITORIUM_TYPE:{type:Sequelize.STRING, allowNull:false}
        }, {sequelize, modelName:'Auditorium', tableName:'AUDITORIUM', timestamps: false}
    )
}
exports.ORM =(s) =>{internalORM(s); return{Faculty, Pulpit,Subject,AuditoriumType, Auditorium};}
