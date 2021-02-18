/* 
* Andres Cajamarca - 2020
* I decided to wrote a couple of integration tests in order to assure
* quality in the data that will be send to the front
*/

import { server } from '../index';
import 'regenerator-runtime/runtime.js'; // Crucial import to mock async functions in test env

import request from 'supertest';

import chai from 'chai';
const assert = chai.assert;

const query = 'apple ipad';
const id = 'MLA865350814'; // Real item in db

describe('Meli search API', () => {
    describe('do search of user input', () => {
        it("returns a result from dev's db given a query", () => {
            request(server)
            .get(`/api/items`)
            .query({ q: encodeURIComponent(query) })
            .expect(200)
            .end((err, res) => {
                if(err) console.log(err);
                const body = res.body;
                assert.exists(body.author, 'author is neither null nor undefined');
                assert.isObject(body.author, 'custom signature for search action');
                assert.exists(body.categories, 'categories as a result of search');
                assert.isArray(body.categories, 'categories is an array of results for a given query');
                assert.exists(body.items, 'items is neither null nor undefined');
                assert.isArray(body.items, 'items is an array of results for a given query');
            })
        });
    });
    describe('do specific search of user clicked item', () => {
        it('return extended info about given product', () => {
            request(server)
            .get(`/api/items`)
            .field('id' ,encodeURIComponent(id))
            .expect(200)
            .end((err, res) => {
                if (err) console.log(err);
                const body = res.body;
                assert.exists(body.author, 'custom signature for search action');
                assert.isObject(body.author, 'custom signature for search action');
                assert.exists(body.item, 'item is neither null nor undefined');
                assert.isObject(body.item, 'item is an object with specific info');
                assert.exists(body.item.id, 'id of item');
                assert.exists(body.item.title, 'title of item');
                assert.exists(body.item.price, 'price of item');
                assert.isObject(body.item.price, 'price should be an object');
                assert.exists(body.item.picture, 'picture of item');
                assert.exists(body.item.condition, 'condition of item');
                assert.exists(body.item.free_shipping, 'has the item free shipping?');
                assert.exists(body.item.sold_quantity, 'sold_quantity of item');
                assert.exists(body.item.description, 'description of item');
            });
        });
    });
});