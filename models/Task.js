const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    deliveryAddress: {
        type: String,
        required: true,
    },
    deliveryLatLong: {
        type: Array,
        required: true,
    },
    deliveryInstructions: {
        type: String,
        required: true,
    },
    deliveryNeighborhood: {
        type: String,
        required: true,
    },
    requester: {
        type: Schema.Types.Mixed,
        ref: 'users',
        required: true,
    },
    volunteer: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        default: null,
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1, 2],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: null,
    },
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
