import { Document, model, models, Schema } from "mongoose";

export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location?: string;
    createdAt: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price: string;
    isFree: boolean;
    url?: string;
    category: { _id: string; name: string };
    organizer: { _id: string; firstName: string; lastName: string };
}

const EventSchema = new Schema<IEvent>({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: false,
    },

    location: {
        type: String,
        required: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    imageUrl: {
        type: String,
        required: true,
    },

    startDateTime: {
        type: Date,
        default: Date.now,
    },

    endDateTime: {
        type: Date,
        default: Date.now,
    },

    price: {
        type: String,
        required: false,
    },

    isFree: {
        type: Boolean,
        default: false,
    },

    url: {
        type: String,
        required: false,
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },

    organizer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

// Ensure the model is created only once
const Event = models.Event || model<IEvent>("Event", EventSchema);

export default Event;
