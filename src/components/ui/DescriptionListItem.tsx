import React from "react";
import { Skeleton } from "./skeleton";

interface DescriptionListItem {
  label: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

function DescriptionListItem({ children, label, isLoading }: DescriptionListItem) {
  if (isLoading) {
    return (
      <div className="flex">
        <Skeleton variant="text" className="w-48" />
      </div>
    );
  }

  return (
    <div className="flex">
      <dt className="font-semibold after:content-[':\00a0']">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default DescriptionListItem;
