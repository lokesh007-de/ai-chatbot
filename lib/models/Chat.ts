import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface IChat extends Document {
  userId: string;
  title: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatSchema = new Schema<IChat>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  messages: [MessageSchema],
}, { timestamps: true });

export default mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);