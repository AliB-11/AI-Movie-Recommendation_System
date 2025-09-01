import { BsChevronDown } from "react-icons/bs";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useMovieQueryStore from "../store";

export interface Order {
  value: string;
  label: string;
}

const Filter = () => {
  const { setSortOrder } = useMovieQueryStore();
  const movieQuery = useMovieQueryStore((s) => s.movieQuery);
  const filter = [
    { value: "popularity.desc", label: "Recently Popular" },
    { value: "revenue.desc", label: "Blockbuster" },
    { value: "vote_count.desc", label: "Top-rated" },
  ];

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BsChevronDown />}
        fontSize={{ base: 14, md: 16 }}
      >
        Filter by: {movieQuery.filter?.label || "Recently Popular"}
      </MenuButton>
      <MenuList>
        {filter.map((order) => (
          <MenuItem key={order.value} onClick={() => setSortOrder(order)}>
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Filter;
