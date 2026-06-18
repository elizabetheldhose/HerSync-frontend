import { useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useHealth } from "../context/HealthContext";
import HealthChat from "../components/HealthChat";
import API from "../services/api";

export default function HealthPage() {
  const { entries, saveEntry } = useHealth();
  console.log("health entries", entries);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mood, setMood] = useState("");
  const [water, setWater] = useState("");
  const [sleep, setSleep] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [period, setPeriod] = useState(false);

  const [aiInsight, setAiInsight] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const [insightLoading, setInsightLoading] = useState(false);
  const [insightText, setInsightText] = useState(null);
  const [insightError, setInsightError] = useState(null);

  const formatDate = (date) =>
    new Date(date).toISOString().split("T")[0];

  const selectedDateString = formatDate(selectedDate);

  /* ===============================
     DAILY ENTRY
  =============================== */

  const dailyEntry = entries.find(
    (e) => formatDate(e.date) === selectedDateString
  );

  /* ===============================
     PERIOD DAYS (LOGGED)
  =============================== */

  const periodDays = useMemo(() => {
    return entries
      .filter((e) => e.period)
      .map((e) => formatDate(e.date));
  }, [entries]);

  /* ===============================
     FUTURE PREDICTION
  =============================== */

  const predictedPeriodDays = useMemo(() => {
    const cycleLength = 28;
    const periodLength = 5;

    if (!entries.length) return [];

    const periodEntries = entries
      .filter((e) => e.period)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (!periodEntries.length) return [];

    const lastStart = new Date(
      periodEntries[periodEntries.length - 1].date
    );

    const addDays = (date, days) => {
      const d = new Date(date);
      d.setDate(d.getDate() + days);
      return d;
    };

    const nextStart = addDays(lastStart, cycleLength);

    return Array.from({ length: periodLength }, (_, i) =>
      formatDate(addDays(nextStart, i))
    );
  }, [entries]);

  /* ===============================
     SUMMARY DATA
  =============================== */

  const avgSleep =
    entries.length > 0
      ? (
          entries.reduce(
            (sum, e) => sum + Number(e.sleep || 0),
            0
          ) / entries.length
        ).toFixed(1)
      : 0;

  const periodDates = entries
    .filter((e) => e.period)
    .map((e) => new Date(e.date))
    .sort((a, b) => b - a);

  const lastPeriod = periodDates[0];

  const predictedNext =
    lastPeriod &&
    new Date(
      lastPeriod.getTime() + 28 * 24 * 60 * 60 * 1000
    );

  /* ===============================
     SAVE ENTRY
  =============================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await saveEntry({
      date: selectedDateString,
      mood,
      water,
      sleep,
      symptoms,
      period,
    });

    console.log("Saved entry:", res);
    setShowChat(true);
    // Backend returns aiInsight
    if (res?.aiInsight) {
      setAiInsight(res.aiInsight);
      setShowChat(true);
    }

    setMood("");
    setWater("");
    setSleep("");
    setSymptoms("");
    setPeriod(false);
  };


  const handleGetInsight = async () => {
    setInsightLoading(true);
    setInsightError(null);
    setInsightText(null);
    try {
      const recent = entries.slice(-10);
      const res = await API.post("/ai/health-insight", { entries: recent });
      setInsightText(res.data.insight ?? res.data.aiInsight ?? "No insight returned.");
    } catch {
      setInsightError("Unable to get AI insight. Please try again later.");
    } finally {
      setInsightLoading(false);
    }
  };

  const getCyclePhase = (selectedDate, lastPeriod) => {
  if (!lastPeriod) return "Unknown";

  const diff =
    (new Date(selectedDate) - new Date(lastPeriod)) /
    (1000 * 60 * 60 * 24);

  if (diff <= 5) return "Menstrual";
  if (diff <= 13) return "Follicular";
  if (diff <= 15) return "Ovulatory";
  return "Luteal";
};
  /* ===============================
     RENDER
  =============================== */

  return (
    <div className="space-y-6 md:space-y-8 
                bg-rose-50 
                p-4 md:p-6 
                rounded-2xl md:rounded-3xl 
                overflow-x-hidden">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-rose-600">
          Flow & Wellness
        </h1>
        <p className="text-sm md:text-base text-rose-400 mt-1">
          Track your cycle and daily wellbeing
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

        <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-rose-100">
          <p className="text-2xl md:text-3xl text-rose-400">
            Average Sleep
          </p>
          <p className="text-2xl md:text-3xl font-bold text-rose-600 mt-2">
            {avgSleep} hrs
          </p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-rose-100">
          <p className="text-sm text-rose-400">
            Last Period
          </p>
          <p className="text-xl font-bold text-pink-500 mt-2">
            {lastPeriod
              ? lastPeriod.toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-sm border border-rose-100">
          <p className="text-sm text-rose-400">
            Predicted Next
          </p>
          <p className="text-xl font-bold text-rose-500 mt-2">
            {predictedNext
              ? predictedNext.toLocaleDateString()
              : "N/A"}
          </p>
        </div>

      </div>

      {/* CALENDAR + FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* CALENDAR */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 ">
<div className="overflow-x-auto">
 <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{
              period: (date) =>
                periodDays.includes(formatDate(date)),
              predicted: (date) =>
                predictedPeriodDays.includes(
                  formatDate(date)
                ),
            }}
            modifiersClassNames={{
              period:
                "bg-rose-500 text-white rounded-full",
              predicted:
                "border-2 border-dashed border-rose-500 text-rose-500 rounded-full",

                 selected: "bg-indigo-600 text-white rounded-full shadow-md",
            }}
          />
</div>
         

         <div className="flex flex-wrap gap-4 text-xs md:text-sm mt-4 text-slate-500">
  <div className="flex items-center gap-2">
    <span className="h-3 w-3 bg-rose-500 rounded-full"></span>
    Period
  </div>

  <div className="flex items-center gap-2">
    <span className="h-3 w-3 border-2 border-dashed border-rose-500 rounded-full"></span>
    Predicted
  </div>

  <div className="flex items-center gap-2">
    <span className="h-3 w-3 bg-emerald-400 rounded-full"></span>
    Logged Entry
  </div>
</div>


        </div>

        

        {/* FORM */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100 space-y-4">

            <h3 className="text-lg font-semibold text-yellow-600">
              Cycle Phase: {getCyclePhase(selectedDate, lastPeriod)}
            </h3>

         <h3 className="text-base md:text-lg font-semibold text-rose-600">
  <span className="md:hidden">
    {selectedDate.toLocaleDateString()}
  </span>
  <span className="hidden md:block">
    {selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}
  </span>
</h3>

          <form onSubmit={handleSubmit} className="space-y-3">

            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full border border-rose-200 p-2 rounded-xl"
            >
              <option value="">Select Mood</option>
              <option>Happy</option>
              <option>Calm</option>
              <option>Low Energy</option>
              <option>Irritated</option>
            </select>

            <input
              type="number"
              placeholder="Water Intake (glasses)"
              value={water}
              onChange={(e) => setWater(Number(e.target.value))}
              className="w-full border border-rose-200 p-2 rounded-xl"
            />

            <input
              type="number"
              placeholder="Sleep Hours"
              value={sleep}
              onChange={(e) => setSleep(Number(e.target.value))}

              className="w-full border border-rose-200 p-2 rounded-xl"
            />

            <textarea
              placeholder="Symptoms / Notes"
              value={symptoms}
              onChange={(e) =>
                setSymptoms(e.target.value)
              }
              className="w-full border border-rose-200 p-2 rounded-xl"
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={period}
                onChange={(e) =>
                  setPeriod(e.target.checked)
                }
              />
              <label className="text-rose-500">
                Period Day
              </label>
            </div>

            <button className="w-full bg-rose-500 text-white py-2 rounded-xl hover:bg-rose-400 transition">
              Save Entry
            </button>

          </form>

        </div>

      </div>

      {/* AI INSIGHTS */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-rose-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-rose-600">AI Wellness Insight</h3>
            <p className="text-xs text-rose-300 mt-0.5">Based on your last 10 logged entries</p>
          </div>
          <button
            type="button"
            onClick={handleGetInsight}
            disabled={insightLoading || entries.length === 0}
            className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-xl
                       text-sm hover:bg-rose-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {insightLoading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Thinking…
              </>
            ) : "Get AI Insight"}
          </button>
        </div>

        {insightError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 rounded-xl p-4 text-sm">
            {insightError}
          </div>
        )}

        {insightText && (
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 text-sm
                          text-rose-800 leading-relaxed whitespace-pre-line">
            {insightText}
          </div>
        )}

        {!insightText && !insightError && !insightLoading && (
          <p className="text-sm text-rose-300 text-center py-2">
            {entries.length === 0
              ? "Log at least one entry to unlock AI insights."
              : "Click \"Get AI Insight\" for a personalized wellness summary."}
          </p>
        )}
      </div>

      {/* CHAT */}
      {showChat && (
        <HealthChat initialInsight={aiInsight} />
      )}

    </div>
  );
}
