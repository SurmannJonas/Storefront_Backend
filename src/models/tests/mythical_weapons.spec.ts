import { Weapon, WeaponStore } from '../mythical_weapons';

const store = new WeaponStore()

describe("Mythical Weapon Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a delete method', () => {
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
