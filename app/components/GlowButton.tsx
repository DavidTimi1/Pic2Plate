import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";

export const GlowInput = ({onSubmitMealDescription}: {onSubmitMealDescription: (value: string)=> void }) => {
  return (
    <form  onSubmit={handleSubmit} className="w-full sm:min-w-[500px] p-1 group focus-within:[&_.bg-glow-effect]:opacity-0">
      <div className="absolute top-0 left-0 bg-glow-effect rounded-xl"/>
      <div className="bg-background w-full rounded-xl">
      <Input
      name="description"
        type="text"
        placeholder="Describe that tempting meal ..."
        className="bg-background rounded-xl outline-none border-none pr-5"
      />
      <Button type='submit' className="p-1 bg-hwite absolute top-1/2 -translate-y-1/2 right-0">
        <div className="h-full flex items-center justify-center aspect-square rounded-lg bg-primary text-white">
          <SendIcon size={30} />
        </div>
      </Button>
      </div>
    </form>
  );

  function handleSubmit(e) {
    e.preventDefault();    
    const form = e.target;
    onSubmitMealDescription(form.description.value);
  }
};
