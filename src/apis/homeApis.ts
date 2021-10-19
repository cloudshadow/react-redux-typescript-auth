import axios, { AxiosResponse } from 'axios';
import urlHelper from '@/utils/urlHelper';
import { IHomeState } from '@/types/HomeTypes';

export function getTitleThunk(): Promise<AxiosResponse<IHomeState>> {
  return axios.get<IHomeState>(urlHelper.t(urlHelper.servers.prodServer, 'title'));
}
