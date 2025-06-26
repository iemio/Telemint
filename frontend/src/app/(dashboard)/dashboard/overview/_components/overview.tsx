"use client";

import OverviewProfile from "./overview-profile";
import CustomersTable from "./customers-table";
import TransactionTable from "./transaction-table";
import OverviewStats from "./overview-stats";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { axiosDashboardInstance } from "@/lib/axios/config";
import { ApiResponse, OverviewResponse } from "@/@types/response";
import { toast } from "sonner";
import useWebsocket from "@/hooks/use-websocket";
import socket from "@/lib/socket/config";

export type QueryRes = UseQueryResult<
  ApiResponse<OverviewResponse | null>,
  Error
>;

const Overview = ({ userId }: { userId: string }) => {
  const queyClient = useQueryClient();

  const query = useQuery({
    queryKey: ["overview"],
    queryFn: async () =>
      (
        await axiosDashboardInstance.get<ApiResponse<OverviewResponse | null>>(
          "/overview"
        )
      ).data,
  });

  // webhook/paddle
  useWebsocket(() => {
    socket.on("update-overview", () => {
      queyClient.invalidateQueries({ queryKey: ["overview"] });
    });
  }, userId);

  if (query.error) {
    toast("Error", {
      description: query.data?.message,
    });
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <OverviewProfile />

        {/* Stats Overview */}
        <OverviewStats query={query} />

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {/* Customers Section */}
          <CustomersTable query={query} />

          {/* Transactions Section */}
          <TransactionTable query={query} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
