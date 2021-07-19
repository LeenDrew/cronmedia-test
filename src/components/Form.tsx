/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, createRef } from 'react';
import NumberFormat from 'react-number-format';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const DATA = [
  { title: 'водитель', value: 'driver' },
  { title: 'кассир', value: 'cashier' },
  { title: 'пекарь', value: 'baker' },
  { title: 'повар', value: 'cook' },
  { title: 'приемщик', value: 'receiver' },
  { title: 'продавец', value: 'seller' },
  { title: 'товаровед', value: 'commoditySpecialist' },
];
const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const RECAPTCHA_TEST_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

const schema = yup.object().shape({
  vacancy: yup.string().required('поле обязательно для заполнения'),
  name: yup
    .string()
    .required('поле обязательно для заполнения')
    .matches(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/g, 'поле заполнено некорректно'),
  birthday: yup
    .string()
    .required('поле обязательно для заполнения')
    .test('notFull', 'поле заполнено не до конца', (date) => {
      if (!date) return false;
      return date.replace(/[^0-9]/g, '').length === 8;
    })
    .matches(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g,
      'поле заполнено некорректно',
    ),
  sex: yup.string().nullable().notRequired(),
  phone: yup
    .string()
    .required('поле обязательно для заполнения')
    .test('notFull', 'поле заполнено не до конца', (phone) => {
      if (!phone) return false;
      return phone.replace(/[- )(_)]/g, '').length === 12;
    }),
  email: yup.string().notRequired().email('некорректный email'),
  resumeLink: yup
    .string()
    .notRequired()
    .test('notCorrect', 'поле заполнено некорректно', (url) => {
      if (!url) return true;
      return !!url.match(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\\.-]+)+[\w\-\\._~:/?#[\]@!\\$&'\\(\\)\\*\\+,;=.]+$/gm,
      );
    }),
  resumeFile: yup
    .mixed()
    .notRequired()
    .test('type', 'некорректный тип файла', (files: FileList) => {
      if (!files.length) return true;
      return SUPPORTED_FORMATS.includes(files[0].type);
    }),
  recaptcha: yup
    .string()
    .required('поле обязательно для заполнения')
    .nullable()
    .notOneOf([null], 'срок капчи истек'),
  agreement: yup.bool().notOneOf([false], 'поле обязательно для заполнения'),
});

type formDate = {
  vacancy: string;
  name: string;
  birthday: string;
  sex: string | null;
  phone: string;
  email: string;
  resumeLink: string;
  resumeFile: FileList;
  recaptcha: string | null;
  agreement: boolean;
};

export default function Form(): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    getValues,
    control,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: formDate) => {
    data.phone.replace(/[- )(_)]/g, '');
    // POST data
  };

  const recaptchaRef = createRef<ReCAPTCHA>();
  const recapthcaHandler = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.execute();
    }
  };

  const [isFormInputOnFocus, setIsFormInputOnFocus] = useState<boolean>(false);
  const [drag, setDrag] = useState<boolean>(false);
  const dragStartHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDrag(false);
  };
  const dropHandler = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      setValue('resumeFile', e.dataTransfer.files, { shouldValidate: true, shouldDirty: true });
    }
    setDrag(false);
  };
  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length) {
      setValue('resumeFile', e.target.files, { shouldValidate: true, shouldDirty: true });
    }
  };

  return (
    <form className="content__item form" noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="form__item item">
        <div className="item__header header">
          <span className="header__title header__title--required text--caption">Вакансия</span>
          {getValues('vacancy') && <span className="header__ready _icon-check" />}
        </div>
        <label className="item__container">
          <select className="select text" {...register('vacancy')}>
            {DATA.map((item) => (
              <option className="select__option text" value={item.value} key={item.value}>
                {item.title}
              </option>
            ))}
          </select>
          <span className="select__arrow _icon-arrow" />
        </label>
      </div>

      <div className="form__item item">
        <div className="item__header header">
          <span className="header__title header__title--required text--caption">ФИО</span>
          {getValues('name') && !errors?.name && <span className="header__ready _icon-check" />}
        </div>
        <label className="item__container">
          <input
            className={`item__input item__input--name text ${
              errors?.name ? 'item__input--error' : ''
            }`}
            type="text"
            placeholder="Иванов Иван Иванович"
            {...register('name')}
          />
        </label>
        {errors?.name && <span className="item__error text--caption">{errors?.name?.message}</span>}
      </div>

      <div className="form__item form__item--50 item">
        <div className="item__header header">
          <span className="header__title header__title--required text--caption">Дата рождения</span>
          {getValues('birthday') && !errors?.birthday && (
            <span className="header__ready _icon-check" />
          )}
        </div>
        <label className="item__container">
          <NumberFormat
            className={`item__input item__input--birthday text ${
              errors?.birthday ? 'item__input--error' : ''
            }`}
            type="text"
            format="##.##.####"
            mask={['Д', 'Д', 'М', 'М', 'Г', 'Г', 'Г', 'Г']}
            placeholder="28.07.2002"
            {...register('birthday')}
          />
        </label>
        {errors?.birthday && (
          <span className="item__error text--caption">{errors?.birthday?.message}</span>
        )}
      </div>

      <div className="form__item form__item--50 item">
        <div className="item__header header">
          <span className="header__title text--caption">Пол</span>
          {getValues('sex') && !errors?.sex && <span className="header__ready _icon-check" />}
        </div>
        <div
          className={`item__container radio-container ${
            errors?.sex ? ' radio-container--error' : ''
          }`}
        >
          <label className="radio">
            <input className="radio__input" type="radio" value="male" {...register('sex')} />
            <svg className="radio__box" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle className="radio__circle-outline" cx="12" cy="12" r="12" />
              <circle className="radio__circle-inline" cx="12" cy="12" r="5" />
            </svg>
            <span className="radio__title text--caption">мужской</span>
          </label>
          <label className="radio">
            <input className="radio__input" type="radio" value="female" {...register('sex')} />
            <svg className="radio__box" viewBox="0 0 24 24" width="24" height="24" fill="none">
              <circle className="radio__circle-outline" cx="12" cy="12" r="12" />
              <circle className="radio__circle-inline" cx="12" cy="12" r="5" />
            </svg>
            <span className="radio__title text--caption">женский</span>
          </label>
        </div>
        {errors?.sex && <span className="item__error text--caption">{errors?.sex?.message}</span>}
      </div>

      <div className="form__item form__item--50 item">
        <div className="item__header header">
          <span className="header__title header__title--required text--caption">
            Контактный телефон
          </span>
          {getValues('phone') && !errors?.phone && <span className="header__ready _icon-check" />}
        </div>
        <label className="item__container">
          <NumberFormat
            className={`item__input item__input--phone text ${
              errors?.phone ? 'item__input--error' : ''
            }`}
            type="tel"
            format="+7 (###) ###-####"
            mask="_"
            placeholder="+7 ("
            {...register('phone')}
          />
        </label>
        {errors?.phone && (
          <span className="item__error text--caption">{errors?.phone?.message}</span>
        )}
      </div>

      <div className="form__item form__item--50 item">
        <div className="item__header header">
          <span className="header__title text--caption">Электронная почта</span>
          {getValues('email') && !errors.email && <span className="header__ready _icon-check" />}
        </div>
        <label className="item__container item">
          <input
            className={`item__input item__input--email text ${
              errors?.email ? 'item__input--error' : ''
            }`}
            type="email"
            placeholder="example@domen.com"
            {...register('email')}
          />
        </label>
        {errors?.email && (
          <span className="item__error text--caption">{errors?.email?.message}</span>
        )}
      </div>

      <div className="form__item item">
        <div className="item__header header">
          <span className="header__title text--caption">Резюме</span>
          {(!!getValues('resumeLink') || !!getValues('resumeFile')?.length) &&
            !errors?.resumeLink &&
            !errors?.resumeFile && <span className="header__ready _icon-check" />}
        </div>
        <label className="item__container resume">
          <input
            className={`item__input resume__input text ${
              errors?.resumeLink ? 'item__input--error' : ''
            }`}
            type="text"
            placeholder="вставьте ссылку на резюме"
            {...register('resumeLink')}
          />
        </label>
        <label
          className={`item__container file ${isFormInputOnFocus ? 'file--focus' : ''} ${
            getValues('resumeFile')?.length ? 'text' : 'text--caption'
          } ${errors?.resumeFile ? 'file--error' : ''}`}
          onDragStart={dragStartHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragStartHandler}
          onDrop={dropHandler}
        >
          <input
            className="item__input file__input"
            type="file"
            {...register('resumeFile')}
            onFocus={() => setIsFormInputOnFocus(true)}
            onBlur={() => setIsFormInputOnFocus(false)}
            onChange={fileInputHandler}
          />
          <div
            className={`file__icon _icon-paperclip ${
              getValues('resumeFile')?.length ? 'file__icon--drop' : ''
            }`}
          />
          <div
            className={`file__label ${getValues('resumeFile')?.length ? 'file__label--drop' : ''}`}
          >
            {!drag && !getValues('resumeFile')?.length && 'выберите или перетащите файл'}
            {drag && 'перетащите файл'}
            {!drag && getValues('resumeFile.0')?.name}
          </div>
        </label>
        {(!!errors?.resumeLink || !!errors?.resumeFile) && (
          <span className="item__error text--caption">
            {errors?.resumeLink?.message || errors?.resumeFile?.message}
          </span>
        )}
      </div>

      <div className="form__item form__item--50 item">
        <div className="item__header header">
          <span className="header__title header__title--required text--caption">Капча</span>
          {!!getValues('recaptcha') && !errors?.recaptcha && (
            <span className="header__ready _icon-check" />
          )}
        </div>
        <label
          className={`item__container recaptcha check ${
            errors?.recaptcha ? 'recaptcha--error' : ''
          }`}
          htmlFor="recaptcha"
        >
          <div className="recaptcha__native">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_TEST_KEY}
              size="invisible"
              onChange={(token) => {
                if (token !== null) {
                  setValue('recaptcha', token, { shouldValidate: true, shouldDirty: true });
                } else {
                  setValue('recaptcha', '', { shouldValidate: true, shouldDirty: true });
                }
              }}
            />
          </div>
          <Controller
            control={control}
            name="recaptcha"
            render={({ field }) => (
              <input
                {...field}
                className="check__input"
                type="checkbox"
                onChange={recapthcaHandler}
                disabled={!!getValues('recaptcha') && !errors?.recaptcha}
                checked={!!getValues('recaptcha') && !errors?.recaptcha}
                id="recaptcha"
              />
            )}
          />
          <svg className="check__box" viewBox="0 0 24 24" width="24" height="24" fill="none">
            <rect
              className="check__outline check__outline--recaptcha"
              width="24"
              height="24"
              rx="8"
            />
            <path
              className="check__inline check__inline--recaptcha"
              d="M18.1105 6.20805C18.5479 6.54523 18.6292 7.17316 18.292 7.61057L12.1357 15.5967C11.3416 16.6269 9.79092 16.6369 8.9836 15.617L10.5517 14.3757L16.708 6.38952C17.0452 5.95212 17.6731 5.87087 18.1105 6.20805ZM6.37932 10.716C6.81235 10.3732 7.44128 10.4463 7.78407 10.8794L10.5517 14.3757L8.9836 15.617L6.21592 12.1207C5.87314 11.6877 5.94629 11.0588 6.37932 10.716Z"
            />
          </svg>
          <span className="recaptcha__title text--caption">я не робот</span>
          <span className="recaptcha__icon _icon-google-recaptcha">
            <span className="path1" />
            <span className="path2" />
            <span className="path3" />
          </span>
        </label>
        {errors.recaptcha && (
          <span className="item__error text--caption">{errors?.recaptcha?.message}</span>
        )}
      </div>

      <div className="form__item form__item--50 form__item--required-text item">
        <span className="item__required-text text--caption">
          * поля для обязательного заполнения
        </span>
      </div>

      <div className="form__item item">
        <label
          className={`item__container check-container check ${
            errors?.agreement ? 'check-container--error' : ''
          }`}
        >
          <input className="check__input" type="checkbox" {...register('agreement')} />
          <svg className="check__box" viewBox="0 0 24 24" width="24" height="24" fill="none">
            <rect className="check__outline" width="24" height="24" rx="8" />
            <path
              className="check__inline"
              d="M18.1105 6.20805C18.5479 6.54523 18.6292 7.17316 18.292 7.61057L12.1357 15.5967C11.3416 16.6269 9.79092 16.6369 8.9836 15.617L10.5517 14.3757L16.708 6.38952C17.0452 5.95212 17.6731 5.87087 18.1105 6.20805ZM6.37932 10.716C6.81235 10.3732 7.44128 10.4463 7.78407 10.8794L10.5517 14.3757L8.9836 15.617L6.21592 12.1207C5.87314 11.6877 5.94629 11.0588 6.37932 10.716Z"
            />
          </svg>
          <span className="text--caption">
            я подтверждаю согласие на обработку персональных данных и принимаю условия рассмотрения
            обращений
          </span>
        </label>
        {errors?.agreement && (
          <span className="item__error text--caption">{errors?.agreement?.message}</span>
        )}
      </div>

      <div className="form__item submit">
        <button
          className={`submit__button text text-center ${
            isValid && isDirty ? 'submit__button--ready' : ''
          }`}
          type="submit"
          disabled={!isValid || !isDirty}
        >
          отправить
        </button>
      </div>
    </form>
  );
}
