import DashboardHeader from "@/components/layout/dashboardHeader";
import TaskCard from "@/components/layout/taskCard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <div className="flex flex-col items-center justify-start w-full bg-gray-100">
        <div className="h-28 bg-white flex flex-col items-center justify-start pt-5 gap-y-4 w-full border-b">
          <h1 className="flex items-center justify-center gap-x-1 text-2xl font-semibold">
            Bem vindo <p className="font-normal">Luiz Henrique</p>
          </h1>
          <h2 className="flex justify-between w-1/2 text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <p>3 - A fazer</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <p>5 - Em andamento</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p>2 - Concluído</p>
            </div>
          </h2>
        </div>
      </div>
    </>
  );
}
