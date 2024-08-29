import mongoose, { Document, Model } from 'mongoose';
import { Password } from '../utils/api-utils/password';

interface UserAttrs {
  email: string;
  password: string;
}

export interface UserDoc extends Document {
  email: string;
  password: string;
}

 interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema<UserDoc>(
    {
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      toJSON: {
        transform(doc, ret) {
          ret.id = ret._id.toString(); // Ensure _id is converted to string
          delete ret._id;
          delete ret.password;
          delete ret.__v;
        },
      },
    }
);

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const newHashedPassword = await Password.toHash(this.get('password'));
        this.set('password', newHashedPassword);
    }
    done();
});


userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
