const mongoose = require('mongoose');

const eventRequestSchema = new mongoose.Schema({
  natureOfEvent: { type: String, required: true },           // "event_nature"
  nameOfEvent: { type: String, required: true },             // "event_name"
  dateOfEvent: { type: Date, required: true },               // "event_date"
  physicalLocation: { type: String, required: true },        // "location"
  city: { type: String, required: true },
  country: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },          // "num_people"
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  staffQuantity: { type: String, required: true },
  needOutfit: { type: Boolean, required: true },
  needBriefing: { type: Boolean, required: true },
  needHeadStaff: { type: Boolean, required: true },
  rolesRequired: [{ type: String, required: true }],
  fullName: { type: String, required: true },
  companyName: { type: String },
  businessSector: { type: String },
  address: { type: String, required: true },
  contactCity: { type: String, required: true },
  contactCountry: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('EventRequest', eventRequestSchema);
