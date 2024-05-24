export default function BubbleText({ text }: { text: string }) {
  return (
    <div className="bg-gray-800 text-white rounded-full px-3 py-1 text-center max-w-fit">
      {text}
    </div>
  );
}
