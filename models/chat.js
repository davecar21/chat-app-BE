const mongoose = require('../config/db');
const Schema = mongoose.Schema;

let ChatMethod = {}

let chatSchema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    chatDate: {
        type: Date,
        required: true
    },
    chatType: {
        type: String,
        required: true,
        enum: ['SL', 'VL', 'EL']
    },
    chatHours: {
        type: Number,
        required: true,
        enum: [4, 8]
    },
    chatNotes: {
        type: String
    },
    chatDateReturnWork: {
        type: Date,
        required: true
    },
    chatStatus: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'declined'],
        default: 'pending'
    },
    approvedBy: {
        type: Schema.Types.ObjectId,
        ref: 'UserInfo'
    }
}, {
    timestamps: true
});

let Chat = mongoose.model('Chat', chatSchema);

ChatMethod.getChat = async () => {
    const result = await Chat.find().populate('userID');
    return result;
}

ChatMethod.getChatById = async (id) => {
    const result = await Chat.find({
        userID: id
    }).populate('userID');
    return result;
}

ChatMethod.postChat = async (chat) => {
    chat._id = new mongoose.Types.ObjectId();
    const chatData = new Chat(chat);
    const result = await chatData.save();
    return result;
}

ChatMethod.Chat = Chat;
module.exports = ChatMethod;