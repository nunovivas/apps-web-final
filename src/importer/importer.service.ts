import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ImporterService {
  constructor(private readonly httpService: HttpService) {}

  getEuropeanCountries(): Observable<any> {
    return this.httpService
      .get('https://restcountries.com/v3.1/region/europe')
      .pipe(map((response: AxiosResponse) => response.data));
  }
}
