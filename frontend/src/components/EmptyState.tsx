import { Inbox } from "lucide-react";

export default function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center text-gray-500 py-8">
      <Inbox size={28} />
      <p className="mt-2 text-sm">{text}</p>
    </div>
  );
}
