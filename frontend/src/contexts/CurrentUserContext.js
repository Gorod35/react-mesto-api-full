import { createContext } from 'react';
import avatar from '../images/zhak-iv-kusto.jpg'

export const CurrentUserContext = createContext();

export const currentUser = {
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: avatar,
    email: ''
};