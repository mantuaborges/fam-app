var useState=React.useState;var useEffect=React.useEffect;var useRef=React.useRef;var createContext=React.createContext;var useContext=React.useContext;var createClient=window.supabase.createClient;
function famLog(msg){console.log("[FAM]",msg);var el=document.getElementById("fam-status");if(el)el.textContent=msg;}
class SectionErrorBoundary extends React.Component{constructor(props){super(props);this.state={hasError:false,error:null};}static getDerivedStateFromError(e){return{hasError:true,error:e};}componentDidCatch(e,i){console.error("[FAM]",e,i);}render(){if(this.state.hasError){return React.createElement("div",{style:{padding:"32px",margin:"24px",background:"#FFF5F5",border:"1px solid #FCA5A5",borderRadius:"12px",fontFamily:"Georgia,serif"}},React.createElement("div",{style:{fontWeight:700,color:"#C94F4F",marginBottom:8}},"Something went wrong in this section"),React.createElement("div",{style:{fontSize:13,color:"#666",marginBottom:16,fontFamily:"monospace",background:"#f5f5f5",padding:"8px 12px",borderRadius:6}},this.state.error&&this.state.error.message),React.createElement("button",{onClick:()=>this.setState({hasError:false,error:null}),style:{padding:"8px 20px",borderRadius:8,border:"none",background:"#E8734A",color:"#fff",cursor:"pointer",fontFamily:"inherit",fontWeight:700}},"Try again"));}return this.props.children;}}
// ╔══════════════════════════════════════════════════════════════╗
// ║                     FAM — Family Organiser                   ║
// ║                 Single-file React application                ║
// ╠══════════════════════════════════════════════════════════════╣
// ║  TABLE OF CONTENTS                                           ║
// ║  ─────────────────────────────────────────────────────────  ║
// ║  §1   Imports & design tokens          ~  L10               ║
// ║  §2   Currency support                 ~  L70               ║
// ║  §3   FamilyContext (prop-drilling fix) ~  L110              ║
// ║  §4   Persistence & utilities          ~  L130              ║
// ║  §5   Seed data                        ~  L160              ║
// ║  §6   Shared UI primitives             ~  L230              ║
// ║  §7   Auth (login / register)          ~  L280              ║
// ║  §8   Family settings                  ~  L390              ║
// ║  §9   Calendar                         ~  L500              ║
// ║  §10  Home + TodayDigest               ~  L720              ║
// ║  §11  To-Do (tasks + recurring)        ~  L800              ║
// ║  §12  Grocery                          ~  L990              ║
// ║  §13  Hoisted child-space primitives   ~ L1130              ║
// ║  §14  Children (ChildSpace)            ~ L1160              ║
// ║  §15  Notes                            ~ L1800              ║
// ║  §16  Sidebar mini-calendar            ~ L1900              ║
// ║  §17  Meals & Kitchen (AI meal panel)  ~ L1990              ║
// ║  §18  Hoisted section primitives       ~ L2480              ║
// ║  §19  House Admin                      ~ L2560              ║
// ║  §20  Finance                          ~ L3480              ║
// ║  §21  Planning                         ~ L4490              ║
// ║  §22  AI (context builder, assistant)  ~ L5350              ║
// ║  §23  Global search                    ~ L5430              ║
// ║  §24  UX features (export, print)      ~ L5700              ║
// ║  §25  Confirm dialog + useConfirm      ~ L5870              ║
// ║  §26  Sidebar + NavItem                ~ L5990              ║
// ║  §27  AppShell (main layout)           ~ L6020              ║
// ║  §28  Root (session / auth gate)       ~ L6150              ║
// ╚══════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════════════════════════════╗
// ║              SUPABASE SETUP — READ BEFORE LAUNCH             ║
// ╠══════════════════════════════════════════════════════════════╣
// ║  1. Create a free Supabase project at https://supabase.com   ║
// ║                                                              ║
// ║  2. In the SQL editor, run this schema:                      ║
// ║                                                              ║
// ║  CREATE TABLE families (                                     ║
// ║    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),   ║
// ║    owner_id    uuid REFERENCES auth.users NOT NULL,          ║
// ║    name        text NOT NULL,                                ║
// ║    data        jsonb NOT NULL DEFAULT '{}',                   ║
// ║    created_at  timestamptz DEFAULT now()                     ║
// ║  );                                                          ║
// ║                                                              ║
// ║  CREATE TABLE memberships (                                  ║
// ║    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),   ║
// ║    user_id     uuid REFERENCES auth.users NOT NULL,          ║
// ║    family_id   uuid REFERENCES families NOT NULL,            ║
// ║    role        text NOT NULL DEFAULT 'member',               ║
// ║    colour      text NOT NULL DEFAULT '#E8734A',              ║
// ║    source      text NOT NULL DEFAULT 'manual',               ║
// ║    joined_at   timestamptz DEFAULT now(),                    ║
// ║    UNIQUE(user_id, family_id)                                ║
// ║  );                                                          ║
// ║                                                              ║
// ║  CREATE TABLE invites (                                      ║
// ║    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),   ║
// ║    family_id   uuid REFERENCES families NOT NULL,            ║
// ║    token       text UNIQUE NOT NULL,                         ║
// ║    created_by  uuid REFERENCES auth.users NOT NULL,          ║
// ║    status      text NOT NULL DEFAULT 'pending',              ║
// ║    created_at  timestamptz DEFAULT now()                     ║
// ║  );                                                          ║
// ║                                                              ║
// ║  -- Row-level security (RLS) policies:                       ║
// ║  ALTER TABLE families     ENABLE ROW LEVEL SECURITY;         ║
// ║  ALTER TABLE memberships  ENABLE ROW LEVEL SECURITY;         ║
// ║  ALTER TABLE invites      ENABLE ROW LEVEL SECURITY;         ║
// ║                                                              ║
// ║  -- Users can read/write their own family data               ║
// ║  CREATE POLICY "member read family"                          ║
// ║    ON families FOR SELECT USING (                            ║
// ║      id IN (SELECT family_id FROM memberships                ║
// ║             WHERE user_id = auth.uid())                      ║
// ║    );                                                        ║
// ║  CREATE POLICY "member write family"                         ║
// ║    ON families FOR UPDATE USING (                            ║
// ║      id IN (SELECT family_id FROM memberships                ║
// ║             WHERE user_id = auth.uid())                      ║
// ║    );                                                        ║
// ║  CREATE POLICY "member read memberships"                     ║
// ║    ON memberships FOR SELECT USING (                         ║
// ║      family_id IN (SELECT family_id FROM memberships         ║
// ║                    WHERE user_id = auth.uid())               ║
// ║    );                                                        ║
// ║  CREATE POLICY "member insert membership"                    ║
// ║    ON memberships FOR INSERT WITH CHECK (                    ║
// ║      user_id = auth.uid()                                    ║
// ║    );                                                        ║
// ║  CREATE POLICY "read pending invite"                         ║
// ║    ON invites FOR SELECT USING (status = 'pending');         ║
// ║  CREATE POLICY "family member create invite"                 ║
// ║    ON invites FOR INSERT WITH CHECK (                        ║
// ║      family_id IN (SELECT family_id FROM memberships         ║
// ║                    WHERE user_id = auth.uid())               ║
// ║    );                                                        ║
// ║  CREATE POLICY "use invite"                                  ║
// ║    ON invites FOR UPDATE USING (status = 'pending');         ║
// ║                                                              ║
// ║  3. Copy your Project URL and anon key from:                 ║
// ║     Settings → API → Project API keys                        ║
// ║     Paste them into SUPABASE_URL and SUPABASE_ANON_KEY below ║
// ║                                                              ║
// ║  4. In Auth → Settings, enable email/password sign-ins.      ║
// ╚══════════════════════════════════════════════════════════════╝

const SUPABASE_URL = "https://whjrsccqiqhzxxeqxqwi.supabase.co"; // ← replace
const SUPABASE_ANON_KEY = "sb_publishable_ScETMI7MwyhIvi5uxubc-A_PYLlMbcw"; // ← replace

const _supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper: fetch the family row + memberships for the signed-in user.
// Returns { user, family, memberships, users } or null on error.
async function loadUserSession(sbUser) {
  famLog("Loading session...");
  // Race the query against a 5s timeout so we never hang forever
  let memsResult;
  try {
    memsResult = await Promise.race([
      _supabaseClient.from("memberships").select("*").eq("user_id", sbUser.id),
      new Promise((_,reject) => setTimeout(()=>reject(new Error("Query timed out - check RLS policies")), 5000))
    ]);
  } catch(e) {
    famLog("Error: " + e.message);
    return null;
  }
  const { data: mems, error: memErr } = memsResult;
  if (memErr) { famLog("DB error: " + memErr.message + " code:" + memErr.code); return null; }
  if (!mems || !mems.length) { famLog("No membership found for this user"); return null; }
  famLog("Found family, loading data...");
  const familyId = mems[0].family_id;

  // 2. Get the family row
  const {
    data: fam,
    error: famErr
  } = await _supabaseClient.from("families").select("*").eq("id", familyId).single();
  if (famErr || !fam) return null;

  // 3. Get all memberships for this family (for CalendarLegend / member list)
  const {
    data: allMems
  } = await _supabaseClient.from("memberships").select("*").eq("family_id", familyId);

  // 4. Build a users array from the family data if available,
  //    supplemented by auth metadata for the current user.
  //    Note: Supabase doesn't expose other users' auth records from the
  //    client, so we derive names from data stored in the family blob or
  //    from user_metadata. A profiles table (created via a Supabase trigger)
  //    would give you richer data — see setup guide above.
  const storedUsers = fam.data?._users || [];
  const currentUserName = sbUser.user_metadata?.name || sbUser.email;

  // Merge: ensure current user is always in the list
  let users = storedUsers.filter(u => u.id !== sbUser.id);
  users.unshift({
    id: sbUser.id,
    email: sbUser.email,
    name: currentUserName
  });

  // 5. Build objects
  const family = {
    ...fam.data,
    id: fam.id,
    name: fam.name,
    owner_id: fam.owner_id,
    created_at: fam.created_at
  };
  const user = {
    id: sbUser.id,
    email: sbUser.email,
    name: currentUserName
  };
  return {
    user,
    family,
    memberships: allMems || mems,
    users
  };
}

// ── Design tokens ─────────────────────────────────────────────
const C = {
  bg: "#FAFAF7",
  sidebar: "#F0EDE6",
  border: "#E4DFD5",
  text: "#2C2A26",
  muted: "#8A8478",
  accent: "#E8734A",
  accentLight: "#FDF0EA",
  green: "#4A9B6F",
  blue: "#4A7BB5",
  red: "#C94F4F",
  yellow: "#D4A843"
};
const MEMBER_COLOURS = ["#E8734A", "#4A7BB5", "#4A9B6F", "#9B6FB5", "#B5904A", "#B54A6F"];

// ── Currency support ───────────────────────────────────────────
// family.currency is a key into this table. Defaults to "EUR".
const CURRENCIES = {
  EUR: {
    symbol: "€",
    code: "EUR",
    locale: "en-IE",
    label: "Euro (€)"
  },
  GBP: {
    symbol: "£",
    code: "GBP",
    locale: "en-GB",
    label: "British Pound (£)"
  },
  USD: {
    symbol: "$",
    code: "USD",
    locale: "en-US",
    label: "US Dollar ($)"
  },
  CAD: {
    symbol: "CA$",
    code: "CAD",
    locale: "en-CA",
    label: "Canadian Dollar (CA$)"
  },
  AUD: {
    symbol: "A$",
    code: "AUD",
    locale: "en-AU",
    label: "Australian Dollar (A$)"
  },
  NZD: {
    symbol: "NZ$",
    code: "NZD",
    locale: "en-NZ",
    label: "New Zealand Dollar (NZ$)"
  },
  CHF: {
    symbol: "CHF",
    code: "CHF",
    locale: "de-CH",
    label: "Swiss Franc (CHF)"
  },
  SEK: {
    symbol: "kr",
    code: "SEK",
    locale: "sv-SE",
    label: "Swedish Krona (kr)"
  },
  NOK: {
    symbol: "kr",
    code: "NOK",
    locale: "nb-NO",
    label: "Norwegian Krone (kr)"
  },
  DKK: {
    symbol: "kr",
    code: "DKK",
    locale: "da-DK",
    label: "Danish Krone (kr)"
  },
  PLN: {
    symbol: "zł",
    code: "PLN",
    locale: "pl-PL",
    label: "Polish Złoty (zł)"
  },
  CZK: {
    symbol: "Kč",
    code: "CZK",
    locale: "cs-CZ",
    label: "Czech Koruna (Kč)"
  },
  HUF: {
    symbol: "Ft",
    code: "HUF",
    locale: "hu-HU",
    label: "Hungarian Forint (Ft)"
  },
  BRL: {
    symbol: "R$",
    code: "BRL",
    locale: "pt-BR",
    label: "Brazilian Real (R$)"
  },
  MXN: {
    symbol: "$",
    code: "MXN",
    locale: "es-MX",
    label: "Mexican Peso ($)"
  },
  ZAR: {
    symbol: "R",
    code: "ZAR",
    locale: "en-ZA",
    label: "South African Rand (R)"
  },
  INR: {
    symbol: "₹",
    code: "INR",
    locale: "en-IN",
    label: "Indian Rupee (₹)"
  },
  SGD: {
    symbol: "S$",
    code: "SGD",
    locale: "en-SG",
    label: "Singapore Dollar (S$)"
  }
};

// Returns a formatter function for the family's chosen currency.
// Usage: const fmt$ = getCurrencyFormatter(family); fmt$(1234) → "€1,234"
function getCurrencyFormatter(family) {
  const key = family?.currency || "EUR";
  const cfg = CURRENCIES[key] || CURRENCIES.EUR;
  return n => {
    const num = Number(n || 0);
    // Use Intl if available, fall back to symbol-prefix
    try {
      return new Intl.NumberFormat(cfg.locale, {
        style: "currency",
        currency: cfg.code,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(num);
    } catch {
      return `${cfg.symbol}${num.toLocaleString()}`;
    }
  };
}

// ── Family context ─────────────────────────────────────────
// Provides family, updateFamily, user, memberships, users and
// navigation helpers to any descendant without prop drilling.
// AppShell is the single Provider; sections consume via useFamilyCtx().
const FamilyContext = createContext(null);
const useFamilyCtx = () => useContext(FamilyContext);

// ── Persistence ──────────────────────────────────────────────
// localStorage DB helpers replaced by Supabase.
// Stubs remain so any accidental call fails loudly in dev.
function loadDB() {
  console.warn("loadDB called — should use Supabase");
  return {
    users: [],
    families: [],
    memberships: [],
    invites: []
  };
}
function saveDB() {
  console.warn("saveDB called — should use Supabase");
}

// Persist the family data blob to Supabase.
async function saveFamilyToSupabase(familyId, data) {
  const {
    error
  } = await _supabaseClient.from("families").update({
    data
  }).eq("id", familyId);
  if (error) console.error("Supabase family save error:", error.message);
}
function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
const SEED_CHILDREN = [{
  id: "c1",
  name: "Mia",
  date_of_birth: "2020-03-15",
  avatar_colour: "#E8A87C",
  interests: ["dinosaurs", "drawing"],
  personality_traits: ["curious", "energetic"],
  likes: ["painting", "stories"],
  dislikes: ["loud noises"],
  notes: "Loves bedtime stories about animals."
}, {
  id: "c2",
  name: "Leo",
  date_of_birth: "2017-07-22",
  avatar_colour: "#7CB9E8",
  interests: ["football", "lego"],
  personality_traits: ["competitive", "funny"],
  likes: ["pizza", "video games"],
  dislikes: ["vegetables"],
  notes: "Great at maths for his age."
}, {
  id: "c3",
  name: "Nora",
  date_of_birth: "2022-11-01",
  avatar_colour: "#B5A7D4",
  interests: ["music", "cats"],
  personality_traits: ["shy", "sweet"],
  likes: ["soft toys", "songs"],
  dislikes: ["strangers"],
  notes: "Just starting to talk a lot more."
}];
const mkEvents = (ownerId, memberId) => [{
  id: uid(),
  title: "School run",
  start_time: new Date().toISOString(),
  event_type: "family",
  assignee: "both",
  created_by: ownerId,
  source: "manual"
}, {
  id: uid(),
  title: "Dentist – Leo",
  start_time: new Date(Date.now() + 86400000 * 2).toISOString(),
  event_type: "family",
  assignee: "parent",
  created_by: memberId || ownerId,
  source: "manual"
}, {
  id: uid(),
  title: "Parent-teacher meeting",
  start_time: new Date(Date.now() + 86400000 * 5).toISOString(),
  event_type: "family",
  assignee: "both",
  created_by: ownerId,
  source: "manual"
}, {
  id: uid(),
  title: "Date night",
  start_time: new Date(Date.now() + 86400000 * 7).toISOString(),
  event_type: "personal",
  assignee: "both",
  created_by: memberId || ownerId,
  source: "manual"
}, {
  id: uid(),
  title: "Nora's check-up",
  start_time: new Date(Date.now() + 86400000 * 10).toISOString(),
  event_type: "family",
  assignee: "parent",
  created_by: ownerId,
  source: "manual"
}];
const mkTasks = () => [{
  id: uid(),
  title: "Book birthday party venue",
  due_date: null,
  assignee: "family",
  priority: "high",
  status: "not_started"
}, {
  id: uid(),
  title: "Renew car insurance",
  due_date: "2026-05-15",
  assignee: "personal",
  priority: "medium",
  status: "in_progress"
}];
const mkGrocery = () => [{
  id: uid(),
  name: "Milk",
  quantity: "2",
  unit: "L",
  category: "dairy",
  checked: false,
  source: "manual",
  recipes: []
}, {
  id: uid(),
  name: "Chicken breast",
  quantity: "500",
  unit: "g",
  category: "meat",
  checked: false,
  source: "meal_plan",
  recipes: ["Chicken Stir Fry"]
}];
const mkPantry = () => [{
  id: uid(),
  name: "olive oil",
  inStock: true
}, {
  id: uid(),
  name: "salt",
  inStock: true
}, {
  id: uid(),
  name: "pepper",
  inStock: true
}, {
  id: uid(),
  name: "garlic cloves",
  inStock: true
}, {
  id: uid(),
  name: "butter",
  inStock: true
}];
function ageOf(dob) {
  const d = new Date(dob),
    n = new Date();
  let a = n.getFullYear() - d.getFullYear();
  if (n < new Date(n.getFullYear(), d.getMonth(), d.getDate())) a--;
  return a;
}
function fmt(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });
}
function fmtTime(date) {
  return new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function priorityColor(p) {
  return p === "high" ? C.red : p === "medium" ? C.yellow : C.green;
}
function memberColour(userId, memberships) {
  const mem = memberships.find(m => m.user_id === userId);
  return mem?.colour || C.muted;
}
function Badge({
  children,
  color = C.muted
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      background: color + "22",
      color,
      fontSize: 11,
      fontWeight: 600,
      padding: "2px 8px",
      borderRadius: 20
    }
  }, children);
}
function Card({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      padding: "16px 20px",
      ...style
    }
  }, children);
}
function Btn({
  children,
  onClick,
  variant = "primary",
  small = false,
  style = {},
  disabled = false
}) {
  const base = {
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    borderRadius: 8,
    fontWeight: 600,
    fontFamily: "inherit",
    fontSize: small ? 12 : 13,
    padding: small ? "5px 12px" : "9px 18px",
    opacity: disabled ? 0.5 : 1,
    transition: "opacity .15s"
  };
  const v = {
    primary: {
      background: C.accent,
      color: "#fff"
    },
    ghost: {
      background: "transparent",
      color: C.muted,
      border: `1px solid ${C.border}`
    },
    danger: {
      background: C.red + "22",
      color: C.red,
      border: `1px solid ${C.red}44`
    },
    green: {
      background: C.green,
      color: "#fff"
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled ? undefined : onClick,
    style: {
      ...base,
      ...v[variant],
      ...style
    }
  }, children);
}
function Inp({
  value,
  onChange,
  placeholder,
  type = "text",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    type: type,
    style: {
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 13,
      fontFamily: "inherit",
      outline: "none",
      width: "100%",
      background: "#fff",
      color: C.text,
      boxSizing: "border-box",
      ...style
    }
  });
}
function FieldGroup({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: .8,
      marginBottom: 6
    }
  }, label), children);
}
function ErrBox({
  msg
}) {
  if (!msg) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.red + "15",
      border: `1px solid ${C.red}44`,
      color: C.red,
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 13,
      marginBottom: 16
    }
  }, msg);
}
function ColourDot({
  colour,
  size = 10
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      width: size,
      height: size,
      borderRadius: "50%",
      background: colour,
      flexShrink: 0
    }
  });
}
function CalendarLegend({
  memberships,
  users
}) {
  if (!memberships.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 16
    }
  }, memberships.map(m => {
    const u = users.find(u => u.id === m.user_id);
    if (!u) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(ColourDot, {
      colour: m.colour,
      size: 10
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: C.text,
        fontWeight: 500
      }
    }, u.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, "(", u.email, ")"));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      width: "100%",
      marginTop: 2
    }
  }, "Each colour represents one family member's events.", /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.accent,
      fontWeight: 600
    }
  }, " Google Calendar sync coming soon.")));
}

// ── Auth ──────────────────────────────────────────────────────
function AuthScreen({
  onAuth
}) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit() {
    setErr("");
    setLoading(true);
    try {
      if (!email.trim() || !password.trim()) {
        setErr("Email and password required.");
        return;
      }
      if (mode === "register" && (!name.trim() || !familyName.trim())) {
        setErr("Please fill in all fields.");
        return;
      }
      if (mode === "register" && password.length < 6) {
        setErr("Password must be at least 6 characters.");
        return;
      }
      if (mode === "login") {
        // ── Supabase sign-in ──────────────────────────────────
        const {
          data: {
            session
          },
          error
        } = await _supabaseClient.auth.signInWithPassword({
          email: email.trim(),
          password
        });
        if (error) {
          setErr(error.message);
          return;
        }
        const result = await loadUserSession(session.user);
        if (!result) {
          setErr("Account exists but no family found. Contact support.");
          return;
        }
        onAuth(result);
      } else {
        // ── Supabase sign-up + create family ─────────────────
        const {
          data: {
            session
          },
          error
        } = await _supabaseClient.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              name: name.trim()
            }
          }
        });
        if (error) {
          setErr(error.message);
          return;
        }
        if (!session) {
          setErr("Check your email to confirm your account, then log in.");
          return;
        }
        const sbUser = session.user;

        // Build seed family data
        const seedData = {
          children: SEED_CHILDREN,
          events: mkEvents(sbUser.id, null),
          tasks: mkTasks(),
          grocery: mkGrocery(),
          notes: [],
          pantry: mkPantry()
        };

        // Insert family row
        const {
          data: famRow,
          error: famErr
        } = await _supabaseClient.from("families").insert({
          name: familyName.trim(),
          owner_id: sbUser.id,
          data: seedData
        }).select().single();
        if (famErr) {
          setErr("Could not create family: " + famErr.message);
          return;
        }

        // Insert membership
        const {
          data: mem,
          error: memErr
        } = await _supabaseClient.from("memberships").insert({
          user_id: sbUser.id,
          family_id: famRow.id,
          role: "admin",
          colour: MEMBER_COLOURS[0]
        }).select().single();
        if (memErr) {
          setErr("Could not create membership: " + memErr.message);
          return;
        }
        const family = {
          ...famRow.data,
          id: famRow.id,
          name: famRow.name,
          owner_id: famRow.owner_id,
          created_at: famRow.created_at
        };
        const user = {
          id: sbUser.id,
          email: sbUser.email,
          name: name.trim()
        };
        onAuth({
          user,
          family,
          memberships: [mem]
        });
      }
    } catch (e) {
      setErr("Unexpected error: " + e.message);
    } finally {
      setLoading(false);
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: C.bg,
      display: "flex",
      fontFamily: "Georgia, serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 400
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 52,
      fontWeight: 900,
      color: C.accent,
      letterSpacing: -3,
      lineHeight: 1
    }
  }, "Fam"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: C.muted,
      marginTop: 6
    }
  }, "Your family, organised together.")), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "32px 36px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 20,
      marginBottom: 6
    }
  }, mode === "login" ? "Welcome back" : "Create your family"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      marginBottom: 24
    }
  }, mode === "login" ? "Sign in to your family space." : "Set up your shared space in seconds."), mode === "register" && /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Your name"
  }, /*#__PURE__*/React.createElement(Inp, {
    value: name,
    onChange: setName,
    placeholder: "e.g. Sarah"
  })), /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Email address"
  }, /*#__PURE__*/React.createElement(Inp, {
    value: email,
    onChange: setEmail,
    placeholder: "you@email.com",
    type: "email"
  })), /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Password"
  }, /*#__PURE__*/React.createElement(Inp, {
    value: password,
    onChange: setPassword,
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
    type: "password"
  })), mode === "register" && /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Family name"
  }, /*#__PURE__*/React.createElement(Inp, {
    value: familyName,
    onChange: setFamilyName,
    placeholder: "e.g. \"The Murphys\""
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 5
    }
  }, "Names your shared space.")), /*#__PURE__*/React.createElement(ErrBox, {
    msg: err
  }), /*#__PURE__*/React.createElement(Btn, {
    onClick: submit,
    disabled: loading,
    style: {
      width: "100%",
      padding: "12px",
      fontSize: 15,
      marginBottom: 20
    }
  }, loading ? "Please wait…" : mode === "login" ? "Log in" : "Create family & sign up"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: 13,
      color: C.muted
    }
  }, mode === "login" ? /*#__PURE__*/React.createElement(React.Fragment, null, "No account? ", /*#__PURE__*/React.createElement("span", {
    onClick: () => {
      setMode("register");
      setErr("");
    },
    style: {
      color: C.accent,
      cursor: "pointer",
      fontWeight: 700
    }
  }, "Create your family \u2192")) : /*#__PURE__*/React.createElement(React.Fragment, null, "Have an account? ", /*#__PURE__*/React.createElement("span", {
    onClick: () => {
      setMode("login");
      setErr("");
    },
    style: {
      color: C.accent,
      cursor: "pointer",
      fontWeight: 700
    }
  }, "Log in")))), /*#__PURE__*/React.createElement(InviteJoin, {
    onAuth: onAuth
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 360,
      background: C.accentLight,
      borderLeft: `1px solid ${C.border}`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 48,
      gap: 20
    }
  }, [{
    emoji: "📅",
    text: "Colour-coded calendar per member"
  }, {
    emoji: "✅",
    text: "Shared & personal tasks"
  }, {
    emoji: "🛒",
    text: "Grocery list in real time"
  }, {
    emoji: "👧🏻",
    text: "A space for each child"
  }, {
    emoji: "🔗",
    text: "Invite your partner in one tap"
  }].map(f => /*#__PURE__*/React.createElement("div", {
    key: f.text,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22
    }
  }, f.emoji), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: C.text,
      fontWeight: 500
    }
  }, f.text)))));
}
function InviteJoin({
  onAuth
}) {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  async function join() {
    setErr("");
    setLoading(true);
    try {
      if (!token.trim() || !name.trim() || !email.trim() || !password.trim()) {
        setErr("All fields required.");
        return;
      }

      // Look up invite token in Supabase
      const {
        data: invite,
        error: invErr
      } = await _supabaseClient.from("invites").select("*").eq("token", token.trim().toUpperCase()).eq("status", "pending").single();
      if (invErr || !invite) {
        setErr("Invite code not found or already used.");
        return;
      }

      // Sign up via Supabase Auth
      const {
        data: {
          session
        },
        error: signErr
      } = await _supabaseClient.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim()
          }
        }
      });
      if (signErr) {
        setErr(signErr.message);
        return;
      }
      if (!session) {
        setErr("Check your email to confirm, then log in.");
        return;
      }
      const sbUser = session.user;

      // Count existing members to pick a colour
      const {
        data: existingMems
      } = await _supabaseClient.from("memberships").select("id").eq("family_id", invite.family_id);
      const colour = MEMBER_COLOURS[(existingMems?.length || 0) % MEMBER_COLOURS.length];

      // Insert membership
      const {
        error: memErr
      } = await _supabaseClient.from("memberships").insert({
        user_id: sbUser.id,
        family_id: invite.family_id,
        role: "member",
        colour,
        source: "invite"
      });
      if (memErr) {
        setErr("Could not join family: " + memErr.message);
        return;
      }

      // Mark invite as used
      await _supabaseClient.from("invites").update({
        status: "used"
      }).eq("id", invite.id);

      // Load session
      const result = await loadUserSession(sbUser);
      if (!result) {
        setErr("Joined but couldn't load family — try logging in.");
        return;
      }
      onAuth(result);
    } catch (e) {
      setErr("Unexpected error: " + e.message);
    } finally {
      setLoading(false);
    }
  }
  if (!open) return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(true),
    style: {
      fontSize: 13,
      color: C.muted,
      cursor: "pointer",
      textDecoration: "underline"
    }
  }, "Have an invite code? Join a family \u2192"));
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      marginTop: 16,
      padding: "24px 28px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginBottom: 16,
      fontSize: 16
    }
  }, "Join a family space"), /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Invite code"
  }, /*#__PURE__*/React.createElement(Inp, {
    value: token,
    onChange: setToken,
    placeholder: "e.g. FAM-ABC123"
  })), /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Your name"
  }, /*#__PURE__*/React.createElement(Inp, {
    value: name,
    onChange: setName,
    placeholder: "e.g. James"
  })), /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Email"
  }, /*#__PURE__*/React.createElement(Inp, {
    value: email,
    onChange: setEmail,
    placeholder: "you@email.com",
    type: "email"
  })), /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Password"
  }, /*#__PURE__*/React.createElement(Inp, {
    value: password,
    onChange: setPassword,
    placeholder: "Min 6 characters",
    type: "password"
  })), /*#__PURE__*/React.createElement(ErrBox, {
    msg: err
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    onClick: join,
    disabled: loading
  }, loading ? "Joining…" : "Join family"), /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    onClick: () => setOpen(false)
  }, "Cancel")));
}

// ── Family Settings ───────────────────────────────────────────
// ── Google Calendar integration ───────────────────────────────
// All Google Calendar API calls go through the Supabase Edge Function.

const GCAL_FUNCTION_URL = "https://whjrsccqiqhzxxeqxqwi.supabase.co/functions/v1/google-calendar-auth";

// Helper: call the Edge Function with the user's auth token
async function gcalCall(action, method = "GET", body = null) {
  const {
    data: {
      session
    }
  } = await _supabaseClient.auth.getSession();
  if (!session) throw new Error("Not authenticated");
  const url = `${GCAL_FUNCTION_URL}?action=${action}`;
  const opts = {
    method,
    headers: {
      "Authorization": `Bearer ${session.access_token}`,
      "Content-Type": "application/json"
    }
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  return res.json();
}

// Hook: manages Google Calendar connection state and sync
function useGoogleCalendar() {
  const {
    family,
    updateFamily,
    user
  } = useFamilyCtx();
  const [connected, setConnected] = useState(false);
  const [gcalEmail, setGcalEmail] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);
  const [syncError, setSyncError] = useState(null);

  // Check connection status on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await gcalCall("status");
        setConnected(res.connected);
        setGcalEmail(res.email);
      } catch (e) {
        // Not connected or error — that's fine
      }
    })();
  }, []);

  // Listen for the OAuth popup completing
  useEffect(() => {
    function handleMessage(e) {
      if (e.data?.type === "GOOGLE_CALENDAR_CONNECTED") {
        setConnected(true);
        setGcalEmail(e.data.email);
        syncNow();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Open the Google OAuth popup
  async function connect() {
    try {
      const res = await gcalCall("auth-url");
      if (res.url) {
        window.open(res.url, "gcal-auth", "width=500,height=600,left=200,top=100");
      }
    } catch (e) {
      setSyncError("Could not start Google sign-in: " + e.message);
    }
  }

  // Disconnect
  async function disconnect() {
    try {
      await gcalCall("disconnect", "POST");
      setConnected(false);
      setGcalEmail(null);
      // Remove Google-sourced events from family
      const filtered = (family.events || []).filter(e => e.source !== "google");
      updateFamily({
        events: filtered
      });
    } catch (e) {
      setSyncError("Could not disconnect: " + e.message);
    }
  }

  // Pull events from Google Calendar and merge into family events
  async function syncNow() {
    setSyncing(true);
    setSyncError(null);
    try {
      const res = await gcalCall("events");
      if (res.error) {
        setSyncError(res.error);
        return;
      }
      const googleEvents = (res.events || []).map(e => ({
        id: "gcal_" + e.google_id,
        google_id: e.google_id,
        title: e.title,
        start_time: e.start_time,
        end_time: e.end_time,
        event_type: "google",
        assignee: "both",
        created_by: user.id,
        source: "google",
        all_day: e.all_day
      }));

      // Merge: keep manual events, replace all google-sourced ones
      const manualEvents = (family.events || []).filter(e => e.source !== "google");
      updateFamily({
        events: [...manualEvents, ...googleEvents]
      });
      setLastSynced(new Date());
    } catch (e) {
      setSyncError("Sync failed: " + e.message);
    } finally {
      setSyncing(false);
    }
  }

  // Push a new Fam event to Google Calendar
  async function pushEventToGoogle(event) {
    if (!connected) return null;
    try {
      // Build a proper end time if not set (default 1 hour)
      const start = new Date(event.start_time);
      const end = event.end_time ? new Date(event.end_time) : new Date(start.getTime() + 60 * 60 * 1000);
      const res = await gcalCall("create-event", "POST", {
        title: event.title,
        start: start.toISOString(),
        end: end.toISOString(),
        description: event.description || ""
      });
      return res.google_id || null;
    } catch (e) {
      console.error("Could not push event to Google:", e);
      return null;
    }
  }

  // Delete an event from Google Calendar
  async function deleteEventFromGoogle(googleId) {
    if (!connected || !googleId) return;
    try {
      await gcalCall("delete-event", "POST", {
        google_id: googleId
      });
    } catch (e) {
      console.error("Could not delete from Google:", e);
    }
  }
  return {
    connected,
    gcalEmail,
    syncing,
    lastSynced,
    syncError,
    connect,
    disconnect,
    syncNow,
    pushEventToGoogle,
    deleteEventFromGoogle
  };
}
function FamilySettings({
  family,
  user,
  memberships,
  users,
  onClose,
  onLogout,
  updateFamily
}) {
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    // Load any existing pending invite token from Supabase
    (async () => {
      const {
        data
      } = await _supabaseClient.from("invites").select("token").eq("family_id", family.id).eq("status", "pending").eq("created_by", user.id).order("created_at", {
        ascending: false
      }).limit(1).single();
      if (data?.token) setCode(data.token);
    })();
  }, []);
  async function generateCode() {
    const token = "FAM-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const {
      error
    } = await _supabaseClient.from("invites").insert({
      family_id: family.id,
      token,
      created_by: user.id,
      status: "pending"
    });
    if (!error) setCode(token);else console.error("Could not create invite:", error.message);
  }
  function copy() {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 200
    },
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: 32,
      width: 500,
      maxWidth: "92vw",
      maxHeight: "88vh",
      overflowY: "auto",
      boxShadow: "0 28px 70px rgba(0,0,0,0.22)",
      fontFamily: "Georgia, serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 900,
      fontSize: 22
    }
  }, family.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 2
    }
  }, "Family settings")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      background: "none",
      border: "none",
      fontSize: 24,
      cursor: "pointer",
      color: C.muted
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 14
    }
  }, "Members & calendar colours"), memberships.map(m => {
    const u = users.find(u => u.id === m.user_id);
    if (!u) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 0",
        borderBottom: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: m.colour,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: 15,
        color: "#fff",
        flexShrink: 0
      }
    }, u.name[0]), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 13,
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, u.name, " ", u.id === user.id && /*#__PURE__*/React.createElement(Badge, {
      color: C.accent
    }, "you")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, u.email)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(ColourDot, {
      colour: m.colour,
      size: 12
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, "calendar colour")), /*#__PURE__*/React.createElement(Badge, {
      color: m.role === "admin" ? C.green : C.muted
    }, m.role));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 10
    }
  }, "Invite someone"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      marginBottom: 14
    }
  }, "Generate a one-time code. They'll enter it at \"Join a family\" on the sign-up screen."), code ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.accentLight,
      border: `1px solid ${C.accent}44`,
      borderRadius: 10,
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginBottom: 8
    }
  }, "One-time invite code"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 900,
      fontSize: 22,
      letterSpacing: 3,
      color: C.accent,
      flex: 1
    }
  }, code), /*#__PURE__*/React.createElement(Btn, {
    onClick: copy,
    small: true,
    variant: "ghost"
  }, copied ? "✓ Copied" : "Copy"))) : /*#__PURE__*/React.createElement(Btn, {
    onClick: generateCode,
    variant: "green"
  }, "Generate invite code")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: C.bg,
      borderRadius: 10,
      padding: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 4
    }
  }, "Signed in as"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 14
    }
  }, user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, user.email)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 10
    }
  }, "Currency"), /*#__PURE__*/React.createElement("select", {
    value: family.currency || "EUR",
    onChange: e => {
      updateFamily({
        currency: e.target.value
      });
    },
    style: {
      border: `1px solid ${C.border}`,
      borderRadius: 9,
      padding: "9px 12px",
      fontSize: 13,
      fontFamily: "inherit",
      width: "100%",
      background: "#fff",
      color: C.text,
      boxSizing: "border-box"
    }
  }, Object.entries(CURRENCIES).map(([k, v]) => /*#__PURE__*/React.createElement("option", {
    key: k,
    value: k
  }, v.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 6
    }
  }, "Updates all money displays across the app instantly.")), /*#__PURE__*/React.createElement(GoogleCalendarSettings, null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 10
    }
  }, "Export & Print"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => exportFamilyData(family),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 16px",
      borderRadius: 9,
      border: `1px solid ${C.border}`,
      background: "#fff",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "inherit",
      color: C.text
    }
  }, "\uD83D\uDCBE Download backup (JSON)"), /*#__PURE__*/React.createElement("button", {
    onClick: () => printGroceryList(family.grocery || []),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 16px",
      borderRadius: 9,
      border: `1px solid ${C.border}`,
      background: "#fff",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "inherit",
      color: C.text
    }
  }, "\uD83D\uDDA8\uFE0F Print grocery list")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 8,
      lineHeight: 1.6
    }
  }, "Backup saves all family data as a JSON file. No data is sent to any server.")), /*#__PURE__*/React.createElement(Btn, {
    onClick: onLogout,
    variant: "danger",
    style: {
      width: "100%"
    }
  }, "Log out")));
}

// ── Calendar ──────────────────────────────────────────────────
// ── Google Calendar settings panel ───────────────────────────
// Shown inside FamilySettings — lets user connect / disconnect
// their Google Calendar and trigger a manual sync.

function GoogleCalendarSettings() {
  const {
    user
  } = useFamilyCtx();
  const {
    connected,
    gcalEmail,
    syncing,
    lastSynced,
    syncError,
    connect,
    disconnect,
    syncNow
  } = useGoogleCalendar();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 12
    }
  }, "Google Calendar"), !connected ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F8F7F4",
      borderRadius: 12,
      padding: 16,
      border: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      marginBottom: 12,
      lineHeight: 1.6
    }
  }, "Connect your Google Calendar to see all your events in Fam, and have Fam events appear in Google automatically."), /*#__PURE__*/React.createElement("button", {
    onClick: connect,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 18px",
      borderRadius: 10,
      border: `1.5px solid ${C.border}`,
      background: "#fff",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 13,
      fontWeight: 700,
      color: C.text,
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
    fill: "#4285F4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
    fill: "#34A853"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
    fill: "#FBBC05"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
    fill: "#EA4335"
  })), "Connect Google Calendar")) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F0FBF4",
      borderRadius: 12,
      padding: 16,
      border: `1px solid ${C.green}33`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: C.green,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 13,
      color: C.text
    }
  }, "Connected as ", gcalEmail), lastSynced && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 1
    }
  }, "Last synced: ", lastSynced.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  })))), syncError && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.red,
      marginBottom: 10,
      padding: "6px 10px",
      background: C.red + "10",
      borderRadius: 6
    }
  }, syncError), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: syncNow,
    disabled: syncing,
    style: {
      padding: "7px 14px",
      borderRadius: 8,
      border: "none",
      background: C.green,
      color: "#fff",
      cursor: syncing ? "wait" : "pointer",
      fontFamily: "inherit",
      fontSize: 12,
      fontWeight: 700,
      opacity: syncing ? 0.7 : 1
    }
  }, syncing ? "Syncing…" : "↻ Sync now"), /*#__PURE__*/React.createElement("button", {
    onClick: disconnect,
    style: {
      padding: "7px 14px",
      borderRadius: 8,
      border: `1px solid ${C.border}`,
      background: "#fff",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 12,
      fontWeight: 600,
      color: C.muted
    }
  }, "Disconnect"))));
}
function CalendarSection({
  selectedDay,
  setSelectedDay
}) {
  const {
    family,
    updateFamily,
    memberships,
    users,
    user: currentUser
  } = useFamilyCtx();
  const events = family.events || [];
  const tasks = (family.tasks || []).filter(t => t.due_date && t.status !== "done");
  const [calView, setCalView] = useState(selectedDay ? "day" : "month");
  const [showModal, setShowModal] = useState(false);
  const [eventDetail, setEventDetail] = useState(null);
  const [form, setForm] = useState({
    title: "",
    start_time: "",
    event_type: "family",
    assignee: "both"
  });
  const today = new Date();
  const [year, setYear] = useState(selectedDay ? selectedDay.getFullYear() : today.getFullYear());
  const [month, setMonth] = useState(selectedDay ? selectedDay.getMonth() : today.getMonth());

  // Google Calendar integration
  const {
    connected,
    syncing,
    syncNow,
    pushEventToGoogle,
    deleteEventFromGoogle
  } = useGoogleCalendar();
  // Confirm dialog for deletions
  const {
    confirmDialog,
    requestConfirm
  } = useConfirm();
  useEffect(() => {
    if (selectedDay) {
      setCalView("day");
      setYear(selectedDay.getFullYear());
      setMonth(selectedDay.getMonth());
    }
  }, [selectedDay]);

  // Auto-sync Google Calendar when section first opens (if connected)
  useEffect(() => {
    if (connected) syncNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);
  const dim = new Date(year, month + 1, 0).getDate();
  const fd = new Date(year, month, 1).getDay();
  const cells = [];
  for (let i = 0; i < fd; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(d);
  const mevs = events.filter(e => {
    const d = new Date(e.start_time);
    return d.getFullYear() === year && d.getMonth() === month;
  });
  async function addEvent() {
    if (!form.title || !form.start_time) return;
    const newEvent = {
      ...form,
      id: uid(),
      created_by: currentUser.id,
      source: "manual"
    };

    // Push to Google Calendar if connected, store the google_id back
    if (connected) {
      const googleId = await pushEventToGoogle(newEvent);
      if (googleId) newEvent.google_id = googleId;
    }
    updateFamily({
      events: [...events, newEvent]
    });
    setShowModal(false);
    setForm({
      title: "",
      start_time: "",
      event_type: "family",
      assignee: "both"
    });
  }
  function openDay(date) {
    setSelectedDay(date);
    setCalView("day");
  }
  function backToMonth() {
    setCalView("month");
    setSelectedDay(null);
  }
  const upcoming = [...events].sort((a, b) => new Date(a.start_time) - new Date(b.start_time)).filter(e => new Date(e.start_time) >= new Date(today.toDateString()));
  const dayEvents = selectedDay ? events.filter(e => new Date(e.start_time).toDateString() === selectedDay.toDateString()).sort((a, b) => new Date(a.start_time) - new Date(b.start_time)) : [];
  const dayTasksDue = selectedDay ? tasks.filter(t => t.due_date === selectedDay.toISOString().split("T")[0]) : [];
  function prevDay() {
    const d = new Date(selectedDay);
    d.setDate(d.getDate() - 1);
    setSelectedDay(d);
  }
  function nextDay() {
    const d = new Date(selectedDay);
    d.setDate(d.getDate() + 1);
    setSelectedDay(d);
  }
  const STATUS_COLOR = {
    not_started: C.muted,
    in_progress: C.blue,
    done: C.green
  };
  const STATUS_LABEL = {
    not_started: "Not started",
    in_progress: "In progress",
    done: "Done"
  };
  const DayView = () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    small: true,
    onClick: backToMonth
  }, "\u2190 Month"), /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    small: true,
    onClick: prevDay
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      fontSize: 18,
      flex: 1
    }
  }, selectedDay.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  })), /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    small: true,
    onClick: nextDay
  }, "\u203A"), /*#__PURE__*/React.createElement(Btn, {
    onClick: () => {
      const iso = selectedDay.toISOString().split("T")[0] + "T09:00";
      setForm(f => ({
        ...f,
        start_time: iso
      }));
      setShowModal(true);
    }
  }, "+ Add event")), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, dayEvents.length === 0 && dayTasksDue.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "40px 24px",
      textAlign: "center",
      color: C.muted,
      fontSize: 14
    }
  }, "No events on this day.", /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    small: true,
    onClick: () => {
      const iso = selectedDay.toISOString().split("T")[0] + "T09:00";
      setForm(f => ({
        ...f,
        start_time: iso
      }));
      setShowModal(true);
    }
  }, "+ Add one"))), dayEvents.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 8px"
    }
  }, dayEvents.map((e, idx) => {
    const colour = memberColour(e.created_by, memberships);
    const creator = users.find(u => u.id === e.created_by);
    return /*#__PURE__*/React.createElement("div", {
      key: e.id,
      onClick: () => setEventDetail(e),
      style: {
        display: "flex",
        alignItems: "stretch",
        gap: 0,
        borderBottom: idx < dayEvents.length - 1 ? `1px solid ${C.border}` : "none",
        cursor: "pointer"
      },
      onMouseEnter: ev => ev.currentTarget.style.background = colour + "0D",
      onMouseLeave: ev => ev.currentTarget.style.background = "transparent"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 64,
        padding: "16px 12px",
        textAlign: "right",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: C.muted
      }
    }, fmtTime(e.start_time))), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 4,
        background: colour,
        flexShrink: 0,
        margin: "8px 0"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        padding: "14px 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        marginBottom: 4
      }
    }, e.title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(ColourDot, {
      colour: colour,
      size: 8
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: C.muted
      }
    }, creator?.name || "Unknown"), e.source === "google" ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        padding: "1px 6px",
        borderRadius: 8,
        background: "#EAF3FF",
        color: "#4285F4",
        fontWeight: 700
      }
    }, "Google") : /*#__PURE__*/React.createElement(Badge, {
      color: e.event_type === "family" ? C.green : C.blue
    }, e.event_type))));
  }))), dayTasksDue.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 10
    }
  }, "Tasks due"), dayTasksDue.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 14px",
      borderRadius: 10,
      marginBottom: 6,
      background: "#fff",
      border: `1.5px solid ${priorityColor(t.priority)}44`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 4,
      height: 32,
      borderRadius: 2,
      background: priorityColor(t.priority),
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 13
    }
  }, t.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    color: priorityColor(t.priority)
  }, t.priority), /*#__PURE__*/React.createElement(Badge, {
    color: STATUS_COLOR[t.status]
  }, STATUS_LABEL[t.status])))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 10
    }
  }, "This week"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, Array.from({
    length: 7
  }, (_, i) => {
    const base = new Date(selectedDay);
    base.setDate(selectedDay.getDate() - selectedDay.getDay() + i + 1);
    const isThis = base.toDateString() === selectedDay.toDateString();
    const hasDayEvs = events.some(e => new Date(e.start_time).toDateString() === base.toDateString());
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => openDay(base),
      style: {
        padding: "6px 10px",
        borderRadius: 8,
        border: `1.5px solid ${isThis ? C.accent : C.border}`,
        background: isThis ? C.accentLight : "#fff",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 12,
        fontWeight: isThis ? 800 : 400,
        color: isThis ? C.accent : C.text,
        position: "relative"
      }
    }, base.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric"
    }), hasDayEvs && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        width: 4,
        height: 4,
        borderRadius: "50%",
        background: isThis ? C.accent : C.muted,
        verticalAlign: "middle",
        marginLeft: 4
      }
    }));
  }))));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 900
    }
  }, "Calendar"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, connected && /*#__PURE__*/React.createElement("button", {
    onClick: syncNow,
    disabled: syncing,
    title: "Sync Google Calendar",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      padding: "5px 12px",
      borderRadius: 8,
      border: `1px solid ${C.green}44`,
      background: C.green + "12",
      cursor: syncing ? "wait" : "pointer",
      fontFamily: "inherit",
      fontSize: 12,
      fontWeight: 600,
      color: C.green
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
    fill: "#4285F4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
    fill: "#34A853"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
    fill: "#FBBC05"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
    fill: "#EA4335"
  })), syncing ? "Syncing…" : "Google"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3,
      background: "#EDEAE2",
      padding: 3,
      borderRadius: 8
    }
  }, [{
    id: "month",
    label: "Month"
  }, {
    id: "day",
    label: "Day"
  }].map(v => /*#__PURE__*/React.createElement("button", {
    key: v.id,
    onClick: () => {
      setCalView(v.id);
      if (v.id === "day" && !selectedDay) setSelectedDay(new Date());
    },
    style: {
      padding: "5px 12px",
      borderRadius: 6,
      border: "none",
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 12,
      fontWeight: calView === v.id ? 700 : 400,
      background: calView === v.id ? "#fff" : "transparent",
      color: calView === v.id ? C.text : C.muted,
      boxShadow: calView === v.id ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
      transition: "all .15s"
    }
  }, v.label))), /*#__PURE__*/React.createElement(Btn, {
    onClick: () => setShowModal(true)
  }, "+ New Event"))), /*#__PURE__*/React.createElement(CalendarLegend, {
    memberships: memberships,
    users: users
  }), calView === "day" && selectedDay && /*#__PURE__*/React.createElement(DayView, null), calView === "month" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    small: true,
    onClick: () => {
      if (month === 0) {
        setMonth(11);
        setYear(y => y - 1);
      } else setMonth(m => m - 1);
    },
    "aria-label": "Previous month"
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 16,
      flex: 1,
      textAlign: "center"
    }
  }, new Date(year, month).toLocaleString("default", {
    month: "long"
  }), " ", year), /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    small: true,
    onClick: () => {
      if (month === 11) {
        setMonth(0);
        setYear(y => y + 1);
      } else setMonth(m => m + 1);
    },
    "aria-label": "Next month"
  }, "\u203A")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 3
    }
  }, ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      textAlign: "center",
      fontSize: 10,
      fontWeight: 700,
      color: C.muted,
      paddingBottom: 6
    }
  }, d)), cells.map((d, i) => {
    const dayEvs = d ? mevs.filter(e => new Date(e.start_time).getDate() === d) : [];
    const dayTasks = d ? tasks.filter(t => {
      const td = new Date(year, month, d).toISOString().split("T")[0];
      return t.due_date === td;
    }) : [];
    const isTod = d && d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    const cellDate = d ? new Date(year, month, d) : null;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        minHeight: 58,
        borderRadius: 8,
        background: isTod ? C.accentLight : d ? "#fafaf7" : "transparent",
        border: isTod ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
        padding: 3,
        cursor: d ? "pointer" : "default"
      },
      onClick: () => d && openDay(cellDate),
      onMouseEnter: e => {
        if (d) e.currentTarget.style.borderColor = C.accent;
      },
      onMouseLeave: e => {
        if (d) e.currentTarget.style.borderColor = isTod ? C.accent : C.border;
      }
    }, d && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: isTod ? 800 : 400,
        color: isTod ? C.accent : C.text,
        marginBottom: 2
      }
    }, d), dayEvs.map(e => {
      const colour = memberColour(e.created_by, memberships);
      return /*#__PURE__*/React.createElement("div", {
        key: e.id,
        title: e.title,
        style: {
          fontSize: 9,
          background: colour,
          color: "#fff",
          borderRadius: 4,
          padding: "1px 4px",
          marginBottom: 2,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis"
        },
        onClick: ev => {
          ev.stopPropagation();
          setEventDetail(e);
        }
      }, e.title);
    }), dayTasks.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        marginTop: 1
      }
    }, dayTasks.slice(0, 2).map(t => /*#__PURE__*/React.createElement("div", {
      key: t.id,
      title: `Task: ${t.title}`,
      style: {
        fontSize: 8,
        background: priorityColor(t.priority) + "33",
        color: priorityColor(t.priority),
        borderRadius: 3,
        padding: "1px 4px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        maxWidth: "100%",
        border: `1px solid ${priorityColor(t.priority)}44`
      }
    }, "\u2713 ", t.title))));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      marginBottom: 12
    }
  }, "Upcoming"), upcoming.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 13
    }
  }, "No upcoming events."), upcoming.slice(0, 8).map(e => {
    const colour = memberColour(e.created_by, memberships);
    const creator = users.find(u => u.id === e.created_by);
    return /*#__PURE__*/React.createElement("div", {
      key: e.id,
      onClick: () => {
        openDay(new Date(e.start_time));
      },
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 10,
        marginBottom: 6,
        background: "#fff",
        border: `1px solid ${C.border}`,
        cursor: "pointer",
        transition: "border-color .15s"
      },
      onMouseEnter: ev => ev.currentTarget.style.borderColor = colour,
      onMouseLeave: ev => ev.currentTarget.style.borderColor = C.border
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 4,
        height: 36,
        borderRadius: 2,
        background: colour,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 13
      }
    }, e.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, fmt(e.start_time), " \xB7 ", fmtTime(e.start_time))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(ColourDot, {
      colour: colour,
      size: 8
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, creator?.name || "Unknown")), /*#__PURE__*/React.createElement(Badge, {
      color: e.event_type === "family" ? C.green : C.blue
    }, e.event_type));
  }))), eventDetail && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100
    },
    onClick: () => setEventDetail(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: 28,
      width: 380,
      maxWidth: "90vw",
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
    },
    onClick: e => e.stopPropagation()
  }, (() => {
    const colour = memberColour(eventDetail.created_by, memberships);
    const creator = users.find(u => u.id === eventDetail.created_by);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 4,
        background: colour,
        borderRadius: "2px 2px 0 0",
        margin: "-28px -28px 20px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 18,
        marginBottom: 8
      }
    }, eventDetail.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.muted,
        marginBottom: 4
      }
    }, fmt(eventDetail.start_time), " at ", fmtTime(eventDetail.start_time)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(ColourDot, {
      colour: colour,
      size: 10
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: C.text
      }
    }, "Added by ", /*#__PURE__*/React.createElement("strong", null, creator?.name || "Unknown"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        marginBottom: 20
      }
    }, eventDetail.source === "google" ? /*#__PURE__*/React.createElement(Badge, {
      color: "#4285F4"
    }, "Google") : /*#__PURE__*/React.createElement(Badge, {
      color: eventDetail.event_type === "family" ? C.green : C.blue
    }, eventDetail.event_type)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: () => setEventDetail(null),
      style: {
        flex: 1
      }
    }, "Close"), /*#__PURE__*/React.createElement(Btn, {
      onClick: async () => {
        const ok = await requestConfirm({
          message: `Delete "${eventDetail.title}"?`,
          detail: eventDetail.source === "google" ? "This will remove it from Fam and from your Google Calendar." : "This will remove it from the family calendar.",
          confirmLabel: "Delete"
        });
        if (!ok) return;
        if (eventDetail.source === "google" && eventDetail.google_id) {
          await deleteEventFromGoogle(eventDetail.google_id);
        }
        updateFamily({
          events: (family.events || []).filter(e => e.id !== eventDetail.id)
        });
        setEventDetail(null);
      },
      style: {
        flex: 1,
        background: C.red,
        color: "#fff",
        border: "none"
      }
    }, "Delete")));
  })())), confirmDialog, showModal && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: 28,
      width: 400,
      maxWidth: "90vw",
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 18,
      marginBottom: 4
    }
  }, "New Event"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(ColourDot, {
    colour: memberColour(currentUser.id, memberships),
    size: 8
  }), "Will appear in your colour"), /*#__PURE__*/React.createElement(Inp, {
    value: form.title,
    onChange: v => setForm(f => ({
      ...f,
      title: v
    })),
    placeholder: "Event title",
    style: {
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "datetime-local",
    value: form.start_time,
    onChange: e => setForm(f => ({
      ...f,
      start_time: e.target.value
    })),
    style: {
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 13,
      fontFamily: "inherit",
      width: "100%",
      marginBottom: 10,
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("select", {
    value: form.event_type,
    onChange: e => setForm(f => ({
      ...f,
      event_type: e.target.value
    })),
    style: {
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 13,
      fontFamily: "inherit",
      width: "100%",
      marginBottom: 10,
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "family"
  }, "Family"), /*#__PURE__*/React.createElement("option", {
    value: "personal"
  }, "Personal")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    onClick: addEvent
  }, "Save"), /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    onClick: () => setShowModal(false)
  }, "Cancel")))));
}

// ── Home ──────────────────────────────────────────────────────
function Home() {
  const {
    family,
    user,
    memberships,
    users,
    setSection
  } = useFamilyCtx();
  const tasks = family.tasks || [];
  const events = family.events || [];
  const grocery = family.grocery || [];
  const today = new Date().toISOString().split("T")[0];
  const upcoming = [...events].sort((a, b) => new Date(a.start_time) - new Date(b.start_time)).filter(e => new Date(e.start_time) >= new Date(today)).slice(0, 4);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 24,
      fontWeight: 900
    }
  }, "Hey ", user.name.split(" ")[0], " \uD83D\uDC4B"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      marginTop: 4
    }
  }, family.name)), /*#__PURE__*/React.createElement(TodayDigest, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
      gap: 12,
      marginBottom: 24
    }
  }, [{
    label: "Tasks due today",
    value: tasks.filter(t => t.due_date === today && t.status !== "done").length,
    color: C.accent
  }, {
    label: "Overdue",
    value: tasks.filter(t => t.due_date && t.due_date < today && t.status !== "done").length,
    color: C.red
  }, {
    label: "Grocery items left",
    value: grocery.filter(g => !g.checked).length,
    color: C.blue
  }, {
    label: "Upcoming events",
    value: upcoming.length,
    color: C.green
  }].map(s => /*#__PURE__*/React.createElement(Card, {
    key: s.label,
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      fontWeight: 900,
      color: s.color
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted,
      marginTop: 4
    }
  }, s.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginBottom: 12
    }
  }, "Children"), (family.children || []).map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "50%",
      background: c.avatar_colour,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      color: "#fff",
      fontSize: 14
    }
  }, c.name[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 13
    }
  }, c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, "Age ", ageOf(c.date_of_birth)))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginBottom: 12
    }
  }, "Upcoming events"), upcoming.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 13
    }
  }, "No upcoming events."), upcoming.map(e => {
    const colour = memberColour(e.created_by, memberships);
    const creator = users.find(u => u.id === e.created_by);
    return /*#__PURE__*/React.createElement("div", {
      key: e.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement(ColourDot, {
      colour: colour,
      size: 8
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 13
      }
    }, e.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, fmt(e.start_time), " \xB7 ", creator?.name)));
  }))));
}

// ── To-Do ─────────────────────────────────────────────────────
const TAB_ASSIGNEES = {
  family: "family",
  parent1: "parent1",
  parent2: "parent2"
};
const TAB_LABELS = {
  family: "Family",
  parent1: "Parent 1",
  parent2: "Parent 2"
};
const STATUS_CYCLE = {
  not_started: "in_progress",
  in_progress: "done",
  done: "not_started"
};
const STATUS_LABEL = {
  not_started: "Not started",
  in_progress: "In progress",
  done: "Done"
};
const STATUS_COLOR = {
  not_started: C.muted,
  in_progress: C.blue,
  done: C.green
};
const PRIORITY_CYCLE = {
  low: "medium",
  medium: "high",
  high: "low"
};
function Todos() {
  const {
    family,
    updateFamily
  } = useFamilyCtx();
  const allTasks = family.tasks || [];
  const today = new Date().toISOString().split("T")[0];
  const [tab, setTab] = useState("family");
  const [filter, setFilter] = useState("all");
  const [quickTitle, setQuickTitle] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const emptyForm = {
    title: "",
    due_date: "",
    assignee: tab,
    priority: "medium",
    status: "not_started",
    recurrence: ""
  };
  const [form, setForm] = useState(emptyForm);
  const {
    confirmDialog,
    requestConfirm
  } = useConfirm();
  const tabTasks = allTasks.filter(t => t.assignee === TAB_ASSIGNEES[tab]);
  function applyFilter(list) {
    if (filter === "today") return list.filter(t => t.due_date === today);
    if (filter === "overdue") return list.filter(t => t.due_date && t.due_date < today && t.status !== "done");
    return list;
  }
  const active = applyFilter(tabTasks.filter(t => t.status !== "done"));
  const done = tabTasks.filter(t => t.status === "done");
  function saveTasks(next) {
    updateFamily({
      tasks: next
    });
  }
  function quickAdd(e) {
    if (e.key !== "Enter" || !quickTitle.trim()) return;
    saveTasks([...allTasks, {
      id: uid(),
      title: quickTitle.trim(),
      due_date: null,
      assignee: TAB_ASSIGNEES[tab],
      priority: "medium",
      status: "not_started",
      sort_order: allTasks.length
    }]);
    setQuickTitle("");
  }
  function saveForm() {
    if (!form.title.trim()) return;
    if (editTask) {
      saveTasks(allTasks.map(t => t.id === editTask.id ? {
        ...t,
        ...form,
        due_date: form.due_date || null
      } : t));
    } else {
      saveTasks([...allTasks, {
        id: uid(),
        ...form,
        due_date: form.due_date || null,
        sort_order: allTasks.length
      }]);
    }
    setShowForm(false);
    setEditTask(null);
    setForm(emptyForm);
  }
  function openNew() {
    setEditTask(null);
    setForm({
      ...emptyForm,
      assignee: TAB_ASSIGNEES[tab]
    });
    setShowForm(true);
  }
  function openEdit(t) {
    setEditTask(t);
    setForm({
      title: t.title,
      due_date: t.due_date || "",
      assignee: t.assignee,
      priority: t.priority,
      status: t.status,
      recurrence: t.recurrence || ""
    });
    setShowForm(true);
  }
  function toggleDone(id) {
    saveTasks(allTasks.map(t => t.id === id ? {
      ...t,
      status: t.status === "done" ? "not_started" : "done"
    } : t));
  }
  function cycleStatus(id) {
    saveTasks(allTasks.map(t => t.id === id ? {
      ...t,
      status: STATUS_CYCLE[t.status]
    } : t));
  }
  function cyclePriority(id) {
    saveTasks(allTasks.map(t => t.id === id ? {
      ...t,
      priority: PRIORITY_CYCLE[t.priority]
    } : t));
  }
  async function deleteTask(id) {
    const title = allTasks.find(t => t.id === id)?.title || "this task";
    const ok = await requestConfirm({
      message: "Delete task?",
      detail: `"${title}" will be permanently removed.`
    });
    if (!ok) return;
    saveTasks(allTasks.filter(t => t.id !== id));
    if (editTask?.id === id) {
      setShowForm(false);
      setEditTask(null);
    }
  }
  function onDragStart(id) {
    setDragId(id);
  }
  function onDragEnter(id) {
    setDragOver(id);
  }
  function onDragEnd() {
    if (!dragId || !dragOver || dragId === dragOver) {
      setDragId(null);
      setDragOver(null);
      return;
    }
    const list = [...allTasks];
    const fromIdx = list.findIndex(t => t.id === dragId);
    const toIdx = list.findIndex(t => t.id === dragOver);
    const [moved] = list.splice(fromIdx, 1);
    list.splice(toIdx, 0, moved);
    saveTasks(list.map((t, i) => ({
      ...t,
      sort_order: i
    })));
    setDragId(null);
    setDragOver(null);
  }
  function cardBg(t) {
    if (t.due_date === today) return C.accent + "0D";
    if (t.due_date && t.due_date < today && t.status !== "done") return C.red + "0D";
    return "#fff";
  }
  function cardBorder(t) {
    if (t.due_date === today) return `1px solid ${C.accent}55`;
    if (t.due_date && t.due_date < today && t.status !== "done") return `1px solid ${C.red}55`;
    return `1px solid ${C.border}`;
  }
  const TaskCard = ({
    t
  }) => {
    const isOverdue = t.due_date && t.due_date < today && t.status !== "done";
    const isDueToday = t.due_date === today && t.status !== "done";
    return /*#__PURE__*/React.createElement("div", {
      draggable: true,
      onDragStart: () => onDragStart(t.id),
      onDragEnter: () => onDragEnter(t.id),
      onDragOver: e => e.preventDefault(),
      onDragEnd: onDragEnd,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "11px 14px",
        borderRadius: 10,
        marginBottom: 6,
        background: cardBg(t),
        border: cardBorder(t),
        opacity: dragId === t.id ? 0.4 : 1,
        outline: dragOver === t.id && dragId !== t.id ? `2px solid ${C.accent}` : "none",
        cursor: "grab",
        transition: "opacity .15s",
        boxSizing: "border-box"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#CCC8BF",
        fontSize: 14,
        cursor: "grab",
        flexShrink: 0,
        userSelect: "none"
      }
    }, "\u283F"), /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: t.status === "done",
      onChange: () => toggleDone(t.id),
      style: {
        cursor: "pointer",
        width: 16,
        height: 16,
        flexShrink: 0,
        accentColor: C.accent
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 13,
        color: t.status === "done" ? C.muted : C.text,
        textDecoration: t.status === "done" ? "line-through" : "none",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, t.title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center",
        marginTop: 2,
        flexWrap: "wrap"
      }
    }, t.due_date && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        color: isOverdue ? C.red : isDueToday ? C.accent : C.muted
      }
    }, isOverdue ? "⚠ Overdue" : isDueToday ? "📌 Due today" : "📅 ", " ", fmt(t.due_date)), t.recurrence && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        padding: "1px 7px",
        borderRadius: 10,
        background: C.green + "18",
        color: C.green
      }
    }, "\u267B ", RECUR_LABELS[t.recurrence] || t.recurrence), t.recurrence_parent_id && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.muted
      }
    }, "\u267B recurring"), /*#__PURE__*/React.createElement("span", {
      onClick: e => {
        e.stopPropagation();
        cycleStatus(t.id);
      },
      style: {
        fontSize: 10,
        fontWeight: 700,
        padding: "1px 7px",
        borderRadius: 10,
        cursor: "pointer",
        background: STATUS_COLOR[t.status] + "22",
        color: STATUS_COLOR[t.status]
      }
    }, STATUS_LABEL[t.status]))), /*#__PURE__*/React.createElement("span", {
      onClick: e => {
        e.stopPropagation();
        cyclePriority(t.id);
      },
      style: {
        fontSize: 10,
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: 10,
        cursor: "pointer",
        flexShrink: 0,
        background: priorityColor(t.priority) + "22",
        color: priorityColor(t.priority)
      }
    }, t.priority), /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        openEdit(t);
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.muted,
        fontSize: 14,
        flexShrink: 0,
        padding: "0 2px",
        lineHeight: 1
      }
    }, "\u270E"), /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        deleteTask(t.id);
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.muted,
        fontSize: 16,
        flexShrink: 0,
        padding: "0 2px",
        lineHeight: 1
      }
    }, "\xD7"));
  };
  return /*#__PURE__*/React.createElement("div", null, confirmDialog, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 900
    }
  }, "To-Do"), /*#__PURE__*/React.createElement(Btn, {
    small: true,
    onClick: openNew
  }, "+ Detail")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3,
      background: "#EDEAE2",
      padding: 3,
      borderRadius: 10,
      width: "fit-content",
      marginBottom: 16
    }
  }, Object.keys(TAB_LABELS).map(v => /*#__PURE__*/React.createElement("button", {
    key: v,
    onClick: () => {
      setTab(v);
      setFilter("all");
    },
    style: {
      padding: "7px 16px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: tab === v ? 700 : 500,
      fontSize: 13,
      background: tab === v ? "#fff" : "transparent",
      color: tab === v ? C.text : C.muted,
      boxShadow: tab === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
      transition: "all .15s"
    }
  }, TAB_LABELS[v]))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginBottom: 16,
      flexWrap: "wrap"
    }
  }, [{
    id: "all",
    label: "All"
  }, {
    id: "today",
    label: "📌 Due today",
    active: C.accent
  }, {
    id: "overdue",
    label: "⚠ Overdue",
    active: C.red
  }].map(f => {
    const isActive = filter === f.id;
    return /*#__PURE__*/React.createElement("button", {
      key: f.id,
      onClick: () => setFilter(f.id),
      style: {
        padding: "5px 13px",
        borderRadius: 20,
        fontFamily: "inherit",
        fontSize: 12,
        fontWeight: isActive ? 700 : 400,
        cursor: "pointer",
        border: `1.5px solid ${isActive ? f.active || C.accent : C.border}`,
        background: isActive ? (f.active || C.accent) + "15" : "#fff",
        color: isActive ? f.active || C.accent : C.muted,
        transition: "all .15s"
      }
    }, f.label);
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: C.muted,
      alignSelf: "center",
      marginLeft: 4
    }
  }, active.length, " task", active.length !== 1 ? "s" : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: quickTitle,
    onChange: e => setQuickTitle(e.target.value),
    onKeyDown: quickAdd,
    "aria-label": "Quick add task",
    placeholder: "Type a task and press Enter\u2026",
    style: {
      flex: 1,
      border: `1.5px solid ${C.border}`,
      borderRadius: 10,
      padding: "11px 14px",
      fontSize: 13,
      fontFamily: "inherit",
      outline: "none",
      background: "#fff",
      color: C.text,
      boxSizing: "border-box"
    }
  })), active.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "32px 0",
      color: C.muted,
      fontSize: 14
    }
  }, filter === "today" ? "No tasks due today 🎉" : filter === "overdue" ? "Nothing overdue 🎉" : "No tasks yet — type above to add one."), /*#__PURE__*/React.createElement("div", {
    onDragOver: e => e.preventDefault()
  }, active.map(t => /*#__PURE__*/React.createElement(TaskCard, {
    key: t.id,
    t: t
  }))), done.length > 0 && /*#__PURE__*/React.createElement("details", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 13,
      color: C.muted,
      marginBottom: 10,
      userSelect: "none",
      listStyle: "none",
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u25B8"), " Done (", done.length, ")"), done.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "9px 14px",
      borderRadius: 10,
      marginBottom: 5,
      background: "#F5F3EE",
      border: `1px solid ${C.border}`,
      opacity: .65
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: true,
    onChange: () => toggleDone(t.id),
    style: {
      cursor: "pointer",
      accentColor: C.accent
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textDecoration: "line-through",
      fontSize: 13,
      color: C.muted,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, t.title), t.due_date && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      color: C.muted
    }
  }, fmt(t.due_date)), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteTask(t.id),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.muted,
      fontSize: 14
    }
  }, "\xD7")))), showForm && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.38)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 100
    },
    onClick: () => {
      setShowForm(false);
      setEditTask(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: 28,
      width: 420,
      maxWidth: "92vw",
      boxShadow: "0 24px 60px rgba(0,0,0,0.2)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 18,
      marginBottom: 20
    }
  }, editTask ? "Edit task" : "New task"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: .8,
      marginBottom: 6
    }
  }, "Title"), /*#__PURE__*/React.createElement("input", {
    value: form.title,
    onChange: e => setForm(f => ({
      ...f,
      title: e.target.value
    })),
    placeholder: "What needs to be done?",
    style: {
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 13,
      fontFamily: "inherit",
      outline: "none",
      width: "100%",
      boxSizing: "border-box"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: .8,
      marginBottom: 6
    }
  }, "Due date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: form.due_date,
    onChange: e => setForm(f => ({
      ...f,
      due_date: e.target.value
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
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: .8,
      marginBottom: 6
    }
  }, "Assignee"), /*#__PURE__*/React.createElement("select", {
    value: form.assignee,
    onChange: e => setForm(f => ({
      ...f,
      assignee: e.target.value
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
  }, /*#__PURE__*/React.createElement("option", {
    value: "family"
  }, "Family"), /*#__PURE__*/React.createElement("option", {
    value: "parent1"
  }, "Parent 1"), /*#__PURE__*/React.createElement("option", {
    value: "parent2"
  }, "Parent 2")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: .8,
      marginBottom: 6
    }
  }, "Priority"), /*#__PURE__*/React.createElement("select", {
    value: form.priority,
    onChange: e => setForm(f => ({
      ...f,
      priority: e.target.value
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
  }, /*#__PURE__*/React.createElement("option", {
    value: "low"
  }, "Low"), /*#__PURE__*/React.createElement("option", {
    value: "medium"
  }, "Medium"), /*#__PURE__*/React.createElement("option", {
    value: "high"
  }, "High"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: .8,
      marginBottom: 6
    }
  }, "Status"), /*#__PURE__*/React.createElement("select", {
    value: form.status,
    onChange: e => setForm(f => ({
      ...f,
      status: e.target.value
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
  }, /*#__PURE__*/React.createElement("option", {
    value: "not_started"
  }, "Not started"), /*#__PURE__*/React.createElement("option", {
    value: "in_progress"
  }, "In progress"), /*#__PURE__*/React.createElement("option", {
    value: "done"
  }, "Done")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: .8,
      marginBottom: 6
    }
  }, "Repeat"), /*#__PURE__*/React.createElement("select", {
    value: form.recurrence || "",
    onChange: e => setForm(f => ({
      ...f,
      recurrence: e.target.value
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
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Does not repeat"), Object.entries(RECUR_LABELS).map(([v, l]) => /*#__PURE__*/React.createElement("option", {
    key: v,
    value: v
  }, l))), form.recurrence && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: C.green,
      marginTop: 5,
      fontWeight: 600
    }
  }, "\u267B A new instance will be created automatically when this task is completed.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    onClick: saveForm
  }, editTask ? "Save changes" : "Add task"), /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    onClick: () => {
      setShowForm(false);
      setEditTask(null);
    }
  }, "Cancel"), editTask && /*#__PURE__*/React.createElement(Btn, {
    variant: "danger",
    onClick: () => deleteTask(editTask.id)
  }, "Delete")))));
}

// ── Grocery ───────────────────────────────────────────────────
const GROCERY_CATS = ["produce", "dairy", "meat", "bakery", "frozen", "household", "other"];
const CAT_EMOJI = {
  produce: "🥦",
  dairy: "🥛",
  meat: "🥩",
  bakery: "🍞",
  frozen: "🧊",
  household: "🧹",
  other: "🛍️"
};
function Grocery() {
  const {
    family,
    updateFamily
  } = useFamilyCtx();
  const grocery = family.grocery || [];
  const pantry = family.pantry || [];
  const [quickText, setQuickText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showPantry, setShowPantry] = useState(false);
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unit: "",
    category: "other"
  });
  const [pantrySearch, setPantrySearch] = useState("");
  const [newPantryItem, setNewPantryItem] = useState("");
  function saveGrocery(next) {
    updateFamily({
      grocery: next
    });
  }
  function savePantry(next) {
    updateFamily({
      pantry: next
    });
  }
  function quickAdd(e) {
    if (e.key !== "Enter" || !quickText.trim()) return;
    saveGrocery([...grocery, {
      id: uid(),
      name: quickText.trim(),
      quantity: "",
      unit: "",
      category: "other",
      checked: false,
      source: "manual",
      recipes: []
    }]);
    setQuickText("");
  }
  function addFromForm() {
    if (!form.name.trim()) return;
    saveGrocery([...grocery, {
      id: uid(),
      ...form,
      checked: false,
      source: "manual",
      recipes: []
    }]);
    setForm({
      name: "",
      quantity: "",
      unit: "",
      category: "other"
    });
    setShowForm(false);
  }
  function toggle(id) {
    saveGrocery(grocery.map(i => i.id === id ? {
      ...i,
      checked: !i.checked
    } : i));
  }
  function remove(id) {
    saveGrocery(grocery.filter(i => i.id !== id));
  }
  function clearChecked() {
    saveGrocery(grocery.filter(i => !i.checked));
  }
  function togglePantry(id) {
    savePantry(pantry.map(p => p.id === id ? {
      ...p,
      inStock: !p.inStock
    } : p));
  }
  function addPantryItem() {
    if (!newPantryItem.trim()) return;
    savePantry([...pantry, {
      id: uid(),
      name: newPantryItem.trim(),
      inStock: true
    }]);
    setNewPantryItem("");
  }
  function removePantryItem(id) {
    savePantry(pantry.filter(p => p.id !== id));
  }
  const unchecked = grocery.filter(g => !g.checked);
  const checked = grocery.filter(g => g.checked);
  const grouped = GROCERY_CATS.reduce((acc, cat) => {
    const items = unchecked.filter(i => i.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});
  const filteredPantry = pantry.filter(p => !pantrySearch || p.name.toLowerCase().includes(pantrySearch.toLowerCase()));
  const ItemRow = ({
    item
  }) => {
    const isMealPlan = item.source === "meal_plan";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 0,
        padding: "13px 14px",
        marginBottom: 5,
        borderRadius: 12,
        background: item.checked ? "#F5F3EE" : "#fff",
        border: `1px solid ${item.checked ? C.border : isMealPlan ? C.green + "44" : C.border}`,
        cursor: "pointer",
        minHeight: 52
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => toggle(item.id),
      style: {
        width: 26,
        height: 26,
        borderRadius: 6,
        border: `2px solid ${item.checked ? C.green : C.border}`,
        background: item.checked ? C.green : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        cursor: "pointer",
        marginRight: 12,
        transition: "all .15s"
      }
    }, item.checked && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#fff",
        fontSize: 14,
        lineHeight: 1
      }
    }, "\u2713")), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        fontSize: 14,
        color: item.checked ? C.muted : C.text,
        textDecoration: item.checked ? "line-through" : "none",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, item.name), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center",
        marginTop: 2,
        flexWrap: "wrap"
      }
    }, (item.quantity || item.unit) && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: C.muted,
        fontWeight: 500
      }
    }, item.quantity, item.unit), isMealPlan && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        padding: "1px 7px",
        borderRadius: 10,
        background: C.green + "20",
        color: C.green,
        border: `1px solid ${C.green}33`
      }
    }, "\uD83C\uDF74 meal plan"))), /*#__PURE__*/React.createElement("button", {
      onClick: () => remove(item.id),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.muted,
        fontSize: 18,
        padding: "4px 6px",
        lineHeight: 1,
        flexShrink: 0,
        opacity: .5
      }
    }, "\xD7"));
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 900
    }
  }, "Grocery List"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "center"
    }
  }, checked.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: clearChecked,
    style: {
      padding: "7px 13px",
      borderRadius: 8,
      border: `1px solid ${C.border}`,
      background: "#fff",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "inherit",
      color: C.muted
    }
  }, "Clear checked"), /*#__PURE__*/React.createElement("button", {
    onClick: () => printGroceryList(grocery),
    style: {
      padding: "7px 13px",
      borderRadius: 8,
      border: `1px solid ${C.border}`,
      background: "#fff",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "inherit",
      color: C.muted
    }
  }, "\uD83D\uDDA8\uFE0F Print"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowPantry(true),
    style: {
      padding: "7px 13px",
      borderRadius: 8,
      border: `1px solid ${C.green}55`,
      background: C.green + "15",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
      fontFamily: "inherit",
      color: C.green,
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, "\uD83E\uDD6B Pantry ", /*#__PURE__*/React.createElement(Badge, {
    color: C.green
  }, pantry.filter(p => p.inStock).length)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 20
    }
  }, unchecked.length, " item", unchecked.length !== 1 ? "s" : "", " \xB7 ", checked.length, " in basket"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: quickText,
    onChange: e => setQuickText(e.target.value),
    onKeyDown: quickAdd,
    "aria-label": "Quick add grocery item",
    placeholder: "Type item and press Enter\u2026",
    style: {
      flex: 1,
      border: `1.5px solid ${C.border}`,
      borderRadius: 12,
      padding: "13px 16px",
      fontSize: 14,
      fontFamily: "inherit",
      outline: "none",
      background: "#fff",
      color: C.text,
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowForm(v => !v),
    style: {
      padding: "13px 16px",
      borderRadius: 12,
      border: `1.5px solid ${C.border}`,
      background: "#fff",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 700,
      fontFamily: "inherit",
      color: C.muted,
      flexShrink: 0
    }
  }, showForm ? "↑" : "+ Details")), showForm && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 80px 80px",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: form.name,
    onChange: e => setForm(f => ({
      ...f,
      name: e.target.value
    })),
    placeholder: "Item name",
    style: {
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "9px 12px",
      fontSize: 13,
      fontFamily: "inherit",
      outline: "none",
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("input", {
    value: form.quantity,
    onChange: e => setForm(f => ({
      ...f,
      quantity: e.target.value
    })),
    placeholder: "Qty",
    style: {
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "9px 10px",
      fontSize: 13,
      fontFamily: "inherit",
      outline: "none",
      boxSizing: "border-box",
      textAlign: "center"
    }
  }), /*#__PURE__*/React.createElement("input", {
    value: form.unit,
    onChange: e => setForm(f => ({
      ...f,
      unit: e.target.value
    })),
    placeholder: "Unit",
    style: {
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "9px 10px",
      fontSize: 13,
      fontFamily: "inherit",
      outline: "none",
      boxSizing: "border-box",
      textAlign: "center"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap",
      marginBottom: 12
    }
  }, GROCERY_CATS.map(cat => /*#__PURE__*/React.createElement("button", {
    key: cat,
    onClick: () => setForm(f => ({
      ...f,
      category: cat
    })),
    style: {
      padding: "5px 12px",
      borderRadius: 20,
      border: `1.5px solid ${form.category === cat ? C.accent : C.border}`,
      background: form.category === cat ? C.accentLight : "#fff",
      cursor: "pointer",
      fontSize: 12,
      fontFamily: "inherit",
      fontWeight: form.category === cat ? 700 : 400,
      color: form.category === cat ? C.accent : C.muted
    }
  }, CAT_EMOJI[cat], " ", cat))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    onClick: addFromForm
  }, "Add item"), /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    onClick: () => setShowForm(false)
  }, "Cancel"))), Object.keys(grouped).length === 0 && unchecked.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "48px 0",
      color: C.muted,
      fontSize: 14
    }
  }, "Your list is empty. Type above to add items."), GROCERY_CATS.filter(c => grouped[c]).map(cat => /*#__PURE__*/React.createElement("div", {
    key: cat,
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, CAT_EMOJI[cat]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 800,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: 1
    }
  }, cat), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, "(", grouped[cat].length, ")")), grouped[cat].map(item => /*#__PURE__*/React.createElement(ItemRow, {
    key: item.id,
    item: item
  })))), checked.length > 0 && /*#__PURE__*/React.createElement("details", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 13,
      color: C.muted,
      listStyle: "none",
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 10,
      userSelect: "none"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u25B8"), " In basket (", checked.length, ")"), checked.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "11px 14px",
      marginBottom: 5,
      borderRadius: 12,
      background: "#F5F3EE",
      border: `1px solid ${C.border}`,
      opacity: .6
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => toggle(item.id),
    style: {
      width: 26,
      height: 26,
      borderRadius: 6,
      border: `2px solid ${C.green}`,
      background: C.green,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff",
      fontSize: 14
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textDecoration: "line-through",
      fontSize: 14,
      color: C.muted,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, item.name), /*#__PURE__*/React.createElement("button", {
    onClick: () => remove(item.id),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.muted,
      fontSize: 18,
      lineHeight: 1
    }
  }, "\xD7")))), showPantry && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      zIndex: 200
    },
    onClick: () => setShowPantry(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "20px 20px 0 0",
      padding: 28,
      width: "100%",
      maxWidth: 500,
      maxHeight: "75vh",
      overflowY: "auto",
      boxShadow: "0 -8px 40px rgba(0,0,0,0.15)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 4,
      borderRadius: 2,
      background: C.border,
      margin: "0 auto 20px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 18
    }
  }, "Pantry"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginTop: 2
    }
  }, "Items you already have at home.")), /*#__PURE__*/React.createElement(Badge, {
    color: C.green
  }, pantry.filter(p => p.inStock).length, " in stock")), /*#__PURE__*/React.createElement("input", {
    value: pantrySearch,
    onChange: e => setPantrySearch(e.target.value),
    placeholder: "Search pantry\u2026",
    style: {
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 13,
      fontFamily: "inherit",
      width: "100%",
      boxSizing: "border-box",
      outline: "none",
      marginBottom: 14
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: newPantryItem,
    onChange: e => setNewPantryItem(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") addPantryItem();
    },
    placeholder: "Add pantry item and press Enter\u2026",
    style: {
      flex: 1,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 13,
      fontFamily: "inherit",
      outline: "none",
      boxSizing: "border-box"
    }
  })), filteredPantry.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "11px 14px",
      borderRadius: 10,
      marginBottom: 5,
      background: p.inStock ? C.green + "0D" : "#F5F3EE",
      border: `1px solid ${p.inStock ? C.green + "33" : C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => togglePantry(p.id),
    style: {
      width: 24,
      height: 24,
      borderRadius: 6,
      border: `2px solid ${p.inStock ? C.green : C.border}`,
      background: p.inStock ? C.green : "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      flexShrink: 0,
      transition: "all .15s"
    }
  }, p.inStock && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff",
      fontSize: 12
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14,
      fontWeight: 500,
      color: p.inStock ? C.text : C.muted
    }
  }, p.name), p.inStock && /*#__PURE__*/React.createElement(Badge, {
    color: C.green
  }, "in stock"), /*#__PURE__*/React.createElement("button", {
    onClick: () => removePantryItem(p.id),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.muted,
      fontSize: 16,
      lineHeight: 1,
      padding: "2px 4px"
    }
  }, "\xD7"))), filteredPantry.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      color: C.muted,
      fontSize: 13,
      padding: "20px 0"
    }
  }, "No pantry items yet."))));
}

// ── Child Space ───────────────────────────────────────────────
const AVATAR_COLOURS = ["#E8A87C", "#7CB9E8", "#B5A7D4", "#7CC9A8", "#F0C987", "#E87C9A", "#87B5E8", "#B5D4A7"];

// ── Milestone auto-suggestion by age ─────────────────────────
function autoMilestonesForAge(age, name) {
  const yr = n => new Date().getFullYear() + n;
  const make = (title, horizon, note = "", isPast = false) => ({
    id: uid(),
    title,
    horizon,
    note,
    isPast,
    date: isPast ? null : null,
    source: "auto"
  });
  if (age <= 1) return [make("First steps", "past", "Usually 9–12 months.", true), make("First words (mama / dada)", "past", "", true), make("Start toddler playgroup", "1yr", "Social play matters early."), make("First dentist visit", "1yr", "Recommended once first teeth appear."), make("Begin Montessori or pre-school", "3yr", `Around ${yr(2)}–${yr(3)}.`), make("Learn to swim with floats", "3yr", "Early water confidence pays off."), make("Start primary school (Junior Infants)", "5yr", `Around ${yr(4)}.`), make("Read simple books independently", "5yr", "")];
  if (age <= 3) return [make("First words milestone reached", "past", "", true), make("Potty training", "1yr", "Typically 2.5–3.5 years."), make("Begin pre-school / Montessori", "1yr", `Around age ${age + 1}.`), make("First swimming lessons", "1yr", "Great for confidence."), make("Start primary school (Junior Infants)", "3yr", `Around ${yr(4 - age)}.`), make("Learn to ride a balance bike", "3yr", ""), make("Read independently", "5yr", "Usually by age 6–7."), make("First school sports day", "5yr", "")];
  if (age <= 5) return [make("Started pre-school", "past", "", true), make("Start primary school (Junior Infants)", "1yr", `Around age ${age + 1}.`), make("Learn to ride a bike (no stabilisers)", "1yr", ""), make("Join an after-school activity", "3yr", "Sport, art, or music."), make("Reading chapter books", "3yr", ""), make("First Communion (if applicable)", "5yr", "Typically age 7–8."), make("First school trip abroad", "5yr", "")];
  if (age <= 8) return [make("Started primary school", "past", "", true), make("Join a team sport or club", "1yr", "Great for social skills."), make("Learn to swim independently", "1yr", ""), make("First Communion (if applicable)", "1yr", "Typically age 7–8."), make("Reading chapter books solo", "1yr", ""), make("First overnight school trip", "3yr", ""), make("Confirmation (if applicable)", "3yr", "Around age 12."), make("Transition to secondary school", "5yr", `Around ${yr(12 - age)}.`)];
  if (age <= 11) return [make("Joined a sport or club", "past", "", true), make("Confirmation (if applicable)", "1yr", ""), make("Digital responsibility conversation", "1yr", "Phone, social media, screen time."), make("Start secondary school", "3yr", `Around ${yr(12 - age)}.`), make("Junior Certificate", "3yr", "3rd year of secondary school."), make("Leaving Certificate", "5yr", `Around ${yr(18 - age)}.`), make("Learn to drive (provisional at 17)", "5yr", "Book theory test early.")];
  // 12+
  return [make("Started secondary school", "past", "", true), make("Junior Certificate", "1yr", "3rd year of secondary."), make("Transition Year (if available)", "1yr", "Great year for growth."), make("Leaving Certificate", "3yr", `Around ${yr(18 - age)}.`), make("Learn to drive (provisional at 17)", "3yr", ""), make("Third level / college decision", "5yr", `Around ${yr(18 - age)}.`), make("Financial independence conversations", "5yr", "Saving, budgeting, renting.")];
}
const MILESTONE_HORIZONS = [{
  id: "past",
  label: "Past",
  emoji: "✅",
  color: "#8A8478"
}, {
  id: "1yr",
  label: "In 1 year",
  emoji: "🌿",
  color: "#4A9B6F"
}, {
  id: "3yr",
  label: "In 3 years",
  emoji: "🌲",
  color: "#4A7BB5"
}, {
  id: "5yr",
  label: "In 5+ years",
  emoji: "🏔️",
  color: "#9B6FB5"
}];

// ── Hoisted child-space primitives (prevent re-creation on render) ──
const ChildChip = ({
  label,
  color
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    padding: "3px 12px",
    borderRadius: 20,
    background: color + "22",
    color,
    fontSize: 12,
    fontWeight: 600
  }
}, label);
const ChildTabBtn = ({
  id,
  label,
  active,
  accent,
  onSelect
}) => /*#__PURE__*/React.createElement("button", {
  onClick: () => onSelect(id),
  style: {
    padding: "8px 18px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontWeight: active ? 700 : 500,
    fontSize: 13,
    background: active ? accent : "transparent",
    color: active ? "#fff" : C.muted,
    transition: "all .15s"
  }
}, label);
function ChildSpace({
  child
}) {
  const {
    family,
    updateFamily
  } = useFamilyCtx();
  const [tab, setTab] = useState("profile");
  const acc = child.avatar_colour;
  const a = ageOf(child.date_of_birth);
  const allTasks = family.tasks || [];
  const childTasks = allTasks.filter(t => t.child_id === child.id);
  const activeTasks = childTasks.filter(t => t.status !== "done");
  const allChildNotes = (family.child_notes || {})[child.id] || [];
  const milestones = (family.child_milestones || {})[child.id] || null;
  const [quickTask, setQuickTask] = useState("");
  const [childNoteText, setChildNoteText] = useState("");
  const [milestoneModal, setMilestoneModal] = useState(null);
  const [mForm, setMForm] = useState({});
  const [aiOpen, setAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [aiError, setAiError] = useState("");
  // ── Profile editing ────────────────────────────────────────
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({});
  const today = new Date().toISOString().split("T")[0];
  const {
    confirmDialog,
    requestConfirm
  } = useConfirm();
  const AVATAR_PALETTE = ["#E8A87C", "#7CB9E8", "#B5A7D4", "#7CC9A8", "#F0C987", "#E87C9A", "#87B5E8", "#B5D4A7", "#E8734A", "#4A9B6F", "#4A7BB5", "#9B6FB5"];
  function openEditProfile() {
    setProfileForm({
      name: child.name,
      date_of_birth: child.date_of_birth,
      gender: child.gender || "",
      avatar_colour: child.avatar_colour,
      interests: (child.interests || []).join(", "),
      personality_traits: (child.personality_traits || []).join(", "),
      likes: (child.likes || []).join(", "),
      dislikes: (child.dislikes || []).join(", "),
      notes: child.notes || ""
    });
    setEditingProfile(true);
  }
  function saveProfile() {
    if (!profileForm.name.trim() || !profileForm.date_of_birth) return;
    const splitTags = s => s.split(",").map(t => t.trim()).filter(Boolean);
    const updated = {
      ...child,
      name: profileForm.name.trim(),
      date_of_birth: profileForm.date_of_birth,
      gender: profileForm.gender,
      avatar_colour: profileForm.avatar_colour,
      interests: splitTags(profileForm.interests),
      personality_traits: splitTags(profileForm.personality_traits),
      likes: splitTags(profileForm.likes),
      dislikes: splitTags(profileForm.dislikes),
      notes: profileForm.notes.trim()
    };
    updateFamily({
      children: (family.children || []).map(c => c.id === child.id ? updated : c)
    });
    setEditingProfile(false);
  }

  // ── milestone persistence ──────────────────────────────────
  function saveMilestones(next) {
    updateFamily({
      child_milestones: {
        ...(family.child_milestones || {}),
        [child.id]: next
      }
    });
  }
  function autoGenerate() {
    saveMilestones(autoMilestonesForAge(a, child.name));
  }

  // ── task helpers ───────────────────────────────────────────
  function quickAddTask(e) {
    if (e.key !== "Enter" || !quickTask.trim()) return;
    updateFamily({
      tasks: [...allTasks, {
        id: uid(),
        title: quickTask.trim(),
        child_id: child.id,
        assignee: "child",
        priority: "medium",
        status: "not_started",
        due_date: null
      }]
    });
    setQuickTask("");
  }
  function toggleTask(id) {
    updateFamily({
      tasks: allTasks.map(t => t.id === id ? {
        ...t,
        status: t.status === "done" ? "not_started" : "done"
      } : t)
    });
  }
  async function deleteTask(id) {
    const title = allTasks.find(t => t.id === id)?.title || "this task";
    const ok = await requestConfirm({
      message: `Delete task?`,
      detail: `"${title}" will be permanently removed.`
    });
    if (!ok) return;
    updateFamily({
      tasks: allTasks.filter(t => t.id !== id)
    });
  }

  // ── notes helpers ──────────────────────────────────────────
  function saveChildNotes(next) {
    updateFamily({
      child_notes: {
        ...(family.child_notes || {}),
        [child.id]: next
      }
    });
  }
  function addChildNote() {
    if (!childNoteText.trim()) return;
    saveChildNotes([...allChildNotes, {
      id: uid(),
      body: childNoteText.trim(),
      created_at: new Date().toISOString()
    }]);
    setChildNoteText("");
  }
  async function deleteChildNote(id) {
    const ok = await requestConfirm({
      message: "Delete note?",
      detail: "This note will be permanently removed."
    });
    if (!ok) return;
    saveChildNotes(allChildNotes.filter(n => n.id !== id));
  }

  // ── milestone CRUD ─────────────────────────────────────────
  function openNewMilestone(horizon = "1yr") {
    setMForm({
      title: "",
      note: "",
      horizon,
      isPast: horizon === "past",
      date: ""
    });
    setMilestoneModal("new");
  }
  function openEditMilestone(m) {
    setMForm({
      title: m.title,
      note: m.note || "",
      horizon: m.horizon,
      isPast: !!m.isPast,
      date: m.date || ""
    });
    setMilestoneModal(m);
  }
  function saveMilestoneForm() {
    if (!mForm.title.trim()) return;
    const current = milestones || [];
    let next;
    if (milestoneModal === "new") {
      next = [...current, {
        id: uid(),
        ...mForm,
        source: "manual"
      }];
    } else {
      next = current.map(m => m.id === milestoneModal.id ? {
        ...m,
        ...mForm
      } : m);
    }
    saveMilestones(next);
    setMilestoneModal(null);
  }
  async function deleteMilestone(id) {
    const title = (milestones || []).find(m => m.id === id)?.title || "this milestone";
    const ok = await requestConfirm({
      message: "Delete milestone?",
      detail: `"${title}" will be permanently removed.`
    });
    if (!ok) return;
    saveMilestones((milestones || []).filter(m => m.id !== id));
    setMilestoneModal(null);
  }
  function markMilestoneDone(id) {
    saveMilestones((milestones || []).map(m => m.id === id ? {
      ...m,
      isPast: true,
      horizon: "past"
    } : m));
  }

  // ── AI milestone tips ──────────────────────────────────────
  async function runAiMilestones() {
    setAiOpen(true);
    setAiLoading(true);
    setAiResult("");
    setAiError("");
    try {
      const interests = (child.interests || []).join(", ") || "various things";
      const traits = (child.personality_traits || []).join(", ") || "not described";
      const sys = "You are a warm, experienced child development advisor. Speak to parents directly. Never use clinical jargon.";
      const user = `Child: ${child.name}, age ${a}.\nInterests: ${interests}.\nPersonality: ${traits}.\n\nGive 5 specific, age-appropriate developmental milestones to focus on over the next 12 months. Cover a mix of: educational, social, physical, and emotional areas. Each should be 1–2 warm, practical sentences. Number them 1–5. Address the parents directly.`;
      setAiResult(await callClaude(sys, user, 700));
    } catch (e) {
      setAiError(`Couldn't reach AI: ${e.message}`);
    }
    setAiLoading(false);
  }

  // ── shared UI ──────────────────────────────────────────────
  // Chip uses hoisted ChildChip component below
  // TabBtn uses hoisted ChildTabBtn component below

  // group milestones by horizon
  const grouped = MILESTONE_HORIZONS.reduce((acc, h) => {
    acc[h.id] = (milestones || []).filter(m => m.horizon === h.id);
    return acc;
  }, {});
  return /*#__PURE__*/React.createElement("div", null, confirmDialog, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginBottom: 24,
      padding: "20px 24px",
      borderRadius: 16,
      background: `linear-gradient(135deg,${acc}18,${acc}08)`,
      border: `1px solid ${acc}33`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 60,
      borderRadius: "50%",
      background: acc,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 900,
      fontSize: 26,
      color: "#fff",
      flexShrink: 0,
      boxShadow: `0 4px 16px ${acc}55`
    }
  }, child.name[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 3px",
      fontSize: 24,
      fontWeight: 900,
      color: C.text
    }
  }, child.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.muted
    }
  }, "Age ", a, " \xB7 Born ", fmt(child.date_of_birth), child.gender && ` · ${child.gender}`)), /*#__PURE__*/React.createElement("button", {
    onClick: openEditProfile,
    style: {
      padding: "7px 16px",
      borderRadius: 9,
      border: `1.5px solid ${acc}`,
      background: "#fff",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
      fontFamily: "inherit",
      color: acc,
      flexShrink: 0
    }
  }, "\u270E Edit profile")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3,
      background: "#EDEAE2",
      padding: 3,
      borderRadius: 10,
      width: "fit-content",
      marginBottom: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(ChildTabBtn, {
    id: "profile",
    label: "Profile",
    active: tab === "profile",
    accent: acc,
    onSelect: setTab
  }), /*#__PURE__*/React.createElement(ChildTabBtn, {
    id: "milestones",
    label: "Milestones",
    active: tab === "milestones",
    accent: acc,
    onSelect: setTab
  }), /*#__PURE__*/React.createElement(ChildTabBtn, {
    id: "tasks",
    label: "Tasks",
    active: tab === "tasks",
    accent: acc,
    onSelect: setTab
  }), /*#__PURE__*/React.createElement(ChildTabBtn, {
    id: "notes",
    label: "Notes",
    active: tab === "notes",
    accent: acc,
    onSelect: setTab
  })), tab === "profile" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      marginBottom: 16
    }
  }, [{
    label: "Interests",
    items: child.interests
  }, {
    label: "Personality",
    items: child.personality_traits
  }, {
    label: "Likes",
    items: child.likes
  }, {
    label: "Dislikes",
    items: child.dislikes
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      background: "#fff",
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: .8,
      marginBottom: 10
    }
  }, s.label), (s.items || []).length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted
    }
  }, "None added \u2014 ", /*#__PURE__*/React.createElement("button", {
    onClick: openEditProfile,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: acc,
      fontSize: 12,
      fontWeight: 700,
      padding: 0
    }
  }, "edit profile")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, (s.items || []).map(i => /*#__PURE__*/React.createElement(ChildChip, {
    key: i,
    color: acc,
    label: i
  })))))), child.notes ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: .8,
      marginBottom: 8
    }
  }, "Parent notes"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 1.7,
      color: C.text
    }
  }, child.notes)) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 12,
      border: `1.5px dashed ${C.border}`,
      padding: 16,
      textAlign: "center",
      color: C.muted,
      fontSize: 13
    }
  }, "No profile info yet.", " ", /*#__PURE__*/React.createElement("button", {
    onClick: openEditProfile,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: acc,
      fontSize: 13,
      fontWeight: 700,
      padding: 0
    }
  }, "Complete ", child.name, "'s profile \u2192"))), editingProfile && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.42)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 200
    },
    onClick: e => {
      if (e.target === e.currentTarget) setEditingProfile(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 18,
      padding: 0,
      width: 540,
      maxWidth: "94vw",
      maxHeight: "92vh",
      overflowY: "auto",
      boxShadow: "0 28px 70px rgba(0,0,0,0.22)",
      fontFamily: "Georgia,serif"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      background: profileForm.avatar_colour || acc,
      borderRadius: "18px 18px 0 0"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "28px 30px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 900,
      fontSize: 20,
      marginBottom: 4
    }
  }, "Edit ", child.name, "'s profile"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 24
    }
  }, "Changes save immediately to the family."), /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Avatar colour"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, AVATAR_PALETTE.map(c => /*#__PURE__*/React.createElement("div", {
    key: c,
    onClick: () => setProfileForm(f => ({
      ...f,
      avatar_colour: c
    })),
    style: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: c,
      cursor: "pointer",
      boxShadow: profileForm.avatar_colour === c ? `0 0 0 3px #fff, 0 0 0 5px ${c}` : "none",
      transition: "box-shadow .15s"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Name *"
  }, /*#__PURE__*/React.createElement(Inp, {
    value: profileForm.name || "",
    onChange: v => setProfileForm(f => ({
      ...f,
      name: v
    })),
    placeholder: "e.g. Mia"
  })), /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Date of birth *"
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: profileForm.date_of_birth || "",
    onChange: e => setProfileForm(f => ({
      ...f,
      date_of_birth: e.target.value
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
  }))), /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Gender (optional)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, ["Girl", "Boy", "Non-binary", "Prefer not to say"].map(g => /*#__PURE__*/React.createElement("button", {
    key: g,
    onClick: () => setProfileForm(f => ({
      ...f,
      gender: f.gender === g ? "" : g
    })),
    style: {
      padding: "6px 14px",
      borderRadius: 20,
      cursor: "pointer",
      fontFamily: "inherit",
      fontSize: 12,
      border: `1.5px solid ${profileForm.gender === g ? acc : C.border}`,
      background: profileForm.gender === g ? acc + "18" : "#fff",
      fontWeight: profileForm.gender === g ? 700 : 400,
      color: profileForm.gender === g ? acc : C.muted
    }
  }, g)))), [{
    key: "interests",
    label: "Interests",
    placeholder: "e.g. dinosaurs, drawing, football"
  }, {
    key: "personality_traits",
    label: "Personality traits",
    placeholder: "e.g. curious, energetic, shy"
  }, {
    key: "likes",
    label: "Likes",
    placeholder: "e.g. painting, bedtime stories"
  }, {
    key: "dislikes",
    label: "Dislikes",
    placeholder: "e.g. loud noises, vegetables"
  }].map(({
    key,
    label,
    placeholder
  }) => /*#__PURE__*/React.createElement(FieldGroup, {
    key: key,
    label: `${label} (comma-separated)`
  }, /*#__PURE__*/React.createElement(Inp, {
    value: profileForm[key] || "",
    onChange: v => setProfileForm(f => ({
      ...f,
      [key]: v
    })),
    placeholder: placeholder
  }))), /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Notes for parents"
  }, /*#__PURE__*/React.createElement("textarea", {
    value: profileForm.notes || "",
    onChange: e => setProfileForm(f => ({
      ...f,
      notes: e.target.value
    })),
    placeholder: `Anything useful to remember about ${child.name}…`,
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
      outline: "none"
    }
  })), (!profileForm.name?.trim() || !profileForm.date_of_birth) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.red,
      marginBottom: 12
    }
  }, "Name and date of birth are required."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: saveProfile,
    disabled: !profileForm.name?.trim() || !profileForm.date_of_birth,
    style: {
      padding: "10px 24px",
      borderRadius: 9,
      border: "none",
      background: profileForm.name?.trim() && profileForm.date_of_birth ? profileForm.avatar_colour || acc : "#CCC8BF",
      color: "#fff",
      cursor: profileForm.name?.trim() && profileForm.date_of_birth ? "pointer" : "not-allowed",
      fontWeight: 700,
      fontSize: 14,
      fontFamily: "inherit"
    }
  }, "Save profile"), /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    onClick: () => setEditingProfile(false)
  }, "Cancel"))))), tab === "milestones" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 20,
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      marginBottom: 3
    }
  }, "Milestones for ", child.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.muted
    }
  }, "Track upcoming and past milestones across all stages of ", child.name, "'s life.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexShrink: 0,
      flexWrap: "wrap"
    }
  }, !milestones && /*#__PURE__*/React.createElement("button", {
    onClick: autoGenerate,
    style: {
      padding: "8px 16px",
      borderRadius: 10,
      border: `1.5px solid ${acc}`,
      background: acc + "18",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 800,
      fontFamily: "inherit",
      color: acc
    }
  }, "\u2728 Auto-suggest for age ", a), milestones && /*#__PURE__*/React.createElement("button", {
    onClick: autoGenerate,
    style: {
      padding: "7px 14px",
      borderRadius: 9,
      border: `1px solid ${C.border}`,
      background: "#FAFAF7",
      cursor: "pointer",
      fontSize: 11,
      fontFamily: "inherit",
      color: C.muted,
      fontWeight: 600
    }
  }, "Regenerate suggestions"), /*#__PURE__*/React.createElement("button", {
    onClick: () => openNewMilestone("1yr"),
    style: {
      padding: "8px 16px",
      borderRadius: 10,
      border: "none",
      background: C.accent,
      color: "#fff",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
      fontFamily: "inherit"
    }
  }, "+ Add milestone"))), !milestones && /*#__PURE__*/React.createElement("div", {
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
  }, "\uD83C\uDF1F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 17,
      color: C.text,
      marginBottom: 8
    }
  }, "No milestones yet"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: C.muted,
      lineHeight: 1.7,
      maxWidth: 320,
      margin: "0 auto 20px"
    }
  }, "Auto-generate age-appropriate milestone suggestions for ", child.name, ", or add your own manually."), /*#__PURE__*/React.createElement("button", {
    onClick: autoGenerate,
    style: {
      padding: "10px 24px",
      borderRadius: 10,
      border: "none",
      background: acc,
      color: "#fff",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 14,
      fontFamily: "inherit"
    }
  }, "\u2728 Auto-suggest milestones for age ", a)), milestones && MILESTONE_HORIZONS.map(h => {
    const items = grouped[h.id] || [];
    const isPastBucket = h.id === "past";
    return /*#__PURE__*/React.createElement("div", {
      key: h.id,
      style: {
        marginBottom: 28
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12
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
    }, h.emoji), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: 1.2,
        color: h.color
      }
    }, h.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: C.muted
      }
    }, "(", items.length, ")")), /*#__PURE__*/React.createElement("button", {
      onClick: () => openNewMilestone(h.id),
      style: {
        padding: "4px 12px",
        borderRadius: 8,
        border: `1px solid ${h.color}44`,
        background: h.color + "0D",
        cursor: "pointer",
        fontSize: 11,
        fontFamily: "inherit",
        fontWeight: 700,
        color: h.color
      }
    }, "+ Add")), items.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 18px",
        borderRadius: 12,
        border: `1.5px dashed ${C.border}`,
        color: C.muted,
        fontSize: 13,
        textAlign: "center"
      }
    }, "No milestones ", isPastBucket ? "marked past" : "planned for this horizon", ".", /*#__PURE__*/React.createElement("button", {
      onClick: () => openNewMilestone(h.id),
      style: {
        display: "block",
        margin: "8px auto 0",
        background: "none",
        border: "none",
        cursor: "pointer",
        color: h.color,
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "inherit"
      }
    }, "+ Add one")), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        paddingLeft: 24
      }
    }, items.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 7,
        top: 8,
        bottom: 8,
        width: 2,
        background: `linear-gradient(to bottom,${h.color}66,${h.color}11)`,
        borderRadius: 1
      }
    }), items.map((m, idx) => /*#__PURE__*/React.createElement("div", {
      key: m.id,
      style: {
        position: "relative",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: -17,
        top: 14,
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: isPastBucket ? h.color : acc,
        border: `2px solid #fff`,
        boxShadow: `0 0 0 2px ${h.color}`,
        zIndex: 1
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        padding: "14px 16px",
        transition: "box-shadow .15s",
        cursor: "pointer",
        borderLeft: `3px solid ${h.color}`
      },
      onClick: () => openEditMilestone(m),
      onMouseEnter: e => {
        e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,0,0,0.08)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.boxShadow = "none";
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: isPastBucket ? C.muted : C.text,
        textDecoration: isPastBucket ? "none" : "none",
        marginBottom: m.note ? 4 : 0,
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap"
      }
    }, isPastBucket && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14
      }
    }, "\u2705"), m.title, m.source === "auto" && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 9,
        padding: "1px 7px",
        borderRadius: 8,
        background: h.color + "18",
        color: h.color,
        fontWeight: 700
      }
    }, "suggested")), m.note && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted,
        lineHeight: 1.55
      }
    }, m.note), m.date && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        marginTop: 4
      }
    }, "\uD83D\uDCC5 ", new Date(m.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        flexShrink: 0
      }
    }, !isPastBucket && /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        markMilestoneDone(m.id);
      },
      title: "Mark as done",
      style: {
        padding: "4px 9px",
        borderRadius: 7,
        border: `1px solid ${C.green}44`,
        background: C.green + "0D",
        cursor: "pointer",
        fontSize: 11,
        fontFamily: "inherit",
        fontWeight: 700,
        color: C.green
      }
    }, "\u2713 Done"), /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        openEditMilestone(m);
      },
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.muted,
        fontSize: 15,
        padding: "2px 4px",
        lineHeight: 1
      }
    }, "\u270E"))))))));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      borderTop: `1px solid ${C.border}`,
      paddingTop: 24
    }
  }, !aiOpen ? /*#__PURE__*/React.createElement("button", {
    onClick: runAiMilestones,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "11px 22px",
      borderRadius: 12,
      border: `1.5px solid ${acc}`,
      background: acc + "18",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 700,
      fontFamily: "inherit",
      color: acc
    }
  }, "\u2728 AI milestone tips for ", child.name) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg,${acc}0D,${acc}05)`,
      border: `1px solid ${acc}44`,
      borderRadius: 14,
      padding: "18px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 700,
      fontSize: 14,
      color: acc
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\u2728"), " AI tips for ", child.name), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setAiOpen(false);
      setAiResult("");
      setAiError("");
    },
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.muted,
      fontSize: 18,
      lineHeight: 1
    }
  }, "\xD7")), aiLoading && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      fontStyle: "italic"
    }
  }, "Thinking about ", child.name, "\u2026"), aiError && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.red,
      fontSize: 13
    }
  }, aiError), aiResult && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.85,
      color: C.text,
      fontFamily: "Georgia,serif",
      whiteSpace: "pre-wrap"
    }
  }, aiResult), /*#__PURE__*/React.createElement("button", {
    onClick: runAiMilestones,
    style: {
      marginTop: 14,
      padding: "6px 16px",
      borderRadius: 8,
      border: `1px solid ${acc}44`,
      background: "#fff",
      cursor: "pointer",
      fontSize: 12,
      fontFamily: "inherit",
      fontWeight: 600,
      color: acc
    }
  }, "Refresh")))), milestoneModal !== null && /*#__PURE__*/React.createElement("div", {
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
      if (e.target === e.currentTarget) setMilestoneModal(null);
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
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 18,
      marginBottom: 20
    }
  }, milestoneModal === "new" ? "Add milestone" : "Edit milestone"), /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Milestone"
  }, /*#__PURE__*/React.createElement(Inp, {
    value: mForm.title,
    onChange: v => setMForm(f => ({
      ...f,
      title: v
    })),
    placeholder: "e.g. Started swimming lessons"
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
      outline: "none",
      lineHeight: 1.6
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(FieldGroup, {
    label: "Date (optional)"
  }, /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: mForm.date || "",
    onChange: e => setMForm(f => ({
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
    label: "Horizon"
  }, /*#__PURE__*/React.createElement("select", {
    value: mForm.horizon,
    onChange: e => setMForm(f => ({
      ...f,
      horizon: e.target.value,
      isPast: e.target.value === "past"
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
  }, MILESTONE_HORIZONS.map(h => /*#__PURE__*/React.createElement("option", {
    key: h.id,
    value: h.id
  }, h.emoji, " ", h.label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: saveMilestoneForm,
    style: {
      padding: "10px 24px",
      borderRadius: 9,
      border: "none",
      background: acc,
      color: "#fff",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 14,
      fontFamily: "inherit"
    }
  }, "Save"), /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    onClick: () => setMilestoneModal(null)
  }, "Cancel"), milestoneModal !== "new" && /*#__PURE__*/React.createElement(Btn, {
    variant: "danger",
    onClick: () => deleteMilestone(milestoneModal.id)
  }, "Delete"))))), tab === "tasks" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 14,
      padding: "8px 12px",
      background: acc + "10",
      borderRadius: 8
    }
  }, a < 4 ? "💡 Keep tasks very simple — one-step actions work best at this age." : a <= 8 ? "💡 Short, clear tasks work well." : "💡 Tasks can include more detail now."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: quickTask,
    onChange: e => setQuickTask(e.target.value),
    onKeyDown: quickAddTask,
    placeholder: a < 4 ? "e.g. Tidy toys" : a <= 8 ? "e.g. Do homework" : "e.g. Tidy bedroom",
    style: {
      flex: 1,
      border: `1.5px solid ${C.border}`,
      borderRadius: 10,
      padding: "11px 14px",
      fontSize: 13,
      fontFamily: "inherit",
      outline: "none",
      background: "#fff",
      color: C.text,
      boxSizing: "border-box"
    }
  })), activeTasks.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      textAlign: "center",
      padding: "24px 0"
    }
  }, "No tasks for ", child.name, " yet."), activeTasks.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "11px 14px",
      borderRadius: 10,
      marginBottom: 6,
      background: "#fff",
      border: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => toggleTask(t.id),
    style: {
      width: 22,
      height: 22,
      borderRadius: 6,
      border: `2px solid ${t.status === "done" ? acc : C.border}`,
      background: t.status === "done" ? acc : "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      flexShrink: 0,
      transition: "all .15s"
    }
  }, t.status === "done" && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff",
      fontSize: 12
    }
  }, "\u2713")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.text
    }
  }, t.title), t.due_date && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: t.due_date < today ? C.red : C.muted,
      marginTop: 2
    }
  }, "Due ", fmt(t.due_date))), /*#__PURE__*/React.createElement(Badge, {
    color: priorityColor(t.priority)
  }, t.priority), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteTask(t.id),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.muted,
      fontSize: 16,
      lineHeight: 1
    }
  }, "\xD7")))), tab === "notes" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 14,
      padding: "8px 12px",
      background: acc + "10",
      borderRadius: 8
    }
  }, "Private notes about ", child.name, " \u2014 only visible to parents."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      padding: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    value: childNoteText,
    onChange: e => setChildNoteText(e.target.value),
    placeholder: `Write a note about ${child.name}…`,
    rows: 3,
    style: {
      border: "none",
      outline: "none",
      width: "100%",
      fontSize: 13,
      fontFamily: "Georgia,serif",
      lineHeight: 1.7,
      resize: "vertical",
      color: C.text,
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: addChildNote,
    disabled: !childNoteText.trim(),
    style: {
      padding: "7px 18px",
      borderRadius: 8,
      border: "none",
      background: acc,
      color: "#fff",
      cursor: childNoteText.trim() ? "pointer" : "not-allowed",
      fontWeight: 700,
      fontSize: 13,
      fontFamily: "inherit",
      opacity: childNoteText.trim() ? 1 : .5
    }
  }, "Save note"))), allChildNotes.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      color: C.muted,
      fontSize: 13,
      padding: "24px 0"
    }
  }, "No notes about ", child.name, " yet."), [...allChildNotes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(n => /*#__PURE__*/React.createElement("div", {
    key: n.id,
    style: {
      background: "#fff",
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      padding: 16,
      marginBottom: 10,
      borderLeft: `4px solid ${acc}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 1.7,
      color: C.text,
      marginBottom: 8
    }
  }, n.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: C.muted
    }
  }, fmt(n.created_at)), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteChildNote(n.id),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.muted,
      fontSize: 13
    }
  }, "Delete"))))));
}

// ── Notes ─────────────────────────────────────────────────────
const SEED_NOTES = [{
  id: "n1",
  scope: "family",
  title: "School term dates 2025-26",
  body: "<p><strong>Term 1:</strong> Sep 1 – Dec 20</p><p><strong>Term 2:</strong> Jan 6 – Apr 4</p><p><strong>Term 3:</strong> Apr 22 – Jun 27</p>",
  tags: ["school"],
  pinned: true,
  created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  owner: null
}, {
  id: "n2",
  scope: "family",
  title: "Holiday ideas",
  body: "<ul><li>Algarve – June or September</li><li>Lisbon city break</li><li>Edinburgh – May half term</li></ul>",
  tags: ["holiday", "ideas"],
  pinned: false,
  created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
  owner: null
}];
function Notes() {
  const {
    family,
    updateFamily,
    user: currentUser
  } = useFamilyCtx();
  // Fix: if notes have never been saved (undefined), write SEED_NOTES into the
  // family object on first mount so subsequent edits are persisted correctly.
  useEffect(() => {
    if (family.notes === undefined) {
      updateFamily({
        notes: SEED_NOTES
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const allNotes = family.notes || SEED_NOTES;
  const [tab, setTab] = useState("family");
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [activeNote, setActiveNote] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [draft, setDraft] = useState(null);
  const [tagInput, setTagInput] = useState("");
  const editorRef = useRef(null);
  const {
    confirmDialog,
    requestConfirm
  } = useConfirm();
  const tabNotes = allNotes.filter(n => tab === "family" ? n.scope === "family" : n.scope === "personal" && n.owner === currentUser.id);
  const allTags = [...new Set(allNotes.flatMap(n => n.tags || []))].sort();
  const filtered = tabNotes.filter(n => {
    const q = search.toLowerCase();
    if (q && !(n.title?.toLowerCase().includes(q) || (n.body || "").replace(/<[^>]+>/g, "").toLowerCase().includes(q) || (n.tags || []).some(t => t.includes(q)))) return false;
    if (activeTag && !(n.tags || []).includes(activeTag)) return false;
    return true;
  }).sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.created_at) - new Date(a.created_at);
  });
  function saveNotes(next) {
    updateFamily({
      notes: next
    });
  }
  function openNote(note) {
    setActiveNote(note);
    setDraft({
      title: note.title || "",
      body: note.body || "",
      tags: [...(note.tags || [])],
      scope: note.scope,
      pinned: note.pinned || false
    });
    setIsNew(false);
  }
  function newNote() {
    const n = {
      id: uid(),
      scope: tab === "family" ? "family" : "personal",
      title: "",
      body: "",
      tags: [],
      pinned: false,
      created_at: new Date().toISOString(),
      owner: tab === "personal" ? currentUser.id : null
    };
    setActiveNote(n);
    setDraft({
      title: "",
      body: "",
      tags: [],
      scope: n.scope,
      pinned: false
    });
    setIsNew(true);
  }
  function saveNote() {
    if (!draft) return;
    const updated = {
      ...activeNote,
      ...draft,
      title: draft.title.trim(),
      updated_at: new Date().toISOString()
    };
    if (isNew) {
      saveNotes([...allNotes, updated]);
    } else {
      saveNotes(allNotes.map(n => n.id === activeNote.id ? updated : n));
    }
    setActiveNote(updated);
    setIsNew(false);
  }
  async function deleteNote(id) {
    const title = allNotes.find(n => n.id === id)?.title || "this note";
    const ok = await requestConfirm({
      message: "Delete note?",
      detail: `"${title || "Untitled"}" will be permanently removed.`
    });
    if (!ok) return;
    saveNotes(allNotes.filter(n => n.id !== id));
    setActiveNote(null);
    setDraft(null);
  }
  function togglePin(id) {
    saveNotes(allNotes.map(n => n.id === id ? {
      ...n,
      pinned: !n.pinned
    } : n));
    if (activeNote?.id === id) setDraft(d => ({
      ...d,
      pinned: !d.pinned
    }));
  }
  function addTag() {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (!t || draft.tags.includes(t)) return;
    setDraft(d => ({
      ...d,
      tags: [...d.tags, t]
    }));
    setTagInput("");
  }
  function removeTag(t) {
    setDraft(d => ({
      ...d,
      tags: d.tags.filter(x => x !== t)
    }));
  }
  function execCmd(cmd, val = null) {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    setDraft(d => ({
      ...d,
      body: editorRef.current?.innerHTML || d.body
    }));
  }
  function onEditorInput() {
    setDraft(d => ({
      ...d,
      body: editorRef.current?.innerHTML || ""
    }));
  }
  function plainText(html) {
    return (html || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  }
  function relTime(iso) {
    const d = new Date(iso),
      now = new Date(),
      diff = now - d,
      mins = Math.floor(diff / 60000),
      hrs = Math.floor(diff / 3600000),
      days = Math.floor(diff / 86400000);
    if (mins < 2) return "just now";
    if (hrs < 1) return `${mins}m ago`;
    if (days < 1) return `${hrs}h ago`;
    if (days === 1) return "yesterday";
    if (days < 7) return `${days}d ago`;
    return fmt(iso);
  }
  const TB = ({
    cmd,
    val,
    label,
    title
  }) => /*#__PURE__*/React.createElement("button", {
    onMouseDown: e => {
      e.preventDefault();
      execCmd(cmd, val);
    },
    title: title || label,
    style: {
      background: "none",
      border: `1px solid ${C.border}`,
      borderRadius: 5,
      cursor: "pointer",
      padding: "4px 8px",
      fontSize: 12,
      fontFamily: "inherit",
      color: C.text,
      lineHeight: 1.3,
      fontWeight: 500
    }
  }, label);
  useEffect(() => {
    if (editorRef.current && draft) {
      editorRef.current.innerHTML = draft.body || "";
    }
  }, [activeNote?.id]);
  return /*#__PURE__*/React.createElement("div", null, confirmDialog, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 3px",
      fontSize: 26,
      fontWeight: 900,
      letterSpacing: -.5
    }
  }, "Notes"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: C.muted
    }
  }, "Capture anything. Find it instantly.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3,
      background: "#EDEAE2",
      padding: 3,
      borderRadius: 10
    }
  }, [{
    id: "family",
    label: "Family"
  }, {
    id: "personal",
    label: "My notes"
  }].map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => {
      setTab(t.id);
      setActiveNote(null);
      setDraft(null);
      setSearch("");
      setActiveTag(null);
    },
    style: {
      padding: "7px 16px",
      borderRadius: 8,
      border: "none",
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: tab === t.id ? 700 : 500,
      fontSize: 13,
      background: tab === t.id ? "#fff" : "transparent",
      color: tab === t.id ? C.text : C.muted,
      boxShadow: tab === t.id ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
      transition: "all .15s"
    }
  }, t.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      overflow: "hidden",
      background: "#fff",
      minHeight: 560
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260,
      flexShrink: 0,
      borderRight: `1px solid ${C.border}`,
      display: "flex",
      flexDirection: "column",
      height: "calc(100vh - 130px)",
      background: "#fff",
      borderRadius: "12px 0 0 12px",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 12px 8px"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "Search notes\u2026",
    style: {
      width: "100%",
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 13,
      fontFamily: "inherit",
      outline: "none",
      background: "#FAFAF7",
      color: C.text,
      boxSizing: "border-box"
    }
  })), allTags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 12px 8px",
      display: "flex",
      gap: 4,
      flexWrap: "wrap"
    }
  }, allTags.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setActiveTag(activeTag === t ? null : t),
    style: {
      padding: "2px 9px",
      borderRadius: 12,
      border: `1px solid ${activeTag === t ? C.accent : C.border}`,
      background: activeTag === t ? C.accentLight : "transparent",
      fontSize: 11,
      fontFamily: "inherit",
      cursor: "pointer",
      color: activeTag === t ? C.accent : C.muted,
      fontWeight: activeTag === t ? 700 : 400
    }
  }, "#", t))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "4px 8px 12px"
    }
  }, filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "32px 12px",
      color: C.muted,
      fontSize: 13
    }
  }, search || activeTag ? "No notes match." : "No notes yet."), filtered.map(note => {
    const isActive = activeNote?.id === note.id;
    const preview = plainText(note.body);
    return /*#__PURE__*/React.createElement("div", {
      key: note.id,
      onClick: () => openNote(note),
      style: {
        padding: "10px 10px",
        borderRadius: 9,
        marginBottom: 3,
        cursor: "pointer",
        background: isActive ? C.accentLight : "transparent",
        border: `1px solid ${isActive ? C.accent + "55" : "transparent"}`,
        transition: "background .12s"
      },
      onMouseEnter: e => {
        if (!isActive) e.currentTarget.style.background = "#F5F2EC";
      },
      onMouseLeave: e => {
        if (!isActive) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 6,
        marginBottom: 3
      }
    }, note.pinned && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: C.accent,
        flexShrink: 0,
        marginTop: 1
      }
    }, "\uD83D\uDCCC"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: note.title ? 700 : 500,
        fontSize: 13,
        color: note.title ? C.text : C.muted,
        flex: 1,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
      }
    }, note.title || "Untitled")), preview && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: C.muted,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        marginBottom: 4
      }
    }, preview), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 4,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        color: C.muted
      }
    }, relTime(note.created_at)), (note.tags || []).map(t => /*#__PURE__*/React.createElement("span", {
      key: t,
      style: {
        fontSize: 9,
        padding: "1px 6px",
        borderRadius: 8,
        background: C.blue + "18",
        color: C.blue
      }
    }, "#", t))));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 12px",
      borderTop: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: newNote,
    style: {
      width: "100%",
      padding: "9px",
      borderRadius: 9,
      border: `1.5px dashed ${C.border}`,
      background: "transparent",
      cursor: "pointer",
      fontSize: 13,
      fontFamily: "inherit",
      color: C.muted,
      fontWeight: 600,
      transition: "all .15s"
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = C.accent;
      e.currentTarget.style.color = C.accent;
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = C.border;
      e.currentTarget.style.color = C.muted;
    }
  }, "+ New note"))), !activeNote || !draft ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: C.muted,
      fontSize: 14,
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40
    }
  }, "\uD83D\uDCDD"), /*#__PURE__*/React.createElement("div", null, "Select a note or create a new one."), /*#__PURE__*/React.createElement("button", {
    onClick: newNote,
    style: {
      padding: "9px 20px",
      borderRadius: 9,
      border: "none",
      background: C.accent,
      color: "#fff",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 700,
      fontFamily: "inherit"
    }
  }, "+ New note")) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 20px",
      borderBottom: `1px solid ${C.border}`,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: draft.title,
    onChange: e => setDraft(d => ({
      ...d,
      title: e.target.value
    })),
    placeholder: "Title (optional)",
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: 20,
      fontWeight: 800,
      fontFamily: "Georgia,serif",
      color: C.text,
      background: "transparent",
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => togglePin(activeNote.id),
    title: draft.pinned ? "Unpin" : "Pin to top",
    style: {
      background: draft.pinned ? C.accentLight : "none",
      border: `1px solid ${draft.pinned ? C.accent : C.border}`,
      borderRadius: 7,
      cursor: "pointer",
      padding: "5px 9px",
      fontSize: 14,
      lineHeight: 1
    }
  }, "\uD83D\uDCCC"), /*#__PURE__*/React.createElement("button", {
    onClick: saveNote,
    style: {
      padding: "6px 16px",
      borderRadius: 7,
      border: "none",
      background: C.accent,
      color: "#fff",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 700,
      fontFamily: "inherit"
    }
  }, "Save"), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteNote(activeNote.id),
    style: {
      padding: "6px 10px",
      borderRadius: 7,
      border: `1px solid ${C.red}44`,
      background: C.red + "15",
      color: C.red,
      cursor: "pointer",
      fontSize: 13,
      fontFamily: "inherit",
      fontWeight: 600
    }
  }, "Delete"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      padding: "8px 20px",
      borderBottom: `1px solid ${C.border}`,
      flexWrap: "wrap",
      background: "#FAFAF7"
    }
  }, /*#__PURE__*/React.createElement(TB, {
    cmd: "bold",
    label: "B",
    title: "Bold"
  }), /*#__PURE__*/React.createElement(TB, {
    cmd: "italic",
    label: "I",
    title: "Italic"
  }), /*#__PURE__*/React.createElement(TB, {
    cmd: "underline",
    label: "U",
    title: "Underline"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: C.border,
      margin: "0 2px"
    }
  }), /*#__PURE__*/React.createElement(TB, {
    cmd: "insertUnorderedList",
    label: "\u2022 List"
  }), /*#__PURE__*/React.createElement(TB, {
    cmd: "insertOrderedList",
    label: "1. List"
  }), /*#__PURE__*/React.createElement(TB, {
    cmd: "removeFormat",
    label: "\u2715 fmt"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "20px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: editorRef,
    contentEditable: true,
    suppressContentEditableWarning: true,
    onInput: onEditorInput,
    "data-placeholder": "Start writing\u2026",
    style: {
      minHeight: 300,
      outline: "none",
      fontSize: 14,
      lineHeight: 1.8,
      color: C.text,
      fontFamily: "Georgia,serif",
      caretColor: C.accent
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${C.border}`,
      padding: "10px 20px",
      background: "#FAFAF7",
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap"
    }
  }, draft.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "3px 9px",
      borderRadius: 12,
      background: C.blue + "18",
      color: C.blue,
      fontSize: 12,
      fontWeight: 600
    }
  }, "#", t, /*#__PURE__*/React.createElement("button", {
    onClick: () => removeTag(t),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.blue,
      fontSize: 13,
      lineHeight: 1,
      padding: 0
    }
  }, "\xD7"))), /*#__PURE__*/React.createElement("input", {
    value: tagInput,
    onChange: e => setTagInput(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag();
      }
    },
    placeholder: "Add tag\u2026",
    style: {
      border: `1px solid ${C.border}`,
      borderRadius: 8,
      padding: "4px 10px",
      fontSize: 12,
      fontFamily: "inherit",
      outline: "none",
      background: "#fff",
      color: C.text,
      width: 100
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      fontSize: 11,
      color: C.muted
    }
  }, relTime(activeNote.created_at))))), /*#__PURE__*/React.createElement("style", null, `[contenteditable]:empty:before{content:attr(data-placeholder);color:#8A8478;pointer-events:none;}[contenteditable] p{margin:0 0 10px;}[contenteditable] ul,[contenteditable] ol{padding-left:20px;margin:0 0 10px;}[contenteditable] li{margin-bottom:4px;}`));
}

// ── Sidebar Mini Calendar ─────────────────────────────────────
function SidebarMiniCal({
  events,
  onDayClick,
  selectedDay
}) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const dim = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(d);
  const monthEvs = (events || []).filter(e => {
    const d = new Date(e.start_time);
    return d.getFullYear() === year && d.getMonth() === month;
  });
  function hasEvent(d) {
    return monthEvs.some(e => new Date(e.start_time).getDate() === d);
  }
  const monthLabel = new Date(year, month).toLocaleString("default", {
    month: "short"
  });
  const selStr = selectedDay ? selectedDay.toDateString() : null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 10px 12px",
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (month === 0) {
        setMonth(11);
        setYear(y => y - 1);
      } else setMonth(m => m - 1);
    },
    "aria-label": "Previous month",
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.muted,
      fontSize: 14,
      padding: "2px 4px",
      lineHeight: 1
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.text
    }
  }, monthLabel, " ", year), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (month === 11) {
        setMonth(0);
        setYear(y => y + 1);
      } else setMonth(m => m + 1);
    },
    "aria-label": "Next month",
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.muted,
      fontSize: 14,
      padding: "2px 4px",
      lineHeight: 1
    }
  }, "\u203A")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 1,
      marginBottom: 2
    }
  }, ["S", "M", "T", "W", "T", "F", "S"].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      textAlign: "center",
      fontSize: 9,
      fontWeight: 700,
      color: C.muted,
      padding: "1px 0"
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(7,1fr)",
      gap: 1
    }
  }, cells.map((d, i) => {
    if (!d) return /*#__PURE__*/React.createElement("div", {
      key: i
    });
    const cellDate = new Date(year, month, d);
    const isToday = cellDate.toDateString() === today.toDateString();
    const isSelected = selStr && cellDate.toDateString() === selStr;
    const dotted = hasEvent(d);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => onDayClick(cellDate),
      style: {
        textAlign: "center",
        cursor: "pointer",
        borderRadius: 5,
        padding: "3px 0 2px",
        background: isSelected ? C.accent : isToday ? C.accentLight : "transparent",
        position: "relative",
        transition: "background .1s"
      },
      onMouseEnter: e => {
        if (!isSelected && !isToday) e.currentTarget.style.background = "#E8E4DC";
      },
      onMouseLeave: e => {
        if (!isSelected && !isToday) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: isToday || isSelected ? 800 : 400,
        color: isSelected ? "#fff" : isToday ? C.accent : C.text,
        lineHeight: 1,
        display: "block"
      }
    }, d), dotted && /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        width: 3,
        height: 3,
        borderRadius: "50%",
        background: isSelected ? "rgba(255,255,255,0.7)" : isToday ? C.accent : C.muted,
        margin: "1px auto 0"
      }
    }));
  })));
}

// ── Meals & Kitchen ───────────────────────────────────────────

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEAL_SLOTS = ["breakfast", "lunch", "dinner"];
const SLOT_EMOJI = {
  breakfast: "🌅",
  lunch: "☀️",
  dinner: "🌙"
};
const SEED_RECIPES = [{
  id: "sr1",
  title: "Pasta Bolognese",
  emoji: "🍝",
  tags: ["family", "pasta", "quick"],
  time: 35,
  servings: 4,
  ingredients: ["500g beef mince", "400g spaghetti", "1 tin chopped tomatoes", "1 onion", "2 garlic cloves", "olive oil", "salt & pepper"],
  method: "Brown mince with diced onion and garlic. Add tomatoes, season well, simmer 20 min. Cook pasta al dente, toss together."
}, {
  id: "sr2",
  title: "Chicken Stir-Fry",
  emoji: "🥘",
  tags: ["healthy", "quick", "kids"],
  time: 20,
  servings: 4,
  ingredients: ["400g chicken breast", "2 peppers", "1 head broccoli", "3 tbsp soy sauce", "1 tsp sesame oil", "cooked rice"],
  method: "Slice chicken, stir-fry 5 min. Add veg, soy sauce and sesame oil. Cook 5 more min. Serve over rice."
}, {
  id: "sr3",
  title: "Banana Pancakes",
  emoji: "🥞",
  tags: ["breakfast", "kids", "sweet"],
  time: 15,
  servings: 4,
  ingredients: ["2 ripe bananas", "2 eggs", "100g plain flour", "150ml milk", "pinch of salt", "butter for frying"],
  method: "Mash bananas with eggs. Stir in flour, milk, salt to a smooth batter. Fry spoonfuls 2 min each side in butter."
}, {
  id: "sr4",
  title: "Veggie Quesadillas",
  emoji: "🫓",
  tags: ["vegetarian", "quick", "kids"],
  time: 15,
  servings: 4,
  ingredients: ["8 flour tortillas", "200g cheddar", "1 tin black beans", "1 pepper", "1 tsp cumin", "sour cream"],
  method: "Fill tortillas with drained beans, diced pepper, cumin and cheese. Fold and griddle 2 min per side until golden."
}, {
  id: "sr5",
  title: "Tomato Soup",
  emoji: "🍅",
  tags: ["family", "comforting", "easy"],
  time: 30,
  servings: 4,
  ingredients: ["800g tinned tomatoes", "1 onion", "2 garlic cloves", "500ml veg stock", "1 tbsp olive oil", "fresh basil"],
  method: "Soften onion and garlic in oil. Add tomatoes and stock, simmer 20 min. Blend until smooth. Season, top with basil."
}];
const SPOONACULAR_DEMO = [{
  id: "sp1",
  title: "Creamy Tuscan Salmon",
  emoji: "🐟",
  time: 25,
  cuisine: "Italian",
  tags: ["seafood", "quick", "healthy"],
  servings: 4,
  description: "Pan-seared salmon in a rich sun-dried tomato and spinach cream sauce. Ready in under 30 minutes."
}, {
  id: "sp2",
  title: "Black Bean Tacos",
  emoji: "🌮",
  time: 20,
  cuisine: "Mexican",
  tags: ["vegetarian", "quick", "kids"],
  servings: 4,
  description: "Crispy black bean tacos with avocado, pickled onion, coriander and chipotle crema."
}, {
  id: "sp3",
  title: "Greek Lemon Chicken",
  emoji: "🍋",
  time: 55,
  cuisine: "Greek",
  tags: ["family", "easy", "comfort"],
  servings: 6,
  description: "Roasted chicken thighs with lemon, oregano, garlic and golden roasted potatoes."
}, {
  id: "sp4",
  title: "Mushroom Risotto",
  emoji: "🍄",
  time: 40,
  cuisine: "Italian",
  tags: ["vegetarian", "comfort", "family"],
  servings: 4,
  description: "Creamy arborio rice with wild mushrooms, parmesan and white wine."
}, {
  id: "sp5",
  title: "Thai Green Curry",
  emoji: "🍛",
  time: 30,
  cuisine: "Thai",
  tags: ["quick", "family", "healthy"],
  servings: 4,
  description: "Fragrant coconut green curry with chicken, courgette, green beans and Thai basil."
}, {
  id: "sp6",
  title: "Shakshuka",
  emoji: "🍳",
  time: 25,
  cuisine: "Middle Eastern",
  tags: ["vegetarian", "breakfast", "easy"],
  servings: 4,
  description: "Eggs poached in a spiced tomato and pepper sauce. Serve with crusty bread."
}, {
  id: "sp7",
  title: "Honey Garlic Salmon",
  emoji: "🫙",
  time: 20,
  cuisine: "Asian",
  tags: ["healthy", "quick", "kids"],
  servings: 4,
  description: "Sticky honey-garlic glazed salmon fillets. 20 minutes, 6 ingredients, zero effort."
}, {
  id: "sp8",
  title: "Beef & Veg Fried Rice",
  emoji: "🍚",
  time: 20,
  cuisine: "Chinese",
  tags: ["family", "quick", "kids"],
  servings: 4,
  description: "Use up leftover rice with beef mince, peas, corn, egg and a splash of soy sauce."
}, {
  id: "sp9",
  title: "Lentil Dahl",
  emoji: "🫘",
  time: 35,
  cuisine: "Indian",
  tags: ["vegetarian", "healthy", "family"],
  servings: 6,
  description: "Red lentil dahl with coconut milk, cumin and coriander. Serves a crowd and freezes beautifully."
}, {
  id: "sp10",
  title: "Chicken Caesar Wraps",
  emoji: "🌯",
  time: 15,
  cuisine: "American",
  tags: ["quick", "kids", "healthy"],
  servings: 4,
  description: "Grilled chicken, romaine, parmesan and caesar dressing in a toasted tortilla wrap."
}, {
  id: "sp11",
  title: "Baked Mac & Cheese",
  emoji: "🧀",
  time: 45,
  cuisine: "American",
  tags: ["kids", "comfort", "family"],
  servings: 6,
  description: "Golden-baked mac and cheese with a crunchy breadcrumb topping. A crowd-pleaser."
}, {
  id: "sp12",
  title: "Prawn Pad Thai",
  emoji: "🦐",
  time: 25,
  cuisine: "Thai",
  tags: ["seafood", "quick", "healthy"],
  servings: 4,
  description: "Classic pad thai with prawns, rice noodles, peanuts, egg and fresh lime."
}];
const MEAL_TAG_FILTERS = ["all", "quick", "family", "vegetarian", "healthy", "kids", "breakfast", "comfort", "seafood"];

// callClaudeAI → use unified callClaude() defined below

function AIMealPanel() {
  const {
    family
  } = useFamilyCtx();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const recipeNames = (family.recipes || SEED_RECIPES).map(r => r.title).join(", ") || "none saved yet";
  const pantryItems = (family.pantry || []).filter(p => p.inStock).map(p => p.name).join(", ") || "none listed";
  const children = (family.children || []).map(c => `${c.name} (age ${ageOf(c.date_of_birth)})`).join(", ");
  async function suggest() {
    setOpen(true);
    setLoading(true);
    setResult("");
    setError("");
    try {
      const sys = "You are a friendly family meal-planning assistant. Keep advice warm, practical, and brief.";
      const user = `Our saved recipes: ${recipeNames}.\nPantry items we already have: ${pantryItems}.\nChildren: ${children || "young children"}.\n\nSuggest 5 varied meal ideas for the week ahead — a mix of breakfasts, lunches and dinners. Prioritise our saved recipes where they fit, and suggest 1-2 new ideas too. Keep each to one line: meal name + a brief note on why it works. Number them 1-5.`;
      const reply = await callClaude(sys, user);
      setResult(reply);
    } catch (e) {
      setError(`Couldn't reach AI: ${e.message}`);
    }
    setLoading(false);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      borderTop: `1px solid ${C.border}`,
      paddingTop: 24
    }
  }, !open ? /*#__PURE__*/React.createElement("button", {
    onClick: suggest,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "11px 22px",
      borderRadius: 12,
      border: `1.5px solid ${C.accent}`,
      background: C.accentLight,
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 700,
      fontFamily: "inherit",
      color: C.accent
    }
  }, "\u2728 AI suggest meals for this week") : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#FDF0EA,#F7EDE4)",
      border: `1px solid ${C.accent}44`,
      borderRadius: 14,
      padding: "18px 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontWeight: 700,
      fontSize: 14,
      color: C.accent
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\u2728"), " AI meal suggestions"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setOpen(false);
      setResult("");
      setError("");
    },
    "aria-label": "Close AI suggestions",
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.muted,
      fontSize: 18,
      lineHeight: 1
    }
  }, "\xD7")), loading && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.muted,
      fontSize: 13,
      fontStyle: "italic"
    }
  }, "Thinking about your week\u2026"), error && /*#__PURE__*/React.createElement("div", {
    style: {
      color: C.red,
      fontSize: 13
    }
  }, error), result && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      lineHeight: 1.8,
      color: C.text,
      fontFamily: "Georgia,serif",
      whiteSpace: "pre-wrap"
    }
  }, result), result && /*#__PURE__*/React.createElement("button", {
    onClick: suggest,
    style: {
      marginTop: 14,
      padding: "6px 16px",
      borderRadius: 8,
      border: `1px solid ${C.accent}44`,
      background: "#fff",
      cursor: "pointer",
      fontSize: 12,
      fontFamily: "inherit",
      fontWeight: 600,
      color: C.accent
    }
  }, "Suggest again")));
}
function MealsKitchen() {
  const {
    family,
    updateFamily
  } = useFamilyCtx();
  const [tab, setTab] = useState("planner");
  const recipes = family.recipes || SEED_RECIPES;
  const mealPlan = family.meal_plan || {};
  function saveRecipes(next) {
    updateFamily({
      recipes: next
    });
  }
  function saveMealPlan(next) {
    updateFamily({
      meal_plan: next
    });
  }
  const {
    confirmDialog,
    requestConfirm
  } = useConfirm();
  const [weekOffset, setWeekOffset] = useState(0);
  const getWeekDates = offset => {
    const today = new Date();
    const dow = today.getDay();
    const mon = new Date(today);
    mon.setDate(today.getDate() - (dow + 6) % 7 + offset * 7);
    return Array.from({
      length: 7
    }, (_, i) => {
      const d = new Date(mon);
      d.setDate(mon.getDate() + i);
      return d;
    });
  };
  const weekDates = getWeekDates(weekOffset);
  const todayStr = new Date().toDateString();
  const weekLabel = `${weekDates[0].toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  })} – ${weekDates[6].toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })}`;
  function planKey(d, slot) {
    return `${d.toISOString().split("T")[0]}_${slot}`;
  }
  function getMeal(d, slot) {
    return mealPlan[planKey(d, slot)] || null;
  }
  function setMeal(d, slot, val) {
    const next = {
      ...mealPlan
    };
    if (val) next[planKey(d, slot)] = val;else delete next[planKey(d, slot)];
    saveMealPlan(next);
  }
  const [picker, setPicker] = useState(null);
  const [pickerVal, setPickerVal] = useState("");
  function openPicker(d, slot) {
    setPicker({
      d,
      slot
    });
    setPickerVal(getMeal(d, slot) || "");
  }
  function confirmPicker() {
    if (picker) setMeal(picker.d, picker.slot, pickerVal.trim() || null);
    setPicker(null);
  }
  const [viewRecipe, setViewRecipe] = useState(null);
  const [editRecipe, setEditRecipe] = useState(null);
  const [recipeForm, setRecipeForm] = useState({});
  const [recipeFilter, setRecipeFilter] = useState("all");
  const [recipeSearch, setRecipeSearch] = useState("");
  function openNewRecipe() {
    setRecipeForm({
      title: "",
      emoji: "🍽️",
      tags: "",
      time: "",
      servings: "4",
      ingredients: "",
      method: ""
    });
    setEditRecipe("new");
  }
  function openEditRecipe(r) {
    setRecipeForm({
      title: r.title,
      emoji: r.emoji,
      tags: (r.tags || []).join(", "),
      time: String(r.time || ""),
      servings: String(r.servings || "4"),
      ingredients: (r.ingredients || []).join("\n"),
      method: r.method || ""
    });
    setEditRecipe(r);
  }
  function saveRecipe() {
    if (!recipeForm.title.trim()) return;
    const built = {
      id: editRecipe === "new" ? uid() : editRecipe.id,
      title: recipeForm.title.trim(),
      emoji: recipeForm.emoji || "🍽️",
      tags: recipeForm.tags.split(",").map(t => t.trim()).filter(Boolean),
      time: parseInt(recipeForm.time) || 30,
      servings: parseInt(recipeForm.servings) || 4,
      ingredients: recipeForm.ingredients.split("\n").map(s => s.trim()).filter(Boolean),
      method: recipeForm.method.trim()
    };
    saveRecipes(editRecipe === "new" ? [...recipes, built] : recipes.map(r => r.id === built.id ? built : r));
    setEditRecipe(null);
  }
  async function deleteRecipe(id) {
    const title = recipes.find(r => r.id === id)?.title || "this recipe";
    const ok = await requestConfirm({
      message: "Delete recipe?",
      detail: `"${title}" will be permanently removed from your library.`
    });
    if (!ok) return;
    saveRecipes(recipes.filter(r => r.id !== id));
    setViewRecipe(null);
    setEditRecipe(null);
  }
  function addToGrocery(r) {
    const existing = family.grocery || [];
    const newItems = (r.ingredients || []).filter(ing => !existing.find(g => g.name.toLowerCase() === ing.toLowerCase())).map(ing => ({
      id: uid(),
      name: ing,
      quantity: "",
      unit: "",
      category: "other",
      checked: false,
      source: "meal_plan",
      recipes: [r.title]
    }));
    if (newItems.length) updateFamily({
      grocery: [...existing, ...newItems]
    });
  }
  const [spoonSearch, setSpoonSearch] = useState("");
  const [spoonFilter, setSpoonFilter] = useState("all");
  const [spoonConnected, setSpoonConnected] = useState(false);
  const [spoonApiKey, setSpoonApiKey] = useState("");
  const [connectModal, setConnectModal] = useState(false);
  const filteredDiscover = SPOONACULAR_DEMO.filter(r => {
    const matchTag = spoonFilter === "all" || (r.tags || []).includes(spoonFilter);
    const matchSearch = !spoonSearch || r.title.toLowerCase().includes(spoonSearch.toLowerCase()) || (r.description || "").toLowerCase().includes(spoonSearch.toLowerCase());
    return matchTag && matchSearch;
  });
  const TabPill = ({
    id,
    label
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab(id),
    style: {
      padding: "9px 22px",
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      fontFamily: "inherit",
      fontWeight: tab === id ? 700 : 500,
      fontSize: 13,
      background: tab === id ? "#fff" : "transparent",
      color: tab === id ? C.text : C.muted,
      boxShadow: tab === id ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
      transition: "all .15s"
    }
  }, label);
  const FilterBar = ({
    value,
    onChange
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 5,
      flexWrap: "wrap"
    }
  }, MEAL_TAG_FILTERS.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => onChange(t),
    style: {
      padding: "5px 12px",
      borderRadius: 20,
      border: `1.5px solid ${value === t ? C.accent : C.border}`,
      background: value === t ? C.accentLight : "#fff",
      cursor: "pointer",
      fontSize: 11,
      fontFamily: "inherit",
      fontWeight: value === t ? 700 : 400,
      color: value === t ? C.accent : C.muted
    }
  }, t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1))));
  const PlannerTab = () => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setWeekOffset(o => o - 1),
    "aria-label": "Previous week",
    style: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      border: `1px solid ${C.border}`,
      background: "#fff",
      cursor: "pointer",
      fontSize: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setWeekOffset(0),
    style: {
      padding: "5px 14px",
      borderRadius: 20,
      border: `1px solid ${C.border}`,
      background: weekOffset === 0 ? C.accentLight : "#fff",
      color: weekOffset === 0 ? C.accent : C.text,
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "inherit"
    }
  }, "This week"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setWeekOffset(o => o + 1),
    "aria-label": "Next week",
    style: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      border: `1px solid ${C.border}`,
      background: "#fff",
      cursor: "pointer",
      fontSize: 16,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u203A")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: C.muted
    }
  }, weekLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      borderRadius: 14,
      border: `1px solid ${C.border}`,
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 640
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: `1px solid ${C.border}`
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      width: 90,
      padding: "12px 16px",
      textAlign: "left",
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: .8,
      borderRight: `1px solid ${C.border}`
    }
  }, "Meal"), weekDates.map((d, i) => {
    const isToday = d.toDateString() === todayStr;
    return /*#__PURE__*/React.createElement("th", {
      key: i,
      style: {
        padding: "12px 8px",
        textAlign: "center",
        fontSize: 12,
        fontWeight: isToday ? 900 : 600,
        color: isToday ? C.accent : C.text,
        background: isToday ? C.accentLight : "transparent",
        borderLeft: `1px solid ${C.border}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: .6,
        marginBottom: 2,
        color: isToday ? C.accent : C.muted
      }
    }, DAYS_OF_WEEK[i]), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 900
      }
    }, d.getDate()), isToday && /*#__PURE__*/React.createElement("div", {
      style: {
        width: 4,
        height: 4,
        borderRadius: "50%",
        background: C.accent,
        margin: "3px auto 0"
      }
    }));
  }))), /*#__PURE__*/React.createElement("tbody", null, MEAL_SLOTS.map((slot, si) => /*#__PURE__*/React.createElement("tr", {
    key: slot,
    style: {
      borderBottom: si < MEAL_SLOTS.length - 1 ? `1px solid ${C.border}` : "none"
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: "14px 16px",
      borderRight: `1px solid ${C.border}`,
      verticalAlign: "middle"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, SLOT_EMOJI[slot]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: .6,
      color: C.muted
    }
  }, slot))), weekDates.map((d, di) => {
    const meal = getMeal(d, slot);
    const isToday = d.toDateString() === todayStr;
    return /*#__PURE__*/React.createElement("td", {
      key: di,
      style: {
        padding: "8px",
        verticalAlign: "top",
        borderLeft: `1px solid ${C.border}`,
        background: isToday ? "#FFFBF8" : "transparent"
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: () => openPicker(d, slot),
      style: {
        minHeight: 56,
        borderRadius: 9,
        border: `1.5px ${meal ? "solid" : "dashed"} ${meal ? C.border : "#D5D0C8"}`,
        background: meal ? "#fff" : "transparent",
        cursor: "pointer",
        padding: "6px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "all .15s",
        position: "relative"
      },
      onMouseEnter: e => {
        e.currentTarget.style.borderColor = C.accent;
        e.currentTarget.style.background = C.accentLight;
      },
      onMouseLeave: e => {
        e.currentTarget.style.borderColor = meal ? C.border : "#D5D0C8";
        e.currentTarget.style.background = meal ? "#fff" : "transparent";
      }
    }, meal ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        textAlign: "center",
        lineHeight: 1.3,
        color: C.text
      }
    }, meal), /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        setMeal(d, slot, null);
      },
      style: {
        position: "absolute",
        top: 3,
        right: 4,
        background: "none",
        border: "none",
        cursor: "pointer",
        color: C.muted,
        fontSize: 13,
        lineHeight: 1,
        padding: 0
      }
    }, "\xD7")) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 18,
        color: "#C8C4BC"
      }
    }, "+")));
  })))))), picker && /*#__PURE__*/React.createElement("div", {
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
      if (e.target === e.currentTarget) setPicker(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: 28,
      width: 400,
      maxWidth: "92vw",
      boxShadow: "0 24px 60px rgba(0,0,0,0.2)",
      fontFamily: "Georgia,serif"
    },
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 17,
      marginBottom: 4
    }
  }, SLOT_EMOJI[picker.slot], " ", picker.slot.charAt(0).toUpperCase() + picker.slot.slice(1)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      marginBottom: 18
    }
  }, picker.d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
  })), /*#__PURE__*/React.createElement(Inp, {
    value: pickerVal,
    onChange: setPickerVal,
    placeholder: "Type a meal name\u2026",
    style: {
      marginBottom: 14
    }
  }), recipes.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: C.muted,
      textTransform: "uppercase",
      letterSpacing: .8,
      marginBottom: 8
    }
  }, "From your library"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6,
      marginBottom: 18
    }
  }, recipes.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.id,
    onClick: () => setPickerVal(r.title),
    style: {
      padding: "5px 11px",
      borderRadius: 20,
      border: `1px solid ${pickerVal === r.title ? C.accent : C.border}`,
      background: pickerVal === r.title ? C.accentLight : "#FAFAF7",
      cursor: "pointer",
      fontSize: 12,
      fontFamily: "inherit",
      color: pickerVal === r.title ? C.accent : C.text,
      fontWeight: pickerVal === r.title ? 700 : 400
    }
  }, r.emoji, " ", r.title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: confirmPicker,
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
  }, "Set meal"), /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    onClick: () => setPicker(null)
  }, "Cancel")))), /*#__PURE__*/React.createElement(AIMealPanel, null));
  const RecipeLibraryTab = () => {
    const filtered = recipes.filter(r => {
      const matchTag = recipeFilter === "all" || (r.tags || []).includes(recipeFilter);
      const matchSearch = !recipeSearch || r.title.toLowerCase().includes(recipeSearch.toLowerCase());
      return matchTag && matchSearch;
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 16,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("input", {
      value: recipeSearch,
      onChange: e => setRecipeSearch(e.target.value),
      placeholder: "Search recipes\u2026",
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "9px 14px",
        fontSize: 13,
        fontFamily: "inherit",
        outline: "none",
        background: "#fff",
        color: C.text,
        width: 180,
        boxSizing: "border-box"
      }
    }), /*#__PURE__*/React.createElement(FilterBar, {
      value: recipeFilter,
      onChange: setRecipeFilter
    }), /*#__PURE__*/React.createElement("button", {
      onClick: openNewRecipe,
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
        marginLeft: "auto"
      }
    }, "+ Add recipe")), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "48px 24px",
        color: C.muted,
        fontSize: 13
      }
    }, recipes.length === 0 ? "No recipes yet. Add your first one!" : "No recipes match that filter."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
        gap: 14
      }
    }, filtered.map(r => /*#__PURE__*/React.createElement("div", {
      key: r.id,
      style: {
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${C.border}`,
        padding: 20,
        cursor: "pointer",
        transition: "box-shadow .15s,transform .15s"
      },
      onClick: () => setViewRecipe(r),
      onMouseEnter: e => {
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)";
        e.currentTarget.style.transform = "translateY(-2px)";
      },
      onMouseLeave: e => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 40,
        marginBottom: 10
      }
    }, r.emoji), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 15,
        marginBottom: 6
      }
    }, r.title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 5,
        marginBottom: 10
      }
    }, (r.tags || []).slice(0, 3).map(t => /*#__PURE__*/React.createElement("span", {
      key: t,
      style: {
        fontSize: 10,
        padding: "2px 8px",
        borderRadius: 10,
        background: C.green + "18",
        color: C.green,
        fontWeight: 600
      }
    }, t))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: C.muted
      }
    }, "\u23F1 ", r.time, " min \xB7 \uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67 ", r.servings, " servings"), /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        addToGrocery(r);
      },
      style: {
        marginTop: 12,
        width: "100%",
        padding: "7px",
        borderRadius: 8,
        border: `1px solid ${C.border}`,
        background: "#FAFAF7",
        cursor: "pointer",
        fontSize: 11,
        fontWeight: 700,
        fontFamily: "inherit",
        color: C.muted
      }
    }, "\uD83D\uDED2 Add to grocery list")))), viewRecipe && /*#__PURE__*/React.createElement("div", {
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
        if (e.target === e.currentTarget) setViewRecipe(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 18,
        padding: 32,
        width: 540,
        maxWidth: "92vw",
        maxHeight: "88vh",
        overflowY: "auto",
        boxShadow: "0 28px 70px rgba(0,0,0,0.2)",
        fontFamily: "Georgia,serif"
      },
      role: "dialog",
      "aria-modal": "true",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 52,
        marginBottom: 12,
        textAlign: "center"
      }
    }, viewRecipe.emoji), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 900,
        fontSize: 22,
        marginBottom: 4,
        textAlign: "center"
      }
    }, viewRecipe.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: C.muted,
        textAlign: "center",
        marginBottom: 16
      }
    }, "\u23F1 ", viewRecipe.time, " min \xB7 \uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67 ", viewRecipe.servings, " servings"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        gap: 5,
        flexWrap: "wrap",
        marginBottom: 22
      }
    }, (viewRecipe.tags || []).map(t => /*#__PURE__*/React.createElement("span", {
      key: t,
      style: {
        fontSize: 11,
        padding: "3px 10px",
        borderRadius: 10,
        background: C.green + "18",
        color: C.green,
        fontWeight: 600
      }
    }, t))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        marginBottom: 8
      }
    }, "Ingredients"), /*#__PURE__*/React.createElement("ul", {
      style: {
        margin: "0 0 20px",
        paddingLeft: 20
      }
    }, (viewRecipe.ingredients || []).map((ing, i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        fontSize: 13,
        marginBottom: 5
      }
    }, ing))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        marginBottom: 8
      }
    }, "Method"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: C.text,
        lineHeight: 1.8,
        margin: "0 0 24px"
      }
    }, viewRecipe.method), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        addToGrocery(viewRecipe);
        setViewRecipe(null);
      },
      style: {
        padding: "9px 20px",
        borderRadius: 9,
        border: "none",
        background: C.green,
        color: "#fff",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: 13,
        fontFamily: "inherit"
      }
    }, "\uD83D\uDED2 Add to grocery"), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        openEditRecipe(viewRecipe);
        setViewRecipe(null);
      },
      style: {
        padding: "9px 20px",
        borderRadius: 9,
        border: `1px solid ${C.border}`,
        background: "#fff",
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 13,
        fontFamily: "inherit",
        color: C.muted
      }
    }, "Edit"), /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      onClick: () => deleteRecipe(viewRecipe.id)
    }, "Delete"), /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: () => setViewRecipe(null)
    }, "Close")))), editRecipe !== null && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.42)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 110
      },
      onClick: e => {
        if (e.target === e.currentTarget) setEditRecipe(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 18,
        padding: 32,
        width: 540,
        maxWidth: "92vw",
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
        marginBottom: 20
      }
    }, editRecipe === "new" ? "Add recipe" : "Edit recipe"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "56px 1fr",
        gap: 12,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Emoji"
    }, /*#__PURE__*/React.createElement("input", {
      value: recipeForm.emoji,
      onChange: e => setRecipeForm(f => ({
        ...f,
        emoji: e.target.value
      })),
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "9px",
        fontSize: 24,
        textAlign: "center",
        width: "100%",
        boxSizing: "border-box"
      }
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Title"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: recipeForm.title,
      onChange: v => setRecipeForm(f => ({
        ...f,
        title: v
      })),
      placeholder: "Recipe name"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Time (min)"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: recipeForm.time,
      type: "number",
      onChange: v => setRecipeForm(f => ({
        ...f,
        time: v
      })),
      placeholder: "30"
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Servings"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: recipeForm.servings,
      type: "number",
      onChange: v => setRecipeForm(f => ({
        ...f,
        servings: v
      })),
      placeholder: "4"
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Tags (comma sep.)"
    }, /*#__PURE__*/React.createElement(Inp, {
      value: recipeForm.tags,
      onChange: v => setRecipeForm(f => ({
        ...f,
        tags: v
      })),
      placeholder: "quick, family"
    }))), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Ingredients (one per line)"
    }, /*#__PURE__*/React.createElement("textarea", {
      value: recipeForm.ingredients,
      onChange: e => setRecipeForm(f => ({
        ...f,
        ingredients: e.target.value
      })),
      rows: 5,
      placeholder: "500g pasta\n1 onion\n2 garlic cloves",
      style: {
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 13,
        fontFamily: "inherit",
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        outline: "none",
        lineHeight: 1.6
      }
    })), /*#__PURE__*/React.createElement(FieldGroup, {
      label: "Method"
    }, /*#__PURE__*/React.createElement("textarea", {
      value: recipeForm.method,
      onChange: e => setRecipeForm(f => ({
        ...f,
        method: e.target.value
      })),
      rows: 4,
      placeholder: "Describe the cooking steps\u2026",
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
      onClick: saveRecipe,
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
    }, "Save recipe"), /*#__PURE__*/React.createElement(Btn, {
      variant: "ghost",
      onClick: () => setEditRecipe(null)
    }, "Cancel"), editRecipe !== "new" && /*#__PURE__*/React.createElement(Btn, {
      variant: "danger",
      onClick: () => deleteRecipe(editRecipe.id)
    }, "Delete")))), /*#__PURE__*/React.createElement(AIMealPanel, {
      family: family
    }));
  };
  const DiscoverTab = () => /*#__PURE__*/React.createElement("div", null, !spoonConnected && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "16px 20px",
      background: "linear-gradient(135deg,#FDF0EA,#F7EDE4)",
      border: `1px solid ${C.accent}44`,
      borderRadius: 14,
      marginBottom: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32
    }
  }, "\uD83C\uDF74"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 15,
      marginBottom: 3
    }
  }, "Connect Spoonacular for live recipes"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: C.muted,
      lineHeight: 1.6
    }
  }, "Search 380,000+ recipes with nutrition info, dietary filters, and one-click grocery push. Add your free API key to unlock live results.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setConnectModal(true),
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
  }, "Connect Spoonacular")), spoonConnected && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 16px",
      background: C.green + "12",
      border: `1px solid ${C.green}33`,
      borderRadius: 10,
      marginBottom: 20,
      fontSize: 12,
      color: C.green,
      fontWeight: 600
    }
  }, "\u2713 Spoonacular connected \xB7 Showing live results", /*#__PURE__*/React.createElement("button", {
    onClick: () => setSpoonConnected(false),
    style: {
      marginLeft: "auto",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: C.muted,
      fontSize: 12,
      fontFamily: "inherit"
    }
  }, "Disconnect")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: spoonSearch,
    onChange: e => setSpoonSearch(e.target.value),
    placeholder: "Search recipes\u2026",
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
  }), /*#__PURE__*/React.createElement(FilterBar, {
    value: spoonFilter,
    onChange: setSpoonFilter
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
      gap: 14
    }
  }, filteredDiscover.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      background: "#fff",
      borderRadius: 14,
      border: `1px solid ${C.border}`,
      padding: 20,
      display: "flex",
      flexDirection: "column",
      transition: "box-shadow .15s,transform .15s"
    },
    onMouseEnter: e => {
      e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)";
      e.currentTarget.style.transform = "translateY(-2px)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.transform = "none";
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 42,
      marginBottom: 10
    }
  }, r.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      marginBottom: 5
    }
  }, r.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,