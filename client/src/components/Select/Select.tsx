import React, { useEffect } from "react";
import "./Select.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  loadOptions,
  sendOption,
  setSelectedValue,
  clearError,
  clearMessage,
} from "../../store/selectSlice";
import { Dropdown } from "./components/Dropdown";
import { useSelectLogic } from "./useSelect";
import { Button } from "../Button/Button";

export const Select = () => {
  const dispatch = useAppDispatch();
  const { options, selectedValue, error, message } = useAppSelector(
    (s) => s.select
  );

  useEffect(() => {
    dispatch(loadOptions());
  }, []);

  //Не знал. нужен ли сброс оповещений
  useEffect(() => {
    if (!error && !message) return;

    const t = setTimeout(() => {
      if (error) dispatch(clearError());
      if (message) dispatch(clearMessage());
    }, 3000);

    return () => clearTimeout(t);
  }, [error, message]);

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.blur();
    if (selectedValue) {
      dispatch(sendOption(selectedValue));
    }
  };

  const {
    open,
    inputValue,
    setInputValue,
    highlight,
    filtered,
    wrapperRef,
    dropdownRef,
    onKey,
    openDropdown,
    closeDropdown,
    handleSelect,
  } = useSelectLogic(options, (o) => {
    dispatch(setSelectedValue(o.value));
    setInputValue(o.name);
  });

  return (
    <div className="select-block">
      <div className="select-row">
        <div
          className="wrapper"
          ref={wrapperRef}
          tabIndex={0}
          onKeyDown={onKey}
        >
          <div
            className={`main-input ${open ? "active" : ""}`}
            onClick={() => (open ? closeDropdown() : openDropdown())}
          >
            <input
              className="input"
              value={inputValue}
              placeholder="Выберите…"
              onChange={(e) => {
                setInputValue(e.target.value);
                openDropdown();
              }}
            />

            {inputValue && (
              <button
                className="btn-clear"
                onClick={(e) => {
                  e.stopPropagation();
                  setInputValue("");
                }}
              >
                ✕
              </button>
            )}

            <button
              className="btn-arrow"
              onClick={(e) => {
                e.stopPropagation();
                open ? closeDropdown() : openDropdown();
              }}
            >
              ▼
            </button>
          </div>

          {open && (
            <Dropdown
              options={filtered}
              selectedValue={selectedValue}
              highlight={highlight}
              dropdownRef={dropdownRef}
              onSelect={handleSelect}
            />
          )}
        </div>

        <Button
          label="Отправить"
          // disabled={!selectedValue}
          onClick={handleSubmit}
        />
      </div>
      {error && <div className="select-error">{error}</div>}
      {message && <div className="select-message">{message}</div>}
    </div>
  );
};

export default Select;
