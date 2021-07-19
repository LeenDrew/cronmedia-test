import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';

type image = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  // eslint-disable-next-line camelcase
  download_url: string;
};

export default function Instagram(): React.ReactElement {
  const [imageList, setImageList] = useState<image[]>([]);
  const [numberToShow, setNumberToShow] = useState<number>(4);
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

  const fetchImages: (limit: number) => void = async (limit) => {
    try {
      const responce = await axios.get('https://picsum.photos/v2/list', {
        params: {
          page: 1,
          limit,
        },
      });
      setImageList([...imageList, ...(responce.data as image[])]);
    } catch (e) {
      throw new Error(e);
    }
  };

  const buttonClickHandler = () => {
    fetchImages(numberToShow);
  };

  useEffect(() => {
    fetchImages(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="page__content instagram">
      <div className="instagram__container container">
        <h2 className="instagram__title h2">мы в инстаграме</h2>
        <div className="instagram__grid grid">
          {imageList.map((item) => (
            <article key={item.id} className="grid__item">
              <img src={item.download_url} alt={item.author} />
            </article>
          ))}
        </div>
        <button className="instagram__button text" type="button" onClick={buttonClickHandler}>
          показать ещё
        </button>
      </div>
    </section>
  );
}
