import { format } from "date-fns";
import { Button } from "../ui/Button";
import { ZoomIn, ZoomOut, Calendar } from "lucide-react";

export const TimelineControls = ({
  startDate,
  endDate,
  items,
  zoomLevel,
  onZoomIn,
  onZoomOut,
}) => (
  <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-card rounded-lg border border-border shadow-sm">
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium text-foreground">
        {format(startDate, "MMM dd, yyyy")} - {format(endDate, "MMM dd, yyyy")}
      </span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {items.length} items
      </span>
    </div>
    <div className="flex items-center gap-2 ml-auto">
      <Button
        variant="outline"
        className="cursor-pointer"
        size="sm"
        onClick={onZoomOut}
        disabled={zoomLevel <= 0.3}
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <span className="text-sm px-2 text-foreground">
        {Math.round(zoomLevel * 100)}%
      </span>
      <Button
        variant="outline"
        className="cursor-pointer"
        size="sm"
        onClick={onZoomIn}
        disabled={zoomLevel >= 3}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
    </div>
  </div>
);
