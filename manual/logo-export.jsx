/**
* Author: Tomáš Včelák (tomasvcelak.cz)
* Name: logo-export
* 
* Usage: Open AI from master-folder->File->Scripts->logo-export.jsx
*/

var idoc = app.activeDocument;
var abs = idoc.artboards;
var numArtboards = abs.length;
var mainFile = new File(idoc.fullName);
var sourceFolder = idoc.path + "/00-logopack";
var rgbFolder = sourceFolder + "/01-digital-rgb";
var cmykFolder = sourceFolder + "/02-print-cmyk";
var folder = new Folder(sourceFolder);

// Create source folder
var source = new Folder(sourceFolder);
if (!source.exists) {
    source.create();
}

// Create RGB folder
var rgb = new Folder(rgbFolder);
if (!rgb.exists) {
    rgb.create();
}

// Create CMYK folder
var cmyk = new Folder(cmykFolder);
if (!cmyk.exists) {
    cmyk.create();
}

// Fit artboards to selection and remove empty artboards
var removedArtboards = 0;
for (var a = numArtboards - 1; a >= 0; a--) {
    var thisBoard = abs[a];

    // activate each artboard
    idoc.artboards.setActiveArtboardIndex(a);

    // select all in artboard
    idoc.selectObjectsOnActiveArtboard();

    if (!idoc.selection.length) {
        // delete artboard if it is empty,
        thisBoard.remove();
        removedArtboards++;
    } else {
        // fit artboard to selection
        idoc.fitArtboardToSelectedArt(a);
    }
}

// Update the number of artboards
numArtboards -= removedArtboards;

// Function to create folder path based on artboard name
function createFolderPath(folder, artboardName) {
    var segments = artboardName.split('_');
    var path = folder;

    for (var i = 0; i < segments.length - 1; i++) {
        path += '/' + segments[i];
        var newFolder = new Folder(path);
        if (!newFolder.exists) {
            newFolder.create();
        }
    }

    return path;
}

// Export RGB SVGs
for (var a = numArtboards-1; a>=0; a--) {
    idoc.selection = null;
    var thisBoard = abs[a];

    // activate each artboard
    idoc.artboards.setActiveArtboardIndex(a);

    // select all in artboard
    idoc.selectObjectsOnActiveArtboard();

    if(!idoc.selection.length) {
        // delete artboard if it is empty,
        thisBoard.remove();
    } else {
        // get the name of the current artboard
        var artboardName = thisBoard.name;

        // Create folder path for the RGB export based on artboard name
        var folderPath = createFolderPath(rgbFolder, artboardName);

        // RGB export
        var file = new File(folderPath + "/" + artboardName + ".svg");
        var options = new ExportOptionsSVG();
        app.executeMenuCommand("doc-color-rgb");
        options.embedRasterImages = true;
        options.fontSubsetting = SVGFontSubsetting.GLYPHSUSED;
        options.DTD = SVGDTDVersion.SVG1_1;
        options.coordinatePrecision = 4;
        options.cssProperties = SVGCSSPropertyLocation.STYLEATTRIBUTES;
        options.documentEncoding = SVGDocumentEncoding.UTF8;
        options.artboardRange = (a + 1) + "-" + (a + 1);
        idoc.exportFile(file, ExportType.SVG, options);
        
        // Revert back to RGB mode
        app.executeMenuCommand("doc-color-rgb");
    }
}

// CMYK export
for (var a = numArtboards-1; a >= 0; a--) {
    idoc.selection = null;
    var thisBoard = abs[a];

    // activate each artboard
    idoc.artboards.setActiveArtboardIndex(a);

    // get the name of the current artboard
    var artboardName = thisBoard.name;

    // Create folder path for the CMYK export based on artboard name
    var folderPath = createFolderPath(cmykFolder, artboardName);

    // CMYK export
    var file = new File(folderPath + "/" + artboardName + ".svg");
    var options = new ExportOptionsSVG();
    app.executeMenuCommand("doc-color-cmyk");
    options.embedRasterImages = true;
    options.fontSubsetting = SVGFontSubsetting.GLYPHSUSED;
    options.DTD = SVGDTDVersion.SVG1_1;
    options.coordinatePrecision = 4;
    options.cssProperties = SVGCSSPropertyLocation.STYLEATTRIBUTES;
    options.documentEncoding = SVGDocumentEncoding.UTF8;
    options.artboardRange = (a + 1) + "-" + (a + 1);
    idoc.exportFile(file, ExportType.SVG, options);
}

// Close the current document without saving changes
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

// Open the main file
app.open(mainFile);

// Notify user when the script is done
alert("Artboards exported successfully!");

// Open the exported folder
folder.execute();
