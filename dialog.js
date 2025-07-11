function zatvori() {
  document.getElementById("my-dialog-wrapper").remove();
  console.log("dialog: zatvoren");
}

function dialogSuccess(porukaText) {
  let noviDiv = document.createElement("div");
  noviDiv.id = "my-dialog-wrapper";
  document.body.appendChild(noviDiv);

  noviDiv.innerHTML = ` 
    <div class="my-dialog">
        <div class="my-dialog-header">
            <div class="header-icon">
                <img src="success.png">
                <span>Success</span>
            </div>
        </div>
        <div id="my-dialog-body">
            ${porukaText}
        </div>
        <div class="my-dialog-footer">
            <div class="dugme dugmeOk" onclick="zatvori()">
                Ok
            </div>
            <div class="dugme dugmeCancel" onclick="zatvori()">
                Cancel
            </div>
        </div>
    </div>
`;
}
