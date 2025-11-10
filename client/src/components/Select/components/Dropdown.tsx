import React from "react";
import { OptionItem } from "../../../types/select";
import { Option } from "./Option";

type Props = {
  options: OptionItem[];
  selectedValue: string | null;
  highlight: number;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  onSelect: (o: OptionItem) => void;
};

export const Dropdown = ({
  options,
  selectedValue,
  highlight,
  dropdownRef,
  onSelect,
}: Props) => {
  return (
    <div className="dropdown" ref={dropdownRef}>
      {options.length === 0 && (
        <div className="option disabled">Нет совпадений</div>
      )}

      {options.map((o, i) => (
        <Option
          key={o.value}
          option={o}
          isSelected={o.value === selectedValue}
          isHighlight={i === highlight}
          onSelect={() => onSelect(o)}
        />
      ))}
    </div>
  );
};
