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

export type TRefreshRequest = Pick<TResponse, 'refresh_token'>;

export function register(registerData: TRegisterUser): Promise<TResponse> {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerData)
  })
    .then((response) => response.json())
    .then((data: TResponse) => data);
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
    .then((response) => response.json())
    .then((data: TResponse) => {
      if (data && data.success && data.access_token) {
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
      }
      return data;
    });
}

export function getUser(accessToken: string): Promise<TResponse> {
  return fetch(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then((response) => response.json())
    .then((data: TResponse) => {
      if (!data.success) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          return refreshRequest({ refresh_token: refreshToken }).then(
            (refreshData) => getUser(refreshData.access_token)
          );
        }
      }

      return data;
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
    .then((res) => res.json())
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
