import { useEffect } from 'react';

import { type UseMediaQueryCallback } from '../useMediaQuery';
import { type MediaQuery } from '../shared-kernel';

type MediasMap = { [key: MediaQuery]: UseMediaQueryCallback };

/**
 * Simplifies to detect when specified media queries matches
 *
 * @see http://www.kundinos.ru/docs/react-hooks/hooks/use-media-queries
 */
export function useMediaQueries(mediasMap: MediasMap) {
  useEffect(() => {
    const mqls = Object.entries(mediasMap).map(([media, callback]) => {
      const mql = window.matchMedia(media);

      mql.addEventListener('change', callback);

      return mql;
    });

    return () => {
      mqls.forEach((mql) => {
        const callback = mediasMap[mql.media];

        mql.removeEventListener('change', callback);
      });
    };
  }, [mediasMap]);
}
