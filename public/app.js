'use strict';

// ---------- 기본 작성 샘플 템플릿 (하나생명 서면청약 작성 샘플 기준, '작성 샘플' 탭에서 수정 가능) ----------
// mode: 'content' = 샘플과 내용 대조, 'presence' = 작성 여부만 확인(성명·서명 등),
//       'cond' = 해당 시에만 작성(미성년자 친권자, 지정대리청구인 등) → '해당없음' 선택 가능
const F = (name, fix, mode = 'content') => ({ name, mode, fix });
const DEFAULT_TEMPLATE = [
  { code: 'UW01', title: '보험계약청약서', note: '', fields: [
    F('회사명란', '회사명작성'),
    F('하시는일란', '하시는일 구체적으로 작성'),
    F('계약자 성명', '계약자 성명 작성', 'presence'),
    F('계약자 서명', '계약자 서명', 'presence'),
    F('주피보험자 성명', '주피보험자 성명 작성', 'presence'),
    F('주피보험자 서명', '주피보험자 서명', 'presence'),
    F('법정대리인(친권자)란', '계약자 미성년자로 친권자 성명 서명 관계 작성', 'cond'),
    F('친권자 1인 서명란', '친권자 1인 서명으로 서명 관계 작성', 'cond'),
    F('청약일자란', '청약일자 작성'),
  ]},
  { code: 'UW02', title: '보험계약청약서(실소유자·e안내장·면담보고서)', note: '고객면담보고서 정정 시 정정서명은 설계사 서명', fields: [
    F('실제소유자여부란', '예 아니오 체크'),
    F('보험수익자 지정변경 추가약정란', '예 아니오 체크 후 계약자 서명'),
    F('e안내장 수신동의란', '예 체크 후 계약자 서명'),
    F('승낙거절 안내 수신동의란', '예 체크 후 계약자 서명'),
    F('고객면담보고서 소득현황란', '소득현황 작성'),
    F('고객면담보고서 자산현황란', '자산현황 작성'),
    F('면담일시란', '면담일시 년월일시분 작성'),
    F('모집경로란', '모집경로 체크'),
    F('보험설계사 서명', '보험설계사 서명', 'presence'),
    F('계약자 실명확인란', '실명확인증표 발급기관 발급일자 작성'),
    F('거래자금 원천 및 출처란', '해당 항목 체크'),
    F('보험가입 목적란', '해당 항목 체크'),
  ]},
  { code: 'UW03', title: '계약 전 알릴 의무사항', note: '작성기준은 피보험자 기준, 정정 시 정정서명은 피보험자 서명', fields: [
    F('질문 1~5번 체크란', '주피보험자 예 아니오 체크'),
    F('질병 상세내용란', '예 체크 문항 진단명 치료기간 치료병원 작성', 'cond'),
    F('직업란', '근무처 회사명 근무지역 업종 취급업무 작성'),
    F('직업 가필란', '가필 따라쓰기란 작성'),
    F('운전차종란', '운전차종 체크'),
    F('운전란', '가필 따라쓰기란 작성'),
    F('취미 기타 질문 체크란', '예 아니오 체크'),
    F('월소득 키 몸무게란', '월소득 키 몸무게 작성'),
    F('하단 가필란', '가필 따라쓰기란 작성'),
    F('청약일자란', '청약일자 작성'),
    F('계약자 성명', '계약자 성명 작성', 'presence'),
    F('계약자 서명', '계약자 서명', 'presence'),
    F('주피보험자 성명', '주피보험자 성명 작성', 'presence'),
    F('주피보험자 서명', '주피보험자 서명', 'presence'),
    F('법정대리인(친권자)란', '계약자 미성년자로 친권자 성명 서명 작성', 'cond'),
  ]},
  { code: 'UW05', title: '보험료 이체 및 송금계좌 동의신청서', note: '', fields: [
    F('계좌번호기재일시란', '계좌번호기재일시 작성'),
    F('제1회 보험료란', '즉시이체 신용카드 체크 및 예금주 은행명 계좌번호 작성'),
    F('제2회 이후 보험료란', '이체방법 체크 및 예금주 은행명 계좌번호 작성'),
    F('자동이체 계좌이체일란', '이체일 체크'),
    F('송금계좌란', '송금계좌 체크 및 은행명 계좌번호 작성'),
    F('개인신용정보 수집이용 동의란', '동의함 체크'),
    F('개인신용정보 제공 동의란', '동의함 체크'),
    F('예금주 서명란', '예금주 서명', 'presence'),
    F('법정대리인(친권자)란', '계약자 미성년자로 친권자 성명 서명 관계 작성', 'cond'),
  ]},
  { code: '상품설명서', title: '상품설명서 확인란 (21~26쪽)', note: '', fields: [
    F('21p 모집자확인란', '청약일자 작성 및 보험설계사 서명'),
    F('21p 보험계약자확인란', '청약일자 작성 및 보험계약자 서명'),
    F('22p 주요내용확인서 1~6번', '예 아니오 체크'),
    F('22p 7~9번 가필란', '가필 따라쓰기란 작성'),
    F('22p 10번', '예 아니오 체크'),
    F('23p 11~15번', '해당 항목 체크'),
    F('23p 모집자확인란', '청약일자 작성 및 보험설계사 서명'),
    F('23p 설명듣고 이해 가필란', '가필 따라쓰기란 작성'),
    F('23p 보험계약자확인란', '청약일자 작성 및 보험계약자 서명'),
    F('25p 강화된 설명확인서 동의란', '동의 미동의 체크 및 해당사항 체크'),
    F('25p 신청인 서명란', '년월일 작성 및 신청인 서명'),
    F('26p 고객확인 판매인확인 체크란', '확인란 체크'),
    F('26p 보험가입서류 수령 확인란', '확인란 체크'),
    F('26p 작성일자 판매인 계약자 서명란', '작성일자 작성 및 판매인 계약자 서명'),
  ]},
  { code: 'UW13', title: '[필수] 계약체결·이행 상세 동의서(수집·이용)', note: '', fields: [
    F('고유식별정보 수집이용 동의란', '동의함 체크'),
    F('민감정보 수집이용 동의란', '동의함 체크'),
    F('개인신용정보 수집이용 동의란', '동의함 체크'),
  ]},
  { code: 'UW14', title: '[필수] 계약체결·이행 상세 동의서(제공)', note: '', fields: [
    F('고유식별정보 제공 동의란', '동의함 체크'),
    F('민감정보 제공 동의란', '동의함 체크'),
    F('개인신용정보 제공 동의란', '동의함 체크'),
    F('국외 민감정보 제공 동의란', '동의함 체크'),
    F('국외 개인신용정보 제공 동의란', '동의함 체크'),
  ]},
  { code: 'UW15', title: '[필수] 계약체결·이행 상세 동의서(조회)', note: '', fields: [
    F('고유식별정보 조회 동의란', '동의함 체크'),
    F('민감정보 조회 동의란', '동의함 체크'),
    F('개인신용정보 조회 동의란', '동의함 체크'),
    F('작성일자란', '년월일 작성'),
    F('계약자 피보험자 성명 서명란', '계약자 피보험자 성명 서명', 'presence'),
    F('수익자 성명 서명란', '만기 입원장해 사망수익자 성명 서명 작성'),
    F('지정대리청구인란', '지정대리청구인 성명 서명 작성', 'cond'),
    F('법정대리인(친권자)란', '계약자 미성년자로 친권자 성명 서명 작성', 'cond'),
  ]},
  { code: 'UW16', title: '[선택] 상품소개 상세 동의서(수집·이용)', note: '', fields: [
    F('수집이용 동의란', '계약자 피보험자 동의 여부 체크'),
    F('광고성 정보 수신 동의란', '계약자 피보험자 동의 여부 체크'),
    F('수신방법 체크란', '동의함 체크 시 수신방법 체크'),
  ]},
  { code: 'UW17', title: '[선택] 상품소개 상세 동의서(제공)', note: '', fields: [
    F('제공 동의란', '계약자 피보험자 동의 여부 체크'),
    F('작성일자란', '년월일 작성'),
    F('계약자 피보험자 성명 서명란', '계약자 피보험자 성명 서명', 'presence'),
    F('법정대리인(친권자)란', '계약자 미성년자로 친권자 성명 서명 작성', 'cond'),
  ]},
  { code: 'UW18', title: '일반·전문금융소비자 여부 확인서', note: '', fields: [
    F('전문금융소비자 여부 확인란', '일반 전문금융소비자 체크'),
    F('일반금융소비자와 동일한 대우 확인란', '예 아니오 체크'),
    F('작성일자란', '년월일 작성'),
    F('보험계약자 서명', '보험계약자 서명', 'presence'),
    F('친권자/후견인란', '계약자 미성년자로 친권자 서명', 'cond'),
  ]},
  { code: 'UW19', title: '보험계약 이동에 따른 비교안내 확인서', note: '"예, 있습니다" 체크 시 UW20 비교내용 수기 기재', fields: [
    F('기존계약 유무 체크란', '예 아니오 체크'),
  ]},
  { code: 'UW20', title: '보험계약사항 비교 안내 자료', note: '해약환급금·공시이율 공란 시 고객 확인 후 수기 기재', fields: [
    F('기존계약 해약환급금란', '해약환급금 수기 기재', 'cond'),
    F('예정이자율 중 공시이율란', '공시이율 수기 기재', 'cond'),
    F('타사 승환 기존계약란', '타사 승환 계약내용 수기 기재', 'cond'),
  ]},
  { code: 'UW21', title: '보험계약 이동 유의사항 확인서', note: '', fields: [
    F('유의사항 가필란', '괄호안 가필 따라쓰기란 작성'),
    F('모집자확인 일자란', '년월일 작성'),
    F('모집인 지점장 성명 서명란', '모집인 지점장 성명 서명', 'presence'),
    F('계약자확인 일자란', '년월일 작성'),
    F('계약자 피보험자 성명 서명란', '계약자 피보험자 성명 서명', 'presence'),
    F('법정대리인(친권자)란', '계약자 미성년자로 친권자 성명 서명 작성', 'cond'),
  ]},
  { code: 'UW22', title: '보험차익 세제 관련 안내문', note: '', fields: [
    F('보험판매인 서명', '보험판매인 서명', 'presence'),
    F('보험계약자 서명', '보험계약자 서명', 'presence'),
    F('작성일자란', '년월일 작성'),
    F('친권자란', '계약자 미성년자로 친권자 서명', 'cond'),
  ]},
  { code: 'UW24', title: '지정대리 청구인 지정 신청서', note: '', fields: [
    F('지정여부 선택란', '지정함 지정하지아니함 체크'),
    F('지정하지아니함 사유란', '사유 체크', 'cond'),
    F('지정대리 청구인란', '청구인 성명 주민등록번호 관계 대표청구인 작성', 'cond'),
    F('작성일자란', '년월일 작성'),
    F('계약자 서명', '계약자 서명', 'presence'),
    F('친권자란', '계약자 미성년자로 친권자 서명', 'cond'),
  ]},
  { code: 'UW45', title: '본인 확인서(개인용)', note: '', fields: [
    F('해외납세의무자 확인란', '해당없음 해당있음 체크'),
    F('상단 일자 본인 성명 서명란', '년월일 작성 및 본인 성명 서명'),
    F('하단 본인확인 일자 본인 성명 서명란', '년월일 작성 및 본인 성명 서명'),
    F('법정대리인(친권자)란', '계약자 미성년자로 친권자 성명 서명 작성', 'cond'),
  ]},
  { code: 'UW50', title: '완전판매 모니터링(해피콜) 안내', note: '', fields: [
    F('작성일자란', '년월일 작성'),
    F('계약자 주피보험자 서명', '계약자 주피보험자 서명', 'presence'),
    F('친권자(후견인)란', '계약자 미성년자로 친권자 서명', 'cond'),
  ]},
  { code: 'HN01', title: '금융소비자보호를 위한 계약체결 종합확인서', note: '', fields: [
    F('모집종사자 중요사항 고지 확인란', '확인란 체크'),
    F('보험상품판매 중요사항 고지 확인란', '확인란 체크'),
    F('방문판매 안내 확인란', '확인란 체크'),
    F('계약자 설계사 성명란', '계약자 보험설계사 성명 작성', 'presence'),
    F('작성일자란', '년월일 작성'),
    F('보험계약자 서명', '보험계약자 서명', 'presence'),
  ]},
];

const STATUS = {
  ok: { label: '정상', cls: 'ok' },
  missing: { label: '미작성', cls: 'missing' },
  error: { label: '오류', cls: 'error' },
  fix: { label: '수정필요', cls: 'fix' },
  na: { label: '해당없음', cls: 'na' },
};
const PRESENCE_STATUS = ['ok', 'missing'];
const CONTENT_STATUS = ['ok', 'missing', 'error', 'fix'];
const COND_STATUS = ['na', 'ok', 'missing', 'error', 'fix'];
const statusOptions = (mode) => (mode === 'presence' ? PRESENCE_STATUS : mode === 'cond' ? COND_STATUS : CONTENT_STATUS);
const isDone = (s) => s === 'ok' || s === 'na';

const LS_TPL = 'uwcheck.template.v2';
const LS_CASES = 'uwcheck.cases.v1';

// ---------- 저장소 (브라우저 저장 실패 시 메모리로 동작) ----------
function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* 저장 불가 환경 */ }
}

let template = load(LS_TPL, structuredClone(DEFAULT_TEMPLATE));
let cases = load(LS_CASES, []);       // [{policy, checks:{'UW01|회사명란':{status,note}}, createdAt}]
let selected = cases[0]?.policy ?? null;
const sampleImages = {};              // code -> objectURL (세션 한정)
const scanImages = {};                // policy -> {code -> [objectURL]} (세션 한정, 개인정보 보호)

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const key = (code, name) => `${code}|${name}`;
const clean = (s) => String(s ?? '').trim().replace(/\s+/g, ' ').replace(/_/g, ' ');

function persist() { save(LS_TPL, template); save(LS_CASES, cases); }
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.remove('hidden');
  clearTimeout(toast.timer); toast.timer = setTimeout(() => t.classList.add('hidden'), 1800);
}
async function copy(text) {
  try { await navigator.clipboard.writeText(text); toast('복사했습니다'); }
  catch {
    const ta = document.createElement('textarea'); ta.value = text; document.body.append(ta);
    ta.select(); document.execCommand('copy'); ta.remove(); toast('복사했습니다');
  }
}

// ---------- 보완요청 문구 생성 ----------
// 형식: UW01_회사명란_회사명작성
function requestLines(c) {
  const lines = [];
  for (const page of template) {
    for (const f of page.fields) {
      const chk = c.checks[key(page.code, f.name)];
      if (!chk || isDone(chk.status)) continue;
      const action = clean(chk.note) || clean(f.fix) || STATUS[chk.status].label;
      lines.push(`${page.code}_${clean(f.name)}_${action}`);
    }
  }
  return lines;
}
function progress(c) {
  let total = 0, done = 0, bad = 0;
  for (const page of template) for (const f of page.fields) {
    total++;
    const s = c.checks[key(page.code, f.name)]?.status;
    if (s) done++;
    if (s && !isDone(s)) bad++;
  }
  return { total, done, bad, complete: total > 0 && done === total };
}
function caseState(c) {
  const p = progress(c);
  if (!p.complete) return { label: `점검중 ${p.done}/${p.total}`, cls: 'pending' };
  return p.bad ? { label: `보완요청 ${p.bad}건`, cls: 'missing' } : { label: '보완 완료', cls: 'ok' };
}
function outputText(c) {
  const p = progress(c);
  const lines = requestLines(c);
  if (p.complete && lines.length === 0) {
    return `[보완 완료 안내] 증번 ${c.policy}: 청약서 전 페이지가 작성 샘플과 동일하게 작성 완료되어 보완 사항이 없습니다.`;
  }
  return lines.join('\n');
}

// ---------- 탭 ----------
document.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach((x) => x.classList.toggle('active', x === b));
  document.querySelectorAll('.tab-panel').forEach((p) => p.classList.toggle('hidden', p.id !== `tab-${b.dataset.tab}`));
  if (b.dataset.tab === 'summary') renderSummary();
  if (b.dataset.tab === 'template') renderTemplate();
  if (b.dataset.tab === 'check') renderCases();
}));

// ---------- 증번 목록 ----------
$('#add-case').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = $('#new-policy');
  const policies = input.value.split(/[\s,]+/).map((s) => s.trim()).filter(Boolean);
  for (const policy of policies) {
    if (!cases.some((c) => c.policy === policy)) cases.push({ policy, checks: {}, createdAt: Date.now() });
  }
  if (policies.length) selected = policies[policies.length - 1];
  input.value = '';
  persist(); renderCases();
});

function renderCases() {
  const list = $('#case-list');
  list.innerHTML = cases.map((c) => {
    const st = caseState(c);
    return `<li class="${c.policy === selected ? 'active' : ''}" data-policy="${esc(c.policy)}">
      <span class="policy">${esc(c.policy)}</span><span class="badge ${st.cls}">${esc(st.label)}</span></li>`;
  }).join('') || '<li class="muted">등록된 증번이 없습니다</li>';
  list.querySelectorAll('li[data-policy]').forEach((li) => li.addEventListener('click', () => {
    selected = li.dataset.policy; renderCases();
  }));
  renderDetail();
}

function renderDetail() {
  const el = $('#case-detail');
  const c = cases.find((x) => x.policy === selected);
  if (!c) { el.innerHTML = '<p class="empty">왼쪽에서 증번을 추가하거나 선택하세요.</p>'; return; }
  const scans = scanImages[c.policy] ||= {};

  el.innerHTML = `
    <div class="row space">
      <h2>증번 ${esc(c.policy)}</h2>
      <div class="row">
        <button data-act="all-ok">미점검 항목 모두 정상(해당 시 항목은 해당없음)</button>
        <button data-act="delete" class="danger">증번 삭제</button>
      </div>
    </div>
    ${template.map((page) => `
      <article class="page-card">
        <div class="row space">
          <h3><span class="code">${esc(page.code)}</span> ${esc(page.title)}</h3>
          <label class="btn small">스캔본 첨부<input type="file" accept="image/*,application/pdf" multiple hidden data-scan="${esc(page.code)}" /></label>
        </div>
        ${page.note ? `<p class="note-line">※ ${esc(page.note)}</p>` : ''}
        <div class="compare">
          <figure><figcaption>작성 샘플</figcaption>${
            sampleImages[page.code] ? `<a href="${sampleImages[page.code]}" target="_blank"><img src="${sampleImages[page.code]}" alt="${esc(page.code)} 샘플" /></a>`
              : '<div class="ph">샘플 이미지 없음<br><small>작성 샘플 탭에서 등록</small></div>'}</figure>
          <figure><figcaption>스캔본</figcaption>${
            (scans[page.code] || []).map((s) => s.type === 'application/pdf'
              ? `<a class="ph" href="${s.url}" target="_blank">PDF 열기</a>`
              : `<a href="${s.url}" target="_blank"><img src="${s.url}" alt="${esc(page.code)} 스캔본" /></a>`).join('')
            || '<div class="ph">스캔본 없음</div>'}</figure>
        </div>
        <table class="checks">
          <thead><tr><th>작성란</th><th>점검</th><th>보완 내용 (비우면 기본 문구)</th></tr></thead>
          <tbody>${page.fields.map((f) => {
            const k = key(page.code, f.name);
            const chk = c.checks[k] || {};
            const opts = statusOptions(f.mode);
            return `<tr>
              <td>${esc(f.name)}${f.mode === 'presence' ? '<small class="muted"> · 작성여부만</small>' : f.mode === 'cond' ? '<small class="muted"> · 해당 시</small>' : ''}</td>
              <td class="status-cell">${opts.map((s) => `
                <button class="st ${STATUS[s].cls} ${chk.status === s ? 'on' : ''}" data-k="${esc(k)}" data-s="${s}">${STATUS[s].label}</button>`).join('')}</td>
              <td><input class="note" data-k="${esc(k)}" value="${esc(chk.note)}" placeholder="${esc(f.fix)}" ${chk.status && !isDone(chk.status) ? '' : 'disabled'} /></td>
            </tr>`;
          }).join('')}</tbody>
        </table>
      </article>`).join('')}
    <article class="page-card output">
      <div class="row space">
        <h3>하나로시스템 보완요청 입력 내용</h3>
        <button data-act="copy">복사</button>
      </div>
      <p class="hint">ga.hanalife.co.kr 에서 증번 <b>${esc(c.policy)}</b> 조회 후 보완요청란에 붙여넣으세요.</p>
      <pre id="output">${esc(outputText(c)) || '<span class="muted">모든 항목을 점검하면 결과가 표시됩니다.</span>'}</pre>
    </article>`;

  el.querySelectorAll('button.st').forEach((b) => b.addEventListener('click', () => {
    const cur = c.checks[b.dataset.k] || {};
    c.checks[b.dataset.k] = { ...cur, status: cur.status === b.dataset.s ? undefined : b.dataset.s };
    if (!c.checks[b.dataset.k].status) delete c.checks[b.dataset.k];
    persist(); renderCases();
  }));
  el.querySelectorAll('input.note').forEach((i) => i.addEventListener('input', () => {
    c.checks[i.dataset.k].note = i.value;
    persist();
    $('#output').textContent = outputText(c);
  }));
  el.querySelectorAll('input[data-scan]').forEach((i) => i.addEventListener('change', () => {
    const arr = scans[i.dataset.scan] ||= [];
    for (const f of i.files) arr.push({ url: URL.createObjectURL(f), type: f.type });
    renderDetail();
  }));
  el.querySelector('[data-act="copy"]').addEventListener('click', () => copy(outputText(c)));
  el.querySelector('[data-act="all-ok"]').addEventListener('click', () => {
    for (const page of template) for (const f of page.fields) {
      const k = key(page.code, f.name);
      if (!c.checks[k]?.status) c.checks[k] = { status: f.mode === 'cond' ? 'na' : 'ok' };
    }
    persist(); renderCases();
  });
  el.querySelector('[data-act="delete"]').addEventListener('click', () => {
    if (!confirm(`증번 ${c.policy} 점검 내용을 삭제할까요?`)) return;
    cases = cases.filter((x) => x !== c);
    selected = cases[0]?.policy ?? null;
    persist(); renderCases();
  });
}

// ---------- 템플릿 편집 ----------
function renderTemplate() {
  const el = $('#tpl-pages');
  el.innerHTML = template.map((page, pi) => `
    <article class="page-card">
      <div class="row space">
        <div class="row">
          <input class="code-input" data-pi="${pi}" data-prop="code" value="${esc(page.code)}" />
          <input class="title-input" data-pi="${pi}" data-prop="title" value="${esc(page.title)}" placeholder="페이지 설명" />
        </div>
        <div class="row">
          <label class="btn small">샘플 이미지<input type="file" accept="image/*" hidden data-sample="${pi}" /></label>
          <button class="small danger" data-delpage="${pi}">페이지 삭제</button>
        </div>
      </div>
      <input data-pi="${pi}" data-prop="note" value="${esc(page.note)}" placeholder="페이지 작성 유의사항 (선택)" />
      ${sampleImages[page.code] ? `<img class="tpl-thumb" src="${sampleImages[page.code]}" alt="샘플" />` : ''}
      <table class="checks">
        <thead><tr><th>작성란</th><th>점검 방식</th><th>기본 보완요청 문구</th><th></th></tr></thead>
        <tbody>${page.fields.map((f, fi) => `<tr>
          <td><input data-pi="${pi}" data-fi="${fi}" data-prop="name" value="${esc(f.name)}" /></td>
          <td><select data-pi="${pi}" data-fi="${fi}" data-prop="mode">
            <option value="content" ${f.mode === 'content' ? 'selected' : ''}>샘플과 내용 대조</option>
            <option value="presence" ${f.mode === 'presence' ? 'selected' : ''}>작성여부만 확인</option>
            <option value="cond" ${f.mode === 'cond' ? 'selected' : ''}>해당 시 작성</option>
          </select></td>
          <td><input data-pi="${pi}" data-fi="${fi}" data-prop="fix" value="${esc(f.fix)}" /></td>
          <td><button class="small danger" data-delfield="${pi}:${fi}">삭제</button></td>
        </tr>`).join('')}</tbody>
      </table>
      <button class="small" data-addfield="${pi}">작성란 추가</button>
    </article>`).join('');

  el.querySelectorAll('[data-prop]').forEach((i) => i.addEventListener('change', () => {
    const page = template[i.dataset.pi];
    const target = i.dataset.fi != null ? page.fields[i.dataset.fi] : page;
    const old = target[i.dataset.prop];
    const val = i.value.trim();
    if (i.dataset.prop === 'code' && sampleImages[old]) { sampleImages[val] = sampleImages[old]; delete sampleImages[old]; }
    if (i.dataset.prop === 'code' || i.dataset.prop === 'name') renameCheckKeys(page, i.dataset.fi, i.dataset.prop, old, val);
    target[i.dataset.prop] = val;
    persist();
  }));
  el.querySelectorAll('[data-sample]').forEach((i) => i.addEventListener('change', () => {
    const f = i.files[0]; if (!f) return;
    sampleImages[template[i.dataset.sample].code] = URL.createObjectURL(f);
    renderTemplate();
  }));
  el.querySelectorAll('[data-delpage]').forEach((b) => b.addEventListener('click', () => {
    if (!confirm('이 페이지를 삭제할까요?')) return;
    template.splice(+b.dataset.delpage, 1); persist(); renderTemplate();
  }));
  el.querySelectorAll('[data-delfield]').forEach((b) => b.addEventListener('click', () => {
    const [pi, fi] = b.dataset.delfield.split(':').map(Number);
    template[pi].fields.splice(fi, 1); persist(); renderTemplate();
  }));
  el.querySelectorAll('[data-addfield]').forEach((b) => b.addEventListener('click', () => {
    template[+b.dataset.addfield].fields.push({ name: '새 작성란', mode: 'content', fix: '' });
    persist(); renderTemplate();
  }));
}

// 페이지 코드/작성란 이름 변경 시 기존 점검 결과 유지
function renameCheckKeys(page, fi, prop, oldVal, newVal) {
  const pairs = prop === 'code'
    ? page.fields.map((f) => [key(oldVal, f.name), key(newVal, f.name)])
    : [[key(page.code, oldVal), key(page.code, newVal)]];
  for (const c of cases) for (const [a, b] of pairs) {
    if (c.checks[a]) { c.checks[b] = c.checks[a]; delete c.checks[a]; }
  }
}

$('#tpl-add-page').addEventListener('click', () => {
  const n = String(template.length + 1).padStart(2, '0');
  template.push({ code: `UW${n}`, title: '', note: '', fields: [] });
  persist(); renderTemplate();
});
$('#tpl-reset').addEventListener('click', () => {
  if (!confirm('작성 샘플 템플릿을 기본값으로 되돌릴까요?')) return;
  template = structuredClone(DEFAULT_TEMPLATE); persist(); renderTemplate();
});
$('#tpl-export').addEventListener('click', () => download('청약서_작성샘플_템플릿.json', JSON.stringify(template, null, 2), 'application/json'));
$('#tpl-import').addEventListener('change', async (e) => {
  const f = e.target.files[0]; if (!f) return;
  try {
    const data = JSON.parse(await f.text());
    if (!Array.isArray(data) || !data.every((p) => p.code && Array.isArray(p.fields))) throw new Error();
    template = data; persist(); renderTemplate(); toast('템플릿을 가져왔습니다');
  } catch { alert('올바른 템플릿 파일이 아닙니다.'); }
  e.target.value = '';
});

// ---------- 전체 요약 ----------
function renderSummary() {
  $('#sum-body').innerHTML = cases.map((c, i) => {
    const st = caseState(c);
    return `<tr><td>${esc(c.policy)}</td><td><span class="badge ${st.cls}">${esc(st.label)}</span></td>
      <td><pre>${esc(outputText(c))}</pre></td><td><button class="small" data-copy="${i}">복사</button></td></tr>`;
  }).join('') || '<tr><td colspan="4" class="muted">등록된 증번이 없습니다</td></tr>';
  document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', () => copy(outputText(cases[b.dataset.copy]))));
}
$('#sum-copy').addEventListener('click', () => copy(cases.map((c) => `[${c.policy}]\n${outputText(c)}`).join('\n\n')));
$('#sum-csv').addEventListener('click', () => {
  const q = (s) => `"${String(s).replace(/"/g, '""')}"`;
  const rows = [['증번', '상태', '페이지', '보완요청']];
  for (const c of cases) {
    const st = caseState(c).label;
    const lines = requestLines(c);
    if (!lines.length) rows.push([c.policy, st, '', progress(c).complete ? '보완 완료' : '']);
    for (const l of lines) rows.push([c.policy, st, l.split('_')[0], l]);
  }
  download('보완요청목록.csv', '﻿' + rows.map((r) => r.map(q).join(',')).join('\r\n'), 'text/csv');
});

function download(name, content, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

renderCases();
