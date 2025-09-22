import { Scheduler } from "@aldabil/react-scheduler";

function SchedulerComp({ dataSource = [] }) {
    const events =
        dataSource &&
        dataSource.flatMap((item) => {
            const startDate = new Date(item.start_date);
            const endDate = new Date(item.end_date);

            const [sh, sm, ss] = item.start_time.split(":").map(Number);
            const [eh, em, es] = item.end_time.split(":").map(Number);

            const days = [];
            const current = new Date(startDate);

            while (current <= endDate) {
                const start = new Date(current);
                start.setHours(sh, sm, ss, 0);

                const end = new Date(current);
                end.setHours(eh, em, es, 0);

                days.push({
                    event_id: `${item.schedule_id}-${current.toISOString().split("T")[0]}`,
                    title: `${item.playlist} (${item.repeat_pattern})${
                        item.is_urgent ? " 🚨" : ""
                    }`,
                    start,
                    end,
                });

                current.setDate(current.getDate() + 1); // lanjut ke hari berikutnya
            }

            return days;
        });

    return <Scheduler view="month" events={events} editable={false} day={{ navigation: false }} />;
}

export default SchedulerComp;
