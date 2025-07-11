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
function submitForm(ev) {
  ev.preventDefault();
  if (!provjeriMail()) {
    alert("Pogresno uneseni podaci >:(");
    return;
  }
  let obj = new Object();
  obj.ime = document.getElementById("name").value;
  obj.email = document.getElementById("email").value;
  obj.telefon = document.getElementById("phone").value;
  obj.vrijeme =
    document.getElementById("date").value +
    " " +
    document.getElementById("selected_time").value;
  let jsonObj = JSON.stringify(obj);
  document.querySelector(".podaci").style.display = "none";
  console.log(jsonObj);
  fetch(
    "https://barbershopmeha-default-rtdb.europe-west1.firebasedatabase.app/rezervacije.json",
    {
      method: "POST",
      body: jsonObj,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.status != 200) {
        alert("Greska pri rezervisanju :(");
      } else {
        dialogSuccess("Uspjesno rezervisano sisanje!!");
      }
    })
    .then(() => {
      dialogSuccess("Uspjesno rezervisano sisanje!");
    })
    .catch((err) => {
      console.log("Greska u fetchu: ", err);
      alert("Greska u firebaseu");
    });
}
function provjeriMail() {
  if (
    !/^[a-zA-Z]+(.|-)(@gmail.com|edu.fit@ba)$/.test(
      document.getElementById("email").value
    )
  ) {
    email.style.backgroundColor = "red";
    return false;
  } else {
    email.style.backgroundColor = "teal";
    return true;
  }
}
function provjeriBroj() {
  if (
    !/^\+3876[0-3][0-9]{6}$/.test(document.getElementById("phoneInput").value)
  ) {
    document.getElementById("phoneInput").style.backgroundColor = "red";
  } else {
    document.getElementById("phoneInput").style.backgroundColor = "teal";
  }
}
function getKomentari() {
  fetch(
    "https://barbershopmeha-default-rtdb.europe-west1.firebasedatabase.app/komentari.json"
  )
    .then((res) => {
      res.json().then((body) => {
        const commentsList = document.getElementById("comments_list");
        commentsList.innerHTML = "";

        if (!body) {
          commentsList.innerHTML = "<p>Nema komentara.</p>";
          return;
        }
        const keys = Object.keys(body);
        for (let i = 0; i < keys.length; i++) {
          const id = keys[i];
          const comment = body[id];

          commentsList.innerHTML += `
          <div class="comment">
           <div class="comment-header">
             <img src="user.jpg" alt="Korisnik" />
              <div class="comment-meta">
             <strong>• ${comment.ime}</strong> - Ocjena: ${comment.ocjena}
           </div>
         </div>
           <p>${comment.tekst}</p>
        </div>
        `;
        }
      });
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("comments_list").innerHTML =
        "<p>Greška pri učitavanju komentara.</p>";
    });
}
getKomentari();

function dodajKomentar() {
  const form = document.getElementById("comment_form");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function postKomentar() {
  const ime = document.getElementById("input_name").value.trim();
  const tekst = document.getElementById("input_text").value.trim();
  const ocjena = document.getElementById("input_rating").value.trim();

  if (!ime || !tekst || !ocjena) {
    alert("Molimo popunite sva polja!");
    return;
  }
  if (isNaN(ocjena) || ocjena < 1 || ocjena > 5) {
    alert("Ocjena mora biti broj između 1 i 5!");
    return;
  }

  let obj = new Object();
  obj.ime = ime;
  obj.tekst = tekst;
  obj.ocjena = ocjena;

  fetch(
    "https://barbershopmeha-default-rtdb.europe-west1.firebasedatabase.app/komentari.json",
    {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      if (res.status != 200) {
        alert("Greska pri slanju komentara :(");
      }
    })
    .then(() => {
      dialogSuccess("Komentar uspjesno dodan! :))");
      document.getElementById("input_name").value = "";
      document.getElementById("input_text").value = "";
      document.getElementById("input_rating").value = "";
      document.getElementById("comment_form").style.display = "none";
      getKomentari();
    })
    .catch((err) => {
      console.error(err);
      alert("Došlo je do greške prilikom slanja komentara.");
    });
}
function toggleDropdown() {
  const dropdown = document.querySelector("#header ul");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}
