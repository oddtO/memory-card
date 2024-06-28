import { useEffect, useState } from "react";
export type Preloader = {
  totalBytesToLoad: number;
  bytesLoaded: number;
  isFullBytesKnown: boolean;
  assetUrls: string[];
  isError: boolean;
  isLoaded: () => boolean;
};

function isLoaded(this: Preloader) {
  return this.isFullBytesKnown && this.bytesLoaded == this.totalBytesToLoad;
}
export function usePreload(assets: string[]): Preloader {
  const [totalBytesToLoad, setTotalBytesToLoad] = useState(0);
  const [isFullBytesKnown, setIsFullBytesKnown] = useState(false);
  const [bytesLoaded, setBytesLoaded] = useState(0);
  const [assetUrls, setAssetUrls] = useState<string[]>(
    new Array(assets.length),
  );
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const progressForDiffAssets = new Array(assets.length).fill(0);
    let assetSizeAddedCount = 0;
    const xhrs = assets.map((asset, index) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", asset, true);

      xhr.responseType = "blob";
      xhr.send();
      let isTotalAdded = false;
      xhr.onprogress = (event) => {
        if (!event.lengthComputable) return;
        if (!isTotalAdded) {
          if (++assetSizeAddedCount === assets.length)
            setIsFullBytesKnown(true);

          isTotalAdded = true;
          setTotalBytesToLoad((prev) => prev + event.total);
        }

        const loadedOnThisIteration =
          event.loaded - progressForDiffAssets[index];
        setBytesLoaded((prev) => prev + loadedOnThisIteration);
        progressForDiffAssets[index] = event.loaded;
      };

      xhr.onload = () => {
        const imgUrl = URL.createObjectURL(xhr.response);
        setAssetUrls((assetUrls) => {
          assetUrls[index] = imgUrl;
          return [...assetUrls];
        });
      };

      xhr.onerror = () => {
        setIsError(true);
      };
      return xhr;
    });

    return () =>
      xhrs.forEach((xhr) => {
        xhr.abort();
      });
  }, [assets]);

  return {
    isFullBytesKnown,
    totalBytesToLoad,
    bytesLoaded,
    assetUrls,
    isError,
    isLoaded,
  };
}
