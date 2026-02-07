const assistantLog = document.getElementById("assistantLog");
const assistantForm = document.getElementById("assistantForm");
const assistantInput = document.getElementById("assistantInput");

const timerDisplay = document.getElementById("timerDisplay");
const startTimer = document.getElementById("startTimer");
const resetTimer = document.getElementById("resetTimer");
const timerButtons = document.querySelectorAll(".timer-controls button");

const alarmForm = document.getElementById("alarmForm");
const alarmStatus = document.getElementById("alarmStatus");

const ritualForm = document.getElementById("ritualForm");
const ritualInput = document.getElementById("ritualInput");
const ritualList = document.getElementById("ritualList");

const habitList = document.getElementById("habitList");
const habitProgress = document.getElementById("habitProgress");
const habitLabel = document.getElementById("habitLabel");

const hydrationCount = document.getElementById("hydrationCount");
const addWater = document.getElementById("addWater");
const resetWater = document.getElementById("resetWater");

const moodRange = document.getElementById("moodRange");
const moodLabel = document.getElementById("moodLabel");

const focusTags = document.getElementById("focusTags");
const focusNote = document.getElementById("focusNote");

const breathTimer = document.getElementById("breathTimer");
const startBreath = document.getElementById("startBreath");

const medicineForm = document.getElementById("medicineForm");
const medicineName = document.getElementById("medicineName");
const medicineTime = document.getElementById("medicineTime");
const medicineList = document.getElementById("medicineList");

const appointmentForm = document.getElementById("appointmentForm");
const appointmentTitle = document.getElementById("appointmentTitle");
const appointmentDate = document.getElementById("appointmentDate");
const appointmentList = document.getElementById("appointmentList");

const soundscapeList = document.getElementById("soundscapeList");
const soundscapeStatus = document.getElementById("soundscapeStatus");

const assistantResponses = [
  {
    keywords: ["cold", "cough", "sardi", "जुकाम"],
    response:
      "Warm पानी में अदरक और तुलसी डालकर पीएं, भाप लें, और 7-8 घंटे नींद लें. अगर बुखार बढ़े तो डॉक्टर से मिलें.",
  },
  {
    keywords: ["sleep", "नींद", "insomnia"],
    response:
      "सोने से 1 घंटा पहले स्क्रीन बंद करें, हल्का स्ट्रेच करें, और गुनगुना दूध/हल्दी दूध लें. रोज़ाना एक जैसा समय रखें.",
  },
  {
    keywords: ["stress", "तनाव", "anxiety"],
    response:
      "5 मिनट गहरी सांस (4-4-6 पैटर्न), कैफीन कम, और दिन में 10 मिनट धूप लें. छोटी वॉक से भी राहत मिलती है.",
  },
  {
    keywords: ["digestion", "पाचन", "acidity"],
    response:
      "भोजन के बाद सौंफ/अजवाइन लें, तेज मसाले कम रखें, और दिन में 2-3 लीटर पानी पिएं. रात का भोजन हल्का रखें.",
  },
  {
    keywords: ["immunity", "इम्युनिटी", "energy"],
    response:
      "Immunity boost के लिए: हल्दी, आंवला, तुलसी, और 15 मिनट हल्का व्यायाम रखें. रोज़ाना प्रोटीन लें.",
  },
];

const defaultResponses = [
  "आपके लिए एक gentle routine: पानी, हल्का योग, और 10 मिनट ध्यान. क्या आप किसी खास समस्या पर पूछना चाहते हैं?",
  "I can help with home remedies, routines, timers, and mindful breathing. Tell me what's needed today.",
  "आज का लक्ष्य: पानी, नींद, और थोड़ा मूवमेंट. किस चीज़ का guidance चाहिए?",
];

const addMessage = (text, type) => {
  const entry = document.createElement("div");
  entry.className = `assistant-entry ${type}`;
  entry.textContent = text;
  assistantLog.appendChild(entry);
  assistantLog.scrollTop = assistantLog.scrollHeight;
};

const getAssistantReply = (question) => {
  const lower = question.toLowerCase();
  const matched = assistantResponses.find((item) =>
    item.keywords.some((keyword) => lower.includes(keyword.toLowerCase()))
  );
  if (matched) {
    return matched.response;
  }
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

assistantForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = assistantInput.value.trim();
  if (!question) return;

  addMessage(question, "user");
  const reply = getAssistantReply(question);
  setTimeout(() => addMessage(reply, "bot"), 400);
  assistantInput.value = "";
});

let timerDuration = 15 * 60;
let timerRemaining = timerDuration;
let timerInterval = null;

const renderTimer = () => {
  const minutes = String(Math.floor(timerRemaining / 60)).padStart(2, "0");
  const seconds = String(timerRemaining % 60).padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
};

const startTimerCountdown = () => {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    if (timerRemaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      timerRemaining = 0;
      renderTimer();
      alert("Timer complete! Take a deep breath.");
      return;
    }
    timerRemaining -= 1;
    renderTimer();
  }, 1000);
};

startTimer.addEventListener("click", startTimerCountdown);

resetTimer.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRemaining = timerDuration;
  renderTimer();
});

timerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const minutes = Number(button.dataset.time);
    timerDuration = minutes * 60;
    timerRemaining = timerDuration;
    renderTimer();
  });
});

renderTimer();

let alarmTimeout = null;

alarmForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const time = document.getElementById("alarmTime").value;
  const label = document.getElementById("alarmLabel").value || "Gentle reminder";

  if (!time) return;

  const now = new Date();
  const [hours, minutes] = time.split(":").map(Number);
  const alarmDate = new Date();
  alarmDate.setHours(hours, minutes, 0, 0);

  if (alarmDate <= now) {
    alarmDate.setDate(alarmDate.getDate() + 1);
  }

  const diff = alarmDate - now;
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
  }

  alarmTimeout = setTimeout(() => {
    alert(`⏰ ${label}`);
    alarmStatus.textContent = "Alarm completed. Set a new one.";
  }, diff);

  const displayTime = alarmDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  alarmStatus.textContent = `Alarm set for ${displayTime} — ${label}`;
  alarmForm.reset();
});

ritualForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = ritualInput.value.trim();
  if (!text) return;
  const item = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  const removeButton = document.createElement("button");
  removeButton.className = "ghost";
  removeButton.type = "button";
  removeButton.textContent = "Done";
  removeButton.addEventListener("click", () => {
    item.remove();
  });
  item.appendChild(span);
  item.appendChild(removeButton);
  ritualList.appendChild(item);
  ritualInput.value = "";
});

const updateHabitProgress = () => {
  const checkboxes = habitList.querySelectorAll("input[type='checkbox']");
  const completed = [...checkboxes].filter((box) => box.checked).length;
  const total = checkboxes.length;
  const percent = Math.round((completed / total) * 100);
  habitProgress.style.width = `${percent}%`;
  habitLabel.textContent = `${completed} of ${total} completed`;
};

habitList.addEventListener("change", updateHabitProgress);
updateHabitProgress();

let waterGlasses = 0;
const waterGoal = 8;

const renderWater = () => {
  hydrationCount.textContent = `${waterGlasses} / ${waterGoal}`;
};

addWater.addEventListener("click", () => {
  if (waterGlasses < waterGoal) {
    waterGlasses += 1;
    renderWater();
  }
});

resetWater.addEventListener("click", () => {
  waterGlasses = 0;
  renderWater();
});

renderWater();

const moodLabels = [
  "Low",
  "Calm",
  "Balanced",
  "Energized",
  "Excellent",
];

const updateMood = () => {
  const value = Number(moodRange.value);
  moodLabel.textContent = moodLabels[value - 1];
};

moodRange.addEventListener("input", updateMood);
updateMood();

focusTags.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;
  focusTags.querySelectorAll("button").forEach((button) => {
    button.classList.remove("active");
  });
  event.target.classList.add("active");
  focusNote.textContent = `Focus set: ${event.target.textContent}. Expect tailored tips.`;
});

let breathInterval = null;
const breathSteps = [
  { label: "Inhale", duration: 4 },
  { label: "Hold", duration: 4 },
  { label: "Exhale", duration: 6 },
];

const startBreathing = () => {
  if (breathInterval) return;
  let stepIndex = 0;
  let countdown = breathSteps[0].duration;
  breathTimer.textContent = `${breathSteps[0].label} ${countdown}s`;

  breathInterval = setInterval(() => {
    countdown -= 1;
    if (countdown <= 0) {
      stepIndex = (stepIndex + 1) % breathSteps.length;
      countdown = breathSteps[stepIndex].duration;
    }
    breathTimer.textContent = `${breathSteps[stepIndex].label} ${countdown}s`;
  }, 1000);
};

startBreath.addEventListener("click", startBreathing);

medicineForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = medicineName.value.trim();
  const time = medicineTime.value;
  if (!name || !time) return;

  const item = document.createElement("li");
  const info = document.createElement("span");
  info.textContent = `${name} • ${time}`;
  const takenButton = document.createElement("button");
  takenButton.className = "ghost";
  takenButton.type = "button";
  takenButton.textContent = "Taken";
  takenButton.addEventListener("click", () => {
    item.remove();
  });
  item.appendChild(info);
  item.appendChild(takenButton);
  medicineList.appendChild(item);
  medicineForm.reset();
});

appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = appointmentTitle.value.trim();
  const date = appointmentDate.value;
  if (!title || !date) return;

  const item = document.createElement("li");
  const info = document.createElement("span");
  info.textContent = `${title} • ${date}`;
  const doneButton = document.createElement("button");
  doneButton.className = "ghost";
  doneButton.type = "button";
  doneButton.textContent = "Done";
  doneButton.addEventListener("click", () => {
    item.remove();
  });
  item.appendChild(info);
  item.appendChild(doneButton);
  appointmentList.appendChild(item);
  appointmentForm.reset();
});

soundscapeList.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  soundscapeList.querySelectorAll("button").forEach((item) => {
    item.classList.remove("active");
  });
  button.classList.add("active");
  soundscapeStatus.textContent = `${button.dataset.sound} soundscape selected.`;
});

addMessage(
  "Namaste! मैं आपका offline wellness companion हूँ. पूछिए: सर्दी, नींद, तनाव, या routines.",
  "bot"
);
