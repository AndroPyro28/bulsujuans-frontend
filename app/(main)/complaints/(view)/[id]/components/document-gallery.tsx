"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

interface Document {
  id: string;
  public_url: string;
  public_id: string;
  createdAt: string;
}

interface DocumentGalleryProps {
  documents: Document[];
}

export function DocumentGallery({ documents }: DocumentGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Document | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenImage = (doc: Document) => {
    setSelectedImage(doc);
    setIsOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="relative group rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
          >
            <div className="aspect-square bg-muted">
              <Image
                src={doc.public_url || "/placeholder.svg"}
                alt={`Document ${doc.id}`}
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="secondary" onClick={() => handleOpenImage(doc)} className="gap-2">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" asChild className="gap-2">
                <a href={doc.public_url} download target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="sr-only">File</DialogTitle>
          {selectedImage && (
            <div className="relative w-full h-auto">
              <Image
                src={selectedImage.public_url || "/placeholder.svg"}
                alt={`Document ${selectedImage.id}`}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
              <Button asChild className="absolute bottom-4 right-4 gap-2">
                <a href={selectedImage.public_url} download target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
