import React from 'react';

export function ContributionsGrid() {
  // Month labels logic: last month is always current month, spread evenly
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const now = new Date();
  const currentMonthIdx = now.getMonth();
  // Get last 12 months, ending with current month
  const last12Months = Array.from({length: 12}).map((_, i) => {
    const idx = (currentMonthIdx - 11 + i + 12) % 12;
    return months[idx];
  });

  // Spread month labels across 52 weeks
  const weekCount = 52;
  const monthLabelPositions = Array(12).fill(0).map((_, i) => Math.round(i * weekCount / 12));

  return (
    <div className="mt-8 sm:mt-12">
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 text-foreground flex items-center gap-2">
        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect width="24" height="24" rx="4" fill="#161b22"/><path d="M7 12h10M12 7v10" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/></svg>
        Contributions in the last year
      </h3>
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="flex flex-col gap-1 px-2 sm:items-center">
          {/* Month labels, spread across grid (hidden on mobile for clarity) */}
          <div className="hidden sm:flex gap-0.5 ml-10 text-xs text-muted-foreground relative" style={{minWidth: weekCount * 14}}>
            {Array.from({length: weekCount}).map((_, weekIdx) => {
              const monthIdx = monthLabelPositions.indexOf(weekIdx);
              return (
                <span key={weekIdx} className="w-3 text-center block" style={{position:'relative'}}>
                  {monthIdx !== -1 ? last12Months[monthIdx] : ''}
                </span>
              );
            })}
          </div>
          {/* Days and grid */}
          <div className="flex gap-1">
            <div className="hidden sm:flex flex-col justify-between mr-1 text-xs text-muted-foreground h-24">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            {/* Grid: 52 weeks x 7 days */}
            <div className="flex gap-0.5">
              {Array.from({length: weekCount}).map((_, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-0.5">
                  {Array.from({length: 7}).map((_, dayIdx) => {
                    // Simulate contribution levels
                    const levels = ['bg-[#161b22]','bg-green-900','bg-green-700','bg-green-500','bg-green-400','bg-green-300'];
                    // Make it look realistic: more recent weeks are greener
                    let level = 0;
                    if (weekIdx > 44) level = Math.floor(Math.random()*3)+3;
                    else if (weekIdx > 36) level = Math.floor(Math.random()*4)+2;
                    else if (weekIdx > 24) level = Math.floor(Math.random()*3)+1;
                    else if (weekIdx > 12) level = Math.floor(Math.random()*2)+1;
                    else level = Math.floor(Math.random()*2);
                    return <div key={dayIdx} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-[3px] ${levels[level]}`}></div>;
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 text-[11px] sm:text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-[3px] bg-[#161b22] border border-border"></span>
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-[3px] bg-green-900"></span>
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-[3px] bg-green-700"></span>
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-[3px] bg-green-500"></span>
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-[3px] bg-green-400"></span>
              <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-[3px] bg-green-300"></span>
            </div>
            <span>More</span>
          </div>
          <div className="sm:hidden text-[11px] text-muted-foreground mt-1">Scroll horizontally to view all weeks</div>
        </div>
      </div>
    </div>
  );
}
