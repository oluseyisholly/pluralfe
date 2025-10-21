import * as React from "react";
import { cn } from "../../lib/utils";

interface DropdownContextValue {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const DropdownMenuContext = React.createContext<DropdownContextValue | undefined>(undefined);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClick);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("mousedown", handleClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setOpen, triggerRef }}>
      <div className="relative" ref={contentRef as React.RefObject<HTMLDivElement>}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

export interface DropdownMenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ className, onClick, ...props }, forwardedRef) => {
    const context = React.useContext(DropdownMenuContext);

    if (!context) {
      throw new Error("DropdownMenuTrigger must be used within DropdownMenu");
    }

    const { isOpen, setOpen, triggerRef } = context;

    return (
      <button
        ref={(node) => {
          triggerRef.current = node ?? null;
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          }
        }}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={(event) => {
          setOpen(!isOpen);
          onClick?.(event);
        }}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-colors hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600",
          className,
        )}
        {...props}
      />
    );
  },
);

DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);

    if (!context) {
      throw new Error("DropdownMenuContent must be used within DropdownMenu");
    }

    if (!context.isOpen) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="menu"
        className={cn(
          "absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 text-sm shadow-lg",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DropdownMenuContent.displayName = "DropdownMenuContent";

export interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, onClick, children, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);

    if (!context) {
      throw new Error("DropdownMenuItem must be used within DropdownMenu");
    }

    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        className={cn(
          "flex w-full items-center justify-start rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600",
          className,
        )}
        onClick={(event) => {
          context.setOpen(false);
          onClick?.(event);
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

DropdownMenuItem.displayName = "DropdownMenuItem";
