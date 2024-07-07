import { CartState, ProductShortInfo, Product } from "../../src/common/types";

export const fakeProducts: ProductShortInfo[] = [
  {
    id: 0,
    name: "Awesome kogtetochka",
    price: 15
  },
  {
    id: 1,
    name: "Handcrafted kogtetochka",
    price: 332
  },
  {
    id: 2,
    name: "Elegant kogtetochka",
    price: 875
  },
  {
    id: 3,
    name: "Bespoke kogtetochka",
    price: 398
  },
  {
    id: 4,
    name: "Practical kogtetochka",
    price: 627
  },
  {
    id: 5,
    name: "Recycled kogtetochka",
    price: 62
  },
  {
    id: 6,
    name: "Unbranded kogtetochka",
    price: 640
  },
  {
    id: 7,
    name: "Handcrafted kogtetochka",
    price: 416
  },
  {
    id: 8,
    name: "Rustic kogtetochka",
    price: 917
  },
  {
    id: 9,
    name: "Recycled kogtetochka",
    price: 750
  },
  {
    id: 10,
    name: "Licensed kogtetochka",
    price: 181
  },
  {
    id: 11,
    name: "Elegant kogtetochka",
    price: 957
  },
  {
    id: 12,
    name: "Intelligent kogtetochka",
    price: 510
  },
  {
    id: 13,
    name: "Elegant kogtetochka",
    price: 487
  },
  {
    id: 14,
    name: "Ergonomic kogtetochka",
    price: 785
  },
  {
    id: 15,
    name: "Practical kogtetochka",
    price: 825
  },
  {
    id: 16,
    name: "Sleek kogtetochka",
    price: 792
  },
  {
    id: 17,
    name: "Awesome kogtetochka",
    price: 807
  },
  {
    id: 18,
    name: "Ergonomic kogtetochka",
    price: 721
  },
  {
    id: 19,
    name: "Rustic kogtetochka",
    price: 78
  },
  {
    id: 20,
    name: "Refined kogtetochka",
    price: 433
  },
  {
    id: 21,
    name: "Luxurious kogtetochka",
    price: 732
  },
  {
    id: 22,
    name: "Licensed kogtetochka",
    price: 324
  },
  {
    id: 23,
    name: "Gorgeous kogtetochka",
    price: 318
  },
  {
    id: 24,
    name: "Handmade kogtetochka",
    price: 300
  },
  {
    id: 25,
    name: "Licensed kogtetochka",
    price: 325
  },
  {
    id: 26,
    name: "Electronic kogtetochka",
    price: 157
  }
];

export const fakeCart: CartState = {
  0: {
    name: "Awesome kogtetochka",
    price: 15,
    count: 1
  },
  1: {
    name: "Handcrafted kogtetochka",
    price: 332,
    count: 2
  }
}

export const fakeDetails: Record<number, Product> = {
  0: {
    id: 0,
    name: "Awesome kogtetochka",
    price: 15,
    description: "Really Tasty kogtetochka for Devon Rex",
    material: "Rubber",
    color: "orchid"
  }
}