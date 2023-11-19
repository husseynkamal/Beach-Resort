import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rooms: [],
  sortedRooms: [],
  featuredRooms: [],
  isLoading: true,
  type: "all",
  capacity: 1,
  price: 0,
  minPrice: 0,
  maxPrice: 0,
  minSize: 0,
  maxSize: 0,
  breakfast: false,
  pets: false,
};

const beachSlice = createSlice({
  name: "beach",
  initialState,
  reducers: {
    gatData() {},
    formatData(state, action) {
      let rooms = action.payload;
      let tempItems = rooms.map((room) => {
        let id = room.sys.id;
        let images = room.fields.images.map((image) => image.fields.file.url);
        let roomItems = { ...room.fields, id, images };
        return roomItems;
      });
      state.rooms = tempItems;
      state.sortedRooms = tempItems;
      state.isLoading = false;
    },
    featuredData(state, action) {
      let rooms = action.payload;
      let maxPrice = Math.max(...rooms.map((item) => item.price));
      let maxSize = Math.max(...rooms.map((item) => item.size));

      state.price = maxPrice;
      state.maxPrice = maxPrice;
      state.maxSize = maxSize;

      let featuredArray = rooms.filter((room) => room.featured === true);
      state.featuredRooms = featuredArray;
      state.isLoading = false;
    },
    changeTypeHandler(state, action) {
      const typeValue = action.payload.type;
      const capacityValue = +action.payload.capacity;
      const priceValue = +action.payload.price;
      const minSizeValue = +action.payload.minSize;
      const maxSizeValue = +action.payload.maxSize;
      const breakfastValue = action.payload.breakfast.checked;
      const petsValue = action.payload.pets.checked;

      state.type = typeValue;
      state.capacity = capacityValue;
      state.price = priceValue;
      state.minSize = minSizeValue;
      state.maxSize = maxSizeValue;
      state.breakfast = breakfastValue;
      state.pets = petsValue;

      let { rooms, type, capacity, price, minSize, maxSize } = state;

      let tempRooms = [...rooms];

      // filter by types
      if (type !== "all") {
        tempRooms = rooms.filter((item) => item.type === type);
      }

      // filter by capacity
      if (capacity !== 1) {
        tempRooms = tempRooms.filter((item) => item.capacity >= capacity);
      }

      // filter by pirce
      tempRooms = tempRooms.filter((item) => item.price <= price);

      // filter by size
      tempRooms = tempRooms.filter(
        (item) => item.size >= minSize && item.size <= maxSize
      );

      // filter by breakfast
      if (breakfastValue) {
        tempRooms = tempRooms.filter((item) => item.breakfast === true);
      }

      // filter by pets
      if (petsValue) {
        tempRooms = tempRooms.filter((item) => item.pets === true);
      }
      state.sortedRooms = tempRooms;
    },
  },
});

export const beachActions = beachSlice.actions;

export default beachSlice.reducer;
