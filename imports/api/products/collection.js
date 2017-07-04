import {
    Mongo
} from 'meteor/mongo';
export const Products = new Mongo.Collection('products');

//Make it all for only Admin can perform insert, update, remove
Products.allow({
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
