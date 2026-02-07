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

const sessionStatus = document.getElementById("sessionStatus");
const sessionTime = document.getElementById("sessionTime");
const sessionSteps = document.getElementById("sessionSteps");
const sessionDistance = document.getElementById("sessionDistance");
const startSession = document.getElementById("startSession");
const addSteps = document.getElementById("addSteps");
const endSession = document.getElementById("endSession");

const jogForm = document.getElementById("jogForm");
const jogGoal = document.getElementById("jogGoal");
const jogTime = document.getElementById("jogTime");
const jogList = document.getElementById("jogList");

const streakProgress = document.getElementById("streakProgress");
const streakLabel = document.getElementById("streakLabel");
const boostStreak = document.getElementById("boostStreak");
const resetStreak = document.getElementById("resetStreak");

const hydrationScore = document.getElementById("hydrationScore");
const hydrationTimer = document.getElementById("hydrationTimer");
const startHydrationGame = document.getElementById("startHydrationGame");
const tapHydration = document.getElementById("tapHydration");

const focusScore = document.getElementById("focusScore");
const focusTimer = document.getElementById("focusTimer");
const startFocusGame = document.getElementById("startFocusGame");
const focusHold = document.getElementById("focusHold");

const mindfulGrid = document.getElementById("mindfulGrid");
const mindfulResult = document.getElementById("mindfulResult");

const premiumButton = document.getElementById("premiumButton");
const premiumStatus = document.getElementById("premiumStatus");

const assistantResponses = [
  {
    keywords: ["cold", "cough"],
    response:
      "Drink warm water with ginger and basil, take steam, and sleep 7-8 hours. If fever rises, consult a doctor.",
  },
  {
    keywords: ["sleep", "insomnia"],
    response:
      "Turn off screens 1 hour before bed, do light stretches, and have warm milk or turmeric milk. Keep a consistent schedule.",
  },
  {
    keywords: ["stress", "anxiety"],
    response:
      "Try 5 minutes of deep breathing (4-4-6), reduce caffeine, and get 10 minutes of sunlight. Short walks also help.",
  },
  {
    keywords: ["digestion", "acidity"],
    response:
      "After meals, take fennel or carom seeds, reduce spicy foods, and drink 2-3 liters of water. Keep dinner light.",
  },
  {
    keywords: ["immunity", "energy"],
    response:
      "For immunity: turmeric, amla, basil, and 15 minutes of light exercise. Keep daily protein in your meals.",
  },
];

const defaultResponses = [
  "Here is a gentle routine: water, light yoga, and 10 minutes of meditation. What would you like help with?",
  "I can help with home remedies, routines, timers, and mindful breathing. Tell me what's needed today.",
  "Today's goal: water, sleep, and a little movement. What guidance do you need?",
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

let sessionInterval = null;
let sessionSeconds = 0;
let sessionStepCount = 0;
const stepDistanceKm = 0.0008;

const renderSession = () => {
  const minutes = String(Math.floor(sessionSeconds / 60)).padStart(2, "0");
  const seconds = String(sessionSeconds % 60).padStart(2, "0");
  sessionTime.textContent = `${minutes}:${seconds}`;
  sessionSteps.textContent = `${sessionStepCount}`;
  const distance = (sessionStepCount * stepDistanceKm).toFixed(1);
  sessionDistance.textContent = `${distance} km`;
};

const startMovementSession = () => {
  if (sessionInterval) return;
  sessionStatus.textContent = "Session active. Keep moving!";
  sessionInterval = setInterval(() => {
    sessionSeconds += 1;
    renderSession();
  }, 1000);
};

const endMovementSession = () => {
  if (sessionInterval) {
    clearInterval(sessionInterval);
    sessionInterval = null;
  }
  sessionStatus.textContent = "Session saved. Great work!";
};

startSession.addEventListener("click", startMovementSession);

addSteps.addEventListener("click", () => {
  sessionStepCount += 250;
  renderSession();
});

endSession.addEventListener("click", endMovementSession);

renderSession();

jogForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const goal = jogGoal.value.trim();
  const time = jogTime.value;
  if (!goal || !time) return;

  const item = document.createElement("li");
  const info = document.createElement("span");
  info.textContent = `${goal} • ${time}`;
  const doneButton = document.createElement("button");
  doneButton.className = "ghost";
  doneButton.type = "button";
  doneButton.textContent = "Done";
  doneButton.addEventListener("click", () => {
    item.remove();
  });
  item.appendChild(info);
  item.appendChild(doneButton);
  jogList.appendChild(item);
  jogForm.reset();
});

let streakDays = 4;

const renderStreak = () => {
  streakLabel.textContent = `${streakDays}-day streak`;
  const percent = Math.min(100, (streakDays / 10) * 100);
  streakProgress.style.width = `${percent}%`;
};

boostStreak.addEventListener("click", () => {
  streakDays += 1;
  renderStreak();
});

resetStreak.addEventListener("click", () => {
  streakDays = 0;
  renderStreak();
});

renderStreak();

let hydrationGameActive = false;
let hydrationClicks = 0;
let hydrationCountdown = 15;
let hydrationInterval = null;

const renderHydrationGame = () => {
  hydrationScore.textContent = `${hydrationClicks} / 20`;
  hydrationTimer.textContent = hydrationGameActive
    ? `${hydrationCountdown}s left`
    : "Ready";
};

startHydrationGame.addEventListener("click", () => {
  if (hydrationGameActive) return;
  hydrationGameActive = true;
  hydrationClicks = 0;
  hydrationCountdown = 15;
  renderHydrationGame();
  hydrationInterval = setInterval(() => {
    hydrationCountdown -= 1;
    renderHydrationGame();
    if (hydrationCountdown <= 0) {
      clearInterval(hydrationInterval);
      hydrationInterval = null;
      hydrationGameActive = false;
      hydrationTimer.textContent =
        hydrationClicks >= 20
          ? "Bottle filled! Great job."
          : "Time's up! Try again.";
    }
  }, 1000);
});

tapHydration.addEventListener("click", () => {
  if (!hydrationGameActive) return;
  hydrationClicks = Math.min(20, hydrationClicks + 1);
  renderHydrationGame();
});

let focusGameActive = false;
let focusSeconds = 0;
let focusInterval = null;
let lastFocusTap = Date.now();

const renderFocusGame = () => {
  focusScore.textContent = `Streak: ${focusSeconds}s`;
  focusTimer.textContent = focusGameActive ? "Stay focused!" : "Ready";
};

startFocusGame.addEventListener("click", () => {
  if (focusGameActive) return;
  focusGameActive = true;
  focusSeconds = 0;
  lastFocusTap = Date.now();
  renderFocusGame();
  focusInterval = setInterval(() => {
    const now = Date.now();
    if (now - lastFocusTap > 5000) {
      focusGameActive = false;
      clearInterval(focusInterval);
      focusInterval = null;
      focusTimer.textContent = "Focus lost. Restart!";
      return;
    }
    focusSeconds += 1;
    renderFocusGame();
    if (focusSeconds >= 30) {
      focusGameActive = false;
      clearInterval(focusInterval);
      focusInterval = null;
      focusTimer.textContent = "Sprint complete!";
    }
  }, 1000);
});

focusHold.addEventListener("click", () => {
  if (!focusGameActive) return;
  lastFocusTap = Date.now();
  focusTimer.textContent = "Nice! Keep breathing.";
});

renderFocusGame();

const mindfulActions = [
  "Take 3 deep breaths.",
  "Roll your shoulders and relax your jaw.",
  "Sip water and stretch your neck.",
  "Close your eyes for 10 seconds.",
  "Do a 20-second posture check.",
  "Smile and release tension in your hands.",
];

mindfulGrid.addEventListener("click", (event) => {
  if (event.target.tagName !== "BUTTON") return;
  const action =
    mindfulActions[Math.floor(Math.random() * mindfulActions.length)];
  mindfulResult.textContent = action;
});

premiumButton.addEventListener("click", () => {
  premiumStatus.textContent =
    "Premium button tapped. Billing integration will connect once your product ID is provided.";
  alert("Premium setup pending. We'll connect Google Play Billing next.");
});

addMessage(
  "Hello! I'm your offline wellness companion. Ask about cold, sleep, stress, or routines.",
  "bot"
);
