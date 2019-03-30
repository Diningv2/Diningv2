import getHours from "./getHours";

export default async function getOneLocation(data, query) {
    const location = data.DATA.filter(
        entry => entry[data.COLUMNS.indexOf("ID_LOCATION")] == query.location
    );
    if (location.length) {
        const entry = location[0];
        return {
            name: entry[data.COLUMNS.indexOf("DININGLOCATIONNAME")],
            todayHours: await getHours(query.location, 0),
            tomorrowHours: await getHours(query.location, 1),
            isOpen: parseFloat(entry[data.COLUMNS.indexOf("ISCLOSED")])
                ? false
                : true,
            busyness: parseInt(entry[data.COLUMNS.indexOf("CAPACITY")]),
            geolocation: entry[data.COLUMNS.indexOf("GEOLOCATION")]
                .split(",")
                .map(v => parseFloat(v))
        };
    } else {
        throw new Error("Invalid location request");
    }
}
