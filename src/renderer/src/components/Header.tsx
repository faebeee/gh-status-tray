import { Button } from "@renderer/components/ui/button";
import { XIcon } from "lucide-react";

export const Header = () => {
  const onClick = () => {
    window.app.closeApp();
  }

  return <div className={'flex flex-row justify-between items-center pt-2 pb-2 sticky top-0 bg-background'}>
      <h1 className={'text-1xl'}>GH Status</h1>
      <div>
        <Button className={'cursor-pointer'} variant={'ghost'} onClick={onClick}>
            <XIcon/>
        </Button>
      </div>
  </div>
}
