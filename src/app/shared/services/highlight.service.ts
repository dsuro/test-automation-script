import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

declare const Prism: any;

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  highlightAll() {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightAll();
    }
  }
  highlightSection(code: string | undefined): string {
    if (isPlatformBrowser(this.platformId)) {
      return Prism.highlight(code, Prism.languages.java, 'java');
    }
    return '';
  }
  highlightElement(elem: any): void {
    Prism.highlightElement(elem);
  }
}
