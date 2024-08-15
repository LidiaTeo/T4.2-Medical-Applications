document.addEventListener('DOMContentLoaded', function () {
    const csvUrl = 'https://raw.githubusercontent.com/andreidincaBeia/T4.2-Medical-Applications/main/T4.2%20-%20Medical%20Applications.csv';

    fetch(csvUrl)
        .then(response => response.text())
        .then(csvText => {
            Papa.parse(csvText, {
                header: true,
                complete:  function(results) {
                    const appsData = results.data.filter(app => app['Name of aplication'] && app['Icon App Link'] && app['Description'] && app['Link Google Play'] && app['Website'] && app['Link AppStore']); // Filter out invalid rows
                    const appContainer = document.getElementById('appContainer');

                    appsData.forEach(app => {
                        const appCard = document.createElement('div');
                        appCard.classList.add('app-card');

                        const appIcon = document.createElement('img');
                        appIcon.classList.add('app-icon');
                        appIcon.src = app['Icon App Link'];
                        appCard.appendChild(appIcon);

                        const appDetails = document.createElement('div');
                        appDetails.classList.add('app-details');

                        const appName = document.createElement('div');
                        appName.classList.add('app-name');
                        appName.textContent = app['Name of aplication'];
                        appDetails.appendChild(appName);

                        const appDescription = document.createElement('div');
                        appDescription.classList.add('app-description');
                        appDescription.textContent = app['Description'];
                        appDetails.appendChild(appDescription);

                        const buttonContainer = document.createElement('div');
                        buttonContainer.classList.add('button-container');

                        const appButton = createButton('Website', app['Website']);
                        buttonContainer.appendChild(appButton);

                        const appButton2 = createButton('Google Play', app['Link Google Play']);
                        buttonContainer.appendChild(appButton2);

                        const appButton3 = createButton('App Store', app['Link AppStore']);
                        buttonContainer.appendChild(appButton3);

                        appDetails.appendChild(buttonContainer);
                        appCard.appendChild(appDetails);
                        appContainer.appendChild(appCard);
                    });
                }
            });
        });
});


function createButton(text, link) {
    const button = document.createElement('a');
    button.classList.add('app-button');
    button.textContent = text;

    if (link && link !== '-') {
        button.href = link;
        button.target = '_blank';
    } else {
        button.classList.add('disabled');
        button.style.backgroundColor = 'gray';
        button.style.cursor = 'not-allowed';
        button.textContent = `${text} `;
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default action if clicked
        });
    }

    return button;
}

function adjustContentPadding() {
    var header = document.getElementById('overlay');
    var content = document.getElementById('appContainer');
    var headerHeight = header.offsetHeight;
    content.style.paddingTop = headerHeight + 'px';
  }

  // Adjust padding on load
  window.onload = adjustContentPadding;

  // Adjust padding if the window is resized
  window.onresize = adjustContentPadding;
