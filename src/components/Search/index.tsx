import { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { GrClose } from "react-icons/gr";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/filter/slice";

const Search: FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null); // обращаюсь к ссылке - дом элементов

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    // if (inputRef.current) {
    //   inputRef.current.focus();
    // }

    //с помощью оператора (?) опциональной последовательности
    inputRef.current?.focus();
  };
  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 250),
    []
  );
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 32 32"
        id="Filled_Line"
        version="1.1"
        viewBox="0 0 32 32"
      >
        <circle cx="14" cy="14" fill="#F9ED69" id="XMLID_904_" r="9" />
        <path
          d="M16,22c-4.971,0-9-4.029-9-9c0-3.111,1.578-5.852,3.977-7.469C7.496,6.774,5,10.091,5,14  c0,4.971,4.029,9,9,9c1.86,0,3.588-0.565,5.023-1.531C18.077,21.806,17.062,22,16,22z"
          fill="#BBB24F"
          id="XMLID_410_"
        />
        <path
          d="M14,5c-2.996,0-5.643,1.47-7.279,3.721C8.205,7.643,10.025,7,12,7c4.971,0,9,4.029,9,9  c0,1.975-0.643,3.795-1.721,5.279C21.53,19.643,23,16.996,23,14C23,9.029,18.971,5,14,5z"
          fill="#FBF4A5"
          id="XMLID_411_"
        />
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_899_"
          r="9"
          stroke="#200F60"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <path
          d="  M15.996,8.341c1.702,0.602,3.054,1.952,3.659,3.653"
          fill="none"
          id="XMLID_417_"
          stroke="#FFFFFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_898_"
          stroke="#200F60"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && <GrClose onClick={onClickClear} className={styles.clearIcon} />}
    </div>
  );
};
export default Search;
