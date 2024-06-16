import { useState, useEffect } from "react";
import type { url } from "./pokemon";
import { base } from "./pokemon";

export function usePokemonNames(names: readonly string[]) {
  const [imgUrls, setImgUrls] = useState<url[]>([]);
  useEffect(() => {
    if (names.length == 0) return;
    const namePromises = names.map((name) => {
      return fetch(base + name)
        .then((response) => {
          return response.json();
        })
        .then((data): url => {
          return data.sprites.other.home.front_default;
        });
    });
    Promise.all(namePromises).then((urls) => {
      setImgUrls(urls);
    });
  }, [names]);

  return imgUrls;
}
