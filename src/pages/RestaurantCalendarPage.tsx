import { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getUserReservations } from "@/services/reservationService";

const localizer = momentLocalizer(moment);

export default function RestaurantCalendarPage() {
  const [view, setView] = useState<View>(Views.MONTH);
  const [eventos, setEventos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReservas() {
      setIsLoading(true);
      const reservas = await getUserReservations();
      console.log("RESERVAS DO MOCK:", reservas);
      // Converter reservas para eventos do calendário
      const eventos = reservas.map((reserva: any) => {
        // Tratar datas no formato brasileiro (dd/MM/yyyy)
        const [day, month, year] = reserva.date.split("/").map(Number);
        const [hour, minute] = reserva.time.split(":").map(Number);
        const fullYear = year < 100 ? 2000 + year : year;
        const start = new Date(fullYear, month - 1, day, hour, minute);
        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
        return {
          id: reserva.id,
          title: `Reserva - ${reserva.restaurantName}`,
          start,
          end,
          mesa: reserva.mesa,
          pessoas: reserva.partySize,
        };
      });
      setEventos(eventos);
      setIsLoading(false);
    }
    fetchReservas();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Calendário de Reservas</h1>
      <button
        onClick={() => (window.location.href = "/restaurantes")}
        className="mb-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
      >
        Fazer uma nova reserva
      </button>
      <div className="bg-white rounded-lg shadow p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <span className="ml-4">Carregando reservas...</span>
          </div>
        ) : (
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={[Views.MONTH, Views.WEEK]}
            view={view}
            onView={(newView) => setView(newView)}
            messages={{
              month: "Mês",
              week: "Semana",
              day: "Dia",
              today: "Hoje",
              previous: "Anterior",
              next: "Próximo",
              agenda: "Agenda",
              showMore: (total) => `+${total} mais`,
            }}
            eventPropGetter={() => ({
              style: {
                backgroundColor: "#a78bfa",
                color: "#fff",
                borderRadius: 6,
              },
            })}
          />
        )}
      </div>
    </div>
  );
}
