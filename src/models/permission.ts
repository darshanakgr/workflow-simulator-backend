/**
 * A module that exports a schema to Permission.
 */

import mongoose from "mongoose";


interface IPermission extends mongoose.Document {
    groupId: string;
    userId: string;
    secretKey: string;
    accessLevel: number;
}

const permissionSchema = new mongoose.Schema({
    groupId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    secretKey: {
        type: String,
        required: true
    },
    accessLevel: {
        type: Number,
        required: true
    }
});

permissionSchema.index({groupId: 1, userId: 1}, { unique: true });

const Permission = mongoose.model<IPermission>("Permission", permissionSchema);


export { Permission, IPermission };

