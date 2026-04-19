import { isUserInsertedNode } from "@/lib/utils/claim-detail";
import type { ClaimDisplayProcessNode } from "@/types/index";
import {
  renderInsertedProcessNode,
  renderSystemProcessNode,
} from "../process-node-registry";

type ProcessNodeRendererProps = {
  processNode: ClaimDisplayProcessNode;
};

export function ProcessNodeRenderer({ processNode }: ProcessNodeRendererProps) {
  if (isUserInsertedNode(processNode)) {
    return renderInsertedProcessNode(processNode);
  }

  return renderSystemProcessNode(processNode);
}
