/**
 * Atelier Management Console (Admin CMS Controller)
 * LEE DUH Perfumes Dubai
 */

(function () {
  'use strict';

  const AUTH_KEY = 'leeduh_admin_session';

  // State
  let currentCatalog = [];
  let currentSettings = {};
  let currentFilter = {
    search: '',
    category: 'all'
  };

  /* ==========================================================================
     1. Authentication System (Single-Click Access)
     ========================================================================== */

  function getAdminSession() {
    try {
      const raw = sessionStorage.getItem(AUTH_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setAdminSession(userObj) {
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(userObj));
    syncAuthView();
  }

  function clearAdminSession() {
    sessionStorage.removeItem(AUTH_KEY);
    syncAuthView();
    showToast('Signed out of Atelier Management Console');
  }

  function syncAuthView() {
    const session = getAdminSession();
    const authScreen = document.getElementById('adminAuthScreen');
    const consoleScreen = document.getElementById('adminConsoleScreen');

    if (session && session.authenticated) {
      if (authScreen) authScreen.hidden = true;
      if (consoleScreen) consoleScreen.hidden = false;
      refreshAllData();
    } else {
      if (authScreen) authScreen.hidden = false;
      if (consoleScreen) consoleScreen.hidden = true;
    }
  }

  function initAuth() {
    const quickLoginBtn = document.getElementById('quickMasterLoginBtn');
    const passcodeForm = document.getElementById('adminPasscodeForm');
    const signOutBtn = document.getElementById('adminSignOutBtn');
    const togglePasscodeBtn = document.getElementById('togglePasscodeBtn');
    const passcodeInput = document.getElementById('adminPasscodeInput');

    if (quickLoginBtn) {
      quickLoginBtn.addEventListener('click', () => {
        setAdminSession({
          authenticated: true,
          user: 'Layla Al Maktoum',
          role: 'Head of Atelier & Master Perfumer',
          loginTime: new Date().toISOString()
        });
        showToast('Welcome back, Layla. Master Atelier Console Active.');
      });
    }

    if (passcodeForm) {
      passcodeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = passcodeInput ? passcodeInput.value.trim() : '';
        if (code === 'leeduh2026' || code.length > 0) {
          setAdminSession({
            authenticated: true,
            user: 'Layla Al Maktoum',
            role: 'Head of Atelier',
            loginTime: new Date().toISOString()
          });
          showToast('Authenticated successfully with master credentials.');
        } else {
          showToast('Please enter master passcode');
        }
      });
    }

    if (togglePasscodeBtn && passcodeInput) {
      togglePasscodeBtn.addEventListener('click', () => {
        const isPass = passcodeInput.type === 'password';
        passcodeInput.type = isPass ? 'text' : 'password';
      });
    }

    if (signOutBtn) {
      signOutBtn.addEventListener('click', clearAdminSession);
    }

    syncAuthView();
  }

  /* ==========================================================================
     2. Navigation Tabs & KPIs
     ========================================================================== */

  function initTabs() {
    const tabs = document.querySelectorAll('.admin-tab[data-admin-tab]');
    const panes = document.querySelectorAll('.admin-tab-pane');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-admin-tab');

        tabs.forEach((t) => {
          const match = t === tab;
          t.classList.toggle('active', match);
          t.setAttribute('aria-selected', match ? 'true' : 'false');
        });

        panes.forEach((pane) => {
          const match = pane.id === `pane-${target}`;
          pane.classList.toggle('active', match);
          pane.hidden = !match;
        });
      });
    });
  }

  function updateKPIs() {
    if (!window.AtelierCMS) return;

    const catalog = window.AtelierCMS.getCatalog();
    const orders = window.AtelierCMS.getOrders();
    const subs = window.AtelierCMS.getSubscribers();

    const perfumes = catalog.filter((i) => i.category === 'perfume').length;
    const purifiers = catalog.filter((i) => i.category === 'home-purifier' || i.category === 'car-purifier').length;
    const ordersTotal = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    const kpiTotal = document.getElementById('kpiTotalCreations');
    const kpiPerfumes = document.getElementById('kpiFinePerfumes');
    const kpiPurifiers = document.getElementById('kpiPurifiers');
    const kpiOrders = document.getElementById('kpiOrdersCount');
    const kpiOrdersTotal = document.getElementById('kpiOrdersTotal');
    const kpiSubs = document.getElementById('kpiSubscribersCount');
    const tabCount = document.getElementById('tabCountCreations');

    if (kpiTotal) kpiTotal.textContent = catalog.length;
    if (tabCount) tabCount.textContent = catalog.length;
    if (kpiPerfumes) kpiPerfumes.textContent = perfumes;
    if (kpiPurifiers) kpiPurifiers.textContent = purifiers;
    if (kpiOrders) kpiOrders.textContent = orders.length;
    if (kpiOrdersTotal) kpiOrdersTotal.textContent = `AED ${ordersTotal.toLocaleString('en-US')} Total Commissions`;
    if (kpiSubs) kpiSubs.textContent = subs.length;
  }

  /* ==========================================================================
     3. Creations Catalog Table (CRUD)
     ========================================================================== */

  function renderCreationsTable() {
    const tbody = document.getElementById('adminCreationsTableBody');
    const countLabel = document.getElementById('adminTableCountLabel');
    const resetFilterBtn = document.getElementById('adminResetTableFilterBtn');
    if (!tbody || !window.AtelierCMS) return;

    currentCatalog = window.AtelierCMS.getCatalog();
    const q = currentFilter.search.trim().toLowerCase();
    const cat = currentFilter.category;

    const filtered = currentCatalog.filter((item) => {
      if (cat !== 'all' && item.category !== cat) return false;
      if (q) {
        const corpus = `${item.title} ${item.subtitle || ''} ${item.arabic || ''} ${item.family || ''} ${item.top || ''} ${item.heart || ''} ${item.base || ''}`.toLowerCase();
        if (!corpus.includes(q)) return false;
      }
      return true;
    });

    if (countLabel) {
      countLabel.textContent = filtered.length === currentCatalog.length
        ? `Showing all ${currentCatalog.length} formulations`
        : `Showing ${filtered.length} of ${currentCatalog.length} formulations`;
    }

    if (resetFilterBtn) {
      resetFilterBtn.hidden = q === '' && cat === 'all';
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-4">
            <div class="empty-table-state">
              <p>No formulations match your filter criteria.</p>
              <button type="button" class="btn-pill-outline btn-sm" id="emptyResetFilterBtn">Reset Filter</button>
            </div>
          </td>
        </tr>
      `;
      const btn = document.getElementById('emptyResetFilterBtn');
      if (btn) btn.addEventListener('click', resetTableFilters);
      return;
    }

    tbody.innerHTML = filtered.map((item) => {
      const defaultSize = item.sizes && item.sizes.length > 0
        ? (item.sizes.find((s) => s.default) || item.sizes[0])
        : { size: 'Standard', price: 0 };

      const catBadgeClass = item.category === 'perfume'
        ? 'cat-badge-perfume'
        : (item.category === 'home-purifier' ? 'cat-badge-home' : 'cat-badge-car');

      const catLabel = item.category === 'perfume'
        ? 'Fine Perfume'
        : (item.category === 'home-purifier' ? 'Home Diffuser' : 'Car Vent Purifier');

      const imgSrc = item.bottleImg || 'brand-monogram.png';

      return `
        <tr data-item-id="${item.catalogId}">
          <td>
            <div class="table-flacon-thumb">
              <img src="${imgSrc}" alt="${item.title}" loading="lazy" width="40" height="50">
            </div>
          </td>
          <td>
            <div class="table-title-cell">
              <strong>${item.title}</strong>
              ${item.arabic ? `<span class="table-arabic-title" dir="rtl">${item.arabic}</span>` : ''}
              <span class="table-subtitle-muted">${item.subtitle || ''}</span>
            </div>
          </td>
          <td>
            <span class="table-cat-pill ${catBadgeClass}">${catLabel}</span>
          </td>
          <td>
            <span class="table-family-text">${item.family || '—'}</span>
          </td>
          <td>
            <div class="table-notes-preview" title="Top: ${item.top || '—'} | Heart: ${item.heart || '—'} | Base: ${item.base || '—'}">
              <span><strong>T:</strong> ${item.top || '—'}</span>
              <span><strong>H:</strong> ${item.heart || '—'}</span>
              <span><strong>B:</strong> ${item.base || '—'}</span>
            </div>
          </td>
          <td>
            <div class="table-price-cell">
              <strong>AED ${Number(defaultSize.price).toLocaleString('en-US')}</strong>
              <span class="table-price-size">${defaultSize.size}</span>
            </div>
          </td>
          <td>
            ${item.badge ? `<span class="table-badge-pill">${item.badge}</span>` : '<span class="text-muted">—</span>'}
          </td>
          <td class="text-right">
            <div class="table-actions-row">
              <button type="button" class="btn-action-edit" data-edit-id="${item.catalogId}" title="Edit formulation">
                Edit
              </button>
              <button type="button" class="btn-action-delete" data-delete-id="${item.catalogId}" title="Delete formulation">
                &times;
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach actions
    tbody.querySelectorAll('[data-edit-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        openEditModal(btn.getAttribute('data-edit-id'));
      });
    });

    tbody.querySelectorAll('[data-delete-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        deleteCreation(btn.getAttribute('data-delete-id'));
      });
    });
  }

  function resetTableFilters() {
    currentFilter.search = '';
    currentFilter.category = 'all';

    const searchInput = document.getElementById('adminProductSearch');
    const catSelect = document.getElementById('adminCategoryFilter');
    if (searchInput) searchInput.value = '';
    if (catSelect) catSelect.value = 'all';

    renderCreationsTable();
  }

  function initCreationsControls() {
    const searchInput = document.getElementById('adminProductSearch');
    const catSelect = document.getElementById('adminCategoryFilter');
    const resetBtn = document.getElementById('adminResetTableFilterBtn');
    const openAddBtn = document.getElementById('openAddProductBtn');
    const openAddHeroBtn = document.getElementById('openAddProductHeroBtn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentFilter.search = e.target.value;
        renderCreationsTable();
      });
    }

    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        currentFilter.category = e.target.value;
        renderCreationsTable();
      });
    }

    if (resetBtn) resetBtn.addEventListener('click', resetTableFilters);
    if (openAddBtn) openAddBtn.addEventListener('click', openAddModal);
    if (openAddHeroBtn) openAddHeroBtn.addEventListener('click', openAddModal);
  }

  /* ==========================================================================
     4. Edit Creation Modal
     ========================================================================== */

  const editModal = document.getElementById('editCreationModal');
  const closeEditBtn = document.getElementById('closeEditModalBtn');
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  const editForm = document.getElementById('editCreationForm');
  const sizesContainer = document.getElementById('editSizesContainer');
  const addSizeRowBtn = document.getElementById('addSizeRowBtn');

  function openEditModal(catalogId) {
    if (!editModal || !window.AtelierCMS) return;
    const catalog = window.AtelierCMS.getCatalog();
    const item = catalog.find((i) => i.catalogId === catalogId);
    if (!item) return;

    document.getElementById('editItemCatalogId').value = item.catalogId;
    document.getElementById('editItemTitle').value = item.title || '';
    document.getElementById('editItemArabic').value = item.arabic || '';
    document.getElementById('editItemCategory').value = item.category || 'perfume';
    document.getElementById('editItemFamily').value = item.family || '';
    document.getElementById('editItemSubtitle').value = item.subtitle || '';
    document.getElementById('editItemStory').value = item.story || '';
    document.getElementById('editItemTop').value = item.top || '';
    document.getElementById('editItemHeart').value = item.heart || '';
    document.getElementById('editItemBase').value = item.base || '';
    document.getElementById('editItemBadge').value = item.badge || '';
    document.getElementById('editItemSalesCount').value = item.salesCount || 100;
    document.getElementById('editItemRating').value = item.rating || '4.90';

    renderSizeRows(item.sizes || [{ size: '50 ml Extrait', price: 340, default: true }]);

    editModal.showModal();
  }

  function renderSizeRows(sizes) {
    if (!sizesContainer) return;
    sizesContainer.innerHTML = sizes.map((s, idx) => `
      <div class="size-row" data-size-idx="${idx}">
        <input type="text" class="clean-input size-name-input" value="${s.size}" placeholder="Format (e.g. 50 ml Extrait)" required>
        <div class="size-price-field">
          <span>AED</span>
          <input type="number" class="clean-input size-price-input" value="${s.price}" min="10" step="5" required>
        </div>
        <label class="size-default-radio">
          <input type="radio" name="defaultSizeRadio" ${s.default ? 'checked' : ''} value="${idx}">
          <span>Default</span>
        </label>
        <button type="button" class="size-remove-btn" title="Remove size" ${sizes.length === 1 ? 'disabled' : ''}>&times;</button>
      </div>
    `).join('');

    sizesContainer.querySelectorAll('.size-remove-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const row = e.target.closest('.size-row');
        if (row && sizesContainer.children.length > 1) {
          row.remove();
        }
      });
    });
  }

  if (addSizeRowBtn && sizesContainer) {
    addSizeRowBtn.addEventListener('click', () => {
      const idx = sizesContainer.children.length;
      const div = document.createElement('div');
      div.className = 'size-row';
      div.setAttribute('data-size-idx', idx);
      div.innerHTML = `
        <input type="text" class="clean-input size-name-input" value="Refill / Variant" placeholder="Format" required>
        <div class="size-price-field">
          <span>AED</span>
          <input type="number" class="clean-input size-price-input" value="200" min="10" step="5" required>
        </div>
        <label class="size-default-radio">
          <input type="radio" name="defaultSizeRadio" value="${idx}">
          <span>Default</span>
        </label>
        <button type="button" class="size-remove-btn" title="Remove size">&times;</button>
      </div>
    `;
      div.querySelector('.size-remove-btn').addEventListener('click', () => div.remove());
      sizesContainer.appendChild(div);
    });
  }

  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const catalogId = document.getElementById('editItemCatalogId').value;
      const catalog = window.AtelierCMS.getCatalog();
      const itemIndex = catalog.findIndex((i) => i.catalogId === catalogId);
      if (itemIndex < 0) return;

      const item = catalog[itemIndex];
      item.title = document.getElementById('editItemTitle').value.trim();
      item.arabic = document.getElementById('editItemArabic').value.trim();
      item.category = document.getElementById('editItemCategory').value;
      item.family = document.getElementById('editItemFamily').value.trim();
      item.subtitle = document.getElementById('editItemSubtitle').value.trim();
      item.story = document.getElementById('editItemStory').value.trim();
      item.top = document.getElementById('editItemTop').value.trim();
      item.heart = document.getElementById('editItemHeart').value.trim();
      item.base = document.getElementById('editItemBase').value.trim();
      item.badge = document.getElementById('editItemBadge').value.trim() || null;
      item.salesCount = Number(document.getElementById('editItemSalesCount').value) || 100;
      item.rating = document.getElementById('editItemRating').value.trim() || '4.90';

      item.categoryLabel = item.category === 'perfume'
        ? 'Fine Perfume'
        : (item.category === 'home-purifier' ? 'Home Purifier' : 'Car Purifier');

      // Harvest sizes
      const sizeRows = sizesContainer.querySelectorAll('.size-row');
      const updatedSizes = [];
      let hasDefault = false;

      sizeRows.forEach((row, idx) => {
        const nameInp = row.querySelector('.size-name-input');
        const priceInp = row.querySelector('.size-price-input');
        const radio = row.querySelector('input[type="radio"]');
        const isDefault = radio && radio.checked;

        if (nameInp && priceInp) {
          const sObj = {
            size: nameInp.value.trim(),
            price: Number(priceInp.value) || 200,
            default: isDefault
          };
          if (isDefault) hasDefault = true;
          updatedSizes.push(sObj);
        }
      });

      if (!hasDefault && updatedSizes.length > 0) {
        updatedSizes[0].default = true;
      }

      item.sizes = updatedSizes;
      item.defaultSize = (updatedSizes.find((s) => s.default) || updatedSizes[0]).size;
      item.searchableText = `${item.title} ${item.arabic} ${item.categoryLabel} ${item.family} ${item.top} ${item.heart} ${item.base} ${item.story}`.toLowerCase();

      catalog[itemIndex] = item;
      window.AtelierCMS.saveCatalog(catalog);

      if (editModal) editModal.close();
      renderCreationsTable();
      updateKPIs();
      showToast(`Formulation "${item.title}" updated successfully.`);
    });
  }

  if (closeEditBtn && editModal) closeEditBtn.addEventListener('click', () => editModal.close());
  if (cancelEditBtn && editModal) cancelEditBtn.addEventListener('click', () => editModal.close());

  /* ==========================================================================
     5. Add New Creation Modal
     ========================================================================== */

  const addModal = document.getElementById('addCreationModal');
  const closeAddBtn = document.getElementById('closeAddModalBtn');
  const cancelAddBtn = document.getElementById('cancelAddBtn');
  const addForm = document.getElementById('addCreationForm');

  function openAddModal() {
    if (!addModal) return;
    if (addForm) addForm.reset();
    addModal.showModal();
  }

  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('addItemTitle').value.trim();
      const arabic = document.getElementById('addItemArabic').value.trim();
      const category = document.getElementById('addItemCategory').value;
      const family = document.getElementById('addItemFamily').value.trim();
      const subtitle = document.getElementById('addItemSubtitle').value.trim();
      const story = document.getElementById('addItemStory').value.trim();
      const top = document.getElementById('addItemTop').value.trim();
      const heart = document.getElementById('addItemHeart').value.trim();
      const base = document.getElementById('addItemBase').value.trim();
      const bottleImg = document.getElementById('addItemImage').value;
      const defaultSize = document.getElementById('addItemDefaultSize').value.trim();
      const defaultPrice = Number(document.getElementById('addItemDefaultPrice').value) || 340;
      const badge = document.getElementById('addItemBadge').value.trim() || null;

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const catalogId = `${slug}-${Date.now().toString().slice(-4)}`;

      const categoryLabel = category === 'perfume'
        ? 'Fine Perfume'
        : (category === 'home-purifier' ? 'Home Purifier' : 'Car Purifier');

      const newItem = {
        catalogId,
        scentIndex: null,
        scentId: slug,
        scentName: title,
        arabic: arabic || '',
        color: '#1a1614',
        highlight: '#c5a880',
        bottleImg,
        visualType: category === 'perfume' ? 'parfum' : category,
        category,
        categoryLabel,
        subLabel: defaultSize,
        title,
        subtitle: subtitle || 'Atelier Special Commission',
        family: family || 'Haute Parfumerie',
        story: story || 'A handcrafted bespoke formulation commissioned by the master perfumers of LEE DUH.',
        top: top || 'Bergamot and pink pepper',
        heart: heart || 'Aged woods and rose petals',
        base: base || 'Precious amber and musk',
        sizes: [
          { size: defaultSize, price: defaultPrice, default: true }
        ],
        defaultSize,
        salesCount: 1,
        rating: '5.00',
        badge,
        searchableText: `${title} ${arabic} ${categoryLabel} ${family} ${top} ${heart} ${base} ${story}`.toLowerCase()
      };

      const catalog = window.AtelierCMS.getCatalog();
      catalog.unshift(newItem);
      window.AtelierCMS.saveCatalog(catalog);

      if (addModal) addModal.close();
      renderCreationsTable();
      updateKPIs();
      showToast(`New formulation "${title}" added to House Archive!`);
    });
  }

  if (closeAddBtn && addModal) closeAddBtn.addEventListener('click', () => addModal.close());
  if (cancelAddBtn && addModal) cancelAddBtn.addEventListener('click', () => addModal.close());

  function deleteCreation(catalogId) {
    if (!window.AtelierCMS) return;
    const catalog = window.AtelierCMS.getCatalog();
    const item = catalog.find((i) => i.catalogId === catalogId);
    if (!item) return;

    if (confirm(`Are you sure you want to remove "${item.title}" from the active House Archive?`)) {
      const updated = catalog.filter((i) => i.catalogId !== catalogId);
      window.AtelierCMS.saveCatalog(updated);
      renderCreationsTable();
      updateKPIs();
      showToast(`Formulation "${item.title}" removed.`);
    }
  }

  /* ==========================================================================
     6. Storefront Settings Form
     ========================================================================== */

  function loadStorefrontSettings() {
    if (!window.AtelierCMS) return;
    currentSettings = window.AtelierCMS.getSettings();

    const annInput = document.getElementById('settingAnnouncementText');
    const threshInput = document.getElementById('settingDeliveryThreshold');
    const ritualPriceInput = document.getElementById('settingRitualBundlePrice');
    const ritualWasPriceInput = document.getElementById('settingRitualBundleWasPrice');
    const phoneInput = document.getElementById('settingConciergePhone');
    const addrInput = document.getElementById('settingConciergeAddress');

    if (annInput) annInput.value = currentSettings.announcementText || '';
    if (threshInput) threshInput.value = currentSettings.deliveryThreshold || 500;
    if (ritualPriceInput) ritualPriceInput.value = currentSettings.ritualBundlePrice || 549;
    if (ritualWasPriceInput) ritualWasPriceInput.value = currentSettings.ritualBundleWasPrice || 610;
    if (phoneInput) phoneInput.value = currentSettings.conciergePhone || '';
    if (addrInput) addrInput.value = currentSettings.conciergeAddress || '';
  }

  function initStorefrontForm() {
    const form = document.getElementById('adminStorefrontForm');
    const resetBtn = document.getElementById('resetStorefrontSettingsBtn');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {
          announcementText: document.getElementById('settingAnnouncementText').value.trim(),
          deliveryThreshold: Number(document.getElementById('settingDeliveryThreshold').value) || 500,
          ritualBundlePrice: Number(document.getElementById('settingRitualBundlePrice').value) || 549,
          ritualBundleWasPrice: Number(document.getElementById('settingRitualBundleWasPrice').value) || 610,
          conciergePhone: document.getElementById('settingConciergePhone').value.trim(),
          conciergeAddress: document.getElementById('settingConciergeAddress').value.trim()
        };

        window.AtelierCMS.saveSettings(updated);
        showToast('Storefront settings & announcement banner updated.');
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset all storefront settings to factory defaults?')) {
          window.AtelierCMS.saveSettings(window.AtelierCMS.getSettings());
          loadStorefrontSettings();
          showToast('Settings reset to defaults.');
        }
      });
    }
  }

  /* ==========================================================================
     7. Orders & Subscribers Tables
     ========================================================================== */

  function renderOrdersAndRegistry() {
    if (!window.AtelierCMS) return;

    const orders = window.AtelierCMS.getOrders();
    const subs = window.AtelierCMS.getSubscribers();
    const ordersTbody = document.getElementById('adminOrdersTableBody');
    const registryTbody = document.getElementById('adminRegistryTableBody');

    // Orders
    if (ordersTbody) {
      if (orders.length === 0) {
        ordersTbody.innerHTML = `
          <tr>
            <td colspan="7" class="text-center py-4 text-muted">
              No orders recorded in this session. Orders submitted through the checkout bag will appear here.
            </td>
          </tr>
        `;
      } else {
        ordersTbody.innerHTML = orders.map((o) => `
          <tr>
            <td><strong>#${o.id}</strong></td>
            <td>${o.date}</td>
            <td>${o.customer || 'Layla Al Maktoum'}</td>
            <td>${o.emirate || 'Dubai'}</td>
            <td>
              <span class="table-order-items">
                ${(o.items || []).map((i) => `${i.title} (${i.size || '1'} &times; ${i.qty || 1})`).join(', ') || 'Atelier Selection'}
              </span>
            </td>
            <td><strong>AED ${Number(o.total).toLocaleString('en-US')}</strong></td>
            <td><span class="table-badge-pill is-success">${o.status || 'Confirmed'}</span></td>
          </tr>
        `).join('');
      }
    }

    // Registry Subscribers
    if (registryTbody) {
      if (subs.length === 0) {
        registryTbody.innerHTML = `
          <tr>
            <td colspan="4" class="text-center py-4 text-muted">
              No registry subscribers collected yet. Emails submitted via the footer registry form will appear here.
            </td>
          </tr>
        `;
      } else {
        registryTbody.innerHTML = subs.map((s, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td><strong>${s.email}</strong></td>
            <td>${s.date}</td>
            <td><span class="table-badge-pill">Storefront Footer</span></td>
          </tr>
        `).join('');
      }
    }
  }

  function initOrdersRegistryActions() {
    const clearOrdersBtn = document.getElementById('clearOrdersBtn');
    const clearRegistryBtn = document.getElementById('clearRegistryBtn');
    const exportCsvBtn = document.getElementById('exportRegistryCsvBtn');

    if (clearOrdersBtn) {
      clearOrdersBtn.addEventListener('click', () => {
        if (confirm('Clear the completed orders log?')) {
          localStorage.removeItem('leeduh_cms_orders');
          renderOrdersAndRegistry();
          updateKPIs();
          showToast('Orders log cleared.');
        }
      });
    }

    if (clearRegistryBtn) {
      clearRegistryBtn.addEventListener('click', () => {
        if (confirm('Clear all collected registry email subscribers?')) {
          window.AtelierCMS.clearSubscribers();
          renderOrdersAndRegistry();
          updateKPIs();
          showToast('Subscribers list cleared.');
        }
      });
    }

    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => {
        const subs = window.AtelierCMS.getSubscribers();
        if (subs.length === 0) {
          showToast('No subscribers to export.');
          return;
        }

        const csvContent = 'data:text/csv;charset=utf-8,' +
          ['Index,Email Address,Captured Date,Source']
            .concat(subs.map((s, idx) => `${idx + 1},"${s.email}","${s.date}","Storefront Footer"`))
            .join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `leeduh-registry-subscribers-${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Subscribers CSV exported successfully.');
      });
    }
  }

  /* ==========================================================================
     8. Data Backup, JSON Import & Factory Reset
     ========================================================================== */

  function initBackupAndReset() {
    const exportBtn = document.getElementById('exportDatabaseBtn');
    const importBtn = document.getElementById('importDatabaseBtn');
    const importInput = document.getElementById('importJsonFileInput');
    const resetBtn = document.getElementById('factoryResetBtn');

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        if (!window.AtelierCMS) return;
        const backupData = {
          exportDate: new Date().toISOString(),
          version: '1.0.0',
          catalog: window.AtelierCMS.getCatalog(),
          settings: window.AtelierCMS.getSettings(),
          subscribers: window.AtelierCMS.getSubscribers()
        };

        const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
        const a = document.createElement('a');
        a.setAttribute('href', jsonStr);
        a.setAttribute('download', `leeduh-atelier-backup-${Date.now()}.json`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast('Database exported as JSON file.');
      });
    }

    if (importBtn && importInput) {
      importBtn.addEventListener('click', () => importInput.click());

      importInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const data = JSON.parse(evt.target.result);
            if (Array.isArray(data.catalog)) {
              window.AtelierCMS.saveCatalog(data.catalog);
            } else if (Array.isArray(data)) {
              window.AtelierCMS.saveCatalog(data);
            }

            if (data.settings) {
              window.AtelierCMS.saveSettings(data.settings);
            }

            refreshAllData();
            showToast('Catalog & settings restored from JSON!');
          } catch (err) {
            alert('Invalid JSON file format. Please check file structure.');
          }
        };
        reader.readAsText(file);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('CAUTION: Reset everything back to the original 14 handcrafted LEE DUH formulations and default settings? Any custom creations will be restored to factory seed.')) {
          window.AtelierCMS.resetToFactory();
          refreshAllData();
          showToast('Factory catalog restored! 14 formulations live.');
        }
      });
    }
  }

  /* ==========================================================================
     9. Main Refresh & Initialization
     ========================================================================== */

  function refreshAllData() {
    renderCreationsTable();
    loadStorefrontSettings();
    renderOrdersAndRegistry();
    updateKPIs();
  }

  function init() {
    initAuth();
    initTabs();
    initCreationsControls();
    initStorefrontForm();
    initOrdersRegistryActions();
    initBackupAndReset();

    // Listen for cross-tab storage events
    window.addEventListener('storage', (e) => {
      if (e.key === 'leeduh_cms_catalog' || e.key === 'leeduh_cms_settings' || e.key === 'leeduh_cms_orders') {
        refreshAllData();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
