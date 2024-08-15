"use client"

import { useAppState } from "@/providers/app-provider"
import { useEffect } from "react";

const Workspace = ({params: { workspaceId }}) => {
  const { currentWorkspace, setCurrentWorkspace } = useAppState()
  
  useEffect(() => {
    if (currentWorkspace !== workspaceId) {
      setCurrentWorkspace(workspaceId);
    }
  }, [workspaceId]);

  return (<>{currentWorkspace}</>)
}

export default Workspace