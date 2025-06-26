"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "@/lib/better-auth/auth-client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { paragraphVariants } from "@/components/custom/p";
import { RiClipboardFill, RiLogoutCircleFill } from "@remixicon/react";
import { toast } from "sonner";

const HeaderProfile = () => {
  const session = useSession();
  const router = useRouter();

  const { isPending, data } = session;
  return (
    <>
      {isPending && <Skeleton className="size-10 rounded-full" />}

      <DropdownMenu>
        <DropdownMenuTrigger>
          {!isPending && (
            <Avatar>
              <AvatarImage src={data?.user?.image as string} />
              <AvatarFallback>
                {(data?.user?.name as string)?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="px-2">
          <DropdownMenuLabel
            className={cn(
              paragraphVariants({ size: "medium", weight: "bold" })
            )}
          >
            Action
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center justify-center gap-2 px-3 py-4"
            onClick={() => {
              navigator.clipboard
                .writeText(data?.user.id || "")
                .then(() =>
                  toast("Copied!", {
                    description: "User key is copied",
                  })
                )
                .catch((err) => toast("Failed!", { description: `${err}` }));
            }}
          >
            <RiClipboardFill />
            <span
              className={cn(
                paragraphVariants({ size: "small", weight: "medium" })
              )}
            >
              User Key
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center justify-center gap-2 px-3 py-4"
            onClick={async () => {
              await signOut();

              router.push("/sign-in");
            }}
          >
            <RiLogoutCircleFill />
            <span
              className={cn(
                paragraphVariants({ size: "small", weight: "medium" })
              )}
            >
              Log Out
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default HeaderProfile;
