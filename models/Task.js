const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },  
  deliveryInstructions: {
    type: String,
    required: true,
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  volunteer: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  status: {
    type: Integer,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  }
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task
