      color: C.muted,
      lineHeight: 1.55,
      marginBottom: 10,
      flex: 1
    }
  }, r.description), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 5,
      marginBottom: 10
    }
  }, (r.tags || []).map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      fontSize: 10,
      padding: "2px 8px",
      borderRadius: 10,
      background: C.blue + "18",
      color: C.blue,
      fontWeight: 600
    }
  }, t)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      padding: "2px 8px",
      borderRadius: 10,
      background: "#F0EDE6",
      color: C.muted,
      fontWeight: 600
    }
  }, r.cuisine)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 12
    }
  }, "\u23F1 ", r.time, " min \xB7 \uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67 ", r.servings, " servings"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (!recipes.find(x => x.title === r.title)) saveRecipes([...recipes, {
        id: uid(),
        title: r.title,
        emoji: r.emoji,
        tags: r.tags,
        time: r.time,
        servings: r.servings,
        ingredients: [],
        method: r.description
      }]);
    },
    style: {
      padding: "8px",
      borderRadius: 9,
      border: `1px solid ${C.accent}44`,
      background: recipes.find(x => x.title === r.title) ? C.green + "15" : C.accentLight,
      cursor: "pointer",
      fontSize: 12,
      fontFamily: "inherit",
      fontWeight: 700,
      color: recipes.find(x => x.title === r.title) ? C.green : C.accent
    }
  }, recipes.find(x => x.title === r.title) ? "✓ In your library" : "+ Save to library"))), filteredDiscover.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1/-1",
      textAlign: "center",
      padding: "40px 0",
      color: C.muted,
      fontSize: 13
    }
  }, "No recipes match. Try a different search or filter.")), connectModal && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.42)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100
    },
    onClick: e => {
      if (e.target === e.currentTarget) setConnectModal(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 18,
      padding: 32,
      width: 460,
      maxWidth: "92vw",
      boxShadow: "0 28px 70px rgba(0,0,0,0.2)",
      fontFamily: "Georgia,serif"
    },
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      marginBottom: 12,
      textAlign: "center"
    }
  }, "\uD83C\uDF74"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 900,
      fontSize: 20,
      marginBottom: 4,
      textAlign: "center"
    }
  }, "Connect Spoonacular"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      textAlign: "center",
      lineHeight: 1.6,
      marginBottom: 24
    }
  }, "Get a free API key at ", /*#__PURE__*/React.createElement("a", {
    href: "https://spoonacular.com/food-api",
    target: "_blank",
    rel: "noreferrer",
    style: {
      color: C.accent
    }
  }, "spoonacular.com/food-api"), ". Your key is stored locally only \u2014 never sent anywhere except Spoonacular."), /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Spoonacular API key"
  }, /*#__PURE__*/React.createElement(Inp, {
    value: spoonApiKey,
    onChange: setSpoonApiKey,
    placeholder: "Paste your key here\u2026",
    type: "password"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginBottom: 20,
      lineHeight: 1.6
    }
  }, "\uD83D\uDD12 Your key stays on this device. No third-party connections other than Spoonacular."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (spoonApiKey.trim()) {
        setSpoonConnected(true);
        setConnectModal(false);
      }
    },
    style: {
      padding: "10px 24px",
      borderRadius: 9,
      border: "none",
      background: spoonApiKey.trim() ? C.accent : "#CCC8BF",
      color: "#fff",
      cursor: spoonApiKey.trim() ? "pointer" : "not-allowed",
      fontWeight: 700,
      fontSize: 14,
      fontFamily: "inherit"
    }
  }, "Connect"), /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    onClick: () => setConnectModal(false)
  }, "Cancel")))), /*#__PURE__*/React.createElement(AIMealPanel, {
    family: family
  }));
  return /*#__PURE__*/React.createElement("div", null, confirmDialog, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.accent,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      marginBottom: 6,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDF74"), " Kitchen Table"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "0 0 6px",
      fontSize: 28,
      fontWeight: 900,
      letterSpacing: -.5,
      color: C.text
    }
  }, "Meals & Kitchen"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: C.muted,
      lineHeight: 1.65
    }
  }, "Plan the week, save what works, shop with one tap.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      background: "#EDEAE2",
      padding: 4,
      borderRadius: 12,
      marginBottom: 32,
      width: "fit-content",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(TabPill, {
    id: "planner",
    label: "\uD83D\uDCC5 Weekly planner"
  }), /*#__PURE__*/React.createElement(TabPill, {
    id: "library",
    label: "\uD83D\uDCD6 Recipe library"
  }), /*#__PURE__*/React.createElement(TabPill, {
    id: "discover",
    label: "\uD83C\uDF10 Discover recipes"
  })), tab === "planner" && /*#__PURE__*/React.createElement(PlannerTab, null), tab === "library" && /*#__PURE__*/React.createElement(RecipeLibraryTab, null), tab === "discover" && /*#__PURE__*/React.createElement(DiscoverTab, null));
}

// ── House Admin ───────────────────────────────────────────────

const SEED_HOUSE_ADMIN = {
  documents: [{
    id: "doc1",
    title: "Home Insurance Policy 2025",
    tag: "insurance",
    date: "2025-01-15",
    notes: "Renewal due January 2026. Provider: AXA Home.",
    fileUrl: null
  }, {
    id: "doc2",
    title: "Mortgage Agreement",
    tag: "contracts",
    date: "2023-06-01",
    notes: "Fixed rate until 2028. See solicitor file for full pack.",
    fileUrl: null
  }, {
    id: "doc3",
    title: "Boiler Service Warranty",
    tag: "warranties",
    date: "2024-11-03",
    notes: "5-year warranty, expires Nov 2029. Provider: British Gas.",
    fileUrl: null
  }, {
    id: "doc4",
    title: "Lease Agreement",
    tag: "contracts",
    date: "2022-09-01",
    notes: "3-year lease, break clause at 18 months.",
    fileUrl: null
  }],
  bills: [{
    id: "bill1",
    name: "Mortgage / Rent",
    amount: 1450,
    billing_day: 1,
    frequency: "monthly",
    status: "active",
    category: "housing"
  }, {
    id: "bill2",
    name: "Electricity",
    amount: 110,
    billing_day: 15,
    frequency: "monthly",
    status: "active",
    category: "utilities"
  }, {
    id: "bill3",
    name: "Gas",
    amount: 65,
    billing_day: 15,
    frequency: "monthly",
    status: "active",
    category: "utilities"
  }, {
    id: "bill4",
    name: "Broadband",
    amount: 42,
    billing_day: 20,
    frequency: "monthly",
    status: "active",
    category: "utilities"
  }, {
    id: "bill5",
    name: "Netflix",
    amount: 17.99,
    billing_day: 8,
    frequency: "monthly",
    status: "active",
    category: "subscriptions"
  }, {
    id: "bill6",
    name: "Spotify Family",
    amount: 16.99,
    billing_day: 12,
    frequency: "monthly",
    status: "active",
    category: "subscriptions"
  }, {
    id: "bill7",
    name: "Home Insurance",
    amount: 520,
    billing_day: 1,
    frequency: "annual",
    status: "active",
    category: "insurance"
  }, {
    id: "bill8",
    name: "Car Insurance",
    amount: 780,
    billing_day: 1,
    frequency: "annual",
    status: "active",
    category: "insurance"
  }, {
    id: "bill9",
    name: "Disney+",
    amount: 4.99,
    billing_day: 22,
    frequency: "monthly",
    status: "cancelled",
    category: "subscriptions"
  }],
  repairs: [{
    id: "rep1",
    title: "Leaking kitchen tap",
    date: "2026-04-10",
    status: "pending",
    priority: "high",
    notes: "Slow drip under the sink. Need plumber — ask Dave first."
  }, {
    id: "rep2",
    title: "Cracked bathroom tile",
    date: "2026-03-22",
    status: "in_progress",
    priority: "low",
    notes: "Ordered replacement tile from Tile Depot, arrives 20 May."
  }, {
    id: "rep3",
    title: "Fence panel replacement",
    date: "2026-02-14",
    status: "done",
    priority: "medium",
    notes: "Replaced two panels on south side. Cost €180."
  }, {
    id: "rep4",
    title: "Boiler annual service",
    date: "2026-05-01",
    status: "pending",
    priority: "high",
    notes: "Due every October. Book with British Gas HomeCare."
  }, {
    id: "rep5",
    title: "Paint hallway",
    date: "2025-12-01",
    status: "done",
    priority: "low",
    notes: "Used Dulux Polished Pebble. 2 coats. 1.5 tins remaining."
  }],
  contacts: [{
    id: "con1",
    name: "Dave Murphy – Plumber",
    phone: "087 123 4567",
    email: "dave@murphyplumbing.ie",
    category: "tradesperson",
    notes: "Reliable and reasonably priced. Prefers WhatsApp."
  }, {
    id: "con2",
    name: "Sarah Reilly – Estate Agent",
    phone: "01 234 5678",
    email: "sarah@reillyprops.ie",
    category: "agent",
    notes: "Managed our lettings agreement."
  }, {
    id: "con3",
    name: "Mr. Forde – Landlord",
    phone: "086 999 8888",
    email: "bforde@gmail.com",
    category: "landlord",
    notes: "Prefers email for non-urgent matters."
  }, {
    id: "con4",
    name: "ESB Networks – Emergency",
    phone: "1800 372 999",
    email: "",
    category: "utility",
    notes: "24hr emergency line for power cuts."
  }, {
    id: "con5",
    name: "Aoife – Next Door",
    phone: "085 321 7654",
    email: "aoife@gmail.com",
    category: "neighbour",
    notes: "Has spare key. Great for parcel drop-offs."
  }]
};
const DOC_TAGS = ["insurance", "contracts", "warranties", "certificates", "planning", "other"];
const DOC_TAG_STYLES = {
  insurance: {
    bg: "#EBF3FF",
    color: "#4A7BB5"
  },
  contracts: {
    bg: C.accentLight,
    color: C.accent
  },
  warranties: {
    bg: "#EEF9F3",
    color: "#4A9B6F"
  },
  certificates: {
    bg: "#F3EEFF",
    color: "#9B6FB5"
  },
  planning: {
    bg: "#FFFBEA",
    color: "#B8960C"
  },
  other: {
    bg: "#F0EDE6",
    color: C.muted
  }
};
const REPAIR_STATUSES = ["pending", "in_progress", "done"];
const REPAIR_PRIORITIES = ["low", "medium", "high"];
const CONTACT_CATS = ["tradesperson", "landlord", "agent", "utility", "neighbour", "other"];
const CONTACT_CAT_EMOJI = {
  tradesperson: "🔧",
  landlord: "🏠",
  agent: "🤝",
  utility: "⚡",
  neighbour: "👋",
  other: "📋"
};
const BILL_CATS = ["housing", "utilities", "subscriptions", "insurance", "other"];
const BILL_CAT_EMOJI = {
  housing: "🏠",
  utilities: "⚡",
  subscriptions: "📱",
  insurance: "🛡️",
  other: "📋"
};

// ── Shared hoisted section primitives ─────────────────────
// These replace duplicated nested component definitions across
// HouseAdmin, Finance, and Planning sections.

const SectionTabPill = ({
  id,
  label,
  icon,
  activeId,
  onSelect
}) => /*#__PURE__*/React.createElement("button", {
  onClick: () => onSelect(id),
  style: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    padding: "9px 18px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: activeId === id ? 700 : 500,
    fontSize: 13,
    background: activeId === id ? "#fff" : "transparent",
    color: activeId === id ? C.text : C.muted,
    boxShadow: activeId === id ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
    transition: "all .15s"
  }
}, icon && /*#__PURE__*/React.createElement("span", null, icon), label);
const SharedSectionHead = ({
  icon,
  emoji,
  title,
  sub,
  action
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 4
  }
}, (icon || emoji) && /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 22
  }
}, icon || emoji), /*#__PURE__*/React.createElement("h2", {
  style: {
    margin: 0,
    fontSize: 22,
    fontWeight: 900,
    letterSpacing: -.5,
    color: C.text
  }
}, title)), sub && /*#__PURE__*/React.createElement("p", {
  style: {
    margin: 0,
    fontSize: 13,
    color: C.muted,
    lineHeight: 1.65,
    maxWidth: 480
  }
}, sub)), action && /*#__PURE__*/React.createElement("div", {
  style: {
    flexShrink: 0
  }
}, action));
const SharedStatCard = ({
  label,
  value,
  sub,
  color,
  icon
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    background: "#fff",
    borderRadius: 14,
    border: `1px solid ${C.border}`,
    padding: "18px 20px",
    flex: 1,
    minWidth: 140
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 6
  }
}, icon && /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 18
  }
}, icon), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    fontWeight: 700,
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: .8
  }
}, label)), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 26,
    fontWeight: 900,
    color,
    letterSpacing: -.5,
    marginBottom: 4
  }
}, value), sub && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12,
    color: C.muted
  }
}, sub));
const SharedProgressBar = ({
  spent,
  budgeted,
  color,
  height = 8
}) => {
  const p = budgeted > 0 ? Math.min(100, Math.round(spent / budgeted * 100)) : 0;
  const over = spent > budgeted;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.border,
      borderRadius: 99,
      height,
      overflow: "hidden",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      borderRadius: 99,
      transition: "width .4s",
      width: `${p}%`,
      background: over ? "#C94F4F" : p > 85 ? "#D4A843" : color
    }
  }));
};
const SharedEmptyState = ({
  emoji,
  title,
  body,
  onAdd,
  addLabel
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    textAlign: "center",
    padding: "52px 24px",
    background: "#fff",
    borderRadius: 16,
    border: `1px solid ${C.border}`
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 48,
    marginBottom: 14
  }
}, emoji), /*#__PURE__*/React.createElement("div", {
  style: {
    fontWeight: 800,
    fontSize: 17,
    color: C.text,
    marginBottom: 8
  }
}, title), body && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 13,
    color: C.muted,
    lineHeight: 1.7,
    maxWidth: 320,
    margin: "0 auto 20px"
  }
}, body), onAdd && /*#__PURE__*/React.createElement("button", {
  onClick: onAdd,
  style: {
    padding: "9px 22px",
    borderRadius: 9,
    border: "none",
    background: C.accent,
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 13,
    fontFamily: "inherit"
  }
}, addLabel || "Add"));
function repairStatusStyle(s) {
  if (s === "done") return {
    bg: "#EEF9F3",
    color: "#4A9B6F",
    label: "Done"
  };
  if (s === "in_progress") return {
    bg: "#EBF3FF",
    color: "#4A7BB5",
    label: "In progress"
  };
  return {
    bg: "#FFFBEA",
    color: "#B8960C",
    label: "Pending"
  };
}
function repairPriorityStyle(p) {
  if (p === "high") return {
    color: C.red,
    label: "High"
  };
  if (p === "medium") return {
    color: C.yellow,
    label: "Medium"
  };
  return {
    color: C.muted,
    label: "Low"
  };
}
function HouseAdmin() {
  const {
    family,
    updateFamily
  } = useFamilyCtx();
  const admin = family.house_admin || SEED_HOUSE_ADMIN;
  function saveAdmin(patch) {
    updateFamily({
      house_admin: {
        ...admin,
        ...patch
      }
    });
  }
  const euro = getCurrencyFormatter(family);
  const [tab, setTab] = useState("documents");
  const {
    confirmDialog,
    requestConfirm
  } = useConfirm();

  // ── shared UI atoms ────────────────────────────────────────
  // TabPill → uses hoisted SectionTabPill

  // SectionHead → uses hoisted SharedSectionHead;

  // EmptyState → uses hoisted SharedEmptyState;

  // ── shared modal shell ─────────────────────────────────────
  const Modal = ({
    width = 480,
    onClose,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100
    },
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: 28,
      width,
      maxWidth: "92vw",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 28px 70px rgba(0,0,0,0.2)",
      fontFamily: "Georgia,serif"
    },
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation()
  }, children));

  // ══════════════════════════════════════════════════════════
  // DOCUMENTS
  // ══════════════════════════════════════════════════════════
  const DocumentsTab = () => {
    const docs = admin.documents || [];
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [tagFilter, setTagFilter] = useState("all");
    const blank = {
      title: "",
      tag: "insurance",
      date: new Date().toISOString().split("T")[0],
      notes: ""
    };
    const [form, setForm] = useState(blank);
    function openNew() {
      setForm(blank);
      setEditId(null);
      setShowForm(true);
    }
    function openEdit(d) {
      setForm({
        title: d.title,
        tag: d.tag,
        date: d.date,
        notes: d.notes || ""
      });
      setEditId(d.id);
      setShowForm(true);
    }
    function closeForm() {
      setShowForm(false);
      setEditId(null);
    }
    function save() {
      if (!form.title.trim()) return;
      let next;
      if (editId) {
        next = docs.map(d => d.id === editId ? {
          ...d,
          ...form
        } : d);
      } else {
        next = [...docs, {
          id: uid(),
          ...form,
          fileUrl: null
        }];
      }
      saveAdmin({
        documents: next
      });
      closeForm();
    }
    async function del(id) {
      const title = docs.find(d => d.id === id)?.title || "this document";
      const ok = await requestConfirm({
        message: "Delete document?",
        detail: `"${title}" will be permanently removed.`
      });
      if (!ok) return;
      saveAdmin({
        documents: docs.filter(d => d.id !== id)
      });
      closeForm();
    }
    const visible = tagFilter === "all" ? docs : docs.filter(d => d.tag === tagFilter);
    const grouped = DOC_TAGS.reduce((acc, t) => {
      const items = visible.filter(d => d.tag === t);
      if (items.length) acc[t] = items;
      return acc;
    }, {});
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SharedSectionHead, {
      icon: "\uD83D\uDCC4",
      title: "Documents",
      sub: "Store important household documents \u2014 insurance, contracts, warranties \u2014 in one place.",
      action: /*#__PURE__*/React.createElement("button", {
        onClick: openNew,
        style: {
          padding: "9px 20px",
          borderRadius: 10,
          border: "none",
          background: C.accent,
          color: "#fff",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 13,
          fontFamily: "inherit",
          flexShrink: 0
        }
      }, "+ Add document")
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        marginBottom: 20
      }
    }, ["all", ...DOC_TAGS].map(t => /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: () => setTagFilter(t),
      style: {
        padding: "5px 14px",
        borderRadius: 20,
        border: `1.5px solid ${tagFilter === t ? C.accent : C.border}`,
        background: tagFilter === t ? C.accentLight : "#fff",
        cursor: "pointer",
        fontSize: 12,
        fontFamily: "inherit",
        fontWeight: tagFilter === t ? 700 : 400,
        color: tagFilter === t ? C.accent : C.muted
      }
    }, t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)))), docs.length === 0 && /*#__PURE__*/React.createElement(SharedEmptyState, {
      emoji: "\uD83D\uDCC4",
      title: "No documents yet",
      body: "Add your insurance policies, mortgage agreement, warranties, and other important household documents.",
      onAdd: openNew,
      addLabel: "Add first document"
    }), Object.entries(grouped).map(([tag, items]) => {
      const ts = DOC_TAG_STYLES[tag] || DOC_TAG_STYLES.other;
      return /*#__PURE__*/React.createElement("div", {
        key: tag,
        style: {
          marginBottom: 24
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 10,
          padding: "3px 12px",
          borderRadius: 20,
          background: ts.bg,
          color: ts.color,
          fontSize: 11,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: 1
        }
      }, tag, /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 400,
          opacity: .7
        }
      }, "(", items.length, ")")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 8
        }
      }, items.map(doc => /*#__PURE__*/React.createElement("div", {
        key: doc.id,
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          padding: "16px 18px",
          borderRadius: 12,
          background: "#fff",
          border: `1px solid ${C.border}`,
          cursor: "pointer",
          transition: "box-shadow .15s,border-color .15s"
        },
        onClick: () => openEdit(doc),
        onMouseEnter: e => {
          e.currentTarget.style.borderColor = ts.color;
          e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,0,0,0.07)";
        },
        onMouseLeave: e => {
          e.currentTarget.style.borderColor = C.border;
          e.currentTarget.style.boxShadow = "none";
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 40,
          height: 40,
          borderRadius: 10,
          background: ts.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0
        }
      }, "\uD83D\uDCC4"), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 700,
          fontSize: 14,
          color: C.text,
          marginBottom: 3
        }
      }, doc.title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: C.muted
        }
      }, "Added ", new Date(doc.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })), doc.notes && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: C.muted,
          marginTop: 5,
          lineHeight: 1.5,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis"
        }
      }, doc.notes)), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6,
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          padding: "2px 8px",
          borderRadius: 8,
          background: ts.bg,
          color: ts.color,
          fontWeight: 700
        }
      }, tag), doc.fileUrl ? /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: C.green,
          fontWeight: 600
        }
      }, "\u2713 File attached") : /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: C.muted
        }
      }, "No file"))))));
    }), visible.length === 0 && docs.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "32px",
        color: C.muted,
        fontSize: 13
      }
    }, "No documents in this category."), showForm && /*#__PURE__*/React.createElement(Modal, {
      onClose: closeForm
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 900,
        fontSize: 20,
        marginBottom: 4
      }
    }, editId ? "Edit document" : "Add document"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginBottom: 24
      }
    }, "Uploads connect when cloud storage is wired up."), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Document title"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: form.title,
      onChange: v => setForm(f => ({
        ...f,
        title: v
      })),
      placeholder: "e.g. \"Home Insurance 2025\""
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Tag"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 6
      }
    }, DOC_TAGS.map(t => {
      const ts = DOC_TAG_STYLES[t] || DOC_TAG_STYLES.other;
      return /*#__PURE__*/React.createElement("button", {
        key: t,
        onClick: () => setForm(f => ({
          ...f,
          tag: t
        })),
        style: {
          padding: "6px 14px",
          borderRadius: 20,
          cursor: "pointer",
          border: `1.5px solid ${form.tag === t ? ts.color : C.border}`,
          background: form.tag === t ? ts.bg : "#fff",
          fontSize: 12,
          fontFamily: "inherit",
          fontWeight: form.tag === t ? 700 : 400,
          color: form.tag === t ? ts.color : C.muted
        }
      }, t.charAt(0).toUpperCase() + t.slice(1));
    }))), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Date added"
    }, /*#__PURE__*/React.createElement("input", {
      type: "date",
      value: form.date,
      onChange: e => setForm(f => ({
        ...f,
        date: e.target.value
      })),
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 13,
        fontFamily: "inherit",
        width: "100%",
        boxSizing: "border-box"
      }
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Notes (optional)"
    }, /*#__PURE__*/React.createElement("textarea", {
      value: form.notes,
      onChange: e => setForm(f => ({
        ...f,
        notes: e.target.value
      })),
      rows: 3,
      placeholder: "Any useful context \u2014 renewal date, policy number, key contact\u2026",
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 13,
        fontFamily: "Georgia,serif",
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        lineHeight: 1.7,
        outline: "none"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        border: `2px dashed ${C.border}`,
        borderRadius: 10,
        padding: "20px",
        textAlign: "center",
        marginBottom: 20,
        background: "#FAFAF7",
        cursor: "not-allowed"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 24,
        marginBottom: 6
      }
    }, "\uD83D\uDCCE"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.muted
      }
    }, "File upload \u2014 connects when cloud storage is configured")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: save,
      style: {
        padding: "10px 24px",
        borderRadius: 9,
        border: "none",
        background: C.accent,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 14,
        fontFamily: "inherit"
      }
    }, "Save document"), /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: closeForm
    }, "Cancel"), editId && /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      onClick: () => del(editId)
    }, "Delete"))));
  };

  // ══════════════════════════════════════════════════════════
  // BILLS & SUBSCRIPTIONS
  // ══════════════════════════════════════════════════════════
  const BillsTab = () => {
    const bills = admin.bills || [];
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [catFilter, setCatFilter] = useState("all");
    const [showCancelled, setShowCancelled] = useState(false);
    const blank = {
      name: "",
      amount: "",
      billing_day: "1",
      frequency: "monthly",
      status: "active",
      category: "utilities"
    };
    const [form, setForm] = useState(blank);
    function openNew() {
      setForm(blank);
      setEditId(null);
      setShowForm(true);
    }
    function openEdit(b) {
      setForm({
        name: b.name,
        amount: String(b.amount),
        billing_day: String(b.billing_day),
        frequency: b.frequency,
        status: b.status,
        category: b.category
      });
      setEditId(b.id);
      setShowForm(true);
    }
    function closeForm() {
      setShowForm(false);
      setEditId(null);
    }
    function save() {
      if (!form.name.trim() || !form.amount) return;
      const built = {
        ...form,
        amount: parseFloat(form.amount),
        billing_day: parseInt(form.billing_day) || 1
      };
      saveAdmin({
        bills: editId ? bills.map(b => b.id === editId ? {
          ...b,
          ...built
        } : b) : [...bills, {
          id: uid(),
          ...built
        }]
      });
      closeForm();
    }
    async function del(id) {
      const name = bills.find(b => b.id === id)?.name || "this bill";
      const ok = await requestConfirm({
        message: "Delete bill?",
        detail: `"${name}" will be permanently removed. Use Cancel instead if you want to keep the record.`
      });
      if (!ok) return;
      saveAdmin({
        bills: bills.filter(b => b.id !== id)
      });
      closeForm();
    }
    function toggleStatus(id) {
      saveAdmin({
        bills: bills.map(b => b.id === id ? {
          ...b,
          status: b.status === "active" ? "cancelled" : "active"
        } : b)
      });
    }
    const active = bills.filter(b => b.status === "active");
    const cancelled = bills.filter(b => b.status === "cancelled");
    const visible = catFilter === "all" ? active : active.filter(b => b.category === catFilter);
    const grouped = BILL_CATS.reduce((acc, cat) => {
      const items = visible.filter(b => b.category === cat);
      if (items.length) acc[cat] = items;
      return acc;
    }, {});
    const monthlyTotal = active.filter(b => b.frequency === "monthly").reduce((s, b) => s + Number(b.amount), 0);
    const annualTotal = active.filter(b => b.frequency === "annual").reduce((s, b) => s + Number(b.amount), 0);
    const effectiveMo = monthlyTotal + annualTotal / 12;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SharedSectionHead, {
      icon: "\uD83D\uDCB3",
      title: "Bills & Subscriptions",
      sub: "Track all recurring payments in one place. Toggle any bill to cancelled to hide it from totals.",
      action: /*#__PURE__*/React.createElement("button", {
        onClick: openNew,
        style: {
          padding: "9px 20px",
          borderRadius: 10,
          border: "none",
          background: C.accent,
          color: "#fff",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 13,
          fontFamily: "inherit",
          flexShrink: 0
        }
      }, "+ Add bill")
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        marginBottom: 24,
        flexWrap: "wrap"
      }
    }, [{
      label: "Monthly committed",
      value: euro(monthlyTotal),
      sub: `${active.filter(b => b.frequency === "monthly").length} bills`,
      color: C.blue
    }, {
      label: "Annual committed",
      value: euro(annualTotal),
      sub: `${active.filter(b => b.frequency === "annual").length} bills`,
      color: C.accent
    }, {
      label: "Effective monthly",
      value: euro(effectiveMo),
      sub: "incl. annual bills ÷ 12",
      color: C.green
    }].map(s => /*#__PURE__*/React.createElement("div", {
      key: s.label,
      style: {
        background: "#fff",
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        padding: "14px 18px",
        flex: 1,
        minWidth: 130
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 22,
        fontWeight: 900,
        color: s.color,
        marginBottom: 3
      }
    }, s.value), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: C.text
      }
    }, s.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginTop: 2
      }
    }, s.sub)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        marginBottom: 20
      }
    }, ["all", ...BILL_CATS].map(c => /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: () => setCatFilter(c),
      style: {
        padding: "5px 13px",
        borderRadius: 20,
        border: `1.5px solid ${catFilter === c ? C.accent : C.border}`,
        background: catFilter === c ? C.accentLight : "#fff",
        cursor: "pointer",
        fontSize: 12,
        fontFamily: "inherit",
        fontWeight: catFilter === c ? 700 : 400,
        color: catFilter === c ? C.accent : C.muted
      }
    }, c === "all" ? "All" : /*#__PURE__*/React.createElement(React.Fragment, null, BILL_CAT_EMOJI[c], " ", c.charAt(0).toUpperCase() + c.slice(1))))), bills.length === 0 && /*#__PURE__*/React.createElement(SharedEmptyState, {
      emoji: "\uD83D\uDCB3",
      title: "No bills yet",
      body: "Add your mortgage, utilities, subscriptions, and insurance to get a full picture of your recurring outgoings.",
      onAdd: openNew,
      addLabel: "Add first bill"
    }), Object.entries(grouped).map(([cat, items]) => /*#__PURE__*/React.createElement("div", {
      key: cat,
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, BILL_CAT_EMOJI[cat]), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: 1.2,
        color: C.muted
      }
    }, cat)), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 80px 90px 90px 80px",
        gap: 0,
        padding: "9px 16px",
        background: "#F8F6F2",
        borderBottom: `1px solid ${C.border}`,
        fontSize: 10,
        fontWeight: 700,
        color: C.muted,
        textTransform: "uppercase",
        letterSpacing: .8
      }
    }, /*#__PURE__*/React.createElement("span", null, "Name"), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "right"
      }
    }, "Amount"), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "center"
      }
    }, "Due day"), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "center"
      }
    }, "Frequency"), /*#__PURE__*/React.createElement("span", {
      style: {
        textAlign: "center"
      }
    }, "Action")), items.map((bill, i) => /*#__PURE__*/React.createElement("div", {
      key: bill.id,
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 80px 90px 90px 80px",
        gap: 0,
        padding: "12px 16px",
        alignItems: "center",
        borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none",
        transition: "background .12s"
      },
      onMouseEnter: e => e.currentTarget.style.background = "#FAFAF7",
      onMouseLeave: e => e.currentTarget.style.background = "transparent"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer"
      },
      onClick: () => openEdit(bill)
    }, bill.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        fontWeight: 800,
        fontSize: 14
      }
    }, euro(bill.amount)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        fontSize: 13,
        color: C.muted
      }
    }, "Day ", bill.billing_day), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        padding: "3px 9px",
        borderRadius: 10,
        fontWeight: 700,
        background: bill.frequency === "monthly" ? C.blue + "18" : C.accent + "18",
        color: bill.frequency === "monthly" ? C.blue : C.accent
      }
    }, bill.frequency)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggleStatus(bill.id),
      style: {
        padding: "4px 10px",
        borderRadius: 7,
        border: `1px solid ${C.border}`,
        background: "#fff",
        cursor: "pointer",
        fontSize: 11,
        fontFamily: "inherit",
        color: C.muted,
        fontWeight: 600
      }
    }, "Cancel"))))))), visible.length === 0 && bills.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "28px",
        color: C.muted,
        fontSize: 13
      }
    }, "No active bills in this category."), cancelled.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setShowCancelled(v => !v),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 13,
        color: C.muted,
        fontFamily: "inherit",
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: 0,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10
      }
    }, showCancelled ? "▾" : "▸"), "Cancelled (", cancelled.length, ")"), showCancelled && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, cancelled.map(b => /*#__PURE__*/React.createElement("div", {
      key: b.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 16px",
        borderRadius: 10,
        background: "#F5F3EE",
        border: `1px solid ${C.border}`,
        opacity: .6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontWeight: 600,
        fontSize: 13,
        textDecoration: "line-through",
        color: C.muted
      }
    }, b.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.muted
      }
    }, euro(b.amount)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        padding: "2px 8px",
        borderRadius: 8,
        background: C.red + "18",
        color: C.red,
        fontWeight: 700
      }
    }, "Cancelled"), /*#__PURE__*/React.createElement("button", {
      onClick: () => toggleStatus(b.id),
      style: {
        padding: "4px 10px",
        borderRadius: 7,
        border: `1px solid ${C.border}`,
        background: "#fff",
        cursor: "pointer",
        fontSize: 11,
        fontFamily: "inherit",
        color: C.muted
      }
    }, "Restore"), /*#__PURE__*/React.createElement("button", {
      onClick: () => del(b.id),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.muted,
        fontSize: 16,
        lineHeight: 1
      }
    }, "\xD7"))))), showForm && /*#__PURE__*/React.createElement(Modal, {
      onClose: closeForm
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 900,
        fontSize: 20,
        marginBottom: 20
      }
    }, editId ? "Edit bill" : "Add bill"), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Name"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: form.name,
      onChange: v => setForm(f => ({
        ...f,
        name: v
      })),
      placeholder: "e.g. \"Netflix\", \"Electricity\""
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(FieldGroup, {
      label: `Amount (${CURRENCIES[family.currency || "EUR"].symbol})`
    }, /*#__PURE__*/React.createElement(Inp, {
      value: form.amount,
      type: "number",
      onChange: v => setForm(f => ({
        ...f,
        amount: v
      })),
      placeholder: "0.00"
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Billing day of month"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: form.billing_day,
      type: "number",
      onChange: v => setForm(f => ({
        ...f,
        billing_day: v
      })),
      placeholder: "1"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Frequency"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, ["monthly", "annual"].map(freq => /*#__PURE__*/React.createElement("button", {
      key: freq,
      onClick: () => setForm(f => ({
        ...f,
        frequency: freq
      })),
      style: {
        flex: 1,
        padding: "9px",
        borderRadius: 8,
        border: `1.5px solid ${form.frequency === freq ? C.accent : C.border}`,
        background: form.frequency === freq ? C.accentLight : "#fff",
        cursor: "pointer",
        fontSize: 12,
        fontFamily: "inherit",
        fontWeight: form.frequency === freq ? 700 : 400,
        color: form.frequency === freq ? C.accent : C.muted
      }
    }, freq.charAt(0).toUpperCase() + freq.slice(1))))), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Category"
    }, /*#__PURE__*/React.createElement("select", {
      value: form.category,
      onChange: e => setForm(f => ({
        ...f,
        category: e.target.value
      })),
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 13,
        fontFamily: "inherit",
        width: "100%",
        boxSizing: "border-box"
      }
    }, BILL_CATS.map(c => /*#__PURE__*/React.createElement("option", {
      key: c,
      value: c
    }, BILL_CAT_EMOJI[c], " ", c.charAt(0).toUpperCase() + c.slice(1)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: save,
      style: {
        padding: "10px 24px",
        borderRadius: 9,
        border: "none",
        background: C.accent,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 14,
        fontFamily: "inherit"
      }
    }, "Save bill"), /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: closeForm
    }, "Cancel"), editId && /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      onClick: () => del(editId)
    }, "Delete"))));
  };

  // ══════════════════════════════════════════════════════════
  // REPAIRS & MAINTENANCE
  // ══════════════════════════════════════════════════════════
  const RepairsTab = () => {
    const repairs = admin.repairs || [];
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [statusFilter, setStatusFilter] = useState("all");
    const blank = {
      title: "",
      date: new Date().toISOString().split("T")[0],
      status: "pending",
      priority: "medium",
      notes: ""
    };
    const [form, setForm] = useState(blank);
    function openNew() {
      setForm(blank);
      setEditId(null);
      setShowForm(true);
    }
    function openEdit(r) {
      setForm({
        title: r.title,
        date: r.date,
        status: r.status,
        priority: r.priority,
        notes: r.notes || ""
      });
      setEditId(r.id);
      setShowForm(true);
    }
    function closeForm() {
      setShowForm(false);
      setEditId(null);
    }
    function save() {
      if (!form.title.trim()) return;
      saveAdmin({
        repairs: editId ? repairs.map(r => r.id === editId ? {
          ...r,
          ...form
        } : r) : [...repairs, {
          id: uid(),
          ...form
        }]
      });
      closeForm();
    }
    async function del(id) {
      const title = repairs.find(r => r.id === id)?.title || "this repair";
      const ok = await requestConfirm({
        message: "Delete repair?",
        detail: `"${title}" will be permanently removed from the log.`
      });
      if (!ok) return;
      saveAdmin({
        repairs: repairs.filter(r => r.id !== id)
      });
      closeForm();
    }
    function cycleStatus(id) {
      const order = ["pending", "in_progress", "done"];
      saveAdmin({
        repairs: repairs.map(r => r.id === id ? {
          ...r,
          status: order[(order.indexOf(r.status) + 1) % 3]
        } : r)
      });
    }
    const visible = statusFilter === "all" ? repairs : repairs.filter(r => r.status === statusFilter);
    const counts = {
      pending: repairs.filter(r => r.status === "pending").length,
      in_progress: repairs.filter(r => r.status === "in_progress").length,
      done: repairs.filter(r => r.status === "done").length
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SharedSectionHead, {
      icon: "\uD83D\uDD27",
      title: "Repairs & Maintenance",
      sub: "Track outstanding jobs, ongoing work, and completed repairs. Tap a status badge to cycle it.",
      action: /*#__PURE__*/React.createElement("button", {
        onClick: openNew,
        style: {
          padding: "9px 20px",
          borderRadius: 10,
          border: "none",
          background: C.accent,
          color: "#fff",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 13,
          fontFamily: "inherit",
          flexShrink: 0
        }
      }, "+ Log repair")
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 22,
        flexWrap: "wrap"
      }
    }, [{
      id: "all",
      label: "All",
      count: repairs.length,
      bg: "#F0EDE6",
      color: C.muted
    }, {
      id: "pending",
      label: "Pending",
      count: counts.pending,
      bg: "#FFFBEA",
      color: "#B8960C"
    }, {
      id: "in_progress",
      label: "In progress",
      count: counts.in_progress,
      bg: "#EBF3FF",
      color: "#4A7BB5"
    }, {
      id: "done",
      label: "Done",
      count: counts.done,
      bg: "#EEF9F3",
      color: "#4A9B6F"
    }].map(s => /*#__PURE__*/React.createElement("button", {
      key: s.id,
      onClick: () => setStatusFilter(s.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 16px",
        borderRadius: 12,
        border: `1.5px solid ${statusFilter === s.id ? s.color : C.border}`,
        background: statusFilter === s.id ? s.bg : "#fff",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all .15s"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        fontWeight: 900,
        color: s.color
      }
    }, s.count), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: statusFilter === s.id ? 700 : 400,
        color: statusFilter === s.id ? s.color : C.muted
      }
    }, s.label)))), repairs.length === 0 && /*#__PURE__*/React.createElement(SharedEmptyState, {
      emoji: "\uD83D\uDD27",
      title: "No repairs logged",
      body: "Keep track of leaks, broken fittings, maintenance jobs, and anything else that needs attention around the house.",
      onAdd: openNew,
      addLabel: "Log first repair"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, visible.map(r => {
      const ss = repairStatusStyle(r.status);
      const ps = repairPriorityStyle(r.priority);
      return /*#__PURE__*/React.createElement("div", {
        key: r.id,
        style: {
          background: "#fff",
          borderRadius: 14,
          border: `1px solid ${C.border}`,
          padding: "18px 20px",
          borderLeft: `4px solid ${ss.color}`,
          transition: "box-shadow .15s"
        },
        onMouseEnter: e => e.currentTarget.style.boxShadow = "0 3px 14px rgba(0,0,0,0.07)",
        onMouseLeave: e => e.currentTarget.style.boxShadow = "none"
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 12
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 6,
          flexWrap: "wrap"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 800,
          fontSize: 15,
          color: C.text
        }
      }, r.title), /*#__PURE__*/React.createElement("button", {
        onClick: () => cycleStatus(r.id),
        style: {
          padding: "3px 10px",
          borderRadius: 10,
          border: `1.5px solid ${ss.color}`,
          background: ss.bg,
          cursor: "pointer",
          fontSize: 11,
          fontFamily: "inherit",
          fontWeight: 700,
          color: ss.color,
          flexShrink: 0
        },
        title: "Click to cycle status"
      }, ss.label), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          padding: "2px 8px",
          borderRadius: 8,
          background: ps.color + "18",
          color: ps.color,
          fontWeight: 700
        }
      }, ps.label, " priority")), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: C.muted,
          marginBottom: r.notes ? 8 : 0
        }
      }, "\uD83D\uDCC5 ", new Date(r.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })), r.notes && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: C.muted,
          lineHeight: 1.6,
          padding: "8px 12px",
          background: "#FAFAF7",
          borderRadius: 8,
          fontStyle: "italic"
        }
      }, r.notes)), /*#__PURE__*/React.createElement("button", {
        onClick: () => openEdit(r),
        style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          color: C.muted,
          fontSize: 15,
          padding: "2px 4px",
          flexShrink: 0
        }
      }, "\u270E")));
    })), visible.length === 0 && repairs.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "32px",
        color: C.muted,
        fontSize: 13
      }
    }, "No repairs in this status."), showForm && /*#__PURE__*/React.createElement(Modal, {
      onClose: closeForm
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 900,
        fontSize: 20,
        marginBottom: 20
      }
    }, editId ? "Edit repair" : "Log repair"), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Title"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: form.title,
      onChange: v => setForm(f => ({
        ...f,
        title: v
      })),
      placeholder: "e.g. \"Fix leaking tap in kitchen\""
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Date logged"
    }, /*#__PURE__*/React.createElement("input", {
      type: "date",
      value: form.date,
      onChange: e => setForm(f => ({
        ...f,
        date: e.target.value
      })),
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 13,
        fontFamily: "inherit",
        width: "100%",
        boxSizing: "border-box"
      }
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Priority"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 5
      }
    }, REPAIR_PRIORITIES.map(p => {
      const ps = repairPriorityStyle(p);
      return /*#__PURE__*/React.createElement("button", {
        key: p,
        onClick: () => setForm(f => ({
          ...f,
          priority: p
        })),
        style: {
          flex: 1,
          padding: "9px 4px",
          borderRadius: 8,
          cursor: "pointer",
          border: `1.5px solid ${form.priority === p ? ps.color : C.border}`,
          background: form.priority === p ? ps.color + "15" : "#fff",
          fontSize: 11,
          fontFamily: "inherit",
          fontWeight: form.priority === p ? 700 : 400,
          color: form.priority === p ? ps.color : C.muted
        }
      }, p.charAt(0).toUpperCase() + p.slice(1));
    })))), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Status"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, REPAIR_STATUSES.map(s => {
      const ss = repairStatusStyle(s);
      return /*#__PURE__*/React.createElement("button", {
        key: s,
        onClick: () => setForm(f => ({
          ...f,
          status: s
        })),
        style: {
          flex: 1,
          padding: "9px",
          borderRadius: 8,
          cursor: "pointer",
          border: `1.5px solid ${form.status === s ? ss.color : C.border}`,
          background: form.status === s ? ss.bg : "#fff",
          fontSize: 12,
          fontFamily: "inherit",
          fontWeight: form.status === s ? 700 : 400,
          color: form.status === s ? ss.color : C.muted
        }
      }, ss.label);
    }))), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Notes (optional)"
    }, /*#__PURE__*/React.createElement("textarea", {
      value: form.notes,
      onChange: e => setForm(f => ({
        ...f,
        notes: e.target.value
      })),
      rows: 3,
      placeholder: "Quotes received, parts needed, tradesperson contact\u2026",
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 13,
        fontFamily: "Georgia,serif",
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        lineHeight: 1.7,
        outline: "none"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: save,
      style: {
        padding: "10px 24px",
        borderRadius: 9,
        border: "none",
        background: C.accent,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 14,
        fontFamily: "inherit"
      }
    }, "Save repair"), /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: closeForm
    }, "Cancel"), editId && /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      onClick: () => del(editId)
    }, "Delete"))));
  };

  // ══════════════════════════════════════════════════════════
  // HOME CONTACTS
  // ══════════════════════════════════════════════════════════
  const ContactsTab = () => {
    const contacts = admin.contacts || [];
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);
    const [catFilter, setCatFilter] = useState("all");
    const [search, setSearch] = useState("");
    const blank = {
      name: "",
      phone: "",
      email: "",
      category: "tradesperson",
      notes: ""
    };
    const [form, setForm] = useState(blank);
    function openNew() {
      setForm(blank);
      setEditId(null);
      setShowForm(true);
    }
    function openEdit(c) {
      setForm({
        name: c.name,
        phone: c.phone || "",
        email: c.email || "",
        category: c.category,
        notes: c.notes || ""
      });
      setEditId(c.id);
      setShowForm(true);
    }
    function closeForm() {
      setShowForm(false);
      setEditId(null);
    }
    function save() {
      if (!form.name.trim()) return;
      saveAdmin({
        contacts: editId ? contacts.map(c => c.id === editId ? {
          ...c,
          ...form
        } : c) : [...contacts, {
          id: uid(),
          ...form
        }]
      });
      closeForm();
    }
    async function del(id) {
      const name = contacts.find(c => c.id === id)?.name || "this contact";
      const ok = await requestConfirm({
        message: "Delete contact?",
        detail: `"${name}" will be permanently removed.`
      });
      if (!ok) return;
      saveAdmin({
        contacts: contacts.filter(c => c.id !== id)
      });
      closeForm();
    }
    const afterCat = catFilter === "all" ? contacts : contacts.filter(c => c.category === catFilter);
    const visible = !search ? afterCat : afterCat.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || (c.phone || "").includes(search) || (c.email || "").toLowerCase().includes(search.toLowerCase()) || (c.notes || "").toLowerCase().includes(search.toLowerCase()));
    const grouped = CONTACT_CATS.reduce((acc, cat) => {
      const items = visible.filter(c => c.category === cat);
      if (items.length) acc[cat] = items;
      return acc;
    }, {});
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SharedSectionHead, {
      icon: "\uD83D\uDCDE",
      title: "Home Contacts",
      sub: "Tradespeople, landlord, neighbours, and utility emergency lines \u2014 all in one place.",
      action: /*#__PURE__*/React.createElement("button", {
        onClick: openNew,
        style: {
          padding: "9px 20px",
          borderRadius: 10,
          border: "none",
          background: C.accent,
          color: "#fff",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 13,
          fontFamily: "inherit",
          flexShrink: 0
        }
      }, "+ Add contact")
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 20,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: search,
      onChange: e => setSearch(e.target.value),
      placeholder: "Search contacts\u2026",
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "9px 14px",
        fontSize: 13,
        fontFamily: "inherit",
        outline: "none",
        background: "#fff",
        color: C.text,
        width: 200,
        boxSizing: "border-box"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 5,
        flexWrap: "wrap"
      }
    }, ["all", ...CONTACT_CATS].map(c => /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: () => setCatFilter(c),
      style: {
        padding: "5px 12px",
        borderRadius: 20,
        border: `1.5px solid ${catFilter === c ? C.accent : C.border}`,
        background: catFilter === c ? C.accentLight : "#fff",
        cursor: "pointer",
        fontSize: 11,
        fontFamily: "inherit",
        fontWeight: catFilter === c ? 700 : 400,
        color: catFilter === c ? C.accent : C.muted
      }
    }, c === "all" ? "All" : /*#__PURE__*/React.createElement(React.Fragment, null, CONTACT_CAT_EMOJI[c], " ", c.charAt(0).toUpperCase() + c.slice(1)))))), contacts.length === 0 && /*#__PURE__*/React.createElement(SharedEmptyState, {
      emoji: "\uD83D\uDCDE",
      title: "No contacts yet",
      body: "Add plumbers, electricians, your landlord, helpful neighbours, and utility emergency lines.",
      onAdd: openNew,
      addLabel: "Add first contact"
    }), Object.entries(grouped).map(([cat, items]) => /*#__PURE__*/React.createElement("div", {
      key: cat,
      style: {
        marginBottom: 28
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 7,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, CONTACT_CAT_EMOJI[cat]), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: 1.2,
        color: C.muted
      }
    }, cat.charAt(0).toUpperCase() + cat.slice(1)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, "(", items.length, ")")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
        gap: 12
      }
    }, items.map(contact => /*#__PURE__*/React.createElement("div", {
      key: contact.id,
      style: {
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${C.border}`,
        padding: "18px 20px",
        transition: "box-shadow .15s,border-color .15s",
        cursor: "pointer"
      },
      onClick: () => openEdit(contact),
      onMouseEnter: e => {
        e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.09)";
        e.currentTarget.style.borderColor = C.accent;
      },
      onMouseLeave: e => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = C.border;
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 42,
        height: 42,
        borderRadius: "50%",
        background: C.accentLight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        flexShrink: 0
      }
    }, CONTACT_CAT_EMOJI[contact.category]), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 14,
        color: C.text,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
      }
    }, contact.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        padding: "2px 8px",
        borderRadius: 8,
        background: C.accentLight,
        color: C.accent,
        fontWeight: 700
      }
    }, contact.category))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 5
      }
    }, contact.phone && /*#__PURE__*/React.createElement("a", {
      href: `tel:${contact.phone}`,
      onClick: e => e.stopPropagation(),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        color: C.blue,
        textDecoration: "none",
        fontWeight: 600
      }
    }, "\uD83D\uDCDE ", contact.phone), contact.email && /*#__PURE__*/React.createElement("a", {
      href: `mailto:${contact.email}`,
      onClick: e => e.stopPropagation(),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 12,
        color: C.muted,
        textDecoration: "none",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
      }
    }, "\u2709 ", contact.email), contact.notes && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        lineHeight: 1.5,
        marginTop: 4,
        paddingTop: 8,
        borderTop: `1px solid ${C.border}`
      }
    }, contact.notes))))))), visible.length === 0 && contacts.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "32px",
        color: C.muted,
        fontSize: 13
      }
    }, "No contacts match. Try a different search or category."), showForm && /*#__PURE__*/React.createElement(Modal, {
      onClose: closeForm
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 900,
        fontSize: 20,
        marginBottom: 20
      }
    }, editId ? "Edit contact" : "Add contact"), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Name"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: form.name,
      onChange: v => setForm(f => ({
        ...f,
        name: v
      })),
      placeholder: "e.g. \"Dave Murphy \u2013 Plumber\""
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Phone number"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: form.phone,
      onChange: v => setForm(f => ({
        ...f,
        phone: v
      })),
      placeholder: "087 123 4567",
      type: "tel"
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Email address"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: form.email,
      onChange: v => setForm(f => ({
        ...f,
        email: v
      })),
      placeholder: "name@email.com",
      type: "email"
    }))), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Category"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 6
      }
    }, CONTACT_CATS.map(c => /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: () => setForm(f => ({
        ...f,
        category: c
      })),
      style: {
        padding: "6px 13px",
        borderRadius: 20,
        border: `1.5px solid ${form.category === c ? C.accent : C.border}`,
        background: form.category === c ? C.accentLight : "#fff",
        cursor: "pointer",
        fontSize: 12,
        fontFamily: "inherit",
        fontWeight: form.category === c ? 700 : 400,
        color: form.category === c ? C.accent : C.muted
      }
    }, CONTACT_CAT_EMOJI[c], " ", c.charAt(0).toUpperCase() + c.slice(1))))), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Notes (optional)"
    }, /*#__PURE__*/React.createElement("textarea", {
      value: form.notes,
      onChange: e => setForm(f => ({
        ...f,
        notes: e.target.value
      })),
      rows: 3,
      placeholder: "Rates, availability, how they prefer to be contacted\u2026",
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 13,
        fontFamily: "Georgia,serif",
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        lineHeight: 1.7,
        outline: "none"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: save,
      style: {
        padding: "10px 24px",
        borderRadius: 9,
        border: "none",
        background: C.accent,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 14,
        fontFamily: "inherit"
      }
    }, "Save contact"), /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: closeForm
    }, "Cancel"), editId && /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      onClick: () => del(editId)
    }, "Delete"))));
  };

  // ── render ─────────────────────────────────────────────────
  return /*#__PURE__*/React.createElement("div", null, confirmDialog, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.accent,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      marginBottom: 6,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFE1"), " Home management"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "0 0 6px",
      fontSize: 28,
      fontWeight: 900,
      letterSpacing: -.5,
      color: C.text
    }
  }, "House Admin"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: C.muted,
      lineHeight: 1.65
    }
  }, "Documents, bills, repairs, and contacts \u2014 everything to run your home.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      background: "#EDEAE2",
      padding: 4,
      borderRadius: 12,
      marginBottom: 32,
      width: "fit-content",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(SectionTabPill, {
    id: "documents",
    icon: "\uD83D\uDCC4",
    label: "Documents",
    activeId: tab,
    onSelect: setTab
  }), /*#__PURE__*/React.createElement(TabPill, {
    id: "bills",
    icon: "\uD83D\uDCB3",
    label: "Bills & Subscriptions"
  }), /*#__PURE__*/React.createElement(TabPill, {
    id: "repairs",
    icon: "\uD83D\uDD27",
    label: "Repairs"
  }), /*#__PURE__*/React.createElement(TabPill, {
    id: "contacts",
    icon: "\uD83D\uDCDE",
    label: "Contacts"
  })), tab === "documents" && /*#__PURE__*/React.createElement(DocumentsTab, null), tab === "bills" && /*#__PURE__*/React.createElement(BillsTab, null), tab === "repairs" && /*#__PURE__*/React.createElement(RepairsTab, null), tab === "contacts" && /*#__PURE__*/React.createElement(ContactsTab, null));
}

// ── Finance ───────────────────────────────────────────────────

const BUDGET_CATS = [{
  id: "housing",
  label: "Housing",
  icon: "🏠",
  color: "#4A7BB5"
}, {
  id: "childcare",
  label: "Childcare",
  icon: "👶",
  color: "#E8A87C"
}, {
  id: "food",
  label: "Food & Grocery",
  icon: "🛒",
  color: "#4A9B6F"
}, {
  id: "transport",
  label: "Transport",
  icon: "🚗",
  color: "#9B6FB5"
}, {
  id: "entertainment",
  label: "Entertainment",
  icon: "🎬",
  color: "#D4A843"
}, {
  id: "health",
  label: "Health",
  icon: "💊",
  color: "#C94F4F"
}, {
  id: "clothing",
  label: "Clothing",
  icon: "👕",
  color: "#7CB9E8"
}, {
  id: "savings",
  label: "Savings",
  icon: "💰",
  color: "#4A9B6F"
}, {
  id: "other",
  label: "Other",
  icon: "📦",
  color: "#8A8478"
}];
const SEED_FINANCE = {
  income: [{
    id: "i1",
    source: "Salary – Parent 1",
    amount: 4200,
    frequency: "monthly"
  }, {
    id: "i2",
    source: "Salary – Parent 2",
    amount: 2800,
    frequency: "monthly"
  }],
  budget: [{
    id: "b1",
    category: "housing",
    budgeted: 1600,
    spent: 1450
  }, {
    id: "b2",
    category: "childcare",
    budgeted: 800,
    spent: 760
  }, {
    id: "b3",
    category: "food",
    budgeted: 600,
    spent: 510
  }, {
    id: "b4",
    category: "transport",
    budgeted: 350,
    spent: 280
  }, {
    id: "b5",
    category: "entertainment",
    budgeted: 200,
    spent: 240
  }, {
    id: "b6",
    category: "health",
    budgeted: 150,
    spent: 60
  }, {
    id: "b7",
    category: "clothing",
    budgeted: 100,
    spent: 0
  }, {
    id: "b8",
    category: "savings",
    budgeted: 500,
    spent: 500
  }, {
    id: "b9",
    category: "other",
    budgeted: 150,
    spent: 95
  }],
  spending_log: [],
  children_savings: []
};

// Seed bills that live in house_admin (so Bills Summary has something to show)
const SEED_HOUSE_ADMIN_BILLS = [{
  id: "ha1",
  name: "Mortgage",
  amount: 1450,
  frequency: "monthly",
  category: "housing",
  status: "active",
  billing_day: 1
}, {
  id: "ha2",
  name: "Electricity",
  amount: 110,
  frequency: "monthly",
  category: "utilities",
  status: "active",
  billing_day: 15
}, {
  id: "ha3",
  name: "Gas",
  amount: 65,
  frequency: "monthly",
  category: "utilities",
  status: "active",
  billing_day: 15
}, {
  id: "ha4",
  name: "Broadband",
  amount: 45,
  frequency: "monthly",
  category: "utilities",
  status: "active",
  billing_day: 20
}, {
  id: "ha5",
  name: "Netflix",
  amount: 18,
  frequency: "monthly",
  category: "subscriptions",
  status: "active",
  billing_day: 22
}, {
  id: "ha6",
  name: "Spotify Family",
  amount: 16,
  frequency: "monthly",
  category: "subscriptions",
  status: "active",
  billing_day: 5
}, {
  id: "ha7",
  name: "Home Insurance",
  amount: 480,
  frequency: "annual",
  category: "insurance",
  status: "active",
  billing_day: 1
}, {
  id: "ha8",
  name: "Car Insurance",
  amount: 820,
  frequency: "annual",
  category: "insurance",
  status: "active",
  billing_day: 1
}];
function Finance() {
  const {
    family,
    updateFamily
  } = useFamilyCtx();
  const finance = family.finance || SEED_FINANCE;
  const children = family.children || [];

  // Bills come from house_admin if it exists, else use seed
  const houseBills = (family.house_admin?.bills || SEED_HOUSE_ADMIN_BILLS).filter(b => b.status === "active");
  function saveFinance(patch) {
    updateFamily({
      finance: {
        ...finance,
        ...patch
      }
    });
  }
  const [tab, setTab] = useState("overview");

  // ── helpers ────────────────────────────────────────────────
  const euro = getCurrencyFormatter(family);
  const pct = (spent, budgeted) => budgeted > 0 ? Math.min(100, Math.round(spent / budgeted * 100)) : 0;
  const now = new Date();
  const monthName = now.toLocaleString("en-GB", {
    month: "long",
    year: "numeric"
  });

  // Derived totals
  const totalIncome = (finance.income || []).reduce((s, i) => s + Number(i.amount || 0), 0);
  const totalBudgeted = (finance.budget || []).reduce((s, b) => s + Number(b.budgeted || 0), 0);
  // Derive current-month spent from the spending log (consistent with BudgetTab)
  const currentMonthKey = new Date().toISOString().slice(0, 7);
  const totalSpent = (finance.spending_log || []).filter(e => (e.date || "").startsWith(currentMonthKey)).reduce((s, e) => s + Number(e.amount || 0), 0);
  const remaining = totalIncome - totalSpent;

  // ── shared sub-components ──────────────────────────────────
  // TabPill → uses hoisted SectionTabPill;

  // StatCard → uses hoisted SharedStatCard;

  // ProgressBar → uses hoisted SharedProgressBar;

  // ══════════════════════════════════════════════════════════
  // OVERVIEW
  // ══════════════════════════════════════════════════════════
  const OverviewTab = () => {
    const income = finance.income || [];
    const [editingIncome, setEditingIncome] = useState(false);
    const [incomeDraft, setIncomeDraft] = useState(income.map(i => ({
      ...i
    })));
    function saveIncome() {
      const cleaned = incomeDraft.filter(i => i.source.trim() && Number(i.amount) > 0).map(i => ({
        ...i,
        amount: Number(i.amount)
      }));
      saveFinance({
        income: cleaned
      });
      setEditingIncome(false);
    }
    function addIncomeRow() {
      setIncomeDraft(d => [...d, {
        id: uid(),
        source: "",
        amount: "",
        frequency: "monthly"
      }]);
    }
    function removeIncomeRow(id) {
      setIncomeDraft(d => d.filter(i => i.id !== id));
    }

    // Derive per-category spent from log for this month (consistent with BudgetTab)
    const ovMonthKey = new Date().toISOString().slice(0, 7);
    const ovSpentMap = (finance.spending_log || []).filter(e => (e.date || "").startsWith(ovMonthKey)).reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
      return acc;
    }, {});
    const overBudget = (finance.budget || []).filter(b => (ovSpentMap[b.category] || 0) > b.budgeted);
    const underBudget = (finance.budget || []).filter(b => (ovSpentMap[b.category] || 0) < b.budgeted * 0.5 && b.budgeted > 0);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        background: C.green + "12",
        border: `1px solid ${C.green}33`,
        borderRadius: 10,
        marginBottom: 24,
        fontSize: 12,
        color: C.green,
        fontWeight: 600
      }
    }, "\uD83D\uDD12 All financial data is stored locally \u2014 no bank connections, no third parties, ever."), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 1.2,
        color: C.muted,
        marginBottom: 14
      }
    }, monthName), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        marginBottom: 24,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(SharedStatCard, {
      icon: "\uD83D\uDCBC",
      label: "Monthly income",
      value: euro(totalIncome),
      sub: `${income.length} source${income.length !== 1 ? "s" : ""}`,
      color: C.green
    }), /*#__PURE__*/React.createElement(SharedStatCard, {
      icon: "\uD83D\uDCCA",
      label: "Total spent",
      value: euro(totalSpent),
      sub: `of ${euro(totalBudgeted)} budgeted`,
      color: totalSpent > totalBudgeted ? C.red : C.accent
    }), /*#__PURE__*/React.createElement(SharedStatCard, {
      icon: remaining >= 0 ? "✅" : "⚠️",
      label: "Remaining",
      value: euro(Math.abs(remaining)),
      sub: remaining < 0 ? "over income" : "left this month",
      color: remaining >= 0 ? C.blue : C.red
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${C.border}`,
        padding: "20px 22px",
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 15
      }
    }, "Month at a glance"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted
      }
    }, euro(totalSpent), " spent of ", euro(totalIncome), " income")), /*#__PURE__*/React.createElement(SharedProgressBar, {
      spent: totalSpent,
      budgeted: totalIncome,
      color: C.accent,
      height: 12
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, pct(totalSpent, totalIncome), "% of income used"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: totalBudgeted > totalIncome ? C.red : C.muted
      }
    }, totalBudgeted > totalIncome ? `⚠ Budget (${euro(totalBudgeted)}) exceeds income` : `${euro(totalIncome - totalBudgeted)} income unallocated`))), (overBudget.length > 0 || underBudget.length > 0) && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginBottom: 20
      }
    }, overBudget.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.red + "0D",
        border: `1px solid ${C.red}33`,
        borderRadius: 12,
        padding: "14px 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: .8,
        color: C.red,
        marginBottom: 10
      }
    }, "\u26A0 Over budget"), overBudget.map(b => {
      const cat = BUDGET_CATS.find(c => c.id === b.category);
      const spent = ovSpentMap[b.category] || 0;
      return /*#__PURE__*/React.createElement("div", {
        key: b.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
          fontSize: 13
        }
      }, /*#__PURE__*/React.createElement("span", null, cat?.icon, " ", cat?.label), /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 700,
          color: C.red
        }
      }, "+", euro(spent - b.budgeted)));
    })), underBudget.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        background: C.green + "0D",
        border: `1px solid ${C.green}33`,
        borderRadius: 12,
        padding: "14px 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: .8,
        color: C.green,
        marginBottom: 10
      }
    }, "\uD83D\uDC9A Well under budget"), underBudget.map(b => {
      const cat = BUDGET_CATS.find(c => c.id === b.category);
      const spent = ovSpentMap[b.category] || 0;
      return /*#__PURE__*/React.createElement("div", {
        key: b.id,
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
          fontSize: 13
        }
      }, /*#__PURE__*/React.createElement("span", null, cat?.icon, " ", cat?.label), /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 700,
          color: C.green
        }
      }, euro(b.budgeted - spent), " left"));
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${C.border}`,
        padding: "20px 22px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 15
      }
    }, "Income sources"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setIncomeDraft(income.map(i => ({
          ...i
        })));
        setEditingIncome(true);
      },
      style: {
        padding: "5px 14px",
        borderRadius: 8,
        border: `1px solid ${C.border}`,
        background: "#FAFAF7",
        cursor: "pointer",
        fontSize: 12,
        fontFamily: "inherit",
        color: C.muted,
        fontWeight: 600
      }
    }, "Edit")), income.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        color: C.muted,
        fontSize: 13,
        textAlign: "center",
        padding: "16px 0"
      }
    }, "No income sources added yet.", /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setIncomeDraft([{
          id: uid(),
          source: "",
          amount: "",
          frequency: "monthly"
        }]);
        setEditingIncome(true);
      },
      style: {
        display: "block",
        margin: "10px auto 0",
        padding: "7px 18px",
        borderRadius: 8,
        border: "none",
        background: C.accent,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 12,
        fontFamily: "inherit"
      }
    }, "Add income")) : income.map(i => /*#__PURE__*/React.createElement("div", {
      key: i.id,
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: C.text
      }
    }, i.source), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 800,
        color: C.green
      }
    }, euro(i.amount), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 400,
        color: C.muted
      }
    }, "/", i.frequency === "monthly" ? "mo" : "yr")))), income.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: 12,
        fontWeight: 800,
        fontSize: 14
      }
    }, /*#__PURE__*/React.createElement("span", null, "Total"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: C.green
      }
    }, euro(totalIncome), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 400,
        color: C.muted
      }
    }, "/mo")))), editingIncome && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.38)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100
      },
      onClick: e => {
        if (e.target === e.currentTarget) setEditingIncome(false);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 16,
        padding: 28,
        width: 500,
        maxWidth: "92vw",
        maxHeight: "88vh",
        overflowY: "auto",
        boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
        fontFamily: "Georgia,serif"
      },
      role: "dialog",
      "aria-modal": "true",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 18,
        marginBottom: 4
      }
    }, "Edit income"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginBottom: 20
      }
    }, "All amounts in euros. No data leaves this device."), incomeDraft.map((row, idx) => /*#__PURE__*/React.createElement("div", {
      key: row.id,
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 110px 90px 32px",
        gap: 8,
        marginBottom: 10,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: row.source,
      onChange: e => setIncomeDraft(d => d.map((r, i) => i === idx ? {
        ...r,
        source: e.target.value
      } : r)),
      placeholder: "e.g. Salary \u2013 Parent 1",
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "9px 10px",
        fontSize: 13,
        fontFamily: "inherit",
        outline: "none",
        boxSizing: "border-box"
      }
    }), /*#__PURE__*/React.createElement("input", {
      type: "number",
      value: row.amount,
      onChange: e => setIncomeDraft(d => d.map((r, i) => i === idx ? {
        ...r,
        amount: e.target.value
      } : r)),
      placeholder: "Amount",
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "9px 10px",
        fontSize: 13,
        fontFamily: "inherit",
        outline: "none",
        boxSizing: "border-box"
      }
    }), /*#__PURE__*/React.createElement("select", {
      value: row.frequency,
      onChange: e => setIncomeDraft(d => d.map((r, i) => i === idx ? {
        ...r,
        frequency: e.target.value
      } : r)),
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "9px 8px",
        fontSize: 13,
        fontFamily: "inherit",
        boxSizing: "border-box"
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: "monthly"
    }, "Monthly"), /*#__PURE__*/React.createElement("option", {
      value: "annual"
    }, "Annual")), /*#__PURE__*/React.createElement("button", {
      onClick: () => removeIncomeRow(row.id),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.muted,
        fontSize: 18,
        lineHeight: 1
      }
    }, "\xD7"))), /*#__PURE__*/React.createElement("button", {
      onClick: addIncomeRow,
      style: {
        padding: "6px 14px",
        borderRadius: 8,
        border: `1px solid ${C.border}`,
        background: "#FAFAF7",
        cursor: "pointer",
        fontSize: 12,
        fontFamily: "inherit",
        color: C.muted,
        marginBottom: 20
      }
    }, "+ Add source"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: saveIncome,
      style: {
        padding: "9px 22px",
        borderRadius: 9,
        border: "none",
        background: C.accent,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 13,
        fontFamily: "inherit"
      }
    }, "Save"), /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: () => setEditingIncome(false)
    }, "Cancel")))));
  };

  // ══════════════════════════════════════════════════════════
  // BUDGET
  // ══════════════════════════════════════════════════════════
  const BudgetTab = () => {
    const budget = finance.budget || [];
    const spendingLog = finance.spending_log || [];
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(null);
    const [logModal, setLogModal] = useState(null);
    const [logForm, setLogForm] = useState({
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0]
    });
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    // Derive current-month spent from the spending log (not the static `spent` field).
    // This means spent resets automatically when the month changes — no manual action needed.
    const currentMonthKey = new Date().toISOString().slice(0, 7); // "2026-05"
    const monthEntries = spendingLog.filter(e => (e.date || "").startsWith(currentMonthKey));
    const spentByCategory = monthEntries.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
      return acc;
    }, {});

    // Helper: get this month's spent for a category
    function spentFor(catId) {
      return spentByCategory[catId] || 0;
    }
    function openEdit() {
      const d = BUDGET_CATS.map(cat => {
        const existing = budget.find(b => b.category === cat.id);
        return {
          id: existing?.id || uid(),
          category: cat.id,
          budgeted: existing?.budgeted ?? ""
        };
      });
      setDraft(d);
      setEditing(true);
    }
    function saveBudget() {
      const next = draft.filter(b => b.budgeted !== "" && Number(b.budgeted) >= 0).map(b => ({
        id: b.id,
        category: b.category,
        budgeted: Number(b.budgeted)
      }));
      saveFinance({
        budget: next
      });
      setEditing(false);
    }
    function openLog(catId) {
      setLogForm({
        amount: "",
        description: "",
        date: new Date().toISOString().split("T")[0]
      });
      setLogModal(catId);
    }
    function saveLog() {
      const amt = parseFloat(logForm.amount);
      if (!amt || amt <= 0) return;
      const logEntry = {
        id: uid(),
        category: logModal,
        amount: amt,
        description: logForm.description.trim(),
        date: logForm.date
      };
      saveFinance({
        spending_log: [...spendingLog, logEntry]
      });
      setLogModal(null);
    }
    function deleteLogEntry(id) {
      saveFinance({
        spending_log: spendingLog.filter(e => e.id !== id)
      });
    }

    // Only show cats that have a budget set
    const activeBudgets = BUDGET_CATS.map(cat => {
      const b = budget.find(x => x.category === cat.id);
      return b ? {
        ...b,
        cat
      } : null;
    }).filter(Boolean);

    // Total spent this month across all logged categories
    const totalSpentThisMonth = Object.values(spentByCategory).reduce((s, v) => s + v, 0);

    // Recent log entries this month, newest first
    const recentLog = [...monthEntries].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 10);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 24,
        gap: 12,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 18,
        color: C.text,
        marginBottom: 4
      }
    }, "Budget \u2014 ", monthName), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.muted,
        lineHeight: 1.6
      }
    }, "Spending resets automatically each month. Log entries below are only counted for ", monthName, ".")), /*#__PURE__*/React.createElement("button", {
      onClick: openEdit,
      style: {
        padding: "9px 20px",
        borderRadius: 10,
        border: "none",
        background: C.accent,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 13,
        fontFamily: "inherit",
        flexShrink: 0
      }
    }, "Edit budgets")), activeBudgets.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "56px 24px",
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 48,
        marginBottom: 14
      }
    }, "\uD83D\uDCB3"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 17,
        color: C.text,
        marginBottom: 8
      }
    }, "No budgets set yet"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.muted,
        lineHeight: 1.7,
        maxWidth: 320,
        margin: "0 auto 20px"
      }
    }, "Set a monthly budget per category and log your spending to track how you're doing."), /*#__PURE__*/React.createElement("button", {
      onClick: openEdit,
      style: {
        padding: "10px 24px",
        borderRadius: 10,
        border: "none",
        background: C.accent,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 14,
        fontFamily: "inherit"
      }
    }, "Set up budgets")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        marginBottom: 28
      }
    }, activeBudgets.map(({
      cat,
      ...b
    }) => {
      const spent = spentFor(b.category);
      const p = pct(spent, b.budgeted);
      const over = spent > b.budgeted;
      const barColor = over ? C.red : p > 85 ? C.yellow : cat.color;
      const remaining = Math.max(0, b.budgeted - spent);
      return /*#__PURE__*/React.createElement("div", {
        key: b.id,
        style: {
          background: "#fff",
          borderRadius: 12,
          border: `1px solid ${over ? C.red + "55" : C.border}`,
          padding: "16px 18px",
          transition: "box-shadow .15s"
        },
        onMouseEnter: e => e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,0,0,0.06)",
        onMouseLeave: e => e.currentTarget.style.boxShadow = "none"
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 18
        }
      }, cat.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 700,
          fontSize: 14
        }
      }, cat.label), over && /*#__PURE__*/React.createElement("span", {
        style: {
          marginLeft: 8,
          fontSize: 10,
          fontWeight: 800,
          padding: "2px 8px",
          borderRadius: 10,
          background: C.red + "18",
          color: C.red
        }
      }, "OVER"))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 16,
          fontWeight: 800,
          color: over ? C.red : C.text
        }
      }, euro(spent)), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: C.muted
        }
      }, " / ", euro(b.budgeted))), /*#__PURE__*/React.createElement("button", {
        onClick: () => openLog(b.category),
        style: {
          padding: "5px 12px",
          borderRadius: 8,
          border: `1px solid ${cat.color}55`,
          background: cat.color + "12",
          cursor: "pointer",
          fontSize: 11,
          fontFamily: "inherit",
          fontWeight: 700,
          color: cat.color,
          flexShrink: 0
        }
      }, "+ Log"))), /*#__PURE__*/React.createElement(SharedProgressBar, {
        spent: spent,
        budgeted: b.budgeted,
        color: cat.color,
        height: 8
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginTop: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          color: barColor,
          fontWeight: 700
        }
      }, p, "% used"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          color: C.muted
        }
      }, over ? `${euro(spent - b.budgeted)} over` : `${euro(remaining)} remaining`)));
    })), recentLog.length > 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${C.border}`,
        padding: "18px 20px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 15
      }
    }, "Spending log \u2014 ", monthName), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: C.muted
      }
    }, monthEntries.length, " entries \xB7 ", euro(totalSpentThisMonth), " total")), recentLog.map(entry => {
      const cat = BUDGET_CATS.find(c => c.id === entry.category);
      return /*#__PURE__*/React.createElement("div", {
        key: entry.id,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "9px 0",
          borderBottom: `1px solid ${C.border}`
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 16
        }
      }, cat?.icon || "📦"), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 600
        }
      }, entry.description || cat?.label), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: C.muted
        }
      }, entry.date, " \xB7 ", cat?.label)), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 14,
          fontWeight: 700,
          color: C.text
        }
      }, "\u2212", euro(entry.amount)), /*#__PURE__*/React.createElement("button", {
        onClick: () => deleteLogEntry(entry.id),
        style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          color: C.muted,
          fontSize: 15,
          padding: "0 2px",
          lineHeight: 1
        },
        title: "Remove this entry"
      }, "\xD7"));
    }), monthEntries.length > 10 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginTop: 10,
        textAlign: "center"
      }
    }, "Showing 10 of ", monthEntries.length, " entries this month")) : activeBudgets.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "28px",
        background: "#fff",
        borderRadius: 14,
        border: `1.5px dashed ${C.border}`,
        color: C.muted,
        fontSize: 13
      }
    }, "No spending logged for ", monthName, " yet. Hit ", /*#__PURE__*/React.createElement("strong", null, "+ Log"), " on any category above to get started."), logModal && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.38)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100
      },
      onClick: e => {
        if (e.target === e.currentTarget) setLogModal(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 16,
        padding: 28,
        width: 420,
        maxWidth: "92vw",
        boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
        fontFamily: "Georgia,serif"
      },
      role: "dialog",
      "aria-modal": "true",
      onClick: e => e.stopPropagation()
    }, (() => {
      const cat = BUDGET_CATS.find(c => c.id === logModal);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 800,
          fontSize: 18,
          marginBottom: 4
        }
      }, "Log spend \u2014 ", cat?.icon, " ", cat?.label), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: C.muted,
          marginBottom: 20
        }
      }, "This will be added to your ", cat?.label.toLowerCase(), " spending for ", monthName, "."), /*#__PURE__*/React.createElement(FieldGroup, {
        label: "Amount (\u20AC)"
      }, /*#__PURE__*/React.createElement(Inp, {
        value: logForm.amount,
        onChange: v => setLogForm(f => ({
          ...f,
          amount: v
        })),
        placeholder: "0.00",
        type: "number"
      })), /*#__PURE__*/React.createElement(FieldGroup, {
        label: "Description (optional)"
      }, /*#__PURE__*/React.createElement(Inp, {
        value: logForm.description,
        onChange: v => setLogForm(f => ({
          ...f,
          description: v
        })),
        placeholder: "e.g. \"Weekly shop \u2013 Lidl\""
      })), /*#__PURE__*/React.createElement(FieldGroup, {
        label: "Date"
      }, /*#__PURE__*/React.createElement("input", {
        type: "date",
        value: logForm.date,
        onChange: e => setLogForm(f => ({
          ...f,
          date: e.target.value
        })),
        style: {
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "10px 12px",
          fontSize: 13,
          fontFamily: "inherit",
          width: "100%",
          boxSizing: "border-box"
        }
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: saveLog,
        style: {
          padding: "9px 22px",
          borderRadius: 9,
          border: "none",
          background: cat?.color || C.accent,
          color: "#fff",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 13,
          fontFamily: "inherit"
        }
      }, "Save"), /*#__PURE__*/React.createElement(Btn, {
        variant: "ghost",
        onClick: () => setLogModal(null)
      }, "Cancel")));
    })())), editing && draft && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.38)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100
      },
      onClick: e => {
        if (e.target === e.currentTarget) setEditing(false);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 16,
        padding: 28,
        width: 520,
        maxWidth: "92vw",
        maxHeight: "88vh",
        overflowY: "auto",
        boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
        fontFamily: "Georgia,serif"
      },
      role: "dialog",
      "aria-modal": "true",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 18,
        marginBottom: 4
      }
    }, "Set monthly budgets"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginBottom: 20
      }
    }, "Leave a category blank to exclude it from tracking."), BUDGET_CATS.map((cat, i) => {
      const row = draft.find(d => d.category === cat.id);
      return /*#__PURE__*/React.createElement("div", {
        key: cat.id,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 18,
          width: 24
        }
      }, cat.icon), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: 600,
          flex: 1,
          color: C.text
        }
      }, cat.label), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 4
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          color: C.muted
        }
      }, CURRENCIES[family.currency || "EUR"].symbol), /*#__PURE__*/React.createElement("input", {
        type: "number",
        min: "0",
        value: row?.budgeted ?? "",
        onChange: e => setDraft(d => d.map(b => b.category === cat.id ? {
          ...b,
          budgeted: e.target.value
        } : b)),
        placeholder: "\u2014",
        style: {
          width: 90,
          border: `1px solid ${C.border}`,
          borderRadius: 8,
          padding: "8px 10px",
          fontSize: 13,
          fontFamily: "inherit",
          outline: "none",
          textAlign: "right"
        }
      })));
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 20
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: saveBudget,
      style: {
        padding: "9px 22px",
        borderRadius: 9,
        border: "none",
        background: C.accent,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 13,
        fontFamily: "inherit"
      }
    }, "Save budgets"), /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: () => setEditing(false)
    }, "Cancel")))));
  };

  // ══════════════════════════════════════════════════════════
  // CHILDREN'S SAVINGS
  // ══════════════════════════════════════════════════════════
  const SavingsTab = () => {
    const savings = finance.children_savings || [];
    const [editingId, setEditingId] = useState(null);
    const blankForm = {
      goal_label: "",
      goal_amount: "",
      current_amount: "",
      notes: ""
    };
    const [form, setForm] = useState(blankForm);

    // Ensure every child has an entry
    const entries = children.map(child => {
      const s = savings.find(x => x.child_id === child.id) || {
        id: uid(),
        child_id: child.id,
        goal_label: "",
        goal_amount: 0,
        current_amount: 0,
        notes: ""
      };
      return {
        child,
        ...s
      };
    });
    const totalSaved = entries.reduce((s, e) => s + Number(e.current_amount || 0), 0);
    const totalGoal = entries.reduce((s, e) => s + Number(e.goal_amount || 0), 0);
    function openEdit(entry) {
      setForm({
        goal_label: entry.goal_label || "",
        goal_amount: entry.goal_amount || "",
        current_amount: entry.current_amount || "",
        notes: entry.notes || ""
      });
      setEditingId(entry.child_id);
    }
    function saveSavings() {
      const updated = {
        id: entries.find(e => e.child_id === editingId)?.id || uid(),
        child_id: editingId,
        goal_label: form.goal_label.trim(),
        goal_amount: parseFloat(form.goal_amount) || 0,
        current_amount: parseFloat(form.current_amount) || 0,
        notes: form.notes.trim()
      };
      const next = savings.find(s => s.child_id === editingId) ? savings.map(s => s.child_id === editingId ? updated : s) : [...savings, updated];
      saveFinance({
        children_savings: next
      });
      setEditingId(null);
    }
    const editing = editingId ? entries.find(e => e.child_id === editingId) : null;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SharedSectionHead, {
      title: "Children's Savings",
      sub: "Track savings goals for each child. Update amounts manually \u2014 no bank connection needed.",
      action: /*#__PURE__*/React.createElement("div", {
        style: {
          background: C.green + "12",
          border: `1px solid ${C.green}33`,
          borderRadius: 10,
          padding: "8px 16px",
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 18,
          fontWeight: 900,
          color: C.green
        }
      }, euro(totalSaved)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: C.muted
        }
      }, "total saved"))
    }), children.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        color: C.muted,
        textAlign: "center",
        padding: "48px 0",
        fontSize: 13
      }
    }, "No children added yet. Add children via the sidebar."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, entries.map(entry => {
      const {
        child
      } = entry;
      const hasGoal = Number(entry.goal_amount) > 0;
      const hasSavings = Number(entry.current_amount) > 0;
      const p = pct(entry.current_amount, entry.goal_amount);
      const remaining = Math.max(0, Number(entry.goal_amount) - Number(entry.current_amount));
      return /*#__PURE__*/React.createElement("div", {
        key: child.id,
        style: {
          background: "#fff",
          borderRadius: 16,
          border: `1px solid ${C.border}`,
          padding: "22px 24px",
          borderLeft: `5px solid ${child.avatar_colour}`
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          marginBottom: 16
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: child.avatar_colour,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 900,
          fontSize: 20,
          color: "#fff",
          flexShrink: 0,
          boxShadow: `0 3px 12px ${child.avatar_colour}55`
        }
      }, child.name[0]), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 800,
          fontSize: 17,
          color: C.text,
          marginBottom: 2
        }
      }, child.name), entry.goal_label && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: C.muted
        }
      }, "\uD83C\uDFAF ", entry.goal_label)), /*#__PURE__*/React.createElement("button", {
        onClick: () => openEdit(entry),
        style: {
          padding: "6px 16px",
          borderRadius: 9,
          border: `1.5px solid ${child.avatar_colour}`,
          background: child.avatar_colour + "15",
          cursor: "pointer",
          fontSize: 12,
          fontFamily: "inherit",
          fontWeight: 700,
          color: child.avatar_colour,
          flexShrink: 0
        }
      }, "Edit")), hasGoal ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 30,
          fontWeight: 900,
          color: child.avatar_colour
        }
      }, euro(entry.current_amount)), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 14,
          color: C.muted
        }
      }, " saved")), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: C.muted
        }
      }, "Goal"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 800,
          color: C.text
        }
      }, euro(entry.goal_amount)))), /*#__PURE__*/React.createElement("div", {
        style: {
          marginBottom: 8
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: 10,
          borderRadius: 5,
          background: C.border,
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: "100%",
          width: `${p}%`,
          background: `linear-gradient(90deg,${child.avatar_colour},${child.avatar_colour}CC)`,
          borderRadius: 5,
          transition: "width .5s ease"
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          fontWeight: 700,
          color: child.avatar_colour
        }
      }, p, "%"), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: C.muted
        }
      }, p >= 100 ? "🎉 Goal reached!" : `${euro(remaining)} to go`)), entry.notes && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: C.muted,
          lineHeight: 1.6,
          padding: "10px 12px",
          background: child.avatar_colour + "0D",
          borderRadius: 8,
          fontStyle: "italic"
        }
      }, "\"", entry.notes, "\"")) : /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          padding: "16px 0",
          color: C.muted,
          fontSize: 13
        }
      }, "No savings goal set yet.", /*#__PURE__*/React.createElement("button", {
        onClick: () => openEdit(entry),
        style: {
          display: "block",
          margin: "10px auto 0",
          padding: "7px 18px",
          borderRadius: 8,
          border: "none",
          background: child.avatar_colour,
          color: "#fff",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 12,
          fontFamily: "inherit"
        }
      }, "Set up savings")));
    })), entries.length > 1 && totalGoal > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 20,
        background: "#fff",
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        padding: "16px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 14
      }
    }, "All children combined"), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        fontWeight: 900,
        color: C.green
      }
    }, euro(totalSaved)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: C.muted
      }
    }, " / ", euro(totalGoal)))), editingId && editing && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.38)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100
      },
      onClick: e => {
        if (e.target === e.currentTarget) setEditingId(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 16,
        padding: 28,
        width: 460,
        maxWidth: "92vw",
        boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
        fontFamily: "Georgia,serif"
      },
      role: "dialog",
      "aria-modal": "true",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 4,
        background: editing.child.avatar_colour,
        borderRadius: "2px 2px 0 0",
        margin: "-28px -28px 24px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 18,
        marginBottom: 4
      }
    }, editing.child.name, "'s savings"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginBottom: 20
      }
    }, "Update manually \u2014 no bank connection required."), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Saving intention"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: form.goal_label,
      onChange: v => setForm(f => ({
        ...f,
        goal_label: v
      })),
      placeholder: "e.g. \"University fund\", \"First car\", \"Gap year\""
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Savings goal (\u20AC)"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: form.goal_amount,
      type: "number",
      onChange: v => setForm(f => ({
        ...f,
        goal_amount: v
      })),
      placeholder: "e.g. 20000"
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Amount saved (\u20AC)"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: form.current_amount,
      type: "number",
      onChange: v => setForm(f => ({
        ...f,
        current_amount: v
      })),
      placeholder: "e.g. 4500"
    }))), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Notes"
    }, /*#__PURE__*/React.createElement("textarea", {
      value: form.notes,
      onChange: e => setForm(f => ({
        ...f,
        notes: e.target.value
      })),
      placeholder: "Any notes about this savings pot\u2026",
      rows: 2,
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 13,
        fontFamily: "Georgia,serif",
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        lineHeight: 1.7,
        outline: "none"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: saveSavings,
      style: {
        padding: "9px 22px",
        borderRadius: 9,
        border: "none",
        background: editing.child.avatar_colour,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 13,
        fontFamily: "inherit"
      }
    }, "Save"), /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: () => setEditingId(null)
    }, "Cancel")))));
  };

  // ══════════════════════════════════════════════════════════
  // BILLS SUMMARY
  // ══════════════════════════════════════════════════════════
  const BillsSummaryTab = () => {
    const monthly = houseBills.filter(b => b.frequency === "monthly");
    const annual = houseBills.filter(b => b.frequency === "annual");
    const monthlyTotal = monthly.reduce((s, b) => s + Number(b.amount), 0);
    const annualTotal = annual.reduce((s, b) => s + Number(b.amount), 0);
    const effectiveMo = monthlyTotal + annualTotal / 12;
    const totalPerYear = monthlyTotal * 12 + annualTotal;

    // Group by category
    const grouped = BILL_CATS.reduce((acc, cat) => {
      const items = houseBills.filter(b => b.category === cat);
      if (items.length) acc[cat] = items;
      return acc;
    }, {});
    const noHouseAdmin = !family.house_admin;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SharedSectionHead, {
      title: "Bills Summary",
      sub: "Your recurring bills from House Admin, consolidated in one view. Manage individual bills in the House Admin section."
    }), noHouseAdmin && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 16px",
        background: C.yellow + "18",
        border: `1px solid ${C.yellow}44`,
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 12,
        color: "#8a6a00",
        fontWeight: 600
      }
    }, "\uD83D\uDCCB Showing sample bills. Add your own in ", /*#__PURE__*/React.createElement("strong", null, "House Admin \u2192 Bills"), " and they'll appear here automatically."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        background: C.green + "12",
        border: `1px solid ${C.green}33`,
        borderRadius: 10,
        marginBottom: 24,
        fontSize: 12,
        color: C.green,
        fontWeight: 600
      }
    }, "\uD83D\uDD12 No external connections. Bills data is entered manually and stays local."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 12,
        marginBottom: 28,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(SharedStatCard, {
      icon: "\uD83D\uDCC5",
      label: "Monthly bills",
      value: euro(monthlyTotal),
      sub: `${monthly.length} active`,
      color: C.blue
    }), /*#__PURE__*/React.createElement(SharedStatCard, {
      icon: "\uD83D\uDCC6",
      label: "Annual bills",
      value: euro(annualTotal),
      sub: `${annual.length} active`,
      color: C.accent
    }), /*#__PURE__*/React.createElement(SharedStatCard, {
      icon: "\uD83E\uDDEE",
      label: "Effective monthly",
      value: euro(effectiveMo),
      sub: "incl. annual bills",
      color: C.text
    }), /*#__PURE__*/React.createElement(SharedStatCard, {
      icon: "\uD83D\uDDD3\uFE0F",
      label: "Total per year",
      value: euro(totalPerYear),
      sub: "all active bills",
      color: C.muted
    })), Object.keys(grouped).length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "48px 24px",
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 40,
        marginBottom: 12
      }
    }, "\uD83D\uDCB3"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 16,
        color: C.text,
        marginBottom: 8
      }
    }, "No bills yet"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.muted
      }
    }, "Add bills in ", /*#__PURE__*/React.createElement("strong", null, "House Admin \u2192 Bills & Subscriptions"))), BILL_CATS.filter(cat => grouped[cat]).map(cat => {
      const catBills = grouped[cat];
      const catTotal = catBills.reduce((s, b) => {
        return s + (b.frequency === "monthly" ? b.amount : b.amount / 12);
      }, 0);
      return /*#__PURE__*/React.createElement("div", {
        key: cat,
        style: {
          marginBottom: 24
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 16
        }
      }, BILL_CAT_EMOJI[cat]), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          color: C.muted
        }
      }, cat)), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: C.muted,
          fontWeight: 600
        }
      }, "~", euro(catTotal), "/mo")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 6
        }
      }, catBills.map(bill => /*#__PURE__*/React.createElement("div", {
        key: bill.id,
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          borderRadius: 12,
          background: "#fff",
          border: `1px solid ${C.border}`
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 700,
          fontSize: 14
        }
      }, bill.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: C.muted,
          marginTop: 2
        }
      }, bill.frequency === "monthly" ? `Monthly · due day ${bill.billing_day}` : `Annual · due day ${bill.billing_day}`)), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 16,
          fontWeight: 800,
          color: C.text
        }
      }, euro(bill.amount)), bill.frequency === "annual" && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: C.muted
        }
      }, "\u2248", euro(bill.amount / 12), "/mo")), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 10,
          fontWeight: 700,
          padding: "2px 8px",
          borderRadius: 10,
          flexShrink: 0,
          background: bill.frequency === "monthly" ? C.blue + "18" : C.accent + "18",
          color: bill.frequency === "monthly" ? C.blue : C.accent
        }
      }, bill.frequency)))));
    }), annual.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 16px",
        background: "#FAFAF7",
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        fontSize: 12,
        color: C.muted
      }
    }, "\uD83D\uDCA1 Annual bills (", annual.length, ") are spread across 12 months for the \"effective monthly\" figure above."));
  };

  // ── render ─────────────────────────────────────────────────
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.accent,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      marginBottom: 6
    }
  }, "Private & manual"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "0 0 6px",
      fontSize: 28,
      fontWeight: 900,
      letterSpacing: -.5,
      color: C.text
    }
  }, "Finance"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: C.muted,
      lineHeight: 1.65,
      maxWidth: 520
    }
  }, "A clear, private picture of your household finances. No bank connections \u2014 ever.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      background: "#EDEAE2",
      padding: 4,
      borderRadius: 12,
      marginBottom: 32,
      width: "fit-content",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(SectionTabPill, {
    id: "overview",
    label: "Overview",
    activeId: tab,
    onSelect: setTab
  }), /*#__PURE__*/React.createElement(SectionTabPill, {
    id: "budget",
    label: "Budget",
    activeId: tab,
    onSelect: setTab
  }), /*#__PURE__*/React.createElement(SectionTabPill, {
    id: "savings",
    label: "Children's savings",
    activeId: tab,
    onSelect: setTab
  }), /*#__PURE__*/React.createElement(SectionTabPill, {
    id: "bills",
    label: "Bills summary",
    activeId: tab,
    onSelect: setTab
  })), tab === "overview" && /*#__PURE__*/React.createElement(OverviewTab, null), tab === "budget" && /*#__PURE__*/React.createElement(BudgetTab, null), tab === "savings" && /*#__PURE__*/React.createElement(SavingsTab, null), tab === "bills" && /*#__PURE__*/React.createElement(BillsSummaryTab, null));
}

// ── Planning: Family Dynamics & Long-term ─────────────────────

const GOAL_STATUSES = [{
  id: "thinking",
  label: "Thinking",
  emoji: "💭",
  color: "#8A8478"
}, {
  id: "in_progress",
  label: "In progress",
  emoji: "🔄",
  color: "#4A7BB5"
}, {
  id: "achieved",
  label: "Achieved",
  emoji: "✅",
  color: "#4A9B6F"
}];
const SEED_PLANNING = {
  goals: [{
    id: "g1",
    title: "Family holiday to Portugal",
    description: "A proper summer holiday — Algarve or Comporta. Two weeks, ideally June or September.",
    target_date: "2026-08-01",
    status: "in_progress"
  }, {
    id: "g2",
    title: "Build emergency fund",
    description: "Three months of household expenses saved and untouched.",
    target_date: "2026-12-31",
    status: "thinking"
  }, {
    id: "g3",
    title: "Find a new school for Leo",
    description: "Research secondary schools in the area. Attend open days. Decide by March.",
    target_date: "2027-03-01",
    status: "thinking"
  }],
  horizons: {},
  // keyed by child id → { "1yr": [], "3yr": [], "5yr": [] }
  decisions: [{
    id: "dec1",
    title: "Should we extend the house or move?",
    options: "Option A: Rear extension (~€80k). Option B: Move to a larger house in the same area.",
    pros_cons: "Extension: stay in neighbourhood, disruptive during build. Moving: fresh start, bigger mortgage, school disruption for the kids.",
    decision_made: "",
    created_at: new Date(Date.now() - 86400000 * 20).toISOString()
  }]
};

// Age-aware milestone suggestions
function suggestMilestones(age, name) {
  const yr = n => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + n);
    return d.getFullYear();
  };
  const buckets = {
    "1yr": [],
    "3yr": [],
    "5yr": []
  };
  if (age <= 2) {
    buckets["1yr"] = [{
      id: uid(),
      title: "First words milestone",
      note: "Most children reach ~50 words by 24 months.",
      editable: true
    }, {
      id: uid(),
      title: "Start toddler playgroup",
      note: "Social play starts mattering now.",
      editable: true
    }];
    buckets["3yr"] = [{
      id: uid(),
      title: "Begin pre-school / Montessori",
      note: `Around age ${age + 3}, roughly ${yr(3)}.`,
      editable: true
    }, {
      id: uid(),
      title: "Potty training complete",
      note: "Typically achieved between 2.5 and 3.5.",
      editable: true
    }];
    buckets["5yr"] = [{
      id: uid(),
      title: "Start primary school",
      note: `Junior Infants, ~${yr(5)}.`,
      editable: true
    }, {
      id: uid(),
      title: "Learn to swim",
      note: "Great to have before school.",
      editable: true
    }];
  } else if (age <= 4) {
    buckets["1yr"] = [{
      id: uid(),
      title: "Begin pre-school / Montessori",
      note: `Around ${yr(1)}.`,
      editable: true
    }, {
      id: uid(),
      title: "First swimming lessons",
      note: "Early water confidence pays off.",
      editable: true
    }];
    buckets["3yr"] = [{
      id: uid(),
      title: "Start primary school (Junior Infants)",
      note: `~${yr(3)}.`,
      editable: true
    }, {
      id: uid(),
      title: "Learn to ride a balance bike",
      note: "Before stabilisers.",
      editable: true
    }];
    buckets["5yr"] = [{
      id: uid(),
      title: "Read independently",
      note: "Usually by age 6–7.",
      editable: true
    }, {
      id: uid(),
      title: "First school report",
      note: "1st or 2nd class.",
      editable: true
    }];
  } else if (age <= 7) {
    buckets["1yr"] = [{
      id: uid(),
      title: "Join an after-school activity",
      note: "Sport, art, or music.",
      editable: true
    }, {
      id: uid(),
      title: "Ride a bike without stabilisers",
      note: "Most children manage by age 6–7.",
      editable: true
    }];
    buckets["3yr"] = [{
      id: uid(),
      title: "First communion (if applicable)",
      note: "Typically around age 7–8.",
      editable: true
    }, {
      id: uid(),
      title: "Reading chapter books independently",
      note: "A big milestone in confidence.",
      editable: true
    }];
    buckets["5yr"] = [{
      id: uid(),
      title: "Transition to secondary school",
      note: `Around ${yr(5)}.`,
      editable: true
    }, {
      id: uid(),
      title: "First school trip abroad",
      note: "Usually 5th or 6th class.",
      editable: true
    }];
  } else if (age <= 10) {
    buckets["1yr"] = [{
      id: uid(),
      title: "Join a team sport or club",
      note: "Great for social development.",
      editable: true
    }, {
      id: uid(),
      title: "Confirmation (if applicable)",
      note: "Typically age 12.",
      editable: true
    }];
    buckets["3yr"] = [{
      id: uid(),
      title: "Start secondary school",
      note: `~${yr(3)}.`,
      editable: true
    }, {
      id: uid(),
      title: "Digital responsibility conversation",
      note: "Phone, social media, screen time.",
      editable: true
    }];
    buckets["5yr"] = [{
      id: uid(),
      title: "Junior Certificate",
      note: "3rd year of secondary school.",
      editable: true
    }, {
      id: uid(),
      title: "Choose Leaving Cert subject path",
      note: "Big decision in 3rd/4th year.",
      editable: true
    }];
  } else if (age <= 13) {
    buckets["1yr"] = [{
      id: uid(),
      title: "Start secondary school",
      note: `~${yr(1)}.`,
      editable: true
    }, {
      id: uid(),
      title: "First mobile phone — set boundaries early",
      note: "Good time to agree on family rules.",
      editable: true
    }];
    buckets["3yr"] = [{
      id: uid(),
      title: "Junior Certificate",
      note: "3rd year.",
      editable: true
    }, {
      id: uid(),
      title: "Transition Year (if school offers it)",
      note: "A great year for growth.",
      editable: true
    }];
    buckets["5yr"] = [{
      id: uid(),
      title: "Leaving Certificate",
      note: `~${yr(5)}.`,
      editable: true
    }, {
      id: uid(),
      title: "College / apprenticeship decision",
      note: "Begin conversations early.",
      editable: true
    }];
  } else {
    buckets["1yr"] = [{
      id: uid(),
      title: "Junior Certificate",
      note: "Coming up soon.",
      editable: true
    }, {
      id: uid(),
      title: "Transition Year planning",
      note: "Opportunities, internships, travel.",
      editable: true
    }];
    buckets["3yr"] = [{
      id: uid(),
      title: "Leaving Certificate",
      note: `~${yr(3)}.`,
      editable: true
    }, {
      id: uid(),
      title: "Learn to drive (provisional at 17)",
      note: "Book theory test early.",
      editable: true
    }];
    buckets["5yr"] = [{
      id: uid(),
      title: "Third level / college or apprenticeship",
      note: `~${yr(5)}.`,
      editable: true
    }, {
      id: uid(),
      title: "Financial independence conversations",
      note: "Saving, budgeting, renting.",
      editable: true
    }];
  }
  return buckets;
}
function Planning() {
  const {
    family,
    updateFamily
  } = useFamilyCtx();
  const planning = family.planning || SEED_PLANNING;
  const children = family.children || [];
  function savePlan(patch) {
    updateFamily({
      planning: {
        ...planning,
        ...patch
      }
    });
  }
  const [tab, setTab] = useState("goals");
  const {
    confirmDialog,
    requestConfirm
  } = useConfirm();

  // ── shared primitives ──────────────────────────────────────
  // Divider → inline

  // SectionHead → uses hoisted SharedSectionHead;

  // TabPill → uses hoisted SectionTabPill;

  // ══════════════════════════════════════════════════════════
  // GOALS
  // ══════════════════════════════════════════════════════════
  const GoalsTab = () => {
    const goals = planning.goals || [];
    const [editId, setEditId] = useState(null); // null = closed, "new" = new form, or goal id
    const blankForm = {
      title: "",
      description: "",
      target_date: "",
      status: "thinking"
    };
    const [form, setForm] = useState(blankForm);
    function openNew() {
      setForm(blankForm);
      setEditId("new");
    }
    function openEdit(g) {
      setForm({
        title: g.title,
        description: g.description,
        target_date: g.target_date || "",
        status: g.status
      });
      setEditId(g.id);
    }
    function closeForm() {
      setEditId(null);
    }
    function save() {
      if (!form.title.trim()) return;
      let next;
      if (editId === "new") {
        next = [...goals, {
          id: uid(),
          ...form
        }];
      } else {
        next = goals.map(g => g.id === editId ? {
          ...g,
          ...form
        } : g);
      }
      savePlan({
        goals: next
      });
      closeForm();
    }
    async function del(id) {
      const title = goals.find(g => g.id === id)?.title || "this goal";
      const ok = await requestConfirm({
        message: "Delete goal?",
        detail: `"${title}" will be permanently removed.`
      });
      if (!ok) return;
      savePlan({
        goals: goals.filter(g => g.id !== id)
      });
      closeForm();
    }
    function cycleStatus(id) {
      const order = ["thinking", "in_progress", "achieved"];
      savePlan({
        goals: goals.map(g => g.id === id ? {
          ...g,
          status: order[(order.indexOf(g.status) + 1) % 3]
        } : g)
      });
    }
    const byStatus = s => goals.filter(g => g.status === s);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SharedSectionHead, {
      emoji: "\uD83C\uDF31",
      title: "Family Goals",
      sub: "Keep this list short and meaningful \u2014 3 to 5 goals is enough. These are the things you want to move toward together.",
      action: goals.length < 8 && /*#__PURE__*/React.createElement("button", {
        onClick: openNew,
        style: {
          padding: "9px 20px",
          borderRadius: 10,
          border: "none",
          background: C.accent,
          color: "#fff",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 13,
          fontFamily: "inherit",
          flexShrink: 0,
          whiteSpace: "nowrap"
        }
      }, "+ New goal")
    }), goals.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "56px 24px",
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 48,
        marginBottom: 14
      }
    }, "\uD83C\uDF31"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 17,
        color: C.text,
        marginBottom: 8
      }
    }, "No goals set yet"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.muted,
        lineHeight: 1.7,
        maxWidth: 320,
        margin: "0 auto 20px"
      }
    }, "What does your family want to work toward this year? A holiday, a financial cushion, a new school?"), /*#__PURE__*/React.createElement("button", {
      onClick: openNew,
      style: {
        padding: "10px 24px",
        borderRadius: 10,
        border: "none",
        background: C.accent,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 14,
        fontFamily: "inherit"
      }
    }, "Add your first goal")), GOAL_STATUSES.map(st => {
      const group = byStatus(st.id);
      if (!group.length) return null;
      return /*#__PURE__*/React.createElement("div", {
        key: st.id,
        style: {
          marginBottom: 32
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 14
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 14
        }
      }, st.emoji), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          color: st.color
        }
      }, st.label), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: C.muted
        }
      }, "(", group.length, ")")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 10
        }
      }, group.map(g => /*#__PURE__*/React.createElement("div", {
        key: g.id,
        style: {
          background: "#fff",
          borderRadius: 16,
          border: `1px solid ${C.border}`,
          padding: "20px 22px",
          borderLeft: `5px solid ${st.color}`,
          transition: "box-shadow .15s"
        },
        onMouseEnter: e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)",
        onMouseLeave: e => e.currentTarget.style.boxShadow = "none"
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 800,
          fontSize: 16,
          marginBottom: 6,
          color: C.text
        }
      }, g.title), g.description && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          color: C.muted,
          lineHeight: 1.65,
          marginBottom: 10
        }
      }, g.description), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center"
        }
      }, g.target_date && /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: C.muted
        }
      }, "\uD83D\uDCC5 Target: ", new Date(g.target_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })), /*#__PURE__*/React.createElement("button", {
        onClick: () => cycleStatus(g.id),
        style: {
          padding: "3px 12px",
          borderRadius: 20,
          border: `1.5px solid ${st.color}`,
          background: st.color + "15",
          cursor: "pointer",
          fontSize: 11,
          fontFamily: "inherit",
          fontWeight: 700,
          color: st.color
        }
      }, st.emoji, " ", st.label))), /*#__PURE__*/React.createElement("button", {
        onClick: () => openEdit(g),
        style: {
          background: "none",
          border: "none",
          cursor: "pointer",
          color: C.muted,
          fontSize: 15,
          padding: "2px 4px",
          flexShrink: 0
        }
      }, "\u270E"))))));
    }), editId !== null && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.38)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100
      },
      onClick: e => {
        if (e.target === e.currentTarget) closeForm();
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 18,
        padding: 32,
        width: 520,
        maxWidth: "92vw",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 28px 70px rgba(0,0,0,0.18)",
        fontFamily: "Georgia,serif"
      },
      role: "dialog",
      "aria-modal": "true",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 900,
        fontSize: 20,
        marginBottom: 4
      }
    }, editId === "new" ? "New goal" : "Edit goal"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginBottom: 24
      }
    }, "Goals feel different from tasks \u2014 they're about direction, not just deadlines."), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Title"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: form.title,
      onChange: v => setForm(f => ({
        ...f,
        title: v
      })),
      placeholder: "e.g. \"Family holiday to Portugal\""
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Description"
    }, /*#__PURE__*/React.createElement("textarea", {
      value: form.description,
      onChange: e => setForm(f => ({
        ...f,
        description: e.target.value
      })),
      placeholder: "What does achieving this look like? Why does it matter to your family?",
      rows: 3,
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 13,
        fontFamily: "Georgia,serif",
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        lineHeight: 1.7,
        outline: "none",
        color: C.text
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Target date"
    }, /*#__PURE__*/React.createElement("input", {
      type: "date",
      value: form.target_date,
      onChange: e => setForm(f => ({
        ...f,
        target_date: e.target.value
      })),
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 13,
        fontFamily: "inherit",
        width: "100%",
        boxSizing: "border-box"
      }
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Status"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 5
      }
    }, GOAL_STATUSES.map(st => /*#__PURE__*/React.createElement("button", {
      key: st.id,
      onClick: () => setForm(f => ({
        ...f,
        status: st.id
      })),
      style: {
        padding: "7px 12px",
        borderRadius: 8,
        textAlign: "left",
        border: `1.5px solid ${form.status === st.id ? st.color : C.border}`,
        background: form.status === st.id ? st.color + "15" : "#fff",
        cursor: "pointer",
        fontSize: 12,
        fontFamily: "inherit",
        fontWeight: form.status === st.id ? 800 : 400,
        color: form.status === st.id ? st.color : C.muted
      }
    }, st.emoji, " ", st.label))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: save,
      style: {
        padding: "10px 24px",
        borderRadius: 10,
        border: "none",
        background: C.accent,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 14,
        fontFamily: "inherit"
      }
    }, "Save goal"), /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: closeForm
    }, "Cancel"), editId !== "new" && /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      onClick: () => del(editId)
    }, "Delete")))));
  };

  // ══════════════════════════════════════════════════════════
  // HORIZONS
  // ══════════════════════════════════════════════════════════
  const HorizonsTab = () => {
    const horizons = planning.horizons || {};
    const [activeChild, setActiveChild] = useState(children[0]?.id || null);
    const [editingMilestone, setEditingMilestone] = useState(null); // { bucket, index } or "new"
    const [mForm, setMForm] = useState({
      title: "",
      note: "",
      bucket: "1yr"
    });
    const child = children.find(c => c.id === activeChild);
    if (!child) return /*#__PURE__*/React.createElement("div", {
      style: {
        color: C.muted,
        textAlign: "center",
        padding: "48px 0"
      }
    }, "No children added yet.");
    const age = ageOf(child.date_of_birth);
    const childHorizons = horizons[child.id] || null;
    function saveHorizons(data) {
      savePlan({
        horizons: {
          ...horizons,
          [child.id]: data
        }
      });
    }
    function autoGenerate() {
      saveHorizons(suggestMilestones(age, child.name));
    }
    function openNewMilestone(bucket) {
      setMForm({
        title: "",
        note: "",
        bucket
      });
      setEditingMilestone("new");
    }
    function openEditMilestone(bucket, idx) {
      const m = childHorizons[bucket][idx];
      setMForm({
        title: m.title,
        note: m.note || "",
        bucket
      });
      setEditingMilestone({
        bucket,
        idx
      });
    }
    function saveMilestone() {
      if (!mForm.title.trim()) return;
      const data = {
        ...(childHorizons || suggestMilestones(age, child.name))
      };
      if (editingMilestone === "new") {
        data[mForm.bucket] = [...(data[mForm.bucket] || []), {
          id: uid(),
          title: mForm.title,
          note: mForm.note,
          editable: true
        }];
      } else {
        const {
          bucket,
          idx
        } = editingMilestone;
        // handle bucket change
        if (bucket !== mForm.bucket) {
          data[bucket] = data[bucket].filter((_, i) => i !== idx);
          data[mForm.bucket] = [...(data[mForm.bucket] || []), {
            id: uid(),
            title: mForm.title,
            note: mForm.note,
            editable: true
          }];
        } else {
          data[bucket] = data[bucket].map((m, i) => i === idx ? {
            ...m,
            title: mForm.title,
            note: mForm.note
          } : m);
        }
      }
      saveHorizons(data);
      setEditingMilestone(null);
    }
    function deleteMilestone() {
      const {
        bucket,
        idx
      } = editingMilestone;
      const data = {
        ...childHorizons
      };
      data[bucket] = data[bucket].filter((_, i) => i !== idx);
      saveHorizons(data);
      setEditingMilestone(null);
    }
    const BUCKETS = [{
      id: "1yr",
      label: "In 1 year",
      emoji: "🌿",
      color: "#4A9B6F",
      approxYear: new Date().getFullYear() + 1
    }, {
      id: "3yr",
      label: "In 3 years",
      emoji: "🌲",
      color: "#4A7BB5",
      approxYear: new Date().getFullYear() + 3
    }, {
      id: "5yr",
      label: "In 5 years",
      emoji: "🏔️",
      color: "#9B6FB5",
      approxYear: new Date().getFullYear() + 5
    }];
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SharedSectionHead, {
      emoji: "\uD83C\uDFD4\uFE0F",
      title: "Children's Horizons",
      sub: "A forward-looking view for each child \u2014 the milestones and transitions ahead over the next 1, 3, and 5 years. Edit freely."
    }), children.length > 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginBottom: 28,
        flexWrap: "wrap"
      }
    }, children.map(c => /*#__PURE__*/React.createElement("button", {
      key: c.id,
      onClick: () => setActiveChild(c.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 16px",
        borderRadius: 30,
        border: `2px solid ${activeChild === c.id ? c.avatar_colour : C.border}`,
        background: activeChild === c.id ? c.avatar_colour + "18" : "#fff",
        cursor: "pointer",
        fontFamily: "inherit",
        fontWeight: activeChild === c.id ? 800 : 500,
        fontSize: 13,
        color: activeChild === c.id ? c.avatar_colour : C.muted,
        transition: "all .15s"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: c.avatar_colour,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 900,
        color: "#fff",
        flexShrink: 0
      }
    }, c.name[0]), c.name))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        padding: "18px 22px",
        borderRadius: 14,
        background: `linear-gradient(135deg,${child.avatar_colour}18,${child.avatar_colour}06)`,
        border: `1px solid ${child.avatar_colour}33`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: child.avatar_colour,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 900,
        fontSize: 20,
        color: "#fff",
        boxShadow: `0 3px 12px ${child.avatar_colour}55`
      }
    }, child.name[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 17,
        color: C.text
      }
    }, child.name, "'s horizons"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginTop: 2
      }
    }, "Age ", age, " \xB7 next 1, 3 and 5 years"))), !childHorizons && /*#__PURE__*/React.createElement("button", {
      onClick: autoGenerate,
      style: {
        padding: "8px 18px",
        borderRadius: 10,
        border: `1.5px solid ${child.avatar_colour}`,
        background: child.avatar_colour + "18",
        cursor: "pointer",
        fontSize: 12,
        fontWeight: 800,
        fontFamily: "inherit",
        color: child.avatar_colour
      }
    }, "\u2728 Auto-suggest for age ", age), childHorizons && /*#__PURE__*/React.createElement("button", {
      onClick: autoGenerate,
      style: {
        padding: "6px 12px",
        borderRadius: 8,
        border: `1px solid ${C.border}`,
        background: "#FAFAF7",
        cursor: "pointer",
        fontSize: 11,
        fontFamily: "inherit",
        color: C.muted
      }
    }, "Regenerate suggestions")), !childHorizons && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "48px 24px",
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 40,
        marginBottom: 12
      }
    }, "\uD83D\uDDD3\uFE0F"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 16,
        marginBottom: 8
      }
    }, "No horizons mapped yet"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.muted,
        marginBottom: 20,
        lineHeight: 1.7,
        maxWidth: 320,
        margin: "0 auto 20px"
      }
    }, "Get a head start with age-appropriate milestone suggestions for ", child.name, ", then personalise them to fit your family."), /*#__PURE__*/React.createElement("button", {
      onClick: autoGenerate,
      style: {
        padding: "10px 24px",
        borderRadius: 10,
        border: "none",
        background: child.avatar_colour,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 14,
        fontFamily: "inherit"
      }
    }, "\u2728 Auto-generate for age ", age)), childHorizons && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 16
      }
    }, BUCKETS.map(b => {
      const items = childHorizons[b.id] || [];
      return /*#__PURE__*/React.createElement("div", {
        key: b.id,
        style: {
          background: "#fff",
          borderRadius: 14,
          border: `1px solid ${b.color}33`,
          overflow: "hidden"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          background: `linear-gradient(135deg,${b.color}18,${b.color}06)`,
          padding: "14px 16px",
          borderBottom: `1px solid ${b.color}22`
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 18,
          marginBottom: 4
        }
      }, b.emoji), /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 800,
          fontSize: 14,
          color: b.color
        }
      }, b.label), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: C.muted,
          marginTop: 2
        }
      }, "~", b.approxYear), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: b.color + "99",
          marginTop: 2
        }
      }, items.length, " milestone", items.length !== 1 ? "s" : "")), /*#__PURE__*/React.createElement("div", {
        style: {
          padding: "12px 12px 8px"
        }
      }, items.map((m, idx) => /*#__PURE__*/React.createElement("div", {
        key: m.id || idx,
        style: {
          padding: "10px 12px",
          borderRadius: 9,
          marginBottom: 6,
          background: "#FAFAF7",
          border: `1px solid ${C.border}`,
          cursor: "pointer",
          transition: "border-color .12s"
        },
        onClick: () => openEditMilestone(b.id, idx),
        onMouseEnter: e => e.currentTarget.style.borderColor = b.color,
        onMouseLeave: e => e.currentTarget.style.borderColor = C.border
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 600,
          fontSize: 13,
          color: C.text,
          marginBottom: m.note ? 3 : 0
        }
      }, m.title), m.note && /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: C.muted,
          lineHeight: 1.5
        }
      }, m.note))), /*#__PURE__*/React.createElement("button", {
        onClick: () => openNewMilestone(b.id),
        style: {
          width: "100%",
          padding: "8px",
          borderRadius: 9,
          border: `1.5px dashed ${b.color}55`,
          background: "transparent",
          cursor: "pointer",
          fontSize: 12,
          fontFamily: "inherit",
          color: b.color + "99",
          fontWeight: 600,
          transition: "all .15s"
        },
        onMouseEnter: e => {
          e.currentTarget.style.borderColor = b.color;
          e.currentTarget.style.color = b.color;
        },
        onMouseLeave: e => {
          e.currentTarget.style.borderColor = b.color + "55";
          e.currentTarget.style.color = b.color + "99";
        }
      }, "+ Add")));
    })), editingMilestone !== null && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.38)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100
      },
      onClick: e => {
        if (e.target === e.currentTarget) setEditingMilestone(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 16,
        padding: 28,
        width: 440,
        maxWidth: "92vw",
        boxShadow: "0 24px 60px rgba(0,0,0,0.2)"
      },
      role: "dialog",
      "aria-modal": "true",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 18,
        marginBottom: 20
      }
    }, editingMilestone === "new" ? "Add milestone" : "Edit milestone"), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Milestone"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: mForm.title,
      onChange: v => setMForm(f => ({
        ...f,
        title: v
      })),
      placeholder: "e.g. Start secondary school"
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Note (optional)"
    }, /*#__PURE__*/React.createElement("textarea", {
      value: mForm.note,
      onChange: e => setMForm(f => ({
        ...f,
        note: e.target.value
      })),
      rows: 2,
      placeholder: "A little context or reminder\u2026",
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "9px 10px",
        fontSize: 13,
        fontFamily: "Georgia,serif",
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        outline: "none"
      }
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Horizon"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, BUCKETS.map(b => /*#__PURE__*/React.createElement("button", {
      key: b.id,
      onClick: () => setMForm(f => ({
        ...f,
        bucket: b.id
      })),
      style: {
        flex: 1,
        padding: "8px",
        borderRadius: 8,
        border: `1.5px solid ${mForm.bucket === b.id ? b.color : C.border}`,
        background: mForm.bucket === b.id ? b.color + "15" : "#fff",
        cursor: "pointer",
        fontSize: 12,
        fontFamily: "inherit",
        fontWeight: mForm.bucket === b.id ? 800 : 400,
        color: mForm.bucket === b.id ? b.color : C.muted
      }
    }, b.emoji, " ", b.label)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: saveMilestone,
      style: {
        padding: "9px 22px",
        borderRadius: 9,
        border: "none",
        background: child.avatar_colour,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 13,
        fontFamily: "inherit"
      }
    }, "Save"), /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: () => setEditingMilestone(null)
    }, "Cancel"), editingMilestone !== "new" && /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      onClick: deleteMilestone
    }, "Delete")))));
  };

  // ══════════════════════════════════════════════════════════
  // DECISIONS
  // ══════════════════════════════════════════════════════════
  const DecisionsTab = () => {
    const decisions = planning.decisions || [];
    const [viewId, setViewId] = useState(null);
    const [editId, setEditId] = useState(null);
    const blankForm = {
      title: "",
      options: "",
      pros_cons: "",
      decision_made: ""
    };
    const [form, setForm] = useState(blankForm);
    const open = decisions.filter(d => !d.decision_made?.trim());
    const closed = decisions.filter(d => !!d.decision_made?.trim());
    function openNew() {
      setForm(blankForm);
      setEditId("new");
      setViewId(null);
    }
    function openEdit(d) {
      setForm({
        title: d.title,
        options: d.options || "",
        pros_cons: d.pros_cons || "",
        decision_made: d.decision_made || ""
      });
      setEditId(d.id);
      setViewId(null);
    }
    function closeForm() {
      setEditId(null);
    }
    function save() {
      if (!form.title.trim()) return;
      let next;
      if (editId === "new") {
        next = [...decisions, {
          id: uid(),
          ...form,
          created_at: new Date().toISOString()
        }];
      } else {
        next = decisions.map(d => d.id === editId ? {
          ...d,
          ...form
        } : d);
      }
      savePlan({
        decisions: next
      });
      closeForm();
    }
    async function del(id) {
      const title = decisions.find(d => d.id === id)?.title || "this decision";
      const ok = await requestConfirm({
        message: "Delete decision?",
        detail: `"${title}" will be permanently removed from the log.`
      });
      if (!ok) return;
      savePlan({
        decisions: decisions.filter(d => d.id !== id)
      });
      closeForm();
      setViewId(null);
    }
    function relDate(iso) {
      const d = new Date(iso),
        now = new Date(),
        days = Math.floor((now - d) / 86400000);
      if (days === 0) return "today";
      if (days === 1) return "yesterday";
      if (days < 7) return `${days} days ago`;
      if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    }
    const viewing = decisions.find(d => d.id === viewId);

    // Inline field for the detail view
    const DetailField = ({
      label,
      value
    }) => value ? /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: .8,
        color: C.muted,
        marginBottom: 8
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        lineHeight: 1.8,
        color: C.text,
        fontFamily: "Georgia,serif",
        background: "#FAFAF7",
        borderRadius: 10,
        padding: "14px 16px",
        border: `1px solid ${C.border}`,
        whiteSpace: "pre-wrap"
      }
    }, value)) : null;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SharedSectionHead, {
      emoji: "\uD83E\uDDED",
      title: "Big Decisions",
      sub: "A calm space to think through the calls that matter \u2014 where to live, school choices, a career shift. Write it down before you decide.",
      action: /*#__PURE__*/React.createElement("button", {
        onClick: openNew,
        style: {
          padding: "9px 20px",
          borderRadius: 10,
          border: "none",
          background: C.accent,
          color: "#fff",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: 13,
          fontFamily: "inherit",
          flexShrink: 0,
          whiteSpace: "nowrap"
        }
      }, "+ Log decision")
    }), decisions.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "56px 24px",
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 48,
        marginBottom: 14
      }
    }, "\uD83E\uDDED"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 17,
        color: C.text,
        marginBottom: 8
      }
    }, "Nothing logged yet"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.muted,
        lineHeight: 1.7,
        maxWidth: 340,
        margin: "0 auto 20px"
      }
    }, "When a big question comes up \u2014 moving house, changing schools, a career shift \u2014 log it here. Think it through together, then record what you decided."), /*#__PURE__*/React.createElement("button", {
      onClick: openNew,
      style: {
        padding: "10px 24px",
        borderRadius: 10,
        border: "none",
        background: C.accent,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 14,
        fontFamily: "inherit"
      }
    }, "Log your first decision")), open.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 32
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: 1.2,
        color: C.muted,
        marginBottom: 14
      }
    }, "Under consideration"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, open.map(d => /*#__PURE__*/React.createElement("div", {
      key: d.id,
      style: {
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${C.border}`,
        padding: "20px 22px",
        cursor: "pointer",
        transition: "box-shadow .15s",
        borderLeft: `5px solid ${C.accent}`
      },
      onClick: () => setViewId(d.id),
      onMouseEnter: e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)",
      onMouseLeave: e => e.currentTarget.style.boxShadow = "none"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: C.accentLight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        flexShrink: 0
      }
    }, "\uD83E\uDDED"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 15,
        marginBottom: 4,
        color: C.text
      }
    }, d.title), d.options && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        lineHeight: 1.6,
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical"
      }
    }, d.options), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginTop: 6
      }
    }, "Logged ", relDate(d.created_at))), /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        openEdit(d);
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.muted,
        fontSize: 14,
        flexShrink: 0
      }
    }, "\u270E")))))), closed.length > 0 && /*#__PURE__*/React.createElement("details", {
      open: open.length === 0
    }, /*#__PURE__*/React.createElement("summary", {
      style: {
        cursor: "pointer",
        fontWeight: 800,
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: 1.2,
        color: C.muted,
        userSelect: "none",
        listStyle: "none",
        display: "flex",
        gap: 6,
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("span", null, "\u25B8"), " Decided (", closed.length, ")"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, closed.map(d => /*#__PURE__*/React.createElement("div", {
      key: d.id,
      style: {
        background: "#F8F6F2",
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        padding: "14px 18px",
        cursor: "pointer",
        borderLeft: `4px solid ${C.green}`
      },
      onClick: () => setViewId(d.id)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, "\u2705"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: C.text
      }
    }, d.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginTop: 2,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
      }
    }, d.decision_made)), /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        openEdit(d);
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.muted,
        fontSize: 13
      }
    }, "\u270E")))))), viewing && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.38)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100
      },
      onClick: e => {
        if (e.target === e.currentTarget) setViewId(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 18,
        padding: 32,
        width: 580,
        maxWidth: "94vw",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 28px 70px rgba(0,0,0,0.18)",
        fontFamily: "Georgia,serif"
      },
      role: "dialog",
      "aria-modal": "true",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 900,
        fontSize: 22,
        flex: 1,
        paddingRight: 12,
        color: C.text,
        lineHeight: 1.3
      }
    }, viewing.title), /*#__PURE__*/React.createElement("button", {
      onClick: () => setViewId(null),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: 22,
        color: C.muted,
        lineHeight: 1
      }
    }, "\xD7")), /*#__PURE__*/React.createElement(DetailField, {
      label: "Options considered",
      value: viewing.options
    }), /*#__PURE__*/React.createElement(DetailField, {
      label: "Pros & cons",
      value: viewing.pros_cons
    }), viewing.decision_made?.trim() ? /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 20,
        padding: "16px 18px",
        background: "#F0FBF4",
        border: `1px solid ${C.green}44`,
        borderRadius: 12,
        borderLeft: `4px solid ${C.green}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: .8,
        color: C.green,
        marginBottom: 6
      }
    }, "Decision made"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        lineHeight: 1.8,
        color: C.text,
        fontFamily: "Georgia,serif"
      }
    }, viewing.decision_made)) : /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 16px",
        background: "#FDF0EA",
        borderRadius: 10,
        fontSize: 13,
        color: C.muted,
        marginBottom: 20
      }
    }, "\uD83D\uDCAD Still thinking this through \u2014 no decision made yet."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setViewId(null);
        openEdit(viewing);
      },
      style: {
        padding: "8px 18px",
        borderRadius: 9,
        border: `1px solid ${C.border}`,
        background: "#fff",
        cursor: "pointer",
        fontSize: 13,
        fontFamily: "inherit",
        color: C.muted,
        fontWeight: 600
      }
    }, "Edit"), /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      onClick: () => del(viewing.id)
    }, "Delete"), /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: () => setViewId(null)
    }, "Close")))), editId !== null && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.38)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 110
      },
      onClick: e => {
        if (e.target === e.currentTarget) closeForm();
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 18,
        padding: 32,
        width: 580,
        maxWidth: "94vw",
        maxHeight: "90vh",
        overflowY: "auto",
        boxShadow: "0 28px 70px rgba(0,0,0,0.2)",
        fontFamily: "Georgia,serif"
      },
      role: "dialog",
      "aria-modal": "true",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 900,
        fontSize: 20,
        marginBottom: 4
      }
    }, editId === "new" ? "Log a decision" : "Edit decision"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        marginBottom: 24,
        lineHeight: 1.6
      }
    }, "Write as much or as little as helps you think it through. You can always come back and add the outcome."), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "What's the question?"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: form.title,
      onChange: v => setForm(f => ({
        ...f,
        title: v
      })),
      placeholder: "e.g. \"Should we move to a bigger house?\""
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Options we're considering"
    }, /*#__PURE__*/React.createElement("textarea", {
      value: form.options,
      onChange: e => setForm(f => ({
        ...f,
        options: e.target.value
      })),
      rows: 3,
      placeholder: "Option A: …\nOption B: …\nOption C: …",
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 13,
        fontFamily: "Georgia,serif",
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        lineHeight: 1.7,
        outline: "none",
        color: C.text
      }
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Pros & cons notes"
    }, /*#__PURE__*/React.createElement("textarea", {
      value: form.pros_cons,
      onChange: e => setForm(f => ({
        ...f,
        pros_cons: e.target.value
      })),
      rows: 4,
      placeholder: "Think through the trade-offs here. No need to be formal \u2014 stream of thought is fine.",
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 13,
        fontFamily: "Georgia,serif",
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        lineHeight: 1.7,
        outline: "none",
        color: C.text
      }
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Decision made (leave blank if still deciding)"
    }, /*#__PURE__*/React.createElement("textarea", {
      value: form.decision_made,
      onChange: e => setForm(f => ({
        ...f,
        decision_made: e.target.value
      })),
      rows: 2,
      placeholder: "Once you've decided, write it here. This closes the loop.",
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 13,
        fontFamily: "Georgia,serif",
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        lineHeight: 1.7,
        outline: "none",
        color: C.text
      }
    }), form.decision_made?.trim() && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.green,
        marginTop: 5,
        fontWeight: 600
      }
    }, "\u2705 This decision will be marked as resolved.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: save,
      style: {
        padding: "10px 24px",
        borderRadius: 10,
        border: "none",
        background: C.accent,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 14,
        fontFamily: "inherit"
      }
    }, "Save"), /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: closeForm
    }, "Cancel"), editId !== "new" && /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      onClick: () => del(editId)
    }, "Delete")))));
  };

  // ── render ─────────────────────────────────────────────────
  return /*#__PURE__*/React.createElement("div", null, confirmDialog, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.accent,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      marginBottom: 6
    }
  }, "Family Dynamics"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "0 0 6px",
      fontSize: 28,
      fontWeight: 900,
      letterSpacing: -.5,
      color: C.text
    }
  }, "Long-term Planning"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: C.muted,
      lineHeight: 1.65,
      maxWidth: 520
    }
  }, "For the decisions that matter. Goals to work toward, milestones to anticipate, and the big calls you're thinking through together.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      background: "#EDEAE2",
      padding: 4,
      borderRadius: 12,
      marginBottom: 32,
      width: "fit-content"
    }
  }, /*#__PURE__*/React.createElement(SectionTabPill, {
    id: "goals",
    label: "\uD83C\uDF31 Family Goals",
    activeId: tab,
    onSelect: setTab
  }), /*#__PURE__*/React.createElement(SectionTabPill, {
    id: "horizons",
    label: "\uD83C\uDFD4\uFE0F Children's Horizons",
    activeId: tab,
    onSelect: setTab
  }), /*#__PURE__*/React.createElement(SectionTabPill, {
    id: "decisions",
    label: "\uD83E\uDDED Big Decisions",
    activeId: tab,
    onSelect: setTab
  })), tab === "goals" && /*#__PURE__*/React.createElement(GoalsTab, null), tab === "horizons" && /*#__PURE__*/React.createElement(HorizonsTab, null), tab === "decisions" && /*#__PURE__*/React.createElement(DecisionsTab, null));
}

// ── AI Assistant ──────────────────────────────────────────────
function buildFamilyContext(family) {
  const now = new Date();
  const children = (family.children || []).map(c => ({
    name: c.name,
    age: ageOf(c.date_of_birth),
    interests: c.interests,
    personality_traits: c.personality_traits
  }));

  // Finance
  const fin = family.finance || {};
  const income = (fin.income || []).reduce((s, i) => s + Number(i.amount), 0);
  const currentMonthKey = now.toISOString().slice(0, 7);
  const totalSpent = (fin.spending_log || []).filter(e => (e.date || "").startsWith(currentMonthKey)).reduce((s, e) => s + Number(e.amount), 0);
  const budgetSummary = (fin.budget || []).map(b => ({
    category: b.category,
    budgeted: b.budgeted
  }));

  // Tasks (open, upcoming)
  const tasks = (family.tasks || []).filter(t => t.status !== "done").slice(0, 10).map(t => ({
    title: t.title,
    due: t.due_date || null,
    priority: t.priority
  }));

  // Pantry
  const pantry = (family.pantry || []).filter(p => p.inStock).map(p => p.name);

  // Recipes
  const recipes = (family.recipes || []).map(r => r.title).slice(0, 15);

  // Upcoming calendar events (next 14 days)
  const in14 = new Date(now);
  in14.setDate(now.getDate() + 14);
  const events = (family.events || []).filter(e => {
    const d = new Date(e.start_time);
    return d >= now && d <= in14;
  }).sort((a, b) => new Date(a.start_time) - new Date(b.start_time)).slice(0, 8).map(e => ({
    title: e.title,
    date: new Date(e.start_time).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short"
    })
  }));

  // Notes (family scope, most recent 5, plain text)
  const notes = (family.notes || []).filter(n => n.scope === "family").sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5).map(n => n.title || (n.body || "").replace(/<[^>]+>/g, "").slice(0, 80));

  // Planning goals (active)
  const goals = ((family.planning || {}).goals || []).filter(g => g.status !== "achieved").map(g => g.title);

  // Meal plan (this week)
  const monday = new Date(now);
  monday.setDate(now.getDate() - (now.getDay() + 6) % 7);
  const weekDates = Array.from({
    length: 7
  }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split("T")[0];
  });
  const mealPlan = family.meal_plan || {};
  const plannedMeals = [...new Set(weekDates.flatMap(date => ["breakfast", "lunch", "dinner"].map(m => mealPlan[`${date}_${m}`]).filter(Boolean)))];

  // Currency symbol for the AI prompt
  const currencySymbol = (CURRENCIES[family.currency || "EUR"] || CURRENCIES.EUR).symbol;
  return {
    children,
    income,
    totalSpent,
    budgetSummary,
    tasks,
    pantry,
    recipes,
    events,
    notes,
    goals,
    plannedMeals,
    currencySymbol
  };
}

// ── Single unified Claude API wrapper ────────────────────────
// All AI calls in the app go through this function.
// maxTokens defaults to 1000; pass a smaller value for short responses.
async function callClaude(systemPrompt, userMessage, maxTokens = 1000) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{
        role: "user",
        content: userMessage
      }]
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "API error");
  return data.content.map(b => b.text || "").join("");
}
function AIAssistant({
  isOpen,
  onClose
}) {
  const {
    family
  } = useFamilyCtx();
  const ctx = buildFamilyContext(family);
  const SYSTEM = `You are Fam, a warm and practical family assistant AI built into a family organisation app.

Here is the family's current context:

CHILDREN: ${JSON.stringify(ctx.children)}

UPCOMING CALENDAR (next 14 days): ${ctx.events.length ? ctx.events.map(e => `${e.date} — ${e.title}`).join("; ") : "none"}

OPEN TASKS: ${ctx.tasks.length ? ctx.tasks.map(t => `${t.title}${t.due ? " (due " + t.due + ")" : ""}${t.priority === "high" ? " [HIGH]" : ""}`).join("; ") : "none"}

MEALS PLANNED THIS WEEK: ${ctx.plannedMeals.length ? ctx.plannedMeals.join(", ") : "none"}
SAVED RECIPES: ${ctx.recipes.length ? ctx.recipes.join(", ") : "none"}
PANTRY ITEMS IN STOCK: ${ctx.pantry.length ? ctx.pantry.join(", ") : "none"}

FINANCE — Monthly income: ${ctx.currencySymbol}${ctx.income}, Spent this month: ${ctx.currencySymbol}${ctx.totalSpent}
BUDGET CATEGORIES: ${ctx.budgetSummary.map(b => `${b.category} (${ctx.currencySymbol}${b.budgeted}/mo)`).join(", ") || "not set up"}

FAMILY NOTES (recent): ${ctx.notes.length ? ctx.notes.join(" | ") : "none"}
ACTIVE GOALS: ${ctx.goals.length ? ctx.goals.join(", ") : "none"}

Answer concisely and helpfully — under 200 words unless a list is needed. Be warm and practical, like a knowledgeable family friend. Never invent data not in the context above.`;
  const STARTERS = ["What have we got on this week?", "What should we cook tonight?", "Any tasks overdue or due soon?", "How are we doing on the budget?", "Suggest an activity for the kids", "What are our family goals?"];
  const [messages, setMessages] = useState([{
    role: "assistant",
    text: `Hi! I'm your Fam assistant. I can see your family's calendar, tasks, meal plan, budget, notes, and goals. What would you like to know?`
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);
  async function send(msg) {
    const text = msg || input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages(m => [...m, {
      role: "user",
      text
    }]);
    setLoading(true);
    try {
      const reply = await callClaude(SYSTEM, text);
      setMessages(m => [...m, {
        role: "assistant",
        text: reply
      }]);
    } catch (e) {
      setMessages(m => [...m, {
        role: "assistant",
        text: `Sorry, couldn't connect to AI. (${e.message})`
      }]);
    }
    setLoading(false);
  }
  if (!isOpen) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 88,
      right: 24,
      width: 380,
      maxWidth: "calc(100vw - 48px)",
      background: "#fff",
      borderRadius: 20,
      boxShadow: "0 16px 64px rgba(0,0,0,0.18)",
      border: `1px solid ${C.border}`,
      zIndex: 300,
      display: "flex",
      flexDirection: "column",
      maxHeight: "70vh",
      fontFamily: "Georgia, serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 18px",
      borderBottom: `1px solid ${C.border}`,
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: "linear-gradient(135deg,#E8734A,#D4A843)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      flexShrink: 0
    }
  }, "\u2728"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 14,
      color: C.text
    }
  }, "Fam AI"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, "Knows your family's context")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.muted,
      fontSize: 20,
      lineHeight: 1,
      padding: "2px 4px"
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "14px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, messages.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: m.role === "user" ? "flex-end" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "84%",
      padding: "10px 14px",
      borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
      background: m.role === "user" ? C.accent : "#F5F2EC",
      color: m.role === "user" ? "#fff" : C.text,
      fontSize: 13,
      lineHeight: 1.65,
      whiteSpace: "pre-wrap"
    }
  }, m.text))), loading && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      padding: "10px 14px",
      background: "#F5F2EC",
      borderRadius: "16px 16px 16px 4px",
      width: "fit-content"
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: C.muted,
      opacity: .5
    }
  }))), /*#__PURE__*/React.createElement("div", {
    ref: endRef
  })), messages.length < 2 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 14px 10px",
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, STARTERS.map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => send(s),
    style: {
      padding: "5px 10px",
      borderRadius: 20,
      border: `1px solid ${C.border}`,
      background: "#FAFAF7",
      cursor: "pointer",
      fontSize: 11,
      fontFamily: "inherit",
      color: C.muted,
      fontWeight: 500
    }
  }, s))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 14px",
      borderTop: `1px solid ${C.border}`,
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: input,
    onChange: e => setInput(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    },
    "aria-label": "Ask Fam AI a question",
    placeholder: "Ask anything about your family\u2026",
    style: {
      flex: 1,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "9px 12px",
      fontSize: 13,
      fontFamily: "inherit",
      outline: "none",
      background: "#FAFAF7",
      color: C.text,
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => send(),
    disabled: !input.trim() || loading,
    "aria-label": "Send message",
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      border: "none",
      background: input.trim() && !loading ? C.accent : "#E4DFD5",
      cursor: input.trim() && !loading ? "pointer" : "default",
      color: "#fff",
      fontSize: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      transition: "background .15s"
    }
  }, "\u2191")));
}
function AIButton({
  onClick,
  isOpen,
  ["aria-label"]: ariaLabel
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    "aria-label": ariaLabel || "Toggle AI assistant",
    style: {
      position: "fixed",
      bottom: 24,
      right: 24,
      width: 54,
      height: 54,
      borderRadius: "50%",
      background: isOpen ? "#2C2A26" : "linear-gradient(135deg,#E8734A,#D4A843)",
      border: "none",
      cursor: "pointer",
      zIndex: 299,
      boxShadow: "0 4px 20px rgba(232,115,74,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      transition: "all .2s",
      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
    }
  }, isOpen ? "×" : "✨");
}

// ── 9. Global Search ──────────────────────────────────────────
// Searches across: tasks, events, notes, recipes, contacts,
// documents, grocery, goals, decisions, children

function buildSearchIndex(family) {
  const results = [];
  const push = (section, sectionId, icon, title, sub, itemId) => results.push({
    section,
    sectionId,
    icon,
    title: title || "",
    sub: sub || "",
    itemId
  });

  // Tasks
  (family.tasks || []).forEach(t => push("To-Do", "todos", "✅", t.title, `${t.priority} priority${t.due_date ? " · due " + t.due_date : ""}${t.status === "done" ? " · done" : ""}`, t.id));

  // Calendar events
  (family.events || []).forEach(e => push("Calendar", "calendar", "📅", e.title, new Date(e.start_time).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }), e.id));

  // Notes
  const plainText = html => (html || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 80);
  (family.notes || []).forEach(n => push("Notes", "notes", "📝", n.title || "Untitled note", plainText(n.body), n.id));

  // Recipes
  (family.recipes || []).forEach(r => push("Meals & Kitchen", "meals", "🍴", r.title, `${r.time} min · ${(r.tags || []).join(", ")}`, r.id));

  // Grocery items
  (family.grocery || []).forEach(g => push("Grocery", "grocery", "🛒", g.name, `${g.category}${g.checked ? " · in basket" : ""}`, g.id));

  // House Admin – contacts
  ((family.house_admin || {}).contacts || []).forEach(c => push("House Admin", "houseadmin", "📞", c.name, `${c.category}${c.phone ? " · " + c.phone : ""}`, c.id));

  // House Admin – documents
  ((family.house_admin || {}).documents || []).forEach(d => push("House Admin", "houseadmin", "📄", d.title, d.tag + (d.notes ? " · " + d.notes.slice(0, 60) : ""), d.id));

  // House Admin – repairs
  ((family.house_admin || {}).repairs || []).forEach(r => push("House Admin", "houseadmin", "🔧", r.title, r.status.replace("_", " "), r.id));

  // Planning goals
  ((family.planning || {}).goals || []).forEach(g => push("Planning", "planning", "🌱", g.title, g.status.replace("_", " ") + (g.description ? " · " + g.description.slice(0, 60) : ""), g.id));

  // Planning decisions
  ((family.planning || {}).decisions || []).forEach(d => push("Planning", "planning", "🧭", d.title, d.decision_made ? "Decided: " + d.decision_made.slice(0, 60) : "Under consideration", d.id));

  // Children profiles
  (family.children || []).forEach(c => push("Children", c.id, "👦", c.name, `Age ${ageOf(c.date_of_birth)}${(c.interests || []).length ? " · " + (c.interests || []).join(", ") : ""}`, c.id));

  // Child notes
  Object.entries(family.child_notes || {}).forEach(([childId, notes]) => {
    const child = (family.children || []).find(c => c.id === childId);
    (notes || []).forEach(n => push("Children", childId, "📝", n.body.slice(0, 60), `Note about ${child?.name || "child"}`, n.id));
  });
  return results;
}
function GlobalSearch({
  onClose
}) {
  const {
    family,
    setSection
  } = useFamilyCtx();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const index = buildSearchIndex(family);
  const results = query.trim().length < 2 ? [] : (() => {
    const q = query.toLowerCase();
    return index.filter(r => r.title.toLowerCase().includes(q) || r.sub.toLowerCase().includes(q) || r.section.toLowerCase().includes(q)).slice(0, 12);
  })();

  // Group by section
  const grouped = results.reduce((acc, r) => {
    if (!acc[r.section]) acc[r.section] = [];
    acc[r.section].push(r);
    return acc;
  }, {});
  function handleSelect(r) {
    setSection(r.sectionId);
    onClose();
  }
  function highlight(text, q) {
    if (!q || q.length < 2) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx < 0) return text;
    return /*#__PURE__*/React.createElement(React.Fragment, null, text.slice(0, idx), /*#__PURE__*/React.createElement("mark", {
      style: {
        background: C.accent + "33",
        color: C.accent,
        fontWeight: 700,
        borderRadius: 2,
        padding: "0 1px"
      }
    }, text.slice(idx, idx + q.length)), text.slice(idx + q.length));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      zIndex: 500,
      paddingTop: 80,
      fontFamily: "Georgia, serif"
    },
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Global search",
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      width: 580,
      maxWidth: "94vw",
      maxHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
      overflow: "hidden"
    },
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "16px 20px",
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      flexShrink: 0
    }
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    value: query,
    onChange: e => setQuery(e.target.value),
    onKeyDown: e => {
      if (e.key === "Escape") onClose();
    },
    placeholder: "Search tasks, notes, recipes, contacts, documents\u2026",
    "aria-label": "Search family data",
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: 16,
      fontFamily: "inherit",
      color: C.text,
      background: "transparent"
    }
  }), query && /*#__PURE__*/React.createElement("button", {
    onClick: () => setQuery(""),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.muted,
      fontSize: 18,
      padding: 0,
      lineHeight: 1
    }
  }, "\xD7"), /*#__PURE__*/React.createElement("kbd", {
    style: {
      fontSize: 11,
      color: C.muted,
      background: "#F0EDE6",
      padding: "2px 7px",
      borderRadius: 5,
      fontFamily: "inherit",
      border: `1px solid ${C.border}`,
      flexShrink: 0
    }
  }, "ESC")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      flex: 1
    }
  }, query.length < 2 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px 24px",
      textAlign: "center",
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      marginBottom: 10
    }
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, "Type at least 2 characters to search"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 6
    }
  }, "Searches tasks, notes, recipes, contacts, documents, goals, and more")), query.length >= 2 && results.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px 24px",
      textAlign: "center",
      color: C.muted
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      marginBottom: 10
    }
  }, "\uD83D\uDE36"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, "No results for ", /*#__PURE__*/React.createElement("strong", null, "\"", query, "\""))), Object.entries(grouped).map(([section, items]) => /*#__PURE__*/React.createElement("div", {
    key: section
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 20px 6px",
      fontSize: 10,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      color: C.muted,
      background: "#FAFAF7",
      borderBottom: `1px solid ${C.border}`
    }
  }, section), items.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.itemId + i,
    onClick: () => handleSelect(r),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 20px",
      cursor: "pointer",
      borderBottom: `1px solid ${C.border}`,
      transition: "background .1s"
    },
    onMouseEnter: e => e.currentTarget.style.background = C.accentLight,
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      flexShrink: 0
    }
  }, r.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14,
      color: C.text
    }
  }, highlight(r.title, query)), r.sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 2,
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    }
  }, highlight(r.sub, query))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted,
      flexShrink: 0
    }
  }, "\u2192")))))), results.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px",
      borderTop: `1px solid ${C.border}`,
      fontSize: 11,
      color: C.muted,
      background: "#FAFAF7",
      display: "flex",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", null, results.length, " result", results.length !== 1 ? "s" : ""), /*#__PURE__*/React.createElement("span", null, "\u21B5 to navigate \xB7 ESC to close"))));
}

// ── 10. Recurring Tasks ───────────────────────────────────────
// Recurring task engine: call this on app load / daily to
// materialise overdue recurring task instances.

const RECUR_LABELS = {
  daily: "Daily",
  weekly: "Weekly",
  fortnightly: "Every 2 weeks",
  monthly: "Monthly",
  quarterly: "Every 3 months",
  annually: "Annually"
};
function nextDueDate(lastDue, recurrence) {
  const d = new Date(lastDue);
  switch (recurrence) {
    case "daily":
      d.setDate(d.getDate() + 1);
      break;
    case "weekly":
      d.setDate(d.getDate() + 7);
      break;
    case "fortnightly":
      d.setDate(d.getDate() + 14);
      break;
    case "monthly":
      d.setMonth(d.getMonth() + 1);
      break;
    case "quarterly":
      d.setMonth(d.getMonth() + 3);
      break;
    case "annually":
      d.setFullYear(d.getFullYear() + 1);
      break;
    default:
      return null;
  }
  return d.toISOString().split("T")[0];
}

// Spawn new instances for recurring tasks where the last instance is done
// and the next due date has arrived (or passed).
function processRecurringTasks(tasks) {
  const today = new Date().toISOString().split("T")[0];
  const newTasks = [];

  // Find template tasks (recurrence set, not themselves instances)
  const templates = tasks.filter(t => t.recurrence && !t.recurrence_parent_id);
  templates.forEach(template => {
    // Find all existing instances of this template
    const instances = tasks.filter(t => t.recurrence_parent_id === template.id);
    // The most recent instance (or the template itself if no instances yet)
    const latest = instances.length ? instances.sort((a, b) => (b.due_date || "").localeCompare(a.due_date || ""))[0] : template;

    // Only spawn if latest instance is done (or template has no instances yet)
    const latestIsDone = latest.status === "done";
    const hasOpenInstance = instances.some(t => t.status !== "done");
    if (hasOpenInstance) return; // already an open instance, nothing to do

    // Compute next due from template's due_date or latest instance's due_date
    const baseDue = latest.due_date || today;
    const next = nextDueDate(baseDue, template.recurrence);
    if (!next) return;

    // Only spawn if next due date is today or in the past (i.e., it's time)
    if (next > today) return;

    // Don't duplicate if already exists
    const alreadyExists = tasks.some(t => t.recurrence_parent_id === template.id && t.due_date === next);
    if (alreadyExists) return;
    newTasks.push({
      id: uid(),
      title: template.title,
      due_date: next,
      assignee: template.assignee,
      priority: template.priority,
      status: "not_started",
      sort_order: tasks.length + newTasks.length,
      recurrence_parent_id: template.id,
      recurrence: null // instances don't themselves recur
    });
  });
  return newTasks;
}

// ── 11. Export & Print ────────────────────────────────────────

function exportFamilyData(family) {
  const data = JSON.stringify(family, null, 2);
  const blob = new Blob([data], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fam-backup-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
function printGroceryList(grocery) {
  const checked = grocery.filter(g => g.checked);
  const unchecked = grocery.filter(g => !g.checked);
  const CATS = ["produce", "dairy", "meat", "bakery", "frozen", "household", "other"];
  const grouped = CATS.reduce((acc, cat) => {
    const items = unchecked.filter(i => i.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});
  const w = window.open("", "_blank");
  w.document.write(`<!DOCTYPE html><html><head>
    <title>Grocery List</title>
    <style>
      body { font-family: Georgia, serif; max-width: 520px; margin: 40px auto; color: #2C2A26; }
      h1   { font-size: 24px; margin-bottom: 4px; }
      .sub { color: #8A8478; font-size: 13px; margin-bottom: 24px; }
      h2   { font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px;
             color: #8A8478; margin: 20px 0 8px; border-bottom: 1px solid #E4DFD5; padding-bottom: 4px; }
      ul   { list-style: none; padding: 0; margin: 0; }
      li   { display: flex; align-items: center; gap: 10px; padding: 7px 0;
             border-bottom: 1px solid #F0EDE6; font-size: 14px; }
      .box { width: 16px; height: 16px; border: 1.5px solid #8A8478;
             border-radius: 3px; flex-shrink: 0; }
      .qty { color: #8A8478; font-size: 12px; }
      .checked-section h2 { color: #CCC; }
      .checked-section li  { opacity: .5; }
      @media print { body { margin: 20px; } }
    </style>
  </head><body>
    <h1>🛒 Grocery List</h1>
    <div class="sub">Printed ${new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  })}</div>
    ${Object.entries(grouped).map(([cat, items]) => `
      <h2>${cat}</h2>
      <ul>${items.map(i => `<li>
        <div class="box"></div>
        <span>${i.name}</span>
        ${i.quantity || i.unit ? `<span class="qty">${i.quantity}${i.unit}</span>` : ""}
      </li>`).join("")}</ul>
    `).join("")}
    ${checked.length ? `
      <div class="checked-section">
        <h2>Already in basket (${checked.length})</h2>
        <ul>${checked.map(i => `<li>
          <div class="box" style="background:#4A9B6F;border-color:#4A9B6F"></div>
          <span style="text-decoration:line-through">${i.name}</span>
        </li>`).join("")}</ul>
      </div>
    ` : ""}
    <script>window.onload=()=>window.print();</script>
  </body></html>`);
  w.document.close();
}

// ── 12. Today Digest (Notifications) ─────────────────────────
// An in-app "Today" panel shown at the top of Home.
// Surfaces: tasks due today, tasks overdue, upcoming events
// (today + tomorrow), bills due this week.

function TodayDigest() {
  const {
    family,
    setSection
  } = useFamilyCtx();
  const euro = getCurrencyFormatter(family);
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const tomorrowStr = new Date(today.getTime() + 86400000).toISOString().split("T")[0];
  const in7Str = new Date(today.getTime() + 7 * 86400000).toISOString().split("T")[0];
  const tasks = family.tasks || [];
  const events = family.events || [];
  const bills = (family.house_admin?.bills || []).filter(b => b.status === "active" && b.frequency === "monthly");
  const overdue = tasks.filter(t => t.due_date && t.due_date < todayStr && t.status !== "done");
  const dueToday = tasks.filter(t => t.due_date === todayStr && t.status !== "done");
  const todayEvents = events.filter(e => new Date(e.start_time).toDateString() === today.toDateString());
  const tomorrowEvents = events.filter(e => new Date(e.start_time).toISOString().split("T")[0] === tomorrowStr);

  // Bills due within 3 days
  const todayDate = today.getDate();
  const billsDueSoon = bills.filter(b => {
    const diff = b.billing_day - todayDate;
    return diff >= 0 && diff <= 3;
  });
  const items = [];
  if (overdue.length) items.push({
    type: "overdue",
    emoji: "⚠️",
    color: C.red,
    label: `${overdue.length} overdue task${overdue.length !== 1 ? "s" : ""}`,
    action: () => setSection("todos")
  });
  if (dueToday.length) items.push({
    type: "duetoday",
    emoji: "📌",
    color: C.accent,
    label: `${dueToday.length} task${dueToday.length !== 1 ? "s" : ""} due today`,
    action: () => setSection("todos")
  });
  if (todayEvents.length) items.push({
    type: "events",
    emoji: "📅",
    color: C.blue,
    label: `${todayEvents.length} event${todayEvents.length !== 1 ? "s" : ""} today: ${todayEvents.map(e => e.title).join(", ")}`,
    action: () => setSection("calendar")
  });
  if (tomorrowEvents.length) items.push({
    type: "tomorrow",
    emoji: "🗓️",
    color: C.blue,
    label: `Tomorrow: ${tomorrowEvents.map(e => e.title).join(", ")}`,
    action: () => setSection("calendar")
  });
  billsDueSoon.forEach(b => items.push({
    type: "bill",
    emoji: "💳",
    color: C.yellow,
    label: `${b.name} (${euro(b.amount)}) due${b.billing_day === todayDate ? " today" : " in " + (b.billing_day - todayDate) + " day" + (b.billing_day - todayDate !== 1 ? "s" : "")}`,
    action: () => setSection("houseadmin")
  }));
  if (!items.length) return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 18px",
      borderRadius: 12,
      background: "#EEF9F3",
      border: `1px solid ${C.green}33`,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, "\u2705"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: C.green,
      fontWeight: 600
    }
  }, "All clear for today \u2014 nothing overdue, no events, no bills due."));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: 1.2,
      color: C.muted,
      marginBottom: 8
    }
  }, "Today's digest"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: item.action,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 16px",
      borderRadius: 10,
      cursor: "pointer",
      background: "#fff",
      border: `1px solid ${item.color}33`,
      borderLeft: `4px solid ${item.color}`,
      transition: "box-shadow .12s"
    },
    onMouseEnter: e => e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.07)",
    onMouseLeave: e => e.currentTarget.style.boxShadow = "none"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      flexShrink: 0
    }
  }, item.emoji), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: C.text,
      flex: 1
    }
  }, item.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, "\u2192")))));
}

// ── Confirm dialog ────────────────────────────────────────────
// A lightweight, reusable confirmation dialog.
// Usage:
//   const { confirmDialog, requestConfirm } = useConfirm();
//   ...
//   await requestConfirm({ message:"Delete this task?" }) && deleteIt();
//   ...
//   return <>{confirmDialog}</>

function ConfirmDialog({
  message,
  detail,
  confirmLabel = "Delete",
  onConfirm,
  onCancel
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.42)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
      fontFamily: "Georgia, serif"
    },
    onClick: e => {
      if (e.target === e.currentTarget) onCancel();
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 14,
      padding: "28px 30px",
      width: 380,
      maxWidth: "90vw",
      boxShadow: "0 24px 60px rgba(0,0,0,0.22)"
    },
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: C.red + "15",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      marginBottom: 16
    }
  }, "\uD83D\uDDD1\uFE0F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 17,
      color: C.text,
      marginBottom: 6
    }
  }, message), detail && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      lineHeight: 1.6,
      marginBottom: 20
    }
  }, detail), !detail && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onConfirm,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 9,
      border: "none",
      background: C.red,
      color: "#fff",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 14,
      fontFamily: "inherit"
    }
  }, confirmLabel), /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    style: {
      flex: 1,
      padding: "10px",
      borderRadius: 9,
      border: `1px solid ${C.border}`,
      background: "#fff",
      color: C.muted,
      cursor: "pointer",
      fontWeight: 600,
      fontSize: 14,
      fontFamily: "inherit"
    }
  }, "Cancel"))));
}

// Hook — returns { confirmDialog, requestConfirm }
// requestConfirm(opts) returns a Promise<boolean>
function useConfirm() {
  const [state, setState] = useState(null); // null | { message, detail, confirmLabel, resolve }

  const requestConfirm = opts => new Promise(resolve => {
    setState({
      ...opts,
      resolve
    });
  });
  const handleConfirm = () => {
    state?.resolve(true);
    setState(null);
  };
  const handleCancel = () => {
    state?.resolve(false);
    setState(null);
  };
  const confirmDialog = state ? /*#__PURE__*/React.createElement(ConfirmDialog, {
    message: state.message,
    detail: state.detail,
    confirmLabel: state.confirmLabel || "Delete",
    onConfirm: handleConfirm,
    onCancel: handleCancel
  }) : null;
  return {
    confirmDialog,
    requestConfirm
  };
}

// ── Collapsible children sidebar section ─────────────────────
// Extracted from the AppShell render so hooks are called correctly.
function ChildrenSidebarSection({
  children,
  section,
  setSection
}) {
  const [open, setOpen] = useState(true);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    onClick: () => setOpen(o => !o),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 14px 6px",
      cursor: "pointer",
      userSelect: "none",
      borderRadius: 8,
      transition: "background .12s"
    },
    onMouseEnter: e => e.currentTarget.style.background = "#E8E4DC",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: 1
    }
  }, "Children"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted,
      display: "inline-block",
      transition: "transform .2s",
      transform: open ? "rotate(0deg)" : "rotate(-90deg)"
    }
  }, "\u25BE")), open && children.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    onClick: () => setSection(c.id),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "7px 14px 7px 28px",
      borderRadius: 8,
      cursor: "pointer",
      background: section === c.id ? c.avatar_colour + "18" : "transparent",
      borderLeft: section === c.id ? `3px solid ${c.avatar_colour}` : "3px solid transparent",
      marginBottom: 2,
      transition: "background .12s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: c.avatar_colour,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 10,
      fontWeight: 900,
      color: "#fff",
      flexShrink: 0
    }
  }, c.name[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: section === c.id ? 700 : 500,
      color: section === c.id ? c.avatar_colour : C.text,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, c.name), section === c.id && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 10,
      color: c.avatar_colour
    }
  }, "\u25B8"))));
}

// ── Nav ───────────────────────────────────────────────────────
function NavItem({
  label,
  icon,
  active,
  onClick,
  indent = false,
  color
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    role: "button",
    "aria-current": active ? "page" : undefined,
    tabIndex: 0,
    onKeyDown: e => {
      if (e.key === "Enter" || e.key === " ") onClick();
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: `8px ${indent ? 32 : 14}px`,
      borderRadius: 8,
      cursor: "pointer",
      background: active ? C.accentLight : "transparent",
      color: active ? C.accent : C.text,
      fontWeight: active ? 700 : 500,
      fontSize: indent ? 13 : 14,
      marginBottom: 2,
      transition: "background .12s"
    }
  }, color && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: color,
      flexShrink: 0
    }
  }), !color && icon && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15
    }
  }, icon), label);
}

// ── App Shell ─────────────────────────────────────────────────
function AppShell({
  user,
  family: init,
  memberships: initMems,
  users: initUsers = [],
  onLogout
}) {
  const [family, setFamily] = useState(init);
  const [memberships] = useState(initMems);
  const [users, setUsers] = useState([]);
  const [section, setSection] = useState("home");
  const [showSettings, setShowSettings] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  // Load display names for all family members from Supabase auth metadata
  useEffect(() => {
    (async () => {
      // Supabase doesn't expose other users' auth records from the client.
      // We store name in user_metadata on signup. For display, fetch from
      // a view or use a profiles table. For now, build minimal user objects
      // from memberships that carry user_id; names come from metadata we
      // stored at signup and pass through onAuth.
      setUsers(initUsers || []);
    })();
  }, [memberships]);

  // Spawn any due recurring task instances on mount
  useEffect(() => {
    const spawned = processRecurringTasks(family.tasks || []);
    if (spawned.length > 0) updateFamily({
      tasks: [...(family.tasks || []), ...spawned]
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cmd/Ctrl+K → open global search
  useEffect(() => {
    function handler(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(true);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  function updateFamily(partial) {
    // Optimistic update: apply locally immediately, then persist async
    const {
      id,
      name,
      owner_id,
      created_at,
      ...data
    } = {
      ...family,
      ...partial
    };
    const updated = {
      id,
      name,
      owner_id,
      created_at,
      ...data
    };
    setFamily(updated);
    // Fire-and-forget async save to Supabase
    saveFamilyToSupabase(family.id, data);
  }
  function handleMiniCalDay(date) {
    setSelectedDay(date);
    setSection("calendar");
  }
  const myColour = memberships.find(m => m.user_id === user.id)?.colour || C.accent;
  const nav = [{
    id: "home",
    icon: "🏠",
    label: "Home"
  }, {
    id: "calendar",
    icon: "📅",
    label: "Calendar"
  }, {
    id: "todos",
    icon: "✅",
    label: "To-Do"
  }, {
    id: "meals",
    icon: "🍴",
    label: "Meals & Kitchen"
  }, {
    id: "grocery",
    icon: "🛒",
    label: "Grocery"
  }, {
    id: "houseadmin",
    icon: "🏡",
    label: "House Admin"
  }, {
    id: "notes",
    icon: "📝",
    label: "Notes"
  }, {
    id: "finance",
    icon: "💰",
    label: "Finance"
  }, {
    id: "planning",
    icon: "🌱",
    label: "Planning"
  }];
  function renderSection() {
    if (section === "home") return /*#__PURE__*/React.createElement(Home, null);
    if (section === "calendar") return /*#__PURE__*/React.createElement(CalendarSection, {
      selectedDay: selectedDay,
      setSelectedDay: setSelectedDay
    });
    if (section === "todos") return /*#__PURE__*/React.createElement(Todos, null);
    if (section === "meals") return /*#__PURE__*/React.createElement(MealsKitchen, null);
    if (section === "grocery") return /*#__PURE__*/React.createElement(Grocery, null);
    if (section === "houseadmin") return /*#__PURE__*/React.createElement(SectionErrorBoundary, null, /*#__PURE__*/React.createElement(HouseAdmin, null));
    if (section === "notes") return /*#__PURE__*/React.createElement(Notes, null);
    if (section === "finance") return /*#__PURE__*/React.createElement(SectionErrorBoundary, null, /*#__PURE__*/React.createElement(Finance, null));
    if (section === "planning") return /*#__PURE__*/React.createElement(SectionErrorBoundary, null, /*#__PURE__*/React.createElement(Planning, null));
    const child = (family.children || []).find(c => c.id === section);
    if (child) return /*#__PURE__*/React.createElement(ChildSpace, {
      child: child
    });
    return null;
  }
  const ctxValue = {
    family,
    updateFamily,
    user,
    memberships,
    users,
    section,
    setSection
  };
  return /*#__PURE__*/React.createElement(FamilyContext.Provider, {
    value: ctxValue
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "Georgia, serif",
      background: C.bg,
      minHeight: "100vh",
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 228,
      background: C.sidebar,
      borderRight: `1px solid ${C.border}`,
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      position: "sticky",
      top: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 12px 12px",
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 900,
      fontSize: 26,
      letterSpacing: -1,
      color: C.accent
    }
  }, "Fam"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, family.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowSearch(true),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 12px",
      borderRadius: 10,
      border: `1px solid ${C.border}`,
      background: "#fff",
      cursor: "pointer",
      textAlign: "left",
      fontFamily: "inherit",
      color: C.muted,
      fontSize: 12,
      transition: "border-color .15s"
    },
    onMouseEnter: e => e.currentTarget.style.borderColor = C.accent,
    onMouseLeave: e => e.currentTarget.style.borderColor = C.border
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "Search\u2026"), /*#__PURE__*/React.createElement("kbd", {
    style: {
      fontSize: 10,
      background: "#F0EDE6",
      padding: "1px 6px",
      borderRadius: 4,
      border: `1px solid ${C.border}`,
      letterSpacing: .5
    }
  }, "\u2318K"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: "10px 8px",
      overflowY: "auto"
    }
  }, nav.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id
  }, /*#__PURE__*/React.createElement(NavItem, {
    icon: s.icon,
    label: s.label,
    active: section === s.id,
    onClick: () => setSection(s.id)
  }), s.id === "calendar" && /*#__PURE__*/React.createElement(SidebarMiniCal, {
    events: family.events || [],
    selectedDay: selectedDay,
    onDayClick: handleMiniCalDay
  }))), /*#__PURE__*/React.createElement(ChildrenSidebarSection, {
    children: family.children || [],
    section: section,
    setSection: setSection
  })), /*#__PURE__*/React.createElement("div", {
    onClick: () => setShowSettings(true),
    style: {
      padding: "14px 16px",
      borderTop: `1px solid ${C.border}`,
      display: "flex",
      alignItems: "center",
      gap: 10,
      cursor: "pointer",
      transition: "background .12s"
    },
    onMouseEnter: e => e.currentTarget.style.background = "#E8E4DC",
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: myColour,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: 13,
      color: "#fff",
      flexShrink: 0
    }
  }, user.name[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 13,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, "Settings & invite")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.muted
    }
  }, "\u2699"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "32px 36px",
      maxWidth: 900
    }
  }, renderSection())), showSettings && /*#__PURE__*/React.createElement(FamilySettings, {
    family: family,
    user: user,
    memberships: memberships,
    users: users,
    updateFamily: updateFamily,
    onClose: () => setShowSettings(false),
    onLogout: () => {
      setShowSettings(false);
      onLogout();
    }
  }), showSearch && /*#__PURE__*/React.createElement(GlobalSearch, {
    onClose: () => setShowSearch(false)
  }), /*#__PURE__*/React.createElement(AIAssistant, {
    isOpen: showAI,
    onClose: () => setShowAI(false)
  }), /*#__PURE__*/React.createElement(AIButton, {
    onClick: () => setShowAI(v => !v),
    isOpen: showAI,
    "aria-label": showAI ? "Close AI assistant" : "Open AI assistant"
  })));
}

// ── Root ──────────────────────────────────────────────────────
function FamRoot() {
  const [session, setSession] = useState(null); // { user, family, memberships, users }
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Restore session from Supabase's built-in session management.
    // onAuthStateChange fires immediately with the persisted session.
    // We add a 6-second timeout so the app never gets stuck loading
    // (e.g. if Supabase tables haven't been created yet).
    const timeout = setTimeout(() => { famLog("Timed out - showing login"); setReady(true); }, 4000);
    const {
      data: {
        subscription
      }
    } = _supabaseClient.auth.onAuthStateChange(async (event, sbSession) => {
      clearTimeout(timeout);
      if (sbSession?.user) {
        try {
          const result = await loadUserSession(sbSession.user);
          if (result) setSession(result);else setSession(null);
        } catch (e) {
          console.error('Session load error:', e);
          setSession(null);
        }
      } else {
        setSession(null);
      }
      setReady(true);
    });
    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  // Called by AuthScreen / InviteJoin after a successful auth — session is
  // already set by onAuthStateChange, but we also accept the result directly
  // to avoid a round-trip on first load.
  function onAuth(result) {
    setSession(result);
  }
  async function onLogout() {
    await _supabaseClient.auth.signOut();
    setSession(null);
  }

  // Hide the HTML splash screen as soon as React has taken over
  useEffect(() => {
    const splash = document.getElementById('splash');
    if (splash) splash.style.display = 'none';
  }, []);
  if (!ready) return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Georgia, serif",
      color: C.muted,
      background: "#FAF8F5"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 42,
      fontWeight: 900,
      color: C.accent,
      letterSpacing: -2,
      marginBottom: 12
    }
  }, "Fam"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14
    }
  }, "Connecting\u2026")));
  if (!session) return /*#__PURE__*/React.createElement(AuthScreen, {
    onAuth: onAuth
  });
  return /*#__PURE__*/React.createElement(AppShell, {
    user: session.user,
    family: session.family,
    memberships: session.memberships,
    users: session.users || [],
    onLogout: onLogout
  });
}
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(FamRoot));
