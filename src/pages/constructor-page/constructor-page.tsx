import { BurgerConstructor } from '../../components';
import { BurgerIngredients } from '../../components';
import { FC } from 'react';
import { Preloader } from '../../components/ui';
import { selectors } from '@selectors';
import { useSelector } from '../../services/store';
import styles from './constructor-page.module.css';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(selectors.ingredients.getIsLoading);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
