console.log("Postman Clone");

//Method to Create Parameter
function createParameter(param) {
  let div = document.createElement("div");
  div.innerHTML = param;
  div.querySelector(".deleteParam").addEventListener("click", (e) => {
    e.target.parentNode.parentNode.remove();
  });
  paramCount++;
  return div;
}

//Method to add parameters..
function addParameters() {
  let param = `<div class="input-group input-group-sm mb-3 parameters">
                    <legend class="col-form-label col-sm-2 pt-0">Parameters ${
                      paramCount + 2
                    }</legend>
                    <input
                    type="text"
                    class="form-control parametersKey"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    id="parameterKey${paramCount + 2}"
                    placeholder="Enter Parameter ${paramCount + 2} Key"
                    />
                    <input
                    type="text"
                    class="form-control parametersValue"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-sm"
                    id="parameterValue${paramCount + 2}"
                    placeholder="Enter Parameter ${paramCount + 2} value"
                    />
                    <button class="btn btn-primary deleteParam">-</button>
                    </div>`;

  let div = createParameter(param);
  parameterBox.appendChild(div);
}

//method to invoke fetch api
function invokeFetchApi(url, requestType, data) {
  fetch(url, {
    method: requestType,
    body: data,
    headers: {
      "Content-type": "application/json; charset = UTF-8",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      // document.getElementById("responseText").value = data;
      document.getElementById("responseText").innerText = data;
    });
}
//Method to get data submitted data
function getData(requestType, contentType, url) {
  let data = {};
  //If user selects params option, get all params data in an object
  if (contentType == "params") {
    const parameters = document.getElementsByClassName("parameters");
    for (const item of parameters) {
      let key = item.getElementsByClassName("parametersKey");
      let value = item.getElementsByClassName("parametersValue");
      data[key[0].value] = value[0].value;
    }
    data = JSON.stringify(data);
  } else {
    //If user selects JSON option, get the JSON data..
    data = document.getElementById("requestJsonText").value;
  }

  if (requestType === "POST") {
    invokeFetchApi(url, requestType, data);
  } else {
    invokeFetchApi(url, requestType);
  }
}

//Method to submit the data on submit button
function submitData() {
  //If user clicks on submit show 'please wait'..
  // document.getElementById("responseText").value = "Please Wait......";
  document.getElementById("responseText").innerText = "Please Wait......";

  //Get URL from the URL input..
  let url = document.getElementById("urlField").value;
  let requestType = document.querySelector(
    "input[name = 'requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name = 'contentType']:checked"
  ).value;

  //Log url , request type, content type
  console.log(url, requestType, contentType);

  //get data based on the content type
  getData(requestType, contentType, url);
}

//Initialize a parameters counter...
let paramCount = 0;

//Initially hide the Parameter Box...
const parameterBox = document.getElementById("parameterBox");
parameterBox.style.display = "none";

//Hide the Json box if user click on parameter
const paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", (e) => {
  document.getElementById("parameterBox").style.display = "block";
  document.getElementById("requestJsonBox").style.display = "none";
});

//Hide the parameters if user clicks on Json
const jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", (e) => {
  document.getElementById("parameterBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "flex";
});

//Add Parameters if user click on + button..
const addParam = document.getElementById("addParam");
addParam.addEventListener("click", addParameters);

//Add event listener on submit button
const btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener("click", submitData);
