import React, { useCallback, useState } from 'react';
import logo from '../assets/img/logo.svg';
import Logo from './Logo';
import Popup from './Popup';

export default function Footer(): React.ReactElement {
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const dataPolicyClickHanler = () => setIsPopupVisible(true);
  const closePopup = useCallback(() => setIsPopupVisible(false), []);

  const sharingFbHandler = () => {
    window.location.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      process.env.PUBLIC_URL,
    )}`;
  };
  const sharingVkHandler = () => {
    window.location.href = `https://vk.com/share.php?url=${process.env.PUBLIC_URL}`;
  };

  return (
    <footer className="footer">
      <div className="footer__container container">
        <div className="footer__main sharing">
          <Logo logoUrl={logo} title="гросс маркет" />
          <h2 className="h2 sharing__title">поделиться</h2>
          <div className="sharing__icons">
            <button
              className="icon _icon-fb"
              type="button"
              aria-label="Поделиться в Facebook"
              onClick={sharingFbHandler}
            />
            <button
              className="icon _icon-vk"
              type="button"
              aria-label="Поделиться во Вконтакте"
              onClick={sharingVkHandler}
            />
          </div>
        </div>
        <div className="footer__info info">
          <span className="info__copyright text--caption text-center">
            &copy; Гросс маркет 2020
          </span>
          <button
            type="button"
            className="info__data-policy text--caption"
            onClick={dataPolicyClickHanler}
          >
            Политика обработки персональных данных
          </button>
        </div>
      </div>
      {isPopupVisible && <Popup closeHandler={closePopup} />}
    </footer>
  );
}
