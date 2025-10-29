import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export type NewsPaginationProps = {
  totalPages: number;
  page: number;
};

const NewsPagination = ({ page, totalPages }: NewsPaginationProps) => {
  return (
    <div className="flex justify-between items-center mt-4 pt-4 border-t">
      <Button variant="outline" size="sm" disabled={page === 1} onClick={() => {}}>
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => {}}>
        Next
      </Button>
    </div>
  );
};

export default NewsPagination;
