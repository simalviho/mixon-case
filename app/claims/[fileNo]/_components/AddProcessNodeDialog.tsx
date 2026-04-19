"use client";

import { Paperclip, Plus, StickyNote } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useClaimDetailUiStore } from "@/stores/claim-detail-ui-store";
import { ClaimProcessNodeTitleEnum } from "@/types/index";

type AddProcessNodeDialogProps = {
  insertAfterTitle: ClaimProcessNodeTitleEnum;
};

export function AddProcessNodeDialog({
  insertAfterTitle,
}: AddProcessNodeDialogProps) {
  const addInformationNote = useClaimDetailUiStore(
    (state) => state.addInformationNote,
  );
  const addAdditionalAttachment = useClaimDetailUiStore(
    (state) => state.addAdditionalAttachment,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("note");

  const [noteValue, setNoteValue] = useState("");
  const [fileNameValue, setFileNameValue] = useState("");
  const [documentTypeValue, setDocumentTypeValue] = useState("");

  const resetForm = () => {
    setNoteValue("");
    setFileNameValue("");
    setDocumentTypeValue("");
    setActiveTab("note");
  };

  const closeDialog = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleAddNote = () => {
    const normalizedNoteValue = noteValue.trim();

    if (normalizedNoteValue.length === 0) {
      return;
    }

    addInformationNote(normalizedNoteValue, insertAfterTitle);
    closeDialog();
  };

  const handleAddAttachment = () => {
    const normalizedFileNameValue = fileNameValue.trim();
    const normalizedDocumentTypeValue = documentTypeValue.trim();

    if (
      normalizedFileNameValue.length === 0 ||
      normalizedDocumentTypeValue.length === 0
    ) {
      return;
    }

    addAdditionalAttachment(
      normalizedFileNameValue,
      normalizedDocumentTypeValue,
      insertAfterTitle,
    );
    closeDialog();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(nextOpenState) => {
        setIsOpen(nextOpenState);

        if (!nextOpenState) {
          resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Plus className="size-4" />
          Add
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Add intermediate process node</DialogTitle>
          <DialogDescription>
            Add a note or an attachment after{" "}
            <span className="font-medium text-foreground">
              {insertAfterTitle}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="note" className="gap-2">
              <StickyNote className="size-4" />
              Information note
            </TabsTrigger>
            <TabsTrigger value="attachment" className="gap-2">
              <Paperclip className="size-4" />
              Attachment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="note" className="mt-4 space-y-4">
            <Textarea
              value={noteValue}
              onChange={(event) => setNoteValue(event.target.value)}
              placeholder="Example: Customer confirmed vehicle is available for inspection on Monday."
              className="min-h-32"
            />

            <DialogFooter>
              <Button variant="ghost" onClick={closeDialog}>
                Cancel
              </Button>
              <Button onClick={handleAddNote}>Add note</Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="attachment" className="mt-4 space-y-4">
            <Input
              value={documentTypeValue}
              onChange={(event) => setDocumentTypeValue(event.target.value)}
              placeholder="Document type"
            />

            <Input
              value={fileNameValue}
              onChange={(event) => setFileNameValue(event.target.value)}
              placeholder="File name"
            />

            <DialogFooter>
              <Button variant="ghost" onClick={closeDialog}>
                Cancel
              </Button>
              <Button onClick={handleAddAttachment}>Add attachment</Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
