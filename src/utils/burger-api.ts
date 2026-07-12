export const BASE_URL = 'https://practicetasks.kz/burger-constructor';
import type { TOrdersData, TOrder } from '@utils-types';
import { type TIngredientsResponse } from '../slices/ingredientsSlice';

export type TRegisterUser = {
  email: string;
  name: string;
  password: string;
};

export type TUser = {
  email: string;
  name: string;
};
export type TSuccessResponse = {
  success: boolean;
};
export type TResetPassword = {
  newPassword: string;
  token: string;
};
export interface TResponse {
  access_token: string;
  refresh_token: string;
  success: boolean;
  user: TUser;
}
export type TNewOrderResponse = {
  success: boolean;
  order: {
    number: number;
  };
  name: string;
};
export type TLogin = Omit<TRegisterUser, 'name'>;
export type TUserEmail = Omit<TUser, 'name'>;
export type TRefreshRequest = Pick<TResponse, 'refresh_token'>;

export function register(registerData: TRegisterUser): Promise<TResponse> {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerData)
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((errData) => {
      throw new Error(errData.message || 'Ошибка регистрации');
    });
  });
}

export function refreshRequest(body: TRefreshRequest): Promise<TResponse> {
  return fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: body.refresh_token
    })
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Ошибка при обновлении токена на сервере');
    })
    .then((data: TResponse) => {
      if (data && data.success && data.access_token) {
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        return data;
      }
      throw new Error('Не удалось обновить токен');
    });
}

export function getUser(accessToken: string): Promise<TResponse> {
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('jwt expired');
    })
    .catch((err) => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken && err.message === 'jwt expired') {
        return refreshRequest({ refresh_token: refreshToken }).then(
          (refreshData) => getUser(refreshData.access_token)
        );
      }
      throw err;
    });
}
export function login(loginData: TLogin): Promise<TResponse> {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then((errData) => {
        throw new Error(errData.message || 'Что-то пошло не так');
      });
    })
    .then((data: TResponse) => data);
}

export function getOrders(): Promise<TOrdersData> {
  return fetch(`${BASE_URL}/orders/all`)
    .then((response) => response.json())
    .then((data: TOrdersData) => data);
}
type TOrderResponse = {
  success: boolean;
  orders: TOrder[];
};

export function getOrderByNum(orderId: number): Promise<TOrder> {
  return fetch(`${BASE_URL}/orders/${orderId}`)
    .then((response) => response.json())
    .then((data: TOrderResponse) => data.orders[0]);
}
export function getIngredients(): Promise<TIngredientsResponse> {
  return fetch(`${BASE_URL}/ingredients`)
    .then((response) => response.json())
    .then((data: TIngredientsResponse) => data);
}
export function createOrderRequest(
  ingredients: string[],
  accessToken: string
): Promise<TNewOrderResponse> {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify({ ingredients })
  })
    .then((response) => response.json())
    .then((data: TNewOrderResponse) => data);
}
export function forgotPassword({
  email
}: TUserEmail): Promise<TSuccessResponse> {
  return fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
    .then((response) => response.json())
    .then((data: TSuccessResponse) => data);
}
export function resetPassword({
  newPassword,
  token
}: TResetPassword): Promise<TSuccessResponse> {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: newPassword, token })
  })
    .then((response) => response.json())
    .then((data: TSuccessResponse) => data);
}
export function getUserOrders(accessToken: string): Promise<TOrdersData> {
  return fetch(`${BASE_URL}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken
    }
  })
    .then((response) => response.json())
    .then((data: TOrdersData) => data);
}
