import ThankYou from "../../_components/thak-you";

interface Props {
  params: Promise<{ key: string }>;
}

const ThankYouPage = async ({ params }: Props) => {
  const anonymousKey = (await params).key;
  return <ThankYou anonymousKey={anonymousKey} />;
};

export default ThankYouPage;
