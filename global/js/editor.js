const svgFile = "/manual/editor/sablona_ig-post.svg";
      fetch(svgFile)
        .then(response => response.text())
        .then(svgString => {
          const modifiedSvgString = svgString.replace('fill=""');
          document.getElementById("svg-editor-container").innerHTML = modifiedSvgString;
        });

        document.getElementById('select-format').addEventListener('change', function() {
    updateSvgFile();
  });
  
  document.querySelectorAll('input[name="portrait-vs-landscape"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
      updateSvgFile();
    });
  });
  
  function updateSvgFile() {
    const format = document.getElementById('select-format').value;
    const orientation = document.querySelector('input[name="portrait-vs-landscape"]:checked').value === 'radio-portrait' ? 'portrait' : 'landscape';
  
    let svgFile;
  
    if (format === 'format-a4') {
      svgFile = `/manual/editor/sablona_A4-${orientation}.svg`;
    } else if (format === 'format-a5') {
      svgFile = `/manual/editor/sablona_A5-${orientation}.svg`;
    } else if (format === 'format-ig-post') {
      svgFile = '/manual/editor/sablona_ig-post.svg';
    } else if (format === 'format-ig-stories') {
      svgFile = '/manual/editor/sablona_ig-stories.svg';
    }
  
    if (svgFile) {
      fetch(svgFile)
        .then(response => response.text())
        .then(svgString => {
          const modifiedSvgString = svgString.replace('fill=""');
          document.getElementById("svg-editor-container").innerHTML = modifiedSvgString;
          Mavo.init();
        });
    }
  }
  
  updateSvgFile();
  
