import {
    Mongo
} from 'meteor/mongo';
export const CardObjects = new Mongo.Collection('cardObjects');

//Make it all for only Admin can perform insert, update, remove
CardObjects.allow({
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
