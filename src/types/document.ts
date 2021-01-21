
export interface Get {
    method: string;
    href: string;
}

export interface Create {
    method: string;
    href: string;
}

export interface Actions {
    get: Get;
    create: Create;
}

export interface Get2 {
    method: string;
    href: string;
}

export interface Replace {
    method: string;
    href: string;
}

export interface Update {
    method: string;
    href: string;
}

export interface Delete {
    method: string;
    href: string;
}

export interface Actions2 {
    get: Get2;
    replace: Replace;
    update: Update;
    delete: Delete;
}

export interface AdaptedImage {
    contentUrl: string;
    height: number;
    resolutionName: string;
    sizeInBytes: number;
    width: number;
}

export interface Creator {
    additionalName: string;
    contentType: string;
    familyName: string;
    givenName: string;
    id: number;
    name: string;
}

export interface DocumentType {
    availableLanguages: any[];
    contentFields: any[];
    description: string;
    name: string;
}

export interface Item {
    actions: Actions2;
    adaptedImages: AdaptedImage[];
    contentUrl: string;
    creator: Creator;
    customFields: any[];
    dateCreated: Date;
    dateModified: Date;
    description: string;
    documentFolderId: number;
    documentType: DocumentType;
    encodingFormat: string;
    fileExtension: string;
    id: number;
    keywords: any[];
    numberOfComments: number;
    relatedContents: any[];
    siteId: number;
    sizeInBytes: number;
    taxonomyCategoryBriefs: any[];
    title: string;
}

export interface DocumentsRootObject {
    actions: Actions;
    facets: any[];
    items: Item[];
    lastPage: number;
    page: number;
    pageSize: number;
    totalCount: number;
}
export class ImageObg{
    small: string ;
    medium: string ;
    big: string ;
    title:string;
}


