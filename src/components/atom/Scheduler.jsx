import { Scheduler } from "@aldabil/react-scheduler";

function SchedulerComp({ dataSource = [] }) {
    // transform data server -> format scheduler
    const events = dataSource.map((item) => ({
        event_id: item.schedule_id,
        title: `Pattern: ${item.repeat_pattern}`, // bisa diganti misalnya "Daily Schedule"
        start: new Date(item.start_time * 1000), // epoch (detik) -> Date
        end: new Date(item.end_time * 1000),
    }));
    return <Scheduler view="month" events={events} editable={false} />;
}

export default SchedulerComp;
