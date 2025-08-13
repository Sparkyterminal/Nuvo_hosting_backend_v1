const mongoose = require('mongoose');

const staffRequestSchema = new mongoose.Schema({
  // Basic Info
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  placeOfBirth: { type: String },
  dob: { type: Date, required: true },
  status: { type: String }, // single/married/etc

  // Contact
  telephone: { type: String },
  cellPhone: { type: String, required: true },
  email: { type: String, required: true },

  // Physical Attributes
  weight: { type: String },
  height: { type: String },
  shoeSize: { type: Number },
  blazerSize: { type: String },
  trouserSize: { type: String },

  // Education
  student: { type: String }, // yes/no
  school: { type: String },
  degree: { type: String },

  // Languages
  languages: [
    {
      name: { type: String },
      proficiency: { type: String } // e.g., Basic, Native, Conversational
    }
  ],

  // Experience
  hostessExperience: { type: String }, // yes/no
  groupResponsible: { type: String }, // yes/no
  agency: { type: String },
  experienceAreas: [{ type: String }], // e.g., actor, barman
  workType: { type: String }, // full-time/part-time
  holidayWork: { type: String }, // yes/no

  // Image Uploads
  images: {
    profilePhoto: { type: String },
  },

  // Availability or Other Flags (if any extra checkboxes)
  availability: {
    fullDay: { type: Boolean, default: false },
    partTime: { type: Boolean, default: false },
    both:{type: Boolean , default:false}
  },
}, { timestamps: true });

module.exports = mongoose.model('StaffRequest', staffRequestSchema);
