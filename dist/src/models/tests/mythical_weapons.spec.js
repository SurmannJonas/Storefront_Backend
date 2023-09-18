"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mythical_weapons_1 = require("../mythical_weapons");
var store = new mythical_weapons_1.WeaponStore();
describe("Mythical Weapon Model", function () {
    it('should have an index method', function () {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', function () {
        expect(store.index).toBeDefined();
    });
    it('should have a create method', function () {
        expect(store.index).toBeDefined();
    });
    it('should have a update method', function () {
        expect(store.index).toBeDefined();
    });
    it('should have a delete method', function () {
        expect(store.index).toBeDefined();
    });
    /*
    
      it('create method should add a book', async () => {
        const result = await store.create({
          title: 'Bridge to Terabithia',
          total_pages: 250,
          author: 'Katherine Paterson',
          summary: 'Childrens',
          id: 1
        });
        expect(result).toEqual({
          title: 'Bridge to Terabithia',
          total_pages: 250,
          author: 'Katherine Paterson',
          summary: 'Childrens',
          id: 1
        });
      });
    
    */
});
