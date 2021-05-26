const url = "https://coronavirus-tracker-api.herokuapp.com/v2/locations";
async function apiCall() {
  const call = await fetch(url);
  const dataBack = await call.json();
  console.log(dataBack);
  return dataBack;
}

let d = apiCall().then((p) => {
  $(".tconfirmed").html(p.latest.confirmed);
  $(".tdeaths").html(p.latest.deaths);
  $(".trecovered").html(p.latest.recovered);

  for (x in p.locations) {
    var flag_url = `https://www.countryflags.io/${p.locations[x].country_code}/flat/64.png`;
    // var image = $.get(flag_url, () => true).fail(() => false);
    $(".covid-data-container")
      .append(`<div class="covid-data"><div class='country'>${p.locations[x].country} 
              
                <img class="country_flag" src=${flag_url} alt="flag"/> 
                <br> 
                <small> ${p.locations[x].province}</i></small> </div><div class="status">
                    <span class="c">Confirmed : <span class="confirmed">${p.locations[x].latest.confirmed}</span> </span>
                    <span class="d">Deaths : <span class="death">${p.locations[x].latest.deaths}</span> </span>
                    <span class="r">Recovered : <span class="recovered">${p.locations[x].latest.recovered}</span> </span>
                </div></div>`);
  }
});

let search = (_) => {
  var words = document.getElementById("search").value.toLowerCase();
  var inContent = document.getElementsByClassName("covid-data");

  for (let i = 0; i < inContent.length; i++) {
    inContent[i].innerText.toLowerCase().includes(words)
      ? is("block")
      : isNot("none");
    function is(block) {
      inContent[i].style.display = block;
    }
    function isNot(none) {
      inContent[i].style.display = none;
    }
  }
};

$(window).on("scroll", (_) => {
  $(window).scrollTop()
    ? $(".search").addClass("sticky")
    : $(".search").removeClass("sticky");
});
