import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
  

function ImageGallery({photosData}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);


  const photos=photosData.map((data,index)=>{
      if(index%3===0){
          let obj={};
            obj.src= data.image;
            obj.width= 4;
            obj.height= 3;
            return obj;
      }
      else if(index%5===0){
        let obj={};
          obj.src= data.image;
          obj.width= 1;
          obj.height= 1;
          return obj;
    }
        let obj={};
          obj.src= data.image;
          obj.width= 3;
          obj.height= 4;
          return obj;
  })

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <div>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}

export default ImageGallery;