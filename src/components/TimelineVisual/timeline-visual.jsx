import { format, addDays } from "date-fns";
import { Card, CardContent } from "../ui/Card";
import { cn } from "../../lib/classnames";
import { TimelineItem } from "../TimelineItem";

export const TimelineVisual = ({
  timelineData,
  zoomLevel,
  selectedItem,
  onItemClick,
}) => {
  const { startDate, totalDays, items: itemsWithLanes, maxLane } = timelineData;

  const baseWidth = Math.max(1200, totalDays * 30 * zoomLevel);
  const laneHeight = 60;
  const timelineHeight = (maxLane + 1) * laneHeight + 100;

  return (
    <Card className="p-0 border border-border shadow-lg">
      <CardContent className="p-0">
        <div className="overflow-x-auto overflow-y-visible">
          <div
            className="relative bg-card"
            style={{
              width: baseWidth,
              height: timelineHeight,
              minWidth: "100%",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-12 border-b border-border bg-muted/30">
              {Array.from(
                { length: Math.ceil(totalDays / 30) },
                (_, monthIndex) => {
                  const monthStart = addDays(startDate, monthIndex * 30);
                  const position =
                    ((monthIndex * 30 * 30 * zoomLevel) / baseWidth) * 100;
                  return (
                    <div
                      key={`month-${monthIndex}`}
                      className="absolute top-0 h-6 flex items-center px-2 text-xs font-semibold border-r border-border bg-muted/50 text-foreground"
                      style={{ left: `${position}%`, minWidth: "60px" }}
                    >
                      {format(monthStart, "MMM yyyy")}
                    </div>
                  );
                }
              )}
              {Array.from({ length: totalDays }, (_, dayIndex) => {
                const currentDay = addDays(startDate, dayIndex);
                const position =
                  ((dayIndex * 30 * zoomLevel) / baseWidth) * 100;
                const isWeekStart = currentDay.getDay() === 1;
                const isMonthStart = currentDay.getDate() === 1;
                return (
                  <div
                    key={`day-${dayIndex}`}
                    className={cn(
                      "absolute h-full flex items-center justify-center text-xs",
                      isMonthStart && "font-semibold text-primary",
                      isWeekStart && !isMonthStart && "font-medium",
                      !isWeekStart && !isMonthStart && "text-muted-foreground"
                    )}
                    style={{
                      left: `${position}%`,
                      top: "24px",
                      width: `${((30 * zoomLevel) / baseWidth) * 100}%`,
                      minWidth: "24px",
                      borderRight: isWeekStart
                        ? "1px solid hsl(var(--border))"
                        : "none",
                    }}
                  >
                    {zoomLevel >= 0.6 && (
                      <span className="transform -rotate-45 origin-center whitespace-nowrap text-[10px]">
                        {isMonthStart
                          ? format(currentDay, "MMM dd")
                          : format(currentDay, "dd")}
                      </span>
                    )}
                    {zoomLevel < 0.6 &&
                      (isMonthStart || (isWeekStart && zoomLevel >= 0.4)) && (
                        <span className="transform -rotate-45 origin-center whitespace-nowrap text-[10px]">
                          {isMonthStart
                            ? format(currentDay, "MMM")
                            : format(currentDay, "dd")}
                        </span>
                      )}
                  </div>
                );
              })}
            </div>

            <div className="absolute top-12 left-8 right-0 bottom-0">
              {itemsWithLanes.map((item) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  startDate={startDate}
                  baseWidth={baseWidth}
                  zoomLevel={zoomLevel}
                  laneHeight={laneHeight}
                  isSelected={selectedItem === item.id}
                  onItemClick={onItemClick}
                />
              ))}
            </div>

            <div className="absolute top-12 left-8 right-0 bottom-0 pointer-events-none">
              {Array.from({ length: totalDays }, (_, dayIndex) => {
                const position =
                  ((dayIndex * 30 * zoomLevel) / (baseWidth - 32)) * 100;
                const currentDay = addDays(startDate, dayIndex);
                const isWeekStart = currentDay.getDay() === 1;
                const isMonthStart = currentDay.getDate() === 1;
                return (
                  <div
                    key={`grid-${dayIndex}`}
                    className={cn(
                      "absolute top-0 bottom-0",
                      isMonthStart && "w-0.5 bg-border/40",
                      isWeekStart && !isMonthStart && "w-px bg-border/25",
                      !isWeekStart &&
                        !isMonthStart &&
                        zoomLevel >= 0.75 &&
                        "w-px bg-border/10"
                    )}
                    style={{ left: `${position}%` }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
