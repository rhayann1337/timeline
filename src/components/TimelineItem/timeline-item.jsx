import { format, differenceInDays } from "date-fns";
import { cn } from "../../lib/classnames";

export const TimelineItem = ({
  item,
  startDate,
  baseWidth,
  zoomLevel,
  laneHeight,
  isSelected,
  onItemClick,
}) => {
  const startOffset = differenceInDays(item.startDate, startDate);
  const duration = differenceInDays(item.endDate, item.startDate) + 1;
  const calculatedWidth =
    ((duration * 30 * zoomLevel) / (baseWidth - 32)) * 100;
  const left = ((startOffset * 30 * zoomLevel) / (baseWidth - 32)) * 100;
  const top = item.lane * laneHeight + 10;

  const minWidthPercentage = ((2 * 30 * zoomLevel) / (baseWidth - 32)) * 100;
  const width = Math.max(calculatedWidth, minWidthPercentage);

  const tooltipTop = top < 100 ? "top-full mt-2" : "bottom-full mb-2";
  const tooltipLeft =
    left < 25
      ? "left-0"
      : left > 75
      ? "right-0"
      : "left-1/2 transform -translate-x-1/2";
  const arrowTop =
    top < 100 ? "bottom-full border-b-popover" : "top-full border-t-popover";
  const arrowLeft =
    left < 25
      ? "left-4"
      : left > 75
      ? "right-4"
      : "left-1/2 transform -translate-x-1/2";

  return (
    <div
      className={cn(
        "absolute rounded-md shadow-sm transition-all duration-200 cursor-pointer group",
        "bg-card border border-border border-l-4",
        item.borderColor,
        item.backgroundColor,
        "hover:shadow-md hover:scale-[1.02] hover:z-10",
        isSelected && "ring-2 ring-primary ring-offset-2 z-20 scale-[1.02]"
      )}
      style={{
        left: `${left}%`,
        width: `${Math.max(width, minWidthPercentage)}%`,
        top: `${top}px`,
        height: `${laneHeight - 20}px`,
        opacity: isSelected ? 1 : 0.9,
      }}
      onClick={() => onItemClick(item.id)}
    >
      <div className="h-full flex items-center px-3 text-foreground overflow-hidden">
        <div className="min-w-0 flex-1">
          <div className="font-medium text-sm truncate">{item.name}</div>
          <div className="text-xs opacity-90 text-muted-foreground truncate">
            {format(item.startDate, "MMM dd")} -{" "}
            {format(item.endDate, "MMM dd")}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "absolute px-3 py-2 bg-popover text-popover-foreground text-sm rounded-md shadow-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap max-w-xs",
          tooltipLeft,
          tooltipTop
        )}
      >
        <div className="font-semibold text-foreground">{item.name}</div>
        <div className="text-xs text-muted-foreground mt-1">
          📅 {format(item.startDate, "MMM dd, yyyy")} →{" "}
          {format(item.endDate, "MMM dd, yyyy")}
        </div>
        <div className="text-xs text-muted-foreground">
          ⏱️ {duration} day{duration !== 1 ? "s" : ""} • Lane {item.lane + 1}
        </div>
        {item.description && (
          <div className="text-xs mt-2 text-foreground border-t border-border pt-2">
            {item.description}
          </div>
        )}
        <div
          className={cn(
            "absolute w-0 h-0 border-4 border-transparent",
            arrowTop,
            arrowLeft
          )}
        />
      </div>
    </div>
  );
};
