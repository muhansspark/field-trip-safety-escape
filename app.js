const SETTINGS = { questionSeconds: 15, feedbackSeconds: 5, startScore: 100 };

const zones = {
  departure: { name: "출발·버스", icon: "🚌", stamp: "버스 안전" },
  travel: { name: "이동·휴게소", icon: "🧭", stamp: "이동 안전" },
  activity: { name: "관람·체험", icon: "🎟️", stamp: "질서 안전" },
  life: { name: "식사·생활", icon: "🥢", stamp: "생활 안전" },
  return: { name: "귀가", icon: "🏁", stamp: "귀가 확인" },
  lodging: { name: "숙소", icon: "🌙", stamp: "숙소 안전" },
};

const questions = [
  { id:1, zone:"departure", prompt:"출발 전 인원점검입니다.", choices:["내 반 줄에 선다.","친구를 찾으러 간다.","간식을 사러 간다."], answer:0, feedback:"줄에 서서 인원을 확인합니다." },
  { id:2, zone:"departure", prompt:"버스 타기 전, 어지럽고 속이 좋지 않습니다.", choices:["출발 전 선생님께 알린다.","참다가 심해지면 말한다.","친구에게만 말한다."], answer:0, feedback:"몸 상태는 미리 알립니다." },
  { id:3, zone:"departure", prompt:"안전벨트가 꼬이고 헐겁습니다.", choices:["팔걸이에 걸친다.","꼬임을 풀고 몸에 맞춘다.","친구와 번갈아 맨다."], answer:1, feedback:"안전벨트는 몸에 맞게 맵니다." },
  { id:4, zone:"departure", prompt:"비상망치와 소화기가 보입니다.", choices:["장난으로 만져 본다.","위치만 확인하고 손대지 않는다.","필요해지면 그때 찾는다."], answer:1, feedback:"비상 장비의 위치를 확인합니다." },
  { id:5, zone:"departure", prompt:"버스가 달리는 중, 친구가 충전기를 빌려 달라고 합니다.", choices:["통로로 가서 전달한다.","정차한 뒤 전달한다.","앞자리로 던져 준다."], answer:1, feedback:"주행 중에는 자리에 앉습니다." },
  { id:6, zone:"departure", prompt:"앞문으로 내리려는데 자전거가 지나갑니다.", choices:["자전거보다 먼저 내린다.","문 앞에 계속 서 있는다.","지나간 뒤 주변을 보고 내린다."], answer:2, feedback:"주변을 확인한 뒤 내립니다." },
  { id:7, zone:"travel", prompt:"휴게소 주차장을 건너야 합니다.", choices:["차량 사이로 간다.","보행 통로로 간다.","후진 차량 뒤로 간다."], answer:1, feedback:"차량 사이 대신 보행 통로를 이용합니다." },
  { id:8, zone:"travel", prompt:"현재 2:16, 집결 2:20. 버스까지 3분이고 매점 줄에는 5명이 있습니다.", choices:["시간을 알리고 버스로 돌아간다.","줄이 줄어들면 산다.","선생님이 찾으면 간다."], answer:0, feedback:"집결 시간을 우선합니다." },
  { id:9, zone:"travel", prompt:"초록불 횡단보도입니다.", choices:["휴대전화를 보며 걷는다.","친구만 따라간다.","휴대전화를 넣고 좌우를 본다."], answer:2, feedback:"신호와 차량을 함께 확인합니다." },
  { id:10, zone:"activity", prompt:"체험 도구가 있지만 안전 설명은 아직 끝나지 않았습니다.", choices:["도구를 먼저 만진다.","설명이 끝날 때까지 기다린다.","친구가 하는 것을 따라 한다."], answer:1, feedback:"안내를 들은 뒤 활동합니다." },
  { id:11, zone:"activity", prompt:"관람장 입구가 붐빕니다.", choices:["앞사람을 민다.","줄 안에서 간격을 지킨다.","줄 밖으로 빠져나간다."], answer:1, feedback:"밀지 않고 줄을 지킵니다." },
  { id:12, zone:"activity", prompt:"공연 시작 전 관람석에 앉았습니다.", choices:["출입구와 통로를 확인한다.","시작할 때까지 기다린다.","다른 구역으로 이동한다."], answer:0, feedback:"대피 통로를 미리 확인합니다." },
  { id:13, zone:"life", prompt:"식사 전입니다.", choices:["물로 손끝만 적신다.","식사 후에 씻는다.","비누로 손을 씻는다."], answer:2, feedback:"식사 전에는 비누로 손을 씻습니다." },
  { id:14, zone:"life", prompt:"알레르기가 있어 먹으면 안 되는 재료가 들어갔을 수 있습니다.", choices:["한 입 먹어 본다.","선생님께 재료를 확인한다.","친구 식판과 바꾼다."], answer:1, feedback:"알레르기 음식은 먹기 전에 확인합니다." },
  { id:15, zone:"life", prompt:"친구들을 놓쳤습니다. 현재는 공룡 전시관 입구입니다.", choices:["혼자 다음 전시관으로 간다.","어딘지 모르겠다고만 연락한다.","현재 위치를 구체적으로 알린다."], answer:2, feedback:"현재 위치를 구체적으로 알립니다." },
  { id:16, zone:"life", prompt:"친구가 갑자기 몸이 좋지 않다고 합니다.", choices:["선생님께 바로 알린다.","물만 마시게 한다.","친구들끼리 쉬게 한다."], answer:0, feedback:"학생끼리 판단하지 말고 알립니다." },
  { id:17, zone:"life", prompt:"친구가 원하지 않는 사진을 SNS에 올리려 합니다.", choices:["재미있으면 올린다.","촬영·공유를 멈추고 알린다.","AI 딥페이크로 바꾸면 올린다."], answer:1, feedback:"동의 없는 촬영과 공유는 멈춥니다." },
  { id:18, zone:"return", prompt:"귀가 버스입니다. 정해진 좌석에 앉으라는 안내가 나왔습니다.", choices:["친구 옆 다른 좌석에 앉는다.","정해진 좌석에 앉는다.","통로에서 친구를 기다린다."], answer:1, feedback:"정해진 좌석에서 인원점검을 받습니다." },
  { id:19, zone:"return", prompt:"하차 직전, 좌석에 휴대전화·파우치·과자 봉지가 보입니다.", choices:["모두 가방에 넣고 내린다.","잃어버리면 그때 선생님께 묻는다.","휴대전화만 챙긴다."], answer:0, feedback:"소지품과 쓰레기를 모두 챙깁니다." },
  { id:20, zone:"lodging", prompt:"숙소에 도착했습니다. 계단·소화전·소화기가 보입니다.", choices:["위치를 확인한다.","나중에 친구에게 묻는다.","방으로 먼저 뛰어간다."], answer:0, feedback:"도착하면 대피 경로를 확인합니다." },
  { id:21, zone:"lodging", prompt:"숙소 방에 발코니 난간이 보입니다.", choices:["난간에 올라간다.","실내에 머물고 난간을 넘지 않는다.","난간에 기대 사진을 찍는다."], answer:1, feedback:"난간을 넘거나 기대지 않습니다." },
  { id:22, zone:"lodging", prompt:"취침 시간입니다.", choices:["조용히 쉬고 잠자리에 든다.","다른 방 친구를 부른다.","복도에서 이야기한다."], answer:0, feedback:"취침 시간에는 조용히 쉽니다." },
  { id:23, zone:"lodging", prompt:"숙소에서 화재경보가 울립니다.", choices:["가방부터 챙긴다.","선생님 안내에 따라 계단으로 간다.","엘리베이터를 탄다."], answer:1, feedback:"짐을 두고 계단으로 대피합니다." },
  { id:24, zone:"lodging", prompt:"엘리베이터가 멈췄습니다.", choices:["문을 손으로 벌린다.","비상호출 버튼을 누르고 기다린다.","천장 탈출구를 찾는다."], answer:1, feedback:"비상호출로 도움을 요청합니다." },
  { id:25, zone:"lodging", prompt:"퇴실 전, 바닥 매트와 침구를 정리해야 합니다.", choices:["내 이불만 접고, 공용 물건은 내버려둔다.","침구를 정리하고 물건을 확인한다.","다음 사람이 정리하게 둔다."], answer:1, feedback:"정리와 소지품 확인 후 퇴실합니다." },
].map(q => ({ ...q, image:`assets/game/q${String(q.id).padStart(2,"0")}.png` }));

const app = document.querySelector("#app");
const announcer = document.querySelector("#announcer");
let timerId = null;
let feedbackTimerId = null;
let feedbackVisualId = null;
let state = createState();

function createState() {
  return { mode:null, active:[], index:0, score:SETTINGS.startScore, firstCorrect:0, recovered:0, missed:0, mistakes:new Set(), retrying:false, disabledChoices:new Set(), completedZones:new Set() };
}

function clearTimers() {
  clearInterval(timerId);
  clearInterval(feedbackVisualId);
  clearTimeout(feedbackTimerId);
  timerId = feedbackTimerId = feedbackVisualId = null;
}

function announce(message) {
  announcer.textContent = "";
  requestAnimationFrame(() => { announcer.textContent = message; });
}

function renderStart() {
  clearTimers();
  state = createState();
  app.innerHTML = `<main class="start-screen">
    <section class="start-copy">
      <p class="kicker">FIELD TRIP SAFETY MISSION</p>
      <h1>현장체험학습<br><span>안전 미션</span></h1>
      <p class="start-lead">사진 속 실제 상황을 보고, 내가 할 행동을 선택하세요.</p>
      <div class="route-mini" aria-hidden="true"><span>학교</span><i></i><span>버스</span><i></i><span>체험</span><i></i><span>귀가</span></div>
    </section>
    <section class="start-panel" aria-labelledby="mode-title">
      <div class="notice"><strong>이미지 안내</strong><p>이 게임의 이미지는 생성형 AI로 만든 학습용 가상 장면입니다. 일부 형태나 배치가 실제 현장과 다를 수 있습니다. 실제 체험학습에서는 현장의 안전 안내와 지도교사의 지도를 따라 주세요.</p></div>
      <h2 id="mode-title">체험 유형을 선택하세요</h2>
      <div class="mode-grid">
        <button class="mode-card" data-mode="day"><span class="mode-icon">☀️</span><strong>비숙박형</strong><small>공통 19문항</small></button>
        <button class="mode-card" data-mode="stay"><span class="mode-icon">🌙</span><strong>숙박형</strong><small>공통 19 + 숙박 6문항</small></button>
      </div>
      <p class="microcopy">개인정보를 입력하거나 저장하지 않습니다.</p>
    </section>
  </main>`;
  document.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => startGame(button.dataset.mode)));
}

function startGame(mode) {
  state = createState();
  state.mode = mode;
  state.active = questions.filter(q => mode === "stay" || q.id <= 19);
  preloadImage(state.active[0]?.image);
  preloadImage(state.active[1]?.image);
  renderQuestion();
}

function renderQuestion(seconds = SETTINGS.questionSeconds) {
  clearTimers();
  const q = state.active[state.index];
  const zone = zones[q.zone];
  const progress = ((state.index + 1) / state.active.length) * 100;
  app.innerHTML = `<main class="game-screen">
    <header class="game-header">
      <div class="brand-mark"><span>안전 미션</span><strong>${zone.icon} ${zone.name}</strong></div>
      <div class="progress-wrap" aria-label="전체 진행도"><div class="progress-track"><span style="width:${progress}%"></span></div><small>${state.index + 1} / ${state.active.length}</small></div>
      <div class="score-box"><small>점수</small><strong>${state.score}</strong></div>
    </header>
    <section class="mission-card">
      <figure class="scene-frame"><img src="${q.image}" alt="${q.prompt}" /></figure>
      <div class="question-area">
        <div class="question-meta"><span>MISSION ${String(q.id).padStart(2,"0")}</span><div class="timer" aria-label="남은 시간"><strong id="timerText">${seconds}</strong><small>초</small></div></div>
        <div class="timer-track"><span id="timerBar"></span></div>
        ${state.retrying ? `<p class="retry-note">안전한 선택을 다시 골라 보세요. 정답이면 +3점</p>` : ""}
        <h2>${q.prompt}</h2>
        <div class="choices">${q.choices.map((choice, index) => `<button class="choice" data-choice="${index}" ${state.disabledChoices.has(index) ? "disabled" : ""}><span>${index + 1}</span><strong>${choice}</strong></button>`).join("")}</div>
      </div>
    </section>
  </main>`;
  document.querySelectorAll(".choice").forEach(button => button.addEventListener("click", () => chooseAnswer(Number(button.dataset.choice))));
  startQuestionTimer(seconds);
  preloadImage(state.active[state.index + 1]?.image);
}

function startQuestionTimer(seconds) {
  const startedAt = performance.now();
  const duration = seconds * 1000;
  const text = document.querySelector("#timerText");
  const bar = document.querySelector("#timerBar");
  const tick = () => {
    const remaining = Math.max(0, duration - (performance.now() - startedAt));
    const shown = Math.ceil(remaining / 1000);
    if (text) text.textContent = shown;
    if (bar) {
      bar.style.width = `${(remaining / duration) * 100}%`;
      bar.classList.toggle("urgent", shown <= 5);
    }
    if (remaining <= 0) {
      clearInterval(timerId);
      state.missed += 1;
      showFeedback("timeout");
    }
  };
  tick();
  timerId = setInterval(tick, 100);
}

function chooseAnswer(choiceIndex) {
  clearInterval(timerId);
  const q = state.active[state.index];
  if (choiceIndex === q.answer) {
    if (state.retrying) {
      state.score += 3;
      state.recovered += 1;
      showFeedback("recovered");
    } else {
      state.score += 10;
      state.firstCorrect += 1;
      showFeedback("correct");
    }
    return;
  }
  if (state.retrying) {
    state.disabledChoices.add(choiceIndex);
    showFeedback("retry-wrong");
    return;
  }
  state.score -= 5;
  state.mistakes.add(q.id);
  state.disabledChoices.add(choiceIndex);
  showFeedback("wrong");
}

function showFeedback(type) {
  clearTimers();
  const q = state.active[state.index];
  const correctChoice = q.choices[q.answer];
  const isGood = type === "correct" || type === "recovered";
  const canRetry = type === "wrong" || type === "retry-wrong";
  const title = type === "correct" ? "안전한 선택! +10점" : type === "recovered" ? "안전 수칙 확인! +3점" : type === "timeout" ? "시간이 끝났어요" : type === "retry-wrong" ? "다른 선택을 살펴보세요" : "한 번 더 생각해 볼까요? -5점";
  const detail = type === "timeout" ? `안전한 선택: ${correctChoice}` : q.feedback;
  app.innerHTML = `<main class="feedback-screen ${isGood ? "good" : "check"}">
    <section class="feedback-card">
      <div class="feedback-top"><span>${isGood ? "✓" : "!"}</span><small>${state.index + 1} / ${state.active.length}</small></div>
      <p class="kicker">${zones[q.zone].name}</p>
      <h2>${title}</h2>
      <p class="feedback-line">${detail}</p>
      ${canRetry ? `<button class="retry-button" id="retryAnswer">다시 선택하기 <small>정답이면 +3점</small></button>` : ""}
      <button class="next-button" id="nextQuestion">다음 문항 <span>→</span></button>
      <div class="feedback-countdown"><span id="feedbackBar"></span></div>
      <p class="auto-copy"><strong id="feedbackSeconds">${SETTINGS.feedbackSeconds}</strong>초 뒤 자동으로 이동합니다.</p>
    </section>
  </main>`;
  document.querySelector("#nextQuestion").addEventListener("click", advanceQuestion);
  document.querySelector("#retryAnswer")?.addEventListener("click", () => {
    clearTimers();
    state.retrying = true;
    renderQuestion(5);
  });
  startFeedbackTimer();
  announce(`${title}. ${detail}`);
}

function startFeedbackTimer() {
  const startedAt = performance.now();
  const duration = SETTINGS.feedbackSeconds * 1000;
  const bar = document.querySelector("#feedbackBar");
  const text = document.querySelector("#feedbackSeconds");
  const tick = () => {
    const remaining = Math.max(0, duration - (performance.now() - startedAt));
    if (bar) bar.style.width = `${(remaining / duration) * 100}%`;
    if (text) text.textContent = Math.ceil(remaining / 1000);
  };
  tick();
  feedbackVisualId = setInterval(tick, 100);
  feedbackTimerId = setTimeout(advanceQuestion, duration);
}

function advanceQuestion() {
  clearTimers();
  const completed = state.active[state.index];
  const next = state.active[state.index + 1];
  if (!next || next.zone !== completed.zone) state.completedZones.add(completed.zone);
  if (!next) return renderFinish();
  state.index += 1;
  state.retrying = false;
  state.disabledChoices = new Set();
  renderQuestion();
}

function renderFinish() {
  clearTimers();
  const notebook = [...new Set(state.active.map(q => q.feedback))];
  app.innerHTML = `<main class="finish-screen">
    <section class="finish-hero">
      <p class="kicker">MISSION COMPLETE</p>
      <h1>안전 미션<br><span>완료!</span></h1>
      <p>현장에서도 오늘의 선택을 기억하세요.</p>
      <div class="final-score"><small>최종 점수</small><strong>${state.score}</strong><span>점</span></div>
      <div class="result-stats"><span>첫 정답 <b>${state.firstCorrect}</b></span><span>다시 성공 <b>${state.recovered}</b></span><span>시간 초과 <b>${state.missed}</b></span></div>
      <div class="stamps">${[...state.completedZones].map(id => `<div><span>${zones[id].icon}</span><small>${zones[id].stamp}</small></div>`).join("")}</div>
      <button class="restart-button" id="restart">처음부터 다시 하기</button>
    </section>
    <section class="notebook">
      <div class="notebook-head"><span>현장체험학습</span><h2>나의 안전 수첩</h2><small>${state.mode === "stay" ? "숙박형 25문항" : "비숙박형 19문항"}</small></div>
      <ol>${notebook.map(rule => `<li>${rule}</li>`).join("")}</ol>
    </section>
  </main>`;
  document.querySelector("#restart").addEventListener("click", renderStart);
}

function preloadImage(src) {
  if (!src) return;
  const image = new Image();
  image.src = src;
}

renderStart();
