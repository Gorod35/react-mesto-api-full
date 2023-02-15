const page = document.querySelector('.page');
export const buttonEditProfile = page.querySelector('.profile__edit-btn');
export const buttonAddImage = page.querySelector('.profile__add-btn');
export const buttonChangeAvatar = page.querySelector('.profile__avatar');
export const profileImage = page.querySelector('.profile__image');
export const profileNameSelector = '.profile__title';
export const profileDescriptionSelector = '.profile__subtitle';
export const profileAvatarSelector = '.profile__image';

const popupEditProfile = page.querySelector('.popup_edit-profile');
export const userName = popupEditProfile.querySelector('.popup__input_type_name');
export const userDescription = popupEditProfile.querySelector('.popup__input_type_description');
export const popupFormEditProfile = page.querySelector('.popup__form_edit-profile');
export const popupFormAddCard = page.querySelector('.popup__form_add-card');
export const popupFormChangeAvatar = page.querySelector('.popup__form_refresh-avatar');

export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_invalid',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input_form-error'
};