import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { NgxImageGalleryModule } from 'ngx-image-gallery';
@NgModule({
	imports: [NgxImageGalleryModule,BrowserModule,HttpClientModule,ModalDialogModule.forRoot()],
	declarations: [AppComponent],
	entryComponents: [AppComponent],
	bootstrap: [], // Don't bootstrap any component statically (see ngDoBootstrap() below)
	providers: [],
})
export class AppModule {
	// Avoid bootstraping any component statically because we need to attach to
	// the portlet's DOM, which is different for each portlet instance and,
	// thus, cannot be determined until the page is rendered (during runtime).
	ngDoBootstrap() {}
}
