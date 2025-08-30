import React from "react";
import { LoaderIcon } from "lucide-react";

function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-black">
      <LoaderIcon className="w-12 h-12 text-white animate-spin" />
    </div>
  );
}

export default PageLoading;
