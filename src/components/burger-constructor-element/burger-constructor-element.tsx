import {
  constructorDel,
  constructorMoveDown,
  constructorMoveUp
} from '../../services/slices/constructorSlice';
import { BurgerConstructorElementProps } from './type';
import { BurgerConstructorElementUI } from '@ui';
import { FC, memo } from 'react';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(constructorMoveDown(ingredient));
    };

    const handleMoveUp = () => {
      dispatch(constructorMoveUp(ingredient));
    };

    const handleClose = () => {
      dispatch(constructorDel(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
