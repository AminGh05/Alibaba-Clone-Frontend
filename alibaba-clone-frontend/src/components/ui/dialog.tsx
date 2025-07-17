import { useEffect } from "react";

export interface DialogProps
  extends React.DialogHTMLAttributes<HTMLDialogElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
}) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onOpenChange]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={() => onOpenChange(false)}
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="flex flex-col gap-4">{children}</div>;

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="mb-2">{children}</div>;

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <h2 className="text-lg font-semibold">{children}</h2>;

export const DialogFooter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="flex justify-end gap-2 mt-4">{children}</div>;
