/**
 * VeevaThumb
 * https://github.com/dzervoudakes/veevathumb
 * 
 * Auto-exports thumbnails for "Veeva" eDetailing presentations
 * 
 * Copyright (c) 2014, 2016 Dan Zervoudakes
 * Released under the MIT license
 * https://github.com/dzervoudakes/veevathumb/blob/master/LICENSE
 */
 
 (function() {
	
	// Collect open documents and prepare to export as JPG...
	var newSize = undefined;
	var openDocs = app.documents;
	var exportJPG = new ExportOptionsSaveForWeb();
		exportJPG.format = SaveDocumentType.JPEG;
		exportJPG.includeProfile = false;
		exportJPG.interlaced = true;
		exportJPG.optimized = false;
		exportJPG.quality = 100;
	
	// Ask users which size they wish to export...
	function askUser() {
		while (newSize !== '1' || newSize !== '2') {
			newSize = prompt('Export: 1) 1024x768, or 2) 200x150?', '');
			if (newSize === '1' || newSize === '2') return newSize;
		}
	};
	
	// History rollback function...
	function revertHistory() {
		var latestHistory = app.activeDocument.historyStates.length;
		var revertTo = latestHistory - 2;
		app.activeDocument.activeHistoryState = app.activeDocument.historyStates[revertTo];
		app.activeDocument.save();
	};
	
	// The export function...
	function exportThumbs() {
		// Obtain user input
		askUser();
		// Cycle through the documents
		for (var i = 0; i < openDocs.length; i++) {
			app.activeDocument = openDocs[i];
			if (newSize === '1') {
				app.activeDocument.resizeImage(UnitValue(1024, 'px'), UnitValue(768, 'px')); // Typical thumbnail size for "Home" screens
			} else if (newSize === '2') {
				app.activeDocument.resizeImage(UnitValue(200, 'px'), UnitValue(150, 'px')); // Default thumbnail size for Veeva presentations
			}
			var fullPath = app.activeDocument.path.fsName;
			var Name = app.activeDocument.name.replace(/\.[^\.]+$/, '');
			var saveFile = File(fullPath + '/' + Name + '.jpg');
			// Export the files and undo image resizing after successfully exporting
			app.activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, exportJPG);
			revertHistory();
		}
	};
	
	// Viva la Veeva!
	exportThumbs();
	
})();
