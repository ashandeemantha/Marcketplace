import React from "react";
import { CiForkAndKnife } from "react-icons/ci";

const FilterProduct = ({category,onClick}) => {
  return (
    <div onClick={onClick}>
      <div className="text-3xl p-5 bg-green-400  hover:bg-yellow-400 rounded-full cursor-pointer">
        <CiForkAndKnife />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;