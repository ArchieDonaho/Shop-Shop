import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';

function CategoryMenu() {
  // retrieve the current state & the update method to update state
  const [state, dispatch] = useStoreContext();
  // destructure the categories form state
  const { categories } = state;
  // obtain the category data
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  // once we get the query data back...
  useEffect(() => {
    // if categoryData exists or ahs changed form the response query, then run dispatch()
    if (categoryData) {
      // execute dispatch function with our action object indicating the type of action & the data to set our state for categories to be
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
    }
  }, [categoryData, dispatch]);

  // when a category is selected, use it to update the category using dispatch
  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
