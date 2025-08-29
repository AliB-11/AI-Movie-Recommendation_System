import { Badge, Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

interface Props {
  vote_average: number;
}

const Rating = ({ vote_average }: Props) => {
  const color =
    vote_average > 7 ? "#6dc849" : vote_average > 5 ? "#fdca52" : "#fc4b37";

  const scheme =
    vote_average > 7 ? "green" : vote_average > 5 ? "yellow" : "red";

  return (
    <>
      {vote_average === 0 ? null : (
        <Badge
          variant={"outline"}
          borderRadius={"md"}
          colorScheme={scheme}
          color={color}
          paddingX={"8px"}
          marginTop={"13px"}
          fontSize="14px"
        >
          {vote_average.toFixed(1)}
        </Badge>
      )}
    </>
  );
};

export default Rating;
