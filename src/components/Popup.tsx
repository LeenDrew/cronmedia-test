import React, { useRef, useEffect, useCallback, useState } from 'react';

type PopupProps = {
  closeHandler: () => void;
};

export default function Popup({ closeHandler }: PopupProps): React.ReactElement | null {
  useEffect(() => {
    document.body.classList.add('scrolled');
    return () => document.body.classList.remove('scrolled');
  }, []);

  const popupHeaderRef = useRef<HTMLDivElement>(null);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState<boolean>(false);

  const scrollHandler = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (
        popupHeaderRef.current &&
        e.currentTarget.scrollTop >= popupHeaderRef.current.offsetHeight
      ) {
        setIsHeaderScrolled(true);
      } else {
        setIsHeaderScrolled(false);
      }
    },
    [popupHeaderRef],
  );

  const popupContentRef = useRef<HTMLDivElement>(null);

  const popupContentHandler = useCallback(
    (e: Event) => {
      if (popupContentRef.current && !popupContentRef.current.contains(e.target as Node)) {
        closeHandler();
      }
    },
    [closeHandler],
  );

  useEffect(() => {
    document.addEventListener('click', popupContentHandler);
    return () => document.removeEventListener('click', popupContentHandler);
  }, [popupContentHandler]);

  return (
    <div className="popup" onScroll={(e) => scrollHandler(e)}>
      <div className="popup__container">
        <div className="popup__content content" ref={popupContentRef}>
          <div
            className={`content__header header ${isHeaderScrolled ? 'scrolled' : ''}`}
            ref={popupHeaderRef}
          >
            <h2 className="h1 header__title">Обработка данных</h2>
            <button
              className="header__close _icon-close"
              type="button"
              aria-label="Закрыть окно"
              onClick={closeHandler}
            />
          </div>
          <div className="content__body body">
            <h2 className="text body__title">
              1. Что регулирует настоящая политика конфиденциальности
            </h2>
            <p className="text--popup body__text">
              Настоящая политика конфиденциальности (далее — Политика) действует в отношении всей
              информации, включая персональные данные в понимании применимого законодательства
              (далее — «Персональная информация»), которую ООО «Гросс маркет» и/или его
              аффилированные лица, в том числе входящие в одну группу с ООО «Гросс маркет» (далее —
              «Гросс маркет»), могут получить о Вас в процессе использования Вами любых сайтов,
              программ, продуктов и/или сервисов Гросс маркет (далее вместе «Сервисы»), информацию о
              которых Гросс маркет может также получать Персональную информацию от своих партнеров
              (далее — «Партнеры»), сайты, программы, продукты или сервисы которых Вы используете
              (например, от рекламодателей Гросс маркет или службами такси). В таких случаях
              передача Персональной информации возможна только в случаях, установленных применимым
              законодательством, и осуществляется на основании специальных договоров между Гросс
              маркет и каждым из Партнеров.
            </p>
            <p className="text--popup body__text body__text--disabled">
              Пожалуйста, обратите внимание, что использование любого из Сайтов и/или Сервисов может
              регулироваться дополнительными условиями, которые могут вносить в настоящую Политику
              изменения и/или дополнения, и/или иметь специальные условия в отношении персональной
              информации, размещенные в соответствующих разделах документов для таких Сайтов /или
              Сервисов.
            </p>
            <h2 className="text body__title">2. Кто обрабатывает информацию</h2>
            <p className="text--popup body__text">
              Для обеспечения использования Вами Сайтов и Сервисов Ваша Персональная информация
              собирается и используется Яндексом, в том числе включая общество с ограниченной
              ответственностью «Гросс маркет», юридическое лицо, созданное по законодательству
              Российской Федерации и зарегистрированное по адресу: 123351, Россия, Москва, ул.
              Гроссова, д. 12 (ООО «Гросс маркет»), или его аффилированным лицом, предоставляющим
              соответствующий Сервис в иных юрисдикциях. С информацией о том, какое лицо
              предоставляет тот или иной Сервис, Вы можете ознакомиться в условиях использования
              соответствующего Сервиса.
            </p>
            <h2 className="text body__title">3. Какова цель данной Политики</h2>
            <p className="text--popup body__text">
              Защита Вашей Персональной информации и Вашей конфиденциальности чрезвычайно важны для
              Гросс маркета. Поэтому при использовании Вами Сайтов и Сервисов Гросс маркет защищает
              и обрабатывает Вашу Персональную информацию в строгом соответствии с применимым
              законодательством.
            </p>
            <h2 className="text body__title">
              4. Какую Персональную информацию о Вас собирает Гросс маркет
            </h2>

            <p className="text--popup body__text">
              Для обеспечения использования Вами Сайтов и Сервисов Ваша Персональная информация
              собирается и используется Яндексом, в том числе включая общество с ограниченной
              ответственностью «Гросс маркет», юридическое лицо, созданное по законодательству
              Российской Федерации и зарегистрированное по адресу: 123351, Россия, Москва, ул.
              Гроссова, д. 12 (ООО «Гросс маркет»), или его аффилированным лицом, предоставляющим
              соответствующий Сервис в иных юрисдикциях. С информацией о том, какое лицо
              предоставляет тот или иной Сервис, Вы можете ознакомиться в условиях использования
              соответствующего Сервиса.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
