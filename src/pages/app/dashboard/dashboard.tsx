import { Helmet } from "react-helmet-async";
import { CardMonthRevenue } from "./card-month-revenue";
import { CardMonthOrdersAmount } from "./card-month-orders-amount";
import { CardDayOrdersAmount } from "./card-day-orders-amount";
import { CardMonthCanceledOrdersAmount } from "./card-month-canceled-orders-amount";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <CardMonthRevenue />
          <CardMonthOrdersAmount />
          <CardDayOrdersAmount />
          <CardMonthCanceledOrdersAmount />
        </div>
      </div>
    </>
  );
}
