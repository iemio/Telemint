import Checkout from "../../_components/checkout";
import { findOneGroup } from "@/lib/fetch/group.fetch";
import { P } from "@/components/custom/p";
import { randomBytes } from "crypto";

interface Props {
  params: Promise<{ id: string }>;
}

const CheckoutPage = async ({ params }: Props) => {
  const groupId = (await params).id;
  const anonymousKey = randomBytes(10).toString("hex");

  const res = await findOneGroup(groupId);

  const group = res.result;

  if (!group) return <P>{res.message}</P>;

  return <Checkout group={group} anonymousKey={anonymousKey} />;
};

export default CheckoutPage;
