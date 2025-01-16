import { CommonUtility } from "./common";

export class TicketUtility {
    static NumberToCommaSeprated(SeatNo) {
        const seatArray = SeatNo?.split(',')
        const seatRangeArray = [];
        seatArray?.map((data) => {
            let rangeArray = []
            if (data.includes("-")) {
                const spiltedArray = data.split("-");
                const first = spiltedArray[0].match(/\d+/)?.[0];
                const last = spiltedArray[1].match(/\d+/)?.[0];
                const fAlph = spiltedArray[0].replace(/[^A-Za-z]/g, '');
                const sAlph = spiltedArray[1].replace(/[^A-Za-z]/g, '');
                if (fAlph === sAlph && CommonUtility.isNum(first) && CommonUtility.isNum(last)) {
                    for (let i = Number(first); i <= Number(last); i += 1) {
                        rangeArray.push(spiltedArray[0][0] + "-" + i)
                    }
                } else {
                    rangeArray.push(data)
                }
            } else {
                const digit = data.match(/\d+/)?.[0];
                const alphs = data.replace(/[^A-Za-z]/g, '');
                if (digit && alphs) {
                    rangeArray.push(alphs + "-" + digit)
                } else {
                    rangeArray.push(data)
                }
            }
            if (rangeArray.length === 0) { rangeArray = [data] }
            seatRangeArray.push(...rangeArray)
            return ""
        })
        const dataItem = seatRangeArray.toString().replaceAll(',', ";")
        return dataItem
    }

    static RowToNumber(data) {
        const seatNumber = [];
        let error = ""
        if (data !== undefined && data?.length !== 0) {
            data.map(item => {
                const spilted = item.seat.split(",")
                spilted.forEach(seconditem => {
                    if (seconditem.includes("-")) {
                        let itemSplited = seconditem.split("-");
                        if (!CommonUtility.isNum(itemSplited[0]) || !CommonUtility.isNum(itemSplited[1])) {
                            error = "Please Enter Valid Seat Number"
                            return ""
                        }
                        itemSplited = `${item.row}${itemSplited[0]}-${item.row}${itemSplited[1]}`;
                        seatNumber.push(itemSplited)
                    } else {
                        if (!CommonUtility.isNum(seconditem)) {
                            error = "Please Enter Valid Seat Number"
                            return ""
                        }
                        const itemSplited = item.row + seconditem
                        seatNumber.push(itemSplited)
                    }
                    return ""
                })
                return ""
            })
        } else {
            error = "Provided Data is Invalid"
        }
        return {
            seatNumber, error,
        }

    }
}