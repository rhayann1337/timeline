import { format, parseISO, differenceInDays } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";

export const TimelineItemDialog = ({
  modalOpen,
  onModalClose,
  selectedItem,
  items,
}) => {
  const item = items.find((i) => i.id === selectedItem);
  const duration = item
    ? differenceInDays(parseISO(item.end), parseISO(item.start)) + 1
    : 0;

  return (
    <Dialog open={modalOpen} onOpenChange={(open) => !open && onModalClose()}>
      <DialogContent>
        {item && (
          <>
            <DialogHeader>
              <DialogTitle>{item.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4 text-foreground">
              <div>
                <span className="font-medium">Start Date:</span>{" "}
                {format(parseISO(item.start), "MMM dd, yyyy")}
              </div>
              <div>
                <span className="font-medium">End Date:</span>{" "}
                {format(parseISO(item.end), "MMM dd, yyyy")}
              </div>
              <div>
                <span className="font-medium">Duration:</span> {duration} day
                {duration !== 1 ? "s" : ""}
              </div>
            </div>
            {item.description && (
              <div className="mt-4">
                <span className="font-medium">Description:</span>
                <p className="text-muted-foreground mt-1">{item.description}</p>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
