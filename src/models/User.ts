import mongoose, { InferSchemaType, ObjectId } from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true , unique: true},
        password: {type: String, required: true},
        role: {type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER'
        }
    }
)

const User = mongoose.model('Users', UserSchema);
export type UserType = InferSchemaType<typeof UserSchema>;
export type UserTypeWithId = InferSchemaType<typeof UserSchema> & {_id: ObjectId};
export type UserTypePartial = Partial<UserType>;
export type UserTypePartialWithId = Partial<UserType> & {_id: ObjectId};
export default User;