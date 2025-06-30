var dateInput = document.getElementById("date");
var prevDayButton = document.getElementById("prev-day");
var nextDayButton = document.getElementById("next-day");

var today = new Date();
dateInput.valueAsDate = today;
changeDate = (days) => {
  var currentDate = new Date(dateInput.valueAsDate);
  currentDate.setDate(currentDate.getDate() + days);
  dateInput.valueAsDate = currentDate;
};
prevDayButton.addEventListener("click", () => {
  changeDate(-1);
});
nextDayButton.addEventListener("click", () => {
  changeDate(1);
});

function Rezerv(btn) {
  const selectedTime = btn.textContent.trim();
  document.getElementById("selected_time").value = selectedTime;
  document.querySelector(".podaci").style.display = "block";
}
function submitForm() {
  let obj = new Object();
  obj.ime = document.getElementById("name").value;
  obj.email = document.getElementById("email").value;
  obj.telefon = document.getElementById("phone").value;
  obj.vrijeme = document.getElementById("selected_time").value;
  let jsonObj = JSON.stringify(obj);
  document.querySelector(".podaci").style.display = "none";
  fetch(
    "https://barbershopmeha-default-rtdb.europe-west1.firebasedatabase.app/rezervacije.json",
    {
      method: "POST",
      body: jsonObj,
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    if (res.status != 200) {
      alert("Greska pri rezervisanju :(");
    }
    res.json().then((body) => {
      alert("Uspjesno rezervisano sisanje!!");
    });
  });
}
