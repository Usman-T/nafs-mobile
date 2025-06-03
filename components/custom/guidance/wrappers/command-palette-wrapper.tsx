"use client";
import { useCommandPalette } from "@/components/custom/guidance/context/command-palette-context";
import CommandPalette from "@/components/ui/command";

const CommandPaletteWrapper = () => {
  const { open, setOpen } = useCommandPalette();

  return <CommandPalette isOpen={open} onClose={() => setOpen(false)} />;
};

export default CommandPaletteWrapper;
