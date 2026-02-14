import { cn } from "@/lib/utils";

type StripePosition = string;

function VerticalStripes({ positions }: { positions: StripePosition[] }) {
  return positions.map((pos, idx) => (
    <div
      key={idx}
      className={cn(
        "absolute w-10 h-full",
        pos,
        "bg-[repeating-linear-gradient(315deg,var(--repeating-lines)_0,var(--repeating-lines)_0.5px,transparent_0,transparent_50%)]",
        "bg-size-[12px_12px]",
        "border-l border-r border-border"
      )}
    />
  ));
}

export function HorizontalStripe({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-full h-10",
        "bg-[repeating-linear-gradient(45deg,var(--repeating-lines)_0,var(--repeating-lines)_0.5px,transparent_0,transparent_50%)]",
        "bg-size-[12px_12px]",
        "border-t border-b border-border",
        className
      )}
    />
  );
}

function GridLines({ offsets }: { offsets: StripePosition[] }) {
  return offsets.map((offset, idx) => (
    <div
      key={idx}
      className={cn("absolute w-px h-full bg-border", offset)}
    />
  ));
}

export function HeroLayoutGuides() {
  return (
    <>
      <div className="hidden min-[1282px]:block">
        <VerticalStripes positions={["left-0", "left-28", "right-28", "right-0"]} />
      </div>
      <div className="pointer-events-none z-0 inset-0 absolute hidden min-[1282px]:block">
        <div className="mx-auto max-w-4xl relative h-full">
          <GridLines offsets={["left-0", "-left-5", "right-0", "-right-5"]} />
        </div>
      </div>
    </>
  )
}

export function HeroLayoutGuidesMin() {
  return (
    <>
      {/* <div className="block min-[1282px]:hidden">
        <VerticalStripes positions={["left-0", "left-28", "right-28", "right-0"]} />
      </div> */}
      <div className="pointer-events-none z-0 inset-0 fixed hidden min-[570px]:block min-[1282px]:hidden">
        <div className="mx-auto max-w-4xl w-[calc(100%-2.5rem)] relative h-full">
          <GridLines offsets={["left-0", "-left-5", "right-0", "-right-5"]} />
        </div>
      </div>
    </>
  )
}

export function SecondPageLayoutGuides() {
  return (
    <>
      <div className="hidden lg:block">
        <VerticalStripes positions={["left-0", "left-28", "right-28", "right-0"]} />
      </div>
      {/* <div className="pointer-events-none z-0 inset-0 absolute">
                <div className="mx-auto max-w-4xl relative h-full">
                    <GridLines offsets={["left-0", "-left-5", "right-0", "-right-5"]} />
                </div>
            </div> */}
    </>
  )
}