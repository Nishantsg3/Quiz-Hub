/* script.js - main logic for Quiz Hub
   Uses QUIZZES from data.js (must be loaded before this file) */

$(function () {
  // DOM references
  const $year = $("#year");
  if ($year.length) $year.text(new Date().getFullYear());
  const $homeScreen = $("#homeScreen");
  const $quizList = $("#quizList");
  const $quizScreen = $("#quizScreen");
  const $resultScreen = $("#resultScreen");
  const $progressScreen = $("#progressScreen");

  const $quizTitle = $("#quizTitle");
  const $progressText = $("#progressText");
  const $questionText = $("#questionText");
  const $optionsWrap = $("#optionsWrap");
  const $qTime = $("#qTime");
  const $grandTime = $("#grandTime");

  const $prevBtn = $("#prevBtn");
  const $nextBtn = $("#nextBtn");
  const $quitBtn = $("#quitBtn");
  const $restartBtn = $("#restartBtn");
  const $backHomeBtn = $("#backHomeBtn");

  const $progressViewBtn = $("#progressViewBtn");
  const $homeBtn = $("#homeBtn");
  const $progressQuizSelect = $("#progressQuizSelect");
  const $clearAttemptsBtn = $("#clearAttemptsBtn");
  const ctx = document.getElementById("progressChart")
    ? document.getElementById("progressChart").getContext("2d")
    : null;
  let progressChart = null;

  // local state
  let currentQuizIndex = null;
  let currentQuestionIndex = 0;
  let currentScore = 0;
  const Q_TIME = 30; // per-question seconds
  let qTimer = null;
  let qTimeLeft = Q_TIME;
  let grandTimeLeft = 0;
  let grandTimer = null;

  // storage key
  const STORAGE_KEY = "quiz_hub_attempts_v1";

  // RENDER home quiz cards
  function renderQuizList() {
    $quizList.empty();
    QUIZZES.forEach((quiz) => {
      const card = $(`
        <div class="col-12 col-md-6 col-lg-4">
          <div class="card quiz-card h-100">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${quiz.title}</h5>
              <p class="card-text text-muted mb-3">10 Questions • 30s per question</p>
              <div class="mt-auto d-flex gap-2">
                <button class="btn btn-sm btn-primary start-quiz" data-id="${quiz.id}">Start</button>
                <button class="btn btn-sm btn-outline-secondary view-progress" data-id="${quiz.id}">Progress</button>
              </div>
            </div>
          </div>
        </div>
      `);
      $quizList.append(card);
    });
  }

  // show/hide helpers
  function showHome() {
    $homeScreen.show();
    $quizScreen.hide();
    $resultScreen.hide();
    $progressScreen.hide();
  }
  function showQuiz() {
    $homeScreen.hide();
    $quizScreen.show();
    $resultScreen.hide();
    $progressScreen.hide();
  }
  function showResult() {
    $homeScreen.hide();
    $quizScreen.hide();
    $resultScreen.show();
    $progressScreen.hide();
  }
  function showProgress() {
    $homeScreen.hide();
    $quizScreen.hide();
    $resultScreen.hide();
    $progressScreen.show();
  }

  // localStorage helpers for attempts
  function loadAttempts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
  function saveAttempts(obj) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  }
  function pushAttempt(quizId, score) {
    const all = loadAttempts();
    if (!all[quizId]) all[quizId] = [];
    all[quizId].push(score);
    if (all[quizId].length > 20) all[quizId].shift(); // keep last 20
    saveAttempts(all);
  }
  function getAttempts(quizId) {
    const all = loadAttempts();
    return all[quizId] || [];
  }
  function clearAttempts(quizId) {
    const all = loadAttempts();
    delete all[quizId];
    saveAttempts(all);
  }

  // START quiz with given quiz id
  function startQuiz(quizId) {
    currentQuizIndex = QUIZZES.findIndex((q) => q.id === quizId);
    if (currentQuizIndex === -1) return;
    currentQuestionIndex = 0;
    currentScore = 0;
    grandTimeLeft = Q_TIME * QUIZZES[currentQuizIndex].questions.length;
    renderQuestion();
    startGrandTimer();
    showQuiz();
  }

  // render question
  function renderQuestion() {
    const quiz = QUIZZES[currentQuizIndex];
    const qObj = quiz.questions[currentQuestionIndex];
    $quizTitle.text(quiz.title);
    $progressText.text(
      `Question ${currentQuestionIndex + 1} of ${quiz.questions.length}`
    );
    $questionText.text(qObj.q);

    // build options
    $optionsWrap.empty();
    qObj.options.forEach((opt, idx) => {
      const item = $(`
        <div class="list-group-item" data-idx="${idx}" role="radio" tabindex="0" aria-checked="false">
          <span class="radio-mark" aria-hidden="true"></span>
          <div class="option-text flex-grow-1">${opt}</div>
        </div>
      `);
      $optionsWrap.append(item);
    });

    // prev button enable/disable
    $prevBtn.prop("disabled", currentQuestionIndex === 0);

    // reset timers
    resetQTimer();
    startQTimer();
  }

  // selection handler
  $optionsWrap.on("click", ".list-group-item", function () {
    $optionsWrap
      .children()
      .removeClass("selected")
      .attr("aria-checked", "false");
    $(this).addClass("selected").attr("aria-checked", "true");
  });
  $optionsWrap.on("keydown", ".list-group-item", function (e) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      $(this).trigger("click");
    }
  });

  // next/save selection
  function saveAndNext() {
    const $sel = $optionsWrap.find(".list-group-item.selected");
    const selIdx = $sel.length ? Number($sel.attr("data-idx")) : null;
    const quiz = QUIZZES[currentQuizIndex];

    if (selIdx !== null && selIdx === quiz.questions[currentQuestionIndex].a) {
      currentScore++;
    }

    clearQTimer();
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.questions.length) {
      renderQuestion();
    } else {
      finishQuiz();
    }
  }

  // previous
  function goPrevious() {
    if (currentQuestionIndex > 0) {
      clearQTimer();
      currentQuestionIndex--;
      renderQuestion();
    }
  }

  // finish
  function finishQuiz() {
    clearQTimer();
    clearGrandTimer();
    pushAttempt(QUIZZES[currentQuizIndex].id, currentScore);
    $("#finalScore").text(
      `${currentScore} / ${QUIZZES[currentQuizIndex].questions.length}`
    );
    const pct = Math.round(
      (currentScore / QUIZZES[currentQuizIndex].questions.length) * 100
    );
    let msg = "Good attempt!";
    if (pct === 100) msg = "Perfect!";
    else if (pct >= 80) msg = "Great job!";
    else if (pct >= 50) msg = "Nice effort!";
    else msg = "Keep practicing!";
    $("#finalMessage").text(msg);
    showResult();
  }

  // QUIT/RESTART handlers
  function quitToHome() {
    clearQTimer();
    clearGrandTimer();
    showHome();
  }
  function restartToHome() {
    clearQTimer();
    clearGrandTimer();
    showHome();
  }

  // Q timer functions
  function startQTimer() {
    qTimeLeft = Q_TIME;
    $qTime.text(qTimeLeft + "s");
    qTimer = setInterval(() => {
      qTimeLeft--;
      $qTime.text(qTimeLeft + "s");
      if (qTimeLeft <= 0) {
        clearInterval(qTimer);
        // no selection counts as wrong; move next automatically
        saveAndNext();
      }
    }, 1000);
  }
  function resetQTimer() {
    clearInterval(qTimer);
    qTimeLeft = Q_TIME;
    $qTime.text(qTimeLeft + "s");
  }
  function clearQTimer() {
    clearInterval(qTimer);
  }

  // Grand timer functions (total time remaining for quiz)
  function startGrandTimer() {
    $grandTime.text(formatTime(grandTimeLeft));
    grandTimer = setInterval(() => {
      grandTimeLeft--;
      $grandTime.text(formatTime(grandTimeLeft));
      if (grandTimeLeft <= 0) {
        clearInterval(grandTimer);
        // time's up overall - finish quiz immediately
        finishQuiz();
      }
    }, 1000);
  }
  function clearGrandTimer() {
    clearInterval(grandTimer);
  }
  function formatTime(seconds) {
    const mm = Math.floor(seconds / 60);
    const ss = seconds % 60;
    return `${mm}:${ss.toString().padStart(2, "0")}`;
  }

  // PROGRESS CHART (line chart) using Chart.js
  function drawProgressChart(quizId) {
    if (!ctx) return;
    const attempts = getAttempts(quizId);
    const labels = attempts.map((v, i) => `Attempt ${i + 1}`);
    const data = attempts;
    if (progressChart) progressChart.destroy();
    progressChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Score",
            data,
            borderColor: "#0d6efd",
            backgroundColor: "rgba(13,110,253,0.15)",
            tension: 0.3,
            fill: true,
            pointRadius: 6,
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true, suggestedMax: 10 },
        },
      },
    });
  }

  // init progress select
  function populateProgressSelect() {
    $progressQuizSelect.empty();
    QUIZZES.forEach((q) => {
      $progressQuizSelect.append(`<option value="${q.id}">${q.title}</option>`);
    });
  }

  // clear attempts for selected quiz
  $clearAttemptsBtn.on("click", function () {
    const id = Number($progressQuizSelect.val());
    clearAttempts(id);
    drawProgressChart(id);
  });

  // event bindings
  $quizList.on("click", ".start-quiz", function () {
    const id = Number($(this).attr("data-id"));
    startQuiz(id);
  });

  $quizList.on("click", ".view-progress", function () {
    const id = Number($(this).attr("data-id"));
    $progressQuizSelect.val(id);
    drawProgressChart(id);
    showProgress();
  });

  $nextBtn.on("click", saveAndNext);
  $prevBtn.on("click", goPrevious);
  $quitBtn.on("click", quitToHome);
  $restartBtn.on("click", restartToHome);
  $backHomeBtn.on("click", showHome);

  $homeBtn.on("click", showHome);
  $progressViewBtn.on("click", function () {
    // default to first quiz
    $progressQuizSelect.val(QUIZZES[0].id);
    drawProgressChart(QUIZZES[0].id);
    showProgress();
  });

  $progressQuizSelect.on("change", function () {
    const id = Number($(this).val());
    drawProgressChart(id);
  });

  // initial render
  function init() {
    renderQuizList();
    populateProgressSelect();
    showHome();
  }
  init();
});
