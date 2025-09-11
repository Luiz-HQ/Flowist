import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function TaskCard({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: string;
}) {
  return (
    <>
      <Card className="w-full max-w-2xl p-2 rounded-[4px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <div className="flex justify-end gap-1.5 mt-2">
            <Button className="size-[25px] bg-transparent hover:bg-transparent shadow-none transition-transform duration-200 ease-in-out hover:scale-140">
              <Icon className="text-blue-500" icon="tabler:edit" />
            </Button>
            <Button className="size-[25px] bg-transparent hover:bg-transparent shadow-none transition-transform duration-200 ease-in-out hover:scale-140">
              <Icon
                className="text-red-500"
                icon="material-symbols:delete-outline"
              />
            </Button>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}
