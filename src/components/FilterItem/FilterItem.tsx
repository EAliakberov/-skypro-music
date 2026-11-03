import classNames from 'classnames';
import styles from './filteritem.module.css';
import { FilterOption } from '../CenterBlock/CenterBlock';

export type FilterItemProps = {
  name: string;
  list: FilterOption<string>[];
  active?: boolean;
  onToggleOpen?: () => void; // клик по кнопке фильтра
  onSelect?: (id: number) => void; // выбор пункта
};

export default function FilterItem({
  name,
  list = [],
  active = false,
  onToggleOpen,
  onSelect,
}: FilterItemProps) {
  console.log(list);

  return (
    <div className={styles.filter__button}>
      <button
        type="button"
        className={classNames(
          styles.filter__toggle,
          active ? styles.active : ''
        )}
        onClick={onToggleOpen}
      >
        {name}
      </button>

      {active && list.length > 0 && (
        <div className={styles.filterItem__container}>
          <ul className={styles.filter__list}>
            {list.map((item, id) => (
              <li
                key={item.value}
                className={`${styles.filter__li} ${
                  item.selected ? styles.selected : ''
                }`}
                onClick={() => onSelect?.(id)}
              >
                {item.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
