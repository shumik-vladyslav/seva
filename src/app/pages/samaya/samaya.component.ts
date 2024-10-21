import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-samaya',
  templateUrl: './samaya.component.html',
  styleUrls: ['./samaya.component.scss']
})
export class SamayaComponent implements OnInit {

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.loadExternalScript();
  }

  loadExternalScript(): void {
    if (!document.getElementById('webformscr-loader')) {
      const script = this.renderer.createElement('script');
      script.src = '//web.webformscr.com/apps/fc3/build/loader.js';
      script.async = true;
      script.id = 'webformscr-loader';
      script.setAttribute('sp-form-id', '7e795bda4f8c49a04236b7e14a05abf4c7d4d659df5c92c4f765a888a5144f4f');
      this.renderer.appendChild(document.body, script);
    }
  }
}
