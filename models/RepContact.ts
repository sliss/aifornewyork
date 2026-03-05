import mongoose, { Schema, Document } from 'mongoose';

export interface IRepContact extends Document {
  bill_id: mongoose.Types.ObjectId;
  zip_code: string;
  district_type: 'senate' | 'assembly';
  district_number: string;
  action_type: 'phone_script_copied' | 'email_copied' | 'email_sent';
  created_at: Date;
}

const RepContactSchema = new Schema<IRepContact>({
  bill_id: { type: Schema.Types.ObjectId, ref: 'Bill', required: true },
  zip_code: { type: String, required: true },
  district_type: { type: String, enum: ['senate', 'assembly'], required: true },
  district_number: { type: String, required: true },
  action_type: { type: String, enum: ['phone_script_copied', 'email_copied', 'email_sent'], required: true },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false },
});

export default mongoose.models.RepContact || mongoose.model<IRepContact>('RepContact', RepContactSchema);
