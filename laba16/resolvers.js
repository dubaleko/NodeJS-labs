async function getRecordsByField(object, field, context) {
    const fieldsMap = {};
    fieldsMap[object] = field;

    let records = [];
    if (field) {
        records = await context.getOne(object, fieldsMap);
    } else {
        records = await context.getAll(object);
    }
    return records;
}
async function getRecordsByField2(object, field, context) {
    const fieldsMap = {};
    fieldsMap[object] = field;

    let records = [];
    if (field) {
        records = await context.getSubjectByFaculty(object, fieldsMap);
    }
    return records;
}
async function getRecordsByField3(object, field,context) {
    const fieldsMap = {};
    fieldsMap[object] = field;

    let records = [];
    if (field) {
        records = await context.getTeacherByFaculty(object, fieldsMap);
    }
    return records;
}
async function mutateRecord(object, idField, fields,context) {

    return await getRecordsByField(object, idField,context)
        .then(async records => {
            let targetRecord = {};
            if (records.length > 0) {
                targetRecord = await context.updateOne(object, fields)
                    .then(() => context.getOne(object, fields));
            } else {
                targetRecord = await context.insertOne(object, fields)
                    .then(() => context.getOne(object, fields));
            }
            return targetRecord[0];
        });
}
async function deleteRecord(object, id,context) {
    let recordIdObject = {};
    recordIdObject[object] = id;
    let targetFaculty = await context.getOne(object, recordIdObject);
    context.deleteOne(object, id);
    return targetFaculty[0];
}

module.exports = {
    getFaculties: (args, context) => getRecordsByField('Faculty', args.faculty, context),
    getPulpits: (args, context) => getRecordsByField('Pulpit', args.pulpit, context),
    getSubjects:  (args, context) => getRecordsByField('Subject', args.subject, context),
    getTeachers: (args, context) => getRecordsByField('Teacher', args.teacher, context),
    getTeachersByFaculty: (args, context) => getRecordsByField3('Faculty',args.faculty, context),
    getSubjectsByFaculty: (args, context) => getRecordsByField2('Faculty',args.faculty,context),

    setFaculty: (args, context) => {
        let fields = {Faculty: args.faculty.faculty, Faculty_Name: args.faculty.facultyName};
        return mutateRecord('Faculty', fields.Faculty, fields, context);
    },
    setPulpit: async (args, context) => {
        let fields = {Pulpit: args.pulpit.pulpit, Pulpit_Name: args.pulpit.pulpitName, Faculty: args.pulpit.faculty};
        return mutateRecord('Pulpit', fields.Pulpit, fields, context);
    },
    setSubject: async (args, context) => {
        let fields = {Subject: args.subject.subject, Subject_Name: args.subject.subjectName, Pulpit: args.subject.pulpit};
        return mutateRecord('Subject', fields.Subject, fields, context);
    },
    setTeacher: async (args, context) => {
        let fields = {Teacher: args.teacher.teacher, Teacher_Name: args.teacher.teacherName, Pulpit: args.teacher.pulpit};
        return mutateRecord('Teacher', fields.Teacher, fields, context);
    },

    delFaculty: (args, context) => deleteRecord('Faculty', args.faculty, context),
    delPulpit: (args, context) => deleteRecord('Pulpit', args.pulpit, context),
    delSubject: (args, context) => deleteRecord('Subject', args.subject, context),
    delTeacher: (args, context) => deleteRecord('Teacher', args.teacher, context)
};