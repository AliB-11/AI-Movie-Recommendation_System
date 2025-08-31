import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  setQuery: (query: string) => void;
}

const RecommendSearch = ({ setQuery }: Props) => {
  const [input, setInput] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setQuery(input);
    }
  };
  return (
    <form
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
      onSubmit={handleSubmit}
    >
      <InputGroup width={{ base: "90%", md: "70%" }}>
        <Input
          borderRadius={20}
          placeholder="Ex. Avatar 2009"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <InputLeftElement children={<BsSearch />} />
      </InputGroup>
    </form>
  );
};

export default RecommendSearch;
