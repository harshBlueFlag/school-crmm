const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  contactDetails: { type: String, required: true },
  feesPaid: { type: Boolean, required: true },
  assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
});

module.exports = mongoose.model('Student', studentSchema);
