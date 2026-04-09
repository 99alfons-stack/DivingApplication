import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "./cn";

type SheetContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SheetContext = createContext<SheetContextValue | null>(null);

function useSheetContext() {
  const ctx = useContext(SheetContext);
  if (!ctx) {
    throw new Error("Sheet components must be used within <Sheet>");
  }
  return ctx;
}

export function Sheet({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>;
}

export function SheetTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: ReactNode;
}) {
  const { setOpen } = useSheetContext();

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ onClick?: () => void }>;
    return cloneElement(child, {
      onClick: () => {
        child.props.onClick?.();
        setOpen(true);
      },
    });
  }

  return <button onClick={() => setOpen(true)}>{children}</button>;
}

export function SheetContent({
  className,
  children,
}: HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = useSheetContext();
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/40">
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default"
        aria-label="Close panel"
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-[min(92vw,420px)] overflow-y-auto bg-white p-6 shadow-2xl",
          className
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export function SheetHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 space-y-1", className)} {...props} />;
}

export function SheetTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-lg font-semibold text-gray-900", className)} {...props} />;
}

export function SheetDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-gray-600", className)} {...props} />;
}
