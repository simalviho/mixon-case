import { getClaimDetailByFileNo } from "@/lib/api/claims";
import { notFound } from "next/navigation";
import { ClaimDetailShell } from "./_components/ClaimDetailShell";

type ClaimDetailPageProps = {
  params: Promise<{
    fileNo: string;
  }>;
};

export default async function ClaimDetailPage({
  params,
}: ClaimDetailPageProps) {
  const { fileNo } = await params;

  const claimDetail = await getClaimDetailByFileNo(fileNo);

  if (!claimDetail) {
    notFound();
  }

  return <ClaimDetailShell claimDetail={claimDetail} />;
}
