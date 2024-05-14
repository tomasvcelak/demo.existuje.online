function changeIcon(state) {
  const icon = document.getElementById("menu-icon");
  const screenWidth = window.innerWidth;
  
  if (screenWidth > 768) {
    if (state === "open") {
      icon.style.transform = "rotate(180deg)";
    } else {
      icon.style.transform = "rotate(0deg)";
    }
  }
}


  function czJednoznaky() {
    const prepositions = ["s", "z", "k", "v", "a", "i", "o", "u"];
  
    // Jednoznakove predlozky
    const regex = new RegExp(`(\\s|^)(${prepositions.join("|")})(\\s+)([^\p{Cc}\p{Cf}\p{zL}\p{Zp}]+)`, "gmi");
  
    // Jednoznakove predlozky za sebou
    const doublePrepRegex = new RegExp(`(\\s|^)(${prepositions.join("|")})&nbsp;(${prepositions.join("|")})(\\s+)([^\p{Cc}\p{Cf}\p{zL}\p{Zp}]+)`, "gmi");
  
    // Projde vsechny elementy <p>
    const paragraphs = document.getElementsByTagName("p");
    for (let i = 0; i < paragraphs.length; i++) {
      const paragraph = paragraphs[i];
  
      let str = paragraph.innerHTML;
  
      // Zamena predlozek
      str = str.replace(regex, '$1$2&nbsp;$4');
  
      // Zamena predlozek za sebou
      str = str.replace(doublePrepRegex, '$1$2&nbsp;$3&nbsp;$5');
  
      paragraph.innerHTML = str;
    }
  }
  
  document.addEventListener("DOMContentLoaded", czJednoznaky);
  
  function copyLink(button, sectionId) {
    // Get URL without any section ID
    var url = window.location.href.split('#')[0];
  
    // Create a link ID
    var sectionLink = url + '#' + sectionId;
  
    // Hold link
    var tempInput = document.createElement('input');
    tempInput.setAttribute('value', sectionLink);
    document.body.appendChild(tempInput);
  
    // Select contents
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  
    // Set icons
    button.innerHTML = '<svg class="onicon"><use xlink:href="/global/icons/icons.svg#check"></use></svg>';
  
    setTimeout(function() {
      button.innerHTML = '<svg class="onicon"><use xlink:href="/global/icons/icons.svg#link"></use></svg>';
    }, 2000);
  }
  
  

  function sendEmail(sectionId) {
    // Get URL
    var url = window.location.href;
  
    // Construct the email subject
    var subject = sectionId;
  
    // Construct the email body
    var message = 'Ahoj, zasílám podklady k ' + sectionId + '. Použij dle online příručky ' + url + '#' + sectionId + '. Děkuji.';
  
    // Encode the email body for use in a mailto link
    var encodedMessage = encodeURIComponent(message);
  
    // Construct the mailto link
    var mailtoLink = 'mailto:?subject=' + encodeURIComponent(subject) + '&body=' + encodedMessage;
  
    // Open the email client in a new tab
    window.open(mailtoLink, '_blank');
  }
  
  function setupButtons() {
    var buttonEdit = document.getElementById("button-edit");
    var iconEdit = document.getElementById("icon");
    var textEdit = document.getElementById("text");
  
    buttonEdit.addEventListener("click", function() {
      if (textEdit.innerHTML === "Upravit") {
        textEdit.innerHTML = "Hotovo";
        iconEdit.innerHTML = '<use href="/global/icons/icons.svg#editing"/>';
      } else {
        textEdit.innerHTML = "Upravit";
        iconEdit.innerHTML = '<use href="/global/icons/icons.svg#edit"/>';
      }
    });
  
    var buttonSave = document.getElementById("button-save");
    var iconSave = buttonSave.querySelector("use");
    var textSave = buttonSave.querySelector("span");
  
    buttonSave.addEventListener("click", function() {
      if (textSave.innerHTML === "Uložit") {
        textSave.innerHTML = "Uloženo";
        iconSave.setAttribute("href", "/global/icons/icons.svg#check");
  
        setTimeout(function() {
          textSave.innerHTML = "Uložit";
          iconSave.setAttribute("href", "/global/icons/icons.svg#save");
        }, 2000);
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    setupButtons();
  });
  

// Function for logo page select

document.addEventListener("DOMContentLoaded", function () {
  const logoImg = document.querySelector(".img-logo");
  const cardLogo = document.querySelector(".card-logo");
  const radioRgb = document.querySelector("#radio-rgb");
  const radioCmyk = document.querySelector("#radio-cmyk");
  const radioLight = document.querySelector("#radio-light");
  const radioDark = document.querySelector("#radio-dark");
  const radioFullColor = document.querySelector("#radio-full-color");
  const radioBlackWhite = document.querySelector("#radio-black-white");
  const selectLogoType = document.querySelector("#select-1");
  const switchZone = document.querySelector("#switch-zone");


function updateProtectionZone() {
    logoImg.style.paddingTop = 0;
    logoImg.style.paddingBottom = 0;

    const height = logoImg.clientHeight;
    const paddingVertical = height / 2;
    logoImg.style.paddingLeft = `${paddingVertical}px`;
    logoImg.style.paddingRight = `${paddingVertical}px`;
    const currentheight = logoImg.clientHeight;
    const padding = currentheight / 2;

    logoImg.style.padding = `${padding}px`;

    if (switchZone.checked) {
      logoImg.style.border = "0.2rem dashed red";
    } else {
      logoImg.style.border = "0.2rem solid transparent";
    }
  
  } 
  
  logoImg.addEventListener("load", updateProtectionZone);
  switchZone.addEventListener("change", updateProtectionZone);

  function updateLogoSrc() {
    if (!selectLogoType.value) return;

    let colorType = "";
    if (radioLight.checked) colorType = radioFullColor.checked ? "full-color-on-light" : "black";
    if (radioDark.checked) colorType = radioFullColor.checked ? "full-color-on-dark" : "white";

    let colorMode = "";
    if (radioRgb.checked) colorMode = "01-digital-rgb";
    if (radioCmyk.checked) colorMode = "02-print-cmyk";

    const newSrc = `/manual/00-logopack/${colorMode}/${selectLogoType.value}/${selectLogoType.value}_${colorType}.svg`;
    logoImg.src = newSrc;

    if (colorType === "full-color-on-light" || colorType === "black") {
      cardLogo.style.backgroundColor = "white";
    } else if (colorType === "full-color-on-dark" || colorType === "white") {
      cardLogo.style.backgroundColor = "black";
    } else {
      cardLogo.style.backgroundColor = ""; 
    }

    updateProtectionZone();
  }

  radioRgb.addEventListener("change", updateLogoSrc);
  radioCmyk.addEventListener("change", updateLogoSrc);
  radioLight.addEventListener("change", updateLogoSrc);
  radioDark.addEventListener("change", updateLogoSrc);
  radioFullColor.addEventListener("change", updateLogoSrc);
  radioBlackWhite.addEventListener("change", updateLogoSrc);
  selectLogoType.addEventListener("change", updateLogoSrc);

  radioRgb.checked = true;
  selectLogoType.value = "01-logo-horizontal";
  radioLight.checked = true;
  radioFullColor.checked = true;
  switchZone.checked = true;

  updateLogoSrc();

  function downloadLogo() {
    const link = document.createElement("a");
    link.href = logoImg.src;
    link.download = selectLogoType.value + ".svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // call downloadLogo() when the button is clicked
  const downloadButton = document.querySelector("#download-button-mobile");
  downloadButton.addEventListener("click", downloadLogo);
  const downloadButton1 = document.querySelector("#download-button-desktop");
  downloadButton1.addEventListener("click", downloadLogo);


});

// Function for checkboxes

document.addEventListener("DOMContentLoaded", function() {
  var checkbox1 = document.getElementById("checkbox-1");
  var checkbox2 = document.getElementById("checkbox-2");
  var checkbox3 = document.getElementById("checkbox-3");
  var downloadButtonMobile = document.getElementById("download-button-mobile");
  var downloadButtonDesktop = document.getElementById("download-button-desktop");
  var downloadButtonCompletePack = document.getElementById("download-button-complete-pack");

  downloadButtonMobile.disabled = true;
  downloadButtonDesktop.disabled = true;
  downloadButtonCompletePack.disabled = true;

  checkbox1.addEventListener("change", function() {
    downloadButtonMobile.disabled = !this.checked;
  });

  checkbox2.addEventListener("change", function() {
    downloadButtonDesktop.disabled = !this.checked;
  });

  checkbox3.addEventListener("change", function() {
    downloadButtonCompletePack.disabled = !this.checked;
  });
});

// Function for typography
const inputText = document.querySelector('.input-text');
const inputSize = document.querySelector('.input-size');
const selectStyle = document.querySelector('.select-style');
const showcase = document.querySelector('.showcase');
const tableContainer = document.querySelector('.glyphs-table-container');

// Select the p element and store its text content in a variable
const showcaseDefaultTextElement = document.querySelector('.showcase');
const showcaseDefaultText = showcaseDefaultTextElement.textContent;

inputText.addEventListener('input', () => {
  if (inputText.value.trim() === '') {
    showcase.textContent = showcaseDefaultText;
  } else {
    showcase.textContent = inputText.value;
  }
});

inputSize.addEventListener('input', () => {
  showcase.style.fontSize = inputSize.value + 'px';
});

selectStyle.addEventListener('change', () => {
  const fontWeight = selectStyle.value;
  showcase.style.fontWeight = fontWeight;

  const fontName = document.querySelector('.font-name');
  const alphabetElements = document.querySelectorAll('.alphabet');
  const glyphsTableContainer = document.querySelector('.glyphs-table-container');

  fontName.style.fontWeight = fontWeight;
  alphabetElements.forEach(el => {
    el.style.fontWeight = fontWeight;
  });

  glyphsTableContainer.style.fontWeight = fontWeight;
});

const glyphs = [
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  ...'abcdefghijklmnopqrstuvwxyz',
  ...'0123456789',
  ...'abčděfghíjklmňopqřštůvwxýž',
  ...'!@#$%^&*()_+-=[]{}|;:",.<>/?`~ô',
];

function createGlyphsTable(glyphs) {
  const container = document.createElement('div');
  container.classList.add('d-flex', 'flex-wrap', 'w-full');

  glyphs.forEach(glyph => {
    const glyphElement = document.createElement('div');
    glyphElement.classList.add('w-33', 'd-inline-flex', 'align-items-center', 'justify-content-center', 'p-5', 'border', 'h-10');
    glyphElement.textContent = glyph;

    container.appendChild(glyphElement);
  });

  return container;
}

const glyphsTable = createGlyphsTable(glyphs);
tableContainer.appendChild(glyphsTable);


    function copyCode(elem, containerId) {
      var range = document.createRange();
      range.selectNode(document.getElementById(containerId));
      window.getSelection().removeAllRanges(); 
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();

      elem.innerHTML = '<svg class="onicon"><use xlink:href="/global/icons/icons.svg#check"></use></svg>';

      setTimeout(function() {
          elem.innerHTML = '<svg class="onicon"><use xlink:href="/global/icons/icons.svg#copy"></use></svg>';
      }, 2000);
  }

  
