/* VeevaThumb
 * 
 * Auto-exports thumbnails for "Veeva" eDetailing presentations
 * 
 * Copyright (c) 2014 Dan Zervoudakes
 * Developed under the MIT license
 */
	
	// Collect open documents and prepare to export as JPG...
	
	var newSize = "";
	var openDocs = app.documents;
	var exportJPG = new ExportOptionsSaveForWeb();
		exportJPG.format = SaveDocumentType.JPEG; 
		exportJPG.includeProfile = false;
		exportJPG.interlaced = true;
		exportJPG.optimized = false;
		exportJPG.quality = 100;
	
	// Ask users which size they wish to export...
	
	function askUser(){
		while ((newSize !== "1") || (newSize !== "2")){
			newSize = (prompt("Export: 1) 1024x768, or 2) 200x150? [type either '1' or '2']"));
			if (newSize == "1" || newSize == "2"){
				return newSize;
			}
		}
	};
	
	// The export function...
	
	function exportThumbs(){
		for (var i = 0; i < openDocs.length; i++){
			app.activeDocument = openDocs[i];
			if (newSize == "1"){
				app.activeDocument.resizeImage(1024,768); // Typical thumbnail size for "Home" screens
			} else {
				app.activeDocument.resizeImage(200,150); // Default thumbnail size for Veeva presentations
			}
			var fullPath = app.activeDocument.path.fsName;
			var Name = app.activeDocument.name.replace(/\.[^\.]+$/,"");
			var saveFile = File(fullPath + "/" + Name + ".jpg");
			app.activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, exportJPG);
		};
	};
	
	// Obtain user input...
	
	askUser();
	
	// Viva la Veeva!
	
	exportThumbs();
	
	
