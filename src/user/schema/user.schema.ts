import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Status, UserRole } from 'src/utils/enum/user.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  validateBeforeSave: true,
  autoIndex: true,
  toJSON: { virtuals: true },
})
export class User {
  @Prop({ type: String })
  mobile: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, default: null })
  password: string;

  @Prop({ enum: UserRole })
  role: UserRole;

  @Prop({ default: Status.Active, enum: Status })
  status: Status;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: false,
  })
  createdBy: UserDocument | null;

  @Prop({ default: null })
  lastLogin: Date;

  @Prop({ default: null })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual('admin', {
//   ref: Admin.name,
//   localField: '_id',
//   foreignField: 'user',
//   justOne: true,
// });
