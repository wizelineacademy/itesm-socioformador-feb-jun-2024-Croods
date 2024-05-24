export default function BubbleText({ text }: { text: string }) {
  return (
    <div className="max-w-fit rounded-full bg-gray-800 px-3 py-1 text-center text-white">
      {text}
    </div>
  );
}
