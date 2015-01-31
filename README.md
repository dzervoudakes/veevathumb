VeevaThumb
==========

For use with Adobe Photoshop CS6 or CC. Leverages Photoshop JavaScript API.

Exports thumbnails for "Veeva" eDetailing presentations.

#####Instructions

* Open an images in Photoshop CS6 / CC (must already be 'saved' on your machine somewhere, otherwise the script won't work)
* File > Scripts > Browse
* Find 'VeevaThumb.js' in the browse window and load it (note: Photoshop's default file of type is .jsx, make sure to search for .js in the dropdown list)
* Once loaded, you will be prompted to choose a file size: type '1' for 1024x768 or '2' for 200x150, then select 'OK'
* After this step, all currently open images in Photoshop will export a .jpg with the dimensions requested. Exported images will be saved in the root folder of the original source images.