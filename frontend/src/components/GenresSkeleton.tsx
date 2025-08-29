import {
  Box,
  Heading,
  HStack,
  List,
  ListItem,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";

const Genreskeleton = () => {
  const skeletonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <>
      <Heading fontSize={"2xl"} marginBottom={3}>
        Genres
      </Heading>
      <List>
        {skeletonArray.map((skeleton) => (
          <ListItem key={skeleton} marginY={5}>
            <HStack>
              <Skeleton
                height={"20px"}
                width={"100px"}
                borderRadius={"10%"}
                marginBottom={2.5}
              >
                <SkeletonText></SkeletonText>
              </Skeleton>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Genreskeleton;
