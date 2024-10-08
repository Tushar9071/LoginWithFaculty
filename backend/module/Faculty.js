const moongoose = require('mongoose');
const schema = new moongoose.Schema({
id : String,
FacultyName : String,
FacultyDesignation : String,
FacultyEducationQualification : String,
FacultyExperience : String,
FacultyWorkingSince : String,
FacultyImage : String,


});

module.exports = moongoose.model('facultys',schema);