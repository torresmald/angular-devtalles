import { CountryResponse } from '../interfaces/country-response.interface';
import { Country } from '../interfaces/country.interface';

export const mapperCountry = (responseCountry: CountryResponse): Country => {
  const { cca2, flag, flags, region, subregion, capital, population, translations } = responseCountry;
  return {
    cca2,
    flag,
    flagSvg: flags.svg,
    name: translations['spa'].common,
    capital: (capital && capital[0]) ?? '',
    population: population,
    region,
    subRegion: subregion
  };
};

export const mapperCountries = (
  responseCountries: CountryResponse[]
): Country[] => {
  return responseCountries.map(mapperCountry);
};
