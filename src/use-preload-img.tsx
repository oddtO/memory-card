import { useEffect, useState } from "react";
export function usePreloadImg(images: string[]) {
  const [totalBytesToLoad, setTotalBytesToLoad] = useState(0);
  const [isFullBytesKnown, setIsFullBytesKnown] = useState(false);
  const [bytesLoaded, setBytesLoaded] = useState(0);
  const [imgUrls, setImgUrls] = useState<string[]>(new Array(images.length));

  console.log(`${bytesLoaded}/${isFullBytesKnown ? totalBytesToLoad : "???"}`);
  useEffect(() => {
    const progressForDiffImages = new Array(images.length).fill(0);
    let imageSizeAddedCount = 0;
    const xhrs = images.map((image, index) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", image, true);

      xhr.responseType = "blob";
      xhr.send();
      let isTotalAdded = false;
      xhr.onprogress = (event) => {
        if (!event.lengthComputable) return;
        if (!isTotalAdded) {
          if (++imageSizeAddedCount === images.length)
            setIsFullBytesKnown(true);
          isTotalAdded = true;
          setTotalBytesToLoad((prev) => prev + event.total);
        }

        const loadedOnThisIteration =
          event.loaded - progressForDiffImages[index];
        setBytesLoaded((prev) => prev + loadedOnThisIteration);
        progressForDiffImages[index] = event.loaded;
      };

      xhr.onload = () => {
        const imgUrl = URL.createObjectURL(xhr.response);
        setImgUrls((imgUrls) => {
          imgUrls[index] = imgUrl;
          return [...imgUrls];
        });
      };
      return xhr;
    });

    return () =>
      xhrs.forEach((xhr) => {
        xhr.abort();
      });
  }, [images]);

  return {
    isFullBytesKnown,
    totalBytesToLoad,
    bytesLoaded,
    imgUrls,
  };
}
