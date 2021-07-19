import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';

type Image = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export default function Instagram(): React.ReactElement {
  const [imageList, setImageList] = useState<Image[]>([]);
  const [numberToShow, setNumberToShow] = useState<number>(4);
  const [startNumber, setStartNumber] = useState<number>(0);
  const query = window.matchMedia('(max-width: 1000px)');

  const queryHandler = useCallback(() => {
    if (query.matches) {
      setNumberToShow(3);
    } else {
      setNumberToShow(4);
    }
  }, [query.matches]);

  useEffect(() => {
    query.addEventListener('change', queryHandler);
    return () => query.removeEventListener('change', queryHandler);
  }, [queryHandler, query]);

  const fetchImages: (limit?: number) => void = async (limit = 5) => {
    try {
      const responce = await axios.get('https://jsonplaceholder.typicode.com/photos', {
        params: {
          _start: startNumber,
          _limit: limit,
        },
      });
      setImageList([...imageList, ...(responce.data as Image[])]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      setStartNumber(responce.data[responce.data.length - 1].id);
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="page__content instagram">
      <div className="instagram__container container">
        <h2 className="instagram__title h2">мы в инстаграме</h2>
        <div className="instagram__grid grid">
          {imageList.map((item) => (
            <article key={item.id} className="grid__item">
              <img src={item.url} alt={item.title} />
            </article>
          ))}
        </div>
        <button
          className="instagram__button text"
          type="button"
          onClick={() => fetchImages(numberToShow)}
        >
          показать ещё
        </button>
      </div>
    </section>
  );
}
