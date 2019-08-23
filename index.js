'use strict';

const apiKey = 'G0EayCLH9FZJOgpticgh7caqi1zJp1QwiHg18NV6';

const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}


function getResults(stateCode, maxResults=10) {
  const params = {
    stateCode: stateCode,
    api_key: apiKey,
    limit: maxResults
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);


  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      console.log(responseJson);
      displayResults(responseJson);
    })
    .catch(err => {
      $('body').text(`Something went Wrong ${err}`);
    });
}

function displayResults(responseJson) {
  $('#results-list').empty();
  for (let i =0; i < responseJson.data.length; i++) {
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></li>`
    );
    $('#results').removeClass('hidden');
  }
}

function handleSubmit() {
  $('#parksearch').on('submit', function (event) {
    event.preventDefault();
    let stateCode = $('#searchbar').val();
    let resultsNum = $('#resultsNum').val();
    $('#searchbar').val('');
    $('#resultsNum').val(10);
    stateCode.trim();
    resultsNum.trim();
    getResults(stateCode, resultsNum);
  });
}



function main() {
  handleSubmit();
}

$(main);