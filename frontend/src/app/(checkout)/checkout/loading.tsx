import { RiLoader3Fill } from "@remixicon/react";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <RiLoader3Fill className="animate-spin" />
    </div>
  );
}
