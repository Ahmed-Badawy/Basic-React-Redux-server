import TestedClass from "../TestedClass";

const tested_class_obj = new TestedClass();

describe("TestedClass", ()=>{
    test("Get Array One", ()=>{
        expect(tested_class_obj.getOne()).toEqual([1,2,3]);
    });
    test("Get Array Two", ()=>{
        expect(tested_class_obj.getTwo()).toEqual([2,4,6]);
    })
});


const myBeverage = {
    delicious: true,
    sour: false,
  };
  
  describe('my beverage', () => {
    test('is delicious', () => {
      expect(myBeverage.delicious).toBeTruthy();
    });
  
    test('is not sour', () => {
      expect(myBeverage.sour).toBeFalsy();
    });
  });