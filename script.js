document.addEventListener("DOMContentLoaded", () => {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyfUcoXj3iKGJx_7UTD58Zw2FaPIPBlohp5kBEu-LnCrKrYqhlsZFENx7vhYd1UnDEM/exec";

  const form = document.getElementById("rsvpForm");
  const submitBtn = document.querySelector(".submit-btn");

  const transportSection = document.getElementById("transportSection");
  const dietarySection = document.getElementById("dietarySection");

  const ceremonyAttend = document.getElementById("ceremonyAttend");
  const ceremonyAbsent = document.getElementById("ceremonyAbsent");
  const lunchAttend = document.getElementById("lunchAttend");
  const lunchAbsent = document.getElementById("lunchAbsent");

  function updateConditionalSections() {
    if (ceremonyAttend.checked) {
      transportSection.classList.remove("hidden-section");
    } else {
      transportSection.classList.add("hidden-section");
    }

    if (lunchAttend.checked) {
      dietarySection.classList.remove("hidden-section");
    } else {
      dietarySection.classList.add("hidden-section");
    }
  }

  [ceremonyAttend, ceremonyAbsent, lunchAttend, lunchAbsent].forEach(input => {
    input.addEventListener("change", updateConditionalSections);
  });

  updateConditionalSections();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    const data = {
      Name: formData.get("Name") || "",
      Postal: formData.get("Postal") || "",
      Address: formData.get("Address") || "",
      Ceremony: formData.get("Ceremony") || "",
      Lunch: formData.get("Lunch") || "",
      Afterparty: formData.get("Afterparty") || "",
      Bus_AM: formData.get("Bus_AM") || "",
      Bus_PM: formData.get("Bus_PM") || "",
      Parking: formData.get("Parking") || "",
      Dietary: formData.get("Dietary") || "",
      MSG: formData.get("MSG") || ""
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = "送信中...<span>Sending...</span>";

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      form.innerHTML = `
        <section class="text-section">
          <h2>ありがとうございます</h2>
          <span>Thank you for your RSVP</span>
          <p>
            ご回答を受け付けました。<br><br>
            Your response has been received.<br><br>
            Takatora & Nicolette
          </p>
        </section>
      `;

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });

    } catch (error) {
      alert("送信できませんでした。もう一度お試しください。");
      submitBtn.disabled = false;
      submitBtn.innerHTML = "ご回答を送信<span>Submit RSVP</span>";
    }
  });
});