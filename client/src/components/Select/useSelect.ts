import { useEffect, useMemo, useRef, useState } from "react";
import { OptionItem } from "../../types/select";
import { filterOptions } from "../../utils/filterOptions";

export const useSelectLogic = (
  options: OptionItem[],
  onSelect: (o: OptionItem) => void
) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [highlight, setHighlight] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => filterOptions(options, inputValue),
    [options, inputValue]
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const openDropdown = () => setOpen(true);
  const closeDropdown = () => {
    setOpen(false);
    setHighlight(-1);
  };

  const handleSelect = (o: OptionItem) => {
    onSelect(o);
    closeDropdown();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        openDropdown();
      }
      return;
    }

    if (e.key === "Escape" || e.key === "Tab") {
      closeDropdown();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (highlight >= 0 && highlight < filtered.length) {
        handleSelect(filtered[highlight]);
      }
    }
  };

  useEffect(() => {
    if (!open) return;
    if (highlight < 0) return;

    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    const item = dropdown.children[highlight] as HTMLElement;
    if (!item) return;

    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    const viewTop = dropdown.scrollTop;
    const viewBottom = viewTop + dropdown.clientHeight;

    if (itemTop < viewTop) {
      dropdown.scrollTop = itemTop;
    } else if (itemBottom > viewBottom) {
      dropdown.scrollTop = itemBottom - dropdown.clientHeight;
    }
  }, [highlight, open, filtered]);

  return {
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
  };
};
