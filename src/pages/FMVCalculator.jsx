import { useState, useMemo } from "react";

const HCP_DATA = [
  // Tier 1 — ₹11,000/hr
  { id: 1, name: "Siddhant Jain",        vendorCode: "100809033", tier: 1, specialty: "Cardiovascular Disease", category: "A", hourlyRate: 11000 },
  { id: 2, name: "Priya Mehta",          vendorCode: "100809041", tier: 1, specialty: "Hematology",             category: "A", hourlyRate: 11000 },
  { id: 3, name: "Rajesh Kulkarni",      vendorCode: "100809057", tier: 1, specialty: "Oncology",               category: "A", hourlyRate: 11000 },
  { id: 4, name: "Ananya Bose",          vendorCode: "100809062", tier: 1, specialty: "Endocrinology",          category: "A", hourlyRate: 11000 },
  // Tier 2 — ₹7,350/hr
  { id: 5, name: "Preeti Sharma",        vendorCode: "100774823", tier: 2, specialty: "General Practitioner",  category: "B", hourlyRate: 7350 },
  { id: 6, name: "Samir Kubba",          vendorCode: "100774826", tier: 2, specialty: "Gastroenterology",      category: "B", hourlyRate: 7350 },
  { id: 7, name: "Santosh Kumar Agarwal",vendorCode: "100808415", tier: 2, specialty: "Pediatrics",            category: "B", hourlyRate: 7350 },
  { id: 8, name: "Divya Nair",           vendorCode: "100808429", tier: 2, specialty: "Allergology",           category: "B", hourlyRate: 7350 },
  // Tier 3 — ₹5,000/hr
  { id: 9,  name: "Nakul Sinha",         vendorCode: "100772789", tier: 3, specialty: "General Practitioner",  category: "C", hourlyRate: 5000 },
  { id: 10, name: "Meena Pillai",        vendorCode: "100772801", tier: 3, specialty: "Dermatology",           category: "C", hourlyRate: 5000 },
  { id: 11, name: "Arjun Tiwari",        vendorCode: "100772815", tier: 3, specialty: "Psychiatry",            category: "C", hourlyRate: 5000 },
  { id: 12, name: "Sunita Reddy",        vendorCode: "100772830", tier: 3, specialty: "Ophthalmology",         category: "C", hourlyRate: 5000 },
];

const ACTIVITIES = ["Remote Meetings", "Advisory Board", "Speaker Program", "Consulting Call"];

const DEFAULT_TIMES = {
  serviceTime:     { h: 1, m: 0 },
  preparationTime: { h: 1, m: 0 },
  travelTime:      { h: 0, m: 0 },
};

// Policy-defined caps — static display, not editable
const MAX_TIMES = {
  serviceTime:     { h: 4, m: 0 },
  preparationTime: { h: 2, m: 0 },
  travelTime:      { h: 3, m: 0 },
};

function fmt(t) {
  return `${String(t.h).padStart(2, "0")}:${String(t.m).padStart(2, "0")}`;
}

function toHours(t) {
  return t.h + t.m / 60;
}

function TimeControl({ value, onChange, max }) {
  const maxMins = max ? max.h * 60 + max.m : 23 * 60 + 59;
  const atMax = value.h * 60 + value.m >= maxMins;
  const atMin = value.h === 0 && value.m === 0;

  const adjust = (delta) => {
    let total = value.h * 60 + value.m + delta;
    if (total < 0) total = 0;
    if (total > maxMins) total = maxMins;
    onChange({ h: Math.floor(total / 60), m: total % 60 });
  };

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => adjust(-30)}
        disabled={atMin}
        className={`w-6 h-6 rounded flex items-center justify-center text-sm font-bold transition-colors
          ${atMin ? "text-slate-200 cursor-not-allowed" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"}`}
      >−</button>
      <span className={`w-12 text-center text-sm font-semibold tabular-nums border rounded-lg py-1 transition-colors
        ${atMax ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-slate-50 border-slate-200 text-slate-700"}`}>
        {fmt(value)}
      </span>
      <button
        type="button"
        onClick={() => adjust(30)}
        disabled={atMax}
        className={`w-6 h-6 rounded flex items-center justify-center text-sm font-bold transition-colors
          ${atMax ? "text-slate-200 cursor-not-allowed" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"}`}
      >+</button>
    </div>
  );
}

function TierBadge({ tier }) {
  const styles = {
    1: "bg-violet-100 text-violet-700 border-violet-200",
    2: "bg-sky-100 text-sky-700 border-sky-200",
    3: "bg-slate-100 text-slate-600 border-slate-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${styles[tier]}`}>
      Tier {tier}
    </span>
  );
}

export default function FMVCalculator() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(HCP_DATA[0]);
  const [activity, setActivity] = useState(ACTIVITIES[0]);
  const [times, setTimes] = useState(DEFAULT_TIMES);
  const [eventId] = useState("EM-0000411276");

  const filtered = useMemo(() =>
    HCP_DATA.filter(h =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.vendorCode.includes(search)
    ), [search]);

  const serviceAmt     = Math.round(toHours(times.serviceTime)     * selected.hourlyRate);
  const preparationAmt = Math.round(toHours(times.preparationTime) * selected.hourlyRate);
  const travelAmt      = Math.round(toHours(times.travelTime)      * selected.hourlyRate);
  const total          = serviceAmt + preparationAmt + travelAmt;

  const handleReset = () => {
    setTimes(DEFAULT_TIMES);
    setMaxTimes(MAX_TIMES);
    setActivity(ACTIVITIES[0]);
  };

  const handleSelect = (hcp) => {
    setSelected(hcp);
    setTimes(DEFAULT_TIMES);
    setMaxTimes(MAX_TIMES);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="w-24" />
        <h1 className="text-sm font-bold tracking-wide text-slate-700">FMV Calculator</h1>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-medium text-slate-500">Event ID</span>
          <span className="font-mono font-semibold text-slate-700 bg-slate-100 rounded px-2 py-0.5">{eventId}</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left — search & list */}
        <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search HCP…"
                className="w-full text-xs rounded-lg border border-slate-200 bg-slate-50 pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder-slate-400"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">⌕</span>
            </div>
          </div>

          {/* HCP list */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 min-h-0">
            {filtered.map(hcp => (
              <button
                key={hcp.id}
                type="button"
                onClick={() => handleSelect(hcp)}
                className={`w-full text-left px-4 py-3 transition-colors
                  ${selected.id === hcp.id ? "bg-blue-50 border-l-2 border-l-blue-500" : "hover:bg-slate-50 border-l-2 border-l-transparent"}
                `}
              >
                <p className={`text-xs font-semibold truncate ${selected.id === hcp.id ? "text-blue-700" : "text-slate-700"}`}>
                  {hcp.name}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{hcp.vendorCode}</p>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-8">No results found</p>
            )}
          </div>
        </aside>

        {/* Right — detail + calculator */}
        <main className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">

          {/* HCP Info card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">HCP Profile</p>
              <TierBadge tier={selected.tier} />
            </div>
            <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3">
              {[
                { label: "HCP Name",              value: selected.name },
                { label: "External ID / Vendor",  value: selected.vendorCode },
                { label: "Tier",                  value: `Tier ${selected.tier}` },
                { label: "Specialty",             value: selected.specialty },
                { label: "Category",              value: selected.category },
                { label: "Base Hourly Rate (INR)", value: `₹${selected.hourlyRate.toLocaleString("en-IN")}` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1">
            <div>
              {/* Card header */}
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Service Type</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-slate-400">HCP Activity</p>
                  <div className="relative">
                    <select
                      value={activity}
                      onChange={e => setActivity(e.target.value)}
                      className="appearance-none text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                      {ACTIVITIES.map(a => <option key={a}>{a}</option>)}
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]">▼</span>
                  </div>
                </div>
              </div>

              {/* Table — 4 cols: label | actual | max | amount */}
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-5 py-2.5 text-left text-[10px] font-bold uppercase tracking-widest text-slate-400 w-44"></th>
                    <th className="px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 border-l border-slate-100">Actual</th>
                    <th className="px-4 py-2.5 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400 border-l border-slate-100">Max</th>
                    <th className="px-5 py-2.5 text-right text-[10px] font-bold uppercase tracking-widest text-slate-400 border-l border-slate-100">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: "serviceTime",     label: "Service Time",     amount: serviceAmt },
                    { key: "preparationTime", label: "Preparation Time", amount: preparationAmt },
                    { key: "travelTime",      label: "Travel Time",      amount: travelAmt },
                  ].map(({ key, label, amount }, i, arr) => (
                    <tr key={key} className={i < arr.length - 1 ? "border-b border-slate-100" : ""}>
                      <td className="px-5 py-4 text-xs font-semibold text-slate-600">{label}</td>
                      <td className="px-4 py-4 text-center border-l border-slate-100">
                        <div className="flex justify-center">
                          <TimeControl
                            value={times[key]}
                            onChange={val => setTimes(prev => ({ ...prev, [key]: val }))}
                            max={MAX_TIMES[key]}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center border-l border-slate-100">
                        <span className="inline-block w-12 text-center text-sm font-semibold tabular-nums border border-slate-100 bg-slate-50 text-slate-400 rounded-lg py-1">
                          {fmt(MAX_TIMES[key])}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right border-l border-slate-100">
                        <span className="text-sm font-bold tabular-nums text-slate-800">
                          {amount === 0
                            ? <span className="text-slate-300 font-normal">—</span>
                            : `₹${amount.toLocaleString("en-IN")}`
                          }
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total bar */}
            <div className="border-t border-slate-200 bg-slate-50 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Fair Market Value</p>
                <button
                  type="button"
                  onClick={() => setTimes({
                    serviceTime:     MAX_TIMES.serviceTime,
                    preparationTime: MAX_TIMES.preparationTime,
                    travelTime:      MAX_TIMES.travelTime,
                  })}
                  className="text-[11px] font-semibold text-blue-600 border border-blue-200 bg-blue-50 rounded-full px-3 py-1 hover:bg-blue-100 transition-colors"
                >
                  Use Max Hours
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] font-semibold text-slate-500 border border-slate-200 bg-white rounded-full px-3 py-1 hover:bg-slate-50 transition-colors"
                >
                  ↺ Reset Fields
                </button>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-slate-900 tabular-nums">
                  ₹{total.toLocaleString("en-IN")}
                </p>
                <span className="text-xs font-semibold text-slate-400">INR</span>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
