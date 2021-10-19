import React, { useEffect, useState } from "react";

const Sidebar = ({ images, forceUpdate, addCircle, drawImage }) => {
  const [img, setImg] = useState();
  const [width, setWidth] = useState("350px");

  const getImages = async () => {
    try {
      const response = await fetch("http://localhost:5001/get", {
        method: "GET",
      });

      const data = await response.json();

      setImg(data);
      console.log(JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const closeHandler = () => {
    if (width === "350px") {
      setWidth("68px");
    } else {
      setWidth("350px");
    }
  };

  const drawImg = (img, id) => {
    images.push({
      content: img,
      id,
    });

    forceUpdate();
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="sidebar" style={{ width: width }}>
      {width === "350px" ? (
        <>
          {" "}
          <div className="btn-container">
            <button className="btn" onClick={addCircle}>
              Circle
            </button>

            <button className="btn" onClick={drawImage}>
              <i className="fa fa-cloud-upload" aria-hidden="true"></i>
              Uploads
            </button>

            <i
              className="fa fa-chevron-circle-left close-btn"
              aria-hidden="true"
              onClick={closeHandler}
            ></i>
          </div>
          {img ? (
            <div className="img-container">
              {img.map((ele, index) => {
                return (
                  <div key={index}>
                    <img
                      src={ele.url}
                      alt={ele.url}
                      onClick={(e) => drawImg(ele.url, ele._id)}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}{" "}
        </>
      ) : (
        <i
          className="fa fa-chevron-circle-right open-btn"
          aria-hidden="true"
          onClick={closeHandler}
        ></i>
      )}
    </div>
  );
};

export default Sidebar;
