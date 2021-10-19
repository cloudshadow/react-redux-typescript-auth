import axios, { AxiosResponse } from 'axios';
import urlHelper from '@/utils/urlHelper';
import { IAuthState, ILoginFrom, IRefreshRequest, IRefreshResponse } from '@/types/AuthTypes';

export function loginThunk(payload: ILoginFrom): Promise<AxiosResponse<IAuthState>> {
  // return axios.post<IAuthState>(urlHelper.t(urlHelper.servers.prodServer, 'login'), payload);
  return axios.get<IAuthState>(urlHelper.t(urlHelper.servers.prodServer, 'login'));
}

export function refreshTokenThunk(payload: IRefreshRequest): Promise<AxiosResponse<IRefreshResponse>> {
  return axios.post<IRefreshResponse>(urlHelper.t(urlHelper.servers.prodServer, 'refresh'), payload);
}
