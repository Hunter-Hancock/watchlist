import { Skeleton } from "@/components/ui/skeleton";

export default function CardLoading() {
  return (
    <Skeleton className="flex flex-col items-center justify-end w-64 h-96">
      <Skeleton className="w-full h-6 bg-neutral-500" />
      <Skeleton className="w-full h-6 bg-neutral-400" />
    </Skeleton>
  );
}
