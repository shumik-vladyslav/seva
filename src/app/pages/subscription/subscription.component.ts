import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

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
      script.setAttribute('sp-form-id', '773085cd83e331266e04c0c9d72248e58cce02213135db01644f07ffd0c8c58a');
      this.renderer.appendChild(document.body, script);
    }
  }

}
