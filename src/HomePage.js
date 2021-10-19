import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import Circle from "./components/Circle";
import Image from "./components/Image";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import Chat from "./components/Chat"

function HomePage() {
  const [circles, setCircles] = useState([]);
  const [images, setImages] = useState([]);
  const [updateState, setUpdateState] = useState();
  const stageEl = React.createRef();
  const layerEl = React.createRef();
  const fileUploadEl = React.createRef();
  
// =====drawing circle====
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const addCircle = () => {
    const circ = {
      x: getRandomInt(100),
      y: getRandomInt(100),
      width: 100,
      height: 100,
      fill: "red",
      id: `circ${circles.length + 1}`,
    };
    const circs = circles.concat([circ]);
    setCircles(circs);
  };


// ====drawing image====
  const drawImage = () => {
    console.log(fileUploadEl.current);
    fileUploadEl.current.click();
  };

  const forceUpdate = React.useCallback(() => setUpdateState({}), []);

  const fileChange = (ev) => {
    let file = ev.target.files[0];
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const id = uuidv4();
        images.push({
          content: reader.result,
          id,
        });
        setImages(images);
        console.log(images);
        fileUploadEl.current.value = null;
        forceUpdate();
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="parent">
  {/* ======== topbar-container========= */}
      <TopBar/>

      <div className="layout-container">
  {/* ======== sidebar-container========= */}
        <Sidebar
          images={images}
          forceUpdate={forceUpdate}
          addCircle={addCircle}
          drawImage={drawImage}
        />
   {/* ======== homepage-container========= */}
        <div className="homepage-container">
        <Chat />

          <input
            style={{ display: "none" }}
            type="file"
            ref={fileUploadEl}
            onChange={fileChange}
          />

          <Stage
            width={window.innerWidth * 0.7}
            height={window.innerHeight - 150}
            ref={stageEl}
          >

            <Layer ref={layerEl}>
              {circles.map((circle, i) => {
                return (
                  <Circle
                    key={i}
                    shapeProps={circle}
                    onChange={(newAttrs) => {
                      const circs = circles.slice();
                      circs[i] = newAttrs;
                      setCircles(circs);
                    }}
                  />
                );
              })}
    {/* ======== mapping images in layer========= */}
              {images.map((image, i) => {
                return (
                  <Image
                    key={i}
                    imageUrl={image.content}
                    onChange={(newAttrs) => {
                      const imgs = images.slice();
                      imgs[i] = newAttrs;
                    }}
                  />
                );
              })}

            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}
export default HomePage;


