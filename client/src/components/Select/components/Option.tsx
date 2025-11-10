import React from "react";
import { OptionItem } from "../../../types/select";

type Props = {
  option: OptionItem;
  isSelected: boolean;
  isHighlight: boolean;
  onSelect: () => void;
};

export const Option = ({ option, isSelected, isHighlight, onSelect }: Props) => {
  return (
    <div
      className={
        "option " +
        (isSelected ? "selected " : "") +
        (isHighlight ? "highlight " : "")
      }
      onClick={onSelect}
    >
      {option.name}
    </div>
  );
};
