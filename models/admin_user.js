const mongoose=require('mongoose');

const Trial = mongoose.model('Trial', {
    email: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    role: { type: String, enum: ['admin', 'restricted'], required: true },
  });

module.exports=Trial;