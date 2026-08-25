const views = document.querySelectorAll('.view');
const navItems = document.querySelectorAll('.nav-item');

function showView(viewId) {
  views.forEach((view) => view.classList.toggle('hidden', view.id !== viewId));
  navItems.forEach((item) => item.classList.toggle('active', item.dataset.view === viewId));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-view], [data-view-target]').forEach((element) => {
  element.addEventListener('click', () => showView(element.dataset.view || element.dataset.viewTarget));
});

const calendar = document.querySelector('#calendarGrid');
const days = [
  ['SEG', '24'], ['TER', '25'], ['QUA', '26'], ['QUI', '27'], ['SEX', '28'], ['SÁB', '29'], ['DOM', '30']
];
const slots = [
  [['09:00', 'Marcos Costa', 'Corte + Barba', ''], ['14:30', 'Larissa Campos', 'Mechas + Hidratação', 'orange']],
  [['09:00', 'Marcos Costa', 'Corte + Barba', ''], ['10:30', 'Ana Ferreira', 'Coloração', 'orange'], ['13:00', 'Rafael Souza', 'Corte masculino', '']],
  [['11:00', 'Clara Nunes', 'Escova', 'orange']],
  [['09:30', 'Felipe Melo', 'Corte masculino', ''], ['15:00', 'Nina Alves', 'Barba', '']],
  [['15:00', 'Juliana Carvalho', 'Corte + Barba', 'orange']],
  [['10:00', 'Paulo Reis', 'Corte masculino', ''], ['13:30', 'Laura Dias', 'Hidratação', '']],
  []
];

days.forEach(([label, number], index) => {
  const column = document.createElement('div');
  column.className = 'day-column';
  column.innerHTML = `<div class="day-header ${number === '25' ? 'today' : ''}">${label}<b>${number}</b></div>`;
  slots[index].forEach(([time, client, service, color]) => {
    const slot = document.createElement('div');
    slot.className = `time-slot ${color}`;
    slot.innerHTML = `<b>${time} · ${client}</b><small>${service}</small>`;
    column.appendChild(slot);
  });
  calendar.appendChild(column);
});

const modal = document.querySelector('#bookingModal');
document.querySelectorAll('[data-open-modal="booking"]').forEach((button) => button.addEventListener('click', () => modal.classList.remove('hidden')));
document.querySelector('[data-close-modal]').addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (event) => { if (event.target === modal) modal.classList.add('hidden'); });

document.querySelector('#bookingForm').addEventListener('submit', (event) => {
  event.preventDefault();
  modal.classList.add('hidden');
  const toast = document.querySelector('#toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
});

const resultModal = document.querySelector('#resultModal');
const uploadPreview = document.querySelector('#uploadPreview');
document.querySelector('[data-open-modal="result"]').addEventListener('click', () => resultModal.classList.remove('hidden'));
document.querySelector('[data-close-result]').addEventListener('click', () => resultModal.classList.add('hidden'));
resultModal.addEventListener('click', (event) => { if (event.target === resultModal) resultModal.classList.add('hidden'); });

function previewUpload(input, label) {
  const file = input.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  const media = file.type.startsWith('video/') ? `<video src="${url}" controls></video>` : `<img src="${url}" alt="Prévia ${label}" />`;
  uploadPreview.querySelector(`[data-preview="${label}"]`).innerHTML = `<span>${label.toUpperCase()}</span>${media}`;
}

document.querySelector('#beforeFile').addEventListener('change', (event) => previewUpload(event.target, 'antes'));
document.querySelector('#afterFile').addEventListener('change', (event) => previewUpload(event.target, 'depois'));
uploadPreview.innerHTML = '<div data-preview="antes"><span>ANTES</span><small>Aguardando arquivo</small></div><div data-preview="depois"><span>DEPOIS</span><small>Aguardando arquivo</small></div>';
document.querySelector('#resultForm').addEventListener('submit', (event) => {
  event.preventDefault();
  resultModal.classList.add('hidden');
  const toast = document.querySelector('#toast');
  toast.textContent = 'Resultado salvo neste dispositivo.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
});
