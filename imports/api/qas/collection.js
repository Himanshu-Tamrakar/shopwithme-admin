import {
    Mongo
} from 'meteor/mongo';
export const QAS = new Mongo.Collection('qas');

//Make it all for only Admin can perform insert, update, remove
QAS.allow({
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
