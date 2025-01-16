import {
    addDays,
    isValid,
    formatDistanceToNow,
    differenceInDays,
    fromUnixTime,
    getUnixTime,
    addMinutes,
    isPast,
} from 'date-fns'
import format from 'date-fns/format'
import dayjs from 'dayjs'

const localizedFormat = require('dayjs/plugin/localizedFormat')
const utc = require('dayjs/plugin/utc')

dayjs.extend(localizedFormat)
dayjs.extend(utc)

export const DateFormat = {
    date: 'MM/dd/yyyy',
    dateTime: 'MMM dd, yyyy',
    dateMonthTime: 'dd MMM yyyy, hh:mm a',
    monthDate: 'MMM yyyy',
    dateTimeWithAt: "MMM dd, yyyy 'at' hh:mm a",
    time: 'hh:mm a',
}
export const DayJSDateFormat = {
    date: 'DD MMM YYYY',
    dateMonth: 'LL',
    // dateMonth: 'DD MMMM YYYY',
    dateTime: 'DD MMM YYYY, hh:mma',
    dateTimeWithAt: "MMM DD, YYYY 'at' hh:mm a",
    time: 'hh:mm a',
    dayMonth: 'DD MMM',
}

export class DateUtility {
    static dateToString(date, formatStr = DateFormat.dateTime) {
        if (!date) return ''
        const NewDate = new Date(date)
        if (isValid(NewDate)) {
            return format(NewDate, formatStr, {})
        }
        return ''
    }

    static formatToUnixString(date, formatStr = DateFormat.date) {
        if (!date) return ''
        if (isValid(date)) {
            return format(addMinutes(date, date.getTimezoneOffset()), formatStr)
        }
        return ''
    }

    static changeTimeZone(date, timeZone = 'America/New_York') {
        if (typeof date === 'string') {
            return new Date(
                new Date(date).toLocaleString('en-US', {
                    timeZone,
                }),
            )
        }

        return new Date(
            date.toLocaleString('en-US', {
                timeZone,
            }),
        )
    }

    static getUTCDateTime = (datetime, timezone = 'America/New_York') => {
        const localDateTime = new Date(
            datetime.toLocaleString('en-US', { timeZone: timezone }),
        )
        const utcDateTime = new Date(
            localDateTime.getTime() + localDateTime.getTimezoneOffset() * 60000,
        )
        return utcDateTime.toISOString()
    }

    static getDateTimeFromUTC = (datetime, timezone = 'America/New_York') => {
        const localDateTime = new Date(
            datetime.toLocaleString('en-US', { timeZone: timezone }),
        )
        const utcDateTime = new Date(
            localDateTime.getTime() + localDateTime.getTimezoneOffset() * 60000,
        )
        return utcDateTime.toISOString()
    }

    static toDate(unixTimestamp) {
        return new Date(unixTimestamp * 1000)
    }

    static msToDate(ms) {
        return fromUnixTime(ms)
    }

    static addDay(date, day) {
        return addDays(date, day)
    }

    static diff(date1, date2) {
        return differenceInDays(date2, date1)
    }

    static getDistanceInWord(date) {
        return formatDistanceToNow(date)
    }

    static getUnixTimeStamp() {
        return getUnixTime(new Date())
    }

    static isPastDate(date) {
        return isPast(date)
    }

    static convertDaysToSeconds = (days = 1) => {
        const secondsInDay = 86400
        return days * secondsInDay
    }

    static range = (start, end) => {
        const result = []
        for (let i = start; i < end; i += 1) {
            result.push(i)
        }
        return result
    }

    static disabledDate = (current, start, end) => {
        const currentDate = dayjs(current).startOf('day');
        const startDate = dayjs(start).startOf('day');
        const endDate = dayjs(end).startOf('day');
        return current && start && end ? (currentDate.isBefore(startDate) || currentDate.isAfter(endDate)) : current && current < dayjs().startOf('day');
    }

    static disabledDateTime = () => ({
        disabledHours: () => this.range(0, 24).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56],
    })

    static disabledRangeTime = (_, type) => {
        if (type === 'start') {
            return {
                disabledHours: () => this.range(0, 60).splice(4, 20),
                disabledMinutes: () => this.range(30, 60),
                disabledSeconds: () => [55, 56],
            }
        }
        return {
            disabledHours: () => this.range(0, 60).splice(20, 4),
            disabledMinutes: () => this.range(0, 31),
            disabledSeconds: () => [55, 56],
        }
    }

    static getEventTime = (startDate, endDate, endPrefix) => {
        endDate = endDate || null
        if (endDate === null) {
            return `${dayjs.utc(startDate).local().format('dddd, h:mma')} ${(!endDate && endPrefix) ? "- " + endPrefix : ""}`
        }
        const date1 = dayjs.utc(startDate).local().format('DD-MM-YYYY')
        const date2 = dayjs.utc(endDate).local().format('DD-MM-YYYY')
        if (date1 > date2) {
            return dayjs.utc(startDate).local().format('dddd, h:mma')
        }
        if (date1 !== date2) {
            return `${dayjs.utc(startDate).local().format('dddd, h:mma')} - ${dayjs.utc(endDate).local().format('dddd, h:mma')}`
        }
        return `${dayjs.utc(startDate).local().format('dddd, h:mma')} - ${dayjs.utc(endDate).local().format('h:mma')}`
    }

    static getDateTime = (date, formatStr = DateFormat.dateTime) => {
        return dayjs.utc(date).local().format(formatStr)
    }
}