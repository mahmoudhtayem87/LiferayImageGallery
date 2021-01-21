import { AfterViewInit, Component, ViewContainerRef, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import LiferayParams from '../types/LiferayParams'
import { DocumentsRootObject, ImageObg } from '../types/document';
declare const Liferay: any;
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";
import { ChangeDetectorRef } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';


@Component({
	templateUrl:
		Liferay.ThemeDisplay.getPathContext() +
		'/o/LiferayImageGaller/app/app.component.html'
})
export class AppComponent implements AfterViewInit {

	@ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
	// gallery configuration
	conf: GALLERY_CONF = {
		imageOffset: '0px',
		showDeleteControl: false,
		showImageTitle: false,
	};
	public errorMsg: string = "";
	public isEmpty: boolean = false;
	public totalPages: number = 0;
	// gallery images
	images: GALLERY_IMAGE[] = [];
	// METHODS
	// open gallery
	openGallery(index: number = 0) {
		this.ngxImageGallery.open(index);
	}
	// close gallery
	closeGallery() {
		this.ngxImageGallery.close();
	}
	// set new active(visible) image in gallery
	newImage(index: number = 0) {
		this.ngxImageGallery.setActiveImage(index);
	}
	// next image in gallery
	nextImage(index: number = 0) {
		this.ngxImageGallery.next();
	}
	// prev image in gallery
	prevImage(index: number = 0) {
		this.ngxImageGallery.prev();
	}
	// EVENTS
	// callback on gallery opened
	galleryOpened(index: any) {

	}
	// callback on gallery closed
	galleryClosed() {

	}
	// callback on gallery image clicked
	galleryImageClicked(index: any) {
	}

	// callback on gallery image changed
	galleryImageChanged(index: any) {
	}
	params: LiferayParams;
	labels: any;
	isLoading: boolean = false;
	public pages: Array<number> = [];
	public pageImagesFullObject: ImageObg[];

	public page: number = 1;


	constructor(public Http: HttpClient, private cdRef: ChangeDetectorRef,
		public modalService: ModalDialogService, public viewRef: ViewContainerRef) {
		this.labels = {
			configuration: Liferay.Language.get('configuration'),
			portletNamespace: Liferay.Language.get('portlet-namespace'),
			contextPath: Liferay.Language.get('context-path'),
			portletElementId: Liferay.Language.get('portlet-element-id'),
		}

	}
	public ngAfterViewInit() {
		this.loadImages();
	}
	get configurationJSON() {
		return JSON.stringify(this.params.configuration, null, 2);
	}
	get FolderID() {
		return this.params.configuration.portletInstance.FolderID;
	}
	public get Headless_Documents() {
		return `${Liferay.ThemeDisplay.getPortalURL()}/o/headless-delivery/v1.0/document-folders/${this.FolderID}/documents?p_auth=${Liferay.authToken}&pageSize=${this.PageSize}&page=${this.page}`;
	}
	get PageSize() {
		return parseInt(this.params.configuration.portletInstance["PageSize"]);
	}
	public loadImages() {
		if (this.FolderID == null || this.FolderID == undefined || this.FolderID == "") {
			console.log("No folder ID found");
			this.isEmpty = true;
			this.errorMsg = "Please provide a valid folder ID";
			this.cdRef.detectChanges();
			return;
		}
		else {
			this.isLoading = true;
		}
		this.pages = new Array<number>();
		this.Http.get(this.Headless_Documents)
			.subscribe(docs => {
				var data = docs as DocumentsRootObject;
				this.images = [];
				this.pageImagesFullObject = [];
				for (var index = 0; index < data.items.length; index++) {
					var image: ImageObg = new ImageObg();
					image.big = data.items[index].contentUrl;
					image.title = data.items[index].title;
					image.medium = data.items[index].contentUrl;
					image.small = (data.items[index].adaptedImages
						.filter(image => image.resolutionName == "Thumbnail-300x300"))[0].contentUrl;
					this.pageImagesFullObject.push(image);
					this.images.push(
						{
							url: image.big,
							altText: 'woman-in-black-blazer-holding-blue-cup',
							title: 'woman-in-black-blazer-holding-blue-cup',
							thumbnailUrl: image.medium
						}
					);
				}
				var lastPage = data.lastPage;
				this.totalPages = data.lastPage;
				for (var index = 1; index <= lastPage; index++) {
					this.pages.push(index);
				}
				this.isLoading = false;
				if (this.pageImagesFullObject.length <= 0)
					this.isEmpty = true;
				this.cdRef.detectChanges();
			}, error => {
				this.isLoading = false;
				this.isEmpty = true;
				this.errorMsg = error.message;
				this.cdRef.detectChanges();
			});
	}

	loadImage(_page: number) {
		this.page = _page;
		this.loadImages();
	}
	public previous() {
		this.page = this.page - 1;
		if (this.page < 1)
			this.page = 1;
		this.loadImages();
	}
	public next() {

		this.page = this.page + 1;
		if (this.page > this.totalPages)
			this.page = this.totalPages;
		this.loadImages();
	}

}
