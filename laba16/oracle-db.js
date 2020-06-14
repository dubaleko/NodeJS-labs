const oracledb = require('oracledb');
const dbConfig = require('./config').oracle;

const options = { autoCommit: true, outFormat: oracledb.OUT_FORMAT_OBJECT };
let connectionPool;

class Db {
    constructor() {
        oracledb.createPool(dbConfig).then(pool => connectionPool = pool);
    }
    getTeacherByFaculty(tableName,fields) {
        let sql = "Select Teacher.Teacher,Teacher.Teacher_Name,Teacher.Pulpit from Teacher Inner Join"+
            " Pulpit On Teacher.Pulpit=Pulpit.Pulpit Inner Join Faculty On "+
            "Pulpit.Faculty=Faculty.Faculty Where Faculty.Faculty="+`'${fields.Faculty}'`;
        return this.simpleExecute(sql);
    }
    getSubjectByFaculty(tableName,fields) {
        let sql = "Select Subject.Subject,Subject.Subject_Name,Subject.Pulpit from Subject "+
            "Inner Join Pulpit On Subject.Pulpit=Pulpit.Pulpit Inner Join Faculty On "+
            "Pulpit.Faculty=faculty.faculty Where faculty.Faculty="+`'${fields.Faculty}'`;
        return this.simpleExecute(sql);
    }
    getAll(tableName) {
        const sql = `SELECT * FROM ${tableName}`;
        return this.simpleExecute(sql);
    }
    getOne(tableName, fields) {
        let key = Object.keys(fields)[0];
        let sql = `SELECT * FROM ${tableName} WHERE ${key} = '${fields[key]}' `;
        return this.simpleExecute(sql);
    }
    insertOne(tableName, fields) {
        let sql = `INSERT INTO ${tableName} values (`;
        Object.keys(fields).forEach((field) => {
            sql += `'${fields[field]}',`;
        });
        sql = sql.replace(/.$/, ")");
        return this.simpleExecute(sql);
    }
    updateOne(tableName, fields) {
        let sql = `UPDATE ${tableName} SET `;
        Object.keys(fields).forEach(field => {
            sql += `${field} = '${(fields[field])}',`;
        });
        sql = sql.slice(0, -1);
        sql += ` WHERE ${tableName} = '${fields[tableName]}'`;
        return this.simpleExecute(sql);
    }
    deleteOne(tableName, id) {
        const sql = `DELETE FROM ${tableName} WHERE ${tableName} = '${id}'`;
        return this.simpleExecute(sql);
    }
    async simpleExecute(statement) {
        let conn;
        try {
            conn = await connectionPool.getConnection();
            let result = await conn.execute(statement,[],options);
            return  result.rows;
        } catch (err) {
            console.log(err);
        }finally {
            if (conn){
                try{
                    await conn.close();
                }catch (err) {
                    console.log(err);
                }
            }
        }
    }
}

module.exports.Db = Db;