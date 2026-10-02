/**
 * Legal Modals: Privacy Policy & Terms of Participation
 * Accessible dialogs with Esc key and backdrop click listeners.
 */

export const legalDocs = {
  privacy: {
    title: "Политика конфиденциальности",
    subtitle: "ArticularUZ · Защита персональных данных участников турнира",
    updated: "Обновлено: Октябрь 2026",
    content: `
      <section class="legal-sec">
        <h4>1. Общие положения</h4>
        <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных участников республиканского аэрокосмического турнира ArticularUZ в соответствии с Законом Республики Узбекистан № ЗРУ-547 «О персональных данных».</p>
        <p>Оператором обработки данных выступает Организационный комитет турнира ArticularUZ совместно с Агентством космических исследований и технологий при Кабинете Министров Республики Узбекистан («Узкосмос») и Youth Volunteering Club (YVC).</p>
      </section>

      <section class="legal-sec">
        <h4>2. Собираемая информация</h4>
        <p>При регистрации команды или индивидуального участника обрабатываются следующие сведения:</p>
        <ul>
          <li>Фамилия, имя, отчество участника и научного руководителя;</li>
          <li>Контактный номер телефона, адрес электронной почты и Telegram-аккаунт;</li>
          <li>Наименование образовательного учреждения (школа, лицей, колледж, ВУЗ) и регион Республики Узбекистан;</li>
          <li>Возрастная категория и класс/курс обучения;</li>
          <li>Материалы конкурсных работ (презентации, исследовательские статьи, техническая документация прототипов).</li>
        </ul>
      </section>

      <section class="legal-sec">
        <h4>3. Цели обработки данных</h4>
        <p>Персональные данные используются исключительно для:</p>
        <ul>
          <li>Идентификации и допуска участников к этапам турнира;</li>
          <li>Координации региональных этапов и очной защиты проектов в Ташкенте;</li>
          <li>Выпуска официальных наградных документов, дипломов и сертификатов агентства «Узкосмос»;</li>
          <li>Информирования участников о расписании, образовательных воркшопах и результатах судейства;</li>
          <li>Освещения достижений финалистов в официальных образовательных медиа.</li>
        </ul>
      </section>

      <section class="legal-sec">
        <h4>4. Передача данных и безопасность</h4>
        <p>Организаторы гарантируют конфиденциальность предоставленных данных. Данные передаются только членам судейской коллегии и официальным партнёрам (Uzcosmos, YVC) для академической оценки.</p>
        <p>Передача информации коммерческим организациям, рекламным трекерам или третьим лицам категорически исключена.</p>
      </section>

      <section class="legal-sec">
        <h4>5. Права участников и отзыв согласия</h4>
        <p>Каждый участник или его законный представитель вправе запросить уточнение, блокирование или полное удаление своих данных, направив официальный запрос в оргкомитет через официальный Telegram-канал турнира или координатора своего региона.</p>
      </section>
    `
  },
  terms: {
    title: "Пользовательское соглашение и Регламент турнира",
    subtitle: "ArticularUZ · Правила участия и защиты проектов",
    updated: "Сезон 2026/2027",
    content: `
      <section class="legal-sec">
        <h4>1. Статус платформы и турнира</h4>
        <p>Веб-сайт articular.uz и официальный Telegram-бот служат единым информационным шлюзом республиканского турнира ArticularUZ по космическим технологиям, инженерии и прикладным исследованиям.</p>
      </section>

      <section class="legal-sec">
        <h4>2. Требования к участникам и командам</h4>
        <ul>
          <li>К участию допускаются учащиеся средних школ, академических лицеев, профессиональных колледжей и студенты 1–2 курсов ВУЗов Республики Узбекистан в возрасте от 14 до 21 года;</li>
          <li>Состав команды: от 2 до 5 человек во главе с капитаном. Допускается наличие академического ментора;</li>
          <li>Все участники должны пройти верификацию через регионального координатора или официального бота.</li>
        </ul>
      </section>

      <section class="legal-sec">
        <h4>3. Интеллектуальная собственность и академическая честность</h4>
        <ul>
          <li>Все права на разработанные инженерные прототипы, код, алгоритмы и исследовательские материалы безоговорочно принадлежат их авторам;</li>
          <li>Плагиат, использование чужих научных работ без цитирования или предоставление заведомо ложных инженерных данных ведет к немедленной дисквалификации команды;</li>
          <li>Участники дают согласие на демонстрацию несекретных фрагментов своих презентаций в образовательных целях турнира.</li>
        </ul>
      </section>

      <section class="legal-sec">
        <h4>4. Языковой регламент и формат защиты</h4>
        <ul>
          <li>Официальный язык презентаций и очной защиты национального финала — английский;</li>
          <li>На региональных этапах допускаются пояснения на узбекском или русском языках по согласованию с локальным жюри;</li>
          <li>Решения экспертной судейской коллегии и представителей Uzcosmos являются окончательными и пересмотру не подлежат.</li>
        </ul>
      </section>

      <section class="legal-sec">
        <h4>5. Контакты оргкомитета</h4>
        <p>Официальный телеграм-канал оргкомитета: <a href="https://t.me/yvc_uz" target="_blank" rel="noopener">@yvc_uz</a></p>
      </section>
    `
  }
};

export function initLegalModals() {
  const modal = document.getElementById('legal-modal');
  const modalTitle = document.getElementById('legal-modal-title');
  const modalSubtitle = document.getElementById('legal-modal-subtitle');
  const modalContent = document.getElementById('legal-modal-content');
  const modalClose = document.getElementById('legal-modal-close');
  const modalBackdrop = document.getElementById('legal-modal-backdrop');

  if (!modal || !modalContent) return;

  function openDoc(docKey) {
    const doc = legalDocs[docKey];
    if (!doc) return;
    if (modalTitle) modalTitle.textContent = doc.title;
    if (modalSubtitle) modalSubtitle.textContent = doc.subtitle;
    modalContent.innerHTML = doc.content;

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDoc() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Open triggers
  document.querySelectorAll('[data-open-legal]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docKey = btn.getAttribute('data-open-legal');
      openDoc(docKey);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeDoc);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeDoc);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeDoc();
    }
  });
}
