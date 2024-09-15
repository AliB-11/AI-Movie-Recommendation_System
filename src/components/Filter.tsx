import { BsChevronDown } from "react-icons/bs";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export interface Order {
  value: string;
  label: string;
}

interface Props {
  setOrder: (order: Order) => void;
  newOrder: Order | null;
}

const Filter = ({ setOrder, newOrder }: Props) => {
  const filter = [
    { value: "", label: "Recently Popular" },
    { value: "revenue.desc", label: "Blockbuster" },
    { value: "vote_count.desc", label: "Top-rated" },
  ];

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Filter by: {newOrder?.label || "Recently Popular"}
      </MenuButton>
      <MenuList>
        {filter.map((order) => (
          <MenuItem key={order.value} onClick={() => setOrder(order)}>
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Filter;
