import { AcceptFileType } from "./constant";
import queryString from 'query-string';

export class CommonUtility {
    static currencyFormat(value, currency) {
        if (Number.isNaN(value || 0)) {
            return value;
        }

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "USD",
        }).format(value || 0);
    }

    static getStatusColor = (status) => {
        return status === "Active" ? "text-green-500" : "text-red-500";
    };

    static isNum(v) {
        return /\d/.test(v);
    }

    static arrayToString(array, replace) {
        let string = array.toString();
        if (replace) {
            string = string.replaceAll(",", replace);
        }
        return string;
    }

    static isNotEmpty(item) {
        return item !== undefined && item !== null && item !== "" && item.length !== 0;
    }

    static discountedValue(number, discount) {
        return (number || 0) - Number(((number || 0) * (discount || 0)) / 100);
    }

    static truncateString(text, ellipsisString) {
        return (text || "").length > ellipsisString ? `${text.substring(0, ellipsisString)}...` : text;
    }

    static numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    static intToString(value) {
        const suffixes = ["", "k", "m", "b", "t"];
        const suffixNum = Math.floor(value.length / 3);
        let shortValue = parseFloat((suffixNum !== 0 ? value / 1000 ** suffixNum : value).toPrecision(2));
        if (shortValue % 1 !== 0) {
            shortValue = shortValue.toFixed(1);
        }
        return shortValue + suffixes[suffixNum];
    }

    static objectToParams(obj) {
        const str = queryString.stringify(obj);
        return str;
    }

    static toTitleCase(phrase) {
        return phrase
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    static timeoutPromise(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    static roundNumber(num, decimals = 6) {
        const t = 10 ** decimals;
        let result = Math.round((num + Number.EPSILON) * t) / t;
        if (num < 0) {
            result *= -1;
        }
        return result;
    }

    static groupByData(collection, property) {
        const groupedCollection = collection.reduce((previous, current) => {
            if (!previous[current[property]]) {
                previous[current[property]] = [current];
            } else {
                previous[current[property]].push(current);
            }
            return previous;
        }, {});
        return Object.keys(groupedCollection).map((key) => ({ title: key, data: groupedCollection[key] }));
    }

    static reorderList = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    static isFileImageVideo = (file) => {
        return file.type.indexOf("image") > -1 || file.type.indexOf("video") > -1;
    };

    static isFileImage = (file) => {
        return file.type.indexOf("image") > -1;
    };

    static isFileVideo = (file) => {
        return file?.type?.indexOf("video") > -1;
    };

    static isURLImageVideo = (url) => {
        const types = AcceptFileType.imageVideo["image/*"];
        return types.some((x) => url.includes(x));
    };

    static isURLVideo = (url) => {
        const types = AcceptFileType.video["video/*"];
        return types.some((x) => url.includes(x));
    };

    static isURLImage = (url) => {
        const types = AcceptFileType.image["image/*"];
        return types.some((x) => url.includes(x));
    };

    static isValidArray = (data) => data && Array.isArray(data) && data.length > 0;

    static getInitials = (name = "") => {
        const parts = name.split(" ");
        let initials = "";
        for (let i = 0; i < parts.length; i += 1) {
            if (parts[i].length > 0 && parts[i] !== "") {
                initials += parts[i][0];
            }
        }
        return initials;
    };
}
