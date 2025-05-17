import { BurgerIngredientUI } from '@ui';
import { constructorAdd } from '../../services/slices/constructorSlice';
import { FC, memo } from 'react';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { useLocation } from 'react-router-dom';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      dispatch(constructorAdd(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
