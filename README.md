# LiferayImageGallery

Liferay Image Gallery has been created to render images from folders by specifying the folder ID and the Page Size, the implementation uses the headless API to get the images from the folder and render it into image thumbnails and a slide show once the user clicks on any image.

Hints:
1.	If you will use image gallery for public pages, you should create a security access policy to allow anonymous access to headless “com.liferay.headless.delivery.internal.resource.v1_0.DocumentResourceImpl#getDocumentFolderDocumentsPage”.
2.	Image gallery does not handle none – images files, the created folder which contains the images, should contains only images.
3.	Make sure to specify the correct folder id and the required page size.
4.	If the total number of pages is 1, pager will not appear. 


Design Tips:
1.	To override image rendering, please use the class “imageContainer” which is attached to the div where the image thumbnails is being rendered as div background image.
2.	To override the pager, please use the class “pager” which is attached to the main container div which contains the pager pages buttons as the following structure:
a.	Pagger
i.	Btn-group
1.	Button(s) tag
a.	Text / i tag with font awesome icon 

