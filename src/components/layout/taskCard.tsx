import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TaskCard() {
  return (
    <>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Tarefas Pendentes
          </CardTitle>
          <CardDescription>
            Aqui estão suas tarefas pendentes para hoje.
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
