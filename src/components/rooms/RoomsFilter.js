import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { beachActions } from "../store/beachSlice";
import Title from "../UI/Title";

import classes from "./RoomsFilter.module.css";

const getUniqueValues = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

const RoomsFilter = () => {
  const typeRef = useRef();
  const capacityRef = useRef();
  const priceRef = useRef();
  const minSizeRef = useRef();
  const maxSizeRef = useRef();
  const breakfastRef = useRef();
  const petsRef = useRef();

  const dispatch = useDispatch();
  const {
    rooms,
    capacity,
    type,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
  } = useSelector((state) => state.dataBeach);

  // get unigue types
  let types = getUniqueValues(rooms, "type");
  // add "all" value
  types = ["all", ...types];

  // insert all options
  const options = types.map((type, index) => {
    return (
      <option key={index} type={type}>
        {type}
      </option>
    );
  });

  // get unique capacities
  let capacities = getUniqueValues(rooms, "capacity");

  // insert all people
  const people = capacities.map((person, index) => {
    return (
      <option key={index} value={person}>
        {person}
      </option>
    );
  });

  const changeParamsHandler = () => {
    dispatch(
      beachActions.changeTypeHandler({
        type: typeRef.current.value,
        capacity: capacityRef.current.value,
        price: priceRef.current.value,
        minSize: minSizeRef.current.value,
        maxSize: maxSizeRef.current.value,
        breakfast: breakfastRef.current,
        pets: petsRef.current,
      })
    );
  };

  return (
    <section className={classes["filter-container"]}>
      <Title title="search rooms by..." />
      <form className={classes["filter-form"]}>
        {/* select type */}
        <div className={classes["form-group"]}>
          <label htmlFor="type">room type</label>
          <select
            ref={typeRef}
            name="type"
            id="type"
            value={type}
            className={classes["form-control"]}
            onChange={changeParamsHandler}
          >
            {options}
          </select>
        </div>
        {/* end of select type */}
        {/* guests */}
        <div className={classes["form-group"]}>
          <label htmlFor="capacity">guests</label>
          <select
            ref={capacityRef}
            name="capacity"
            id="capacity"
            value={capacity}
            className={classes["form-control"]}
            onChange={changeParamsHandler}
          >
            {people}
          </select>
        </div>
        {/* end of guests */}
        {/* room price */}
        <div className={classes["form-group"]}>
          <label htmlFor="price">room price ${price}</label>
          <input
            ref={priceRef}
            name="price"
            type="range"
            id="price"
            value={price}
            min={minPrice}
            max={maxPrice}
            className={classes["form-control"]}
            onChange={changeParamsHandler}
          />
        </div>
        {/* end of room price */}
        {/* size */}
        <div className={classes["form-group"]}>
          <label htmlFor="size">room size</label>
          <div className={classes["size-inputs"]}>
            <input
              ref={minSizeRef}
              name="min-size"
              type="number"
              id="size"
              value={minSize}
              className={classes["size-input"]}
              onChange={changeParamsHandler}
            />
            <input
              ref={maxSizeRef}
              name="max-size"
              type="number"
              id="size"
              value={maxSize}
              className={classes["size-input"]}
              onChange={changeParamsHandler}
            />
          </div>
        </div>
        {/* end of size */}
        {/* extras */}
        {/* breakfast */}
        <div className={classes["form-group"]}>
          <div className={classes["single-extra"]}>
            <input
              ref={breakfastRef}
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={changeParamsHandler}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          {/* end of breakfast */}
          {/* pets */}
          <div className={classes["single-extra"]}>
            <input
              ref={petsRef}
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={changeParamsHandler}
            />
            <label htmlFor="pets">pets</label>
          </div>
          {/* end of pets */}
        </div>
        {/* end of extras */}
      </form>
    </section>
  );
};

export default RoomsFilter;
