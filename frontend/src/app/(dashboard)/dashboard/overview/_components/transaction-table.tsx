"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { P } from "@/components/custom/p";
import { QueryRes } from "./overview";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const TransactionTable = ({ query }: { query: QueryRes }) => {
  const { data: res, isLoading, error } = query;

  let transactions = res?.result?.transactionDetails;

  if (error) {
    transactions = [];
  }
  return (
    <Card className="border-none">
      <CardContent className="p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
        </div>
        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-12 rounded-md" />
            ))}
          </div>
        )}
        {transactions?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 p-3">
              <DollarSign className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-4 text-sm font-medium">No transactions yet</h3>
            <P
              size="small"
              weight="medium"
              variant="muted"
              className="mt-2 text-center"
            >
              Your recent transactions will appear here.
            </P>
          </div>
        ) : (
          <>
            {!isLoading && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions &&
                    transactions.length > 0 &&
                    transactions?.map((transaction) => (
                      <TableRow key={transaction._id}>
                        <TableCell>
                          {format(transaction.createdAt, "dd-MMM-yyy")}
                        </TableCell>
                        <TableCell className="font-medium">
                          ${transaction.price}
                        </TableCell>
                        <TableCell>Subscription</TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                              transaction.status === "paid" &&
                                "text-green-700 bg-green-50",
                              transaction.status === "created" &&
                                "bg-yellow-50 text-yellow-500"
                            )}
                          >
                            {transaction.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionTable;
