const fs = require('fs');
const { parse } = require('csv-parse/sync');

module.exports = {
    replay: replay = (req) => {
        const trajectories = [];
        var startTime, endTime = undefined;
        fs.readdirSync("../data/replay/").forEach((file) => {
            var file_content = fs.readFileSync(`../data/replay/${file}`);
            const content = parse(file_content, {
                columns: true,
                skip_empty_lines: true
            });
            var start = content[0].timestamp * 1000;
            var end = content[content.length-1].timestamp * 1000;

            if (startTime == undefined || endTime == undefined){
                startTime = start;
                endTime = end;
            }
            if (start <  startTime){
                startTime = start;
            }
            if (end > endTime){
                endTime = end;
            }

            var positions = [];
            var label = [];
            content.forEach((data)=>{
                positions.push(new Date(data.timestamp * 1000).toISOString(), data.long, data.lat, data.alt/3.2808)
                label.push({
                    "interval": new Date(data.timestamp * 1000).toISOString() + '/' + new Date(end).toISOString(),
                    "string": `${file}\n${data.alt}ft ${data.gspeed}kt`
                })
            })

            const trajectory = {
                "id": file,
                "availability": `${new Date(start).toISOString()}/${new Date(end).toISOString()}`,
                "position": {
                    "cartographicDegrees": positions
                },
                "point": {
                    "pixelSize": 5,
                    "color": {
                        "rgba": [39, 245, 106, 215]
                    }
                },
                "path": {
                    "leadTime": 0,
                    "trailTime": 20,
                    "distanceDisplayCondition": {
                        "distanceDisplayCondition": [0, 1000000]
                    },
                    // "resolution": 600.0,
                    // "material": {
                    //     "polylineDash": {}
                    // }
                },
                "label": {
                    "text": label,
                    "font": "9px sans-serif",
                    "horizontalOrigin": "LEFT",
                    "pixelOffset": {
                        "cartesian2": [20, 20],
                    },
                    "distanceDisplayCondition": {
                        "distanceDisplayCondition": [0, 1000000]
                    },
                    "showBackground": true,
                    "backgroundColor": {
                        "rgba": [0, 0, 0, 50]
                    }
                }
            }
            trajectories.push(trajectory);
        })

        const document = {
            "id": "document",
            "name": "simulated trajectories",
            "version": "1.0",
            "clock": {
                "interval": `${new Date(startTime).toISOString()}/${new Date(endTime).toISOString()}`,
                "currentTime": `${new Date(startTime).toISOString()}`
            }
        }
        trajectories.unshift(document);
        return trajectories;
    }
}