import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";

interface ConfirmAlertDialogProps {
  open: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

function ConfirmAlertDialog({
  open = false,
  onConfirm = () => {},
  onCancel = () => {},
}: ConfirmAlertDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Is the product the same today?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will update the current product date to today.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export { ConfirmAlertDialog };
