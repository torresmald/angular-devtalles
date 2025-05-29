import { Pagination } from './giphy-response.interface';

export interface Gif {
  id: string;
  url: string;
  image: string;
  pagination?: Pagination;
}
