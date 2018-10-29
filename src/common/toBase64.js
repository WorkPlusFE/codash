'use strict';

export default function(path, success, error){
	function resolveImgURI(fileUrl, callback) {
		if (cordova.platformId.toLowerCase() === 'android') {
			fileUrl = `file://${fileUrl}`;
		}
		window.resolveLocalFileSystemURL(fileUrl, function(fileEntry){
			fileEntry.file(function(file){ readDataUrl(file, callback) }, fail);
		}, fail);
	};

	function readDataUrl(file, callback) {
		const reader = new FileReader();
		reader.onloadend = (evt) => {
      if (evt.target._result) {
        evt.target._result = evt.target._result.split(',')[1];
      }
      callback(evt);
		};
		reader.readAsDataURL(file);
	};

	function fail(evt) {
    error(evt);
	};

	resolveImgURI(path, success);
};
