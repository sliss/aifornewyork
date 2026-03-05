import mongoose, { Schema, Document } from 'mongoose';

export interface ISignature extends Document {
  bill_id: mongoose.Types.ObjectId;
  type: 'individual' | 'organization';
  full_name: string;
  email: string;
  zip_code: string;
  borough_or_city?: string;
  description?: string;
  display_publicly: boolean;
  email_updates: boolean;
  email_confirmed: boolean;
  confirmation_token: string;
  confirmed_at?: Date;
  // Org-specific fields
  org_name?: string;
  org_website?: string;
  org_type?: string;
  org_title?: string;
  org_logo_url?: string;
  org_statement?: string;
  org_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

const SignatureSchema = new Schema<ISignature>({
  bill_id: { type: Schema.Types.ObjectId, ref: 'Bill', required: true },
  type: { type: String, enum: ['individual', 'organization'], required: true },
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  zip_code: { type: String, required: true },
  borough_or_city: { type: String },
  description: { type: String },
  display_publicly: { type: Boolean, default: true },
  email_updates: { type: Boolean, default: false },
  email_confirmed: { type: Boolean, default: false },
  confirmation_token: { type: String, required: true },
  confirmed_at: { type: Date },
  // Org-specific
  org_name: { type: String },
  org_website: { type: String },
  org_type: { type: String },
  org_title: { type: String },
  org_logo_url: { type: String },
  org_statement: { type: String, maxlength: 280 },
  org_verified: { type: Boolean, default: false },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

SignatureSchema.index({ bill_id: 1, email: 1 }, { unique: true });
SignatureSchema.index({ confirmation_token: 1 });

export default mongoose.models.Signature || mongoose.model<ISignature>('Signature', SignatureSchema);
