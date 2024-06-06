import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}
  getResourceUrl(resourceApi: string, isLocal = false) {
    if (isLocal) {
      return environment.localServerUrl + resourceApi;
    } else {
      return environment.liveServerUrl + resourceApi;
    }
  }
}
