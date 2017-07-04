import {
    Mongo
} from 'meteor/mongo';
export const Sellers = new Mongo.Collection('sellers');

//Make it all for only Admin can perform insert, update, remove
Sellers.allow({
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
