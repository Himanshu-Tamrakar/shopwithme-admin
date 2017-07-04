import {
    Mongo
} from 'meteor/mongo';
export const Images = new Mongo.Collection('images');

//Make it all for only Admin can perform insert, update, remove
Images.allow({
    insert(userId, party) {
        return true;
    },
    update(userId, party, field, modifier) {
        return true;
    },
    remove(userId, party) {
        return true;
    }
})
