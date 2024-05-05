const durationParts = ["hours", "minutes", "seconds"] as const;
const durationPartLabelFormats = ["long", "short", "narrow"] as const;
const durationPartNumberFormats = ["numeric", "2-digit"] as const;

type DurationPart = typeof durationParts[number];
type DurationPartLabelFormat = typeof durationPartLabelFormats[number];
type DurationPartFormat = DurationPartLabelFormat | typeof durationPartNumberFormats[number];

export type Duration = Record<DurationPart, number>;
export type DurationFormat = Partial<Record<DurationPart, DurationPartFormat>> & {
    separator: string,
}

const durationSubStrings: Record<DurationPart, Record<DurationPartLabelFormat, string>> = {
    hours: {
        long: "hour",
        short: "hr",
        narrow: "H",
    },
    minutes: {
        long: "minute",
        short: "min",
        narrow: "M",
    },
    seconds: {
        long: "second",
        short: "sec",
        narrow: "S",
    }
};

function getDurationSubString(label: DurationPart, num: number, format: DurationPartFormat) {
    return `${String(num).padStart(format === "2-digit" ? 2 : 1, "0")}`             // format number, padded with 0 if "2-digit"
        + `${format === "long" || format === "short" ? " " : ""}`                   // format space between number and label if "long" or "short"
        + `${durationSubStrings[label][format as DurationPartLabelFormat] ?? ""}`   // add label if a option is labelled
        + `${format === "long" && num !== 1 ? "s" : ""}`;                           // pluralize label if "long"
}

export function toDurationString(durationOrMs: Duration | number, options: DurationFormat): string {
    const duration = typeof durationOrMs === "number"
        ? toDuration(durationOrMs)
        : durationOrMs;
    return durationParts.filter(label => label in options)
        .map(label => getDurationSubString(label, duration[label], options[label]!))
        .join(options.separator);
}

export function toDuration(ms: number): Duration {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    const seconds = totalSeconds - (hours * 3600) - (minutes * 60);
    return { hours, minutes, seconds };
}
