import React, { useState } from 'react';
import Form from '../components/Form';

export default function Request(): React.ReactElement {
  const phoneNumber = '+7 (926) 433-14-16';

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  return (
    <main className="page">
      <div className="page__content request">
        <div className="request__container container">
          <h1 className="request__title h1">
            {!isFormSubmitted && 'Работа твоей мечты'}
            {isFormSubmitted && 'Ждем тебя!'}
          </h1>
          <div className="request__content content">
            {isFormSubmitted && (
              <div className="content__item come-back">
                <p className="come-back__text text">
                  В 2020 году самыми востребованными умениями и качествами на рынке труда станут:
                </p>
                <p className="come-back__text come-back__text--decoration text--caption">
                  Умение ставить цели, планировать свое время, инициативность, настойчивость,
                  высокая мотивация, умение эффективно общаться, любознательность.
                </p>
                <p className="come-back__text text">
                  А профессиональным навыкам можно научить любого человека.
                </p>
              </div>
            )}
            {!isFormSubmitted && <Form />}
            <div className="content__item info">
              <span className="info__title h2">
                {!isFormSubmitted && 'Наша суперцель'}
                {isFormSubmitted && 'Остались вопросы?'}
              </span>
              {!isFormSubmitted && (
                <>
                  <p className="info__text text">
                    — стать любимым магазином для каждой российской семьи.
                  </p>
                  <p className="info__text text">
                    Сотни тысяч наших сотрудников ежедневно работают над её достижением.
                  </p>
                  <p className="info__text text">
                    Мы уверены, что в ближайшие годы достигнем этого и будет здорово, если вместе с
                    тобой.
                  </p>
                </>
              )}
              <a
                className="info__phone h3 text-center"
                href={`tel:${phoneNumber.replace(/[- )(]/g, '')}`}
              >
                {phoneNumber}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
