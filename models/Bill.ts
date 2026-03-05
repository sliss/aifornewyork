import mongoose, { Schema, Document } from 'mongoose';

export interface IBill extends Document {
  slug: string;
  bill_number: string;
  title: string;
  short_summary: string;
  status: 'introduced' | 'committee' | 'floor_vote' | 'passed_one_chamber' | 'passed_both' | 'signed' | 'vetoed' | 'dead';
  threat_level: 'dangerous' | 'watch' | 'supportive';
  sponsor: string;
  last_action: string;
  last_action_date: Date;
  plain_english_body: string;
  who_gets_hurt: string;
  our_position: string;
  open_letter_body: string;
  created_at: Date;
  updated_at: Date;
}

const BillSchema = new Schema<IBill>({
  slug: { type: String, required: true, unique: true },
  bill_number: { type: String, required: true },
  title: { type: String, required: true },
  short_summary: { type: String, required: true },
  status: {
    type: String,
    enum: ['introduced', 'committee', 'floor_vote', 'passed_one_chamber', 'passed_both', 'signed', 'vetoed', 'dead'],
    required: true,
  },
  threat_level: {
    type: String,
    enum: ['dangerous', 'watch', 'supportive'],
    required: true,
  },
  sponsor: { type: String, required: true },
  last_action: { type: String, required: true },
  last_action_date: { type: Date, required: true },
  plain_english_body: { type: String, default: '' },
  who_gets_hurt: { type: String, default: '' },
  our_position: { type: String, default: '' },
  open_letter_body: { type: String, default: '' },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

export default mongoose.models.Bill || mongoose.model<IBill>('Bill', BillSchema);
