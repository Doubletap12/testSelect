import { OptionItem } from "../types/select";

export const filterOptions = (options: OptionItem[], query: string) =>
  options.filter((o) =>
    o.name.toLowerCase().startsWith(query.toLowerCase())
  );
