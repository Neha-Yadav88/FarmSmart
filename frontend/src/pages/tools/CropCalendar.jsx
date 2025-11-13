import { useState } from "react";

export default function CropCalendar() {
  const [loading, setLoading] = useState(false);
  const [calendarText, setCalendarText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [error, setError] = useState("");

  // Typing animation
  const startTypingEffect = (fullText) => {
    setDisplayedText("");
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[index]);
      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 18);
  };

  // Generate Calendar
  const handleGenerate = async () => {
    setError("");
    setCalendarText("");
    setDisplayedText("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/crop/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scope: "yearly_india" }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Unable to generate calendar. Please try again.");
        setLoading(false);
        return;
      }

      setCalendarText(data.calendar);
      startTypingEffect(data.calendar);
    } catch (err) {
      setError("Server connection failed. Please check your internet connection.");
    }

    setLoading(false);
  };

  // Month colors for cards
  const getMonthColor = (index) => {
    const colors = [
      "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200",
      "bg-gradient-to-br from-green-50 to-green-100 border-green-200", 
      "bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200",
      "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
      "bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200",
      "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200",
      "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200",
      "bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200",
      "bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200",
      "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200",
      "bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200",
      "bg-gradient-to-br from-lime-50 to-lime-100 border-lime-200"
    ];
    return colors[index % colors.length];
  };

  // Month emojis
  const getMonthEmoji = (month) => {
    const emojiMap = {
      january: "🥶", february: "🌷", march: "🌸", april: "🌦️",
      may: "☀️", june: "🌞", july: "⛱️", august: "🌻",
      september: "🍂", october: "🎃", november: "🍁", december: "🎄"
    };
    return emojiMap[month.toLowerCase()] || "📅";
  };

  // Filter months that have crop information
  const getAvailableMonths = (text) => {
    if (!text) return [];
    
    return text
      .split(/\n\n+/)
      .filter((block) => block.trim() !== "")
      .filter((block) => {
        const [monthLine, ...rest] = block.split("\n");
        const details = rest.join("\n").toLowerCase();
        
        // Only include months that have actual crop information
        // Exclude months with "no specific crops" or similar phrases
        const hasCrops = !details.includes('no specific crop') && 
                        !details.includes('no crops') &&
                        !details.includes('off-season') &&
                        details.trim().length > 10;
        
        return hasCrops;
      });
  };

  const availableMonths = getAvailableMonths(displayedText);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg mx-auto mb-4">
            📅
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            AI Crop Calendar
          </h1>
          <p className="text-gray-600 text-lg">
            Smart monthly farming schedule for better crop planning
          </p>
        </div>

        {/* Generate Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 mb-8 text-center">
          <p className="text-gray-700 mb-4 text-lg">
            Get a complete month-wise crop calendar with planting and harvesting schedules.
          </p>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <span>✨</span>
                Generate Calendar
              </>
            )}
          </button>

          {error && (
            <p className="text-red-600 mt-4 bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </p>
          )}
        </div>

        {/* Calendar Output */}
        {displayedText && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                📋 Crop Growing Seasons
              </h2>
              <p className="text-gray-600">
                Showing {availableMonths.length} months with available crops
              </p>
            </div>

            {/* Calendar Cards Grid - Fixed dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {availableMonths.map((block, index) => {
                const [monthLine, ...rest] = block.split("\n");
                const month = monthLine.replace(":", "").replace("*", "").trim();
                const details = rest.join("\n");

                return (
                  <div
                    key={index}
                    className={`${getMonthColor(index)} rounded-2xl shadow-lg border-2 p-5 transition-all duration-300 hover:shadow-md h-80 flex flex-col`}
                  >
                    {/* Month Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-2xl">
                        {getMonthEmoji(month)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-800 capitalize">
                          {month.toLowerCase()}
                        </h3>
                        <div className="text-xs text-gray-500 font-medium">
                          Growing Season
                        </div>
                      </div>
                    </div>

                    {/* Month Content - Fixed height with scroll */}
                    <div className="flex-1 overflow-y-auto">
                      <div className="text-gray-700 text-sm leading-6 whitespace-pre-line">
                        {details}
                      </div>
                    </div>

                    {/* Activity Count */}
                    <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-xs text-gray-500 font-medium">
                          🌱 {details.split('\n').filter(line => line.trim()).length} crop activities
                        </div>
                      </div>
                  </div>
                );
              })}
            </div>

            {/* No Crops Message */}
            {availableMonths.length === 0 && displayedText && (
              <div className="text-center py-8 bg-yellow-50 rounded-2xl border border-yellow-200">
                <div className="text-4xl mb-4">🌾</div>
                <h3 className="text-xl font-bold text-yellow-800 mb-2">
                  No Active Growing Seasons
                </h3>
                <p className="text-yellow-600">
                  Currently no crops are in season. Try generating again or check different months.
                </p>
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="text-center py-4">
                <div className="text-green-600 font-bold animate-pulse">
                  Generating crop calendar... ▌
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}