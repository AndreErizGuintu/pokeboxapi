"use client";
type Props = { value: string; arialabel?: string };
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Check, Clipboard } from "lucide-react";

export default function Copybutton({
  value,
  arialabel = "Copy to Clipboard",
}: Props) {

const [ok, setOk] = useState(false);


  return (
    <Button
      variant={"outline"}
      size={"sm"}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setOk(true);
        setTimeout(() => setOk(false), 2000);
      }}
      aria-label={arialabel}
    >
        {ok ? <Check/> : <Clipboard className="h-4 w-4" />}
      
    </Button>
  );
}
