import { timelineItems as items } from "../../data/timelineItems";
import { useMemo, useState, useCallback } from "react";
import { parseISO, differenceInDays, startOfDay } from "date-fns";
import { assignLanes } from "../../utils/assign-lanes";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { cn } from "../../lib/classnames";
import { TimelineControls } from "../../components/TimelineControls";
import { TimelineVisual } from "../../components/TimelineVisual";
import { LaneInfoPanel } from "../../components/LaneInfoPanel";
import { TimelineItemDialog } from "../../components/TimelineItemDialog";
import { CalendarDays, PanelsTopLeft } from "lucide-react";

export const Timeline = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [optionShow, setOptionShow] = useState("timeline");

  const timelineData = useMemo(() => {
    if (!items || items.length === 0) return null;

    const startDate = startOfDay(
      items.reduce((min, item) => {
        const itemStart = parseISO(item.start);
        return itemStart < min ? itemStart : min;
      }, parseISO(items[0].start))
    );
    const endDate = startOfDay(
      items.reduce((max, item) => {
        const itemEnd = parseISO(item.end);
        return itemEnd > max ? itemEnd : max;
      }, parseISO(items[0].end))
    );

    const totalDays = differenceInDays(endDate, startDate) + 1;
    const lanes = assignLanes(items);

    const colorRules = [
      {
        maxDays: 3,
        borderColor: "border-timeline-success",
        backgroundColor: "bg-green-100",
      },
      {
        maxDays: 7,
        borderColor: "border-timeline-warning",
        backgroundColor: "bg-yellow-100",
      },
      {
        maxDays: Number.POSITIVE_INFINITY,
        borderColor: "border-timeline-danger",
        backgroundColor: "bg-red-100",
      },
    ];

    const itemsWithLanes = [];
    lanes.forEach((lane, laneIndex) => {
      lane.forEach((item) => {
        const startDateItem = parseISO(item.start);
        const endDateItem = parseISO(item.end);
        const durationDays = differenceInDays(endDateItem, startDateItem) + 1;
        const rule = colorRules.find(({ maxDays }) => durationDays <= maxDays);
        const borderColor = rule ? rule.borderColor : "border-timeline-danger";
        const backgroundColor = rule ? rule.backgroundColor : "bg-red-300";

        itemsWithLanes.push({
          ...item,
          lane: laneIndex,
          startDate: startDateItem,
          endDate: endDateItem,
          borderColor,
          backgroundColor,
        });
      });
    });

    const maxLane = lanes.length - 1;

    return {
      startDate,
      endDate,
      totalDays,
      items: itemsWithLanes,
      lanes,
      maxLane,
    };
  }, [items]);

  const handleZoomIn = useCallback(() => {
    console.log("handleZoomIn");
    setZoomLevel((prev) => Math.min(prev * 1.2, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    console.log("handleZoomOut");
    setZoomLevel((prev) => Math.max(prev / 1.2, 0.3));
  }, []);

  const handleItemClick = useCallback((itemId) => {
    setSelectedItem((prev) => (prev === itemId ? null : itemId));
  }, []);

  if (!timelineData) {
    return (
      <Card className="p-8 text-center bg-card border border-border shadow-sm">
        <p className="text-muted-foreground">No timeline items to display</p>
      </Card>
    );
  }

  const { startDate, endDate, items: itemsWithLanes, lanes } = timelineData;
  const modalOpen = Boolean(selectedItem);
  const onModalClose = () => setSelectedItem(null);

  return (
    <div className={cn("w-full p-4 md:p-6 lg:p-8 bg-background rounded-lg")}>
      <div className="flex items-center justify-center w-full gap-2 flex-col mb-4">
        <h1 className="text-2xl font-bold mb-4">Timeline to show tasks</h1>
        <p className="text-sm text-muted-foreground mb-4">
          This timeline shows the tasks in a timeline format. You can zoom in
          and out to see the tasks in more detail. You can also click on a task
          to see more details about it.
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Choose your option below to see the timeline or the lane info panel.
        </p>
        <div className="flex items-center justify-center w-full gap-4">
          <Button
            variant="outline"
            className="cursor-pointer bg-primary text-primary-foreground"
            size="sm"
            onClick={() => setOptionShow("timeline")}
          >
            <CalendarDays className="h-4 w-4" /> Timeline
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer bg-primary text-primary-foreground"
            size="sm"
            onClick={() => setOptionShow("laneInfoPanel")}
          >
            <PanelsTopLeft className="h-4 w-4" /> Lane Info Panel
          </Button>
        </div>
      </div>

      {optionShow === "timeline" && (
        <>
          <TimelineControls
            startDate={startDate}
            endDate={endDate}
            items={items}
            zoomLevel={zoomLevel}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
          <TimelineVisual
            timelineData={timelineData}
            zoomLevel={zoomLevel}
            selectedItem={selectedItem}
            onItemClick={handleItemClick}
          />
        </>
      )}
      {optionShow === "laneInfoPanel" && (
        <LaneInfoPanel
          lanes={lanes}
          itemsWithLanes={itemsWithLanes}
          onItemClick={handleItemClick}
        />
      )}
      <TimelineItemDialog
        modalOpen={modalOpen}
        onModalClose={onModalClose}
        selectedItem={selectedItem}
        items={items}
      />
    </div>
  );
};
