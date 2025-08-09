import { format, parseISO } from "date-fns";
import { Card, CardContent } from "../ui/Card";
import { cn } from "../../lib/classnames";

export const LaneInfoPanel = ({ lanes, itemsWithLanes, onItemClick }) => (
  <Card className="mt-4 border border-border shadow-lg">
    <CardContent className="p-4">
      <h3 className="font-semibold text-lg mb-3 text-foreground">
        Lane Distribution
      </h3>
      <div className="text-sm text-muted-foreground mb-4">
        {lanes.length} lanes for {itemsWithLanes.length} items
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lanes.map((lane, laneIndex) => (
          <div
            key={laneIndex}
            className="p-3 bg-muted/30 rounded-lg border border-border"
          >
            <div className="font-medium text-sm mb-2 flex items-center justify-between text-foreground">
              <span>Lane {laneIndex + 1}</span>
              <span className="text-xs text-muted-foreground">
                {lane.length} item{lane.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-1">
              {lane.map((item) => {
                const itemWithLane = itemsWithLanes.find(
                  (i) => i.id === item.id
                );
                return (
                  <div
                    key={item.id}
                    className={cn(
                      "text-xs p-2 rounded cursor-pointer hover:bg-muted/50 transition-colors",
                      "bg-card border border-border border-l-4",
                      itemWithLane?.borderColor
                    )}
                    onClick={() => onItemClick(item.id)}
                  >
                    <div className="font-medium text-foreground">
                      {item.name}
                    </div>
                    <div className="text-muted-foreground">
                      {format(parseISO(item.start), "MMM dd")} -{" "}
                      {format(parseISO(item.end), "MMM dd")}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
