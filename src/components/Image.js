import React from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

const Img = ({ onSelect, onChange, imageUrl }) => {

  const [image] = useImage(imageUrl);

  return (
    <>
      <Image
        onClick={onSelect}
        image={image}
        draggable
        onDragEnd={(e) => {
          onChange({
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
      />
    </>
  );
};
export default Img;
